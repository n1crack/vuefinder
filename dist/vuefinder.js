var er = Object.defineProperty;
var tr = (t, e, n) => e in t ? er(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var _s = (t, e, n) => tr(t, typeof e != "symbol" ? e + "" : e, n);
import { reactive as yt, watch as He, ref as M, shallowRef as nr, onMounted as xe, onUnmounted as jn, onUpdated as Ls, nextTick as ct, computed as rt, inject as re, openBlock as _, createElementBlock as g, withKeys as $t, unref as o, createElementVNode as r, withModifiers as st, renderSlot as Mt, normalizeClass as ae, toDisplayString as b, createBlock as W, resolveDynamicComponent as Fs, withCtx as Q, createVNode as z, Fragment as ge, renderList as ke, createCommentVNode as q, withDirectives as ue, vModelCheckbox as zt, createTextVNode as J, vModelSelect as En, vModelText as kt, onBeforeUnmount as Hs, customRef as sr, vShow as Ue, isRef as or, TransitionGroup as rr, normalizeStyle as rn, mergeModels as ar, useModel as Rs, resolveComponent as lr, provide as ir, Transition as cr } from "vue";
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
  He(n, a);
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
async function br(t, e) {
  const n = e[t];
  return typeof n == "function" ? (await n()).default : n;
}
function wr(t, e, n, a) {
  const { getStore: s, setStore: c } = t, i = M({}), d = M(s("locale", e)), l = (v, p = e) => {
    br(v, a).then((m) => {
      i.value = m, c("locale", v), d.value = v, c("translations", m), Object.values(a).length > 1 && (n.emit("vf-toast-push", { label: "The language is set to " + v }), n.emit("vf-language-saved"));
    }).catch((m) => {
      p ? (n.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), l(p, null)) : n.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  He(d, (v) => {
    l(v);
  }), !s("locale") && !a.length ? l(e) : i.value = s("translations");
  const u = (v, ...p) => p.length ? u(v = v.replace("%s", p.shift()), ...p) : v;
  function f(v, ...p) {
    return i.value && i.value.hasOwnProperty(v) ? u(i.value[v], ...p) : u(v, ...p);
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
}, yr = Object.values(de), $r = "2.5.16";
function Bs(t, e, n, a, s) {
  return (e = Math, n = e.log, a = 1024, s = n(t) / n(a) | 0, t / e.pow(a, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "iB" : "B");
}
function Is(t, e, n, a, s) {
  return (e = Math, n = e.log, a = 1e3, s = n(t) / n(a) | 0, t / e.pow(a, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "B" : "B");
}
function kr(t) {
  const e = { k: 1, m: 2, g: 3, t: 4 }, a = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(t);
  return a[1] * Math.pow(1024, e[a[2].toLowerCase()]);
}
const tt = {
  SYSTEM: "system",
  LIGHT: "light",
  DARK: "dark"
};
function xr(t, e) {
  const n = M(tt.SYSTEM), a = M(tt.LIGHT);
  n.value = t.getStore("theme", e ?? tt.SYSTEM);
  const s = window.matchMedia("(prefers-color-scheme: dark)"), c = (i) => {
    n.value === tt.DARK || n.value === tt.SYSTEM && i.matches ? a.value = tt.DARK : a.value = tt.LIGHT;
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
      n.value = i, i !== tt.SYSTEM ? t.setStore("theme", i) : t.removeStore("theme"), c(s);
    }
  };
}
function Sr() {
  const t = nr(null), e = M(!1), n = M();
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
  const { o: n, i: a, u: s } = t;
  let c = n, i;
  const d = (f, v) => {
    const p = c, m = f, h = v || (a ? !a(p, m) : p !== m);
    return (h || s) && (c = m, i = p), [c, h, i];
  };
  return [e ? (f) => d(e(c, i), f) : d, (f) => [c, !!f, i]];
}, Cr = typeof window < "u" && typeof HTMLElement < "u" && !!window.document, Te = Cr ? window : {}, Ns = Math.max, Er = Math.min, An = Math.round, Jt = Math.abs, vs = Math.sign, Us = Te.cancelAnimationFrame, Gn = Te.requestAnimationFrame, Zt = Te.setTimeout, Mn = Te.clearTimeout, an = (t) => typeof Te[t] < "u" ? Te[t] : void 0, Ar = an("MutationObserver"), fs = an("IntersectionObserver"), Qt = an("ResizeObserver"), Kt = an("ScrollTimeline"), Kn = (t) => t === void 0, ln = (t) => t === null, ze = (t) => typeof t == "number", Ot = (t) => typeof t == "string", Wn = (t) => typeof t == "boolean", Re = (t) => typeof t == "function", Pe = (t) => Array.isArray(t), en = (t) => typeof t == "object" && !Pe(t) && !ln(t), Yn = (t) => {
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
const qs = (t, e) => t.indexOf(e) >= 0, Tt = (t, e) => t.concat(e), me = (t, e, n) => (!Ot(e) && Yn(e) ? Array.prototype.push.apply(t, e) : t.push(e), t), at = (t) => Array.from(t || []), Xn = (t) => Pe(t) ? t : !Ot(t) && Yn(t) ? at(t) : [t], Tn = (t) => !!t && !t.length, Dn = (t) => at(new Set(t)), Le = (t, e, n) => {
  le(t, (s) => s ? s.apply(void 0, e || []) : !0), !n && (t.length = 0);
}, zs = "paddingTop", Ps = "paddingRight", js = "paddingLeft", Gs = "paddingBottom", Ks = "marginLeft", Ws = "marginRight", Ys = "marginBottom", Xs = "overflowX", Js = "overflowY", dn = "width", un = "height", nt = "visible", it = "hidden", gt = "scroll", Mr = (t) => {
  const e = String(t || "");
  return e ? e[0].toUpperCase() + e.slice(1) : "";
}, _n = (t, e, n, a) => {
  if (t && e) {
    let s = !0;
    return le(n, (c) => {
      const i = t[c], d = e[c];
      i !== d && (s = !1);
    }), s;
  }
  return !1;
}, Zs = (t, e) => _n(t, e, ["w", "h"]), Wt = (t, e) => _n(t, e, ["x", "y"]), Tr = (t, e) => _n(t, e, ["t", "r", "b", "l"]), dt = () => {
}, X = (t, ...e) => t.bind(0, ...e), ft = (t) => {
  let e;
  const n = t ? Zt : Gn, a = t ? Mn : Us;
  return [(s) => {
    a(e), e = n(() => s(), Re(t) ? t() : t);
  }, () => a(e)];
}, Vn = (t, e) => {
  const { _: n, v: a, p: s, S: c } = e || {};
  let i, d, l, u, f = dt;
  const v = function(w) {
    f(), Mn(i), u = i = d = void 0, f = dt, t.apply(this, w);
  }, p = (k) => c && d ? c(d, k) : k, m = () => {
    f !== dt && v(p(l) || l);
  }, h = function() {
    const w = at(arguments), T = Re(n) ? n() : n;
    if (ze(T) && T >= 0) {
      const F = Re(a) ? a() : a, x = ze(F) && F >= 0, D = T > 0 ? Zt : Gn, O = T > 0 ? Mn : Us, V = p(w) || w, S = v.bind(0, V);
      let y;
      f(), s && !u ? (S(), u = !0, y = D(() => u = void 0, T)) : (y = D(S, T), x && !i && (i = Zt(m, F))), f = () => O(y), d = l = V;
    } else
      v(w);
  };
  return h.m = m, h;
}, Qs = (t, e) => Object.prototype.hasOwnProperty.call(t, e), Be = (t) => t ? Object.keys(t) : [], oe = (t, e, n, a, s, c, i) => {
  const d = [e, n, a, s, c, i];
  return (typeof t != "object" || ln(t)) && !Re(t) && (t = {}), le(d, (l) => {
    le(l, (u, f) => {
      const v = l[f];
      if (t === v)
        return !0;
      const p = Pe(v);
      if (v && tn(v)) {
        const m = t[f];
        let h = m;
        p && !Pe(m) ? h = [] : !p && !tn(m) && (h = {}), t[f] = oe(h, v);
      } else
        t[f] = p ? v.slice() : v;
    });
  }), t;
}, eo = (t, e) => le(oe({}, t), (n, a, s) => {
  n === void 0 ? delete s[a] : n && tn(n) && (s[a] = eo(n));
}), Jn = (t) => !Be(t).length, to = (t, e, n) => Ns(t, Er(e, n)), ut = (t) => Dn((Pe(t) ? t : (t || "").split(" ")).filter((e) => e)), Zn = (t, e) => t && t.getAttribute(e), ms = (t, e) => t && t.hasAttribute(e), Xe = (t, e, n) => {
  le(ut(e), (a) => {
    t && t.setAttribute(a, String(n || ""));
  });
}, Ne = (t, e) => {
  le(ut(e), (n) => t && t.removeAttribute(n));
}, vn = (t, e) => {
  const n = ut(Zn(t, e)), a = X(Xe, t, e), s = (c, i) => {
    const d = new Set(n);
    return le(ut(c), (l) => {
      d[i](l);
    }), at(d).join(" ");
  };
  return {
    O: (c) => a(s(c, "delete")),
    $: (c) => a(s(c, "add")),
    C: (c) => {
      const i = ut(c);
      return i.reduce((d, l) => d && n.includes(l), i.length > 0);
    }
  };
}, no = (t, e, n) => (vn(t, e).O(n), X(Qn, t, e, n)), Qn = (t, e, n) => (vn(t, e).$(n), X(no, t, e, n)), sn = (t, e, n, a) => (a ? Qn : no)(t, e, n), es = (t, e, n) => vn(t, e).C(n), so = (t) => vn(t, "class"), oo = (t, e) => {
  so(t).O(e);
}, ts = (t, e) => (so(t).$(e), X(oo, t, e)), ro = (t, e) => {
  const n = e ? cn(e) && e : document;
  return n ? at(n.querySelectorAll(t)) : [];
}, Dr = (t, e) => {
  const n = e ? cn(e) && e : document;
  return n && n.querySelector(t);
}, On = (t, e) => cn(t) && t.matches(e), ao = (t) => On(t, "body"), Ln = (t) => t ? at(t.childNodes) : [], Dt = (t) => t && t.parentElement, mt = (t, e) => cn(t) && t.closest(e), Fn = (t) => document.activeElement, Vr = (t, e, n) => {
  const a = mt(t, e), s = t && Dr(n, a), c = mt(s, e) === a;
  return a && s ? a === t || s === t || c && mt(mt(t, n), e) !== a : !1;
}, bt = (t) => {
  le(Xn(t), (e) => {
    const n = Dt(e);
    e && n && n.removeChild(e);
  });
}, Ve = (t, e) => X(bt, t && e && le(Xn(e), (n) => {
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
  t && e && le(e, (n, a) => {
    try {
      const s = t.style, c = ln(n) || Wn(n) ? "" : ze(n) ? co(n) : n;
      a.indexOf("--") === 0 ? s.setProperty(a, c) : s[a] = c;
    } catch {
    }
  });
}
function Ze(t, e, n) {
  const a = Ot(e);
  let s = a ? "" : {};
  if (t) {
    const c = Te.getComputedStyle(t, n) || t.style;
    s = a ? ps(c, e) : at(e).reduce((i, d) => (i[d] = ps(c, d), i), s);
  }
  return s;
}
const hs = (t, e, n) => {
  const a = e ? `${e}-` : "", s = n ? `-${n}` : "", c = `${a}top${s}`, i = `${a}right${s}`, d = `${a}bottom${s}`, l = `${a}left${s}`, u = Ze(t, [c, i, d, l]);
  return {
    t: Pt(u[c]),
    r: Pt(u[i]),
    b: Pt(u[d]),
    l: Pt(u[l])
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
}, $n = (t) => t.getBoundingClientRect(), Rr = (t) => !!t && Lr(t), Rn = (t) => !!(t && (t[un] || t[dn])), _o = (t, e) => {
  const n = Rn(t);
  return !Rn(e) && n;
}, gs = (t, e, n, a) => {
  le(ut(e), (s) => {
    t && t.removeEventListener(s, n, a);
  });
}, _e = (t, e, n, a) => {
  var s;
  const c = (s = a && a.H) != null ? s : !0, i = a && a.I || !1, d = a && a.A || !1, l = {
    passive: c,
    capture: i
  };
  return X(Le, ut(e).map((u) => {
    const f = d ? (v) => {
      gs(t, u, f, i), n && n(v);
    } : n;
    return t && t.addEventListener(u, f, l), X(gs, t, u, f, i);
  }));
}, vo = (t) => t.stopPropagation(), Bn = (t) => t.preventDefault(), fo = (t) => vo(t) || Bn(t), qe = (t, e) => {
  const { x: n, y: a } = ze(e) ? {
    x: e,
    y: e
  } : e || {};
  ze(n) && (t.scrollLeft = n), ze(a) && (t.scrollTop = a);
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
  const { D: n, M: a } = t, { w: s, h: c } = e, i = (v, p, m) => {
    let h = vs(v) * m, k = vs(p) * m;
    if (h === k) {
      const w = Jt(v), T = Jt(p);
      k = w > T ? 0 : k, h = w < T ? 0 : h;
    }
    return h = h === k ? 0 : h, [h + 0, k + 0];
  }, [d, l] = i(n.x, a.x, s), [u, f] = i(n.y, a.y, c);
  return {
    D: {
      x: d,
      y: u
    },
    M: {
      x: l,
      y: f
    }
  };
}, bs = ({ D: t, M: e }) => {
  const n = (a, s) => a === 0 && a <= s;
  return {
    x: n(t.x, e.x),
    y: n(t.y, e.y)
  };
}, ws = ({ D: t, M: e }, n) => {
  const a = (s, c, i) => to(0, 1, (s - i) / (s - c) || 0);
  return {
    x: a(t.x, e.x, n.x),
    y: a(t.y, e.y, n.y)
  };
}, In = (t) => {
  t && t.focus && t.focus({
    preventScroll: !0
  });
}, ys = (t, e) => {
  le(Xn(e), t);
}, Nn = (t) => {
  const e = /* @__PURE__ */ new Map(), n = (c, i) => {
    if (c) {
      const d = e.get(c);
      ys((l) => {
        d && d[l ? "delete" : "clear"](l);
      }, i);
    } else
      e.forEach((d) => {
        d.clear();
      }), e.clear();
  }, a = (c, i) => {
    if (Ot(c)) {
      const u = e.get(c) || /* @__PURE__ */ new Set();
      return e.set(c, u), ys((f) => {
        Re(f) && u.add(f);
      }, i), X(n, c, i);
    }
    Wn(i) && i && n();
    const d = Be(c), l = [];
    return le(d, (u) => {
      const f = c[u];
      f && me(l, a(u, f));
    }), X(Le, l);
  }, s = (c, i) => {
    le(at(e.get(c)), (d) => {
      i && !Tn(i) ? d.apply(0, i) : d();
    });
  };
  return a(t || {}), [a, n, s];
}, $s = (t) => JSON.stringify(t, (e, n) => {
  if (Re(n))
    throw 0;
  return n;
}), ks = (t, e) => t ? `${e}`.split(".").reduce((n, a) => n && Qs(n, a) ? n[a] : void 0, t) : void 0, Ir = {
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
  const n = {}, a = Tt(Be(e), Be(t));
  return le(a, (s) => {
    const c = t[s], i = e[s];
    if (en(c) && en(i))
      oe(n[s] = {}, po(c, i)), Jn(n[s]) && delete n[s];
    else if (Qs(e, s) && i !== c) {
      let d = !0;
      if (Pe(c) || Pe(i))
        try {
          $s(c) === $s(i) && (d = !1);
        } catch {
        }
      d && (n[s] = i);
    }
  }), n;
}, xs = (t, e, n) => (a) => [ks(t, a), n || ks(e, a) !== void 0], xt = "data-overlayscrollbars", Yt = "os-environment", jt = `${Yt}-scrollbar-hidden`, kn = `${xt}-initialize`, Xt = "noClipping", Ss = `${xt}-body`, ot = xt, Nr = "host", Je = `${xt}-viewport`, Ur = Xs, qr = Js, zr = "arrange", ho = "measuring", Pr = "scrolling", go = "scrollbarHidden", jr = "noContent", Un = `${xt}-padding`, Cs = `${xt}-content`, ss = "os-size-observer", Gr = `${ss}-appear`, Kr = `${ss}-listener`, Wr = "os-trinsic-observer", Yr = "os-theme-none", Fe = "os-scrollbar", Xr = `${Fe}-rtl`, Jr = `${Fe}-horizontal`, Zr = `${Fe}-vertical`, bo = `${Fe}-track`, os = `${Fe}-handle`, Qr = `${Fe}-visible`, ea = `${Fe}-cornerless`, Es = `${Fe}-interaction`, As = `${Fe}-unusable`, qn = `${Fe}-auto-hide`, Ms = `${qn}-hidden`, Ts = `${Fe}-wheel`, ta = `${bo}-interactive`, na = `${os}-interactive`;
let wo;
const sa = () => wo, oa = (t) => {
  wo = t;
};
let xn;
const ra = () => {
  const t = (x, D, O) => {
    Ve(document.body, x), Ve(document.body, x);
    const P = uo(x), V = ht(x), S = ns(D);
    return O && bt(x), {
      x: V.h - P.h + S.h,
      y: V.w - P.w + S.w
    };
  }, e = (x) => {
    let D = !1;
    const O = ts(x, jt);
    try {
      D = Ze(x, "scrollbar-width") === "none" || Ze(x, "display", "::-webkit-scrollbar") === "none";
    } catch {
    }
    return O(), D;
  }, n = `.${Yt}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${Yt} div{width:200%;height:200%;margin:10px 0}.${jt}{scrollbar-width:none!important}.${jt}::-webkit-scrollbar,.${jt}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`, s = lo(`<div class="${Yt}"><div></div><style>${n}</style></div>`)[0], c = s.firstChild, i = s.lastChild, d = sa();
  d && (i.nonce = d);
  const [l, , u] = Nn(), [f, v] = De({
    o: t(s, c),
    i: Wt
  }, X(t, s, c, !0)), [p] = v(), m = e(s), h = {
    x: p.x === 0,
    y: p.y === 0
  }, k = {
    elements: {
      host: null,
      padding: !m,
      viewport: (x) => m && ao(x) && x,
      content: !1
    },
    scrollbars: {
      slot: !0
    },
    cancel: {
      nativeScrollbarsOverlaid: !1,
      body: null
    }
  }, w = oe({}, Ir), T = X(oe, {}, w), R = X(oe, {}, k), F = {
    T: p,
    k: h,
    R: m,
    V: !!Kt,
    L: X(l, "r"),
    U: R,
    P: (x) => oe(k, x) && R(),
    N: T,
    q: (x) => oe(w, x) && T(),
    B: oe({}, k),
    F: oe({}, w)
  };
  if (Ne(s, "style"), bt(s), _e(Te, "resize", () => {
    u("r", []);
  }), Re(Te.matchMedia) && !m && (!h.x || !h.y)) {
    const x = (D) => {
      const O = Te.matchMedia(`(resolution: ${Te.devicePixelRatio}dppx)`);
      _e(O, "change", () => {
        D(), x(D);
      }, {
        A: !0
      });
    };
    x(() => {
      const [D, O] = f();
      oe(F.T, D), u("r", [O]);
    });
  }
  return F;
}, Ge = () => (xn || (xn = ra()), xn), yo = (t, e) => Re(e) ? e.apply(0, t) : e, aa = (t, e, n, a) => {
  const s = Kn(a) ? n : a;
  return yo(t, s) || e.apply(0, t);
}, $o = (t, e, n, a) => {
  const s = Kn(a) ? n : a, c = yo(t, s);
  return !!c && (nn(c) ? c : e.apply(0, t));
}, la = (t, e) => {
  const { nativeScrollbarsOverlaid: n, body: a } = e || {}, { k: s, R: c, U: i } = Ge(), { nativeScrollbarsOverlaid: d, body: l } = i().cancel, u = n ?? d, f = Kn(a) ? l : a, v = (s.x || s.y) && u, p = t && (ln(f) ? !c : f);
  return !!v || !!p;
}, rs = /* @__PURE__ */ new WeakMap(), ia = (t, e) => {
  rs.set(t, e);
}, ca = (t) => {
  rs.delete(t);
}, ko = (t) => rs.get(t), da = (t, e, n) => {
  let a = !1;
  const s = n ? /* @__PURE__ */ new WeakMap() : !1, c = () => {
    a = !0;
  }, i = (d) => {
    if (s && n) {
      const l = n.map((u) => {
        const [f, v] = u || [];
        return [v && f ? (d || ro)(f, t) : [], v];
      });
      le(l, (u) => le(u[0], (f) => {
        const v = u[1], p = s.get(f) || [];
        if (t.contains(f) && v) {
          const h = _e(f, v, (k) => {
            a ? (h(), s.delete(f)) : e(k);
          });
          s.set(f, me(p, h));
        } else
          Le(p), s.delete(f);
      }));
    }
  };
  return i(), [c, i];
}, Ds = (t, e, n, a) => {
  let s = !1;
  const { j: c, X: i, Y: d, W: l, J: u, G: f } = a || {}, v = Vn(() => s && n(!0), {
    _: 33,
    v: 99
  }), [p, m] = da(t, v, d), h = c || [], k = i || [], w = Tt(h, k), T = (F, x) => {
    if (!Tn(x)) {
      const D = u || dt, O = f || dt, P = [], V = [];
      let S = !1, y = !1;
      if (le(x, (C) => {
        const { attributeName: E, target: B, type: $, oldValue: N, addedNodes: U, removedNodes: ee } = C, se = $ === "attributes", ne = $ === "childList", pe = t === B, L = se && E, H = L && Zn(B, E || ""), I = Ot(H) ? H : null, j = L && N !== I, A = qs(k, E) && j;
        if (e && (ne || !pe)) {
          const K = se && j, G = K && l && On(B, l), te = (G ? !D(B, E, N, I) : !se || K) && !O(C, !!G, t, a);
          le(U, (ie) => me(P, ie)), le(ee, (ie) => me(P, ie)), y = y || te;
        }
        !e && pe && j && !D(B, E, N, I) && (me(V, E), S = S || A);
      }), m((C) => Dn(P).reduce((E, B) => (me(E, ro(C, B)), On(B, C) ? me(E, B) : E), [])), e)
        return !F && y && n(!1), [!1];
      if (!Tn(V) || S) {
        const C = [Dn(V), S];
        return !F && n.apply(0, C), C;
      }
    }
  }, R = new Ar(X(T, !1));
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
      return v.m(), T(!0, R.takeRecords());
  }];
}, xo = {}, So = {}, ua = (t) => {
  le(t, (e) => le(e, (n, a) => {
    xo[a] = e[a];
  }));
}, Co = (t, e, n) => Be(t).map((a) => {
  const { static: s, instance: c } = t[a], [i, d, l] = n || [], u = n ? c : s;
  if (u) {
    const f = n ? u(i, d, e) : u(e);
    return (l || So)[a] = f;
  }
}), Lt = (t) => So[t], _a = "__osOptionsValidationPlugin", va = "__osSizeObserverPlugin", fa = (t, e) => {
  const { k: n } = e, [a, s] = t("showNativeOverlaidScrollbars");
  return [a && n.x && n.y, s];
}, wt = (t) => t.indexOf(nt) === 0, ma = (t, e) => {
  const n = (s, c, i, d) => {
    const l = s === nt ? it : s.replace(`${nt}-`, ""), u = wt(s), f = wt(i);
    return !c && !d ? it : u && f ? nt : u ? c && d ? l : c ? nt : it : c ? l : f && d ? nt : it;
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
}, Eo = "__osScrollbarsHidingPlugin", pa = "__osClickScrollPlugin", Ao = (t, e, n) => {
  const { dt: a } = n || {}, s = Lt(va), [c] = De({
    o: !1,
    u: !0
  });
  return () => {
    const i = [], l = lo(`<div class="${ss}"><div class="${Kr}"></div></div>`)[0], u = l.firstChild, f = (v) => {
      const p = v instanceof ResizeObserverEntry;
      let m = !1, h = !1;
      if (p) {
        const [k, , w] = c(v.contentRect), T = Rn(k);
        h = _o(k, w), m = !h && !T;
      } else
        h = v === !0;
      m || e({
        ft: !0,
        dt: h
      });
    };
    if (Qt) {
      const v = new Qt((p) => f(p.pop()));
      v.observe(u), me(i, () => {
        v.disconnect();
      });
    } else if (s) {
      const [v, p] = s(u, f, a);
      me(i, Tt([ts(l, Gr), _e(l, "animationstart", v)], p));
    } else
      return dt;
    return X(Le, me(i, Ve(t, l)));
  };
}, ha = (t, e) => {
  let n;
  const a = (l) => l.h === 0 || l.isIntersecting || l.intersectionRatio > 0, s = pt(Wr), [c] = De({
    o: !1
  }), i = (l, u) => {
    if (l) {
      const f = c(a(l)), [, v] = f;
      return v && !u && e(f) && [f];
    }
  }, d = (l, u) => i(u.pop(), l);
  return [() => {
    const l = [];
    if (fs)
      n = new fs(X(d, !1), {
        root: t
      }), n.observe(s), me(l, () => {
        n.disconnect();
      });
    else {
      const u = () => {
        const f = ht(s);
        i(f);
      };
      me(l, Ao(s, u)()), u();
    }
    return X(Le, me(l, Ve(t, s)));
  }, () => n && d(!0, n.takeRecords())];
}, ga = (t, e, n, a) => {
  let s, c, i, d, l, u;
  const f = `[${ot}]`, v = `[${Je}]`, p = ["id", "class", "style", "open", "wrap", "cols", "rows"], { vt: m, ht: h, ot: k, gt: w, bt: T, nt: R, wt: F, yt: x, St: D, Ot: O } = t, P = (A) => Ze(A, "direction") === "rtl", V = {
    $t: !1,
    ct: P(m)
  }, S = Ge(), y = Lt(Eo), [C] = De({
    i: Zs,
    o: {
      w: 0,
      h: 0
    }
  }, () => {
    const A = y && y.tt(t, e, V, S, n).ut, G = !(F && R) && es(h, ot, Xt), Y = !R && x(zr), te = Y && Oe(w), ie = te && O(), be = D(ho, G), ve = Y && A && A()[0], Se = on(k), Z = ns(k);
    return ve && ve(), qe(w, te), ie && ie(), G && be(), {
      w: Se.w + Z.w,
      h: Se.h + Z.h
    };
  }), E = Vn(a, {
    _: () => s,
    v: () => c,
    S(A, K) {
      const [G] = A, [Y] = K;
      return [Tt(Be(G), Be(Y)).reduce((te, ie) => (te[ie] = G[ie] || Y[ie], te), {})];
    }
  }), B = (A) => {
    const K = P(m);
    oe(A, {
      Ct: u !== K
    }), oe(V, {
      ct: K
    }), u = K;
  }, $ = (A, K) => {
    const [G, Y] = A, te = {
      xt: Y
    };
    return oe(V, {
      $t: G
    }), !K && a(te), te;
  }, N = ({ ft: A, dt: K }) => {
    const Y = !(A && !K) && S.R ? E : a, te = {
      ft: A || K,
      dt: K
    };
    B(te), Y(te);
  }, U = (A, K) => {
    const [, G] = C(), Y = {
      Ht: G
    };
    return B(Y), G && !K && (A ? a : E)(Y), Y;
  }, ee = (A, K, G) => {
    const Y = {
      Et: K
    };
    return B(Y), K && !G && E(Y), Y;
  }, [se, ne] = T ? ha(h, $) : [], pe = !R && Ao(h, N, {
    dt: !0
  }), [L, H] = Ds(h, !1, ee, {
    X: p,
    j: p
  }), I = R && Qt && new Qt((A) => {
    const K = A[A.length - 1].contentRect;
    N({
      ft: !0,
      dt: _o(K, l)
    }), l = K;
  }), j = Vn(() => {
    const [, A] = C();
    a({
      Ht: A
    });
  }, {
    _: 222,
    p: !0
  });
  return [() => {
    I && I.observe(h);
    const A = pe && pe(), K = se && se(), G = L(), Y = S.L((te) => {
      te ? E({
        zt: te
      }) : j();
    });
    return () => {
      I && I.disconnect(), A && A(), K && K(), d && d(), G(), Y();
    };
  }, ({ It: A, At: K, Dt: G }) => {
    const Y = {}, [te] = A("update.ignoreMutation"), [ie, be] = A("update.attributes"), [ve, Se] = A("update.elementEvents"), [Z, Ce] = A("update.debounce"), Ae = Se || be, ye = K || G, Ee = (he) => Re(te) && te(he);
    if (Ae) {
      i && i(), d && d();
      const [he, we] = Ds(T || k, !0, U, {
        j: Tt(p, ie || []),
        Y: ve,
        W: f,
        G: (ce, fe) => {
          const { target: $e, attributeName: Me } = ce;
          return (!fe && Me && !R ? Vr($e, f, v) : !1) || !!mt($e, `.${Fe}`) || !!Ee(ce);
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
      he && oe(Y, ee(he[0], he[1], ye)), we && oe(Y, $(we[0], ye)), ce && oe(Y, U(ce[0], ye));
    }
    return B(Y), Y;
  }, V];
}, ba = (t, e, n, a) => {
  const s = "--os-viewport-percent", c = "--os-scroll-percent", i = "--os-scroll-direction", { U: d } = Ge(), { scrollbars: l } = d(), { slot: u } = l, { vt: f, ht: v, ot: p, Mt: m, gt: h, wt: k, nt: w } = e, { scrollbars: T } = m ? {} : t, { slot: R } = T || {}, F = [], x = [], D = [], O = $o([f, v, p], () => w && k ? f : v, u, R), P = (L) => {
    if (Kt) {
      const H = new Kt({
        source: h,
        axis: L
      });
      return {
        kt: (j) => {
          const A = j.Tt.animate({
            clear: ["left"],
            [c]: [0, 1]
          }, {
            timeline: H
          });
          return () => A.cancel();
        }
      };
    }
  }, V = {
    x: P("x"),
    y: P("y")
  }, S = () => {
    const { Rt: L, Vt: H } = n, I = (j, A) => to(0, 1, j / (j + A) || 0);
    return {
      x: I(H.x, L.x),
      y: I(H.y, L.y)
    };
  }, y = (L, H, I) => {
    const j = I ? ts : oo;
    le(L, (A) => {
      j(A.Tt, H);
    });
  }, C = (L, H) => {
    le(L, (I) => {
      const [j, A] = H(I);
      Vt(j, A);
    });
  }, E = (L, H, I) => {
    const j = Wn(I), A = j ? I : !0, K = j ? !I : !0;
    A && y(x, L, H), K && y(D, L, H);
  }, B = () => {
    const L = S(), H = (I) => (j) => [j.Tt, {
      [s]: Hn(I) + ""
    }];
    C(x, H(L.x)), C(D, H(L.y));
  }, $ = () => {
    if (!Kt) {
      const { Lt: L } = n, H = ws(L, Oe(h)), I = (j) => (A) => [A.Tt, {
        [c]: Hn(j) + ""
      }];
      C(x, I(H.x)), C(D, I(H.y));
    }
  }, N = () => {
    const { Lt: L } = n, H = bs(L), I = (j) => (A) => [A.Tt, {
      [i]: j ? "0" : "1"
    }];
    C(x, I(H.x)), C(D, I(H.y));
  }, U = () => {
    if (w && !k) {
      const { Rt: L, Lt: H } = n, I = bs(H), j = ws(H, Oe(h)), A = (K) => {
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
      C(x, A), C(D, A);
    }
  }, ee = (L) => {
    const H = L ? "x" : "y", j = pt(`${Fe} ${L ? Jr : Zr}`), A = pt(bo), K = pt(os), G = {
      Tt: j,
      Ut: A,
      Pt: K
    }, Y = V[H];
    return me(L ? x : D, G), me(F, [Ve(j, A), Ve(A, K), X(bt, j), Y && Y.kt(G), a(G, E, L)]), G;
  }, se = X(ee, !0), ne = X(ee, !1), pe = () => (Ve(O, x[0].Tt), Ve(O, D[0].Tt), X(Le, F));
  return se(), ne(), [{
    Nt: B,
    qt: $,
    Bt: N,
    Ft: U,
    jt: E,
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
}, wa = (t, e, n, a) => (s, c, i) => {
  const { ht: d, ot: l, nt: u, gt: f, Kt: v, Ot: p } = e, { Tt: m, Ut: h, Pt: k } = s, [w, T] = ft(333), [R, F] = ft(444), x = (P) => {
    Re(f.scrollBy) && f.scrollBy({
      behavior: "smooth",
      left: P.x,
      top: P.y
    });
  }, D = () => {
    const P = "pointerup pointercancel lostpointercapture", V = `client${i ? "X" : "Y"}`, S = i ? dn : un, y = i ? "left" : "top", C = i ? "w" : "h", E = i ? "x" : "y", B = (N, U) => (ee) => {
      const { Rt: se } = n, ne = ht(h)[C] - ht(k)[C], L = U * ee / ne * se[E];
      qe(f, {
        [E]: N + L
      });
    }, $ = [];
    return _e(h, "pointerdown", (N) => {
      const U = mt(N.target, `.${os}`) === k, ee = U ? k : h, se = t.scrollbars, ne = se[U ? "dragScroll" : "clickScroll"], { button: pe, isPrimary: L, pointerType: H } = N, { pointers: I } = se;
      if (pe === 0 && L && ne && (I || []).includes(H)) {
        Le($), F();
        const A = !U && (N.shiftKey || ne === "instant"), K = X($n, k), G = X($n, h), Y = (fe, $e) => (fe || K())[y] - ($e || G())[y], te = An($n(f)[S]) / ht(f)[C] || 1, ie = B(Oe(f)[E], 1 / te), be = N[V], ve = K(), Se = G(), Z = ve[S], Ce = Y(ve, Se) + Z / 2, Ae = be - Se[y], ye = U ? 0 : Ae - Ce, Ee = (fe) => {
          Le(ce), ee.releasePointerCapture(fe.pointerId);
        }, he = U || A, we = p(), ce = [_e(v, P, Ee), _e(v, "selectstart", (fe) => Bn(fe), {
          H: !1
        }), _e(h, P, Ee), he && _e(h, "pointermove", (fe) => ie(ye + (fe[V] - be))), he && (() => {
          const fe = Oe(f);
          we();
          const $e = Oe(f), Me = {
            x: $e.x - fe.x,
            y: $e.y - fe.y
          };
          (Jt(Me.x) > 3 || Jt(Me.y) > 3) && (p(), qe(f, fe), x(Me), R(we));
        })];
        if (ee.setPointerCapture(N.pointerId), A)
          ie(ye);
        else if (!U) {
          const fe = Lt(pa);
          if (fe) {
            const $e = fe(ie, ye, Z, (Me) => {
              Me ? we() : me(ce, we);
            });
            me(ce, $e), me($, X($e, !0));
          }
        }
      }
    });
  };
  let O = !0;
  return X(Le, [_e(k, "pointermove pointerleave", a), _e(m, "pointerenter", () => {
    c(Es, !0);
  }), _e(m, "pointerleave pointercancel", () => {
    c(Es, !1);
  }), !u && _e(m, "mousedown", () => {
    const P = Fn();
    (ms(P, Je) || ms(P, ot) || P === document.body) && Zt(X(In, l), 25);
  }), _e(m, "wheel", (P) => {
    const { deltaX: V, deltaY: S, deltaMode: y } = P;
    O && y === 0 && Dt(m) === d && x({
      x: V,
      y: S
    }), O = !1, c(Ts, !0), w(() => {
      O = !0, c(Ts);
    }), Bn(P);
  }, {
    H: !1,
    I: !0
  }), _e(m, "pointerdown", X(_e, v, "click", fo, {
    A: !0,
    I: !0,
    H: !1
  }), {
    I: !0
  }), D(), T, F]);
}, ya = (t, e, n, a, s, c) => {
  let i, d, l, u, f, v = dt, p = 0;
  const m = (L) => L.pointerType === "mouse", [h, k] = ft(), [w, T] = ft(100), [R, F] = ft(100), [x, D] = ft(() => p), [O, P] = ba(t, s, a, wa(e, s, a, (L) => m(L) && ee())), { ht: V, Qt: S, wt: y } = s, { jt: C, Nt: E, qt: B, Bt: $, Ft: N } = O, U = (L, H) => {
    if (D(), L)
      C(Ms);
    else {
      const I = X(C, Ms, !0);
      p > 0 && !H ? x(I) : I();
    }
  }, ee = () => {
    (l ? !i : !u) && (U(!0), w(() => {
      U(!1);
    }));
  }, se = (L) => {
    C(qn, L, !0), C(qn, L, !1);
  }, ne = (L) => {
    m(L) && (i = l, l && U(!0));
  }, pe = [D, T, F, k, () => v(), _e(V, "pointerover", ne, {
    A: !0
  }), _e(V, "pointerenter", ne), _e(V, "pointerleave", (L) => {
    m(L) && (i = !1, l && U(!1));
  }), _e(V, "pointermove", (L) => {
    m(L) && d && ee();
  }), _e(S, "scroll", (L) => {
    h(() => {
      B(), ee();
    }), c(L), N();
  })];
  return [() => X(Le, me(pe, P())), ({ It: L, Dt: H, Zt: I, tn: j }) => {
    const { nn: A, sn: K, en: G, cn: Y } = j || {}, { Ct: te, dt: ie } = I || {}, { ct: be } = n, { k: ve } = Ge(), { K: Se, rn: Z } = a, [Ce, Ae] = L("showNativeOverlaidScrollbars"), [ye, Ee] = L("scrollbars.theme"), [he, we] = L("scrollbars.visibility"), [ce, fe] = L("scrollbars.autoHide"), [$e, Me] = L("scrollbars.autoHideSuspend"), [St] = L("scrollbars.autoHideDelay"), [Ft, Ht] = L("scrollbars.dragScroll"), [Rt, lt] = L("scrollbars.clickScroll"), [_t, pn] = L("overflow"), hn = ie && !H, gn = Z.x || Z.y, bn = A || K || Y || te || H, Ie = G || we || pn, wn = Ce && ve.x && ve.y, Ct = (Et, et, Bt) => {
      const At = Et.includes(gt) && (he === nt || he === "auto" && et === gt);
      return C(Qr, At, Bt), At;
    };
    if (p = St, hn && ($e && gn ? (se(!1), v(), R(() => {
      v = _e(S, "scroll", X(se, !0), {
        A: !0
      });
    })) : se(!0)), Ae && C(Yr, wn), Ee && (C(f), C(ye, !0), f = ye), Me && !$e && se(!0), fe && (d = ce === "move", l = ce === "leave", u = ce === "never", U(u, !0)), Ht && C(na, Ft), lt && C(ta, !!Rt), Ie) {
      const Et = Ct(_t.x, Se.x, !0), et = Ct(_t.y, Se.y, !1);
      C(ea, !(Et && et));
    }
    bn && (B(), E(), N(), Y && $(), C(As, !Z.x, !0), C(As, !Z.y, !1), C(Xr, be && !y));
  }, {}, O];
}, $a = (t) => {
  const e = Ge(), { U: n, R: a } = e, { elements: s } = n(), { padding: c, viewport: i, content: d } = s, l = nn(t), u = l ? {} : t, { elements: f } = u, { padding: v, viewport: p, content: m } = f || {}, h = l ? t : u.target, k = ao(h), w = h.ownerDocument, T = w.documentElement, R = () => w.defaultView || Te, F = X(aa, [h]), x = X($o, [h]), D = X(pt, ""), O = X(F, D, i), P = X(x, D, d), V = (Z) => {
    const Ce = ht(Z), Ae = on(Z), ye = Ze(Z, Xs), Ee = Ze(Z, Js);
    return Ae.w - Ce.w > 0 && !wt(ye) || Ae.h - Ce.h > 0 && !wt(Ee);
  }, S = O(p), y = S === h, C = y && k, E = !y && P(m), B = !y && S === E, $ = C ? T : S, N = C ? $ : h, U = !y && x(D, c, v), ee = !B && E, se = [ee, $, U, N].map((Z) => nn(Z) && !Dt(Z) && Z), ne = (Z) => Z && qs(se, Z), pe = !ne($) && V($) ? $ : h, L = C ? T : $, I = {
    vt: h,
    ht: N,
    ot: $,
    ln: U,
    bt: ee,
    gt: L,
    Qt: C ? w : $,
    an: k ? T : pe,
    Kt: w,
    wt: k,
    Mt: l,
    nt: y,
    un: R,
    yt: (Z) => es($, Je, Z),
    St: (Z, Ce) => sn($, Je, Z, Ce),
    Ot: () => sn(L, Je, Pr, !0)
  }, { vt: j, ht: A, ln: K, ot: G, bt: Y } = I, te = [() => {
    Ne(A, [ot, kn]), Ne(j, kn), k && Ne(T, [kn, ot]);
  }];
  let ie = Ln([Y, G, K, A, j].find((Z) => Z && !ne(Z)));
  const be = C ? j : Y || G, ve = X(Le, te);
  return [I, () => {
    const Z = R(), Ce = Fn(), Ae = (ce) => {
      Ve(Dt(ce), Ln(ce)), bt(ce);
    }, ye = (ce) => _e(ce, "focusin focusout focus blur", fo, {
      I: !0,
      H: !1
    }), Ee = "tabindex", he = Zn(G, Ee), we = ye(Ce);
    return Xe(A, ot, y ? "" : Nr), Xe(K, Un, ""), Xe(G, Je, ""), Xe(Y, Cs, ""), y || (Xe(G, Ee, he || "-1"), k && Xe(T, Ss, "")), Ve(be, ie), Ve(A, K), Ve(K || A, !y && G), Ve(G, Y), me(te, [we, () => {
      const ce = Fn(), fe = ne(G), $e = fe && ce === G ? j : ce, Me = ye($e);
      Ne(K, Un), Ne(Y, Cs), Ne(G, Je), k && Ne(T, Ss), he ? Xe(G, Ee, he) : Ne(G, Ee), ne(Y) && Ae(Y), fe && Ae(G), ne(K) && Ae(K), In($e), Me();
    }]), a && !y && (Qn(G, Je, go), me(te, X(Ne, G, Je))), In(!y && k && Ce === j && Z.top === Z ? G : Ce), we(), ie = 0, ve;
  }, ve];
}, ka = ({ bt: t }) => ({ Zt: e, _n: n, Dt: a }) => {
  const { xt: s } = e || {}, { $t: c } = n;
  t && (s || a) && Vt(t, {
    [un]: c && "100%"
  });
}, xa = ({ ht: t, ln: e, ot: n, nt: a }, s) => {
  const [c, i] = De({
    i: Tr,
    o: hs()
  }, X(hs, t, "padding", ""));
  return ({ It: d, Zt: l, _n: u, Dt: f }) => {
    let [v, p] = i(f);
    const { R: m } = Ge(), { ft: h, Ht: k, Ct: w } = l || {}, { ct: T } = u, [R, F] = d("paddingAbsolute");
    (h || p || (f || k)) && ([v, p] = c(f));
    const D = !a && (F || w || p);
    if (D) {
      const O = !R || !e && !m, P = v.r + v.l, V = v.t + v.b, S = {
        [Ws]: O && !T ? -P : 0,
        [Ys]: O ? -V : 0,
        [Ks]: O && T ? -P : 0,
        top: O ? -v.t : 0,
        right: O ? T ? -v.r : "auto" : 0,
        left: O ? T ? "auto" : -v.l : 0,
        [dn]: O && `calc(100% + ${P}px)`
      }, y = {
        [zs]: O ? v.t : 0,
        [Ps]: O ? v.r : 0,
        [Gs]: O ? v.b : 0,
        [js]: O ? v.l : 0
      };
      Vt(e || n, S), Vt(n, y), oe(s, {
        ln: v,
        dn: !O,
        rt: e ? y : oe({}, S, y)
      });
    }
    return {
      fn: D
    };
  };
}, Sa = (t, e) => {
  const n = Ge(), { ht: a, ln: s, ot: c, nt: i, Qt: d, gt: l, wt: u, St: f, un: v } = t, { R: p } = n, m = u && i, h = X(Ns, 0), k = {
    display: () => !1,
    direction: (H) => H !== "ltr",
    flexDirection: (H) => H.endsWith("-reverse"),
    writingMode: (H) => H !== "horizontal-tb"
  }, w = Be(k), T = {
    i: Zs,
    o: {
      w: 0,
      h: 0
    }
  }, R = {
    i: Wt,
    o: {}
  }, F = (H) => {
    f(ho, !m && H);
  }, x = (H) => {
    if (!w.some((be) => {
      const ve = H[be];
      return ve && k[be](ve);
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
    const j = Oe(l), A = f(jr, !0), K = _e(d, gt, (be) => {
      const ve = Oe(l);
      be.isTrusted && ve.x === j.x && ve.y === j.y && vo(be);
    }, {
      I: !0,
      A: !0
    });
    qe(l, {
      x: 0,
      y: 0
    }), A();
    const G = Oe(l), Y = on(l);
    qe(l, {
      x: Y.w,
      y: Y.h
    });
    const te = Oe(l);
    qe(l, {
      x: te.x - G.x < 1 && -Y.w,
      y: te.y - G.y < 1 && -Y.h
    });
    const ie = Oe(l);
    return qe(l, j), Gn(() => K()), {
      D: G,
      M: ie
    };
  }, D = (H, I) => {
    const j = Te.devicePixelRatio % 1 !== 0 ? 1 : 0, A = {
      w: h(H.w - I.w),
      h: h(H.h - I.h)
    };
    return {
      w: A.w > j ? A.w : 0,
      h: A.h > j ? A.h : 0
    };
  }, [O, P] = De(T, X(ns, c)), [V, S] = De(T, X(on, c)), [y, C] = De(T), [E] = De(R), [B, $] = De(T), [N] = De(R), [U] = De({
    i: (H, I) => _n(H, I, w),
    o: {}
  }, () => Rr(c) ? Ze(c, w) : {}), [ee, se] = De({
    i: (H, I) => Wt(H.D, I.D) && Wt(H.M, I.M),
    o: mo()
  }), ne = Lt(Eo), pe = (H, I) => `${I ? Ur : qr}${Mr(H)}`, L = (H) => {
    const I = (A) => [nt, it, gt].map((K) => pe(K, A)), j = I(!0).concat(I()).join(" ");
    f(j), f(Be(H).map((A) => pe(H[A], A === "x")).join(" "), !0);
  };
  return ({ It: H, Zt: I, _n: j, Dt: A }, { fn: K }) => {
    const { ft: G, Ht: Y, Ct: te, dt: ie, zt: be } = I || {}, ve = ne && ne.tt(t, e, j, n, H), { it: Se, ut: Z, _t: Ce } = ve || {}, [Ae, ye] = fa(H, n), [Ee, he] = H("overflow"), we = wt(Ee.x), ce = wt(Ee.y), fe = !0;
    let $e = P(A), Me = S(A), St = C(A), Ft = $(A);
    ye && p && f(go, !Ae);
    {
      es(a, ot, Xt) && F(!0);
      const [ds] = Z ? Z() : [], [It] = $e = O(A), [Nt] = Me = V(A), Ut = uo(c), qt = m && Hr(v()), Qo = {
        w: h(Nt.w + It.w),
        h: h(Nt.h + It.h)
      }, us = {
        w: h((qt ? qt.w : Ut.w + h(Ut.w - Nt.w)) + It.w),
        h: h((qt ? qt.h : Ut.h + h(Ut.h - Nt.h)) + It.h)
      };
      ds && ds(), Ft = B(us), St = y(D(Qo, us), A);
    }
    const [Ht, Rt] = Ft, [lt, _t] = St, [pn, hn] = Me, [gn, bn] = $e, [Ie, wn] = E({
      x: lt.w > 0,
      y: lt.h > 0
    }), Ct = we && ce && (Ie.x || Ie.y) || we && Ie.x && !Ie.y || ce && Ie.y && !Ie.x, Et = K || te || be || bn || hn || Rt || _t || he || ye || fe, et = ma(Ie, Ee), [Bt, At] = N(et.K), [Yo, Xo] = U(A), cs = te || ie || Xo || wn || A, [Jo, Zo] = cs ? ee(x(Yo), A) : se();
    return Et && (At && L(et.K), Ce && Se && Vt(c, Ce(et, j, Se(et, pn, gn)))), F(!1), sn(a, ot, Xt, Ct), sn(s, Un, Xt, Ct), oe(e, {
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
  const [e, n, a] = $a(t), s = {
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
  }, { vt: c, gt: i, nt: d, Ot: l } = e, { R: u, k: f } = Ge(), v = !u && (f.x || f.y), p = [ka(e), xa(e, s), Sa(e, s)];
  return [n, (m) => {
    const h = {}, w = v && Oe(i), T = w && l();
    return le(p, (R) => {
      oe(h, R(m, h) || {});
    }), qe(i, w), T && T(), !d && qe(c, 0), h;
  }, s, e, a];
}, Ea = (t, e, n, a, s) => {
  let c = !1;
  const i = xs(e, {}), [d, l, u, f, v] = Ca(t), [p, m, h] = ga(f, u, i, (x) => {
    F({}, x);
  }), [k, w, , T] = ya(t, e, h, u, f, s), R = (x) => Be(x).some((D) => !!x[D]), F = (x, D) => {
    if (n())
      return !1;
    const { pn: O, Dt: P, At: V, hn: S } = x, y = O || {}, C = !!P || !c, E = {
      It: xs(e, y, C),
      pn: y,
      Dt: C
    };
    if (S)
      return w(E), !1;
    const B = D || m(oe({}, E, {
      At: V
    })), $ = l(oe({}, E, {
      _n: h,
      Zt: B
    }));
    w(oe({}, E, {
      Zt: B,
      tn: $
    }));
    const N = R(B), U = R($), ee = N || U || !Jn(y) || C;
    return c = !0, ee && a(x, {
      Zt: B,
      tn: $
    }), ee;
  };
  return [() => {
    const { an: x, gt: D, Ot: O } = f, P = Oe(x), V = [p(), d(), k()], S = O();
    return qe(D, P), S(), X(Le, V);
  }, F, () => ({
    gn: h,
    bn: u
  }), {
    wn: f,
    yn: T
  }, v];
}, je = (t, e, n) => {
  const { N: a } = Ge(), s = nn(t), c = s ? t : t.target, i = ko(c);
  if (e && !i) {
    let d = !1;
    const l = [], u = {}, f = (y) => {
      const C = eo(y), E = Lt(_a);
      return E ? E(C, !0) : C;
    }, v = oe({}, a(), f(e)), [p, m, h] = Nn(), [k, w, T] = Nn(n), R = (y, C) => {
      T(y, C), h(y, C);
    }, [F, x, D, O, P] = Ea(t, v, () => d, ({ pn: y, Dt: C }, { Zt: E, tn: B }) => {
      const { ft: $, Ct: N, xt: U, Ht: ee, Et: se, dt: ne } = E, { nn: pe, sn: L, en: H, cn: I } = B;
      R("updated", [S, {
        updateHints: {
          sizeChanged: !!$,
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
        changedOptions: y || {},
        force: !!C
      }]);
    }, (y) => R("scroll", [S, y])), V = (y) => {
      ca(c), Le(l), d = !0, R("destroyed", [S, y]), m(), w();
    }, S = {
      options(y, C) {
        if (y) {
          const E = C ? a() : {}, B = po(v, oe(E, f(y)));
          Jn(B) || (oe(v, B), x({
            pn: B
          }));
        }
        return oe({}, v);
      },
      on: k,
      off: (y, C) => {
        y && C && w(y, C);
      },
      state() {
        const { gn: y, bn: C } = D(), { ct: E } = y, { Vt: B, Rt: $, K: N, rn: U, ln: ee, dn: se, Lt: ne } = C;
        return oe({}, {
          overflowEdge: B,
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
        const { vt: y, ht: C, ln: E, ot: B, bt: $, gt: N, Qt: U } = O.wn, { Xt: ee, Gt: se } = O.yn, ne = (L) => {
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
              const A = ne(I());
              return x({
                hn: !0
              }), A;
            }
          });
        };
        return oe({}, {
          target: y,
          host: C,
          padding: E || B,
          viewport: B,
          content: $ || B,
          scrollOffsetElement: N,
          scrollEventElement: U,
          scrollbarHorizontal: pe(ee),
          scrollbarVertical: pe(se)
        });
      },
      update: (y) => x({
        Dt: y,
        At: !0
      }),
      destroy: X(V, !1),
      plugin: (y) => u[Be(y)[0]]
    };
    return me(l, [P]), ia(c, S), Co(xo, je, [S, p, u]), la(O.wn.wt, !s && t.cancel) ? (V(!0), S) : (me(l, F()), R("initialized", [S]), S.update(), S);
  }
  return i;
};
je.plugin = (t) => {
  const e = Pe(t), n = e ? t : [t], a = n.map((s) => Co(s, je)[0]);
  return ua(n), e ? a : a[0];
};
je.valid = (t) => {
  const e = t && t.elements, n = Re(e) && e();
  return tn(n) && !!ko(n.target);
};
je.env = () => {
  const { T: t, k: e, R: n, V: a, B: s, F: c, U: i, P: d, N: l, q: u } = Ge();
  return oe({}, {
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
je.nonce = oa;
function Aa() {
  let t;
  const e = M(null), n = Math.floor(Math.random() * 2 ** 32), a = M(!1), s = M([]), c = () => s.value, i = () => t.getSelection(), d = () => s.value.length, l = () => t.clearSelection(!0), u = M(), f = M(null), v = M(null), p = M(null), m = M(null);
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
        a.value = !1;
        const V = e.value.offsetWidth - O.offsetX, S = e.value.offsetHeight - O.offsetY;
        V < 15 && S < 15 && t.Interaction._reset(O), O.target.classList.contains("os-scrollbar-handle") && t.Interaction._reset(O);
      }
    }), document.addEventListener("dragleave", (D) => {
      !D.buttons && a.value && (a.value = !1);
    });
  }
  const k = () => ct(() => {
    t.addSelection(
      t.getSelectables()
    ), w();
  }), w = () => {
    s.value = t.getSelection().map((D) => JSON.parse(D.dataset.item)), u.value(s.value);
  }, T = () => ct(() => {
    const D = c().map((O) => O.path);
    l(), t.setSettings({
      selectables: document.getElementsByClassName("vf-item-" + n)
    }), t.addSelection(
      t.getSelectables().filter((O) => D.includes(JSON.parse(O.dataset.item).path))
    ), w(), F();
  }), R = (D) => {
    u.value = D, t.subscribe("DS:end", ({ items: O, event: P, isDragging: V }) => {
      s.value = O.map((S) => JSON.parse(S.dataset.item)), D(O.map((S) => JSON.parse(S.dataset.item)));
    });
  }, F = () => {
    f.value && (e.value.getBoundingClientRect().height < e.value.scrollHeight ? (v.value.style.height = e.value.scrollHeight + "px", v.value.style.display = "block") : (v.value.style.height = "100%", v.value.style.display = "none"));
  }, x = (D) => {
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
        f.value = D;
      },
      scroll: (D, O) => {
        const { scrollOffsetElement: P } = D.elements();
        e.value.scrollTo({
          top: P.scrollTop,
          left: 0
        });
      }
    }), h(), F(), m.value = new ResizeObserver(F), m.value.observe(e.value), e.value.addEventListener("scroll", x), t.subscribe("DS:scroll", ({ isDragging: D }) => D || x());
  }), jn(() => {
    t && t.stop(), m.value && m.value.disconnect();
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
    selectAll: k,
    clearSelection: l,
    refreshSelection: T,
    getCount: d,
    onSelect: R
  };
}
function Ma(t, e) {
  const n = M(t), a = M(e), s = M([]), c = M([]), i = M([]), d = M(!1), l = M(5);
  let u = !1, f = !1;
  const v = yt({
    adapter: n,
    storages: [],
    dirname: a,
    files: []
  });
  function p() {
    let R = [], F = [], x = a.value ?? n.value + "://";
    x.length === 0 && (s.value = []), x.replace(n.value + "://", "").split("/").forEach(function(P) {
      R.push(P), R.join("/") !== "" && F.push({
        basename: P,
        name: P,
        path: n.value + "://" + R.join("/"),
        type: "dir"
      });
    }), c.value = F;
    const [D, O] = h(F, l.value);
    i.value = O, s.value = D;
  }
  function m(R) {
    l.value = R, p();
  }
  function h(R, F) {
    return R.length > F ? [R.slice(-F), R.slice(0, -F)] : [R, []];
  }
  function k(R = null) {
    d.value = R ?? !d.value;
  }
  function w() {
    return s.value && s.value.length && !f;
  }
  const T = rt(() => {
    var R;
    return ((R = s.value[s.value.length - 2]) == null ? void 0 : R.path) ?? n.value + "://";
  });
  return xe(() => {
  }), He(a, p), xe(p), {
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
    toggleHiddenBreadcrumbs: k,
    isGoUpAvailable: w,
    parentFolderPath: T
  };
}
const Ta = (t, e) => {
  const n = gr(t.id), a = dr(), s = n.getStore("metricUnits", !1), c = xr(n, t.theme), i = e.i18n, d = t.locale ?? e.locale, l = n.getStore("adapter"), u = (p) => Array.isArray(p) ? p : yr, f = n.getStore("persist-path", t.persist), v = f ? n.getStore("path", t.path) : t.path;
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
    emitter: a,
    // storage
    storage: n,
    // localization object
    i18n: wr(n, d, a, i),
    // modal state
    modal: Sr(),
    // dragSelect object, it is responsible for selecting items
    dragSelect: rt(() => Aa()),
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
    fs: Ma(l, v)
  });
}, Da = /* @__PURE__ */ r("div", { class: "vuefinder__modal-layout__overlay" }, null, -1), Va = { class: "vuefinder__modal-layout__container" }, Oa = { class: "vuefinder__modal-layout__content" }, La = { class: "vuefinder__modal-layout__footer" }, Ke = {
  __name: "ModalLayout",
  setup(t) {
    const e = M(null), n = re("ServiceContainer");
    return xe(() => {
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
      Da,
      r("div", Va, [
        r("div", {
          class: "vuefinder__modal-layout__wrapper",
          onMousedown: s[0] || (s[0] = st((c) => o(n).modal.close(), ["self"]))
        }, [
          r("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            r("div", Oa, [
              Mt(a.$slots, "default")
            ]),
            r("div", La, [
              Mt(a.$slots, "buttons")
            ])
          ], 512)
        ], 32)
      ])
    ], 32));
  }
}, Fa = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [a, s] of e)
    n[a] = s;
  return n;
}, Ha = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(t, { emit: e, slots: n }) {
    const a = re("ServiceContainer"), s = M(!1), { t: c } = a.i18n;
    let i = null;
    const d = () => {
      clearTimeout(i), s.value = !0, i = setTimeout(() => {
        s.value = !1;
      }, 2e3);
    };
    return xe(() => {
      a.emitter.on(t.on, d);
    }), jn(() => {
      clearTimeout(i);
    }), {
      shown: s,
      t: c
    };
  }
}, Ra = { key: 1 };
function Ba(t, e, n, a, s, c) {
  return _(), g("div", {
    class: ae(["vuefinder__action-message", { "vuefinder__action-message--hidden": !a.shown }])
  }, [
    t.$slots.default ? Mt(t.$slots, "default", { key: 0 }) : (_(), g("span", Ra, b(a.t("Saved.")), 1))
  ], 2);
}
const vt = /* @__PURE__ */ Fa(Ha, [["render", Ba]]), Ia = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
}, Na = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87q.11.06.22.127c.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a8 8 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a7 7 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a7 7 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a7 7 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124q.108-.066.22-.128c.332-.183.582-.495.644-.869z"
}, null, -1), Ua = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
}, null, -1), qa = [
  Na,
  Ua
];
function za(t, e) {
  return _(), g("svg", Ia, [...qa]);
}
const Pa = { render: za }, ja = { class: "vuefinder__modal-header" }, Ga = { class: "vuefinder__modal-header__icon-container" }, Ka = {
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
    return (e, n) => (_(), g("div", ja, [
      r("div", Ga, [
        (_(), W(Fs(t.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      r("h3", Ka, b(t.title), 1)
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
}, Al = { class: "vuefinder__about-modal__setting-input" }, Ml = {
  for: "language",
  class: "vuefinder__about-modal__label"
}, Tl = { class: "vuefinder__about-modal__setting-label" }, Dl = ["label"], Vl = ["value"], Ol = {
  key: 2,
  class: "vuefinder__about-modal__tab-content"
}, Ll = { class: "vuefinder__about-modal__shortcuts" }, Fl = { class: "vuefinder__about-modal__shortcut" }, Hl = /* @__PURE__ */ r("kbd", null, "F2", -1), Rl = { class: "vuefinder__about-modal__shortcut" }, Bl = /* @__PURE__ */ r("kbd", null, "F5", -1), Il = { class: "vuefinder__about-modal__shortcut" }, Nl = /* @__PURE__ */ r("kbd", null, "Del", -1), Ul = { class: "vuefinder__about-modal__shortcut" }, ql = /* @__PURE__ */ r("div", null, [
  /* @__PURE__ */ r("kbd", null, "Esc")
], -1), zl = { class: "vuefinder__about-modal__shortcut" }, Pl = /* @__PURE__ */ r("div", null, [
  /* @__PURE__ */ r("kbd", null, "Ctrl"),
  /* @__PURE__ */ J(" + "),
  /* @__PURE__ */ r("kbd", null, "A")
], -1), jl = { class: "vuefinder__about-modal__shortcut" }, Gl = /* @__PURE__ */ r("div", null, [
  /* @__PURE__ */ r("kbd", null, "Ctrl"),
  /* @__PURE__ */ J(" + "),
  /* @__PURE__ */ r("kbd", null, "F")
], -1), Kl = { class: "vuefinder__about-modal__shortcut" }, Wl = /* @__PURE__ */ r("div", null, [
  /* @__PURE__ */ r("kbd", null, "Ctrl"),
  /* @__PURE__ */ J(" + "),
  /* @__PURE__ */ r("kbd", null, "E")
], -1), Yl = { class: "vuefinder__about-modal__shortcut" }, Xl = /* @__PURE__ */ r("div", null, [
  /* @__PURE__ */ r("kbd", null, "Ctrl"),
  /* @__PURE__ */ J(" + "),
  /* @__PURE__ */ r("kbd", null, ",")
], -1), Jl = { class: "vuefinder__about-modal__shortcut" }, Zl = /* @__PURE__ */ r("div", null, [
  /* @__PURE__ */ r("kbd", null, "Ctrl"),
  /* @__PURE__ */ J(" + "),
  /* @__PURE__ */ r("kbd", null, "Enter")
], -1), Ql = {
  key: 3,
  class: "vuefinder__about-modal__tab-content"
}, ei = { class: "vuefinder__about-modal__description" }, Mo = {
  __name: "ModalAbout",
  setup(t) {
    const e = re("ServiceContainer"), { setStore: n, clearStore: a } = e.storage, { t: s } = e.i18n, c = {
      ABOUT: "about",
      SETTINGS: "settings",
      SHORTCUTS: "shortcuts",
      RESET: "reset"
    }, i = rt(() => [
      { name: s("About"), key: c.ABOUT },
      { name: s("Settings"), key: c.SETTINGS },
      { name: s("Shortcuts"), key: c.SHORTCUTS },
      { name: s("Reset"), key: c.RESET }
    ]), d = M("about"), l = async () => {
      a(), location.reload();
    }, u = (R) => {
      e.theme.set(R), e.emitter.emit("vf-theme-saved");
    }, f = () => {
      e.metricUnits = !e.metricUnits, e.filesize = e.metricUnits ? Is : Bs, n("metricUnits", e.metricUnits), e.emitter.emit("vf-metric-units-saved");
    }, v = () => {
      e.compactListView = !e.compactListView, n("compactListView", e.compactListView), e.emitter.emit("vf-compact-view-saved");
    }, p = () => {
      e.showThumbnails = !e.showThumbnails, n("show-thumbnails", e.showThumbnails), e.emitter.emit("vf-show-thumbnails-saved");
    }, m = () => {
      e.persist = !e.persist, n("persist-path", e.persist), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: h } = re("VueFinderOptions"), w = Object.fromEntries(
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
      }).filter(([R]) => Object.keys(h).includes(R))
    ), T = rt(() => ({
      system: s("System"),
      light: s("Light"),
      dark: s("Dark")
    }));
    return (R, F) => (_(), W(Ke, null, {
      buttons: Q(() => [
        r("button", {
          type: "button",
          onClick: F[7] || (F[7] = (x) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(s)("Close")), 1)
      ]),
      default: Q(() => [
        r("div", Wa, [
          z(Qe, {
            icon: o(Pa),
            title: "Vuefinder " + o(e).version
          }, null, 8, ["icon", "title"]),
          r("div", Ya, [
            r("div", null, [
              r("div", null, [
                r("nav", Xa, [
                  (_(!0), g(ge, null, ke(i.value, (x) => (_(), g("button", {
                    key: x.name,
                    onClick: (D) => d.value = x.key,
                    class: ae([x.key === d.value ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive", "vuefinder__about-modal__tab"]),
                    "aria-current": x.current ? "page" : void 0
                  }, b(x.name), 11, Ja))), 128))
                ])
              ])
            ]),
            d.value === c.ABOUT ? (_(), g("div", Za, [
              r("div", Qa, b(o(s)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              r("a", el, b(o(s)("Project home")), 1),
              r("a", tl, b(o(s)("Follow on GitHub")), 1)
            ])) : q("", !0),
            d.value === c.SETTINGS ? (_(), g("div", nl, [
              r("div", sl, b(o(s)("Customize your experience with the following settings")), 1),
              r("div", ol, [
                r("fieldset", null, [
                  r("div", rl, [
                    r("div", al, [
                      ue(r("input", {
                        id: "metric_unit",
                        name: "metric_unit",
                        type: "checkbox",
                        "onUpdate:modelValue": F[0] || (F[0] = (x) => o(e).metricUnits = x),
                        onClick: f,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [zt, o(e).metricUnits]
                      ])
                    ]),
                    r("div", ll, [
                      r("label", il, [
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
                  r("div", cl, [
                    r("div", dl, [
                      ue(r("input", {
                        id: "large_icons",
                        name: "large_icons",
                        type: "checkbox",
                        "onUpdate:modelValue": F[1] || (F[1] = (x) => o(e).compactListView = x),
                        onClick: v,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [zt, o(e).compactListView]
                      ])
                    ]),
                    r("div", ul, [
                      r("label", _l, [
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
                  r("div", vl, [
                    r("div", fl, [
                      ue(r("input", {
                        id: "persist_path",
                        name: "persist_path",
                        type: "checkbox",
                        "onUpdate:modelValue": F[2] || (F[2] = (x) => o(e).persist = x),
                        onClick: m,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [zt, o(e).persist]
                      ])
                    ]),
                    r("div", ml, [
                      r("label", pl, [
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
                  r("div", hl, [
                    r("div", gl, [
                      ue(r("input", {
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
                    r("div", bl, [
                      r("label", wl, [
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
                  r("div", yl, [
                    r("div", $l, [
                      r("label", kl, b(o(s)("Theme")), 1)
                    ]),
                    r("div", xl, [
                      ue(r("select", {
                        id: "theme",
                        "onUpdate:modelValue": F[4] || (F[4] = (x) => o(e).theme.value = x),
                        onChange: F[5] || (F[5] = (x) => u(x.target.value)),
                        class: "vuefinder__about-modal__select"
                      }, [
                        r("optgroup", {
                          label: o(s)("Theme")
                        }, [
                          (_(!0), g(ge, null, ke(T.value, (x, D) => (_(), g("option", { value: D }, b(x), 9, Cl))), 256))
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
                  o(e).features.includes(o(de).LANGUAGE) && Object.keys(o(w)).length > 1 ? (_(), g("div", El, [
                    r("div", Al, [
                      r("label", Ml, b(o(s)("Language")), 1)
                    ]),
                    r("div", Tl, [
                      ue(r("select", {
                        id: "language",
                        "onUpdate:modelValue": F[6] || (F[6] = (x) => o(e).i18n.locale = x),
                        class: "vuefinder__about-modal__select"
                      }, [
                        r("optgroup", {
                          label: o(s)("Language")
                        }, [
                          (_(!0), g(ge, null, ke(o(w), (x, D) => (_(), g("option", { value: D }, b(x), 9, Vl))), 256))
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
            d.value === c.SHORTCUTS ? (_(), g("div", Ol, [
              r("div", Ll, [
                r("div", Fl, [
                  r("div", null, b(o(s)("Rename")), 1),
                  Hl
                ]),
                r("div", Rl, [
                  r("div", null, b(o(s)("Refresh")), 1),
                  Bl
                ]),
                r("div", Il, [
                  J(b(o(s)("Delete")) + " ", 1),
                  Nl
                ]),
                r("div", Ul, [
                  J(b(o(s)("Escape")) + " ", 1),
                  ql
                ]),
                r("div", zl, [
                  J(b(o(s)("Select All")) + " ", 1),
                  Pl
                ]),
                r("div", jl, [
                  J(b(o(s)("Search")) + " ", 1),
                  Gl
                ]),
                r("div", Kl, [
                  J(b(o(s)("Toggle Sidebar")) + " ", 1),
                  Wl
                ]),
                r("div", Yl, [
                  J(b(o(s)("Open Settings")) + " ", 1),
                  Xl
                ]),
                r("div", Jl, [
                  J(b(o(s)("Toggle Full Screen")) + " ", 1),
                  Zl
                ])
              ])
            ])) : q("", !0),
            d.value === c.RESET ? (_(), g("div", Ql, [
              r("div", ei, b(o(s)("Reset all settings to default")), 1),
              r("button", {
                onClick: l,
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
}, ti = ["title"], ni = /* @__PURE__ */ r("svg", {
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
    const n = e, a = re("ServiceContainer"), { t: s } = a.i18n, c = M(!1), i = M(null), d = M((u = i.value) == null ? void 0 : u.strMessage);
    He(d, () => c.value = !1);
    const l = () => {
      n("hidden"), c.value = !0;
    };
    return (f, v) => (_(), g("div", null, [
      c.value ? q("", !0) : (_(), g("div", {
        key: 0,
        ref_key: "strMessage",
        ref: i,
        class: ae(["vuefinder__message", t.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Mt(f.$slots, "default"),
        r("div", {
          class: "vuefinder__message__close",
          onClick: l,
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
}, ri = /* @__PURE__ */ r("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1), ai = [
  ri
];
function li(t, e) {
  return _(), g("svg", oi, [...ai]);
}
const To = { render: li }, ii = { class: "vuefinder__delete-modal__content" }, ci = { class: "vuefinder__delete-modal__form" }, di = { class: "vuefinder__delete-modal__description" }, ui = { class: "vuefinder__delete-modal__files vf-scrollbar" }, _i = { class: "vuefinder__delete-modal__file" }, vi = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, fi = /* @__PURE__ */ r("path", {
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
}, hi = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), gi = [
  hi
], bi = { class: "vuefinder__delete-modal__file-name" }, wi = { class: "vuefinder__delete-modal__warning" }, as = {
  __name: "ModalDelete",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, a = M(e.modal.data.items), s = M(""), c = () => {
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
    return (i, d) => (_(), W(Ke, null, {
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
        r("div", wi, b(o(n)("This action cannot be undone.")), 1)
      ]),
      default: Q(() => [
        r("div", null, [
          z(Qe, {
            icon: o(To),
            title: o(n)("Delete files")
          }, null, 8, ["icon", "title"]),
          r("div", ii, [
            r("div", ci, [
              r("p", di, b(o(n)("Are you sure you want to delete these files?")), 1),
              r("div", ui, [
                (_(!0), g(ge, null, ke(a.value, (l) => (_(), g("p", _i, [
                  l.type === "dir" ? (_(), g("svg", vi, mi)) : (_(), g("svg", pi, gi)),
                  r("span", bi, b(l.basename), 1)
                ]))), 256))
              ]),
              s.value.length ? (_(), W(We, {
                key: 0,
                onHidden: d[0] || (d[0] = (l) => s.value = ""),
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
}, $i = /* @__PURE__ */ r("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1), ki = [
  $i
];
function xi(t, e) {
  return _(), g("svg", yi, [...ki]);
}
const Do = { render: xi }, Si = { class: "vuefinder__rename-modal__content" }, Ci = { class: "vuefinder__rename-modal__item" }, Ei = { class: "vuefinder__rename-modal__item-info" }, Ai = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Mi = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Ti = [
  Mi
], Di = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Vi = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Oi = [
  Vi
], Li = { class: "vuefinder__rename-modal__item-name" }, ls = {
  __name: "ModalRename",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, a = M(e.modal.data.items[0]), s = M(e.modal.data.items[0].basename), c = M(""), i = () => {
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
    return (d, l) => (_(), W(Ke, null, {
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
          z(Qe, {
            icon: o(Do),
            title: o(n)("Rename")
          }, null, 8, ["icon", "title"]),
          r("div", Si, [
            r("div", Ci, [
              r("p", Ei, [
                a.value.type === "dir" ? (_(), g("svg", Ai, Ti)) : (_(), g("svg", Di, Oi)),
                r("span", Li, b(a.value.basename), 1)
              ]),
              ue(r("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (u) => s.value = u),
                onKeyup: $t(i, ["enter"]),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [kt, s.value]
              ]),
              c.value.length ? (_(), W(We, {
                key: 0,
                onHidden: l[1] || (l[1] = (u) => c.value = ""),
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
    n.code === Ye.ESCAPE && (t.modal.close(), t.root.focus()), !t.modal.visible && (t.fs.searchMode || (n.code === Ye.F2 && t.features.includes(de.RENAME) && (t.dragSelect.getCount() !== 1 || t.modal.open(ls, { items: t.dragSelect.getSelected() })), n.code === Ye.F5 && t.emitter.emit("vf-fetch", { params: { q: "index", adapter: t.fs.adapter, path: t.fs.data.dirname } }), n.code === Ye.DELETE && (!t.dragSelect.getCount() || t.modal.open(as, { items: t.dragSelect.getSelected() })), n.metaKey && n.code === Ye.BACKSLASH && t.modal.open(Mo), n.metaKey && n.code === Ye.KEY_F && t.features.includes(de.SEARCH) && (t.fs.searchMode = !0, n.preventDefault()), n.metaKey && n.code === Ye.KEY_E && (t.showTreeView = !t.showTreeView, t.storage.setStore("show-tree-view", t.showTreeView)), n.metaKey && n.code === Ye.ENTER && (t.fullScreen = !t.fullScreen, t.root.focus()), n.metaKey && n.code === Ye.KEY_A && (t.dragSelect.selectAll(), n.preventDefault())));
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
}, Ri = /* @__PURE__ */ r("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1), Bi = [
  Ri
];
function Ii(t, e) {
  return _(), g("svg", Hi, [...Bi]);
}
const Vo = { render: Ii }, Ni = { class: "vuefinder__new-folder-modal__content" }, Ui = { class: "vuefinder__new-folder-modal__form" }, qi = { class: "vuefinder__new-folder-modal__description" }, zi = ["placeholder"], Oo = {
  __name: "ModalNewFolder",
  setup(t) {
    const e = re("ServiceContainer");
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
    return (i, d) => (_(), W(Ke, null, {
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
          z(Qe, {
            icon: o(Vo),
            title: o(n)("New Folder")
          }, null, 8, ["icon", "title"]),
          r("div", Ni, [
            r("div", Ui, [
              r("p", qi, b(o(n)("Create a new folder")), 1),
              ue(r("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (l) => a.value = l),
                onKeyup: $t(c, ["enter"]),
                class: "vuefinder__new-folder-modal__input",
                placeholder: o(n)("Folder Name"),
                type: "text"
              }, null, 40, zi), [
                [kt, a.value]
              ]),
              s.value.length ? (_(), W(We, {
                key: 0,
                onHidden: d[1] || (d[1] = (l) => s.value = ""),
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
}, ji = /* @__PURE__ */ r("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1), Gi = [
  ji
];
function Ki(t, e) {
  return _(), g("svg", Pi, [...Gi]);
}
const Lo = { render: Ki }, Wi = { class: "vuefinder__new-file-modal__content" }, Yi = { class: "vuefinder__new-file-modal__form" }, Xi = { class: "vuefinder__new-file-modal__description" }, Ji = ["placeholder"], Zi = {
  __name: "ModalNewFile",
  setup(t) {
    const e = re("ServiceContainer");
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
    return (i, d) => (_(), W(Ke, null, {
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
          z(Qe, {
            icon: o(Lo),
            title: o(n)("New File")
          }, null, 8, ["icon", "title"]),
          r("div", Wi, [
            r("div", Yi, [
              r("p", Xi, b(o(n)("Create a new file")), 1),
              ue(r("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (l) => a.value = l),
                onKeyup: $t(c, ["enter"]),
                class: "vuefinder__new-file-modal__input",
                placeholder: o(n)("File Name"),
                type: "text"
              }, null, 40, Ji), [
                [kt, a.value]
              ]),
              s.value.length ? (_(), W(We, {
                key: 0,
                onHidden: d[1] || (d[1] = (l) => s.value = ""),
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
}, ec = /* @__PURE__ */ r("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1), tc = [
  ec
];
function nc(t, e) {
  return _(), g("svg", Qi, [...tc]);
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
}, fc = ["title", "disabled", "onClick"], mc = /* @__PURE__ */ r("svg", {
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
], -1), pc = [
  mc
], hc = {
  key: 0,
  class: "py-2"
}, gc = ["disabled"], bc = {
  __name: "ModalUpload",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, a = n("uppy"), s = {
      PENDING: 0,
      CANCELED: 1,
      UPLOADING: 2,
      ERROR: 3,
      DONE: 10
    }, c = M({ QUEUE_ENTRY_STATUS: s }), i = M(null), d = M(null), l = M(null), u = M(null), f = M(null), v = M(null), p = M([]), m = M(""), h = M(!1), k = M(!1);
    let w;
    function T(E) {
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
    function F(E) {
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
    const x = (E) => {
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
    function V(E) {
      h.value || (w.removeFile(E.id, "removed-by-user"), p.value.splice(T(E.id), 1));
    }
    function S(E) {
      if (!h.value) {
        if (w.cancelAll({ reason: "user" }), E) {
          const B = [];
          p.value.forEach(($) => {
            $.status !== s.DONE && B.push($);
          }), p.value = [], B.forEach(($) => {
            R($.originalFile, $.name);
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
    return xe(async () => {
      w = new _r({
        debug: e.debug,
        restrictions: {
          maxFileSize: kr(e.maxFileSize)
          //maxNumberOfFiles
          //allowedFileTypes
        },
        locale: a,
        onBeforeFileAdded($, N) {
          if (N[$.id] != null) {
            const ee = T($.id);
            p.value[ee].status === s.PENDING && (m.value = w.i18n("noDuplicates", { fileName: $.name })), p.value = p.value.filter((se) => se.id !== $.id);
          }
          return p.value.push({
            id: $.id,
            name: $.name,
            size: e.filesize($.size),
            status: s.PENDING,
            statusName: n("Pending upload"),
            percent: null,
            originalFile: $.data
          }), !0;
        }
      }), w.use(vr, {
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
      }), w.on("restriction-failed", ($, N) => {
        const U = p.value[T($.id)];
        V(U), m.value = N.message;
      }), w.on("upload", () => {
        const $ = C();
        w.setMeta({ ...$.body });
        const N = w.getPlugin("XHRUpload");
        N.opts.method = $.method, N.opts.endpoint = $.url + "?" + new URLSearchParams($.params), N.opts.headers = $.headers, delete $.headers["Content-Type"], h.value = !0, p.value.forEach((U) => {
          U.status !== s.DONE && (U.percent = null, U.status = s.UPLOADING, U.statusName = n("Pending upload"));
        });
      }), w.on("upload-progress", ($, N) => {
        const U = Math.floor(N.bytesUploaded / N.bytesTotal * 100);
        p.value[T($.id)].percent = `${U}%`;
      }), w.on("upload-success", ($) => {
        const N = p.value[T($.id)];
        N.status = s.DONE, N.statusName = n("Done");
      }), w.on("upload-error", ($, N) => {
        const U = p.value[T($.id)];
        U.percent = null, U.status = s.ERROR, N.isNetworkError ? U.statusName = n("Network Error, Unable establish connection to the server or interrupted.") : U.statusName = N ? N.message : n("Unknown Error");
      }), w.on("error", ($) => {
        m.value = $.message, h.value = !1, e.emitter.emit("vf-fetch", {
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
        l.value.click();
      }), v.value.addEventListener("dragover", ($) => {
        $.preventDefault(), k.value = !0;
      }), v.value.addEventListener("dragleave", ($) => {
        $.preventDefault(), k.value = !1;
      });
      function E($, N) {
        N.isFile && N.file((U) => $(N, U)), N.isDirectory && N.createReader().readEntries((U) => {
          U.forEach((ee) => {
            E($, ee);
          });
        });
      }
      v.value.addEventListener("drop", ($) => {
        $.preventDefault(), k.value = !1;
        const N = /^[/\\](.+)/;
        [...$.dataTransfer.items].forEach((U) => {
          U.kind === "file" && E((ee, se) => {
            const ne = N.exec(ee.fullPath);
            R(se, ne[1]);
          }, U.webkitGetAsEntry());
        });
      });
      const B = ({ target: $ }) => {
        const N = $.files;
        for (const U of N)
          R(U);
        $.value = "";
      };
      d.value.addEventListener("change", B), l.value.addEventListener("change", B);
    }), Hs(() => {
      w == null || w.close({ reason: "unmount" });
    }), (E, B) => (_(), W(Ke, null, {
      buttons: Q(() => [
        r("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: h.value,
          onClick: st(O, ["prevent"])
        }, b(o(n)("Upload")), 9, gc),
        h.value ? (_(), g("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: st(P, ["prevent"])
        }, b(o(n)("Cancel")), 1)) : (_(), g("button", {
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
          r("div", sc, [
            r("div", {
              class: "vuefinder__upload-modal__drop-area",
              ref_key: "dropArea",
              ref: v,
              onClick: D
            }, [
              k.value ? (_(), g("div", oc, b(o(n)("Release to drop these files.")), 1)) : (_(), g("div", rc, b(o(n)("Drag and drop the files/folders to here or click here.")), 1))
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
                onClick: B[0] || (B[0] = ($) => S(!1))
              }, b(o(n)("Clear all")), 9, ac),
              r("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: h.value,
                onClick: B[1] || (B[1] = ($) => S(!0))
              }, b(o(n)("Clear only successful")), 9, lc)
            ], 512),
            r("div", ic, [
              (_(!0), g(ge, null, ke(p.value, ($) => (_(), g("div", {
                class: "vuefinder__upload-modal__file-entry",
                key: $.id
              }, [
                r("span", {
                  class: ae(["vuefinder__upload-modal__file-icon", F($)])
                }, [
                  r("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: b(x($))
                  }, null, 8, cc)
                ], 2),
                r("div", dc, [
                  r("div", uc, b(o(zn)($.name, 40)) + " (" + b($.size) + ")", 1),
                  r("div", _c, b(o(zn)($.name, 16)) + " (" + b($.size) + ")", 1),
                  r("div", {
                    class: ae(["vuefinder__upload-modal__file-status", F($)])
                  }, [
                    J(b($.statusName) + " ", 1),
                    $.status === c.value.QUEUE_ENTRY_STATUS.UPLOADING ? (_(), g("b", vc, b($.percent), 1)) : q("", !0)
                  ], 2)
                ]),
                r("button", {
                  type: "button",
                  class: ae(["vuefinder__upload-modal__file-remove", h.value ? "disabled" : ""]),
                  title: o(n)("Delete"),
                  disabled: h.value,
                  onClick: (N) => V($)
                }, pc, 10, fc)
              ]))), 128)),
              p.value.length ? q("", !0) : (_(), g("div", hc, b(o(n)("No files selected!")), 1))
            ]),
            m.value.length ? (_(), W(We, {
              key: 0,
              onHidden: B[2] || (B[2] = ($) => m.value = ""),
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
}, wc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, yc = /* @__PURE__ */ r("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1), $c = [
  yc
];
function kc(t, e) {
  return _(), g("svg", wc, [...$c]);
}
const Ho = { render: kc }, xc = { class: "vuefinder__unarchive-modal__content" }, Sc = { class: "vuefinder__unarchive-modal__items" }, Cc = { class: "vuefinder__unarchive-modal__item" }, Ec = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ac = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
}, null, -1), Mc = [
  Ac
], Tc = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Dc = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Vc = [
  Dc
], Oc = { class: "vuefinder__unarchive-modal__item-name" }, Lc = { class: "vuefinder__unarchive-modal__info" }, Ro = {
  __name: "ModalUnarchive",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, a = M(e.modal.data.items[0]), s = M(""), c = M([]), i = () => {
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
    return (d, l) => (_(), W(Ke, null, {
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
          z(Qe, {
            icon: o(Ho),
            title: o(n)("Unarchive")
          }, null, 8, ["icon", "title"]),
          r("div", xc, [
            r("div", Sc, [
              (_(!0), g(ge, null, ke(c.value, (u) => (_(), g("p", Cc, [
                u.type === "dir" ? (_(), g("svg", Ec, Mc)) : (_(), g("svg", Tc, Vc)),
                r("span", Oc, b(u.basename), 1)
              ]))), 256)),
              r("p", Lc, b(o(n)("The archive will be unarchived at")) + " (" + b(o(e).fs.data.dirname) + ")", 1),
              s.value.length ? (_(), W(We, {
                key: 0,
                onHidden: l[0] || (l[0] = (u) => s.value = ""),
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
}, Hc = /* @__PURE__ */ r("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1), Rc = [
  Hc
];
function Bc(t, e) {
  return _(), g("svg", Fc, [...Rc]);
}
const Bo = { render: Bc }, Ic = { class: "vuefinder__archive-modal__content" }, Nc = { class: "vuefinder__archive-modal__form" }, Uc = { class: "vuefinder__archive-modal__files vf-scrollbar" }, qc = { class: "vuefinder__archive-modal__file" }, zc = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Pc = /* @__PURE__ */ r("path", {
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
}, Kc = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Wc = [
  Kc
], Yc = { class: "vuefinder__archive-modal__file-name" }, Xc = ["placeholder"], Io = {
  __name: "ModalArchive",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, a = M(""), s = M(""), c = M(e.modal.data.items), i = () => {
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
    return (d, l) => (_(), W(Ke, null, {
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
          z(Qe, {
            icon: o(Bo),
            title: o(n)("Archive the files")
          }, null, 8, ["icon", "title"]),
          r("div", Ic, [
            r("div", Nc, [
              r("div", Uc, [
                (_(!0), g(ge, null, ke(c.value, (u) => (_(), g("p", qc, [
                  u.type === "dir" ? (_(), g("svg", zc, jc)) : (_(), g("svg", Gc, Wc)),
                  r("span", Yc, b(u.basename), 1)
                ]))), 256))
              ]),
              ue(r("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (u) => a.value = u),
                onKeyup: $t(i, ["enter"]),
                class: "vuefinder__archive-modal__input",
                placeholder: o(n)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, Xc), [
                [kt, a.value]
              ]),
              s.value.length ? (_(), W(We, {
                key: 0,
                onHidden: l[1] || (l[1] = (u) => s.value = ""),
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
}, Zc = /* @__PURE__ */ r("circle", {
  cx: "12",
  cy: "12",
  r: "10",
  stroke: "currentColor",
  "stroke-width": "4",
  class: "opacity-25 stroke-blue-900 dark:stroke-blue-100"
}, null, -1), Qc = /* @__PURE__ */ r("path", {
  fill: "currentColor",
  d: "M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12zm2 5.291A7.96 7.96 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938z",
  class: "opacity-75"
}, null, -1), ed = [
  Zc,
  Qc
];
function td(t, e) {
  return _(), g("svg", Jc, [...ed]);
}
const is = { render: td }, nd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, sd = /* @__PURE__ */ r("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1), od = [
  sd
];
function rd(t, e) {
  return _(), g("svg", nd, [...od]);
}
const ad = { render: rd }, ld = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
}, id = /* @__PURE__ */ r("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1), cd = [
  id
];
function dd(t, e) {
  return _(), g("svg", ld, [...cd]);
}
const ud = { render: dd }, _d = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, vd = /* @__PURE__ */ r("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1), fd = [
  vd
];
function md(t, e) {
  return _(), g("svg", _d, [...fd]);
}
const pd = { render: md }, hd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
}, gd = /* @__PURE__ */ r("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1), bd = [
  gd
];
function wd(t, e) {
  return _(), g("svg", hd, [...bd]);
}
const yd = { render: wd }, $d = { class: "vuefinder__toolbar" }, kd = {
  key: 0,
  class: "vuefinder__toolbar__actions"
}, xd = ["title"], Sd = ["title"], Cd = ["title"], Ed = ["title"], Ad = ["title"], Md = ["title"], Td = ["title"], Dd = {
  key: 1,
  class: "vuefinder__toolbar__search-results"
}, Vd = { class: "pl-2" }, Od = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, Ld = { class: "vuefinder__toolbar__controls" }, Fd = ["title"], Hd = ["title"], Rd = {
  __name: "Toolbar",
  setup(t) {
    const e = re("ServiceContainer"), { setStore: n } = e.storage, { t: a } = e.i18n, s = e.dragSelect, c = M("");
    e.emitter.on("vf-search-query", ({ newQuery: l }) => {
      c.value = l;
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
    return (l, u) => (_(), g("div", $d, [
      c.value.length ? (_(), g("div", Dd, [
        r("div", Vd, [
          J(b(o(a)("Search results for")) + " ", 1),
          r("span", Od, b(c.value), 1)
        ]),
        o(e).fs.loading ? (_(), W(o(is), { key: 0 })) : q("", !0)
      ])) : (_(), g("div", kd, [
        o(e).features.includes(o(de).NEW_FOLDER) ? (_(), g("div", {
          key: 0,
          class: "mx-1.5",
          title: o(a)("New Folder"),
          onClick: u[0] || (u[0] = (f) => o(e).modal.open(Oo, { items: o(s).getSelected() }))
        }, [
          z(o(Vo))
        ], 8, xd)) : q("", !0),
        o(e).features.includes(o(de).NEW_FILE) ? (_(), g("div", {
          key: 1,
          class: "mx-1.5",
          title: o(a)("New File"),
          onClick: u[1] || (u[1] = (f) => o(e).modal.open(Zi, { items: o(s).getSelected() }))
        }, [
          z(o(Lo))
        ], 8, Sd)) : q("", !0),
        o(e).features.includes(o(de).RENAME) ? (_(), g("div", {
          key: 2,
          class: "mx-1.5",
          title: o(a)("Rename"),
          onClick: u[2] || (u[2] = (f) => o(s).getCount() !== 1 || o(e).modal.open(ls, { items: o(s).getSelected() }))
        }, [
          z(o(Do), {
            class: ae(o(s).getCount() === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Cd)) : q("", !0),
        o(e).features.includes(o(de).DELETE) ? (_(), g("div", {
          key: 3,
          class: "mx-1.5",
          title: o(a)("Delete"),
          onClick: u[3] || (u[3] = (f) => !o(s).getCount() || o(e).modal.open(as, { items: o(s).getSelected() }))
        }, [
          z(o(To), {
            class: ae(o(s).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Ed)) : q("", !0),
        o(e).features.includes(o(de).UPLOAD) ? (_(), g("div", {
          key: 4,
          class: "mx-1.5",
          title: o(a)("Upload"),
          onClick: u[4] || (u[4] = (f) => o(e).modal.open(bc, { items: o(s).getSelected() }))
        }, [
          z(o(Fo))
        ], 8, Ad)) : q("", !0),
        o(e).features.includes(o(de).UNARCHIVE) && o(s).getCount() === 1 && o(s).getSelected()[0].mime_type === "application/zip" ? (_(), g("div", {
          key: 5,
          class: "mx-1.5",
          title: o(a)("Unarchive"),
          onClick: u[5] || (u[5] = (f) => !o(s).getCount() || o(e).modal.open(Ro, { items: o(s).getSelected() }))
        }, [
          z(o(Ho), {
            class: ae(o(s).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Md)) : q("", !0),
        o(e).features.includes(o(de).ARCHIVE) ? (_(), g("div", {
          key: 6,
          class: "mx-1.5",
          title: o(a)("Archive"),
          onClick: u[6] || (u[6] = (f) => !o(s).getCount() || o(e).modal.open(Io, { items: o(s).getSelected() }))
        }, [
          z(o(Bo), {
            class: ae(o(s).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Td)) : q("", !0)
      ])),
      r("div", Ld, [
        o(e).features.includes(o(de).FULL_SCREEN) ? (_(), g("div", {
          key: 0,
          onClick: i,
          class: "mx-1.5",
          title: o(a)("Toggle Full Screen")
        }, [
          o(e).fullScreen ? (_(), W(o(ud), { key: 0 })) : (_(), W(o(ad), { key: 1 }))
        ], 8, Fd)) : q("", !0),
        r("div", {
          class: "mx-1.5",
          title: o(a)("Change View"),
          onClick: u[7] || (u[7] = (f) => c.value.length || d())
        }, [
          o(e).view === "grid" ? (_(), W(o(pd), {
            key: 0,
            class: ae(["vf-toolbar-icon", c.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : q("", !0),
          o(e).view === "list" ? (_(), W(o(yd), {
            key: 1,
            class: ae(["vf-toolbar-icon", c.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : q("", !0)
        ], 8, Hd)
      ])
    ]));
  }
}, Bd = (t, e = 0, n = !1) => {
  let a;
  return (...s) => {
    n && !a && t(...s), clearTimeout(a), a = setTimeout(() => {
      t(...s);
    }, e);
  };
}, Vs = (t, e, n) => {
  const a = M(t);
  return sr((s, c) => ({
    get() {
      return s(), a.value;
    },
    set: Bd(
      (i) => {
        a.value = i, c();
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
}, Nd = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
}, null, -1), Ud = [
  Nd
];
function qd(t, e) {
  return _(), g("svg", Id, [...Ud]);
}
const zd = { render: qd }, Pd = { class: "vuefinder__move-modal__content" }, jd = { class: "vuefinder__move-modal__description" }, Gd = { class: "vuefinder__move-modal__files vf-scrollbar" }, Kd = { class: "vuefinder__move-modal__file" }, Wd = {
  key: 0,
  class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Yd = /* @__PURE__ */ r("path", {
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
}, Zd = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
}, null, -1), Qd = [
  Zd
], eu = { class: "vuefinder__move-modal__file-name" }, tu = { class: "vuefinder__move-modal__target-title" }, nu = { class: "vuefinder__move-modal__target-directory" }, su = /* @__PURE__ */ r("svg", {
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
], -1), ou = { class: "vuefinder__move-modal__target-path" }, ru = { class: "vuefinder__move-modal__selected-items" }, Pn = {
  __name: "ModalMove",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, a = M(e.modal.data.items.from), s = M(""), c = () => {
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
    return (i, d) => (_(), W(Ke, null, {
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
        r("div", ru, b(o(n)("%s item(s) selected.", a.value.length)), 1)
      ]),
      default: Q(() => [
        r("div", null, [
          z(Qe, {
            icon: o(zd),
            title: o(n)("Move files")
          }, null, 8, ["icon", "title"]),
          r("div", Pd, [
            r("p", jd, b(o(n)("Are you sure you want to move these files?")), 1),
            r("div", Gd, [
              (_(!0), g(ge, null, ke(a.value, (l) => (_(), g("div", Kd, [
                r("div", null, [
                  l.type === "dir" ? (_(), g("svg", Wd, Xd)) : (_(), g("svg", Jd, Qd))
                ]),
                r("div", eu, b(l.path), 1)
              ]))), 256))
            ]),
            r("h4", tu, b(o(n)("Target Directory")), 1),
            r("p", nu, [
              su,
              r("span", ou, b(o(e).modal.data.items.to.path), 1)
            ]),
            s.value.length ? (_(), W(We, {
              key: 0,
              onHidden: d[0] || (d[0] = (l) => s.value = ""),
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
}, lu = /* @__PURE__ */ r("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1), iu = [
  lu
];
function cu(t, e) {
  return _(), g("svg", au, [...iu]);
}
const du = { render: cu }, uu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
}, _u = /* @__PURE__ */ r("path", {
  "fill-rule": "evenodd",
  d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
  class: "pointer-events-none",
  "clip-rule": "evenodd"
}, null, -1), vu = [
  _u
];
function fu(t, e) {
  return _(), g("svg", uu, [...vu]);
}
const mu = { render: fu }, pu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "0 0 24 24"
}, hu = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18 18 6M6 6l12 12"
}, null, -1), gu = [
  hu
];
function bu(t, e) {
  return _(), g("svg", pu, [...gu]);
}
const wu = { render: bu }, yu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 20 20"
}, $u = /* @__PURE__ */ r("path", {
  d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
  class: "pointer-events-none"
}, null, -1), ku = [
  $u
];
function xu(t, e) {
  return _(), g("svg", yu, [...ku]);
}
const Su = { render: xu }, Cu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20",
  viewBox: "0 0 20 20"
}, Eu = /* @__PURE__ */ r("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1), Au = [
  Eu
];
function Mu(t, e) {
  return _(), g("svg", Cu, [...Au]);
}
const Tu = { render: Mu }, Du = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
}, Vu = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M6 18 18 6M6 6l12 12"
}, null, -1), Ou = [
  Vu
];
function Lu(t, e) {
  return _(), g("svg", Du, [...Ou]);
}
const Fu = { render: Lu }, Hu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  viewBox: "0 0 24 24"
}, Ru = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
}, null, -1), Bu = [
  Ru
];
function Iu(t, e) {
  return _(), g("svg", Hu, [...Bu]);
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
}, Uu = /* @__PURE__ */ r("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), qu = /* @__PURE__ */ r("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1), zu = [
  Uu,
  qu
];
function Pu(t, e) {
  return _(), g("svg", Nu, [...zu]);
}
const ju = { render: Pu }, Gu = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 rounded text-slate-700 hover:bg-neutral-100 dark:fill-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 448 512"
}, Ku = /* @__PURE__ */ r("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1), Wu = [
  Ku
];
function Yu(t, e) {
  return _(), g("svg", Gu, [...Wu]);
}
const Xu = { render: Yu }, Ju = { class: "vuefinder__breadcrumb__container" }, Zu = ["title"], Qu = ["title"], e_ = ["title"], t_ = ["title"], n_ = { class: "vuefinder__breadcrumb__list" }, s_ = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, o_ = /* @__PURE__ */ r("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1), r_ = { class: "relative" }, a_ = /* @__PURE__ */ r("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1), l_ = ["onDragover", "onDragleave", "onDrop", "title", "onClick"], i_ = { class: "vuefinder__breadcrumb__search-mode" }, c_ = ["placeholder"], d_ = { class: "vuefinder__breadcrumb__hidden-dropdown" }, u_ = ["onDrop", "onClick"], __ = { class: "vuefinder__breadcrumb__hidden-item-content" }, v_ = { class: "vuefinder__breadcrumb__hidden-item-text" }, f_ = {
  __name: "Breadcrumb",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, a = e.dragSelect, { setStore: s } = e.storage, c = M(null), i = Vs(0, 100);
    He(i, (V) => {
      const S = c.value.children;
      let y = 0, C = 0, E = 5, B = 1;
      e.fs.limitBreadcrumbItems(E), ct(() => {
        for (let $ = S.length - 1; $ >= 0 && !(y + S[$].offsetWidth > i.value - 40); $--)
          y += parseInt(S[$].offsetWidth, 10), C++;
        C < B && (C = B), C > E && (C = E), e.fs.limitBreadcrumbItems(C);
      });
    });
    const d = () => {
      i.value = c.value.offsetWidth;
    };
    let l = M(null);
    xe(() => {
      l.value = new ResizeObserver(d), l.value.observe(c.value);
    }), jn(() => {
      l.value.disconnect();
    });
    const u = (V, S = null) => {
      V.preventDefault(), a.isDraggingRef.value = !1, p(V), S ?? (S = e.fs.hiddenBreadcrumbs.length - 1);
      let y = JSON.parse(V.dataTransfer.getData("items"));
      if (y.find((C) => C.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Pn, {
        items: {
          from: y,
          to: e.fs.hiddenBreadcrumbs[S] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, f = (V, S = null) => {
      V.preventDefault(), a.isDraggingRef.value = !1, p(V), S ?? (S = e.fs.breadcrumbs.length - 2);
      let y = JSON.parse(V.dataTransfer.getData("items"));
      if (y.find((C) => C.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Pn, {
        items: {
          from: y,
          to: e.fs.breadcrumbs[S] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, v = (V) => {
      V.preventDefault(), e.fs.isGoUpAvailable() ? (V.dataTransfer.dropEffect = "copy", V.currentTarget.classList.add("bg-blue-200", "dark:bg-slate-600")) : (V.dataTransfer.dropEffect = "none", V.dataTransfer.effectAllowed = "none");
    }, p = (V) => {
      V.preventDefault(), V.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600"), e.fs.isGoUpAvailable() && V.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600");
    }, m = () => {
      O(), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    }, h = () => {
      O(), !e.fs.isGoUpAvailable() || e.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          adapter: e.fs.adapter,
          path: e.fs.parentFolderPath
        }
      });
    }, k = (V) => {
      e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: V.path } }), e.fs.toggleHiddenBreadcrumbs(!1);
    }, w = () => {
      e.fs.showHiddenBreadcrumbs && e.fs.toggleHiddenBreadcrumbs(!1);
    }, T = {
      mounted(V, S, y, C) {
        V.clickOutsideEvent = function(E) {
          V === E.target || V.contains(E.target) || S.value();
        }, document.body.addEventListener("click", V.clickOutsideEvent);
      },
      beforeUnmount(V, S, y, C) {
        document.body.removeEventListener("click", V.clickOutsideEvent);
      }
    }, R = () => {
      e.showTreeView = !e.showTreeView;
    };
    He(() => e.showTreeView, (V, S) => {
      V !== S && s("show-tree-view", V);
    });
    const F = M(null), x = () => {
      e.features.includes(de.SEARCH) && (e.fs.searchMode = !0, ct(() => F.value.focus()));
    }, D = Vs("", 400);
    He(D, (V) => {
      e.emitter.emit("vf-toast-clear"), e.emitter.emit("vf-search-query", { newQuery: V });
    }), He(() => e.fs.searchMode, (V) => {
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
    return (V, S) => (_(), g("div", Ju, [
      r("span", {
        title: o(n)("Toggle Tree View")
      }, [
        z(o(ju), {
          onClick: R,
          class: ae(["vuefinder__breadcrumb__toggle-tree", o(e).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""])
        }, null, 8, ["class"])
      ], 8, Zu),
      r("span", {
        title: o(n)("Go up a directory")
      }, [
        z(o(mu), {
          onDragover: S[0] || (S[0] = (y) => v(y)),
          onDragleave: S[1] || (S[1] = (y) => p(y)),
          onDrop: S[2] || (S[2] = (y) => f(y)),
          onClick: h,
          class: ae(o(e).fs.isGoUpAvailable() ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive")
        }, null, 8, ["class"])
      ], 8, Qu),
      o(e).fs.loading ? (_(), g("span", {
        key: 1,
        title: o(n)("Cancel")
      }, [
        z(o(wu), {
          onClick: S[3] || (S[3] = (y) => o(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, t_)) : (_(), g("span", {
        key: 0,
        title: o(n)("Refresh")
      }, [
        z(o(du), { onClick: m })
      ], 8, e_)),
      ue(r("div", {
        onClick: st(x, ["self"]),
        class: "group vuefinder__breadcrumb__search-container"
      }, [
        r("div", null, [
          z(o(Su), {
            onDragover: S[4] || (S[4] = (y) => v(y)),
            onDragleave: S[5] || (S[5] = (y) => p(y)),
            onDrop: S[6] || (S[6] = (y) => f(y, -1)),
            onClick: S[7] || (S[7] = (y) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: o(e).fs.adapter } }))
          })
        ]),
        r("div", n_, [
          o(e).fs.hiddenBreadcrumbs.length ? ue((_(), g("div", s_, [
            o_,
            r("div", r_, [
              r("span", {
                onDragenter: S[8] || (S[8] = (y) => o(e).fs.toggleHiddenBreadcrumbs(!0)),
                onClick: S[9] || (S[9] = (y) => o(e).fs.toggleHiddenBreadcrumbs()),
                class: "vuefinder__breadcrumb__hidden-toggle"
              }, [
                z(o(Xu), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [T, w]
          ]) : q("", !0)
        ]),
        r("div", {
          ref_key: "breadcrumbContainer",
          ref: c,
          class: "vuefinder__breadcrumb__visible-list",
          onClick: st(x, ["self"])
        }, [
          (_(!0), g(ge, null, ke(o(e).fs.breadcrumbs, (y, C) => (_(), g("div", { key: C }, [
            a_,
            r("span", {
              onDragover: (E) => C === o(e).fs.breadcrumbs.length - 1 || v(E),
              onDragleave: (E) => C === o(e).fs.breadcrumbs.length - 1 || p(E),
              onDrop: (E) => C === o(e).fs.breadcrumbs.length - 1 || f(E, C),
              class: "vuefinder__breadcrumb__item",
              title: y.basename,
              onClick: (E) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: o(e).fs.adapter, path: y.path } })
            }, b(y.name), 41, l_)
          ]))), 128))
        ], 512),
        o(e).fs.loading ? (_(), W(o(is), { key: 0 })) : q("", !0)
      ], 512), [
        [Ue, !o(e).fs.searchMode]
      ]),
      ue(r("div", i_, [
        r("div", null, [
          z(o(Tu))
        ]),
        ue(r("input", {
          ref_key: "searchInput",
          ref: F,
          onKeydown: $t(O, ["esc"]),
          onBlur: P,
          "onUpdate:modelValue": S[10] || (S[10] = (y) => or(D) ? D.value = y : null),
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
      ue(r("div", d_, [
        (_(!0), g(ge, null, ke(o(e).fs.hiddenBreadcrumbs, (y, C) => (_(), g("div", {
          key: C,
          onDragover: S[11] || (S[11] = (E) => v(E)),
          onDragleave: S[12] || (S[12] = (E) => p(E)),
          onDrop: (E) => u(E, C),
          onClick: (E) => k(y),
          class: "vuefinder__breadcrumb__hidden-item"
        }, [
          r("div", __, [
            r("span", null, [
              z(o(mn), { class: "vuefinder__breadcrumb__hidden-item-icon" })
            ]),
            J(),
            r("span", v_, b(y.name), 1)
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
    const e = re("ServiceContainer"), { getStore: n } = e.storage, a = M(n("full-screen", !1)), s = M([]), c = (l) => l === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", i = (l) => {
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
      class: ae(["vuefinder__toast", a.value.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"])
    }, [
      z(rr, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: Q(() => [
          (_(!0), g(ge, null, ke(s.value, (f, v) => (_(), g("div", {
            key: v,
            onClick: (p) => i(v),
            class: ae(["vuefinder__toast__message", c(f.type)])
          }, b(f.label), 11, m_))), 128))
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
}, g_ = /* @__PURE__ */ r("path", {
  "fill-rule": "evenodd",
  d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
  "clip-rule": "evenodd"
}, null, -1), b_ = [
  g_
];
function w_(t, e) {
  return _(), g("svg", h_, [...b_]);
}
const y_ = { render: w_ }, $_ = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
}, k_ = /* @__PURE__ */ r("path", {
  "fill-rule": "evenodd",
  d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
  "clip-rule": "evenodd"
}, null, -1), x_ = [
  k_
];
function S_(t, e) {
  return _(), g("svg", $_, [...x_]);
}
const C_ = { render: S_ }, Gt = {
  __name: "SortIcon",
  props: { direction: String },
  setup(t) {
    return (e, n) => (_(), g("div", null, [
      t.direction === "asc" ? (_(), W(o(y_), { key: 0 })) : q("", !0),
      t.direction === "desc" ? (_(), W(o(C_), { key: 1 })) : q("", !0)
    ]));
  }
}, E_ = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500",
  viewBox: "0 0 24 24"
}, A_ = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
}, null, -1), M_ = [
  A_
];
function T_(t, e) {
  return _(), g("svg", E_, [...M_]);
}
const D_ = { render: T_ }, V_ = { class: "vuefinder__item-icon" }, Sn = {
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
    return (e, n) => (_(), g("span", V_, [
      t.type === "dir" ? (_(), W(o(mn), {
        key: 0,
        class: ae(t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large")
      }, null, 8, ["class"])) : (_(), W(o(D_), {
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
}, L_ = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
}, null, -1), F_ = [
  L_
];
function H_(t, e) {
  return _(), g("svg", O_, [...F_]);
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
    return (n, a) => (_(), g("div", B_, [
      z(o(R_)),
      r("div", I_, b(e.count), 1)
    ]));
  }
}, U_ = { class: "vuefinder__text-preview" }, q_ = { class: "vuefinder__text-preview__header" }, z_ = ["title"], P_ = { class: "vuefinder__text-preview__actions" }, j_ = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, G_ = { key: 1 }, K_ = {
  __name: "Text",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, a = M(""), s = M(""), c = M(null), i = M(!1), d = M(""), l = M(!1), u = re("ServiceContainer"), { t: f } = u.i18n;
    xe(() => {
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
    return (m, h) => (_(), g("div", U_, [
      r("div", q_, [
        r("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: o(u).modal.data.item.path
        }, b(o(u).modal.data.item.basename), 9, z_),
        r("div", P_, [
          i.value ? (_(), g("button", {
            key: 0,
            onClick: p,
            class: "vuefinder__text-preview__save-button"
          }, b(o(f)("Save")), 1)) : q("", !0),
          o(u).features.includes(o(de).EDIT) ? (_(), g("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: h[0] || (h[0] = (k) => v())
          }, b(i.value ? o(f)("Cancel") : o(f)("Edit")), 1)) : q("", !0)
        ])
      ]),
      r("div", null, [
        i.value ? (_(), g("div", G_, [
          ue(r("textarea", {
            ref_key: "editInput",
            ref: c,
            "onUpdate:modelValue": h[1] || (h[1] = (k) => s.value = k),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [kt, s.value]
          ])
        ])) : (_(), g("pre", j_, b(a.value), 1)),
        d.value.length ? (_(), W(We, {
          key: 2,
          onHidden: h[2] || (h[2] = (k) => d.value = ""),
          error: l.value
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
    const n = e, a = re("ServiceContainer"), { t: s } = a.i18n, c = M(null), i = M(null), d = M(!1), l = M(""), u = M(!1), f = () => {
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
    return xe(() => {
      n("success");
    }), (p, m) => (_(), g("div", W_, [
      r("div", Y_, [
        r("h3", {
          class: "vuefinder__image-preview__title",
          id: "modal-title",
          title: o(a).modal.data.item.path
        }, b(o(a).modal.data.item.basename), 9, X_),
        r("div", J_, [
          d.value ? (_(), g("button", {
            key: 0,
            onClick: v,
            class: "vuefinder__image-preview__crop-button"
          }, b(o(s)("Crop")), 1)) : q("", !0),
          o(a).features.includes(o(de).EDIT) ? (_(), g("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: m[0] || (m[0] = (h) => f())
          }, b(d.value ? o(s)("Cancel") : o(s)("Edit")), 1)) : q("", !0)
        ])
      ]),
      r("div", Z_, [
        r("img", {
          ref_key: "image",
          ref: c,
          class: "vuefinder__image-preview__image",
          src: o(a).requester.getPreviewUrl(o(a).modal.data.adapter, o(a).modal.data.item),
          alt: ""
        }, null, 8, Q_)
      ]),
      l.value.length ? (_(), W(We, {
        key: 0,
        onHidden: m[1] || (m[1] = (h) => l.value = ""),
        error: u.value
      }, {
        default: Q(() => [
          J(b(l.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : q("", !0)
    ]));
  }
}, tv = { class: "vuefinder__default-preview" }, nv = { class: "vuefinder__default-preview__header" }, sv = ["title"], ov = /* @__PURE__ */ r("div", null, null, -1), rv = {
  __name: "Default",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = re("ServiceContainer"), a = e;
    return xe(() => {
      a("success");
    }), (s, c) => (_(), g("div", tv, [
      r("div", nv, [
        r("h3", {
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
    const n = re("ServiceContainer"), a = e, s = () => n.requester.getPreviewUrl(n.modal.data.adapter, n.modal.data.item);
    return xe(() => {
      a("success");
    }), (c, i) => (_(), g("div", av, [
      r("h3", {
        class: "vuefinder__video-preview__title",
        id: "modal-title",
        title: o(n).modal.data.item.path
      }, b(o(n).modal.data.item.basename), 9, lv),
      r("div", null, [
        r("video", iv, [
          r("source", {
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
    const n = e, a = re("ServiceContainer"), s = () => a.requester.getPreviewUrl(a.modal.data.adapter, a.modal.data.item);
    return xe(() => {
      n("success");
    }), (c, i) => (_(), g("div", uv, [
      r("h3", {
        class: "vuefinder__audio-preview__title",
        id: "modal-title",
        title: o(a).modal.data.item.path
      }, b(o(a).modal.data.item.basename), 9, _v),
      r("div", null, [
        r("audio", vv, [
          r("source", {
            src: s(),
            type: "audio/mpeg"
          }, null, 8, fv),
          J(" Your browser does not support the audio element. ")
        ])
      ])
    ]));
  }
}, pv = { class: "vuefinder__pdf-preview" }, hv = ["title"], gv = ["data"], bv = ["src"], wv = /* @__PURE__ */ r("p", null, [
  /* @__PURE__ */ J(" Your browser does not support PDFs. "),
  /* @__PURE__ */ r("a", { href: "https://example.com/test.pdf" }, "Download the PDF"),
  /* @__PURE__ */ J(". ")
], -1), yv = [
  wv
], $v = {
  __name: "Pdf",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = re("ServiceContainer"), a = e, s = () => n.requester.getPreviewUrl(n.modal.data.adapter, n.modal.data.item);
    return xe(() => {
      a("success");
    }), (c, i) => (_(), g("div", pv, [
      r("h3", {
        class: "vuefinder__pdf-preview__title",
        id: "modal-title",
        title: o(n).modal.data.item.path
      }, b(o(n).modal.data.item.basename), 9, hv),
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
          }, yv, 8, bv)
        ], 8, gv)
      ])
    ]));
  }
}, kv = { class: "vuefinder__preview-modal__content" }, xv = { key: 0 }, Sv = { class: "vuefinder__preview-modal__loading" }, Cv = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, Ev = /* @__PURE__ */ r("svg", {
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
], -1), Av = { class: "vuefinder__preview-modal__details" }, Mv = { class: "font-bold" }, Tv = { class: "font-bold pl-2" }, Dv = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, Vv = ["download", "href"], Uo = {
  __name: "ModalPreview",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, a = M(!1), s = (i) => (e.modal.data.item.mime_type ?? "").startsWith(i), c = e.features.includes(de.PREVIEW);
    return c || (a.value = !0), (i, d) => (_(), W(Ke, null, {
      buttons: Q(() => [
        r("button", {
          type: "button",
          onClick: d[6] || (d[6] = (l) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(o(n)("Close")), 1),
        o(e).features.includes(o(de).DOWNLOAD) ? (_(), g("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: o(e).requester.getDownloadUrl(o(e).modal.data.adapter, o(e).modal.data.item),
          href: o(e).requester.getDownloadUrl(o(e).modal.data.adapter, o(e).modal.data.item)
        }, b(o(n)("Download")), 9, Vv)) : q("", !0)
      ]),
      default: Q(() => [
        r("div", null, [
          r("div", kv, [
            o(c) ? (_(), g("div", xv, [
              s("text") ? (_(), W(K_, {
                key: 0,
                onSuccess: d[0] || (d[0] = (l) => a.value = !0)
              })) : s("image") ? (_(), W(ev, {
                key: 1,
                onSuccess: d[1] || (d[1] = (l) => a.value = !0)
              })) : s("video") ? (_(), W(dv, {
                key: 2,
                onSuccess: d[2] || (d[2] = (l) => a.value = !0)
              })) : s("audio") ? (_(), W(mv, {
                key: 3,
                onSuccess: d[3] || (d[3] = (l) => a.value = !0)
              })) : s("application/pdf") ? (_(), W($v, {
                key: 4,
                onSuccess: d[4] || (d[4] = (l) => a.value = !0)
              })) : (_(), W(rv, {
                key: 5,
                onSuccess: d[5] || (d[5] = (l) => a.value = !0)
              }))
            ])) : q("", !0),
            r("div", Sv, [
              a.value === !1 ? (_(), g("div", Cv, [
                Ev,
                r("span", null, b(o(n)("Loading")), 1)
              ])) : q("", !0)
            ])
          ])
        ]),
        r("div", Av, [
          r("div", null, [
            r("span", Mv, b(o(n)("File Size")) + ": ", 1),
            J(b(o(e).filesize(o(e).modal.data.item.file_size)), 1)
          ]),
          r("div", null, [
            r("span", Tv, b(o(n)("Last Modified")) + ": ", 1),
            J(" " + b(o(No)(o(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        o(e).features.includes(o(de).DOWNLOAD) ? (_(), g("div", Dv, [
          r("span", null, b(o(n)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
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
}, Lv = /* @__PURE__ */ r("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), Fv = /* @__PURE__ */ r("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1), Hv = [
  Lv,
  Fv
];
function Rv(t, e) {
  return _(), g("svg", Ov, [...Hv]);
}
const qo = { render: Rv }, Bv = ["data-type", "data-item", "data-index"], Cn = {
  __name: "Item",
  props: {
    item: { type: Object },
    index: { type: Number },
    dragImage: { type: Object }
  },
  setup(t) {
    const e = re("ServiceContainer"), n = e.dragSelect, a = t, s = (m) => {
      m.type === "dir" ? (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: m.path } })) : e.modal.open(Uo, { adapter: e.fs.adapter, item: m });
    }, c = {
      mounted(m, h, k, w) {
        k.props.draggable && (m.addEventListener("dragstart", (T) => i(T, h.value)), m.addEventListener("dragover", (T) => l(T, h.value)), m.addEventListener("drop", (T) => d(T, h.value)));
      },
      beforeUnmount(m, h, k, w) {
        k.props.draggable && (m.removeEventListener("dragstart", i), m.removeEventListener("dragover", l), m.removeEventListener("drop", d));
      }
    }, i = (m, h) => {
      if (m.altKey || m.ctrlKey || m.metaKey)
        return m.preventDefault(), !1;
      n.isDraggingRef.value = !0, m.dataTransfer.setDragImage(a.dragImage.$el, 0, 15), m.dataTransfer.effectAllowed = "all", m.dataTransfer.dropEffect = "copy", m.dataTransfer.setData("items", JSON.stringify(n.getSelected()));
    }, d = (m, h) => {
      m.preventDefault(), n.isDraggingRef.value = !1;
      let k = JSON.parse(m.dataTransfer.getData("items"));
      if (k.find((w) => w.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Pn, { items: { from: k, to: h } });
    }, l = (m, h) => {
      m.preventDefault(), !h || h.type !== "dir" || n.getSelection().find((k) => k === m.currentTarget) ? (m.dataTransfer.dropEffect = "none", m.dataTransfer.effectAllowed = "none") : m.dataTransfer.dropEffect = "copy";
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
    return (m, h) => ue((_(), g("div", {
      style: rn({ opacity: o(n).isDraggingRef.value && o(n).getSelection().find((k) => m.$el === k) ? "0.5 !important" : "" }),
      class: ae(["vuefinder__item", "vf-item-" + o(n).explorerId]),
      "data-type": t.item.type,
      key: t.item.path,
      "data-item": JSON.stringify(t.item),
      "data-index": t.index,
      onDblclick: h[0] || (h[0] = (k) => s(t.item)),
      onTouchstart: h[1] || (h[1] = (k) => p(k)),
      onTouchend: h[2] || (h[2] = (k) => v()),
      onContextmenu: h[3] || (h[3] = st((k) => o(e).emitter.emit("vf-contextmenu-show", { event: k, items: o(n).getSelected(), target: t.item }), ["prevent"]))
    }, [
      Mt(m.$slots, "default"),
      o(e).pinnedFolders.find((k) => k.path === t.item.path) ? (_(), W(o(qo), {
        key: 0,
        class: "vuefinder__item--pinned"
      })) : q("", !0)
    ], 46, Bv)), [
      [c, t.item]
    ]);
  }
}, Iv = { class: "vuefinder__explorer__container" }, Nv = {
  key: 0,
  class: "vuefinder__explorer__header"
}, Uv = { class: "vuefinder__explorer__drag-item" }, qv = { class: "vuefinder__explorer__item-list-content" }, zv = { class: "vuefinder__explorer__item-list-name" }, Pv = { class: "vuefinder__explorer__item-name" }, jv = { class: "vuefinder__explorer__item-path" }, Gv = { class: "vuefinder__explorer__item-list-content" }, Kv = { class: "vuefinder__explorer__item-list-name" }, Wv = { class: "vuefinder__explorer__item-name" }, Yv = { class: "vuefinder__explorer__item-size" }, Xv = { class: "vuefinder__explorer__item-date" }, Jv = { class: "vuefinder__explorer__item-grid-content" }, Zv = ["data-src", "alt"], Qv = {
  key: 2,
  class: "vuefinder__explorer__item-extension"
}, ef = { class: "vuefinder__explorer__item-title break-all" }, tf = {
  __name: "Explorer",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, a = (v) => v == null ? void 0 : v.substring(0, 3), s = M(null), c = M(""), i = e.dragSelect;
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
      const k = (w, T) => typeof w == "string" && typeof T == "string" ? w.toLowerCase().localeCompare(T.toLowerCase()) : w < T ? -1 : w > T ? 1 : 0;
      return l.active && (p = p.slice().sort((w, T) => k(w[m], T[m]) * h)), p;
    }, f = (v) => {
      l.active && l.column === v ? (l.active = l.order === "asc", l.column = v, l.order = "desc") : (l.active = !0, l.column = v, l.order = "asc");
    };
    return xe(() => {
      d = new fr(i.area.value);
    }), Ls(() => {
      d.update();
    }), Hs(() => {
      d.destroy();
    }), (v, p) => (_(), g("div", Iv, [
      o(e).view === "list" || c.value.length ? (_(), g("div", Nv, [
        r("div", {
          onClick: p[0] || (p[0] = (m) => f("basename")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
        }, [
          J(b(o(n)("Name")) + " ", 1),
          ue(z(Gt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [Ue, l.active && l.column === "basename"]
          ])
        ]),
        c.value.length ? q("", !0) : (_(), g("div", {
          key: 0,
          onClick: p[1] || (p[1] = (m) => f("file_size")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button"
        }, [
          J(b(o(n)("Size")) + " ", 1),
          ue(z(Gt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [Ue, l.active && l.column === "file_size"]
          ])
        ])),
        c.value.length ? q("", !0) : (_(), g("div", {
          key: 1,
          onClick: p[2] || (p[2] = (m) => f("last_modified")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button"
        }, [
          J(b(o(n)("Date")) + " ", 1),
          ue(z(Gt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [Ue, l.active && l.column === "last_modified"]
          ])
        ])),
        c.value.length ? (_(), g("div", {
          key: 2,
          onClick: p[3] || (p[3] = (m) => f("path")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--path vf-sort-button"
        }, [
          J(b(o(n)("Filepath")) + " ", 1),
          ue(z(Gt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [Ue, l.active && l.column === "path"]
          ])
        ])) : q("", !0)
      ])) : q("", !0),
      r("div", Uv, [
        z(N_, {
          ref_key: "dragImage",
          ref: s,
          count: o(i).getCount()
        }, null, 8, ["count"])
      ]),
      r("div", {
        ref: o(i).scrollBarContainer,
        class: ae(["vf-explorer-scrollbar-container vuefinder__explorer__scrollbar-container", [{ "grid-view": o(e).view === "grid" }, { "search-active": c.value.length }]])
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
        c.value.length ? (_(!0), g(ge, { key: 0 }, ke(u(), (m, h) => (_(), W(Cn, {
          item: m,
          index: h,
          dragImage: s.value,
          class: "vf-item vf-item-list"
        }, {
          default: Q(() => [
            r("div", qv, [
              r("div", zv, [
                z(Sn, {
                  type: m.type,
                  small: o(e).compactListView
                }, null, 8, ["type", "small"]),
                r("span", Pv, b(m.basename), 1)
              ]),
              r("div", jv, b(m.path), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : q("", !0),
        o(e).view === "list" && !c.value.length ? (_(!0), g(ge, { key: 1 }, ke(u(), (m, h) => (_(), W(Cn, {
          item: m,
          index: h,
          dragImage: s.value,
          class: "vf-item vf-item-list",
          draggable: "true",
          key: m.path
        }, {
          default: Q(() => [
            r("div", Gv, [
              r("div", Kv, [
                z(Sn, {
                  type: m.type,
                  small: o(e).compactListView
                }, null, 8, ["type", "small"]),
                r("span", Wv, b(m.basename), 1)
              ]),
              r("div", Yv, b(m.file_size ? o(e).filesize(m.file_size) : ""), 1),
              r("div", Xv, b(o(No)(m.last_modified)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 128)) : q("", !0),
        o(e).view === "grid" && !c.value.length ? (_(!0), g(ge, { key: 2 }, ke(u(!1), (m, h) => (_(), W(Cn, {
          item: m,
          index: h,
          dragImage: s.value,
          class: "vf-item vf-item-grid",
          draggable: "true"
        }, {
          default: Q(() => [
            r("div", null, [
              r("div", Jv, [
                (m.mime_type ?? "").startsWith("image") && o(e).showThumbnails ? (_(), g("img", {
                  src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
                  class: "vuefinder__explorer__item-thumbnail lazy",
                  "data-src": o(e).requester.getPreviewUrl(o(e).fs.adapter, m),
                  alt: m.basename,
                  key: m.path
                }, null, 8, Zv)) : (_(), W(Sn, {
                  key: 1,
                  type: m.type
                }, null, 8, ["type"])),
                !((m.mime_type ?? "").startsWith("image") && o(e).showThumbnails) && m.type !== "dir" ? (_(), g("div", Qv, b(a(m.extension)), 1)) : q("", !0)
              ]),
              r("span", ef, b(o(zn)(m.basename)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : q("", !0)
      ], 544),
      z(p_)
    ]));
  }
}, nf = ["href", "download"], sf = ["onClick"], of = {
  __name: "ContextMenu",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, a = M(null), s = M([]), c = M(""), i = yt({
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
    const l = {
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
      let k = v.clientX - m.left, w = v.clientY - m.top;
      i.active = !0, ct(() => {
        var x;
        const T = (x = a.value) == null ? void 0 : x.getBoundingClientRect();
        let R = (T == null ? void 0 : T.height) ?? 0, F = (T == null ? void 0 : T.width) ?? 0;
        k = h.right - v.pageX + window.scrollX < F ? k - F : k, w = h.bottom - v.pageY + window.scrollY < R ? w - R : w, i.positions = {
          left: k + "px",
          top: w + "px"
        };
      });
    };
    return (v, p) => ue((_(), g("ul", {
      ref_key: "contextmenu",
      ref: a,
      style: rn(i.positions),
      class: "vuefinder__context-menu"
    }, [
      (_(!0), g(ge, null, ke(d.value, (m) => (_(), g("li", {
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
        ], 8, nf)) : (_(), g("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (h) => u(m)
        }, [
          r("span", null, b(m.title()), 1)
        ], 8, sf))
      ]))), 128))
    ], 4)), [
      [Ue, i.active]
    ]);
  }
}, rf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
}, af = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
}, null, -1), lf = [
  af
];
function cf(t, e) {
  return _(), g("svg", rf, [...lf]);
}
const zo = { render: cf }, df = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  class: "h-5 w-5 stroke-slate-500 cursor-pointer",
  viewBox: "0 0 24 24"
}, uf = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
}, null, -1), _f = [
  uf
];
function vf(t, e) {
  return _(), g("svg", df, [..._f]);
}
const ff = { render: vf }, mf = { class: "vuefinder__status-bar__wrapper" }, pf = { class: "vuefinder__status-bar__storage" }, hf = ["title"], gf = { class: "vuefinder__status-bar__storage-icon" }, bf = ["value"], wf = { class: "vuefinder__status-bar__info" }, yf = { key: 0 }, $f = { class: "vuefinder__status-bar__selected-count" }, kf = { class: "vuefinder__status-bar__actions" }, xf = ["disabled"], Sf = ["title"], Cf = {
  __name: "Statusbar",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, { setStore: a } = e.storage, s = e.dragSelect, c = () => {
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter } }), a("adapter", e.fs.adapter);
    }, i = M("");
    e.emitter.on("vf-search-query", ({ newQuery: l }) => {
      i.value = l;
    });
    const d = rt(() => {
      const l = e.selectButton.multiple ? s.getSelected().length > 0 : s.getSelected().length === 1;
      return e.selectButton.active && l;
    });
    return (l, u) => (_(), g("div", mf, [
      r("div", pf, [
        r("div", {
          class: "vuefinder__status-bar__storage-container",
          title: o(n)("Storage")
        }, [
          r("div", gf, [
            z(o(zo))
          ]),
          ue(r("select", {
            "onUpdate:modelValue": u[0] || (u[0] = (f) => o(e).fs.adapter = f),
            onChange: c,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1"
          }, [
            (_(!0), g(ge, null, ke(o(e).fs.data.storages, (f) => (_(), g("option", { value: f }, b(f), 9, bf))), 256))
          ], 544), [
            [En, o(e).fs.adapter]
          ])
        ], 8, hf),
        r("div", wf, [
          i.value.length ? (_(), g("span", yf, b(o(e).fs.data.files.length) + " items found. ", 1)) : q("", !0),
          r("span", $f, b(o(e).dragSelect.getCount() > 0 ? o(n)("%s item(s) selected.", o(e).dragSelect.getCount()) : ""), 1)
        ])
      ]),
      r("div", kf, [
        o(e).selectButton.active ? (_(), g("button", {
          key: 0,
          class: ae(["vf-btn py-0 vf-btn-primary", { disabled: !d.value }]),
          disabled: !d.value,
          onClick: u[1] || (u[1] = (f) => o(e).selectButton.click(o(s).getSelected(), f))
        }, b(o(n)("Select")), 11, xf)) : q("", !0),
        r("span", {
          class: "vuefinder__status-bar__about",
          title: o(n)("About"),
          onClick: u[2] || (u[2] = (f) => o(e).modal.open(Mo))
        }, [
          z(o(ff))
        ], 8, Sf)
      ])
    ]));
  }
}, Ef = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "text-neutral-500 fill-sky-500 stroke-gray-100/50 dark:stroke-slate-700/50 dark:fill-slate-500",
  viewBox: "0 0 24 24"
}, Af = /* @__PURE__ */ r("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
}, null, -1), Mf = [
  Af
];
function Tf(t, e) {
  return _(), g("svg", Ef, [...Mf]);
}
const Po = { render: Tf }, Df = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
}, Vf = /* @__PURE__ */ r("path", {
  fill: "none",
  d: "M0 0h24v24H0z"
}, null, -1), Of = /* @__PURE__ */ r("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1), Lf = [
  Vf,
  Of
];
function Ff(t, e) {
  return _(), g("svg", Df, [...Lf]);
}
const Hf = { render: Ff }, Rf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
}, Bf = /* @__PURE__ */ r("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), If = /* @__PURE__ */ r("path", { d: "M15 12H9M12 9v6" }, null, -1), Nf = [
  Bf,
  If
];
function Uf(t, e) {
  return _(), g("svg", Rf, [...Nf]);
}
const jo = { render: Uf }, qf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
}, zf = /* @__PURE__ */ r("path", {
  stroke: "none",
  d: "M0 0h24v24H0z"
}, null, -1), Pf = /* @__PURE__ */ r("path", { d: "M9 12h6" }, null, -1), jf = [
  zf,
  Pf
];
function Gf(t, e) {
  return _(), g("svg", qf, [...jf]);
}
const Go = { render: Gf };
function Ko(t, e) {
  const n = t.findIndex((a) => a.path === e.path);
  n > -1 ? t[n] = e : t.push(e);
}
const Kf = { class: "vuefinder__folder-loader-indicator" }, Wf = {
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
    const a = Rs(t, "modelValue"), s = M(!1);
    He(
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
        Ko(n.treeViewData, { path: e.path, ...d });
      }).catch((d) => {
      }).finally(() => {
        s.value = !1;
      });
    };
    return (d, l) => {
      var u;
      return _(), g("div", Kf, [
        s.value ? (_(), W(o(is), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--loading"
        })) : (_(), g("div", Wf, [
          a.value && ((u = c()) != null && u.folders.length) ? (_(), W(o(Go), {
            key: 0,
            class: "vuefinder__folder-loader-indicator--minus"
          })) : q("", !0),
          a.value ? q("", !0) : (_(), W(o(jo), {
            key: 1,
            class: "vuefinder__folder-loader-indicator--plus"
          }))
        ]))
      ]);
    };
  }
}, Yf = { class: "vuefinder__treesubfolderlist__item-content" }, Xf = ["onClick"], Jf = ["title", "onClick"], Zf = { class: "vuefinder__treesubfolderlist__item-icon" }, Qf = { class: "vuefinder__treesubfolderlist__subfolder" }, em = {
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
    const e = re("ServiceContainer"), n = M([]), a = t, s = M(null);
    xe(() => {
      a.path === a.adapter + "://" && je(s.value, {
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    });
    const c = rt(() => {
      var i;
      return ((i = e.treeViewData.find((d) => d.path === a.path)) == null ? void 0 : i.folders) || [];
    });
    return (i, d) => {
      const l = lr("TreeSubfolderList", !0);
      return _(), g("ul", {
        ref_key: "parentSubfolderList",
        ref: s,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        (_(!0), g(ge, null, ke(c.value, (u, f) => (_(), g("li", {
          key: u.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          r("div", Yf, [
            r("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (v) => n.value[u.path] = !n.value[u.path]
            }, [
              z(Wo, {
                adapter: t.adapter,
                path: u.path,
                modelValue: n.value[u.path],
                "onUpdate:modelValue": (v) => n.value[u.path] = v
              }, null, 8, ["adapter", "path", "modelValue", "onUpdate:modelValue"])
            ], 8, Xf),
            r("div", {
              class: "vuefinder__treesubfolderlist__item-link",
              title: u.path,
              onClick: (v) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: a.adapter, path: u.path } })
            }, [
              r("div", Zf, [
                o(e).fs.path === u.path ? (_(), W(o(Po), { key: 0 })) : (_(), W(o(mn), { key: 1 }))
              ]),
              r("div", {
                class: ae(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": o(e).fs.path === u.path
                }])
              }, b(u.basename), 3)
            ], 8, Jf)
          ]),
          r("div", Qf, [
            ue(z(l, {
              adapter: a.adapter,
              path: u.path
            }, null, 8, ["adapter", "path"]), [
              [Ue, n.value[u.path]]
            ])
          ])
        ]))), 128))
      ], 512);
    };
  }
}, tm = { class: "vuefinder__treestorageitem__loader" }, nm = {
  __name: "TreeStorageItem",
  props: {
    storage: {
      type: String,
      required: !0
    }
  },
  setup(t) {
    const e = re("ServiceContainer"), n = M(!1);
    return (a, s) => (_(), g(ge, null, [
      r("div", {
        onClick: s[1] || (s[1] = (c) => n.value = !n.value),
        class: "vuefinder__treestorageitem__header"
      }, [
        r("div", {
          class: ae(["vuefinder__treestorageitem__info", t.storage === o(e).fs.adapter ? "vuefinder__treestorageitem__info--active" : ""])
        }, [
          r("div", {
            class: ae(["vuefinder__treestorageitem__icon", t.storage === o(e).fs.adapter ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            z(o(zo))
          ], 2),
          r("div", null, b(t.storage), 1)
        ], 2),
        r("div", tm, [
          z(Wo, {
            adapter: t.storage,
            path: t.storage + "://",
            modelValue: n.value,
            "onUpdate:modelValue": s[0] || (s[0] = (c) => n.value = c)
          }, null, 8, ["adapter", "path", "modelValue"])
        ])
      ]),
      ue(z(em, {
        adapter: t.storage,
        path: t.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["adapter", "path"]), [
        [Ue, n.value]
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
    const e = Rs(t, "modelValue");
    return (n, a) => (_(), g("div", sm, [
      r("div", om, [
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
}, am = { class: "vuefinder__treeview__header" }, lm = { class: "vuefinder__treeview__pinned-label" }, im = { class: "vuefinder__treeview__pin-text text-nowrap" }, cm = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, dm = { class: "vuefinder__treeview__pinned-item" }, um = ["onClick"], _m = ["title"], vm = ["onClick"], fm = { key: 0 }, mm = { class: "vuefinder__treeview__no-pinned" }, pm = { class: "vuefinder__treeview__storage" }, hm = {
  __name: "TreeView",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, { getStore: a, setStore: s } = e.storage, c = M(190), i = M(a("pinned-folders-opened", !0));
    He(i, (f) => s("pinned-folders-opened", f));
    const d = (f) => {
      e.pinnedFolders = e.pinnedFolders.filter((v) => v.path !== f.path), e.storage.setStore("pinned-folders", e.pinnedFolders);
    }, l = (f) => {
      const v = f.clientX, p = f.target.parentElement, m = p.getBoundingClientRect().width;
      p.classList.remove("transition-[width]"), p.classList.add("transition-none");
      const h = (w) => {
        c.value = m + w.clientX - v, c.value < 50 && (c.value = 0, e.showTreeView = !1), c.value > 50 && (e.showTreeView = !0);
      }, k = () => {
        const w = p.getBoundingClientRect();
        c.value = w.width, p.classList.add("transition-[width]"), p.classList.remove("transition-none"), window.removeEventListener("mousemove", h), window.removeEventListener("mouseup", k);
      };
      window.addEventListener("mousemove", h), window.addEventListener("mouseup", k);
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
    }), He(e.fs.data, (f, v) => {
      const p = f.files.filter((m) => m.type === "dir");
      Ko(e.treeViewData, { path: e.fs.path, folders: p.map((m) => ({
        adapter: m.storage,
        path: m.path,
        basename: m.basename
      })) });
    }), (f, v) => (_(), g(ge, null, [
      r("div", {
        onClick: v[0] || (v[0] = (p) => o(e).showTreeView = !o(e).showTreeView),
        class: ae(["vuefinder__treeview__overlay", o(e).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"])
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
          r("div", am, [
            r("div", {
              onClick: v[2] || (v[2] = (p) => i.value = !i.value),
              class: "vuefinder__treeview__pinned-toggle"
            }, [
              r("div", lm, [
                z(o(qo), { class: "vuefinder__treeview__pin-icon" }),
                r("div", im, b(o(n)("Pinned Folders")), 1)
              ]),
              z(rm, {
                modelValue: i.value,
                "onUpdate:modelValue": v[1] || (v[1] = (p) => i.value = p)
              }, null, 8, ["modelValue"])
            ]),
            i.value ? (_(), g("ul", cm, [
              (_(!0), g(ge, null, ke(o(e).pinnedFolders, (p) => (_(), g("li", dm, [
                r("div", {
                  class: "vuefinder__treeview__pinned-folder",
                  onClick: (m) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: p.storage, path: p.path } })
                }, [
                  o(e).fs.path !== p.path ? (_(), W(o(mn), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon"
                  })) : q("", !0),
                  o(e).fs.path === p.path ? (_(), W(o(Po), {
                    key: 1,
                    class: "vuefinder__treeview__open-folder-icon"
                  })) : q("", !0),
                  r("div", {
                    title: p.path,
                    class: ae(["vuefinder__treeview__folder-name text-nowrap", {
                      "vuefinder__treeview__folder-name--active": o(e).fs.path === p.path
                    }])
                  }, b(p.basename), 11, _m)
                ], 8, um),
                r("div", {
                  class: "vuefinder__treeview__remove-favorite",
                  onClick: (m) => d(p)
                }, [
                  z(o(Hf), { class: "vuefinder__treeview__remove-icon" })
                ], 8, vm)
              ]))), 256)),
              o(e).pinnedFolders.length ? q("", !0) : (_(), g("li", fm, [
                r("div", mm, b(o(n)("No folders pinned")), 1)
              ]))
            ])) : q("", !0)
          ]),
          (_(!0), g(ge, null, ke(o(e).fs.data.storages, (p) => (_(), g("div", pm, [
            z(nm, { storage: p }, null, 8, ["storage"])
          ]))), 256))
        ], 512),
        r("div", {
          onMousedown: l,
          class: ae([(o(e).showTreeView, ""), "vuefinder__treeview__resize-handle"])
        }, null, 34)
      ], 4)
    ], 64));
  }
}, gm = { class: "vuefinder__main__content" }, bm = {
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
    const n = e, s = Ta(t, re("VueFinderOptions"));
    ir("ServiceContainer", s);
    const { setStore: c } = s.storage, i = M(null);
    s.root = i;
    const d = s.dragSelect;
    Fi(s);
    const l = (f) => {
      Object.assign(s.fs.data, f), d.clearSelection(), d.refreshSelection();
    };
    let u;
    return s.emitter.on("vf-fetch-abort", () => {
      u.abort(), s.fs.loading = !1;
    }), s.emitter.on("vf-fetch", ({ params: f, body: v = null, onSuccess: p = null, onError: m = null, noCloseModal: h = !1 }) => {
      ["index", "search"].includes(f.q) && (u && u.abort(), s.fs.loading = !0), u = new AbortController();
      const k = u.signal;
      s.requester.send({
        url: "",
        method: f.m || "get",
        params: f,
        body: v,
        abortSignal: k
      }).then((w) => {
        s.fs.adapter = w.adapter, s.persist && (s.fs.path = w.dirname, c("path", s.fs.path)), ["index", "search"].includes(f.q) && (s.fs.loading = !1), h || s.modal.close(), l(w), p && p(w);
      }).catch((w) => {
        console.error(w), m && m(w);
      });
    }), xe(() => {
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
        class: ae(o(s).theme.actualValue)
      }, [
        r("div", {
          class: ae([o(s).fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative", "vuefinder__main__container"]),
          style: rn(o(s).fullScreen ? "" : "max-height: " + t.maxHeight),
          onMousedown: v[0] || (v[0] = (p) => o(s).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: v[1] || (v[1] = (p) => o(s).emitter.emit("vf-contextmenu-hide"))
        }, [
          z(Rd),
          z(f_),
          r("div", gm, [
            z(hm),
            z(tf)
          ]),
          z(Cf)
        ], 38),
        z(cr, { name: "fade" }, {
          default: Q(() => [
            o(s).modal.visible ? (_(), W(Fs(o(s).modal.type), { key: 0 })) : q("", !0)
          ]),
          _: 1
        }),
        z(of)
      ], 2)
    ], 512));
  }
}, Mm = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(t, e = {}) {
    e.i18n = e.i18n ?? {};
    let [n] = Object.keys(e.i18n);
    e.locale = e.locale ?? n ?? "en", t.provide("VueFinderOptions", e), t.component("VueFinder", bm);
  }
};
export {
  Mm as default
};
