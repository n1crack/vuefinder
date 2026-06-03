import { defineComponent as vh, ref as Ch, onMounted as Ah, watch as In, onBeforeUnmount as Mh, openBlock as Dh, createElementBlock as Th } from "vue";
let rs = [], Uo = [];
(() => {
  let s = "lc,34,7n,7,7b,19,,,,2,,2,,,20,b,1c,l,g,,2t,7,2,6,2,2,,4,z,,u,r,2j,b,1m,9,9,,o,4,,9,,3,,5,17,3,3b,f,,w,1j,,,,4,8,4,,3,7,a,2,t,,1m,,,,2,4,8,,9,,a,2,q,,2,2,1l,,4,2,4,2,2,3,3,,u,2,3,,b,2,1l,,4,5,,2,4,,k,2,m,6,,,1m,,,2,,4,8,,7,3,a,2,u,,1n,,,,c,,9,,14,,3,,1l,3,5,3,,4,7,2,b,2,t,,1m,,2,,2,,3,,5,2,7,2,b,2,s,2,1l,2,,,2,4,8,,9,,a,2,t,,20,,4,,2,3,,,8,,29,,2,7,c,8,2q,,2,9,b,6,22,2,r,,,,,,1j,e,,5,,2,5,b,,10,9,,2u,4,,6,,2,2,2,p,2,4,3,g,4,d,,2,2,6,,f,,jj,3,qa,3,t,3,t,2,u,2,1s,2,,7,8,,2,b,9,,19,3,3b,2,y,,3a,3,4,2,9,,6,3,63,2,2,,1m,,,7,,,,,2,8,6,a,2,,1c,h,1r,4,1c,7,,,5,,14,9,c,2,w,4,2,2,,3,1k,,,2,3,,,3,1m,8,2,2,48,3,,d,,7,4,,6,,3,2,5i,1m,,5,ek,,5f,x,2da,3,3x,,2o,w,fe,6,2x,2,n9w,4,,a,w,2,28,2,7k,,3,,4,,p,2,5,,47,2,q,i,d,,12,8,p,b,1a,3,1c,,2,4,2,2,13,,1v,6,2,2,2,2,c,,8,,1b,,1f,,,3,2,2,5,2,,,16,2,8,,6m,,2,,4,,fn4,,kh,g,g,g,a6,2,gt,,6a,,45,5,1ae,3,,2,5,4,14,3,4,,4l,2,fx,4,ar,2,49,b,4w,,1i,f,1k,3,1d,4,2,2,1x,3,10,5,,8,1q,,c,2,1g,9,a,4,2,,2n,3,2,,,2,6,,4g,,3,8,l,2,1l,2,,,,,m,,e,7,3,5,5f,8,2,3,,,n,,29,,2,6,,,2,,,2,,2,6j,,2,4,6,2,,2,r,2,2d,8,2,,,2,2y,,,,2,6,,,2t,3,2,4,,5,77,9,,2,6t,,a,2,,,4,,40,4,2,2,4,,w,a,14,6,2,4,8,,9,6,2,3,1a,d,,2,ba,7,,6,,,2a,m,2,7,,2,,2,3e,6,3,,,2,,7,,,20,2,3,,,,9n,2,f0b,5,1n,7,t4,,1r,4,29,,f5k,2,43q,,,3,4,5,8,8,2,7,u,4,44,3,1iz,1j,4,1e,8,,e,,m,5,,f,11s,7,,h,2,7,,2,,5,79,7,c5,4,15s,7,31,7,240,5,gx7k,2o,3k,6o".split(",").map((e) => e ? parseInt(e, 36) : 1);
  for (let e = 0, t = 0; e < s.length; e++)
    (e % 2 ? Uo : rs).push(t = t + s[e]);
})();
function Oh(s) {
  if (s < 768) return !1;
  for (let e = 0, t = rs.length; ; ) {
    let i = e + t >> 1;
    if (s < rs[i]) t = i;
    else if (s >= Uo[i]) e = i + 1;
    else return !0;
    if (e == t) return !1;
  }
}
function vr(s) {
  return s >= 127462 && s <= 127487;
}
const Cr = 8205;
function Bh(s, e, t = !0, i = !0) {
  return (t ? Go : Eh)(s, e, i);
}
function Go(s, e, t) {
  if (e == s.length) return e;
  e && _o(s.charCodeAt(e)) && Jo(s.charCodeAt(e - 1)) && e--;
  let i = Nn(s, e);
  for (e += Ar(i); e < s.length; ) {
    let n = Nn(s, e);
    if (i == Cr || n == Cr || t && Oh(n))
      e += Ar(n), i = n;
    else if (vr(n)) {
      let r = 0, o = e - 2;
      for (; o >= 0 && vr(Nn(s, o)); )
        r++, o -= 2;
      if (r % 2 == 0) break;
      e += 2;
    } else
      break;
  }
  return e;
}
function Eh(s, e, t) {
  for (; e > 0; ) {
    let i = Go(s, e - 2, t);
    if (i < e) return i;
    e--;
  }
  return 0;
}
function Nn(s, e) {
  let t = s.charCodeAt(e);
  if (!Jo(t) || e + 1 == s.length) return t;
  let i = s.charCodeAt(e + 1);
  return _o(i) ? (t - 55296 << 10) + (i - 56320) + 65536 : t;
}
function _o(s) {
  return s >= 56320 && s < 57344;
}
function Jo(s) {
  return s >= 55296 && s < 56320;
}
function Ar(s) {
  return s < 65536 ? 1 : 2;
}
class N {
  /**
  Get the line description around the given position.
  */
  lineAt(e) {
    if (e < 0 || e > this.length)
      throw new RangeError(`Invalid position ${e} in document of length ${this.length}`);
    return this.lineInner(e, !1, 1, 0);
  }
  /**
  Get the description for the given (1-based) line number.
  */
  line(e) {
    if (e < 1 || e > this.lines)
      throw new RangeError(`Invalid line number ${e} in ${this.lines}-line document`);
    return this.lineInner(e, !0, 1, 0);
  }
  /**
  Replace a range of the text with the given content.
  */
  replace(e, t, i) {
    [e, t] = Nt(this, e, t);
    let n = [];
    return this.decompose(
      0,
      e,
      n,
      2
      /* Open.To */
    ), i.length && i.decompose(
      0,
      i.length,
      n,
      3
      /* Open.To */
    ), this.decompose(
      t,
      this.length,
      n,
      1
      /* Open.From */
    ), We.from(n, this.length - (t - e) + i.length);
  }
  /**
  Append another document to this one.
  */
  append(e) {
    return this.replace(this.length, this.length, e);
  }
  /**
  Retrieve the text between the given points.
  */
  slice(e, t = this.length) {
    [e, t] = Nt(this, e, t);
    let i = [];
    return this.decompose(e, t, i, 0), We.from(i, t - e);
  }
  /**
  Test whether this text is equal to another instance.
  */
  eq(e) {
    if (e == this)
      return !0;
    if (e.length != this.length || e.lines != this.lines)
      return !1;
    let t = this.scanIdentical(e, 1), i = this.length - this.scanIdentical(e, -1), n = new ti(this), r = new ti(e);
    for (let o = t, l = t; ; ) {
      if (n.next(o), r.next(o), o = 0, n.lineBreak != r.lineBreak || n.done != r.done || n.value != r.value)
        return !1;
      if (l += n.value.length, n.done || l >= i)
        return !0;
    }
  }
  /**
  Iterate over the text. When `dir` is `-1`, iteration happens
  from end to start. This will return lines and the breaks between
  them as separate strings.
  */
  iter(e = 1) {
    return new ti(this, e);
  }
  /**
  Iterate over a range of the text. When `from` > `to`, the
  iterator will run in reverse.
  */
  iterRange(e, t = this.length) {
    return new Yo(this, e, t);
  }
  /**
  Return a cursor that iterates over the given range of lines,
  _without_ returning the line breaks between, and yielding empty
  strings for empty lines.
  
  When `from` and `to` are given, they should be 1-based line numbers.
  */
  iterLines(e, t) {
    let i;
    if (e == null)
      i = this.iter();
    else {
      t == null && (t = this.lines + 1);
      let n = this.line(e).from;
      i = this.iterRange(n, Math.max(n, t == this.lines + 1 ? this.length : t <= 1 ? 0 : this.line(t - 1).to));
    }
    return new Xo(i);
  }
  /**
  Return the document as a string, using newline characters to
  separate lines.
  */
  toString() {
    return this.sliceString(0);
  }
  /**
  Convert the document to an array of lines (which can be
  deserialized again via [`Text.of`](https://codemirror.net/6/docs/ref/#state.Text^of)).
  */
  toJSON() {
    let e = [];
    return this.flatten(e), e;
  }
  /**
  @internal
  */
  constructor() {
  }
  /**
  Create a `Text` instance for the given array of lines.
  */
  static of(e) {
    if (e.length == 0)
      throw new RangeError("A document must have at least one line");
    return e.length == 1 && !e[0] ? N.empty : e.length <= 32 ? new G(e) : We.from(G.split(e, []));
  }
}
class G extends N {
  constructor(e, t = Lh(e)) {
    super(), this.text = e, this.length = t;
  }
  get lines() {
    return this.text.length;
  }
  get children() {
    return null;
  }
  lineInner(e, t, i, n) {
    for (let r = 0; ; r++) {
      let o = this.text[r], l = n + o.length;
      if ((t ? i : l) >= e)
        return new Ph(n, l, i, o);
      n = l + 1, i++;
    }
  }
  decompose(e, t, i, n) {
    let r = e <= 0 && t >= this.length ? this : new G(Mr(this.text, e, t), Math.min(t, this.length) - Math.max(0, e));
    if (n & 1) {
      let o = i.pop(), l = ji(r.text, o.text.slice(), 0, r.length);
      if (l.length <= 32)
        i.push(new G(l, o.length + r.length));
      else {
        let a = l.length >> 1;
        i.push(new G(l.slice(0, a)), new G(l.slice(a)));
      }
    } else
      i.push(r);
  }
  replace(e, t, i) {
    if (!(i instanceof G))
      return super.replace(e, t, i);
    [e, t] = Nt(this, e, t);
    let n = ji(this.text, ji(i.text, Mr(this.text, 0, e)), t), r = this.length + i.length - (t - e);
    return n.length <= 32 ? new G(n, r) : We.from(G.split(n, []), r);
  }
  sliceString(e, t = this.length, i = `
`) {
    [e, t] = Nt(this, e, t);
    let n = "";
    for (let r = 0, o = 0; r <= t && o < this.text.length; o++) {
      let l = this.text[o], a = r + l.length;
      r > e && o && (n += i), e < a && t > r && (n += l.slice(Math.max(0, e - r), t - r)), r = a + 1;
    }
    return n;
  }
  flatten(e) {
    for (let t of this.text)
      e.push(t);
  }
  scanIdentical() {
    return 0;
  }
  static split(e, t) {
    let i = [], n = -1;
    for (let r of e)
      i.push(r), n += r.length + 1, i.length == 32 && (t.push(new G(i, n)), i = [], n = -1);
    return n > -1 && t.push(new G(i, n)), t;
  }
}
class We extends N {
  constructor(e, t) {
    super(), this.children = e, this.length = t, this.lines = 0;
    for (let i of e)
      this.lines += i.lines;
  }
  lineInner(e, t, i, n) {
    for (let r = 0; ; r++) {
      let o = this.children[r], l = n + o.length, a = i + o.lines - 1;
      if ((t ? a : l) >= e)
        return o.lineInner(e, t, i, n);
      n = l + 1, i = a + 1;
    }
  }
  decompose(e, t, i, n) {
    for (let r = 0, o = 0; o <= t && r < this.children.length; r++) {
      let l = this.children[r], a = o + l.length;
      if (e <= a && t >= o) {
        let h = n & ((o <= e ? 1 : 0) | (a >= t ? 2 : 0));
        o >= e && a <= t && !h ? i.push(l) : l.decompose(e - o, t - o, i, h);
      }
      o = a + 1;
    }
  }
  replace(e, t, i) {
    if ([e, t] = Nt(this, e, t), i.lines < this.lines)
      for (let n = 0, r = 0; n < this.children.length; n++) {
        let o = this.children[n], l = r + o.length;
        if (e >= r && t <= l) {
          let a = o.replace(e - r, t - r, i), h = this.lines - o.lines + a.lines;
          if (a.lines < h >> 4 && a.lines > h >> 6) {
            let f = this.children.slice();
            return f[n] = a, new We(f, this.length - (t - e) + i.length);
          }
          return super.replace(r, l, a);
        }
        r = l + 1;
      }
    return super.replace(e, t, i);
  }
  sliceString(e, t = this.length, i = `
`) {
    [e, t] = Nt(this, e, t);
    let n = "";
    for (let r = 0, o = 0; r < this.children.length && o <= t; r++) {
      let l = this.children[r], a = o + l.length;
      o > e && r && (n += i), e < a && t > o && (n += l.sliceString(e - o, t - o, i)), o = a + 1;
    }
    return n;
  }
  flatten(e) {
    for (let t of this.children)
      t.flatten(e);
  }
  scanIdentical(e, t) {
    if (!(e instanceof We))
      return 0;
    let i = 0, [n, r, o, l] = t > 0 ? [0, 0, this.children.length, e.children.length] : [this.children.length - 1, e.children.length - 1, -1, -1];
    for (; ; n += t, r += t) {
      if (n == o || r == l)
        return i;
      let a = this.children[n], h = e.children[r];
      if (a != h)
        return i + a.scanIdentical(h, t);
      i += a.length + 1;
    }
  }
  static from(e, t = e.reduce((i, n) => i + n.length + 1, -1)) {
    let i = 0;
    for (let d of e)
      i += d.lines;
    if (i < 32) {
      let d = [];
      for (let p of e)
        p.flatten(d);
      return new G(d, t);
    }
    let n = Math.max(
      32,
      i >> 5
      /* Tree.BranchShift */
    ), r = n << 1, o = n >> 1, l = [], a = 0, h = -1, f = [];
    function c(d) {
      let p;
      if (d.lines > r && d instanceof We)
        for (let g of d.children)
          c(g);
      else d.lines > o && (a > o || !a) ? (u(), l.push(d)) : d instanceof G && a && (p = f[f.length - 1]) instanceof G && d.lines + p.lines <= 32 ? (a += d.lines, h += d.length + 1, f[f.length - 1] = new G(p.text.concat(d.text), p.length + 1 + d.length)) : (a + d.lines > n && u(), a += d.lines, h += d.length + 1, f.push(d));
    }
    function u() {
      a != 0 && (l.push(f.length == 1 ? f[0] : We.from(f, h)), h = -1, a = f.length = 0);
    }
    for (let d of e)
      c(d);
    return u(), l.length == 1 ? l[0] : new We(l, t);
  }
}
N.empty = /* @__PURE__ */ new G([""], 0);
function Lh(s) {
  let e = -1;
  for (let t of s)
    e += t.length + 1;
  return e;
}
function ji(s, e, t = 0, i = 1e9) {
  for (let n = 0, r = 0, o = !0; r < s.length && n <= i; r++) {
    let l = s[r], a = n + l.length;
    a >= t && (a > i && (l = l.slice(0, i - n)), n < t && (l = l.slice(t - n)), o ? (e[e.length - 1] += l, o = !1) : e.push(l)), n = a + 1;
  }
  return e;
}
function Mr(s, e, t) {
  return ji(s, [""], e, t);
}
class ti {
  constructor(e, t = 1) {
    this.dir = t, this.done = !1, this.lineBreak = !1, this.value = "", this.nodes = [e], this.offsets = [t > 0 ? 1 : (e instanceof G ? e.text.length : e.children.length) << 1];
  }
  nextInner(e, t) {
    for (this.done = this.lineBreak = !1; ; ) {
      let i = this.nodes.length - 1, n = this.nodes[i], r = this.offsets[i], o = r >> 1, l = n instanceof G ? n.text.length : n.children.length;
      if (o == (t > 0 ? l : 0)) {
        if (i == 0)
          return this.done = !0, this.value = "", this;
        t > 0 && this.offsets[i - 1]++, this.nodes.pop(), this.offsets.pop();
      } else if ((r & 1) == (t > 0 ? 0 : 1)) {
        if (this.offsets[i] += t, e == 0)
          return this.lineBreak = !0, this.value = `
`, this;
        e--;
      } else if (n instanceof G) {
        let a = n.text[o + (t < 0 ? -1 : 0)];
        if (this.offsets[i] += t, a.length > Math.max(0, e))
          return this.value = e == 0 ? a : t > 0 ? a.slice(e) : a.slice(0, a.length - e), this;
        e -= a.length;
      } else {
        let a = n.children[o + (t < 0 ? -1 : 0)];
        e > a.length ? (e -= a.length, this.offsets[i] += t) : (t < 0 && this.offsets[i]--, this.nodes.push(a), this.offsets.push(t > 0 ? 1 : (a instanceof G ? a.text.length : a.children.length) << 1));
      }
    }
  }
  next(e = 0) {
    return e < 0 && (this.nextInner(-e, -this.dir), e = this.value.length), this.nextInner(e, this.dir);
  }
}
class Yo {
  constructor(e, t, i) {
    this.value = "", this.done = !1, this.cursor = new ti(e, t > i ? -1 : 1), this.pos = t > i ? e.length : 0, this.from = Math.min(t, i), this.to = Math.max(t, i);
  }
  nextInner(e, t) {
    if (t < 0 ? this.pos <= this.from : this.pos >= this.to)
      return this.value = "", this.done = !0, this;
    e += Math.max(0, t < 0 ? this.pos - this.to : this.from - this.pos);
    let i = t < 0 ? this.pos - this.from : this.to - this.pos;
    e > i && (e = i), i -= e;
    let { value: n } = this.cursor.next(e);
    return this.pos += (n.length + e) * t, this.value = n.length <= i ? n : t < 0 ? n.slice(n.length - i) : n.slice(0, i), this.done = !this.value, this;
  }
  next(e = 0) {
    return e < 0 ? e = Math.max(e, this.from - this.pos) : e > 0 && (e = Math.min(e, this.to - this.pos)), this.nextInner(e, this.cursor.dir);
  }
  get lineBreak() {
    return this.cursor.lineBreak && this.value != "";
  }
}
class Xo {
  constructor(e) {
    this.inner = e, this.afterBreak = !0, this.value = "", this.done = !1;
  }
  next(e = 0) {
    let { done: t, lineBreak: i, value: n } = this.inner.next(e);
    return t && this.afterBreak ? (this.value = "", this.afterBreak = !1) : t ? (this.done = !0, this.value = "") : i ? this.afterBreak ? this.value = "" : (this.afterBreak = !0, this.next()) : (this.value = n, this.afterBreak = !1), this;
  }
  get lineBreak() {
    return !1;
  }
}
typeof Symbol < "u" && (N.prototype[Symbol.iterator] = function() {
  return this.iter();
}, ti.prototype[Symbol.iterator] = Yo.prototype[Symbol.iterator] = Xo.prototype[Symbol.iterator] = function() {
  return this;
});
class Ph {
  /**
  @internal
  */
  constructor(e, t, i, n) {
    this.from = e, this.to = t, this.number = i, this.text = n;
  }
  /**
  The length of the line (not including any line break after it).
  */
  get length() {
    return this.to - this.from;
  }
}
function Nt(s, e, t) {
  return e = Math.max(0, Math.min(s.length, e)), [e, Math.max(e, Math.min(s.length, t))];
}
function ee(s, e, t = !0, i = !0) {
  return Bh(s, e, t, i);
}
function Rh(s) {
  return s >= 56320 && s < 57344;
}
function Ih(s) {
  return s >= 55296 && s < 56320;
}
function Qo(s, e) {
  let t = s.charCodeAt(e);
  if (!Ih(t) || e + 1 == s.length)
    return t;
  let i = s.charCodeAt(e + 1);
  return Rh(i) ? (t - 55296 << 10) + (i - 56320) + 65536 : t;
}
function Nh(s) {
  return s <= 65535 ? String.fromCharCode(s) : (s -= 65536, String.fromCharCode((s >> 10) + 55296, (s & 1023) + 56320));
}
function Zo(s) {
  return s < 65536 ? 1 : 2;
}
const os = /\r\n?|\n/;
var me = /* @__PURE__ */ (function(s) {
  return s[s.Simple = 0] = "Simple", s[s.TrackDel = 1] = "TrackDel", s[s.TrackBefore = 2] = "TrackBefore", s[s.TrackAfter = 3] = "TrackAfter", s;
})(me || (me = {}));
class je {
  // Sections are encoded as pairs of integers. The first is the
  // length in the current document, and the second is -1 for
  // unaffected sections, and the length of the replacement content
  // otherwise. So an insertion would be (0, n>0), a deletion (n>0,
  // 0), and a replacement two positive numbers.
  /**
  @internal
  */
  constructor(e) {
    this.sections = e;
  }
  /**
  The length of the document before the change.
  */
  get length() {
    let e = 0;
    for (let t = 0; t < this.sections.length; t += 2)
      e += this.sections[t];
    return e;
  }
  /**
  The length of the document after the change.
  */
  get newLength() {
    let e = 0;
    for (let t = 0; t < this.sections.length; t += 2) {
      let i = this.sections[t + 1];
      e += i < 0 ? this.sections[t] : i;
    }
    return e;
  }
  /**
  False when there are actual changes in this set.
  */
  get empty() {
    return this.sections.length == 0 || this.sections.length == 2 && this.sections[1] < 0;
  }
  /**
  Iterate over the unchanged parts left by these changes. `posA`
  provides the position of the range in the old document, `posB`
  the new position in the changed document.
  */
  iterGaps(e) {
    for (let t = 0, i = 0, n = 0; t < this.sections.length; ) {
      let r = this.sections[t++], o = this.sections[t++];
      o < 0 ? (e(i, n, r), n += r) : n += o, i += r;
    }
  }
  /**
  Iterate over the ranges changed by these changes. (See
  [`ChangeSet.iterChanges`](https://codemirror.net/6/docs/ref/#state.ChangeSet.iterChanges) for a
  variant that also provides you with the inserted text.)
  `fromA`/`toA` provides the extent of the change in the starting
  document, `fromB`/`toB` the extent of the replacement in the
  changed document.
  
  When `individual` is true, adjacent changes (which are kept
  separate for [position mapping](https://codemirror.net/6/docs/ref/#state.ChangeDesc.mapPos)) are
  reported separately.
  */
  iterChangedRanges(e, t = !1) {
    ls(this, e, t);
  }
  /**
  Get a description of the inverted form of these changes.
  */
  get invertedDesc() {
    let e = [];
    for (let t = 0; t < this.sections.length; ) {
      let i = this.sections[t++], n = this.sections[t++];
      n < 0 ? e.push(i, n) : e.push(n, i);
    }
    return new je(e);
  }
  /**
  Compute the combined effect of applying another set of changes
  after this one. The length of the document after this set should
  match the length before `other`.
  */
  composeDesc(e) {
    return this.empty ? e : e.empty ? this : el(this, e);
  }
  /**
  Map this description, which should start with the same document
  as `other`, over another set of changes, so that it can be
  applied after it. When `before` is true, map as if the changes
  in `this` happened before the ones in `other`.
  */
  mapDesc(e, t = !1) {
    return e.empty ? this : as(this, e, t);
  }
  mapPos(e, t = -1, i = me.Simple) {
    let n = 0, r = 0;
    for (let o = 0; o < this.sections.length; ) {
      let l = this.sections[o++], a = this.sections[o++], h = n + l;
      if (a < 0) {
        if (h > e)
          return r + (e - n);
        r += l;
      } else {
        if (i != me.Simple && h >= e && (i == me.TrackDel && n < e && h > e || i == me.TrackBefore && n < e || i == me.TrackAfter && h > e))
          return null;
        if (h > e || h == e && t < 0 && !l)
          return e == n || t < 0 ? r : r + a;
        r += a;
      }
      n = h;
    }
    if (e > n)
      throw new RangeError(`Position ${e} is out of range for changeset of length ${n}`);
    return r;
  }
  /**
  Check whether these changes touch a given range. When one of the
  changes entirely covers the range, the string `"cover"` is
  returned.
  */
  touchesRange(e, t = e) {
    for (let i = 0, n = 0; i < this.sections.length && n <= t; ) {
      let r = this.sections[i++], o = this.sections[i++], l = n + r;
      if (o >= 0 && n <= t && l >= e)
        return n < e && l > t ? "cover" : !0;
      n = l;
    }
    return !1;
  }
  /**
  @internal
  */
  toString() {
    let e = "";
    for (let t = 0; t < this.sections.length; ) {
      let i = this.sections[t++], n = this.sections[t++];
      e += (e ? " " : "") + i + (n >= 0 ? ":" + n : "");
    }
    return e;
  }
  /**
  Serialize this change desc to a JSON-representable value.
  */
  toJSON() {
    return this.sections;
  }
  /**
  Create a change desc from its JSON representation (as produced
  by [`toJSON`](https://codemirror.net/6/docs/ref/#state.ChangeDesc.toJSON).
  */
  static fromJSON(e) {
    if (!Array.isArray(e) || e.length % 2 || e.some((t) => typeof t != "number"))
      throw new RangeError("Invalid JSON representation of ChangeDesc");
    return new je(e);
  }
  /**
  @internal
  */
  static create(e) {
    return new je(e);
  }
}
class X extends je {
  constructor(e, t) {
    super(e), this.inserted = t;
  }
  /**
  Apply the changes to a document, returning the modified
  document.
  */
  apply(e) {
    if (this.length != e.length)
      throw new RangeError("Applying change set to a document with the wrong length");
    return ls(this, (t, i, n, r, o) => e = e.replace(n, n + (i - t), o), !1), e;
  }
  mapDesc(e, t = !1) {
    return as(this, e, t, !0);
  }
  /**
  Given the document as it existed _before_ the changes, return a
  change set that represents the inverse of this set, which could
  be used to go from the document created by the changes back to
  the document as it existed before the changes.
  */
  invert(e) {
    let t = this.sections.slice(), i = [];
    for (let n = 0, r = 0; n < t.length; n += 2) {
      let o = t[n], l = t[n + 1];
      if (l >= 0) {
        t[n] = l, t[n + 1] = o;
        let a = n >> 1;
        for (; i.length < a; )
          i.push(N.empty);
        i.push(o ? e.slice(r, r + o) : N.empty);
      }
      r += o;
    }
    return new X(t, i);
  }
  /**
  Combine two subsequent change sets into a single set. `other`
  must start in the document produced by `this`. If `this` goes
  `docA` → `docB` and `other` represents `docB` → `docC`, the
  returned value will represent the change `docA` → `docC`.
  */
  compose(e) {
    return this.empty ? e : e.empty ? this : el(this, e, !0);
  }
  /**
  Given another change set starting in the same document, maps this
  change set over the other, producing a new change set that can be
  applied to the document produced by applying `other`. When
  `before` is `true`, order changes as if `this` comes before
  `other`, otherwise (the default) treat `other` as coming first.
  
  Given two changes `A` and `B`, `A.compose(B.map(A))` and
  `B.compose(A.map(B, true))` will produce the same document. This
  provides a basic form of [operational
  transformation](https://en.wikipedia.org/wiki/Operational_transformation),
  and can be used for collaborative editing.
  */
  map(e, t = !1) {
    return e.empty ? this : as(this, e, t, !0);
  }
  /**
  Iterate over the changed ranges in the document, calling `f` for
  each, with the range in the original document (`fromA`-`toA`)
  and the range that replaces it in the new document
  (`fromB`-`toB`).
  
  When `individual` is true, adjacent changes are reported
  separately.
  */
  iterChanges(e, t = !1) {
    ls(this, e, t);
  }
  /**
  Get a [change description](https://codemirror.net/6/docs/ref/#state.ChangeDesc) for this change
  set.
  */
  get desc() {
    return je.create(this.sections);
  }
  /**
  @internal
  */
  filter(e) {
    let t = [], i = [], n = [], r = new li(this);
    e: for (let o = 0, l = 0; ; ) {
      let a = o == e.length ? 1e9 : e[o++];
      for (; l < a || l == a && r.len == 0; ) {
        if (r.done)
          break e;
        let f = Math.min(r.len, a - l);
        se(n, f, -1);
        let c = r.ins == -1 ? -1 : r.off == 0 ? r.ins : 0;
        se(t, f, c), c > 0 && tt(i, t, r.text), r.forward(f), l += f;
      }
      let h = e[o++];
      for (; l < h; ) {
        if (r.done)
          break e;
        let f = Math.min(r.len, h - l);
        se(t, f, -1), se(n, f, r.ins == -1 ? -1 : r.off == 0 ? r.ins : 0), r.forward(f), l += f;
      }
    }
    return {
      changes: new X(t, i),
      filtered: je.create(n)
    };
  }
  /**
  Serialize this change set to a JSON-representable value.
  */
  toJSON() {
    let e = [];
    for (let t = 0; t < this.sections.length; t += 2) {
      let i = this.sections[t], n = this.sections[t + 1];
      n < 0 ? e.push(i) : n == 0 ? e.push([i]) : e.push([i].concat(this.inserted[t >> 1].toJSON()));
    }
    return e;
  }
  /**
  Create a change set for the given changes, for a document of the
  given length, using `lineSep` as line separator.
  */
  static of(e, t, i) {
    let n = [], r = [], o = 0, l = null;
    function a(f = !1) {
      if (!f && !n.length)
        return;
      o < t && se(n, t - o, -1);
      let c = new X(n, r);
      l = l ? l.compose(c.map(l)) : c, n = [], r = [], o = 0;
    }
    function h(f) {
      if (Array.isArray(f))
        for (let c of f)
          h(c);
      else if (f instanceof X) {
        if (f.length != t)
          throw new RangeError(`Mismatched change set length (got ${f.length}, expected ${t})`);
        a(), l = l ? l.compose(f.map(l)) : f;
      } else {
        let { from: c, to: u = c, insert: d } = f;
        if (c > u || c < 0 || u > t)
          throw new RangeError(`Invalid change range ${c} to ${u} (in doc of length ${t})`);
        let p = d ? typeof d == "string" ? N.of(d.split(i || os)) : d : N.empty, g = p.length;
        if (c == u && g == 0)
          return;
        c < o && a(), c > o && se(n, c - o, -1), se(n, u - c, g), tt(r, n, p), o = u;
      }
    }
    return h(e), a(!l), l;
  }
  /**
  Create an empty changeset of the given length.
  */
  static empty(e) {
    return new X(e ? [e, -1] : [], []);
  }
  /**
  Create a changeset from its JSON representation (as produced by
  [`toJSON`](https://codemirror.net/6/docs/ref/#state.ChangeSet.toJSON).
  */
  static fromJSON(e) {
    if (!Array.isArray(e))
      throw new RangeError("Invalid JSON representation of ChangeSet");
    let t = [], i = [];
    for (let n = 0; n < e.length; n++) {
      let r = e[n];
      if (typeof r == "number")
        t.push(r, -1);
      else {
        if (!Array.isArray(r) || typeof r[0] != "number" || r.some((o, l) => l && typeof o != "string"))
          throw new RangeError("Invalid JSON representation of ChangeSet");
        if (r.length == 1)
          t.push(r[0], 0);
        else {
          for (; i.length < n; )
            i.push(N.empty);
          i[n] = N.of(r.slice(1)), t.push(r[0], i[n].length);
        }
      }
    }
    return new X(t, i);
  }
  /**
  @internal
  */
  static createSet(e, t) {
    return new X(e, t);
  }
}
function se(s, e, t, i = !1) {
  if (e == 0 && t <= 0)
    return;
  let n = s.length - 2;
  n >= 0 && t <= 0 && t == s[n + 1] ? s[n] += e : n >= 0 && e == 0 && s[n] == 0 ? s[n + 1] += t : i ? (s[n] += e, s[n + 1] += t) : s.push(e, t);
}
function tt(s, e, t) {
  if (t.length == 0)
    return;
  let i = e.length - 2 >> 1;
  if (i < s.length)
    s[s.length - 1] = s[s.length - 1].append(t);
  else {
    for (; s.length < i; )
      s.push(N.empty);
    s.push(t);
  }
}
function ls(s, e, t) {
  let i = s.inserted;
  for (let n = 0, r = 0, o = 0; o < s.sections.length; ) {
    let l = s.sections[o++], a = s.sections[o++];
    if (a < 0)
      n += l, r += l;
    else {
      let h = n, f = r, c = N.empty;
      for (; h += l, f += a, a && i && (c = c.append(i[o - 2 >> 1])), !(t || o == s.sections.length || s.sections[o + 1] < 0); )
        l = s.sections[o++], a = s.sections[o++];
      e(n, h, r, f, c), n = h, r = f;
    }
  }
}
function as(s, e, t, i = !1) {
  let n = [], r = i ? [] : null, o = new li(s), l = new li(e);
  for (let a = -1; ; ) {
    if (o.done && l.len || l.done && o.len)
      throw new Error("Mismatched change set lengths");
    if (o.ins == -1 && l.ins == -1) {
      let h = Math.min(o.len, l.len);
      se(n, h, -1), o.forward(h), l.forward(h);
    } else if (l.ins >= 0 && (o.ins < 0 || a == o.i || o.off == 0 && (l.len < o.len || l.len == o.len && !t))) {
      let h = l.len;
      for (se(n, l.ins, -1); h; ) {
        let f = Math.min(o.len, h);
        o.ins >= 0 && a < o.i && o.len <= f && (se(n, 0, o.ins), r && tt(r, n, o.text), a = o.i), o.forward(f), h -= f;
      }
      l.next();
    } else if (o.ins >= 0) {
      let h = 0, f = o.len;
      for (; f; )
        if (l.ins == -1) {
          let c = Math.min(f, l.len);
          h += c, f -= c, l.forward(c);
        } else if (l.ins == 0 && l.len < f)
          f -= l.len, l.next();
        else
          break;
      se(n, h, a < o.i ? o.ins : 0), r && a < o.i && tt(r, n, o.text), a = o.i, o.forward(o.len - f);
    } else {
      if (o.done && l.done)
        return r ? X.createSet(n, r) : je.create(n);
      throw new Error("Mismatched change set lengths");
    }
  }
}
function el(s, e, t = !1) {
  let i = [], n = t ? [] : null, r = new li(s), o = new li(e);
  for (let l = !1; ; ) {
    if (r.done && o.done)
      return n ? X.createSet(i, n) : je.create(i);
    if (r.ins == 0)
      se(i, r.len, 0, l), r.next();
    else if (o.len == 0 && !o.done)
      se(i, 0, o.ins, l), n && tt(n, i, o.text), o.next();
    else {
      if (r.done || o.done)
        throw new Error("Mismatched change set lengths");
      {
        let a = Math.min(r.len2, o.len), h = i.length;
        if (r.ins == -1) {
          let f = o.ins == -1 ? -1 : o.off ? 0 : o.ins;
          se(i, a, f, l), n && f && tt(n, i, o.text);
        } else o.ins == -1 ? (se(i, r.off ? 0 : r.len, a, l), n && tt(n, i, r.textBit(a))) : (se(i, r.off ? 0 : r.len, o.off ? 0 : o.ins, l), n && !o.off && tt(n, i, o.text));
        l = (r.ins > a || o.ins >= 0 && o.len > a) && (l || i.length > h), r.forward2(a), o.forward(a);
      }
    }
  }
}
class li {
  constructor(e) {
    this.set = e, this.i = 0, this.next();
  }
  next() {
    let { sections: e } = this.set;
    this.i < e.length ? (this.len = e[this.i++], this.ins = e[this.i++]) : (this.len = 0, this.ins = -2), this.off = 0;
  }
  get done() {
    return this.ins == -2;
  }
  get len2() {
    return this.ins < 0 ? this.len : this.ins;
  }
  get text() {
    let { inserted: e } = this.set, t = this.i - 2 >> 1;
    return t >= e.length ? N.empty : e[t];
  }
  textBit(e) {
    let { inserted: t } = this.set, i = this.i - 2 >> 1;
    return i >= t.length && !e ? N.empty : t[i].slice(this.off, e == null ? void 0 : this.off + e);
  }
  forward(e) {
    e == this.len ? this.next() : (this.len -= e, this.off += e);
  }
  forward2(e) {
    this.ins == -1 ? this.forward(e) : e == this.ins ? this.next() : (this.ins -= e, this.off += e);
  }
}
class gt {
  constructor(e, t, i) {
    this.from = e, this.to = t, this.flags = i;
  }
  /**
  The anchor of the range—the side that doesn't move when you
  extend it.
  */
  get anchor() {
    return this.flags & 32 ? this.to : this.from;
  }
  /**
  The head of the range, which is moved when the range is
  [extended](https://codemirror.net/6/docs/ref/#state.SelectionRange.extend).
  */
  get head() {
    return this.flags & 32 ? this.from : this.to;
  }
  /**
  True when `anchor` and `head` are at the same position.
  */
  get empty() {
    return this.from == this.to;
  }
  /**
  If this is a cursor that is explicitly associated with the
  character on one of its sides, this returns the side. -1 means
  the character before its position, 1 the character after, and 0
  means no association.
  */
  get assoc() {
    return this.flags & 8 ? -1 : this.flags & 16 ? 1 : 0;
  }
  /**
  The bidirectional text level associated with this cursor, if
  any.
  */
  get bidiLevel() {
    let e = this.flags & 7;
    return e == 7 ? null : e;
  }
  /**
  The goal column (stored vertical offset) associated with a
  cursor. This is used to preserve the vertical position when
  [moving](https://codemirror.net/6/docs/ref/#view.EditorView.moveVertically) across
  lines of different length.
  */
  get goalColumn() {
    let e = this.flags >> 6;
    return e == 16777215 ? void 0 : e;
  }
  /**
  Map this range through a change, producing a valid range in the
  updated document.
  */
  map(e, t = -1) {
    let i, n;
    return this.empty ? i = n = e.mapPos(this.from, t) : (i = e.mapPos(this.from, 1), n = e.mapPos(this.to, -1)), i == this.from && n == this.to ? this : new gt(i, n, this.flags);
  }
  /**
  Extend this range to cover at least `from` to `to`.
  */
  extend(e, t = e, i = 0) {
    if (e <= this.anchor && t >= this.anchor)
      return x.range(e, t, void 0, void 0, i);
    let n = Math.abs(e - this.anchor) > Math.abs(t - this.anchor) ? e : t;
    return x.range(this.anchor, n, void 0, void 0, i);
  }
  /**
  Compare this range to another range.
  */
  eq(e, t = !1) {
    return this.anchor == e.anchor && this.head == e.head && this.goalColumn == e.goalColumn && (!t || !this.empty || this.assoc == e.assoc);
  }
  /**
  Return a JSON-serializable object representing the range.
  */
  toJSON() {
    return { anchor: this.anchor, head: this.head };
  }
  /**
  Convert a JSON representation of a range to a `SelectionRange`
  instance.
  */
  static fromJSON(e) {
    if (!e || typeof e.anchor != "number" || typeof e.head != "number")
      throw new RangeError("Invalid JSON representation for SelectionRange");
    return x.range(e.anchor, e.head);
  }
  /**
  @internal
  */
  static create(e, t, i) {
    return new gt(e, t, i);
  }
}
class x {
  constructor(e, t) {
    this.ranges = e, this.mainIndex = t;
  }
  /**
  Map a selection through a change. Used to adjust the selection
  position for changes.
  */
  map(e, t = -1) {
    return e.empty ? this : x.create(this.ranges.map((i) => i.map(e, t)), this.mainIndex);
  }
  /**
  Compare this selection to another selection. By default, ranges
  are compared only by position. When `includeAssoc` is true,
  cursor ranges must also have the same
  [`assoc`](https://codemirror.net/6/docs/ref/#state.SelectionRange.assoc) value.
  */
  eq(e, t = !1) {
    if (this.ranges.length != e.ranges.length || this.mainIndex != e.mainIndex)
      return !1;
    for (let i = 0; i < this.ranges.length; i++)
      if (!this.ranges[i].eq(e.ranges[i], t))
        return !1;
    return !0;
  }
  /**
  Get the primary selection range. Usually, you should make sure
  your code applies to _all_ ranges, by using methods like
  [`changeByRange`](https://codemirror.net/6/docs/ref/#state.EditorState.changeByRange).
  */
  get main() {
    return this.ranges[this.mainIndex];
  }
  /**
  Make sure the selection only has one range. Returns a selection
  holding only the main range from this selection.
  */
  asSingle() {
    return this.ranges.length == 1 ? this : new x([this.main], 0);
  }
  /**
  Extend this selection with an extra range.
  */
  addRange(e, t = !0) {
    return x.create([e].concat(this.ranges), t ? 0 : this.mainIndex + 1);
  }
  /**
  Replace a given range with another range, and then normalize the
  selection to merge and sort ranges if necessary.
  */
  replaceRange(e, t = this.mainIndex) {
    let i = this.ranges.slice();
    return i[t] = e, x.create(i, this.mainIndex);
  }
  /**
  Convert this selection to an object that can be serialized to
  JSON.
  */
  toJSON() {
    return { ranges: this.ranges.map((e) => e.toJSON()), main: this.mainIndex };
  }
  /**
  Create a selection from a JSON representation.
  */
  static fromJSON(e) {
    if (!e || !Array.isArray(e.ranges) || typeof e.main != "number" || e.main >= e.ranges.length)
      throw new RangeError("Invalid JSON representation for EditorSelection");
    return new x(e.ranges.map((t) => gt.fromJSON(t)), e.main);
  }
  /**
  Create a selection holding a single range.
  */
  static single(e, t = e) {
    return new x([x.range(e, t)], 0);
  }
  /**
  Sort and merge the given set of ranges, creating a valid
  selection.
  */
  static create(e, t = 0) {
    if (e.length == 0)
      throw new RangeError("A selection needs at least one range");
    for (let i = 0, n = 0; n < e.length; n++) {
      let r = e[n];
      if (r.empty ? r.from <= i : r.from < i)
        return x.normalized(e.slice(), t);
      i = r.to;
    }
    return new x(e, t);
  }
  /**
  Create a cursor selection range at the given position. You can
  safely ignore the optional arguments in most situations.
  */
  static cursor(e, t = 0, i, n) {
    return gt.create(e, e, (t == 0 ? 0 : t < 0 ? 8 : 16) | (i == null ? 7 : Math.min(6, i)) | (n ?? 16777215) << 6);
  }
  /**
  Create a selection range.
  */
  static range(e, t, i, n, r) {
    let o = (i ?? 16777215) << 6 | (n == null ? 7 : Math.min(6, n));
    return !r && e != t && (r = t < e ? 1 : -1), t < e ? gt.create(t, e, 48 | o) : gt.create(e, t, (r ? r < 0 ? 8 : 16 : 0) | o);
  }
  /**
  @internal
  */
  static normalized(e, t = 0) {
    let i = e[t];
    e.sort((n, r) => n.from - r.from), t = e.indexOf(i);
    for (let n = 1; n < e.length; n++) {
      let r = e[n], o = e[n - 1];
      if (r.empty ? r.from <= o.to : r.from < o.to) {
        let l = o.from, a = Math.max(r.to, o.to);
        n <= t && t--, e.splice(--n, 2, r.anchor > r.head ? x.range(a, l) : x.range(l, a));
      }
    }
    return new x(e, t);
  }
}
function tl(s, e) {
  for (let t of s.ranges)
    if (t.to > e)
      throw new RangeError("Selection points outside of document");
}
let _s = 0;
class v {
  constructor(e, t, i, n, r) {
    this.combine = e, this.compareInput = t, this.compare = i, this.isStatic = n, this.id = _s++, this.default = e([]), this.extensions = typeof r == "function" ? r(this) : r;
  }
  /**
  Returns a facet reader for this facet, which can be used to
  [read](https://codemirror.net/6/docs/ref/#state.EditorState.facet) it but not to define values for it.
  */
  get reader() {
    return this;
  }
  /**
  Define a new facet.
  */
  static define(e = {}) {
    return new v(e.combine || ((t) => t), e.compareInput || ((t, i) => t === i), e.compare || (e.combine ? (t, i) => t === i : Js), !!e.static, e.enables);
  }
  /**
  Returns an extension that adds the given value to this facet.
  */
  of(e) {
    return new $i([], this, 0, e);
  }
  /**
  Create an extension that computes a value for the facet from a
  state. You must take care to declare the parts of the state that
  this value depends on, since your function is only called again
  for a new state when one of those parts changed.
  
  In cases where your value depends only on a single field, you'll
  want to use the [`from`](https://codemirror.net/6/docs/ref/#state.Facet.from) method instead.
  */
  compute(e, t) {
    if (this.isStatic)
      throw new Error("Can't compute a static facet");
    return new $i(e, this, 1, t);
  }
  /**
  Create an extension that computes zero or more values for this
  facet from a state.
  */
  computeN(e, t) {
    if (this.isStatic)
      throw new Error("Can't compute a static facet");
    return new $i(e, this, 2, t);
  }
  from(e, t) {
    return t || (t = (i) => i), this.compute([e], (i) => t(i.field(e)));
  }
}
function Js(s, e) {
  return s == e || s.length == e.length && s.every((t, i) => t === e[i]);
}
class $i {
  constructor(e, t, i, n) {
    this.dependencies = e, this.facet = t, this.type = i, this.value = n, this.id = _s++;
  }
  dynamicSlot(e) {
    var t;
    let i = this.value, n = this.facet.compareInput, r = this.id, o = e[r] >> 1, l = this.type == 2, a = !1, h = !1, f = [];
    for (let c of this.dependencies)
      c == "doc" ? a = !0 : c == "selection" ? h = !0 : (((t = e[c.id]) !== null && t !== void 0 ? t : 1) & 1) == 0 && f.push(e[c.id]);
    return {
      create(c) {
        return c.values[o] = i(c), 1;
      },
      update(c, u) {
        if (a && u.docChanged || h && (u.docChanged || u.selection) || hs(c, f)) {
          let d = i(c);
          if (l ? !Dr(d, c.values[o], n) : !n(d, c.values[o]))
            return c.values[o] = d, 1;
        }
        return 0;
      },
      reconfigure: (c, u) => {
        let d, p = u.config.address[r];
        if (p != null) {
          let g = Xi(u, p);
          if (this.dependencies.every((m) => m instanceof v ? u.facet(m) === c.facet(m) : m instanceof Oe ? u.field(m, !1) == c.field(m, !1) : !0) || (l ? Dr(d = i(c), g, n) : n(d = i(c), g)))
            return c.values[o] = g, 0;
        } else
          d = i(c);
        return c.values[o] = d, 1;
      }
    };
  }
}
function Dr(s, e, t) {
  if (s.length != e.length)
    return !1;
  for (let i = 0; i < s.length; i++)
    if (!t(s[i], e[i]))
      return !1;
  return !0;
}
function hs(s, e) {
  let t = !1;
  for (let i of e)
    ii(s, i) & 1 && (t = !0);
  return t;
}
function Wh(s, e, t) {
  let i = t.map((a) => s[a.id]), n = t.map((a) => a.type), r = i.filter((a) => !(a & 1)), o = s[e.id] >> 1;
  function l(a) {
    let h = [];
    for (let f = 0; f < i.length; f++) {
      let c = Xi(a, i[f]);
      if (n[f] == 2)
        for (let u of c)
          h.push(u);
      else
        h.push(c);
    }
    return e.combine(h);
  }
  return {
    create(a) {
      for (let h of i)
        ii(a, h);
      return a.values[o] = l(a), 1;
    },
    update(a, h) {
      if (!hs(a, r))
        return 0;
      let f = l(a);
      return e.compare(f, a.values[o]) ? 0 : (a.values[o] = f, 1);
    },
    reconfigure(a, h) {
      let f = hs(a, i), c = h.config.facets[e.id], u = h.facet(e);
      if (c && !f && Js(t, c))
        return a.values[o] = u, 0;
      let d = l(a);
      return e.compare(d, u) ? (a.values[o] = u, 0) : (a.values[o] = d, 1);
    }
  };
}
const Ai = /* @__PURE__ */ v.define({ static: !0 });
class Oe {
  constructor(e, t, i, n, r) {
    this.id = e, this.createF = t, this.updateF = i, this.compareF = n, this.spec = r, this.provides = void 0;
  }
  /**
  Define a state field.
  */
  static define(e) {
    let t = new Oe(_s++, e.create, e.update, e.compare || ((i, n) => i === n), e);
    return e.provide && (t.provides = e.provide(t)), t;
  }
  create(e) {
    let t = e.facet(Ai).find((i) => i.field == this);
    return (t?.create || this.createF)(e);
  }
  /**
  @internal
  */
  slot(e) {
    let t = e[this.id] >> 1;
    return {
      create: (i) => (i.values[t] = this.create(i), 1),
      update: (i, n) => {
        let r = i.values[t], o = this.updateF(r, n);
        return this.compareF(r, o) ? 0 : (i.values[t] = o, 1);
      },
      reconfigure: (i, n) => {
        let r = i.facet(Ai), o = n.facet(Ai), l;
        return (l = r.find((a) => a.field == this)) && l != o.find((a) => a.field == this) ? (i.values[t] = l.create(i), 1) : n.config.address[this.id] != null ? (i.values[t] = n.field(this), 0) : (i.values[t] = this.create(i), 1);
      }
    };
  }
  /**
  Returns an extension that enables this field and overrides the
  way it is initialized. Can be useful when you need to provide a
  non-default starting value for the field.
  */
  init(e) {
    return [this, Ai.of({ field: this, create: e })];
  }
  /**
  State field instances can be used as
  [`Extension`](https://codemirror.net/6/docs/ref/#state.Extension) values to enable the field in a
  given state.
  */
  get extension() {
    return this;
  }
}
const pt = { lowest: 4, low: 3, default: 2, high: 1, highest: 0 };
function _t(s) {
  return (e) => new il(e, s);
}
const kn = {
  /**
  The highest precedence level, for extensions that should end up
  near the start of the precedence ordering.
  */
  highest: /* @__PURE__ */ _t(pt.highest),
  /**
  A higher-than-default precedence, for extensions that should
  come before those with default precedence.
  */
  high: /* @__PURE__ */ _t(pt.high),
  /**
  The default precedence, which is also used for extensions
  without an explicit precedence.
  */
  default: /* @__PURE__ */ _t(pt.default),
  /**
  A lower-than-default precedence.
  */
  low: /* @__PURE__ */ _t(pt.low),
  /**
  The lowest precedence level. Meant for things that should end up
  near the end of the extension order.
  */
  lowest: /* @__PURE__ */ _t(pt.lowest)
};
class il {
  constructor(e, t) {
    this.inner = e, this.prec = t;
  }
}
class Wt {
  /**
  Create an instance of this compartment to add to your [state
  configuration](https://codemirror.net/6/docs/ref/#state.EditorStateConfig.extensions).
  */
  of(e) {
    return new fs(this, e);
  }
  /**
  Create an [effect](https://codemirror.net/6/docs/ref/#state.TransactionSpec.effects) that
  reconfigures this compartment.
  */
  reconfigure(e) {
    return Wt.reconfigure.of({ compartment: this, extension: e });
  }
  /**
  Get the current content of the compartment in the state, or
  `undefined` if it isn't present.
  */
  get(e) {
    return e.config.compartments.get(this);
  }
}
class fs {
  constructor(e, t) {
    this.compartment = e, this.inner = t;
  }
}
class Yi {
  constructor(e, t, i, n, r, o) {
    for (this.base = e, this.compartments = t, this.dynamicSlots = i, this.address = n, this.staticValues = r, this.facets = o, this.statusTemplate = []; this.statusTemplate.length < i.length; )
      this.statusTemplate.push(
        0
        /* SlotStatus.Unresolved */
      );
  }
  staticFacet(e) {
    let t = this.address[e.id];
    return t == null ? e.default : this.staticValues[t >> 1];
  }
  static resolve(e, t, i) {
    let n = [], r = /* @__PURE__ */ Object.create(null), o = /* @__PURE__ */ new Map();
    for (let u of Fh(e, t, o))
      u instanceof Oe ? n.push(u) : (r[u.facet.id] || (r[u.facet.id] = [])).push(u);
    let l = /* @__PURE__ */ Object.create(null), a = [], h = [];
    for (let u of n)
      l[u.id] = h.length << 1, h.push((d) => u.slot(d));
    let f = i?.config.facets;
    for (let u in r) {
      let d = r[u], p = d[0].facet, g = f && f[u] || [];
      if (d.every(
        (m) => m.type == 0
        /* Provider.Static */
      ))
        if (l[p.id] = a.length << 1 | 1, Js(g, d))
          a.push(i.facet(p));
        else {
          let m = p.combine(d.map((y) => y.value));
          a.push(i && p.compare(m, i.facet(p)) ? i.facet(p) : m);
        }
      else {
        for (let m of d)
          m.type == 0 ? (l[m.id] = a.length << 1 | 1, a.push(m.value)) : (l[m.id] = h.length << 1, h.push((y) => m.dynamicSlot(y)));
        l[p.id] = h.length << 1, h.push((m) => Wh(m, p, d));
      }
    }
    let c = h.map((u) => u(l));
    return new Yi(e, o, c, l, a, r);
  }
}
function Fh(s, e, t) {
  let i = [[], [], [], [], []], n = /* @__PURE__ */ new Map();
  function r(o, l) {
    let a = n.get(o);
    if (a != null) {
      if (a <= l)
        return;
      let h = i[a].indexOf(o);
      h > -1 && i[a].splice(h, 1), o instanceof fs && t.delete(o.compartment);
    }
    if (n.set(o, l), Array.isArray(o))
      for (let h of o)
        r(h, l);
    else if (o instanceof fs) {
      if (t.has(o.compartment))
        throw new RangeError("Duplicate use of compartment in extensions");
      let h = e.get(o.compartment) || o.inner;
      t.set(o.compartment, h), r(h, l);
    } else if (o instanceof il)
      r(o.inner, o.prec);
    else if (o instanceof Oe)
      i[l].push(o), o.provides && r(o.provides, l);
    else if (o instanceof $i)
      i[l].push(o), o.facet.extensions && r(o.facet.extensions, pt.default);
    else {
      let h = o.extension;
      if (!h)
        throw new Error(`Unrecognized extension value in extension set (${o}). This sometimes happens because multiple instances of @codemirror/state are loaded, breaking instanceof checks.`);
      r(h, l);
    }
  }
  return r(s, pt.default), i.reduce((o, l) => o.concat(l));
}
function ii(s, e) {
  if (e & 1)
    return 2;
  let t = e >> 1, i = s.status[t];
  if (i == 4)
    throw new Error("Cyclic dependency between fields and/or facets");
  if (i & 2)
    return i;
  s.status[t] = 4;
  let n = s.computeSlot(s, s.config.dynamicSlots[t]);
  return s.status[t] = 2 | n;
}
function Xi(s, e) {
  return e & 1 ? s.config.staticValues[e >> 1] : s.values[e >> 1];
}
const nl = /* @__PURE__ */ v.define(), cs = /* @__PURE__ */ v.define({
  combine: (s) => s.some((e) => e),
  static: !0
}), sl = /* @__PURE__ */ v.define({
  combine: (s) => s.length ? s[0] : void 0,
  static: !0
}), rl = /* @__PURE__ */ v.define(), ol = /* @__PURE__ */ v.define(), ll = /* @__PURE__ */ v.define(), al = /* @__PURE__ */ v.define({
  combine: (s) => s.length ? s[0] : !1
});
class at {
  /**
  @internal
  */
  constructor(e, t) {
    this.type = e, this.value = t;
  }
  /**
  Define a new type of annotation.
  */
  static define() {
    return new Hh();
  }
}
class Hh {
  /**
  Create an instance of this annotation.
  */
  of(e) {
    return new at(this, e);
  }
}
class Vh {
  /**
  @internal
  */
  constructor(e) {
    this.map = e;
  }
  /**
  Create a [state effect](https://codemirror.net/6/docs/ref/#state.StateEffect) instance of this
  type.
  */
  of(e) {
    return new W(this, e);
  }
}
class W {
  /**
  @internal
  */
  constructor(e, t) {
    this.type = e, this.value = t;
  }
  /**
  Map this effect through a position mapping. Will return
  `undefined` when that ends up deleting the effect.
  */
  map(e) {
    let t = this.type.map(this.value, e);
    return t === void 0 ? void 0 : t == this.value ? this : new W(this.type, t);
  }
  /**
  Tells you whether this effect object is of a given
  [type](https://codemirror.net/6/docs/ref/#state.StateEffectType).
  */
  is(e) {
    return this.type == e;
  }
  /**
  Define a new effect type. The type parameter indicates the type
  of values that his effect holds. It should be a type that
  doesn't include `undefined`, since that is used in
  [mapping](https://codemirror.net/6/docs/ref/#state.StateEffect.map) to indicate that an effect is
  removed.
  */
  static define(e = {}) {
    return new Vh(e.map || ((t) => t));
  }
  /**
  Map an array of effects through a change set.
  */
  static mapEffects(e, t) {
    if (!e.length)
      return e;
    let i = [];
    for (let n of e) {
      let r = n.map(t);
      r && i.push(r);
    }
    return i;
  }
}
W.reconfigure = /* @__PURE__ */ W.define();
W.appendConfig = /* @__PURE__ */ W.define();
class Q {
  constructor(e, t, i, n, r, o) {
    this.startState = e, this.changes = t, this.selection = i, this.effects = n, this.annotations = r, this.scrollIntoView = o, this._doc = null, this._state = null, i && tl(i, t.newLength), r.some((l) => l.type == Q.time) || (this.annotations = r.concat(Q.time.of(Date.now())));
  }
  /**
  @internal
  */
  static create(e, t, i, n, r, o) {
    return new Q(e, t, i, n, r, o);
  }
  /**
  The new document produced by the transaction. Contrary to
  [`.state`](https://codemirror.net/6/docs/ref/#state.Transaction.state)`.doc`, accessing this won't
  force the entire new state to be computed right away, so it is
  recommended that [transaction
  filters](https://codemirror.net/6/docs/ref/#state.EditorState^transactionFilter) use this getter
  when they need to look at the new document.
  */
  get newDoc() {
    return this._doc || (this._doc = this.changes.apply(this.startState.doc));
  }
  /**
  The new selection produced by the transaction. If
  [`this.selection`](https://codemirror.net/6/docs/ref/#state.Transaction.selection) is undefined,
  this will [map](https://codemirror.net/6/docs/ref/#state.EditorSelection.map) the start state's
  current selection through the changes made by the transaction.
  */
  get newSelection() {
    return this.selection || this.startState.selection.map(this.changes);
  }
  /**
  The new state created by the transaction. Computed on demand
  (but retained for subsequent access), so it is recommended not to
  access it in [transaction
  filters](https://codemirror.net/6/docs/ref/#state.EditorState^transactionFilter) when possible.
  */
  get state() {
    return this._state || this.startState.applyTransaction(this), this._state;
  }
  /**
  Get the value of the given annotation type, if any.
  */
  annotation(e) {
    for (let t of this.annotations)
      if (t.type == e)
        return t.value;
  }
  /**
  Indicates whether the transaction changed the document.
  */
  get docChanged() {
    return !this.changes.empty;
  }
  /**
  Indicates whether this transaction reconfigures the state
  (through a [configuration compartment](https://codemirror.net/6/docs/ref/#state.Compartment) or
  with a top-level configuration
  [effect](https://codemirror.net/6/docs/ref/#state.StateEffect^reconfigure).
  */
  get reconfigured() {
    return this.startState.config != this.state.config;
  }
  /**
  Returns true if the transaction has a [user
  event](https://codemirror.net/6/docs/ref/#state.Transaction^userEvent) annotation that is equal to
  or more specific than `event`. For example, if the transaction
  has `"select.pointer"` as user event, `"select"` and
  `"select.pointer"` will match it.
  */
  isUserEvent(e) {
    let t = this.annotation(Q.userEvent);
    return !!(t && (t == e || t.length > e.length && t.slice(0, e.length) == e && t[e.length] == "."));
  }
}
Q.time = /* @__PURE__ */ at.define();
Q.userEvent = /* @__PURE__ */ at.define();
Q.addToHistory = /* @__PURE__ */ at.define();
Q.remote = /* @__PURE__ */ at.define();
function zh(s, e) {
  let t = [];
  for (let i = 0, n = 0; ; ) {
    let r, o;
    if (i < s.length && (n == e.length || e[n] >= s[i]))
      r = s[i++], o = s[i++];
    else if (n < e.length)
      r = e[n++], o = e[n++];
    else
      return t;
    !t.length || t[t.length - 1] < r ? t.push(r, o) : t[t.length - 1] < o && (t[t.length - 1] = o);
  }
}
function hl(s, e, t) {
  var i;
  let n, r, o;
  return t ? (n = e.changes, r = X.empty(e.changes.length), o = s.changes.compose(e.changes)) : (n = e.changes.map(s.changes), r = s.changes.mapDesc(e.changes, !0), o = s.changes.compose(n)), {
    changes: o,
    selection: e.selection ? e.selection.map(r) : (i = s.selection) === null || i === void 0 ? void 0 : i.map(n),
    effects: W.mapEffects(s.effects, n).concat(W.mapEffects(e.effects, r)),
    annotations: s.annotations.length ? s.annotations.concat(e.annotations) : e.annotations,
    scrollIntoView: s.scrollIntoView || e.scrollIntoView
  };
}
function us(s, e, t) {
  let i = e.selection, n = Bt(e.annotations);
  return e.userEvent && (n = n.concat(Q.userEvent.of(e.userEvent))), {
    changes: e.changes instanceof X ? e.changes : X.of(e.changes || [], t, s.facet(sl)),
    selection: i && (i instanceof x ? i : x.single(i.anchor, i.head)),
    effects: Bt(e.effects),
    annotations: n,
    scrollIntoView: !!e.scrollIntoView
  };
}
function fl(s, e, t) {
  let i = us(s, e.length ? e[0] : {}, s.doc.length);
  e.length && e[0].filter === !1 && (t = !1);
  for (let r = 1; r < e.length; r++) {
    e[r].filter === !1 && (t = !1);
    let o = !!e[r].sequential;
    i = hl(i, us(s, e[r], o ? i.changes.newLength : s.doc.length), o);
  }
  let n = Q.create(s, i.changes, i.selection, i.effects, i.annotations, i.scrollIntoView);
  return Kh(t ? qh(n) : n);
}
function qh(s) {
  let e = s.startState, t = !0;
  for (let n of e.facet(rl)) {
    let r = n(s);
    if (r === !1) {
      t = !1;
      break;
    }
    Array.isArray(r) && (t = t === !0 ? r : zh(t, r));
  }
  if (t !== !0) {
    let n, r;
    if (t === !1)
      r = s.changes.invertedDesc, n = X.empty(e.doc.length);
    else {
      let o = s.changes.filter(t);
      n = o.changes, r = o.filtered.mapDesc(o.changes).invertedDesc;
    }
    s = Q.create(e, n, s.selection && s.selection.map(r), W.mapEffects(s.effects, r), s.annotations, s.scrollIntoView);
  }
  let i = e.facet(ol);
  for (let n = i.length - 1; n >= 0; n--) {
    let r = i[n](s);
    r instanceof Q ? s = r : Array.isArray(r) && r.length == 1 && r[0] instanceof Q ? s = r[0] : s = fl(e, Bt(r), !1);
  }
  return s;
}
function Kh(s) {
  let e = s.startState, t = e.facet(ll), i = s;
  for (let n = t.length - 1; n >= 0; n--) {
    let r = t[n](s);
    r && Object.keys(r).length && (i = hl(i, us(e, r, s.changes.newLength), !0));
  }
  return i == s ? s : Q.create(e, s.changes, s.selection, i.effects, i.annotations, i.scrollIntoView);
}
const jh = [];
function Bt(s) {
  return s == null ? jh : Array.isArray(s) ? s : [s];
}
var _ = /* @__PURE__ */ (function(s) {
  return s[s.Word = 0] = "Word", s[s.Space = 1] = "Space", s[s.Other = 2] = "Other", s;
})(_ || (_ = {}));
const $h = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
let ds;
try {
  ds = /* @__PURE__ */ new RegExp("[\\p{Alphabetic}\\p{Number}_]", "u");
} catch {
}
function Uh(s) {
  if (ds)
    return ds.test(s);
  for (let e = 0; e < s.length; e++) {
    let t = s[e];
    if (/\w/.test(t) || t > "" && (t.toUpperCase() != t.toLowerCase() || $h.test(t)))
      return !0;
  }
  return !1;
}
function Gh(s) {
  return (e) => {
    if (!/\S/.test(e))
      return _.Space;
    if (Uh(e))
      return _.Word;
    for (let t = 0; t < s.length; t++)
      if (e.indexOf(s[t]) > -1)
        return _.Word;
    return _.Other;
  };
}
class I {
  constructor(e, t, i, n, r, o) {
    this.config = e, this.doc = t, this.selection = i, this.values = n, this.status = e.statusTemplate.slice(), this.computeSlot = r, o && (o._state = this);
    for (let l = 0; l < this.config.dynamicSlots.length; l++)
      ii(this, l << 1);
    this.computeSlot = null;
  }
  field(e, t = !0) {
    let i = this.config.address[e.id];
    if (i == null) {
      if (t)
        throw new RangeError("Field is not present in this state");
      return;
    }
    return ii(this, i), Xi(this, i);
  }
  /**
  Create a [transaction](https://codemirror.net/6/docs/ref/#state.Transaction) that updates this
  state. Any number of [transaction specs](https://codemirror.net/6/docs/ref/#state.TransactionSpec)
  can be passed. Unless
  [`sequential`](https://codemirror.net/6/docs/ref/#state.TransactionSpec.sequential) is set, the
  [changes](https://codemirror.net/6/docs/ref/#state.TransactionSpec.changes) (if any) of each spec
  are assumed to start in the _current_ document (not the document
  produced by previous specs), and its
  [selection](https://codemirror.net/6/docs/ref/#state.TransactionSpec.selection) and
  [effects](https://codemirror.net/6/docs/ref/#state.TransactionSpec.effects) are assumed to refer
  to the document created by its _own_ changes. The resulting
  transaction contains the combined effect of all the different
  specs. For [selection](https://codemirror.net/6/docs/ref/#state.TransactionSpec.selection), later
  specs take precedence over earlier ones.
  */
  update(...e) {
    return fl(this, e, !0);
  }
  /**
  @internal
  */
  applyTransaction(e) {
    let t = this.config, { base: i, compartments: n } = t;
    for (let l of e.effects)
      l.is(Wt.reconfigure) ? (t && (n = /* @__PURE__ */ new Map(), t.compartments.forEach((a, h) => n.set(h, a)), t = null), n.set(l.value.compartment, l.value.extension)) : l.is(W.reconfigure) ? (t = null, i = l.value) : l.is(W.appendConfig) && (t = null, i = Bt(i).concat(l.value));
    let r;
    t ? r = e.startState.values.slice() : (t = Yi.resolve(i, n, this), r = new I(t, this.doc, this.selection, t.dynamicSlots.map(() => null), (a, h) => h.reconfigure(a, this), null).values);
    let o = e.startState.facet(cs) ? e.newSelection : e.newSelection.asSingle();
    new I(t, e.newDoc, o, r, (l, a) => a.update(l, e), e);
  }
  /**
  Create a [transaction spec](https://codemirror.net/6/docs/ref/#state.TransactionSpec) that
  replaces every selection range with the given content.
  */
  replaceSelection(e) {
    return typeof e == "string" && (e = this.toText(e)), this.changeByRange((t) => ({
      changes: { from: t.from, to: t.to, insert: e },
      range: x.cursor(t.from + e.length)
    }));
  }
  /**
  Create a set of changes and a new selection by running the given
  function for each range in the active selection. The function
  can return an optional set of changes (in the coordinate space
  of the start document), plus an updated range (in the coordinate
  space of the document produced by the call's own changes). This
  method will merge all the changes and ranges into a single
  changeset and selection, and return it as a [transaction
  spec](https://codemirror.net/6/docs/ref/#state.TransactionSpec), which can be passed to
  [`update`](https://codemirror.net/6/docs/ref/#state.EditorState.update).
  */
  changeByRange(e) {
    let t = this.selection, i = e(t.ranges[0]), n = this.changes(i.changes), r = [i.range], o = Bt(i.effects);
    for (let l = 1; l < t.ranges.length; l++) {
      let a = e(t.ranges[l]), h = this.changes(a.changes), f = h.map(n);
      for (let u = 0; u < l; u++)
        r[u] = r[u].map(f);
      let c = n.mapDesc(h, !0);
      r.push(a.range.map(c)), n = n.compose(f), o = W.mapEffects(o, f).concat(W.mapEffects(Bt(a.effects), c));
    }
    return {
      changes: n,
      selection: x.create(r, t.mainIndex),
      effects: o
    };
  }
  /**
  Create a [change set](https://codemirror.net/6/docs/ref/#state.ChangeSet) from the given change
  description, taking the state's document length and line
  separator into account.
  */
  changes(e = []) {
    return e instanceof X ? e : X.of(e, this.doc.length, this.facet(I.lineSeparator));
  }
  /**
  Using the state's [line
  separator](https://codemirror.net/6/docs/ref/#state.EditorState^lineSeparator), create a
  [`Text`](https://codemirror.net/6/docs/ref/#state.Text) instance from the given string.
  */
  toText(e) {
    return N.of(e.split(this.facet(I.lineSeparator) || os));
  }
  /**
  Return the given range of the document as a string.
  */
  sliceDoc(e = 0, t = this.doc.length) {
    return this.doc.sliceString(e, t, this.lineBreak);
  }
  /**
  Get the value of a state [facet](https://codemirror.net/6/docs/ref/#state.Facet).
  */
  facet(e) {
    let t = this.config.address[e.id];
    return t == null ? e.default : (ii(this, t), Xi(this, t));
  }
  /**
  Convert this state to a JSON-serializable object. When custom
  fields should be serialized, you can pass them in as an object
  mapping property names (in the resulting object, which should
  not use `doc` or `selection`) to fields.
  */
  toJSON(e) {
    let t = {
      doc: this.sliceDoc(),
      selection: this.selection.toJSON()
    };
    if (e)
      for (let i in e) {
        let n = e[i];
        n instanceof Oe && this.config.address[n.id] != null && (t[i] = n.spec.toJSON(this.field(e[i]), this));
      }
    return t;
  }
  /**
  Deserialize a state from its JSON representation. When custom
  fields should be deserialized, pass the same object you passed
  to [`toJSON`](https://codemirror.net/6/docs/ref/#state.EditorState.toJSON) when serializing as
  third argument.
  */
  static fromJSON(e, t = {}, i) {
    if (!e || typeof e.doc != "string")
      throw new RangeError("Invalid JSON representation for EditorState");
    let n = [];
    if (i) {
      for (let r in i)
        if (Object.prototype.hasOwnProperty.call(e, r)) {
          let o = i[r], l = e[r];
          n.push(o.init((a) => o.spec.fromJSON(l, a)));
        }
    }
    return I.create({
      doc: e.doc,
      selection: x.fromJSON(e.selection),
      extensions: t.extensions ? n.concat([t.extensions]) : n
    });
  }
  /**
  Create a new state. You'll usually only need this when
  initializing an editor—updated states are created by applying
  transactions.
  */
  static create(e = {}) {
    let t = Yi.resolve(e.extensions || [], /* @__PURE__ */ new Map()), i = e.doc instanceof N ? e.doc : N.of((e.doc || "").split(t.staticFacet(I.lineSeparator) || os)), n = e.selection ? e.selection instanceof x ? e.selection : x.single(e.selection.anchor, e.selection.head) : x.single(0);
    return tl(n, i.length), t.staticFacet(cs) || (n = n.asSingle()), new I(t, i, n, t.dynamicSlots.map(() => null), (r, o) => o.create(r), null);
  }
  /**
  The size (in columns) of a tab in the document, determined by
  the [`tabSize`](https://codemirror.net/6/docs/ref/#state.EditorState^tabSize) facet.
  */
  get tabSize() {
    return this.facet(I.tabSize);
  }
  /**
  Get the proper [line-break](https://codemirror.net/6/docs/ref/#state.EditorState^lineSeparator)
  string for this state.
  */
  get lineBreak() {
    return this.facet(I.lineSeparator) || `
`;
  }
  /**
  Returns true when the editor is
  [configured](https://codemirror.net/6/docs/ref/#state.EditorState^readOnly) to be read-only.
  */
  get readOnly() {
    return this.facet(al);
  }
  /**
  Look up a translation for the given phrase (via the
  [`phrases`](https://codemirror.net/6/docs/ref/#state.EditorState^phrases) facet), or return the
  original string if no translation is found.
  
  If additional arguments are passed, they will be inserted in
  place of markers like `$1` (for the first value) and `$2`, etc.
  A single `$` is equivalent to `$1`, and `$$` will produce a
  literal dollar sign.
  */
  phrase(e, ...t) {
    for (let i of this.facet(I.phrases))
      if (Object.prototype.hasOwnProperty.call(i, e)) {
        e = i[e];
        break;
      }
    return t.length && (e = e.replace(/\$(\$|\d*)/g, (i, n) => {
      if (n == "$")
        return "$";
      let r = +(n || 1);
      return !r || r > t.length ? i : t[r - 1];
    })), e;
  }
  /**
  Find the values for a given language data field, provided by the
  the [`languageData`](https://codemirror.net/6/docs/ref/#state.EditorState^languageData) facet.
  
  Examples of language data fields are...
  
  - [`"commentTokens"`](https://codemirror.net/6/docs/ref/#commands.CommentTokens) for specifying
    comment syntax.
  - [`"autocomplete"`](https://codemirror.net/6/docs/ref/#autocomplete.autocompletion^config.override)
    for providing language-specific completion sources.
  - [`"wordChars"`](https://codemirror.net/6/docs/ref/#state.EditorState.charCategorizer) for adding
    characters that should be considered part of words in this
    language.
  - [`"closeBrackets"`](https://codemirror.net/6/docs/ref/#autocomplete.CloseBracketConfig) controls
    bracket closing behavior.
  */
  languageDataAt(e, t, i = -1) {
    let n = [];
    for (let r of this.facet(nl))
      for (let o of r(this, t, i))
        Object.prototype.hasOwnProperty.call(o, e) && n.push(o[e]);
    return n;
  }
  /**
  Return a function that can categorize strings (expected to
  represent a single [grapheme cluster](https://codemirror.net/6/docs/ref/#state.findClusterBreak))
  into one of:
  
   - Word (contains an alphanumeric character or a character
     explicitly listed in the local language's `"wordChars"`
     language data, which should be a string)
   - Space (contains only whitespace)
   - Other (anything else)
  */
  charCategorizer(e) {
    let t = this.languageDataAt("wordChars", e);
    return Gh(t.length ? t[0] : "");
  }
  /**
  Find the word at the given position, meaning the range
  containing all [word](https://codemirror.net/6/docs/ref/#state.CharCategory.Word) characters
  around it. If no word characters are adjacent to the position,
  this returns null.
  */
  wordAt(e) {
    let { text: t, from: i, length: n } = this.doc.lineAt(e), r = this.charCategorizer(e), o = e - i, l = e - i;
    for (; o > 0; ) {
      let a = ee(t, o, !1);
      if (r(t.slice(a, o)) != _.Word)
        break;
      o = a;
    }
    for (; l < n; ) {
      let a = ee(t, l);
      if (r(t.slice(l, a)) != _.Word)
        break;
      l = a;
    }
    return o == l ? null : x.range(o + i, l + i);
  }
}
I.allowMultipleSelections = cs;
I.tabSize = /* @__PURE__ */ v.define({
  combine: (s) => s.length ? s[0] : 4
});
I.lineSeparator = sl;
I.readOnly = al;
I.phrases = /* @__PURE__ */ v.define({
  compare(s, e) {
    let t = Object.keys(s), i = Object.keys(e);
    return t.length == i.length && t.every((n) => s[n] == e[n]);
  }
});
I.languageData = nl;
I.changeFilter = rl;
I.transactionFilter = ol;
I.transactionExtender = ll;
Wt.reconfigure = /* @__PURE__ */ W.define();
function Kt(s, e, t = {}) {
  let i = {};
  for (let n of s)
    for (let r of Object.keys(n)) {
      let o = n[r], l = i[r];
      if (l === void 0)
        i[r] = o;
      else if (!(l === o || o === void 0)) if (Object.hasOwnProperty.call(t, r))
        i[r] = t[r](l, o);
      else
        throw new Error("Config merge conflict for field " + r);
    }
  for (let n in e)
    i[n] === void 0 && (i[n] = e[n]);
  return i;
}
class yt {
  /**
  Compare this value with another value. Used when comparing
  rangesets. The default implementation compares by identity.
  Unless you are only creating a fixed number of unique instances
  of your value type, it is a good idea to implement this
  properly.
  */
  eq(e) {
    return this == e;
  }
  /**
  Create a [range](https://codemirror.net/6/docs/ref/#state.Range) with this value.
  */
  range(e, t = e) {
    return ps.create(e, t, this);
  }
}
yt.prototype.startSide = yt.prototype.endSide = 0;
yt.prototype.point = !1;
yt.prototype.mapMode = me.TrackDel;
function Ys(s, e) {
  return s == e || s.constructor == e.constructor && s.eq(e);
}
let ps = class cl {
  constructor(e, t, i) {
    this.from = e, this.to = t, this.value = i;
  }
  /**
  @internal
  */
  static create(e, t, i) {
    return new cl(e, t, i);
  }
};
function gs(s, e) {
  return s.from - e.from || s.value.startSide - e.value.startSide;
}
class Xs {
  constructor(e, t, i, n) {
    this.from = e, this.to = t, this.value = i, this.maxPoint = n;
  }
  get length() {
    return this.to[this.to.length - 1];
  }
  // Find the index of the given position and side. Use the ranges'
  // `from` pos when `end == false`, `to` when `end == true`.
  findIndex(e, t, i, n = 0) {
    let r = i ? this.to : this.from;
    for (let o = n, l = r.length; ; ) {
      if (o == l)
        return o;
      let a = o + l >> 1, h = r[a] - e || (i ? this.value[a].endSide : this.value[a].startSide) - t;
      if (a == o)
        return h >= 0 ? o : l;
      h >= 0 ? l = a : o = a + 1;
    }
  }
  between(e, t, i, n) {
    for (let r = this.findIndex(t, -1e9, !0), o = this.findIndex(i, 1e9, !1, r); r < o; r++)
      if (n(this.from[r] + e, this.to[r] + e, this.value[r]) === !1)
        return !1;
  }
  map(e, t) {
    let i = [], n = [], r = [], o = -1, l = -1;
    for (let a = 0; a < this.value.length; a++) {
      let h = this.value[a], f = this.from[a] + e, c = this.to[a] + e, u, d;
      if (f == c) {
        let p = t.mapPos(f, h.startSide, h.mapMode);
        if (p == null || (u = d = p, h.startSide != h.endSide && (d = t.mapPos(f, h.endSide), d < u)))
          continue;
      } else if (u = t.mapPos(f, h.startSide), d = t.mapPos(c, h.endSide), u > d || u == d && h.startSide > 0 && h.endSide <= 0)
        continue;
      (d - u || h.endSide - h.startSide) < 0 || (o < 0 && (o = u), h.point && (l = Math.max(l, d - u)), i.push(h), n.push(u - o), r.push(d - o));
    }
    return { mapped: i.length ? new Xs(n, r, i, l) : null, pos: o };
  }
}
class L {
  constructor(e, t, i, n) {
    this.chunkPos = e, this.chunk = t, this.nextLayer = i, this.maxPoint = n;
  }
  /**
  @internal
  */
  static create(e, t, i, n) {
    return new L(e, t, i, n);
  }
  /**
  @internal
  */
  get length() {
    let e = this.chunk.length - 1;
    return e < 0 ? 0 : Math.max(this.chunkEnd(e), this.nextLayer.length);
  }
  /**
  The number of ranges in the set.
  */
  get size() {
    if (this.isEmpty)
      return 0;
    let e = this.nextLayer.size;
    for (let t of this.chunk)
      e += t.value.length;
    return e;
  }
  /**
  @internal
  */
  chunkEnd(e) {
    return this.chunkPos[e] + this.chunk[e].length;
  }
  /**
  Update the range set, optionally adding new ranges or filtering
  out existing ones.
  
  (Note: The type parameter is just there as a kludge to work
  around TypeScript variance issues that prevented `RangeSet<X>`
  from being a subtype of `RangeSet<Y>` when `X` is a subtype of
  `Y`.)
  */
  update(e) {
    let { add: t = [], sort: i = !1, filterFrom: n = 0, filterTo: r = this.length } = e, o = e.filter;
    if (t.length == 0 && !o)
      return this;
    if (i && (t = t.slice().sort(gs)), this.isEmpty)
      return t.length ? L.of(t) : this;
    let l = new ul(this, null, -1).goto(0), a = 0, h = [], f = new xt();
    for (; l.value || a < t.length; )
      if (a < t.length && (l.from - t[a].from || l.startSide - t[a].value.startSide) >= 0) {
        let c = t[a++];
        f.addInner(c.from, c.to, c.value) || h.push(c);
      } else l.rangeIndex == 1 && l.chunkIndex < this.chunk.length && (a == t.length || this.chunkEnd(l.chunkIndex) < t[a].from) && (!o || n > this.chunkEnd(l.chunkIndex) || r < this.chunkPos[l.chunkIndex]) && f.addChunk(this.chunkPos[l.chunkIndex], this.chunk[l.chunkIndex]) ? l.nextChunk() : ((!o || n > l.to || r < l.from || o(l.from, l.to, l.value)) && (f.addInner(l.from, l.to, l.value) || h.push(ps.create(l.from, l.to, l.value))), l.next());
    return f.finishInner(this.nextLayer.isEmpty && !h.length ? L.empty : this.nextLayer.update({ add: h, filter: o, filterFrom: n, filterTo: r }));
  }
  /**
  Map this range set through a set of changes, return the new set.
  */
  map(e) {
    if (e.empty || this.isEmpty)
      return this;
    let t = [], i = [], n = -1;
    for (let o = 0; o < this.chunk.length; o++) {
      let l = this.chunkPos[o], a = this.chunk[o], h = e.touchesRange(l, l + a.length);
      if (h === !1)
        n = Math.max(n, a.maxPoint), t.push(a), i.push(e.mapPos(l));
      else if (h === !0) {
        let { mapped: f, pos: c } = a.map(l, e);
        f && (n = Math.max(n, f.maxPoint), t.push(f), i.push(c));
      }
    }
    let r = this.nextLayer.map(e);
    return t.length == 0 ? r : new L(i, t, r || L.empty, n);
  }
  /**
  Iterate over the ranges that touch the region `from` to `to`,
  calling `f` for each. There is no guarantee that the ranges will
  be reported in any specific order. When the callback returns
  `false`, iteration stops.
  */
  between(e, t, i) {
    if (!this.isEmpty) {
      for (let n = 0; n < this.chunk.length; n++) {
        let r = this.chunkPos[n], o = this.chunk[n];
        if (t >= r && e <= r + o.length && o.between(r, e - r, t - r, i) === !1)
          return;
      }
      this.nextLayer.between(e, t, i);
    }
  }
  /**
  Iterate over the ranges in this set, in order, including all
  ranges that end at or after `from`.
  */
  iter(e = 0) {
    return ai.from([this]).goto(e);
  }
  /**
  @internal
  */
  get isEmpty() {
    return this.nextLayer == this;
  }
  /**
  Iterate over the ranges in a collection of sets, in order,
  starting from `from`.
  */
  static iter(e, t = 0) {
    return ai.from(e).goto(t);
  }
  /**
  Iterate over two groups of sets, calling methods on `comparator`
  to notify it of possible differences.
  */
  static compare(e, t, i, n, r = -1) {
    let o = e.filter((c) => c.maxPoint > 0 || !c.isEmpty && c.maxPoint >= r), l = t.filter((c) => c.maxPoint > 0 || !c.isEmpty && c.maxPoint >= r), a = Tr(o, l, i), h = new Jt(o, a, r), f = new Jt(l, a, r);
    i.iterGaps((c, u, d) => Or(h, c, f, u, d, n)), i.empty && i.length == 0 && Or(h, 0, f, 0, 0, n);
  }
  /**
  Compare the contents of two groups of range sets, returning true
  if they are equivalent in the given range.
  */
  static eq(e, t, i = 0, n) {
    n == null && (n = 999999999);
    let r = e.filter((f) => !f.isEmpty && t.indexOf(f) < 0), o = t.filter((f) => !f.isEmpty && e.indexOf(f) < 0);
    if (r.length != o.length)
      return !1;
    if (!r.length)
      return !0;
    let l = Tr(r, o), a = new Jt(r, l, 0).goto(i), h = new Jt(o, l, 0).goto(i);
    for (; ; ) {
      if (a.to != h.to || !ms(a.active, h.active) || a.point && (!h.point || !Ys(a.point, h.point)))
        return !1;
      if (a.to > n)
        return !0;
      a.next(), h.next();
    }
  }
  /**
  Iterate over a group of range sets at the same time, notifying
  the iterator about the ranges covering every given piece of
  content. Returns the open count (see
  [`SpanIterator.span`](https://codemirror.net/6/docs/ref/#state.SpanIterator.span)) at the end
  of the iteration.
  */
  static spans(e, t, i, n, r = -1) {
    let o = new Jt(e, null, r).goto(t), l = t, a = o.openStart;
    for (; ; ) {
      let h = Math.min(o.to, i);
      if (o.point) {
        let f = o.activeForPoint(o.to), c = o.pointFrom < t ? f.length + 1 : o.point.startSide < 0 ? f.length : Math.min(f.length, a);
        n.point(l, h, o.point, f, c, o.pointRank), a = Math.min(o.openEnd(h), f.length);
      } else h > l && (n.span(l, h, o.active, a), a = o.openEnd(h));
      if (o.to > i)
        return a + (o.point && o.to > i ? 1 : 0);
      l = o.to, o.next();
    }
  }
  /**
  Create a range set for the given range or array of ranges. By
  default, this expects the ranges to be _sorted_ (by start
  position and, if two start at the same position,
  `value.startSide`). You can pass `true` as second argument to
  cause the method to sort them.
  */
  static of(e, t = !1) {
    let i = new xt();
    for (let n of e instanceof ps ? [e] : t ? _h(e) : e)
      i.add(n.from, n.to, n.value);
    return i.finish();
  }
  /**
  Join an array of range sets into a single set.
  */
  static join(e) {
    if (!e.length)
      return L.empty;
    let t = e[e.length - 1];
    for (let i = e.length - 2; i >= 0; i--)
      for (let n = e[i]; n != L.empty; n = n.nextLayer)
        t = new L(n.chunkPos, n.chunk, t, Math.max(n.maxPoint, t.maxPoint));
    return t;
  }
}
L.empty = /* @__PURE__ */ new L([], [], null, -1);
function _h(s) {
  if (s.length > 1)
    for (let e = s[0], t = 1; t < s.length; t++) {
      let i = s[t];
      if (gs(e, i) > 0)
        return s.slice().sort(gs);
      e = i;
    }
  return s;
}
L.empty.nextLayer = L.empty;
class xt {
  finishChunk(e) {
    this.chunks.push(new Xs(this.from, this.to, this.value, this.maxPoint)), this.chunkPos.push(this.chunkStart), this.chunkStart = -1, this.setMaxPoint = Math.max(this.setMaxPoint, this.maxPoint), this.maxPoint = -1, e && (this.from = [], this.to = [], this.value = []);
  }
  /**
  Create an empty builder.
  */
  constructor() {
    this.chunks = [], this.chunkPos = [], this.chunkStart = -1, this.last = null, this.lastFrom = -1e9, this.lastTo = -1e9, this.from = [], this.to = [], this.value = [], this.maxPoint = -1, this.setMaxPoint = -1, this.nextLayer = null;
  }
  /**
  Add a range. Ranges should be added in sorted (by `from` and
  `value.startSide`) order.
  */
  add(e, t, i) {
    this.addInner(e, t, i) || (this.nextLayer || (this.nextLayer = new xt())).add(e, t, i);
  }
  /**
  @internal
  */
  addInner(e, t, i) {
    let n = e - this.lastTo || i.startSide - this.last.endSide;
    if (n <= 0 && (e - this.lastFrom || i.startSide - this.last.startSide) < 0)
      throw new Error("Ranges must be added sorted by `from` position and `startSide`");
    return n < 0 ? !1 : (this.from.length == 250 && this.finishChunk(!0), this.chunkStart < 0 && (this.chunkStart = e), this.from.push(e - this.chunkStart), this.to.push(t - this.chunkStart), this.last = i, this.lastFrom = e, this.lastTo = t, this.value.push(i), i.point && (this.maxPoint = Math.max(this.maxPoint, t - e)), !0);
  }
  /**
  @internal
  */
  addChunk(e, t) {
    if ((e - this.lastTo || t.value[0].startSide - this.last.endSide) < 0)
      return !1;
    this.from.length && this.finishChunk(!0), this.setMaxPoint = Math.max(this.setMaxPoint, t.maxPoint), this.chunks.push(t), this.chunkPos.push(e);
    let i = t.value.length - 1;
    return this.last = t.value[i], this.lastFrom = t.from[i] + e, this.lastTo = t.to[i] + e, !0;
  }
  /**
  Finish the range set. Returns the new set. The builder can't be
  used anymore after this has been called.
  */
  finish() {
    return this.finishInner(L.empty);
  }
  /**
  @internal
  */
  finishInner(e) {
    if (this.from.length && this.finishChunk(!1), this.chunks.length == 0)
      return e;
    let t = L.create(this.chunkPos, this.chunks, this.nextLayer ? this.nextLayer.finishInner(e) : e, this.setMaxPoint);
    return this.from = null, t;
  }
}
function Tr(s, e, t) {
  let i = /* @__PURE__ */ new Map();
  for (let r of s)
    for (let o = 0; o < r.chunk.length; o++)
      r.chunk[o].maxPoint <= 0 && i.set(r.chunk[o], r.chunkPos[o]);
  let n = /* @__PURE__ */ new Set();
  for (let r of e)
    for (let o = 0; o < r.chunk.length; o++) {
      let l = i.get(r.chunk[o]);
      l != null && (t ? t.mapPos(l) : l) == r.chunkPos[o] && !t?.touchesRange(l, l + r.chunk[o].length) && n.add(r.chunk[o]);
    }
  return n;
}
class ul {
  constructor(e, t, i, n = 0) {
    this.layer = e, this.skip = t, this.minPoint = i, this.rank = n;
  }
  get startSide() {
    return this.value ? this.value.startSide : 0;
  }
  get endSide() {
    return this.value ? this.value.endSide : 0;
  }
  goto(e, t = -1e9) {
    return this.chunkIndex = this.rangeIndex = 0, this.gotoInner(e, t, !1), this;
  }
  gotoInner(e, t, i) {
    for (; this.chunkIndex < this.layer.chunk.length; ) {
      let n = this.layer.chunk[this.chunkIndex];
      if (!(this.skip && this.skip.has(n) || this.layer.chunkEnd(this.chunkIndex) < e || n.maxPoint < this.minPoint))
        break;
      this.chunkIndex++, i = !1;
    }
    if (this.chunkIndex < this.layer.chunk.length) {
      let n = this.layer.chunk[this.chunkIndex].findIndex(e - this.layer.chunkPos[this.chunkIndex], t, !0);
      (!i || this.rangeIndex < n) && this.setRangeIndex(n);
    }
    this.next();
  }
  forward(e, t) {
    (this.to - e || this.endSide - t) < 0 && this.gotoInner(e, t, !0);
  }
  next() {
    for (; ; )
      if (this.chunkIndex == this.layer.chunk.length) {
        this.from = this.to = 1e9, this.value = null;
        break;
      } else {
        let e = this.layer.chunkPos[this.chunkIndex], t = this.layer.chunk[this.chunkIndex], i = e + t.from[this.rangeIndex];
        if (this.from = i, this.to = e + t.to[this.rangeIndex], this.value = t.value[this.rangeIndex], this.setRangeIndex(this.rangeIndex + 1), this.minPoint < 0 || this.value.point && this.to - this.from >= this.minPoint)
          break;
      }
  }
  setRangeIndex(e) {
    if (e == this.layer.chunk[this.chunkIndex].value.length) {
      if (this.chunkIndex++, this.skip)
        for (; this.chunkIndex < this.layer.chunk.length && this.skip.has(this.layer.chunk[this.chunkIndex]); )
          this.chunkIndex++;
      this.rangeIndex = 0;
    } else
      this.rangeIndex = e;
  }
  nextChunk() {
    this.chunkIndex++, this.rangeIndex = 0, this.next();
  }
  compare(e) {
    return this.from - e.from || this.startSide - e.startSide || this.rank - e.rank || this.to - e.to || this.endSide - e.endSide;
  }
}
class ai {
  constructor(e) {
    this.heap = e;
  }
  static from(e, t = null, i = -1) {
    let n = [];
    for (let r = 0; r < e.length; r++)
      for (let o = e[r]; !o.isEmpty; o = o.nextLayer)
        o.maxPoint >= i && n.push(new ul(o, t, i, r));
    return n.length == 1 ? n[0] : new ai(n);
  }
  get startSide() {
    return this.value ? this.value.startSide : 0;
  }
  goto(e, t = -1e9) {
    for (let i of this.heap)
      i.goto(e, t);
    for (let i = this.heap.length >> 1; i >= 0; i--)
      Wn(this.heap, i);
    return this.next(), this;
  }
  forward(e, t) {
    for (let i of this.heap)
      i.forward(e, t);
    for (let i = this.heap.length >> 1; i >= 0; i--)
      Wn(this.heap, i);
    (this.to - e || this.value.endSide - t) < 0 && this.next();
  }
  next() {
    if (this.heap.length == 0)
      this.from = this.to = 1e9, this.value = null, this.rank = -1;
    else {
      let e = this.heap[0];
      this.from = e.from, this.to = e.to, this.value = e.value, this.rank = e.rank, e.value && e.next(), Wn(this.heap, 0);
    }
  }
}
function Wn(s, e) {
  for (let t = s[e]; ; ) {
    let i = (e << 1) + 1;
    if (i >= s.length)
      break;
    let n = s[i];
    if (i + 1 < s.length && n.compare(s[i + 1]) >= 0 && (n = s[i + 1], i++), t.compare(n) < 0)
      break;
    s[i] = t, s[e] = n, e = i;
  }
}
class Jt {
  constructor(e, t, i) {
    this.minPoint = i, this.active = [], this.activeTo = [], this.activeRank = [], this.minActive = -1, this.point = null, this.pointFrom = 0, this.pointRank = 0, this.to = -1e9, this.endSide = 0, this.openStart = -1, this.cursor = ai.from(e, t, i);
  }
  goto(e, t = -1e9) {
    return this.cursor.goto(e, t), this.active.length = this.activeTo.length = this.activeRank.length = 0, this.minActive = -1, this.to = e, this.endSide = t, this.openStart = -1, this.next(), this;
  }
  forward(e, t) {
    for (; this.minActive > -1 && (this.activeTo[this.minActive] - e || this.active[this.minActive].endSide - t) < 0; )
      this.removeActive(this.minActive);
    this.cursor.forward(e, t);
  }
  removeActive(e) {
    Mi(this.active, e), Mi(this.activeTo, e), Mi(this.activeRank, e), this.minActive = Br(this.active, this.activeTo);
  }
  addActive(e) {
    let t = 0, { value: i, to: n, rank: r } = this.cursor;
    for (; t < this.activeRank.length && (r - this.activeRank[t] || n - this.activeTo[t]) > 0; )
      t++;
    Di(this.active, t, i), Di(this.activeTo, t, n), Di(this.activeRank, t, r), e && Di(e, t, this.cursor.from), this.minActive = Br(this.active, this.activeTo);
  }
  // After calling this, if `this.point` != null, the next range is a
  // point. Otherwise, it's a regular range, covered by `this.active`.
  next() {
    let e = this.to, t = this.point;
    this.point = null;
    let i = this.openStart < 0 ? [] : null;
    for (; ; ) {
      let n = this.minActive;
      if (n > -1 && (this.activeTo[n] - this.cursor.from || this.active[n].endSide - this.cursor.startSide) < 0) {
        if (this.activeTo[n] > e) {
          this.to = this.activeTo[n], this.endSide = this.active[n].endSide;
          break;
        }
        this.removeActive(n), i && Mi(i, n);
      } else if (this.cursor.value)
        if (this.cursor.from > e) {
          this.to = this.cursor.from, this.endSide = this.cursor.startSide;
          break;
        } else {
          let r = this.cursor.value;
          if (!r.point)
            this.addActive(i), this.cursor.next();
          else if (t && this.cursor.to == this.to && this.cursor.from < this.cursor.to)
            this.cursor.next();
          else {
            this.point = r, this.pointFrom = this.cursor.from, this.pointRank = this.cursor.rank, this.to = this.cursor.to, this.endSide = r.endSide, this.cursor.next(), this.forward(this.to, this.endSide);
            break;
          }
        }
      else {
        this.to = this.endSide = 1e9;
        break;
      }
    }
    if (i) {
      this.openStart = 0;
      for (let n = i.length - 1; n >= 0 && i[n] < e; n--)
        this.openStart++;
    }
  }
  activeForPoint(e) {
    if (!this.active.length)
      return this.active;
    let t = [];
    for (let i = this.active.length - 1; i >= 0 && !(this.activeRank[i] < this.pointRank); i--)
      (this.activeTo[i] > e || this.activeTo[i] == e && this.active[i].endSide >= this.point.endSide) && t.push(this.active[i]);
    return t.reverse();
  }
  openEnd(e) {
    let t = 0;
    for (let i = this.activeTo.length - 1; i >= 0 && this.activeTo[i] > e; i--)
      t++;
    return t;
  }
}
function Or(s, e, t, i, n, r) {
  s.goto(e), t.goto(i);
  let o = i + n, l = i, a = i - e, h = !!r.boundChange;
  for (let f = !1; ; ) {
    let c = s.to + a - t.to, u = c || s.endSide - t.endSide, d = u < 0 ? s.to + a : t.to, p = Math.min(d, o);
    if (s.point || t.point ? (s.point && t.point && Ys(s.point, t.point) && ms(s.activeForPoint(s.to), t.activeForPoint(t.to)) || r.comparePoint(l, p, s.point, t.point), f = !1) : (f && r.boundChange(l), p > l && !ms(s.active, t.active) && r.compareRange(l, p, s.active, t.active), h && p < o && (c || s.openEnd(d) != t.openEnd(d)) && (f = !0)), d > o)
      break;
    l = d, u <= 0 && s.next(), u >= 0 && t.next();
  }
}
function ms(s, e) {
  if (s.length != e.length)
    return !1;
  for (let t = 0; t < s.length; t++)
    if (s[t] != e[t] && !Ys(s[t], e[t]))
      return !1;
  return !0;
}
function Mi(s, e) {
  for (let t = e, i = s.length - 1; t < i; t++)
    s[t] = s[t + 1];
  s.pop();
}
function Di(s, e, t) {
  for (let i = s.length - 1; i >= e; i--)
    s[i + 1] = s[i];
  s[e] = t;
}
function Br(s, e) {
  let t = -1, i = 1e9;
  for (let n = 0; n < e.length; n++)
    (e[n] - i || s[n].endSide - s[t].endSide) < 0 && (t = n, i = e[n]);
  return t;
}
function Sn(s, e, t = s.length) {
  let i = 0;
  for (let n = 0; n < t && n < s.length; )
    s.charCodeAt(n) == 9 ? (i += e - i % e, n++) : (i++, n = ee(s, n));
  return i;
}
function Jh(s, e, t, i) {
  for (let n = 0, r = 0; ; ) {
    if (r >= e)
      return n;
    if (n == s.length)
      break;
    r += s.charCodeAt(n) == 9 ? t - r % t : 1, n = ee(s, n);
  }
  return s.length;
}
const ys = "ͼ", Er = typeof Symbol > "u" ? "__" + ys : Symbol.for(ys), xs = typeof Symbol > "u" ? "__styleSet" + Math.floor(Math.random() * 1e8) : /* @__PURE__ */ Symbol("styleSet"), Lr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : {};
class nt {
  // :: (Object<Style>, ?{finish: ?(string) → string})
  // Create a style module from the given spec.
  //
  // When `finish` is given, it is called on regular (non-`@`)
  // selectors (after `&` expansion) to compute the final selector.
  constructor(e, t) {
    this.rules = [];
    let { finish: i } = t || {};
    function n(o) {
      return /^@/.test(o) ? [o] : o.split(/,\s*/);
    }
    function r(o, l, a, h) {
      let f = [], c = /^@(\w+)\b/.exec(o[0]), u = c && c[1] == "keyframes";
      if (c && l == null) return a.push(o[0] + ";");
      for (let d in l) {
        let p = l[d];
        if (/&/.test(d))
          r(
            d.split(/,\s*/).map((g) => o.map((m) => g.replace(/&/, m))).reduce((g, m) => g.concat(m)),
            p,
            a
          );
        else if (p && typeof p == "object") {
          if (!c) throw new RangeError("The value of a property (" + d + ") should be a primitive value.");
          r(n(d), p, f, u);
        } else p != null && f.push(d.replace(/_.*/, "").replace(/[A-Z]/g, (g) => "-" + g.toLowerCase()) + ": " + p + ";");
      }
      (f.length || u) && a.push((i && !c && !h ? o.map(i) : o).join(", ") + " {" + f.join(" ") + "}");
    }
    for (let o in e) r(n(o), e[o], this.rules);
  }
  // :: () → string
  // Returns a string containing the module's CSS rules.
  getRules() {
    return this.rules.join(`
`);
  }
  // :: () → string
  // Generate a new unique CSS class name.
  static newName() {
    let e = Lr[Er] || 1;
    return Lr[Er] = e + 1, ys + e.toString(36);
  }
  // :: (union<Document, ShadowRoot>, union<[StyleModule], StyleModule>, ?{nonce: ?string})
  //
  // Mount the given set of modules in the given DOM root, which ensures
  // that the CSS rules defined by the module are available in that
  // context.
  //
  // Rules are only added to the document once per root.
  //
  // Rule order will follow the order of the modules, so that rules from
  // modules later in the array take precedence of those from earlier
  // modules. If you call this function multiple times for the same root
  // in a way that changes the order of already mounted modules, the old
  // order will be changed.
  //
  // If a Content Security Policy nonce is provided, it is added to
  // the `<style>` tag generated by the library.
  static mount(e, t, i) {
    let n = e[xs], r = i && i.nonce;
    n ? r && n.setNonce(r) : n = new Yh(e, r), n.mount(Array.isArray(t) ? t : [t], e);
  }
}
let Pr = /* @__PURE__ */ new Map();
class Yh {
  constructor(e, t) {
    let i = e.ownerDocument || e, n = i.defaultView;
    if (!e.head && e.adoptedStyleSheets && n.CSSStyleSheet) {
      let r = Pr.get(i);
      if (r) return e[xs] = r;
      this.sheet = new n.CSSStyleSheet(), Pr.set(i, this);
    } else
      this.styleTag = i.createElement("style"), t && this.styleTag.setAttribute("nonce", t);
    this.modules = [], e[xs] = this;
  }
  mount(e, t) {
    let i = this.sheet, n = 0, r = 0;
    for (let o = 0; o < e.length; o++) {
      let l = e[o], a = this.modules.indexOf(l);
      if (a < r && a > -1 && (this.modules.splice(a, 1), r--, a = -1), a == -1) {
        if (this.modules.splice(r++, 0, l), i) for (let h = 0; h < l.rules.length; h++)
          i.insertRule(l.rules[h], n++);
      } else {
        for (; r < a; ) n += this.modules[r++].rules.length;
        n += l.rules.length, r++;
      }
    }
    if (i)
      t.adoptedStyleSheets.indexOf(this.sheet) < 0 && (t.adoptedStyleSheets = [this.sheet, ...t.adoptedStyleSheets]);
    else {
      let o = "";
      for (let a = 0; a < this.modules.length; a++)
        o += this.modules[a].getRules() + `
`;
      this.styleTag.textContent = o;
      let l = t.head || t;
      this.styleTag.parentNode != l && l.insertBefore(this.styleTag, l.firstChild);
    }
  }
  setNonce(e) {
    this.styleTag && this.styleTag.getAttribute("nonce") != e && this.styleTag.setAttribute("nonce", e);
  }
}
var st = {
  8: "Backspace",
  9: "Tab",
  10: "Enter",
  12: "NumLock",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  44: "PrintScreen",
  45: "Insert",
  46: "Delete",
  59: ";",
  61: "=",
  91: "Meta",
  92: "Meta",
  106: "*",
  107: "+",
  108: ",",
  109: "-",
  110: ".",
  111: "/",
  144: "NumLock",
  145: "ScrollLock",
  160: "Shift",
  161: "Shift",
  162: "Control",
  163: "Control",
  164: "Alt",
  165: "Alt",
  173: "-",
  186: ";",
  187: "=",
  188: ",",
  189: "-",
  190: ".",
  191: "/",
  192: "`",
  219: "[",
  220: "\\",
  221: "]",
  222: "'"
}, hi = {
  48: ")",
  49: "!",
  50: "@",
  51: "#",
  52: "$",
  53: "%",
  54: "^",
  55: "&",
  56: "*",
  57: "(",
  59: ":",
  61: "+",
  173: "_",
  186: ":",
  187: "+",
  188: "<",
  189: "_",
  190: ">",
  191: "?",
  192: "~",
  219: "{",
  220: "|",
  221: "}",
  222: '"'
}, Xh = typeof navigator < "u" && /Mac/.test(navigator.platform), Qh = typeof navigator < "u" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
for (var ne = 0; ne < 10; ne++) st[48 + ne] = st[96 + ne] = String(ne);
for (var ne = 1; ne <= 24; ne++) st[ne + 111] = "F" + ne;
for (var ne = 65; ne <= 90; ne++)
  st[ne] = String.fromCharCode(ne + 32), hi[ne] = String.fromCharCode(ne);
for (var Fn in st) hi.hasOwnProperty(Fn) || (hi[Fn] = st[Fn]);
function Zh(s) {
  var e = Xh && s.metaKey && s.shiftKey && !s.ctrlKey && !s.altKey || Qh && s.shiftKey && s.key && s.key.length == 1 || s.key == "Unidentified", t = !e && s.key || (s.shiftKey ? hi : st)[s.keyCode] || s.key || "Unidentified";
  return t == "Esc" && (t = "Escape"), t == "Del" && (t = "Delete"), t == "Left" && (t = "ArrowLeft"), t == "Up" && (t = "ArrowUp"), t == "Right" && (t = "ArrowRight"), t == "Down" && (t = "ArrowDown"), t;
}
function Z() {
  var s = arguments[0];
  typeof s == "string" && (s = document.createElement(s));
  var e = 1, t = arguments[1];
  if (t && typeof t == "object" && t.nodeType == null && !Array.isArray(t)) {
    for (var i in t) if (Object.prototype.hasOwnProperty.call(t, i)) {
      var n = t[i];
      typeof n == "string" ? s.setAttribute(i, n) : n != null && (s[i] = n);
    }
    e++;
  }
  for (; e < arguments.length; e++) dl(s, arguments[e]);
  return s;
}
function dl(s, e) {
  if (typeof e == "string")
    s.appendChild(document.createTextNode(e));
  else if (e != null) if (e.nodeType != null)
    s.appendChild(e);
  else if (Array.isArray(e))
    for (var t = 0; t < e.length; t++) dl(s, e[t]);
  else
    throw new RangeError("Unsupported child node: " + e);
}
let le = typeof navigator < "u" ? navigator : { userAgent: "", vendor: "", platform: "" }, bs = typeof document < "u" ? document : { documentElement: { style: {} } };
const ws = /* @__PURE__ */ /Edge\/(\d+)/.exec(le.userAgent), pl = /* @__PURE__ */ /MSIE \d/.test(le.userAgent), ks = /* @__PURE__ */ /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(le.userAgent), vn = !!(pl || ks || ws), Rr = !vn && /* @__PURE__ */ /gecko\/(\d+)/i.test(le.userAgent), Hn = !vn && /* @__PURE__ */ /Chrome\/(\d+)/.exec(le.userAgent), ef = "webkitFontSmoothing" in bs.documentElement.style, Ss = !vn && /* @__PURE__ */ /Apple Computer/.test(le.vendor), Ir = Ss && (/* @__PURE__ */ /Mobile\/\w+/.test(le.userAgent) || le.maxTouchPoints > 2);
var S = {
  mac: Ir || /* @__PURE__ */ /Mac/.test(le.platform),
  windows: /* @__PURE__ */ /Win/.test(le.platform),
  linux: /* @__PURE__ */ /Linux|X11/.test(le.platform),
  ie: vn,
  ie_version: pl ? bs.documentMode || 6 : ks ? +ks[1] : ws ? +ws[1] : 0,
  gecko: Rr,
  gecko_version: Rr ? +(/* @__PURE__ */ /Firefox\/(\d+)/.exec(le.userAgent) || [0, 0])[1] : 0,
  chrome: !!Hn,
  chrome_version: Hn ? +Hn[1] : 0,
  ios: Ir,
  android: /* @__PURE__ */ /Android\b/.test(le.userAgent),
  webkit_version: ef ? +(/* @__PURE__ */ /\bAppleWebKit\/(\d+)/.exec(le.userAgent) || [0, 0])[1] : 0,
  safari: Ss,
  safari_version: Ss ? +(/* @__PURE__ */ /\bVersion\/(\d+(\.\d+)?)/.exec(le.userAgent) || [0, 0])[1] : 0,
  tabSize: bs.documentElement.style.tabSize != null ? "tab-size" : "-moz-tab-size"
};
function Qs(s, e) {
  for (let t in s)
    t == "class" && e.class ? e.class += " " + s.class : t == "style" && e.style ? e.style += ";" + s.style : e[t] = s[t];
  return e;
}
const Qi = /* @__PURE__ */ Object.create(null);
function Zs(s, e, t) {
  if (s == e)
    return !0;
  s || (s = Qi), e || (e = Qi);
  let i = Object.keys(s), n = Object.keys(e);
  if (i.length - 0 != n.length - 0)
    return !1;
  for (let r of i)
    if (r != t && (n.indexOf(r) == -1 || s[r] !== e[r]))
      return !1;
  return !0;
}
function tf(s, e) {
  for (let t = s.attributes.length - 1; t >= 0; t--) {
    let i = s.attributes[t].name;
    e[i] == null && s.removeAttribute(i);
  }
  for (let t in e) {
    let i = e[t];
    t == "style" ? s.style.cssText = i : s.getAttribute(t) != i && s.setAttribute(t, i);
  }
}
function Nr(s, e, t) {
  let i = !1;
  if (e)
    for (let n in e)
      t && n in t || (i = !0, n == "style" ? s.style.cssText = "" : s.removeAttribute(n));
  if (t)
    for (let n in t)
      e && e[n] == t[n] || (i = !0, n == "style" ? s.style.cssText = t[n] : s.setAttribute(n, t[n]));
  return i;
}
function nf(s) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t = 0; t < s.attributes.length; t++) {
    let i = s.attributes[t];
    e[i.name] = i.value;
  }
  return e;
}
class jt {
  /**
  Compare this instance to another instance of the same type.
  (TypeScript can't express this, but only instances of the same
  specific class will be passed to this method.) This is used to
  avoid redrawing widgets when they are replaced by a new
  decoration of the same type. The default implementation just
  returns `false`, which will cause new instances of the widget to
  always be redrawn.
  */
  eq(e) {
    return !1;
  }
  /**
  Update a DOM element created by a widget of the same type (but
  different, non-`eq` content) to reflect this widget. May return
  true to indicate that it could update, false to indicate it
  couldn't (in which case the widget will be redrawn). The default
  implementation just returns false.
  */
  updateDOM(e, t, i) {
    return !1;
  }
  /**
  @internal
  */
  compare(e) {
    return this == e || this.constructor == e.constructor && this.eq(e);
  }
  /**
  The estimated height this widget will have, to be used when
  estimating the height of content that hasn't been drawn. May
  return -1 to indicate you don't know. The default implementation
  returns -1.
  */
  get estimatedHeight() {
    return -1;
  }
  /**
  For inline widgets that are displayed inline (as opposed to
  `inline-block`) and introduce line breaks (through `<br>` tags
  or textual newlines), this must indicate the amount of line
  breaks they introduce. Defaults to 0.
  */
  get lineBreaks() {
    return 0;
  }
  /**
  Can be used to configure which kinds of events inside the widget
  should be ignored by the editor. The default is to ignore all
  events.
  */
  ignoreEvent(e) {
    return !0;
  }
  /**
  Override the way screen coordinates for positions at/in the
  widget are found. `pos` will be the offset into the widget, and
  `side` the side of the position that is being queried—less than
  zero for before, greater than zero for after, and zero for
  directly at that position.
  */
  coordsAt(e, t, i) {
    return null;
  }
  /**
  @internal
  */
  get isHidden() {
    return !1;
  }
  /**
  @internal
  */
  get editable() {
    return !1;
  }
  /**
  This is called when the an instance of the widget is removed
  from the editor view.
  */
  destroy(e) {
  }
}
var ce = /* @__PURE__ */ (function(s) {
  return s[s.Text = 0] = "Text", s[s.WidgetBefore = 1] = "WidgetBefore", s[s.WidgetAfter = 2] = "WidgetAfter", s[s.WidgetRange = 3] = "WidgetRange", s;
})(ce || (ce = {}));
class B extends yt {
  constructor(e, t, i, n) {
    super(), this.startSide = e, this.endSide = t, this.widget = i, this.spec = n;
  }
  /**
  @internal
  */
  get heightRelevant() {
    return !1;
  }
  /**
  Create a mark decoration, which influences the styling of the
  content in its range. Nested mark decorations will cause nested
  DOM elements to be created. Nesting order is determined by
  precedence of the [facet](https://codemirror.net/6/docs/ref/#view.EditorView^decorations), with
  the higher-precedence decorations creating the inner DOM nodes.
  Such elements are split on line boundaries and on the boundaries
  of lower-precedence decorations.
  */
  static mark(e) {
    return new yi(e);
  }
  /**
  Create a widget decoration, which displays a DOM element at the
  given position.
  */
  static widget(e) {
    let t = Math.max(-1e4, Math.min(1e4, e.side || 0)), i = !!e.block;
    return t += i && !e.inlineOrder ? t > 0 ? 3e8 : -4e8 : t > 0 ? 1e8 : -1e8, new bt(e, t, t, i, e.widget || null, !1);
  }
  /**
  Create a replace decoration which replaces the given range with
  a widget, or simply hides it.
  */
  static replace(e) {
    let t = !!e.block, i, n;
    if (e.isBlockGap)
      i = -5e8, n = 4e8;
    else {
      let { start: r, end: o } = gl(e, t);
      i = (r ? t ? -3e8 : -1 : 5e8) - 1, n = (o ? t ? 2e8 : 1 : -6e8) + 1;
    }
    return new bt(e, i, n, t, e.widget || null, !0);
  }
  /**
  Create a line decoration, which can add DOM attributes to the
  line starting at the given position.
  */
  static line(e) {
    return new xi(e);
  }
  /**
  Build a [`DecorationSet`](https://codemirror.net/6/docs/ref/#view.DecorationSet) from the given
  decorated range or ranges. If the ranges aren't already sorted,
  pass `true` for `sort` to make the library sort them for you.
  */
  static set(e, t = !1) {
    return L.of(e, t);
  }
  /**
  @internal
  */
  hasHeight() {
    return this.widget ? this.widget.estimatedHeight > -1 : !1;
  }
}
B.none = L.empty;
class yi extends B {
  constructor(e) {
    let { start: t, end: i } = gl(e);
    super(t ? -1 : 5e8, i ? 1 : -6e8, null, e), this.tagName = e.tagName || "span", this.attrs = e.class && e.attributes ? Qs(e.attributes, { class: e.class }) : e.class ? { class: e.class } : e.attributes || Qi;
  }
  eq(e) {
    return this == e || e instanceof yi && this.tagName == e.tagName && Zs(this.attrs, e.attrs);
  }
  range(e, t = e) {
    if (e >= t)
      throw new RangeError("Mark decorations may not be empty");
    return super.range(e, t);
  }
}
yi.prototype.point = !1;
class xi extends B {
  constructor(e) {
    super(-2e8, -2e8, null, e);
  }
  eq(e) {
    return e instanceof xi && this.spec.class == e.spec.class && Zs(this.spec.attributes, e.spec.attributes);
  }
  range(e, t = e) {
    if (t != e)
      throw new RangeError("Line decoration ranges must be zero-length");
    return super.range(e, t);
  }
}
xi.prototype.mapMode = me.TrackBefore;
xi.prototype.point = !0;
class bt extends B {
  constructor(e, t, i, n, r, o) {
    super(t, i, r, e), this.block = n, this.isReplace = o, this.mapMode = n ? t <= 0 ? me.TrackBefore : me.TrackAfter : me.TrackDel;
  }
  // Only relevant when this.block == true
  get type() {
    return this.startSide != this.endSide ? ce.WidgetRange : this.startSide <= 0 ? ce.WidgetBefore : ce.WidgetAfter;
  }
  get heightRelevant() {
    return this.block || !!this.widget && (this.widget.estimatedHeight >= 5 || this.widget.lineBreaks > 0);
  }
  eq(e) {
    return e instanceof bt && sf(this.widget, e.widget) && this.block == e.block && this.startSide == e.startSide && this.endSide == e.endSide;
  }
  range(e, t = e) {
    if (this.isReplace && (e > t || e == t && this.startSide > 0 && this.endSide <= 0))
      throw new RangeError("Invalid range for replacement decoration");
    if (!this.isReplace && t != e)
      throw new RangeError("Widget decorations can only have zero-length ranges");
    return super.range(e, t);
  }
}
bt.prototype.point = !0;
function gl(s, e = !1) {
  let { inclusiveStart: t, inclusiveEnd: i } = s;
  return t == null && (t = s.inclusive), i == null && (i = s.inclusive), { start: t ?? e, end: i ?? e };
}
function sf(s, e) {
  return s == e || !!(s && e && s.compare(e));
}
function Et(s, e, t, i = 0) {
  let n = t.length - 1;
  n >= 0 && t[n] + i >= s ? t[n] = Math.max(t[n], e) : t.push(s, e);
}
class fi extends yt {
  constructor(e, t, i) {
    super(), this.tagName = e, this.attributes = t, this.rank = i;
  }
  eq(e) {
    return e == this || e instanceof fi && this.tagName == e.tagName && Zs(this.attributes, e.attributes);
  }
  /**
  Create a block wrapper object with the given tag name and
  attributes.
  */
  static create(e) {
    return new fi(e.tagName, e.attributes || Qi, e.rank == null ? 50 : Math.max(0, Math.min(e.rank, 100)));
  }
  /**
  Create a range set from the given block wrapper ranges.
  */
  static set(e, t = !1) {
    return L.of(e, t);
  }
}
fi.prototype.startSide = fi.prototype.endSide = -1;
function ci(s) {
  let e;
  return s.nodeType == 11 ? e = s.getSelection ? s : s.ownerDocument : e = s, e.getSelection();
}
function vs(s, e) {
  return e ? s == e || s.contains(e.nodeType != 1 ? e.parentNode : e) : !1;
}
function ni(s, e) {
  if (!e.anchorNode)
    return !1;
  try {
    return vs(s, e.anchorNode);
  } catch {
    return !1;
  }
}
function Ui(s) {
  return s.nodeType == 3 ? ui(s, 0, s.nodeValue.length).getClientRects() : s.nodeType == 1 ? s.getClientRects() : [];
}
function si(s, e, t, i) {
  return t ? Wr(s, e, t, i, -1) || Wr(s, e, t, i, 1) : !1;
}
function rt(s) {
  for (var e = 0; ; e++)
    if (s = s.previousSibling, !s)
      return e;
}
function Zi(s) {
  return s.nodeType == 1 && /^(DIV|P|LI|UL|OL|BLOCKQUOTE|DD|DT|H\d|SECTION|PRE)$/.test(s.nodeName);
}
function Wr(s, e, t, i, n) {
  for (; ; ) {
    if (s == t && e == i)
      return !0;
    if (e == (n < 0 ? 0 : Je(s))) {
      if (s.nodeName == "DIV")
        return !1;
      let r = s.parentNode;
      if (!r || r.nodeType != 1)
        return !1;
      e = rt(s) + (n < 0 ? 0 : 1), s = r;
    } else if (s.nodeType == 1) {
      if (s = s.childNodes[e + (n < 0 ? -1 : 0)], s.nodeType == 1 && s.contentEditable == "false")
        return !1;
      e = n < 0 ? Je(s) : 0;
    } else
      return !1;
  }
}
function Je(s) {
  return s.nodeType == 3 ? s.nodeValue.length : s.childNodes.length;
}
function en(s, e) {
  let t = e ? s.left : s.right;
  return { left: t, right: t, top: s.top, bottom: s.bottom };
}
function rf(s) {
  let e = s.visualViewport;
  return e ? {
    left: 0,
    right: e.width,
    top: 0,
    bottom: e.height
  } : {
    left: 0,
    right: s.innerWidth,
    top: 0,
    bottom: s.innerHeight
  };
}
function ml(s, e) {
  let t = e.width / s.offsetWidth, i = e.height / s.offsetHeight;
  return (t > 0.995 && t < 1.005 || !isFinite(t) || Math.abs(e.width - s.offsetWidth) < 1) && (t = 1), (i > 0.995 && i < 1.005 || !isFinite(i) || Math.abs(e.height - s.offsetHeight) < 1) && (i = 1), { scaleX: t, scaleY: i };
}
function of(s, e, t, i, n, r, o, l) {
  let a = s.ownerDocument, h = a.defaultView || window;
  for (let f = s, c = !1; f && !c; )
    if (f.nodeType == 1) {
      let u, d = f == a.body, p = 1, g = 1;
      if (d)
        u = rf(h);
      else {
        if (/^(fixed|sticky)$/.test(getComputedStyle(f).position) && (c = !0), f.scrollHeight <= f.clientHeight && f.scrollWidth <= f.clientWidth) {
          f = f.assignedSlot || f.parentNode;
          continue;
        }
        let b = f.getBoundingClientRect();
        ({ scaleX: p, scaleY: g } = ml(f, b)), u = {
          left: b.left,
          right: b.left + f.clientWidth * p,
          top: b.top,
          bottom: b.top + f.clientHeight * g
        };
      }
      let m = 0, y = 0;
      if (n == "nearest")
        e.top < u.top + o ? (y = e.top - (u.top + o), t > 0 && e.bottom > u.bottom + y && (y = e.bottom - u.bottom + o)) : e.bottom > u.bottom - o && (y = e.bottom - u.bottom + o, t < 0 && e.top - y < u.top && (y = e.top - (u.top + o)));
      else {
        let b = e.bottom - e.top, C = u.bottom - u.top;
        y = (n == "center" && b <= C ? e.top + b / 2 - C / 2 : n == "start" || n == "center" && t < 0 ? e.top - o : e.bottom - C + o) - u.top;
      }
      if (i == "nearest" ? e.left < u.left + r ? (m = e.left - (u.left + r), t > 0 && e.right > u.right + m && (m = e.right - u.right + r)) : e.right > u.right - r && (m = e.right - u.right + r, t < 0 && e.left < u.left + m && (m = e.left - (u.left + r))) : m = (i == "center" ? e.left + (e.right - e.left) / 2 - (u.right - u.left) / 2 : i == "start" == l ? e.left - r : e.right - (u.right - u.left) + r) - u.left, m || y)
        if (d)
          h.scrollBy(m, y);
        else {
          let b = 0, C = 0;
          if (y) {
            let P = f.scrollTop;
            f.scrollTop += y / g, C = (f.scrollTop - P) * g;
          }
          if (m) {
            let P = f.scrollLeft;
            f.scrollLeft += m / p, b = (f.scrollLeft - P) * p;
          }
          e = {
            left: e.left - b,
            top: e.top - C,
            right: e.right - b,
            bottom: e.bottom - C
          }, b && Math.abs(b - m) < 1 && (i = "nearest"), C && Math.abs(C - y) < 1 && (n = "nearest");
        }
      if (d)
        break;
      (e.top < u.top || e.bottom > u.bottom || e.left < u.left || e.right > u.right) && (e = {
        left: Math.max(e.left, u.left),
        right: Math.min(e.right, u.right),
        top: Math.max(e.top, u.top),
        bottom: Math.min(e.bottom, u.bottom)
      }), f = f.assignedSlot || f.parentNode;
    } else if (f.nodeType == 11)
      f = f.host;
    else
      break;
}
function yl(s, e = !0) {
  let t = s.ownerDocument, i = null, n = null;
  for (let r = s.parentNode; r && !(r == t.body || (!e || i) && n); )
    if (r.nodeType == 1)
      !n && r.scrollHeight > r.clientHeight && (n = r), e && !i && r.scrollWidth > r.clientWidth && (i = r), r = r.assignedSlot || r.parentNode;
    else if (r.nodeType == 11)
      r = r.host;
    else
      break;
  return { x: i, y: n };
}
class lf {
  constructor() {
    this.anchorNode = null, this.anchorOffset = 0, this.focusNode = null, this.focusOffset = 0;
  }
  eq(e) {
    return this.anchorNode == e.anchorNode && this.anchorOffset == e.anchorOffset && this.focusNode == e.focusNode && this.focusOffset == e.focusOffset;
  }
  setRange(e) {
    let { anchorNode: t, focusNode: i } = e;
    this.set(t, Math.min(e.anchorOffset, t ? Je(t) : 0), i, Math.min(e.focusOffset, i ? Je(i) : 0));
  }
  set(e, t, i, n) {
    this.anchorNode = e, this.anchorOffset = t, this.focusNode = i, this.focusOffset = n;
  }
}
let dt = null;
S.safari && S.safari_version >= 26 && (dt = !1);
function xl(s) {
  if (s.setActive)
    return s.setActive();
  if (dt)
    return s.focus(dt);
  let e = [];
  for (let t = s; t && (e.push(t, t.scrollTop, t.scrollLeft), t != t.ownerDocument); t = t.parentNode)
    ;
  if (s.focus(dt == null ? {
    get preventScroll() {
      return dt = { preventScroll: !0 }, !0;
    }
  } : void 0), !dt) {
    dt = !1;
    for (let t = 0; t < e.length; ) {
      let i = e[t++], n = e[t++], r = e[t++];
      i.scrollTop != n && (i.scrollTop = n), i.scrollLeft != r && (i.scrollLeft = r);
    }
  }
}
let Fr;
function ui(s, e, t = e) {
  let i = Fr || (Fr = document.createRange());
  return i.setEnd(s, t), i.setStart(s, e), i;
}
function Lt(s, e, t, i) {
  let n = { key: e, code: e, keyCode: t, which: t, cancelable: !0 };
  i && ({ altKey: n.altKey, ctrlKey: n.ctrlKey, shiftKey: n.shiftKey, metaKey: n.metaKey } = i);
  let r = new KeyboardEvent("keydown", n);
  r.synthetic = !0, s.dispatchEvent(r);
  let o = new KeyboardEvent("keyup", n);
  return o.synthetic = !0, s.dispatchEvent(o), r.defaultPrevented || o.defaultPrevented;
}
function af(s) {
  for (; s; ) {
    if (s && (s.nodeType == 9 || s.nodeType == 11 && s.host))
      return s;
    s = s.assignedSlot || s.parentNode;
  }
  return null;
}
function hf(s, e) {
  let t = e.focusNode, i = e.focusOffset;
  if (!t || e.anchorNode != t || e.anchorOffset != i)
    return !1;
  for (i = Math.min(i, Je(t)); ; )
    if (i) {
      if (t.nodeType != 1)
        return !1;
      let n = t.childNodes[i - 1];
      n.contentEditable == "false" ? i-- : (t = n, i = Je(t));
    } else {
      if (t == s)
        return !0;
      i = rt(t), t = t.parentNode;
    }
}
function bl(s) {
  return s instanceof Window ? s.pageYOffset > Math.max(0, s.document.documentElement.scrollHeight - s.innerHeight - 4) : s.scrollTop > Math.max(1, s.scrollHeight - s.clientHeight - 4);
}
function wl(s, e) {
  for (let t = s, i = e; ; ) {
    if (t.nodeType == 3 && i > 0)
      return { node: t, offset: i };
    if (t.nodeType == 1 && i > 0) {
      if (t.contentEditable == "false")
        return null;
      t = t.childNodes[i - 1], i = Je(t);
    } else if (t.parentNode && !Zi(t))
      i = rt(t), t = t.parentNode;
    else
      return null;
  }
}
function kl(s, e) {
  for (let t = s, i = e; ; ) {
    if (t.nodeType == 3 && i < t.nodeValue.length)
      return { node: t, offset: i };
    if (t.nodeType == 1 && i < t.childNodes.length) {
      if (t.contentEditable == "false")
        return null;
      t = t.childNodes[i], i = 0;
    } else if (t.parentNode && !Zi(t))
      i = rt(t) + 1, t = t.parentNode;
    else
      return null;
  }
}
class Me {
  constructor(e, t, i = !0) {
    this.node = e, this.offset = t, this.precise = i;
  }
  static before(e, t) {
    return new Me(e.parentNode, rt(e), t);
  }
  static after(e, t) {
    return new Me(e.parentNode, rt(e) + 1, t);
  }
}
var J = /* @__PURE__ */ (function(s) {
  return s[s.LTR = 0] = "LTR", s[s.RTL = 1] = "RTL", s;
})(J || (J = {}));
const wt = J.LTR, er = J.RTL;
function Sl(s) {
  let e = [];
  for (let t = 0; t < s.length; t++)
    e.push(1 << +s[t]);
  return e;
}
const ff = /* @__PURE__ */ Sl("88888888888888888888888888888888888666888888787833333333337888888000000000000000000000000008888880000000000000000000000000088888888888888888888888888888888888887866668888088888663380888308888800000000000000000000000800000000000000000000000000000008"), cf = /* @__PURE__ */ Sl("4444448826627288999999999992222222222222222222222222222222222222222222222229999999999999999999994444444444644222822222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222999999949999999229989999223333333333"), Cs = /* @__PURE__ */ Object.create(null), Pe = [];
for (let s of ["()", "[]", "{}"]) {
  let e = /* @__PURE__ */ s.charCodeAt(0), t = /* @__PURE__ */ s.charCodeAt(1);
  Cs[e] = t, Cs[t] = -e;
}
function vl(s) {
  return s <= 247 ? ff[s] : 1424 <= s && s <= 1524 ? 2 : 1536 <= s && s <= 1785 ? cf[s - 1536] : 1774 <= s && s <= 2220 ? 4 : 8192 <= s && s <= 8204 ? 256 : 64336 <= s && s <= 65023 ? 4 : 1;
}
const uf = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\ufb50-\ufdff]/;
class He {
  /**
  The direction of this span.
  */
  get dir() {
    return this.level % 2 ? er : wt;
  }
  /**
  @internal
  */
  constructor(e, t, i) {
    this.from = e, this.to = t, this.level = i;
  }
  /**
  @internal
  */
  side(e, t) {
    return this.dir == t == e ? this.to : this.from;
  }
  /**
  @internal
  */
  forward(e, t) {
    return e == (this.dir == t);
  }
  /**
  @internal
  */
  static find(e, t, i, n) {
    let r = -1;
    for (let o = 0; o < e.length; o++) {
      let l = e[o];
      if (l.from <= t && l.to >= t) {
        if (l.level == i)
          return o;
        (r < 0 || (n != 0 ? n < 0 ? l.from < t : l.to > t : e[r].level > l.level)) && (r = o);
      }
    }
    if (r < 0)
      throw new RangeError("Index out of range");
    return r;
  }
}
function Cl(s, e) {
  if (s.length != e.length)
    return !1;
  for (let t = 0; t < s.length; t++) {
    let i = s[t], n = e[t];
    if (i.from != n.from || i.to != n.to || i.direction != n.direction || !Cl(i.inner, n.inner))
      return !1;
  }
  return !0;
}
const F = [];
function df(s, e, t, i, n) {
  for (let r = 0; r <= i.length; r++) {
    let o = r ? i[r - 1].to : e, l = r < i.length ? i[r].from : t, a = r ? 256 : n;
    for (let h = o, f = a, c = a; h < l; h++) {
      let u = vl(s.charCodeAt(h));
      u == 512 ? u = f : u == 8 && c == 4 && (u = 16), F[h] = u == 4 ? 2 : u, u & 7 && (c = u), f = u;
    }
    for (let h = o, f = a, c = a; h < l; h++) {
      let u = F[h];
      if (u == 128)
        h < l - 1 && f == F[h + 1] && f & 24 ? u = F[h] = f : F[h] = 256;
      else if (u == 64) {
        let d = h + 1;
        for (; d < l && F[d] == 64; )
          d++;
        let p = h && f == 8 || d < t && F[d] == 8 ? c == 1 ? 1 : 8 : 256;
        for (let g = h; g < d; g++)
          F[g] = p;
        h = d - 1;
      } else u == 8 && c == 1 && (F[h] = 1);
      f = u, u & 7 && (c = u);
    }
  }
}
function pf(s, e, t, i, n) {
  let r = n == 1 ? 2 : 1;
  for (let o = 0, l = 0, a = 0; o <= i.length; o++) {
    let h = o ? i[o - 1].to : e, f = o < i.length ? i[o].from : t;
    for (let c = h, u, d, p; c < f; c++)
      if (d = Cs[u = s.charCodeAt(c)])
        if (d < 0) {
          for (let g = l - 3; g >= 0; g -= 3)
            if (Pe[g + 1] == -d) {
              let m = Pe[g + 2], y = m & 2 ? n : m & 4 ? m & 1 ? r : n : 0;
              y && (F[c] = F[Pe[g]] = y), l = g;
              break;
            }
        } else {
          if (Pe.length == 189)
            break;
          Pe[l++] = c, Pe[l++] = u, Pe[l++] = a;
        }
      else if ((p = F[c]) == 2 || p == 1) {
        let g = p == n;
        a = g ? 0 : 1;
        for (let m = l - 3; m >= 0; m -= 3) {
          let y = Pe[m + 2];
          if (y & 2)
            break;
          if (g)
            Pe[m + 2] |= 2;
          else {
            if (y & 4)
              break;
            Pe[m + 2] |= 4;
          }
        }
      }
  }
}
function gf(s, e, t, i) {
  for (let n = 0, r = i; n <= t.length; n++) {
    let o = n ? t[n - 1].to : s, l = n < t.length ? t[n].from : e;
    for (let a = o; a < l; ) {
      let h = F[a];
      if (h == 256) {
        let f = a + 1;
        for (; ; )
          if (f == l) {
            if (n == t.length)
              break;
            f = t[n++].to, l = n < t.length ? t[n].from : e;
          } else if (F[f] == 256)
            f++;
          else
            break;
        let c = r == 1, u = (f < e ? F[f] : i) == 1, d = c == u ? c ? 1 : 2 : i;
        for (let p = f, g = n, m = g ? t[g - 1].to : s; p > a; )
          p == m && (p = t[--g].from, m = g ? t[g - 1].to : s), F[--p] = d;
        a = f;
      } else
        r = h, a++;
    }
  }
}
function As(s, e, t, i, n, r, o) {
  let l = i % 2 ? 2 : 1;
  if (i % 2 == n % 2)
    for (let a = e, h = 0; a < t; ) {
      let f = !0, c = !1;
      if (h == r.length || a < r[h].from) {
        let g = F[a];
        g != l && (f = !1, c = g == 16);
      }
      let u = !f && l == 1 ? [] : null, d = f ? i : i + 1, p = a;
      e: for (; ; )
        if (h < r.length && p == r[h].from) {
          if (c)
            break e;
          let g = r[h];
          if (!f)
            for (let m = g.to, y = h + 1; ; ) {
              if (m == t)
                break e;
              if (y < r.length && r[y].from == m)
                m = r[y++].to;
              else {
                if (F[m] == l)
                  break e;
                break;
              }
            }
          if (h++, u)
            u.push(g);
          else {
            g.from > a && o.push(new He(a, g.from, d));
            let m = g.direction == wt != !(d % 2);
            Ms(s, m ? i + 1 : i, n, g.inner, g.from, g.to, o), a = g.to;
          }
          p = g.to;
        } else {
          if (p == t || (f ? F[p] != l : F[p] == l))
            break;
          p++;
        }
      u ? As(s, a, p, i + 1, n, u, o) : a < p && o.push(new He(a, p, d)), a = p;
    }
  else
    for (let a = t, h = r.length; a > e; ) {
      let f = !0, c = !1;
      if (!h || a > r[h - 1].to) {
        let g = F[a - 1];
        g != l && (f = !1, c = g == 16);
      }
      let u = !f && l == 1 ? [] : null, d = f ? i : i + 1, p = a;
      e: for (; ; )
        if (h && p == r[h - 1].to) {
          if (c)
            break e;
          let g = r[--h];
          if (!f)
            for (let m = g.from, y = h; ; ) {
              if (m == e)
                break e;
              if (y && r[y - 1].to == m)
                m = r[--y].from;
              else {
                if (F[m - 1] == l)
                  break e;
                break;
              }
            }
          if (u)
            u.push(g);
          else {
            g.to < a && o.push(new He(g.to, a, d));
            let m = g.direction == wt != !(d % 2);
            Ms(s, m ? i + 1 : i, n, g.inner, g.from, g.to, o), a = g.from;
          }
          p = g.from;
        } else {
          if (p == e || (f ? F[p - 1] != l : F[p - 1] == l))
            break;
          p--;
        }
      u ? As(s, p, a, i + 1, n, u, o) : p < a && o.push(new He(p, a, d)), a = p;
    }
}
function Ms(s, e, t, i, n, r, o) {
  let l = e % 2 ? 2 : 1;
  df(s, n, r, i, l), pf(s, n, r, i, l), gf(n, r, i, l), As(s, n, r, e, t, i, o);
}
function mf(s, e, t) {
  if (!s)
    return [new He(0, 0, e == er ? 1 : 0)];
  if (e == wt && !t.length && !uf.test(s))
    return Al(s.length);
  if (t.length)
    for (; s.length > F.length; )
      F[F.length] = 256;
  let i = [], n = e == wt ? 0 : 1;
  return Ms(s, n, n, t, 0, s.length, i), i;
}
function Al(s) {
  return [new He(0, s, 0)];
}
let Ml = "";
function yf(s, e, t, i, n) {
  var r;
  let o = i.head - s.from, l = He.find(e, o, (r = i.bidiLevel) !== null && r !== void 0 ? r : -1, i.assoc), a = e[l], h = a.side(n, t);
  if (o == h) {
    let u = l += n ? 1 : -1;
    if (u < 0 || u >= e.length)
      return null;
    a = e[l = u], o = a.side(!n, t), h = a.side(n, t);
  }
  let f = ee(s.text, o, a.forward(n, t));
  (f < a.from || f > a.to) && (f = h), Ml = s.text.slice(Math.min(o, f), Math.max(o, f));
  let c = l == (n ? e.length - 1 : 0) ? null : e[l + (n ? 1 : -1)];
  return c && f == h && c.level + (n ? 0 : 1) < a.level ? x.cursor(c.side(!n, t) + s.from, c.forward(n, t) ? 1 : -1, c.level) : x.cursor(f + s.from, a.forward(n, t) ? -1 : 1, a.level);
}
function xf(s, e, t) {
  for (let i = e; i < t; i++) {
    let n = vl(s.charCodeAt(i));
    if (n == 1)
      return wt;
    if (n == 2 || n == 4)
      return er;
  }
  return wt;
}
const Dl = /* @__PURE__ */ v.define(), Tl = /* @__PURE__ */ v.define(), Ol = /* @__PURE__ */ v.define(), Bl = /* @__PURE__ */ v.define(), Ds = /* @__PURE__ */ v.define(), El = /* @__PURE__ */ v.define(), Ll = /* @__PURE__ */ v.define(), tr = /* @__PURE__ */ v.define(), ir = /* @__PURE__ */ v.define(), Pl = /* @__PURE__ */ v.define({
  combine: (s) => s.some((e) => e)
}), bf = /* @__PURE__ */ v.define({
  combine: (s) => s.some((e) => e)
}), Rl = /* @__PURE__ */ v.define();
class Pt {
  constructor(e, t, i, n, r, o = !1) {
    this.range = e, this.y = t, this.x = i, this.yMargin = n, this.xMargin = r, this.isSnapshot = o;
  }
  map(e) {
    return e.empty ? this : new Pt(this.range.map(e), this.y, this.x, this.yMargin, this.xMargin, this.isSnapshot);
  }
  clip(e) {
    return this.range.to <= e.doc.length ? this : new Pt(x.cursor(e.doc.length), this.y, this.x, this.yMargin, this.xMargin, this.isSnapshot);
  }
}
const Ti = /* @__PURE__ */ W.define({ map: (s, e) => s.map(e) }), Il = /* @__PURE__ */ W.define();
function Ve(s, e, t) {
  let i = s.facet(Bl);
  i.length ? i[0](e) : window.onerror && window.onerror(String(e), t, void 0, void 0, e) || (t ? console.error(t + ":", e) : console.error(e));
}
const Ue = /* @__PURE__ */ v.define({ combine: (s) => s.length ? s[0] : !0 });
let wf = 0;
const Dt = /* @__PURE__ */ v.define({
  combine(s) {
    return s.filter((e, t) => {
      for (let i = 0; i < t; i++)
        if (s[i].plugin == e.plugin)
          return !1;
      return !0;
    });
  }
});
class ye {
  constructor(e, t, i, n, r) {
    this.id = e, this.create = t, this.domEventHandlers = i, this.domEventObservers = n, this.baseExtensions = r(this), this.extension = this.baseExtensions.concat(Dt.of({ plugin: this, arg: void 0 }));
  }
  /**
  Create an extension for this plugin with the given argument.
  */
  of(e) {
    return this.baseExtensions.concat(Dt.of({ plugin: this, arg: e }));
  }
  /**
  Define a plugin from a constructor function that creates the
  plugin's value, given an editor view.
  */
  static define(e, t) {
    const { eventHandlers: i, eventObservers: n, provide: r, decorations: o } = t || {};
    return new ye(wf++, e, i, n, (l) => {
      let a = [];
      return o && a.push(Cn.of((h) => {
        let f = h.plugin(l);
        return f ? o(f) : B.none;
      })), r && a.push(r(l)), a;
    });
  }
  /**
  Create a plugin for a class whose constructor takes a single
  editor view as argument.
  */
  static fromClass(e, t) {
    return ye.define((i, n) => new e(i, n), t);
  }
}
class Vn {
  constructor(e) {
    this.spec = e, this.mustUpdate = null, this.value = null;
  }
  get plugin() {
    return this.spec && this.spec.plugin;
  }
  update(e) {
    if (this.value) {
      if (this.mustUpdate) {
        let t = this.mustUpdate;
        if (this.mustUpdate = null, this.value.update)
          try {
            this.value.update(t);
          } catch (i) {
            if (Ve(t.state, i, "CodeMirror plugin crashed"), this.value.destroy)
              try {
                this.value.destroy();
              } catch {
              }
            this.deactivate();
          }
      }
    } else if (this.spec)
      try {
        this.value = this.spec.plugin.create(e, this.spec.arg);
      } catch (t) {
        Ve(e.state, t, "CodeMirror plugin crashed"), this.deactivate();
      }
    return this;
  }
  destroy(e) {
    var t;
    if (!((t = this.value) === null || t === void 0) && t.destroy)
      try {
        this.value.destroy();
      } catch (i) {
        Ve(e.state, i, "CodeMirror plugin crashed");
      }
  }
  deactivate() {
    this.spec = this.value = null;
  }
}
const Nl = /* @__PURE__ */ v.define(), nr = /* @__PURE__ */ v.define(), Cn = /* @__PURE__ */ v.define(), Wl = /* @__PURE__ */ v.define(), sr = /* @__PURE__ */ v.define(), bi = /* @__PURE__ */ v.define(), Fl = /* @__PURE__ */ v.define();
function Hr(s, e) {
  let t = s.state.facet(Fl);
  if (!t.length)
    return t;
  let i = t.map((r) => r instanceof Function ? r(s) : r), n = [];
  return L.spans(i, e.from, e.to, {
    point() {
    },
    span(r, o, l, a) {
      let h = r - e.from, f = o - e.from, c = n;
      for (let u = l.length - 1; u >= 0; u--, a--) {
        let d = l[u].spec.bidiIsolate, p;
        if (d == null && (d = xf(e.text, h, f)), a > 0 && c.length && (p = c[c.length - 1]).to == h && p.direction == d)
          p.to = f, c = p.inner;
        else {
          let g = { from: h, to: f, direction: d, inner: [] };
          c.push(g), c = g.inner;
        }
      }
    }
  }), n;
}
const Hl = /* @__PURE__ */ v.define();
function Vl(s) {
  let e = 0, t = 0, i = 0, n = 0;
  for (let r of s.state.facet(Hl)) {
    let o = r(s);
    o && (o.left != null && (e = Math.max(e, o.left)), o.right != null && (t = Math.max(t, o.right)), o.top != null && (i = Math.max(i, o.top)), o.bottom != null && (n = Math.max(n, o.bottom)));
  }
  return { left: e, right: t, top: i, bottom: n };
}
const Zt = /* @__PURE__ */ v.define();
class ke {
  constructor(e, t, i, n) {
    this.fromA = e, this.toA = t, this.fromB = i, this.toB = n;
  }
  join(e) {
    return new ke(Math.min(this.fromA, e.fromA), Math.max(this.toA, e.toA), Math.min(this.fromB, e.fromB), Math.max(this.toB, e.toB));
  }
  addToSet(e) {
    let t = e.length, i = this;
    for (; t > 0; t--) {
      let n = e[t - 1];
      if (!(n.fromA > i.toA)) {
        if (n.toA < i.fromA)
          break;
        i = i.join(n), e.splice(t - 1, 1);
      }
    }
    return e.splice(t, 0, i), e;
  }
  // Extend a set to cover all the content in `ranges`, which is a
  // flat array with each pair of numbers representing fromB/toB
  // positions. These pairs are generated in unchanged ranges, so the
  // offset between doc A and doc B is the same for their start and
  // end points.
  static extendWithRanges(e, t) {
    if (t.length == 0)
      return e;
    let i = [];
    for (let n = 0, r = 0, o = 0; ; ) {
      let l = n < e.length ? e[n].fromB : 1e9, a = r < t.length ? t[r] : 1e9, h = Math.min(l, a);
      if (h == 1e9)
        break;
      let f = h + o, c = h, u = f;
      for (; ; )
        if (r < t.length && t[r] <= c) {
          let d = t[r + 1];
          r += 2, c = Math.max(c, d);
          for (let p = n; p < e.length && e[p].fromB <= c; p++)
            o = e[p].toA - e[p].toB;
          u = Math.max(u, d + o);
        } else if (n < e.length && e[n].fromB <= c) {
          let d = e[n++];
          c = Math.max(c, d.toB), u = Math.max(u, d.toA), o = d.toA - d.toB;
        } else
          break;
      i.push(new ke(f, u, h, c));
    }
    return i;
  }
}
class tn {
  constructor(e, t, i) {
    this.view = e, this.state = t, this.transactions = i, this.flags = 0, this.startState = e.state, this.changes = X.empty(this.startState.doc.length);
    for (let r of i)
      this.changes = this.changes.compose(r.changes);
    let n = [];
    this.changes.iterChangedRanges((r, o, l, a) => n.push(new ke(r, o, l, a))), this.changedRanges = n;
  }
  /**
  @internal
  */
  static create(e, t, i) {
    return new tn(e, t, i);
  }
  /**
  Tells you whether the [viewport](https://codemirror.net/6/docs/ref/#view.EditorView.viewport) or
  [visible ranges](https://codemirror.net/6/docs/ref/#view.EditorView.visibleRanges) changed in this
  update.
  */
  get viewportChanged() {
    return (this.flags & 4) > 0;
  }
  /**
  Returns true when
  [`viewportChanged`](https://codemirror.net/6/docs/ref/#view.ViewUpdate.viewportChanged) is true
  and the viewport change is not just the result of mapping it in
  response to document changes.
  */
  get viewportMoved() {
    return (this.flags & 8) > 0;
  }
  /**
  Indicates whether the height of a block element in the editor
  changed in this update.
  */
  get heightChanged() {
    return (this.flags & 2) > 0;
  }
  /**
  Returns true when the document was modified or the size of the
  editor, or elements within the editor, changed.
  */
  get geometryChanged() {
    return this.docChanged || (this.flags & 18) > 0;
  }
  /**
  True when this update indicates a focus change.
  */
  get focusChanged() {
    return (this.flags & 1) > 0;
  }
  /**
  Whether the document changed in this update.
  */
  get docChanged() {
    return !this.changes.empty;
  }
  /**
  Whether the selection was explicitly set in this update.
  */
  get selectionSet() {
    return this.transactions.some((e) => e.selection);
  }
  /**
  @internal
  */
  get empty() {
    return this.flags == 0 && this.transactions.length == 0;
  }
}
const kf = [];
class U {
  constructor(e, t, i = 0) {
    this.dom = e, this.length = t, this.flags = i, this.parent = null, e.cmTile = this;
  }
  get breakAfter() {
    return this.flags & 1;
  }
  get children() {
    return kf;
  }
  isWidget() {
    return !1;
  }
  get isHidden() {
    return !1;
  }
  isComposite() {
    return !1;
  }
  isLine() {
    return !1;
  }
  isText() {
    return !1;
  }
  isBlock() {
    return !1;
  }
  get domAttrs() {
    return null;
  }
  sync(e) {
    if (this.flags |= 2, this.flags & 4) {
      this.flags &= -5;
      let t = this.domAttrs;
      t && tf(this.dom, t);
    }
  }
  toString() {
    return this.constructor.name + (this.children.length ? `(${this.children})` : "") + (this.breakAfter ? "#" : "");
  }
  destroy() {
    this.parent = null;
  }
  setDOM(e) {
    this.dom = e, e.cmTile = this;
  }
  get posAtStart() {
    return this.parent ? this.parent.posBefore(this) : 0;
  }
  get posAtEnd() {
    return this.posAtStart + this.length;
  }
  posBefore(e, t = this.posAtStart) {
    let i = t;
    for (let n of this.children) {
      if (n == e)
        return i;
      i += n.length + n.breakAfter;
    }
    throw new RangeError("Invalid child in posBefore");
  }
  posAfter(e) {
    return this.posBefore(e) + e.length;
  }
  covers(e) {
    return !0;
  }
  coordsIn(e, t) {
    return null;
  }
  domPosFor(e, t) {
    let i = rt(this.dom), n = this.length ? e > 0 : t > 0;
    return new Me(this.parent.dom, i + (n ? 1 : 0), e == 0 || e == this.length);
  }
  markDirty(e) {
    this.flags &= -3, e && (this.flags |= 4), this.parent && this.parent.flags & 2 && this.parent.markDirty(!1);
  }
  get overrideDOMText() {
    return null;
  }
  get root() {
    for (let e = this; e; e = e.parent)
      if (e instanceof Mn)
        return e;
    return null;
  }
  static get(e) {
    return e.cmTile;
  }
}
class An extends U {
  constructor(e) {
    super(e, 0), this._children = [];
  }
  isComposite() {
    return !0;
  }
  get children() {
    return this._children;
  }
  get lastChild() {
    return this.children.length ? this.children[this.children.length - 1] : null;
  }
  append(e) {
    this.children.push(e), e.parent = this;
  }
  sync(e) {
    if (this.flags & 2)
      return;
    super.sync(e);
    let t = this.dom, i = null, n, r = e?.node == t ? e : null, o = 0;
    for (let l of this.children) {
      if (l.sync(e), o += l.length + l.breakAfter, n = i ? i.nextSibling : t.firstChild, r && n != l.dom && (r.written = !0), l.dom.parentNode == t)
        for (; n && n != l.dom; )
          n = Vr(n);
      else
        t.insertBefore(l.dom, n);
      i = l.dom;
    }
    for (n = i ? i.nextSibling : t.firstChild, r && n && (r.written = !0); n; )
      n = Vr(n);
    this.length = o;
  }
}
function Vr(s) {
  let e = s.nextSibling;
  return s.parentNode.removeChild(s), e;
}
class Mn extends An {
  constructor(e, t) {
    super(t), this.view = e;
  }
  owns(e) {
    for (; e; e = e.parent)
      if (e == this)
        return !0;
    return !1;
  }
  isBlock() {
    return !0;
  }
  nearest(e) {
    for (; ; ) {
      if (!e)
        return null;
      let t = U.get(e);
      if (t && this.owns(t))
        return t;
      e = e.parentNode;
    }
  }
  blockTiles(e) {
    for (let t = [], i = this, n = 0, r = 0; ; )
      if (n == i.children.length) {
        if (!t.length)
          return;
        i = i.parent, i.breakAfter && r++, n = t.pop();
      } else {
        let o = i.children[n++];
        if (o instanceof Ge)
          t.push(n), i = o, n = 0;
        else {
          let l = r + o.length, a = e(o, r);
          if (a !== void 0)
            return a;
          r = l + o.breakAfter;
        }
      }
  }
  // Find the block at the given position. If side < -1, make sure to
  // stay before block widgets at that position, if side > 1, after
  // such widgets (used for selection drawing, which needs to be able
  // to get coordinates for positions that aren't valid cursor positions).
  resolveBlock(e, t) {
    let i, n = -1, r, o = -1;
    if (this.blockTiles((l, a) => {
      let h = a + l.length;
      if (e >= a && e <= h) {
        if (l.isWidget() && t >= -1 && t <= 1) {
          if (l.flags & 32)
            return !0;
          l.flags & 16 && (i = void 0);
        }
        (a < e || e == h && (t < -1 ? l.length : l.covers(1))) && (!i || !l.isWidget() && i.isWidget()) && (i = l, n = e - a), (h > e || e == a && (t > 1 ? l.length : l.covers(-1))) && (!r || !l.isWidget() && r.isWidget()) && (r = l, o = e - a);
      }
    }), !i && !r)
      throw new Error("No tile at position " + e);
    return i && t < 0 || !r ? { tile: i, offset: n } : { tile: r, offset: o };
  }
}
class Ge extends An {
  constructor(e, t) {
    super(e), this.wrapper = t;
  }
  isBlock() {
    return !0;
  }
  covers(e) {
    return this.children.length ? e < 0 ? this.children[0].covers(-1) : this.lastChild.covers(1) : !1;
  }
  get domAttrs() {
    return this.wrapper.attributes;
  }
  static of(e, t) {
    let i = new Ge(t || document.createElement(e.tagName), e);
    return t || (i.flags |= 4), i;
  }
}
class Ft extends An {
  constructor(e, t) {
    super(e), this.attrs = t;
  }
  isLine() {
    return !0;
  }
  static start(e, t, i) {
    let n = new Ft(t || document.createElement("div"), e);
    return (!t || !i) && (n.flags |= 4), n;
  }
  get domAttrs() {
    return this.attrs;
  }
  // Find the tile associated with a given position in this line.
  resolveInline(e, t, i) {
    let n = null, r = -1, o = null, l = -1;
    function a(f, c) {
      for (let u = 0, d = 0; u < f.children.length && d <= c; u++) {
        let p = f.children[u], g = d + p.length;
        g >= c && (p.isComposite() ? a(p, c - d) : (!o || o.isHidden && (t > 0 || i && vf(o, p))) && (g > c || p.flags & 32) ? (o = p, l = c - d) : (d < c || p.flags & 16 && !p.isHidden) && (n = p, r = c - d)), d = g;
      }
    }
    a(this, e);
    let h = (t < 0 ? n : o) || n || o;
    return h ? { tile: h, offset: h == n ? r : l } : null;
  }
  coordsIn(e, t) {
    let i = this.resolveInline(e, t, !0);
    return i ? i.tile.coordsIn(Math.max(0, i.offset), t) : Sf(this);
  }
  domIn(e, t) {
    let i = this.resolveInline(e, t);
    if (i) {
      let { tile: n, offset: r } = i;
      if (this.dom.contains(n.dom))
        return n.isText() ? new Me(n.dom, Math.min(n.dom.nodeValue.length, r)) : n.domPosFor(r, n.flags & 16 ? 1 : n.flags & 32 ? -1 : t);
      let o = i.tile.parent, l = !1;
      for (let a of o.children) {
        if (l)
          return new Me(a.dom, 0);
        a == i.tile && (l = !0);
      }
    }
    return new Me(this.dom, 0);
  }
}
function Sf(s) {
  let e = s.dom.lastChild;
  if (!e)
    return s.dom.getBoundingClientRect();
  let t = Ui(e);
  return t[t.length - 1] || null;
}
function vf(s, e) {
  let t = s.coordsIn(0, 1), i = e.coordsIn(0, 1);
  return t && i && i.top < t.bottom;
}
class he extends An {
  constructor(e, t) {
    super(e), this.mark = t;
  }
  get domAttrs() {
    return this.mark.attrs;
  }
  static of(e, t) {
    let i = new he(t || document.createElement(e.tagName), e);
    return t || (i.flags |= 4), i;
  }
}
class mt extends U {
  constructor(e, t) {
    super(e, t.length), this.text = t;
  }
  sync(e) {
    this.flags & 2 || (super.sync(e), this.dom.nodeValue != this.text && (e && e.node == this.dom && (e.written = !0), this.dom.nodeValue = this.text));
  }
  isText() {
    return !0;
  }
  toString() {
    return JSON.stringify(this.text);
  }
  coordsIn(e, t) {
    let i = this.dom.nodeValue.length;
    e > i && (e = i);
    let n = e, r = e, o = 0;
    e == 0 && t < 0 || e == i && t >= 0 ? S.chrome || S.gecko || (e ? (n--, o = 1) : r < i && (r++, o = -1)) : t < 0 ? n-- : r < i && r++;
    let l = ui(this.dom, n, r).getClientRects();
    if (!l.length)
      return null;
    let a = l[(o ? o < 0 : t >= 0) ? 0 : l.length - 1];
    return S.safari && !o && a.width == 0 && (a = Array.prototype.find.call(l, (h) => h.width) || a), o ? en(a, o < 0) : a || null;
  }
  static of(e, t) {
    let i = new mt(t || document.createTextNode(e), e);
    return t || (i.flags |= 2), i;
  }
}
class kt extends U {
  constructor(e, t, i, n) {
    super(e, t, n), this.widget = i;
  }
  isWidget() {
    return !0;
  }
  get isHidden() {
    return this.widget.isHidden;
  }
  covers(e) {
    return this.flags & 48 ? !1 : (this.flags & (e < 0 ? 64 : 128)) > 0;
  }
  coordsIn(e, t) {
    return this.coordsInWidget(e, t, !1);
  }
  coordsInWidget(e, t, i) {
    let n = this.widget.coordsAt(this.dom, e, t);
    if (n)
      return n;
    if (i)
      return en(this.dom.getBoundingClientRect(), this.length ? e == 0 : t <= 0);
    {
      let r = this.dom.getClientRects(), o = null;
      if (!r.length)
        return null;
      let l = this.flags & 16 ? !0 : this.flags & 32 ? !1 : e > 0;
      for (let a = l ? r.length - 1 : 0; o = r[a], !(e > 0 ? a == 0 : a == r.length - 1 || o.top < o.bottom); a += l ? -1 : 1)
        ;
      return en(o, !l);
    }
  }
  get overrideDOMText() {
    if (!this.length)
      return N.empty;
    let { root: e } = this;
    if (!e)
      return N.empty;
    let t = this.posAtStart;
    return e.view.state.doc.slice(t, t + this.length);
  }
  destroy() {
    super.destroy(), this.widget.destroy(this.dom);
  }
  static of(e, t, i, n, r) {
    return r || (r = e.toDOM(t), e.editable || (r.contentEditable = "false")), new kt(r, i, e, n);
  }
}
class nn extends U {
  constructor(e) {
    let t = document.createElement("img");
    t.className = "cm-widgetBuffer", t.setAttribute("aria-hidden", "true"), super(t, 0, e);
  }
  get isHidden() {
    return !0;
  }
  get overrideDOMText() {
    return N.empty;
  }
  coordsIn(e) {
    return this.dom.getBoundingClientRect();
  }
}
class Cf {
  constructor(e) {
    this.index = 0, this.beforeBreak = !1, this.parents = [], this.tile = e;
  }
  // Advance by the given distance. If side is -1, stop leaving or
  // entering tiles, or skipping zero-length tiles, once the distance
  // has been traversed. When side is 1, leave, enter, or skip
  // everything at the end position.
  advance(e, t, i) {
    let { tile: n, index: r, beforeBreak: o, parents: l } = this;
    for (; e || t > 0; )
      if (n.isComposite())
        if (o) {
          if (!e)
            break;
          i && i.break(), e--, o = !1;
        } else if (r == n.children.length) {
          if (!e && !l.length)
            break;
          i && i.leave(n), o = !!n.breakAfter, { tile: n, index: r } = l.pop(), r++;
        } else {
          let a = n.children[r], h = a.breakAfter;
          (t > 0 ? a.length <= e : a.length < e) && (!i || i.skip(a, 0, a.length) !== !1 || !a.isComposite) ? (o = !!h, r++, e -= a.length) : (l.push({ tile: n, index: r }), n = a, r = 0, i && a.isComposite() && i.enter(a));
        }
      else if (r == n.length)
        o = !!n.breakAfter, { tile: n, index: r } = l.pop(), r++;
      else if (e) {
        let a = Math.min(e, n.length - r);
        i && i.skip(n, r, r + a), e -= a, r += a;
      } else
        break;
    return this.tile = n, this.index = r, this.beforeBreak = o, this;
  }
  get root() {
    return this.parents.length ? this.parents[0].tile : this.tile;
  }
}
class Af {
  constructor(e, t, i, n) {
    this.from = e, this.to = t, this.wrapper = i, this.rank = n;
  }
}
class Mf {
  constructor(e, t, i) {
    this.cache = e, this.root = t, this.blockWrappers = i, this.curLine = null, this.lastBlock = null, this.afterWidget = null, this.pos = 0, this.wrappers = [], this.wrapperPos = 0;
  }
  addText(e, t, i, n) {
    var r;
    this.flushBuffer();
    let o = this.ensureMarks(t, i), l = o.lastChild;
    if (l && l.isText() && !(l.flags & 8) && l.length + e.length < 512) {
      this.cache.reused.set(
        l,
        2
        /* Reused.DOM */
      );
      let a = o.children[o.children.length - 1] = new mt(l.dom, l.text + e);
      a.parent = o;
    } else
      o.append(n || mt.of(e, (r = this.cache.find(mt)) === null || r === void 0 ? void 0 : r.dom));
    this.pos += e.length, this.afterWidget = null;
  }
  addComposition(e, t) {
    let i = this.curLine;
    i.dom != t.line.dom && (i.setDOM(this.cache.reused.has(t.line) ? zn(t.line.dom) : t.line.dom), this.cache.reused.set(
      t.line,
      2
      /* Reused.DOM */
    ));
    let n = i;
    for (let l = t.marks.length - 1; l >= 0; l--) {
      let a = t.marks[l], h = n.lastChild;
      if (h instanceof he && h.mark.eq(a.mark))
        h.dom != a.dom && h.setDOM(zn(a.dom)), n = h;
      else {
        if (this.cache.reused.get(a)) {
          let c = U.get(a.dom);
          c && c.setDOM(zn(a.dom));
        }
        let f = he.of(a.mark, a.dom);
        n.append(f), n = f;
      }
      this.cache.reused.set(
        a,
        2
        /* Reused.DOM */
      );
    }
    let r = U.get(e.text);
    r && this.cache.reused.set(
      r,
      2
      /* Reused.DOM */
    );
    let o = new mt(e.text, e.text.nodeValue);
    o.flags |= 8, this.pos = e.range.toB, n.append(o);
  }
  addInlineWidget(e, t, i) {
    let n = this.afterWidget && e.flags & 48 && (this.afterWidget.flags & 48) == (e.flags & 48);
    n || this.flushBuffer();
    let r = this.ensureMarks(t, i);
    !n && !(e.flags & 16) && r.append(this.getBuffer(1)), r.append(e), this.pos += e.length, this.afterWidget = e;
  }
  addMark(e, t, i) {
    this.flushBuffer(), this.ensureMarks(t, i).append(e), this.pos += e.length, this.afterWidget = null;
  }
  addBlockWidget(e) {
    this.getBlockPos().append(e), this.pos += e.length, this.lastBlock = e, this.endLine();
  }
  continueWidget(e) {
    let t = this.afterWidget || this.lastBlock;
    t.length += e, this.pos += e;
  }
  addLineStart(e, t) {
    var i;
    e || (e = zl);
    let n = Ft.start(e, t || ((i = this.cache.find(Ft)) === null || i === void 0 ? void 0 : i.dom), !!t);
    this.getBlockPos().append(this.lastBlock = this.curLine = n);
  }
  addLine(e) {
    this.getBlockPos().append(e), this.pos += e.length, this.lastBlock = e, this.endLine();
  }
  addBreak() {
    this.lastBlock.flags |= 1, this.endLine(), this.pos++;
  }
  addLineStartIfNotCovered(e) {
    this.blockPosCovered() || this.addLineStart(e);
  }
  ensureLine(e) {
    this.curLine || this.addLineStart(e);
  }
  ensureMarks(e, t) {
    var i;
    let n = this.curLine;
    for (let r = e.length - 1; r >= 0; r--) {
      let o = e[r], l;
      if (t > 0 && (l = n.lastChild) && l instanceof he && l.mark.eq(o))
        n = l, t--;
      else {
        let a = he.of(o, (i = this.cache.find(he, (h) => h.mark.eq(o))) === null || i === void 0 ? void 0 : i.dom);
        n.append(a), n = a, t = 0;
      }
    }
    return n;
  }
  endLine() {
    if (this.curLine) {
      this.flushBuffer();
      let e = this.curLine.lastChild;
      (!e || !zr(this.curLine, !1) || e.dom.nodeName != "BR" && e.isWidget() && !(S.ios && zr(this.curLine, !0))) && this.curLine.append(this.cache.findWidget(
        qn,
        0,
        32
        /* TileFlag.After */
      ) || new kt(
        qn.toDOM(),
        0,
        qn,
        32
        /* TileFlag.After */
      )), this.curLine = this.afterWidget = null;
    }
  }
  updateBlockWrappers() {
    this.wrapperPos > this.pos + 1e4 && (this.blockWrappers.goto(this.pos), this.wrappers.length = 0);
    for (let e = this.wrappers.length - 1; e >= 0; e--)
      this.wrappers[e].to < this.pos && this.wrappers.splice(e, 1);
    for (let e = this.blockWrappers; e.value && e.from <= this.pos; e.next())
      if (e.to >= this.pos) {
        let t = e.rank * 102 + e.value.rank, i = new Af(e.from, e.to, e.value, t), n = this.wrappers.length;
        for (; n > 0 && (this.wrappers[n - 1].rank - i.rank || this.wrappers[n - 1].to - i.to) < 0; )
          n--;
        this.wrappers.splice(n, 0, i);
      }
    this.wrapperPos = this.pos;
  }
  getBlockPos() {
    var e;
    this.updateBlockWrappers();
    let t = this.root;
    for (let i of this.wrappers) {
      let n = t.lastChild;
      if (i.from < this.pos && n instanceof Ge && n.wrapper.eq(i.wrapper))
        t = n;
      else {
        let r = Ge.of(i.wrapper, (e = this.cache.find(Ge, (o) => o.wrapper.eq(i.wrapper))) === null || e === void 0 ? void 0 : e.dom);
        t.append(r), t = r;
      }
    }
    return t;
  }
  blockPosCovered() {
    let e = this.lastBlock;
    return e != null && !e.breakAfter && (!e.isWidget() || (e.flags & 160) > 0);
  }
  getBuffer(e) {
    let t = 2 | (e < 0 ? 16 : 32), i = this.cache.find(
      nn,
      void 0,
      1
      /* Reused.Full */
    );
    return i && (i.flags = t), i || new nn(t);
  }
  flushBuffer() {
    this.afterWidget && !(this.afterWidget.flags & 32) && (this.afterWidget.parent.append(this.getBuffer(-1)), this.afterWidget = null);
  }
}
class Df {
  constructor(e) {
    this.skipCount = 0, this.text = "", this.textOff = 0, this.cursor = e.iter();
  }
  skip(e) {
    this.textOff + e <= this.text.length ? this.textOff += e : (this.skipCount += e - (this.text.length - this.textOff), this.text = "", this.textOff = 0);
  }
  next(e) {
    if (this.textOff == this.text.length) {
      let { value: n, lineBreak: r, done: o } = this.cursor.next(this.skipCount);
      if (this.skipCount = 0, o)
        throw new Error("Ran out of text content when drawing inline views");
      this.text = n;
      let l = this.textOff = Math.min(e, n.length);
      return r ? null : n.slice(0, l);
    }
    let t = Math.min(this.text.length, this.textOff + e), i = this.text.slice(this.textOff, t);
    return this.textOff = t, i;
  }
}
const sn = [kt, Ft, mt, he, nn, Ge, Mn];
for (let s = 0; s < sn.length; s++)
  sn[s].bucket = s;
class Tf {
  constructor(e) {
    this.view = e, this.buckets = sn.map(() => []), this.index = sn.map(() => 0), this.reused = /* @__PURE__ */ new Map();
  }
  // Put a tile in the cache.
  add(e) {
    let t = e.constructor.bucket, i = this.buckets[t];
    i.length < 6 ? i.push(e) : i[
      this.index[t] = (this.index[t] + 1) % 6
      /* C.Bucket */
    ] = e;
  }
  find(e, t, i = 2) {
    let n = e.bucket, r = this.buckets[n], o = this.index[n];
    for (let l = r.length - 1; l >= 0; l--) {
      let a = (l + o) % r.length, h = r[a];
      if ((!t || t(h)) && !this.reused.has(h))
        return r.splice(a, 1), a < o && this.index[n]--, this.reused.set(h, i), h;
    }
    return null;
  }
  findWidget(e, t, i) {
    let n = this.buckets[0];
    if (n.length)
      for (let r = 0, o = 0; ; r++) {
        if (r == n.length) {
          if (o)
            return null;
          o = 1, r = 0;
        }
        let l = n[r];
        if (!this.reused.has(l) && (o == 0 ? l.widget.compare(e) : l.widget.constructor == e.constructor && e.updateDOM(l.dom, this.view, l.widget)))
          return n.splice(r, 1), r < this.index[0] && this.index[0]--, l.widget == e && l.length == t && (l.flags & 497) == i ? (this.reused.set(
            l,
            1
            /* Reused.Full */
          ), l) : (this.reused.set(
            l,
            2
            /* Reused.DOM */
          ), new kt(l.dom, t, e, l.flags & -498 | i));
      }
  }
  reuse(e) {
    return this.reused.set(
      e,
      1
      /* Reused.Full */
    ), e;
  }
  maybeReuse(e, t = 2) {
    if (!this.reused.has(e))
      return this.reused.set(e, t), e.dom;
  }
  clear() {
    for (let e = 0; e < this.buckets.length; e++)
      this.buckets[e].length = this.index[e] = 0;
  }
}
class Of {
  constructor(e, t, i, n, r) {
    this.view = e, this.decorations = n, this.disallowBlockEffectsFor = r, this.openWidget = !1, this.openMarks = 0, this.cache = new Tf(e), this.text = new Df(e.state.doc), this.builder = new Mf(this.cache, new Mn(e, e.contentDOM), L.iter(i)), this.cache.reused.set(
      t,
      2
      /* Reused.DOM */
    ), this.old = new Cf(t), this.reuseWalker = {
      skip: (o, l, a) => {
        if (this.cache.add(o), o.isComposite())
          return !1;
      },
      enter: (o) => this.cache.add(o),
      leave: () => {
      },
      break: () => {
      }
    };
  }
  run(e, t) {
    let i = t && this.getCompositionContext(t.text);
    for (let n = 0, r = 0, o = 0; ; ) {
      let l = o < e.length ? e[o++] : null, a = l ? l.fromA : this.old.root.length;
      if (a > n) {
        let h = a - n;
        this.preserve(h, !o, !l), n = a, r += h;
      }
      if (!l)
        break;
      t && l.fromA <= t.range.fromA && l.toA >= t.range.toA ? (this.forward(l.fromA, t.range.fromA, t.range.fromA < t.range.toA ? 1 : -1), this.emit(r, t.range.fromB), this.cache.clear(), this.builder.addComposition(t, i), this.text.skip(t.range.toB - t.range.fromB), this.forward(t.range.fromA, l.toA), this.emit(t.range.toB, l.toB)) : (this.forward(l.fromA, l.toA), this.emit(r, l.toB)), r = l.toB, n = l.toA;
    }
    return this.builder.curLine && this.builder.endLine(), this.builder.root;
  }
  preserve(e, t, i) {
    let n = Lf(this.old), r = this.openMarks;
    this.old.advance(e, i ? 1 : -1, {
      skip: (o, l, a) => {
        if (o.isWidget())
          if (this.openWidget)
            this.builder.continueWidget(a - l);
          else {
            let h = a > 0 || l < o.length ? kt.of(o.widget, this.view, a - l, o.flags & 496, this.cache.maybeReuse(o)) : this.cache.reuse(o);
            h.flags & 256 ? (h.flags &= -2, this.builder.addBlockWidget(h)) : (this.builder.ensureLine(null), this.builder.addInlineWidget(h, n, r), r = n.length);
          }
        else if (o.isText())
          this.builder.ensureLine(null), !l && a == o.length && !this.cache.reused.has(o) ? this.builder.addText(o.text, n, r, this.cache.reuse(o)) : (this.cache.add(o), this.builder.addText(o.text.slice(l, a), n, r)), r = n.length;
        else if (o.isLine())
          o.flags &= -2, this.cache.reused.set(
            o,
            1
            /* Reused.Full */
          ), this.builder.addLine(o);
        else if (o instanceof nn)
          this.cache.add(o);
        else if (o instanceof he)
          this.builder.ensureLine(null), this.builder.addMark(o, n, r), this.cache.reused.set(
            o,
            1
            /* Reused.Full */
          ), r = n.length;
        else
          return !1;
        this.openWidget = !1;
      },
      enter: (o) => {
        o.isLine() ? this.builder.addLineStart(o.attrs, this.cache.maybeReuse(o)) : (this.cache.add(o), o instanceof he && n.unshift(o.mark)), this.openWidget = !1;
      },
      leave: (o) => {
        o.isLine() ? n.length && (n.length = r = 0) : o instanceof he && (n.shift(), r = Math.min(r, n.length));
      },
      break: () => {
        this.builder.addBreak(), this.openWidget = !1;
      }
    }), this.text.skip(e);
  }
  emit(e, t) {
    let i = null, n = this.builder, r = 0, o = L.spans(this.decorations, e, t, {
      point: (l, a, h, f, c, u) => {
        if (h instanceof bt) {
          if (this.disallowBlockEffectsFor[u]) {
            if (h.block)
              throw new RangeError("Block decorations may not be specified via plugins");
            if (a > this.view.state.doc.lineAt(l).to)
              throw new RangeError("Decorations that replace line breaks may not be specified via plugins");
          }
          if (r = f.length, c > f.length)
            n.continueWidget(a - l);
          else {
            let d = h.widget || (h.block ? Ht.block : Ht.inline), p = Bf(h), g = this.cache.findWidget(d, a - l, p) || kt.of(d, this.view, a - l, p);
            h.block ? (h.startSide > 0 && n.addLineStartIfNotCovered(i), n.addBlockWidget(g)) : (n.ensureLine(i), n.addInlineWidget(g, f, c));
          }
          i = null;
        } else
          i = Ef(i, h);
        a > l && this.text.skip(a - l);
      },
      span: (l, a, h, f) => {
        for (let c = l; c < a; ) {
          let u = this.text.next(Math.min(512, a - c));
          u == null ? (n.addLineStartIfNotCovered(i), n.addBreak(), c++) : (n.ensureLine(i), n.addText(u, h, c == l ? f : h.length), c += u.length), i = null;
        }
      }
    });
    n.addLineStartIfNotCovered(i), this.openWidget = o > r, this.openMarks = o;
  }
  forward(e, t, i = 1) {
    t - e <= 10 ? this.old.advance(t - e, i, this.reuseWalker) : (this.old.advance(5, -1, this.reuseWalker), this.old.advance(t - e - 10, -1), this.old.advance(5, i, this.reuseWalker));
  }
  getCompositionContext(e) {
    let t = [], i = null;
    for (let n = e.parentNode; ; n = n.parentNode) {
      let r = U.get(n);
      if (n == this.view.contentDOM)
        break;
      r instanceof he ? t.push(r) : r?.isLine() ? i = r : r instanceof Ge || (n.nodeName == "DIV" && !i && n != this.view.contentDOM ? i = new Ft(n, zl) : i || t.push(he.of(new yi({ tagName: n.nodeName.toLowerCase(), attributes: nf(n) }), n)));
    }
    return { line: i, marks: t };
  }
}
function zr(s, e) {
  let t = (i) => {
    for (let n of i.children)
      if ((e ? n.isText() : n.length) || t(n))
        return !0;
    return !1;
  };
  return t(s);
}
function Bf(s) {
  let e = s.isReplace ? (s.startSide < 0 ? 64 : 0) | (s.endSide > 0 ? 128 : 0) : s.startSide > 0 ? 32 : 16;
  return s.block && (e |= 256), e;
}
const zl = { class: "cm-line" };
function Ef(s, e) {
  let t = e.spec.attributes, i = e.spec.class;
  return !t && !i || (s || (s = { class: "cm-line" }), t && Qs(t, s), i && (s.class += " " + i)), s;
}
function Lf(s) {
  let e = [];
  for (let t = s.parents.length; t > 1; t--) {
    let i = t == s.parents.length ? s.tile : s.parents[t].tile;
    i instanceof he && e.push(i.mark);
  }
  return e;
}
function zn(s) {
  let e = U.get(s);
  return e && e.setDOM(s.cloneNode()), s;
}
class Ht extends jt {
  constructor(e) {
    super(), this.tag = e;
  }
  eq(e) {
    return e.tag == this.tag;
  }
  toDOM() {
    return document.createElement(this.tag);
  }
  updateDOM(e) {
    return e.nodeName.toLowerCase() == this.tag;
  }
  get isHidden() {
    return !0;
  }
}
Ht.inline = /* @__PURE__ */ new Ht("span");
Ht.block = /* @__PURE__ */ new Ht("div");
const qn = /* @__PURE__ */ new class extends jt {
  toDOM() {
    return document.createElement("br");
  }
  get isHidden() {
    return !0;
  }
  get editable() {
    return !0;
  }
}();
class qr {
  constructor(e) {
    this.view = e, this.decorations = [], this.blockWrappers = [], this.dynamicDecorationMap = [!1], this.domChanged = null, this.hasComposition = null, this.editContextFormatting = B.none, this.lastCompositionAfterCursor = !1, this.minWidth = 0, this.minWidthFrom = 0, this.minWidthTo = 0, this.impreciseAnchor = null, this.impreciseHead = null, this.forceSelection = !1, this.lastUpdate = Date.now(), this.updateDeco(), this.tile = new Mn(e, e.contentDOM), this.updateInner([new ke(0, 0, 0, e.state.doc.length)], null);
  }
  // Update the document view to a given state.
  update(e) {
    var t;
    let i = e.changedRanges;
    this.minWidth > 0 && i.length && (i.every(({ fromA: f, toA: c }) => c < this.minWidthFrom || f > this.minWidthTo) ? (this.minWidthFrom = e.changes.mapPos(this.minWidthFrom, 1), this.minWidthTo = e.changes.mapPos(this.minWidthTo, 1)) : this.minWidth = this.minWidthFrom = this.minWidthTo = 0), this.updateEditContextFormatting(e);
    let n = -1;
    this.view.inputState.composing >= 0 && !this.view.observer.editContext && (!((t = this.domChanged) === null || t === void 0) && t.newSel ? n = this.domChanged.newSel.head : !zf(e.changes, this.hasComposition) && !e.selectionSet && (n = e.state.selection.main.head));
    let r = n > -1 ? Rf(this.view, e.changes, n) : null;
    if (this.domChanged = null, this.hasComposition) {
      let { from: f, to: c } = this.hasComposition;
      i = new ke(f, c, e.changes.mapPos(f, -1), e.changes.mapPos(c, 1)).addToSet(i.slice());
    }
    this.hasComposition = r ? { from: r.range.fromB, to: r.range.toB } : null, (S.ie || S.chrome) && !r && e && e.state.doc.lines != e.startState.doc.lines && (this.forceSelection = !0);
    let o = this.decorations, l = this.blockWrappers;
    this.updateDeco();
    let a = Wf(o, this.decorations, e.changes);
    a.length && (i = ke.extendWithRanges(i, a));
    let h = Hf(l, this.blockWrappers, e.changes);
    return h.length && (i = ke.extendWithRanges(i, h)), r && !i.some((f) => f.fromA <= r.range.fromA && f.toA >= r.range.toA) && (i = r.range.addToSet(i.slice())), this.tile.flags & 2 && i.length == 0 ? !1 : (this.updateInner(i, r), e.transactions.length && (this.lastUpdate = Date.now()), !0);
  }
  // Used by update and the constructor do perform the actual DOM
  // update
  updateInner(e, t) {
    this.view.viewState.mustMeasureContent = !0;
    let { observer: i } = this.view;
    i.ignore(() => {
      if (t || e.length) {
        let o = this.tile, l = new Of(this.view, o, this.blockWrappers, this.decorations, this.dynamicDecorationMap);
        t && U.get(t.text) && l.cache.reused.set(
          U.get(t.text),
          2
          /* Reused.DOM */
        ), this.tile = l.run(e, t), Ts(o, l.cache.reused);
      }
      this.tile.dom.style.height = this.view.viewState.contentHeight / this.view.scaleY + "px", this.tile.dom.style.flexBasis = this.minWidth ? this.minWidth + "px" : "";
      let r = S.chrome || S.ios ? { node: i.selectionRange.focusNode, written: !1 } : void 0;
      this.tile.sync(r), r && (r.written || i.selectionRange.focusNode != r.node || !this.tile.dom.contains(r.node)) && (this.forceSelection = !0), this.tile.dom.style.height = "";
    });
    let n = [];
    if (this.view.viewport.from || this.view.viewport.to < this.view.state.doc.length)
      for (let r of this.tile.children)
        r.isWidget() && r.widget instanceof Kn && n.push(r.dom);
    i.updateGaps(n);
  }
  updateEditContextFormatting(e) {
    this.editContextFormatting = this.editContextFormatting.map(e.changes);
    for (let t of e.transactions)
      for (let i of t.effects)
        i.is(Il) && (this.editContextFormatting = i.value);
  }
  // Sync the DOM selection to this.state.selection
  updateSelection(e = !1, t = !1) {
    (e || !this.view.observer.selectionRange.focusNode) && this.view.observer.readSelectionRange();
    let { dom: i } = this.tile, n = this.view.root.activeElement, r = n == i, o = !r && !(this.view.state.facet(Ue) || i.tabIndex > -1) && ni(i, this.view.observer.selectionRange) && !(n && i.contains(n));
    if (!(r || t || o))
      return;
    let l = this.forceSelection;
    this.forceSelection = !1;
    let a = this.view.state.selection.main, h, f;
    if (a.empty ? f = h = this.inlineDOMNearPos(a.anchor, a.assoc || 1) : (f = this.inlineDOMNearPos(a.head, a.head == a.from ? 1 : -1), h = this.inlineDOMNearPos(a.anchor, a.anchor == a.from ? 1 : -1)), S.gecko && a.empty && !this.hasComposition && Pf(h)) {
      let u = document.createTextNode("");
      this.view.observer.ignore(() => h.node.insertBefore(u, h.node.childNodes[h.offset] || null)), h = f = new Me(u, 0), l = !0;
    }
    let c = this.view.observer.selectionRange;
    (l || !c.focusNode || (!si(h.node, h.offset, c.anchorNode, c.anchorOffset) || !si(f.node, f.offset, c.focusNode, c.focusOffset)) && !this.suppressWidgetCursorChange(c, a)) && (this.view.observer.ignore(() => {
      S.android && S.chrome && i.contains(c.focusNode) && Vf(c.focusNode, i) && (i.blur(), i.focus({ preventScroll: !0 }));
      let u = ci(this.view.root);
      if (u) if (a.empty) {
        if (S.gecko) {
          let d = If(h.node, h.offset);
          if (d && d != 3) {
            let p = (d == 1 ? wl : kl)(h.node, h.offset);
            p && (h = new Me(p.node, p.offset));
          }
        }
        u.collapse(h.node, h.offset), a.bidiLevel != null && u.caretBidiLevel !== void 0 && (u.caretBidiLevel = a.bidiLevel);
      } else if (u.extend) {
        u.collapse(h.node, h.offset);
        try {
          u.extend(f.node, f.offset);
        } catch {
        }
      } else {
        let d = document.createRange();
        a.anchor > a.head && ([h, f] = [f, h]), d.setEnd(f.node, f.offset), d.setStart(h.node, h.offset), u.removeAllRanges(), u.addRange(d);
      }
      o && this.view.root.activeElement == i && (i.blur(), n && n.focus());
    }), this.view.observer.setSelectionRange(h, f)), this.impreciseAnchor = h.precise ? null : new Me(c.anchorNode, c.anchorOffset), this.impreciseHead = f.precise ? null : new Me(c.focusNode, c.focusOffset);
  }
  // If a zero-length widget is inserted next to the cursor during
  // composition, avoid moving it across it and disrupting the
  // composition.
  suppressWidgetCursorChange(e, t) {
    return this.hasComposition && t.empty && si(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset) && this.posFromDOM(e.focusNode, e.focusOffset) == t.head;
  }
  enforceCursorAssoc() {
    if (this.hasComposition)
      return;
    let { view: e } = this, t = e.state.selection.main, i = ci(e.root), { anchorNode: n, anchorOffset: r } = e.observer.selectionRange;
    if (!i || !t.empty || !t.assoc || !i.modify)
      return;
    let o = this.lineAt(t.head, t.assoc);
    if (!o)
      return;
    let l = o.posAtStart;
    if (t.head == l || t.head == l + o.length)
      return;
    let a = this.coordsAt(t.head, -1), h = this.coordsAt(t.head, 1);
    if (!a || !h || a.bottom > h.top)
      return;
    let f = this.domAtPos(t.head + t.assoc, t.assoc);
    i.collapse(f.node, f.offset), i.modify("move", t.assoc < 0 ? "forward" : "backward", "lineboundary"), e.observer.readSelectionRange();
    let c = e.observer.selectionRange;
    e.docView.posFromDOM(c.anchorNode, c.anchorOffset) != t.from && i.collapse(n, r);
  }
  posFromDOM(e, t) {
    let i = this.tile.nearest(e);
    if (!i)
      return this.tile.dom.compareDocumentPosition(e) & 2 ? 0 : this.view.state.doc.length;
    let n = i.posAtStart;
    if (i.isComposite()) {
      let r;
      if (e == i.dom)
        r = i.dom.childNodes[t];
      else {
        let o = Je(e) == 0 ? 0 : t == 0 ? -1 : 1;
        for (; ; ) {
          let l = e.parentNode;
          if (l == i.dom)
            break;
          o == 0 && l.firstChild != l.lastChild && (e == l.firstChild ? o = -1 : o = 1), e = l;
        }
        o < 0 ? r = e : r = e.nextSibling;
      }
      if (r == i.dom.firstChild)
        return n;
      for (; r && !U.get(r); )
        r = r.nextSibling;
      if (!r)
        return n + i.length;
      for (let o = 0, l = n; ; o++) {
        let a = i.children[o];
        if (a.dom == r)
          return l;
        l += a.length + a.breakAfter;
      }
    } else return i.isText() ? e == i.dom ? n + t : n + (t ? i.length : 0) : n;
  }
  domAtPos(e, t) {
    let { tile: i, offset: n } = this.tile.resolveBlock(e, t);
    return i.isWidget() ? i.domPosFor(e, t) : i.domIn(n, t);
  }
  inlineDOMNearPos(e, t) {
    let i, n = -1, r = !1, o, l = -1, a = !1;
    return this.tile.blockTiles((h, f) => {
      if (h.isWidget()) {
        if (h.flags & 32 && f >= e)
          return !0;
        h.flags & 16 && (r = !0);
      } else {
        let c = f + h.length;
        if (f <= e && (i = h, n = e - f, r = c < e), c >= e && !o && (o = h, l = e - f, a = f > e), f > e && o)
          return !0;
      }
    }), !i && !o ? this.domAtPos(e, t) : (r && o ? i = null : a && i && (o = null), i && t < 0 || !o ? i.domIn(n, t) : o.domIn(l, t));
  }
  coordsAt(e, t) {
    let { tile: i, offset: n } = this.tile.resolveBlock(e, t);
    return i.isWidget() ? i.widget instanceof Kn ? null : i.coordsInWidget(n, t, !0) : i.coordsIn(n, t);
  }
  lineAt(e, t) {
    let { tile: i } = this.tile.resolveBlock(e, t);
    return i.isLine() ? i : null;
  }
  coordsForChar(e) {
    let { tile: t, offset: i } = this.tile.resolveBlock(e, 1);
    if (!t.isLine())
      return null;
    function n(r, o) {
      if (r.isComposite())
        for (let l of r.children) {
          if (l.length >= o) {
            let a = n(l, o);
            if (a)
              return a;
          }
          if (o -= l.length, o < 0)
            break;
        }
      else if (r.isText() && o < r.length) {
        let l = ee(r.text, o);
        if (l == o)
          return null;
        let a = ui(r.dom, o, l).getClientRects();
        for (let h = 0; h < a.length; h++) {
          let f = a[h];
          if (h == a.length - 1 || f.top < f.bottom && f.left < f.right)
            return f;
        }
      }
      return null;
    }
    return n(t, i);
  }
  measureVisibleLineHeights(e) {
    let t = [], { from: i, to: n } = e, r = this.view.contentDOM.clientWidth, o = r > Math.max(this.view.scrollDOM.clientWidth, this.minWidth) + 1, l = -1, a = this.view.textDirection == J.LTR, h = 0, f = (c, u, d) => {
      for (let p = 0; p < c.children.length && !(u > n); p++) {
        let g = c.children[p], m = u + g.length, y = g.dom.getBoundingClientRect(), { height: b } = y;
        if (d && !p && (h += y.top - d.top), g instanceof Ge)
          m > i && f(g, u, y);
        else if (u >= i && (h > 0 && t.push(-h), t.push(b + h), h = 0, o)) {
          let C = g.dom.lastChild, P = C ? Ui(C) : [];
          if (P.length) {
            let D = P[P.length - 1], T = a ? D.right - y.left : y.right - D.left;
            T > l && (l = T, this.minWidth = r, this.minWidthFrom = u, this.minWidthTo = m);
          }
        }
        d && p == c.children.length - 1 && (h += d.bottom - y.bottom), u = m + g.breakAfter;
      }
    };
    return f(this.tile, 0, null), t;
  }
  textDirectionAt(e) {
    let { tile: t } = this.tile.resolveBlock(e, 1);
    return getComputedStyle(t.dom).direction == "rtl" ? J.RTL : J.LTR;
  }
  measureTextSize() {
    let e = this.tile.blockTiles((o) => {
      if (o.isLine() && o.children.length && o.length <= 20) {
        let l = 0, a;
        for (let h of o.children) {
          if (!h.isText() || /[^ -~]/.test(h.text))
            return;
          let f = Ui(h.dom);
          if (f.length != 1)
            return;
          l += f[0].width, a = f[0].height;
        }
        if (l)
          return {
            lineHeight: o.dom.getBoundingClientRect().height,
            charWidth: l / o.length,
            textHeight: a
          };
      }
    });
    if (e)
      return e;
    let t = document.createElement("div"), i, n, r;
    return t.className = "cm-line", t.style.width = "99999px", t.style.position = "absolute", t.textContent = "abc def ghi jkl mno pqr stu", this.view.observer.ignore(() => {
      this.tile.dom.appendChild(t);
      let o = Ui(t.firstChild)[0];
      i = t.getBoundingClientRect().height, n = o && o.width ? o.width / 27 : 7, r = o && o.height ? o.height : i, t.remove();
    }), { lineHeight: i, charWidth: n, textHeight: r };
  }
  computeBlockGapDeco() {
    let e = [], t = this.view.viewState;
    for (let i = 0, n = 0; ; n++) {
      let r = n == t.viewports.length ? null : t.viewports[n], o = r ? r.from - 1 : this.view.state.doc.length;
      if (o > i) {
        let l = (t.lineBlockAt(o).bottom - t.lineBlockAt(i).top) / this.view.scaleY;
        e.push(B.replace({
          widget: new Kn(l),
          block: !0,
          inclusive: !0,
          isBlockGap: !0
        }).range(i, o));
      }
      if (!r)
        break;
      i = r.to + 1;
    }
    return B.set(e);
  }
  updateDeco() {
    let e = 1, t = this.view.state.facet(Cn).map((r) => (this.dynamicDecorationMap[e++] = typeof r == "function") ? r(this.view) : r), i = !1, n = this.view.state.facet(sr).map((r, o) => {
      let l = typeof r == "function";
      return l && (i = !0), l ? r(this.view) : r;
    });
    for (n.length && (this.dynamicDecorationMap[e++] = i, t.push(L.join(n))), this.decorations = [
      this.editContextFormatting,
      ...t,
      this.computeBlockGapDeco(),
      this.view.viewState.lineGapDeco
    ]; e < this.decorations.length; )
      this.dynamicDecorationMap[e++] = !1;
    this.blockWrappers = this.view.state.facet(Wl).map((r) => typeof r == "function" ? r(this.view) : r);
  }
  scrollIntoView(e) {
    var t;
    if (e.isSnapshot) {
      let f = this.view.viewState.lineBlockAt(e.range.head);
      this.view.scrollDOM.scrollTop = f.top - e.yMargin, this.view.scrollDOM.scrollLeft = e.xMargin;
      return;
    }
    for (let f of this.view.state.facet(Rl))
      try {
        if (f(this.view, e.range, e))
          return !0;
      } catch (c) {
        Ve(this.view.state, c, "scroll handler");
      }
    let { range: i } = e, n = this.coordsAt(i.head, (t = i.assoc) !== null && t !== void 0 ? t : i.empty ? 0 : i.head > i.anchor ? -1 : 1), r;
    if (!n)
      return;
    !i.empty && (r = this.coordsAt(i.anchor, i.anchor > i.head ? -1 : 1)) && (n = {
      left: Math.min(n.left, r.left),
      top: Math.min(n.top, r.top),
      right: Math.max(n.right, r.right),
      bottom: Math.max(n.bottom, r.bottom)
    });
    let o = Vl(this.view), l = {
      left: n.left - o.left,
      top: n.top - o.top,
      right: n.right + o.right,
      bottom: n.bottom + o.bottom
    }, { offsetWidth: a, offsetHeight: h } = this.view.scrollDOM;
    if (of(this.view.scrollDOM, l, i.head < i.anchor ? -1 : 1, e.x, e.y, Math.max(Math.min(e.xMargin, a), -a), Math.max(Math.min(e.yMargin, h), -h), this.view.textDirection == J.LTR), window.visualViewport && window.innerHeight - window.visualViewport.height > 1 && (n.top > window.pageYOffset + window.visualViewport.offsetTop + window.visualViewport.height || n.bottom < window.pageYOffset + window.visualViewport.offsetTop)) {
      let f = this.view.docView.lineAt(i.head, 1);
      f && f.dom.scrollIntoView({ block: "nearest" });
    }
  }
  lineHasWidget(e) {
    let t = (i) => i.isWidget() || i.children.some(t);
    return t(this.tile.resolveBlock(e, 1).tile);
  }
  destroy() {
    Ts(this.tile);
  }
}
function Ts(s, e) {
  let t = e?.get(s);
  if (t != 1) {
    t == null && s.destroy();
    for (let i of s.children)
      Ts(i, e);
  }
}
function Pf(s) {
  return s.node.nodeType == 1 && s.node.firstChild && (s.offset == 0 || s.node.childNodes[s.offset - 1].contentEditable == "false") && (s.offset == s.node.childNodes.length || s.node.childNodes[s.offset].contentEditable == "false");
}
function ql(s, e) {
  let t = s.observer.selectionRange;
  if (!t.focusNode)
    return null;
  let i = wl(t.focusNode, t.focusOffset), n = kl(t.focusNode, t.focusOffset), r = i || n;
  if (n && i && n.node != i.node) {
    let l = U.get(n.node);
    if (!l || l.isText() && l.text != n.node.nodeValue)
      r = n;
    else if (s.docView.lastCompositionAfterCursor) {
      let a = U.get(i.node);
      !a || a.isText() && a.text != i.node.nodeValue || (r = n);
    }
  }
  if (s.docView.lastCompositionAfterCursor = r != i, !r)
    return null;
  let o = e - r.offset;
  return { from: o, to: o + r.node.nodeValue.length, node: r.node };
}
function Rf(s, e, t) {
  let i = ql(s, t);
  if (!i)
    return null;
  let { node: n, from: r, to: o } = i, l = n.nodeValue;
  if (/[\n\r]/.test(l) || s.state.doc.sliceString(i.from, i.to) != l)
    return null;
  let a = e.invertedDesc;
  return { range: new ke(a.mapPos(r), a.mapPos(o), r, o), text: n };
}
function If(s, e) {
  return s.nodeType != 1 ? 0 : (e && s.childNodes[e - 1].contentEditable == "false" ? 1 : 0) | (e < s.childNodes.length && s.childNodes[e].contentEditable == "false" ? 2 : 0);
}
let Nf = class {
  constructor() {
    this.changes = [];
  }
  compareRange(e, t) {
    Et(e, t, this.changes);
  }
  comparePoint(e, t) {
    Et(e, t, this.changes);
  }
  boundChange(e) {
    Et(e, e, this.changes);
  }
};
function Wf(s, e, t) {
  let i = new Nf();
  return L.compare(s, e, t, i), i.changes;
}
class Ff {
  constructor() {
    this.changes = [];
  }
  compareRange(e, t) {
    Et(e, t, this.changes);
  }
  comparePoint() {
  }
  boundChange(e) {
    Et(e, e, this.changes);
  }
}
function Hf(s, e, t) {
  let i = new Ff();
  return L.compare(s, e, t, i), i.changes;
}
function Vf(s, e) {
  for (let t = s; t && t != e; t = t.assignedSlot || t.parentNode)
    if (t.nodeType == 1 && t.contentEditable == "false")
      return !0;
  return !1;
}
function zf(s, e) {
  let t = !1;
  return e && s.iterChangedRanges((i, n) => {
    i < e.to && n > e.from && (t = !0);
  }), t;
}
class Kn extends jt {
  constructor(e) {
    super(), this.height = e;
  }
  toDOM() {
    let e = document.createElement("div");
    return e.className = "cm-gap", this.updateDOM(e), e;
  }
  eq(e) {
    return e.height == this.height;
  }
  updateDOM(e) {
    return e.style.height = this.height + "px", !0;
  }
  get editable() {
    return !0;
  }
  get estimatedHeight() {
    return this.height;
  }
  ignoreEvent() {
    return !1;
  }
}
function qf(s, e, t = 1) {
  let i = s.charCategorizer(e), n = s.doc.lineAt(e), r = e - n.from;
  if (n.length == 0)
    return x.cursor(e);
  r == 0 ? t = 1 : r == n.length && (t = -1);
  let o = r, l = r;
  t < 0 ? o = ee(n.text, r, !1) : l = ee(n.text, r);
  let a = i(n.text.slice(o, l));
  for (; o > 0; ) {
    let h = ee(n.text, o, !1);
    if (i(n.text.slice(h, o)) != a)
      break;
    o = h;
  }
  for (; l < n.length; ) {
    let h = ee(n.text, l);
    if (i(n.text.slice(l, h)) != a)
      break;
    l = h;
  }
  return x.range(o + n.from, l + n.from);
}
function Kf(s, e, t, i, n) {
  let r = Math.round((i - e.left) * s.defaultCharacterWidth);
  if (s.lineWrapping && t.height > s.defaultLineHeight * 1.5) {
    let l = s.viewState.heightOracle.textHeight, a = Math.floor((n - t.top - (s.defaultLineHeight - l) * 0.5) / l);
    r += a * s.viewState.heightOracle.lineLength;
  }
  let o = s.state.sliceDoc(t.from, t.to);
  return t.from + Jh(o, r, s.state.tabSize);
}
function jf(s, e, t) {
  let i = s.lineBlockAt(e);
  if (Array.isArray(i.type)) {
    let n;
    for (let r of i.type) {
      if (r.from > e)
        break;
      if (!(r.to < e)) {
        if (r.from < e && r.to > e)
          return r;
        (!n || r.type == ce.Text && (n.type != r.type || (t < 0 ? r.from < e : r.to > e))) && (n = r);
      }
    }
    return n || i;
  }
  return i;
}
function $f(s, e, t, i) {
  let n = jf(s, e.head, e.assoc || -1), r = !i || n.type != ce.Text || !(s.lineWrapping || n.widgetLineBreaks) ? null : s.coordsAtPos(e.assoc < 0 && e.head > n.from ? e.head - 1 : e.head);
  if (r) {
    let o = s.dom.getBoundingClientRect(), l = s.textDirectionAt(n.from), a = s.posAtCoords({
      x: t == (l == J.LTR) ? o.right - 1 : o.left + 1,
      y: (r.top + r.bottom) / 2
    });
    if (a != null)
      return x.cursor(a, t ? -1 : 1);
  }
  return x.cursor(t ? n.to : n.from, t ? -1 : 1);
}
function Kr(s, e, t, i) {
  let n = s.state.doc.lineAt(e.head), r = s.bidiSpans(n), o = s.textDirectionAt(n.from);
  for (let l = e, a = null; ; ) {
    let h = yf(n, r, o, l, t), f = Ml;
    if (!h) {
      if (n.number == (t ? s.state.doc.lines : 1))
        return l;
      f = `
`, n = s.state.doc.line(n.number + (t ? 1 : -1)), r = s.bidiSpans(n), h = s.visualLineSide(n, !t);
    }
    if (a) {
      if (!a(f))
        return l;
    } else {
      if (!i)
        return h;
      a = i(f);
    }
    l = h;
  }
}
function Uf(s, e, t) {
  let i = s.state.charCategorizer(e), n = i(t);
  return (r) => {
    let o = i(r);
    return n == _.Space && (n = o), n == o;
  };
}
function Gf(s, e, t, i) {
  let n = e.head, r = t ? 1 : -1;
  if (n == (t ? s.state.doc.length : 0))
    return x.cursor(n, e.assoc);
  let o = e.goalColumn, l, a = s.contentDOM.getBoundingClientRect(), h = s.coordsAtPos(n, e.assoc || ((e.empty ? t : e.head == e.from) ? 1 : -1)), f = s.documentTop;
  if (h)
    o == null && (o = h.left - a.left), l = r < 0 ? h.top : h.bottom;
  else {
    let p = s.viewState.lineBlockAt(n);
    o == null && (o = Math.min(a.right - a.left, s.defaultCharacterWidth * (n - p.from))), l = (r < 0 ? p.top : p.bottom) + f;
  }
  let c = a.left + o, u = s.viewState.heightOracle.textHeight >> 1, d = i ?? u;
  for (let p = 0; ; p += u) {
    let g = l + (d + p) * r, m = Os(s, { x: c, y: g }, !1, r);
    if (t ? g > a.bottom : g < a.top)
      return x.cursor(m.pos, m.assoc);
    let y = s.coordsAtPos(m.pos, m.assoc), b = y ? (y.top + y.bottom) / 2 : 0;
    if (!y || (t ? b > l : b < l))
      return x.cursor(m.pos, m.assoc, void 0, o);
  }
}
function ri(s, e, t) {
  for (; ; ) {
    let i = 0;
    for (let n of s)
      n.between(e - 1, e + 1, (r, o, l) => {
        if (e > r && e < o) {
          let a = i || t || (e - r < o - e ? -1 : 1);
          e = a < 0 ? r : o, i = a;
        }
      });
    if (!i)
      return e;
  }
}
function Kl(s, e) {
  let t = null;
  for (let i = 0; i < e.ranges.length; i++) {
    let n = e.ranges[i], r = null;
    if (n.empty) {
      let o = ri(s, n.from, 0);
      o != n.from && (r = x.cursor(o, -1));
    } else {
      let o = ri(s, n.from, -1), l = ri(s, n.to, 1);
      (o != n.from || l != n.to) && (r = x.range(n.from == n.anchor ? o : l, n.from == n.head ? o : l));
    }
    r && (t || (t = e.ranges.slice()), t[i] = r);
  }
  return t ? x.create(t, e.mainIndex) : e;
}
function jn(s, e, t) {
  let i = ri(s.state.facet(bi).map((n) => n(s)), t.from, e.head > t.from ? -1 : 1);
  return i == t.from ? t : x.cursor(i, i < t.from ? 1 : -1);
}
class Fe {
  constructor(e, t) {
    this.pos = e, this.assoc = t;
  }
}
function Os(s, e, t, i) {
  let n = s.contentDOM.getBoundingClientRect(), r = n.top + s.viewState.paddingTop, { x: o, y: l } = e, a = l - r, h;
  for (; ; ) {
    if (a < 0)
      return new Fe(0, 1);
    if (a > s.viewState.docHeight)
      return new Fe(s.state.doc.length, -1);
    if (h = s.elementAtHeight(a), i == null)
      break;
    if (h.type == ce.Text) {
      if (i < 0 ? h.to < s.viewport.from : h.from > s.viewport.to)
        break;
      let u = s.docView.coordsAt(i < 0 ? h.from : h.to, i > 0 ? -1 : 1);
      if (u && (i < 0 ? u.top <= a + r : u.bottom >= a + r))
        break;
    }
    let c = s.viewState.heightOracle.textHeight / 2;
    a = i > 0 ? h.bottom + c : h.top - c;
  }
  if (s.viewport.from >= h.to || s.viewport.to <= h.from) {
    if (t)
      return null;
    if (h.type == ce.Text) {
      let c = Kf(s, n, h, o, l);
      return new Fe(c, c == h.from ? 1 : -1);
    }
  }
  if (h.type != ce.Text)
    return a < (h.top + h.bottom) / 2 ? new Fe(h.from, 1) : new Fe(h.to, -1);
  let f = s.docView.lineAt(h.from, 2);
  return (!f || f.length != h.length) && (f = s.docView.lineAt(h.from, -2)), new _f(s, o, l, s.textDirectionAt(h.from)).scanTile(f, h.from);
}
class _f {
  constructor(e, t, i, n) {
    this.view = e, this.x = t, this.y = i, this.baseDir = n, this.line = null, this.spans = null;
  }
  bidiSpansAt(e) {
    return (!this.line || this.line.from > e || this.line.to < e) && (this.line = this.view.state.doc.lineAt(e), this.spans = this.view.bidiSpans(this.line)), this;
  }
  baseDirAt(e, t) {
    let { line: i, spans: n } = this.bidiSpansAt(e);
    return n[He.find(n, e - i.from, -1, t)].level == this.baseDir;
  }
  dirAt(e, t) {
    let { line: i, spans: n } = this.bidiSpansAt(e);
    return n[He.find(n, e - i.from, -1, t)].dir;
  }
  // Used to short-circuit bidi tests for content with a uniform direction
  bidiIn(e, t) {
    let { spans: i, line: n } = this.bidiSpansAt(e);
    return i.length > 1 || i.length && (i[0].level != this.baseDir || i[0].to + n.from < t);
  }
  // Scan through the rectangles for the content of a tile with inline
  // content, looking for one that overlaps the queried position
  // vertically andis
  // closest horizontally. The caller is responsible for dividing its
  // content into N pieces, and pass an array with N+1 positions
  // (including the position after the last piece). For a text tile,
  // these will be character clusters, for a composite tile, these
  // will be child tiles.
  scan(e, t, i = !1) {
    let n = 0, r = e.length - 1, o = /* @__PURE__ */ new Set(), l = this.bidiIn(e[0], e[r]), a, h, f = -1, c = 1e9, u;
    e: for (; n < r; ) {
      let p = r - n, g = n + r >> 1;
      t: if (o.has(g)) {
        let y = n + Math.floor(Math.random() * p);
        for (let b = 0; b < p; b++) {
          if (!o.has(y)) {
            g = y;
            break t;
          }
          y++, y == r && (y = n);
        }
        break e;
      }
      o.add(g);
      let m = t(g);
      if (m)
        for (let y = 0; y < m.length; y++) {
          let b = m[y], C = 0;
          if (!(b.width == 0 && m.length > 1)) {
            if (b.bottom < this.y)
              (!a || a.bottom < b.bottom) && (a = b), C = 1;
            else if (b.top > this.y)
              (!h || h.top > b.top) && (h = b), C = -1;
            else {
              let P = b.left > this.x ? this.x - b.left : b.right < this.x ? this.x - b.right : 0, D = Math.abs(P);
              D < c && (f = g, c = D, u = b), P && (C = P < 0 == (this.baseDir == J.LTR) ? -1 : 1);
            }
            C == -1 && (!l || this.baseDirAt(e[g], 1)) ? r = g : C == 1 && (!l || this.baseDirAt(e[g + 1], -1)) && (n = g + 1);
          }
        }
    }
    if (!u) {
      let p = a && (!h || this.y - a.bottom < h.top - this.y) ? a : h;
      return this.y = (p.top + p.bottom) / 2, this.scan(e, t, !0);
    }
    if (c && !i) {
      let { top: p, bottom: g } = u;
      if (a && a.bottom > (p + p + g) / 3)
        return this.y = a.bottom - 1, this.scan(e, t, !0);
      if (h && h.top < (p + g + g) / 3)
        return this.y = h.top + 1, this.scan(e, t, !0);
    }
    let d = (l ? this.dirAt(e[f], 1) : this.baseDir) == J.LTR;
    return {
      i: f,
      // Test whether x is closes to the start or end of this element
      after: this.x > (u.left + u.right) / 2 == d
    };
  }
  scanText(e, t) {
    let i = [];
    for (let r = 0; r < e.length; r = ee(e.text, r))
      i.push(t + r);
    i.push(t + e.length);
    let n = this.scan(i, (r) => {
      let o = i[r] - t, l = i[r + 1] - t;
      return ui(e.dom, o, l).getClientRects();
    });
    return n.after ? new Fe(i[n.i + 1], -1) : new Fe(i[n.i], 1);
  }
  scanTile(e, t) {
    if (!e.length)
      return new Fe(t, 1);
    if (e.children.length == 1) {
      let l = e.children[0];
      if (l.isText())
        return this.scanText(l, t);
      if (l.isComposite())
        return this.scanTile(l, t);
    }
    let i = [t];
    for (let l = 0, a = t; l < e.children.length; l++)
      i.push(a += e.children[l].length);
    let n = this.scan(i, (l) => {
      let a = e.children[l];
      return a.flags & 48 ? null : (a.dom.nodeType == 1 ? a.dom : ui(a.dom, 0, a.length)).getClientRects();
    }), r = e.children[n.i], o = i[n.i];
    return r.isText() ? this.scanText(r, o) : r.isComposite() ? this.scanTile(r, o) : n.after ? new Fe(i[n.i + 1], -1) : new Fe(o, 1);
  }
}
const Ct = "￿";
class Jf {
  constructor(e, t) {
    this.points = e, this.view = t, this.text = "", this.lineSeparator = t.state.facet(I.lineSeparator);
  }
  append(e) {
    this.text += e;
  }
  lineBreak() {
    this.text += Ct;
  }
  readRange(e, t) {
    if (!e)
      return this;
    let i = e.parentNode;
    for (let n = e; ; ) {
      this.findPointBefore(i, n);
      let r = this.text.length;
      this.readNode(n);
      let o = U.get(n), l = n.nextSibling;
      if (l == t) {
        o?.breakAfter && !l && i != this.view.contentDOM && this.lineBreak();
        break;
      }
      let a = U.get(l);
      (o && a ? o.breakAfter : (o ? o.breakAfter : Zi(n)) || Zi(l) && (n.nodeName != "BR" || o?.isWidget()) && this.text.length > r) && !Xf(l, t) && this.lineBreak(), n = l;
    }
    return this.findPointBefore(i, t), this;
  }
  readTextNode(e) {
    let t = e.nodeValue;
    for (let i of this.points)
      i.node == e && (i.pos = this.text.length + Math.min(i.offset, t.length));
    for (let i = 0, n = this.lineSeparator ? null : /\r\n?|\n/g; ; ) {
      let r = -1, o = 1, l;
      if (this.lineSeparator ? (r = t.indexOf(this.lineSeparator, i), o = this.lineSeparator.length) : (l = n.exec(t)) && (r = l.index, o = l[0].length), this.append(t.slice(i, r < 0 ? t.length : r)), r < 0)
        break;
      if (this.lineBreak(), o > 1)
        for (let a of this.points)
          a.node == e && a.pos > this.text.length && (a.pos -= o - 1);
      i = r + o;
    }
  }
  readNode(e) {
    let t = U.get(e), i = t && t.overrideDOMText;
    if (i != null) {
      this.findPointInside(e, i.length);
      for (let n = i.iter(); !n.next().done; )
        n.lineBreak ? this.lineBreak() : this.append(n.value);
    } else e.nodeType == 3 ? this.readTextNode(e) : e.nodeName == "BR" ? e.nextSibling && this.lineBreak() : e.nodeType == 1 && this.readRange(e.firstChild, null);
  }
  findPointBefore(e, t) {
    for (let i of this.points)
      i.node == e && e.childNodes[i.offset] == t && (i.pos = this.text.length);
  }
  findPointInside(e, t) {
    for (let i of this.points)
      (e.nodeType == 3 ? i.node == e : e.contains(i.node)) && (i.pos = this.text.length + (Yf(e, i.node, i.offset) ? t : 0));
  }
}
function Yf(s, e, t) {
  for (; ; ) {
    if (!e || t < Je(e))
      return !1;
    if (e == s)
      return !0;
    t = rt(e) + 1, e = e.parentNode;
  }
}
function Xf(s, e) {
  let t;
  for (; !(s == e || !s); s = s.nextSibling) {
    let i = U.get(s);
    if (!i?.isWidget())
      return !1;
    i && (t || (t = [])).push(i);
  }
  if (t)
    for (let i of t) {
      let n = i.overrideDOMText;
      if (n?.length)
        return !1;
    }
  return !0;
}
class jr {
  constructor(e, t) {
    this.node = e, this.offset = t, this.pos = -1;
  }
}
class Qf {
  constructor(e, t, i, n) {
    this.typeOver = n, this.bounds = null, this.text = "", this.domChanged = t > -1;
    let { impreciseHead: r, impreciseAnchor: o } = e.docView, l = e.state.selection;
    if (e.state.readOnly && t > -1)
      this.newSel = null;
    else if (t > -1 && (this.bounds = jl(e.docView.tile, t, i, 0))) {
      let a = r || o ? [] : ec(e), h = new Jf(a, e);
      h.readRange(this.bounds.startDOM, this.bounds.endDOM), this.text = h.text, this.newSel = tc(a, this.bounds.from);
    } else {
      let a = e.observer.selectionRange, h = r && r.node == a.focusNode && r.offset == a.focusOffset || !vs(e.contentDOM, a.focusNode) ? l.main.head : e.docView.posFromDOM(a.focusNode, a.focusOffset), f = o && o.node == a.anchorNode && o.offset == a.anchorOffset || !vs(e.contentDOM, a.anchorNode) ? l.main.anchor : e.docView.posFromDOM(a.anchorNode, a.anchorOffset), c = e.viewport;
      if ((S.ios || S.chrome) && l.main.empty && h != f && (c.from > 0 || c.to < e.state.doc.length)) {
        let u = Math.min(h, f), d = Math.max(h, f), p = c.from - u, g = c.to - d;
        (p == 0 || p == 1 || u == 0) && (g == 0 || g == -1 || d == e.state.doc.length) && (h = 0, f = e.state.doc.length);
      }
      if (e.inputState.composing > -1 && l.ranges.length > 1)
        this.newSel = l.replaceRange(x.range(f, h));
      else if (e.lineWrapping && f == h && !(l.main.empty && l.main.head == h) && e.inputState.lastTouchTime > Date.now() - 100) {
        let u = e.coordsAtPos(h, -1), d = 0;
        u && (d = e.inputState.lastTouchY <= u.bottom ? -1 : 1), this.newSel = x.create([x.cursor(h, d)]);
      } else
        this.newSel = x.single(f, h);
    }
  }
}
function jl(s, e, t, i) {
  if (s.isComposite()) {
    let n = -1, r = -1, o = -1, l = -1;
    for (let a = 0, h = i, f = i; a < s.children.length; a++) {
      let c = s.children[a], u = h + c.length;
      if (h < e && u > t)
        return jl(c, e, t, h);
      if (u >= e && n == -1 && (n = a, r = h), h > t && c.dom.parentNode == s.dom) {
        o = a, l = f;
        break;
      }
      f = u, h = u + c.breakAfter;
    }
    return {
      from: r,
      to: l < 0 ? i + s.length : l,
      startDOM: (n ? s.children[n - 1].dom.nextSibling : null) || s.dom.firstChild,
      endDOM: o < s.children.length && o >= 0 ? s.children[o].dom : null
    };
  } else return s.isText() ? { from: i, to: i + s.length, startDOM: s.dom, endDOM: s.dom.nextSibling } : null;
}
function $l(s, e) {
  let t, { newSel: i } = e, { state: n } = s, r = n.selection.main, o = s.inputState.lastKeyTime > Date.now() - 100 ? s.inputState.lastKeyCode : -1;
  if (e.bounds) {
    let { from: l, to: a } = e.bounds, h = r.from, f = null;
    (o === 8 || S.android && e.text.length < a - l) && (h = r.to, f = "end");
    let c = n.doc.sliceString(l, a, Ct), u, d;
    !r.empty && r.from >= l && r.to <= a && (e.typeOver || c != e.text) && c.slice(0, r.from - l) == e.text.slice(0, r.from - l) && c.slice(r.to - l) == e.text.slice(u = e.text.length - (c.length - (r.to - l))) ? t = {
      from: r.from,
      to: r.to,
      insert: N.of(e.text.slice(r.from - l, u).split(Ct))
    } : (d = Ul(c, e.text, h - l, f)) && (S.chrome && o == 13 && d.toB == d.from + 2 && e.text.slice(d.from, d.toB) == Ct + Ct && d.toB--, t = {
      from: l + d.from,
      to: l + d.toA,
      insert: N.of(e.text.slice(d.from, d.toB).split(Ct))
    });
  } else i && (!s.hasFocus && n.facet(Ue) || rn(i, r)) && (i = null);
  if (!t && !i)
    return !1;
  if ((S.mac || S.android) && t && t.from == t.to && t.from == r.head - 1 && /^\. ?$/.test(t.insert.toString()) && s.contentDOM.getAttribute("autocorrect") == "off" ? (i && t.insert.length == 2 && (i = x.single(i.main.anchor - 1, i.main.head - 1)), t = { from: t.from, to: t.to, insert: N.of([t.insert.toString().replace(".", " ")]) }) : n.doc.lineAt(r.from).to < r.to && s.docView.lineHasWidget(r.to) && s.inputState.insertingTextAt > Date.now() - 50 ? t = {
    from: r.from,
    to: r.to,
    insert: n.toText(s.inputState.insertingText)
  } : S.chrome && t && t.from == t.to && t.from == r.head && t.insert.toString() == `
 ` && s.lineWrapping && (i && (i = x.single(i.main.anchor - 1, i.main.head - 1)), t = { from: r.from, to: r.to, insert: N.of([" "]) }), t)
    return rr(s, t, i, o);
  if (i && !rn(i, r)) {
    let l = !1, a = "select";
    return s.inputState.lastSelectionTime > Date.now() - 50 && (s.inputState.lastSelectionOrigin == "select" && (l = !0), a = s.inputState.lastSelectionOrigin, a == "select.pointer" && (i = Kl(n.facet(bi).map((h) => h(s)), i))), s.dispatch({ selection: i, scrollIntoView: l, userEvent: a }), !0;
  } else
    return !1;
}
function rr(s, e, t, i = -1) {
  if (S.ios && s.inputState.flushIOSKey(e))
    return !0;
  let n = s.state.selection.main;
  if (S.android && (e.to == n.to && // GBoard will sometimes remove a space it just inserted
  // after a completion when you press enter
  (e.from == n.from || e.from == n.from - 1 && s.state.sliceDoc(e.from, n.from) == " ") && e.insert.length == 1 && e.insert.lines == 2 && Lt(s.contentDOM, "Enter", 13) || (e.from == n.from - 1 && e.to == n.to && e.insert.length == 0 || i == 8 && e.insert.length < e.to - e.from && e.to > n.head) && Lt(s.contentDOM, "Backspace", 8) || e.from == n.from && e.to == n.to + 1 && e.insert.length == 0 && Lt(s.contentDOM, "Delete", 46)))
    return !0;
  let r = e.insert.toString();
  s.inputState.composing >= 0 && s.inputState.composing++;
  let o, l = () => o || (o = Zf(s, e, t));
  return s.state.facet(El).some((a) => a(s, e.from, e.to, r, l)) || s.dispatch(l()), !0;
}
function Zf(s, e, t) {
  let i, n = s.state, r = n.selection.main, o = -1;
  if (e.from == e.to && e.from < r.from || e.from > r.to) {
    let a = e.from < r.from ? -1 : 1, h = a < 0 ? r.from : r.to, f = ri(n.facet(bi).map((c) => c(s)), h, a);
    e.from == f && (o = f);
  }
  if (o > -1)
    i = {
      changes: e,
      selection: x.cursor(e.from + e.insert.length, -1)
    };
  else if (e.from >= r.from && e.to <= r.to && e.to - e.from >= (r.to - r.from) / 3 && (!t || t.main.empty && t.main.from == e.from + e.insert.length) && s.inputState.composing < 0) {
    let a = r.from < e.from ? n.sliceDoc(r.from, e.from) : "", h = r.to > e.to ? n.sliceDoc(e.to, r.to) : "";
    i = n.replaceSelection(s.state.toText(a + e.insert.sliceString(0, void 0, s.state.lineBreak) + h));
  } else {
    let a = n.changes(e), h = t && t.main.to <= a.newLength ? t.main : void 0;
    if (n.selection.ranges.length > 1 && (s.inputState.composing >= 0 || s.inputState.compositionPendingChange) && e.to <= r.to + 10 && e.to >= r.to - 10) {
      let f = s.state.sliceDoc(e.from, e.to), c, u = t && ql(s, t.main.head);
      if (u) {
        let p = e.insert.length - (e.to - e.from);
        c = { from: u.from, to: u.to - p };
      } else
        c = s.state.doc.lineAt(r.head);
      let d = r.to - e.to;
      i = n.changeByRange((p) => {
        if (p.from == r.from && p.to == r.to)
          return { changes: a, range: h || p.map(a) };
        let g = p.to - d, m = g - f.length;
        if (s.state.sliceDoc(m, g) != f || // Unfortunately, there's no way to make multiple
        // changes in the same node work without aborting
        // composition, so cursors in the composition range are
        // ignored.
        g >= c.from && m <= c.to)
          return { range: p };
        let y = n.changes({ from: m, to: g, insert: e.insert }), b = p.to - r.to;
        return {
          changes: y,
          range: h ? x.range(Math.max(0, h.anchor + b), Math.max(0, h.head + b)) : p.map(y)
        };
      });
    } else
      i = {
        changes: a,
        selection: h && n.selection.replaceRange(h)
      };
  }
  let l = "input.type";
  return (s.composing || s.inputState.compositionPendingChange && s.inputState.compositionEndedAt > Date.now() - 50) && (s.inputState.compositionPendingChange = !1, l += ".compose", s.inputState.compositionFirstChange && (l += ".start", s.inputState.compositionFirstChange = !1)), n.update(i, { userEvent: l, scrollIntoView: !0 });
}
function Ul(s, e, t, i) {
  let n = Math.min(s.length, e.length), r = 0;
  for (; r < n && s.charCodeAt(r) == e.charCodeAt(r); )
    r++;
  if (r == n && s.length == e.length)
    return null;
  let o = s.length, l = e.length;
  for (; o > 0 && l > 0 && s.charCodeAt(o - 1) == e.charCodeAt(l - 1); )
    o--, l--;
  if (i == "end") {
    let a = Math.max(0, r - Math.min(o, l));
    t -= o + a - r;
  }
  if (o < r && s.length < e.length) {
    let a = t <= r && t >= o ? r - t : 0;
    r -= a, l = r + (l - o), o = r;
  } else if (l < r) {
    let a = t <= r && t >= l ? r - t : 0;
    r -= a, o = r + (o - l), l = r;
  }
  return { from: r, toA: o, toB: l };
}
function ec(s) {
  let e = [];
  if (s.root.activeElement != s.contentDOM)
    return e;
  let { anchorNode: t, anchorOffset: i, focusNode: n, focusOffset: r } = s.observer.selectionRange;
  return t && (e.push(new jr(t, i)), (n != t || r != i) && e.push(new jr(n, r))), e;
}
function tc(s, e) {
  if (s.length == 0)
    return null;
  let t = s[0].pos, i = s.length == 2 ? s[1].pos : t;
  return t > -1 && i > -1 ? x.single(t + e, i + e) : null;
}
function rn(s, e) {
  return e.head == s.main.head && e.anchor == s.main.anchor;
}
class ic {
  setSelectionOrigin(e) {
    this.lastSelectionOrigin = e, this.lastSelectionTime = Date.now();
  }
  constructor(e) {
    this.view = e, this.lastKeyCode = 0, this.lastKeyTime = 0, this.lastTouchTime = 0, this.lastTouchX = 0, this.lastTouchY = 0, this.lastFocusTime = 0, this.lastScrollTop = 0, this.lastScrollLeft = 0, this.lastWheelEvent = 0, this.pendingIOSKey = void 0, this.tabFocusMode = -1, this.lastSelectionOrigin = null, this.lastSelectionTime = 0, this.lastContextMenu = 0, this.scrollHandlers = [], this.handlers = /* @__PURE__ */ Object.create(null), this.composing = -1, this.compositionFirstChange = null, this.compositionEndedAt = 0, this.compositionPendingKey = !1, this.compositionPendingChange = !1, this.insertingText = "", this.insertingTextAt = 0, this.mouseSelection = null, this.draggedContent = null, this.handleEvent = this.handleEvent.bind(this), this.notifiedFocused = e.hasFocus, S.safari && e.contentDOM.addEventListener("input", () => null), S.gecko && yc(e.contentDOM.ownerDocument);
  }
  handleEvent(e) {
    !fc(this.view, e) || this.ignoreDuringComposition(e) || e.type == "keydown" && this.keydown(e) || (this.view.updateState != 0 ? Promise.resolve().then(() => this.runHandlers(e.type, e)) : this.runHandlers(e.type, e));
  }
  runHandlers(e, t) {
    let i = this.handlers[e];
    if (i) {
      for (let n of i.observers)
        n(this.view, t);
      for (let n of i.handlers) {
        if (t.defaultPrevented)
          break;
        if (n(this.view, t)) {
          t.preventDefault();
          break;
        }
      }
    }
  }
  ensureHandlers(e) {
    let t = nc(e), i = this.handlers, n = this.view.contentDOM;
    for (let r in t)
      if (r != "scroll") {
        let o = !t[r].handlers.length, l = i[r];
        l && o != !l.handlers.length && (n.removeEventListener(r, this.handleEvent), l = null), l || n.addEventListener(r, this.handleEvent, { passive: o });
      }
    for (let r in i)
      r != "scroll" && !t[r] && n.removeEventListener(r, this.handleEvent);
    this.handlers = t;
  }
  keydown(e) {
    if (this.lastKeyCode = e.keyCode, this.lastKeyTime = Date.now(), e.keyCode == 9 && this.tabFocusMode > -1 && (!this.tabFocusMode || Date.now() <= this.tabFocusMode))
      return !0;
    if (this.tabFocusMode > 0 && e.keyCode != 27 && _l.indexOf(e.keyCode) < 0 && (this.tabFocusMode = -1), S.android && S.chrome && !e.synthetic && (e.keyCode == 13 || e.keyCode == 8))
      return this.view.observer.delayAndroidKey(e.key, e.keyCode), !0;
    let t;
    return S.ios && !e.synthetic && !e.altKey && !e.metaKey && !e.shiftKey && ((t = Gl.find((i) => i.keyCode == e.keyCode)) && !e.ctrlKey || sc.indexOf(e.key) > -1 && e.ctrlKey) ? (this.pendingIOSKey = t || e, setTimeout(() => this.flushIOSKey(), 250), !0) : (e.keyCode != 229 && this.view.observer.forceFlush(), !1);
  }
  flushIOSKey(e) {
    let t = this.pendingIOSKey;
    return !t || t.key == "Enter" && e && e.from < e.to && /^\S+$/.test(e.insert.toString()) ? !1 : (this.pendingIOSKey = void 0, Lt(this.view.contentDOM, t.key, t.keyCode, t instanceof KeyboardEvent ? t : void 0));
  }
  ignoreDuringComposition(e) {
    return !/^key/.test(e.type) || e.synthetic ? !1 : this.composing > 0 ? !0 : S.safari && !S.ios && this.compositionPendingKey && Date.now() - this.compositionEndedAt < 100 ? (this.compositionPendingKey = !1, !0) : !1;
  }
  startMouseSelection(e) {
    this.mouseSelection && this.mouseSelection.destroy(), this.mouseSelection = e;
  }
  update(e) {
    this.view.observer.update(e), this.mouseSelection && this.mouseSelection.update(e), this.draggedContent && e.docChanged && (this.draggedContent = this.draggedContent.map(e.changes)), e.transactions.length && (this.lastKeyCode = this.lastSelectionTime = 0);
  }
  destroy() {
    this.mouseSelection && this.mouseSelection.destroy();
  }
}
function $r(s, e) {
  return (t, i) => {
    try {
      return e.call(s, i, t);
    } catch (n) {
      Ve(t.state, n);
    }
  };
}
function nc(s) {
  let e = /* @__PURE__ */ Object.create(null);
  function t(i) {
    return e[i] || (e[i] = { observers: [], handlers: [] });
  }
  for (let i of s) {
    let n = i.spec, r = n && n.plugin.domEventHandlers, o = n && n.plugin.domEventObservers;
    if (r)
      for (let l in r) {
        let a = r[l];
        a && t(l).handlers.push($r(i.value, a));
      }
    if (o)
      for (let l in o) {
        let a = o[l];
        a && t(l).observers.push($r(i.value, a));
      }
  }
  for (let i in Te)
    t(i).handlers.push(Te[i]);
  for (let i in ue)
    t(i).observers.push(ue[i]);
  return e;
}
const Gl = [
  { key: "Backspace", keyCode: 8, inputType: "deleteContentBackward" },
  { key: "Enter", keyCode: 13, inputType: "insertParagraph" },
  { key: "Enter", keyCode: 13, inputType: "insertLineBreak" },
  { key: "Delete", keyCode: 46, inputType: "deleteContentForward" }
], sc = "dthko", _l = [16, 17, 18, 20, 91, 92, 224, 225], Oi = 6;
function Bi(s) {
  return Math.max(0, s) * 0.7 + 8;
}
function rc(s, e) {
  return Math.max(Math.abs(s.clientX - e.clientX), Math.abs(s.clientY - e.clientY));
}
class oc {
  constructor(e, t, i, n) {
    this.view = e, this.startEvent = t, this.style = i, this.mustSelect = n, this.scrollSpeed = { x: 0, y: 0 }, this.scrolling = -1, this.lastEvent = t, this.scrollParents = yl(e.contentDOM), this.atoms = e.state.facet(bi).map((o) => o(e));
    let r = e.contentDOM.ownerDocument;
    r.addEventListener("mousemove", this.move = this.move.bind(this)), r.addEventListener("mouseup", this.up = this.up.bind(this)), this.extend = t.shiftKey, this.multiple = e.state.facet(I.allowMultipleSelections) && lc(e, t), this.dragging = hc(e, t) && Xl(t) == 1 ? null : !1;
  }
  start(e) {
    this.dragging === !1 && this.select(e);
  }
  move(e) {
    if (e.buttons == 0)
      return this.destroy();
    if (this.dragging || this.dragging == null && rc(this.startEvent, e) < 10)
      return;
    this.select(this.lastEvent = e);
    let t = 0, i = 0, n = 0, r = 0, o = this.view.win.innerWidth, l = this.view.win.innerHeight;
    this.scrollParents.x && ({ left: n, right: o } = this.scrollParents.x.getBoundingClientRect()), this.scrollParents.y && ({ top: r, bottom: l } = this.scrollParents.y.getBoundingClientRect());
    let a = Vl(this.view);
    e.clientX - a.left <= n + Oi ? t = -Bi(n - e.clientX) : e.clientX + a.right >= o - Oi && (t = Bi(e.clientX - o)), e.clientY - a.top <= r + Oi ? i = -Bi(r - e.clientY) : e.clientY + a.bottom >= l - Oi && (i = Bi(e.clientY - l)), this.setScrollSpeed(t, i);
  }
  up(e) {
    this.dragging == null && this.select(this.lastEvent), this.dragging || e.preventDefault(), this.destroy();
  }
  destroy() {
    this.setScrollSpeed(0, 0);
    let e = this.view.contentDOM.ownerDocument;
    e.removeEventListener("mousemove", this.move), e.removeEventListener("mouseup", this.up), this.view.inputState.mouseSelection = this.view.inputState.draggedContent = null;
  }
  setScrollSpeed(e, t) {
    this.scrollSpeed = { x: e, y: t }, e || t ? this.scrolling < 0 && (this.scrolling = setInterval(() => this.scroll(), 50)) : this.scrolling > -1 && (clearInterval(this.scrolling), this.scrolling = -1);
  }
  scroll() {
    let { x: e, y: t } = this.scrollSpeed;
    e && this.scrollParents.x && (this.scrollParents.x.scrollLeft += e, e = 0), t && this.scrollParents.y && (this.scrollParents.y.scrollTop += t, t = 0), (e || t) && this.view.win.scrollBy(e, t), this.dragging === !1 && this.select(this.lastEvent);
  }
  select(e) {
    let { view: t } = this, i = Kl(this.atoms, this.style.get(e, this.extend, this.multiple));
    (this.mustSelect || !i.eq(t.state.selection, this.dragging === !1)) && this.view.dispatch({
      selection: i,
      userEvent: "select.pointer"
    }), this.mustSelect = !1;
  }
  update(e) {
    e.transactions.some((t) => t.isUserEvent("input.type")) ? this.destroy() : this.style.update(e) && setTimeout(() => this.select(this.lastEvent), 20);
  }
}
function lc(s, e) {
  let t = s.state.facet(Dl);
  return t.length ? t[0](e) : S.mac ? e.metaKey : e.ctrlKey;
}
function ac(s, e) {
  let t = s.state.facet(Tl);
  return t.length ? t[0](e) : S.mac ? !e.altKey : !e.ctrlKey;
}
function hc(s, e) {
  let { main: t } = s.state.selection;
  if (t.empty)
    return !1;
  let i = ci(s.root);
  if (!i || i.rangeCount == 0)
    return !0;
  let n = i.getRangeAt(0).getClientRects();
  for (let r = 0; r < n.length; r++) {
    let o = n[r];
    if (o.left <= e.clientX && o.right >= e.clientX && o.top <= e.clientY && o.bottom >= e.clientY)
      return !0;
  }
  return !1;
}
function fc(s, e) {
  if (!e.bubbles)
    return !0;
  if (e.defaultPrevented)
    return !1;
  for (let t = e.target, i; t != s.contentDOM; t = t.parentNode)
    if (!t || t.nodeType == 11 || (i = U.get(t)) && i.isWidget() && !i.isHidden && i.widget.ignoreEvent(e))
      return !1;
  return !0;
}
const Te = /* @__PURE__ */ Object.create(null), ue = /* @__PURE__ */ Object.create(null), Jl = S.ie && S.ie_version < 15 || S.ios && S.webkit_version < 604;
function cc(s) {
  let e = s.dom.parentNode;
  if (!e)
    return;
  let t = e.appendChild(document.createElement("textarea"));
  t.style.cssText = "position: fixed; left: -10000px; top: 10px", t.focus(), setTimeout(() => {
    s.focus(), t.remove(), Yl(s, t.value);
  }, 50);
}
function Dn(s, e, t) {
  for (let i of s.facet(e))
    t = i(t, s);
  return t;
}
function Yl(s, e) {
  e = Dn(s.state, tr, e);
  let { state: t } = s, i, n = 1, r = t.toText(e), o = r.lines == t.selection.ranges.length;
  if (Bs != null && t.selection.ranges.every((a) => a.empty) && Bs == r.toString()) {
    let a = -1;
    i = t.changeByRange((h) => {
      let f = t.doc.lineAt(h.from);
      if (f.from == a)
        return { range: h };
      a = f.from;
      let c = t.toText((o ? r.line(n++).text : e) + t.lineBreak);
      return {
        changes: { from: f.from, insert: c },
        range: x.cursor(h.from + c.length)
      };
    });
  } else o ? i = t.changeByRange((a) => {
    let h = r.line(n++);
    return {
      changes: { from: a.from, to: a.to, insert: h.text },
      range: x.cursor(a.from + h.length)
    };
  }) : i = t.replaceSelection(r);
  s.dispatch(i, {
    userEvent: "input.paste",
    scrollIntoView: !0
  });
}
ue.scroll = (s) => {
  s.inputState.lastScrollTop = s.scrollDOM.scrollTop, s.inputState.lastScrollLeft = s.scrollDOM.scrollLeft;
};
ue.wheel = ue.mousewheel = (s) => {
  s.inputState.lastWheelEvent = Date.now();
};
Te.keydown = (s, e) => (s.inputState.setSelectionOrigin("select"), e.keyCode == 27 && s.inputState.tabFocusMode != 0 && (s.inputState.tabFocusMode = Date.now() + 2e3), !1);
ue.touchstart = (s, e) => {
  let t = s.inputState, i = e.targetTouches[0];
  t.lastTouchTime = Date.now(), i && (t.lastTouchX = i.clientX, t.lastTouchY = i.clientY), t.setSelectionOrigin("select.pointer");
};
ue.touchmove = (s) => {
  s.inputState.setSelectionOrigin("select.pointer");
};
Te.mousedown = (s, e) => {
  if (s.observer.flush(), s.inputState.lastTouchTime > Date.now() - 2e3)
    return !1;
  let t = null;
  for (let i of s.state.facet(Ol))
    if (t = i(s, e), t)
      break;
  if (!t && e.button == 0 && (t = dc(s, e)), t) {
    let i = !s.hasFocus;
    s.inputState.startMouseSelection(new oc(s, e, t, i)), i && s.observer.ignore(() => {
      xl(s.contentDOM);
      let r = s.root.activeElement;
      r && !r.contains(s.contentDOM) && r.blur();
    });
    let n = s.inputState.mouseSelection;
    if (n)
      return n.start(e), n.dragging === !1;
  } else
    s.inputState.setSelectionOrigin("select.pointer");
  return !1;
};
function Ur(s, e, t, i) {
  if (i == 1)
    return x.cursor(e, t);
  if (i == 2)
    return qf(s.state, e, t);
  {
    let n = s.docView.lineAt(e, t), r = s.state.doc.lineAt(n ? n.posAtEnd : e), o = n ? n.posAtStart : r.from, l = n ? n.posAtEnd : r.to;
    return l < s.state.doc.length && l == r.to && l++, x.range(o, l);
  }
}
const uc = S.ie && S.ie_version <= 11;
let Gr = null, _r = 0, Jr = 0;
function Xl(s) {
  if (!uc)
    return s.detail;
  let e = Gr, t = Jr;
  return Gr = s, Jr = Date.now(), _r = !e || t > Date.now() - 400 && Math.abs(e.clientX - s.clientX) < 2 && Math.abs(e.clientY - s.clientY) < 2 ? (_r + 1) % 3 : 1;
}
function dc(s, e) {
  let t = s.posAndSideAtCoords({ x: e.clientX, y: e.clientY }, !1), i = Xl(e), n = s.state.selection;
  return {
    update(r) {
      r.docChanged && (t.pos = r.changes.mapPos(t.pos), n = n.map(r.changes));
    },
    get(r, o, l) {
      let a = s.posAndSideAtCoords({ x: r.clientX, y: r.clientY }, !1), h, f = Ur(s, a.pos, a.assoc, i);
      if (t.pos != a.pos && !o) {
        let c = Ur(s, t.pos, t.assoc, i), u = Math.min(c.from, f.from), d = Math.max(c.to, f.to);
        f = u < f.from ? x.range(u, d, f.assoc) : x.range(d, u, f.assoc);
      }
      return o ? n.replaceRange(n.main.extend(f.from, f.to, f.assoc)) : l && i == 1 && n.ranges.length > 1 && (h = pc(n, a.pos)) ? h : l ? n.addRange(f) : x.create([f]);
    }
  };
}
function pc(s, e) {
  for (let t = 0; t < s.ranges.length; t++) {
    let { from: i, to: n } = s.ranges[t];
    if (i <= e && n >= e)
      return x.create(s.ranges.slice(0, t).concat(s.ranges.slice(t + 1)), s.mainIndex == t ? 0 : s.mainIndex - (s.mainIndex > t ? 1 : 0));
  }
  return null;
}
Te.dragstart = (s, e) => {
  let { selection: { main: t } } = s.state;
  if (e.target.draggable) {
    let n = s.docView.tile.nearest(e.target);
    if (n && n.isWidget()) {
      let r = n.posAtStart, o = r + n.length;
      (r >= t.to || o <= t.from) && (t = x.range(r, o));
    }
  }
  let { inputState: i } = s;
  return i.mouseSelection && (i.mouseSelection.dragging = !0), i.draggedContent = t, e.dataTransfer && (e.dataTransfer.setData("Text", Dn(s.state, ir, s.state.sliceDoc(t.from, t.to))), e.dataTransfer.effectAllowed = "copyMove"), !1;
};
Te.dragend = (s) => (s.inputState.draggedContent = null, !1);
function Yr(s, e, t, i) {
  if (t = Dn(s.state, tr, t), !t)
    return;
  let n = s.posAtCoords({ x: e.clientX, y: e.clientY }, !1), { draggedContent: r } = s.inputState, o = i && r && ac(s, e) ? { from: r.from, to: r.to } : null, l = { from: n, insert: t }, a = s.state.changes(o ? [o, l] : l);
  s.focus(), s.dispatch({
    changes: a,
    selection: { anchor: a.mapPos(n, -1), head: a.mapPos(n, 1) },
    userEvent: o ? "move.drop" : "input.drop"
  }), s.inputState.draggedContent = null;
}
Te.drop = (s, e) => {
  if (!e.dataTransfer)
    return !1;
  if (s.state.readOnly)
    return !0;
  let t = e.dataTransfer.files;
  if (t && t.length) {
    let i = Array(t.length), n = 0, r = () => {
      ++n == t.length && Yr(s, e, i.filter((o) => o != null).join(s.state.lineBreak), !1);
    };
    for (let o = 0; o < t.length; o++) {
      let l = new FileReader();
      l.onerror = r, l.onload = () => {
        /[\x00-\x08\x0e-\x1f]{2}/.test(l.result) || (i[o] = l.result), r();
      }, l.readAsText(t[o]);
    }
    return !0;
  } else {
    let i = e.dataTransfer.getData("Text");
    if (i)
      return Yr(s, e, i, !0), !0;
  }
  return !1;
};
Te.paste = (s, e) => {
  if (s.state.readOnly)
    return !0;
  s.observer.flush();
  let t = Jl ? null : e.clipboardData;
  return t ? (Yl(s, t.getData("text/plain") || t.getData("text/uri-list")), !0) : (cc(s), !1);
};
function gc(s, e) {
  let t = s.dom.parentNode;
  if (!t)
    return;
  let i = t.appendChild(document.createElement("textarea"));
  i.style.cssText = "position: fixed; left: -10000px; top: 10px", i.value = e, i.focus(), i.selectionEnd = e.length, i.selectionStart = 0, setTimeout(() => {
    i.remove(), s.focus();
  }, 50);
}
function mc(s) {
  let e = [], t = [], i = !1;
  for (let n of s.selection.ranges)
    n.empty || (e.push(s.sliceDoc(n.from, n.to)), t.push(n));
  if (!e.length) {
    let n = -1;
    for (let { from: r } of s.selection.ranges) {
      let o = s.doc.lineAt(r);
      o.number > n && (e.push(o.text), t.push({ from: o.from, to: Math.min(s.doc.length, o.to + 1) })), n = o.number;
    }
    i = !0;
  }
  return { text: Dn(s, ir, e.join(s.lineBreak)), ranges: t, linewise: i };
}
let Bs = null;
Te.copy = Te.cut = (s, e) => {
  if (!ni(s.contentDOM, s.observer.selectionRange))
    return !1;
  let { text: t, ranges: i, linewise: n } = mc(s.state);
  if (!t && !n)
    return !1;
  Bs = n ? t : null, e.type == "cut" && !s.state.readOnly && s.dispatch({
    changes: i,
    scrollIntoView: !0,
    userEvent: "delete.cut"
  });
  let r = Jl ? null : e.clipboardData;
  return r ? (r.clearData(), r.setData("text/plain", t), !0) : (gc(s, t), !1);
};
const Ql = /* @__PURE__ */ at.define();
function Zl(s, e) {
  let t = [];
  for (let i of s.facet(Ll)) {
    let n = i(s, e);
    n && t.push(n);
  }
  return t.length ? s.update({ effects: t, annotations: Ql.of(!0) }) : null;
}
function ea(s) {
  setTimeout(() => {
    let e = s.hasFocus;
    if (e != s.inputState.notifiedFocused) {
      let t = Zl(s.state, e);
      t ? s.dispatch(t) : s.update([]);
    }
  }, 10);
}
ue.focus = (s) => {
  s.inputState.lastFocusTime = Date.now(), !s.scrollDOM.scrollTop && (s.inputState.lastScrollTop || s.inputState.lastScrollLeft) && (s.scrollDOM.scrollTop = s.inputState.lastScrollTop, s.scrollDOM.scrollLeft = s.inputState.lastScrollLeft), ea(s);
};
ue.blur = (s) => {
  s.observer.clearSelectionRange(), ea(s);
};
ue.compositionstart = ue.compositionupdate = (s) => {
  s.observer.editContext || (s.inputState.compositionFirstChange == null && (s.inputState.compositionFirstChange = !0), s.inputState.composing < 0 && (s.inputState.composing = 0));
};
ue.compositionend = (s) => {
  s.observer.editContext || (s.inputState.composing = -1, s.inputState.compositionEndedAt = Date.now(), s.inputState.compositionPendingKey = !0, s.inputState.compositionPendingChange = s.observer.pendingRecords().length > 0, s.inputState.compositionFirstChange = null, S.chrome && S.android ? s.observer.flushSoon() : s.inputState.compositionPendingChange ? Promise.resolve().then(() => s.observer.flush()) : setTimeout(() => {
    s.inputState.composing < 0 && s.docView.hasComposition && s.update([]);
  }, 50));
};
ue.contextmenu = (s) => {
  s.inputState.lastContextMenu = Date.now();
};
Te.beforeinput = (s, e) => {
  var t, i;
  if ((e.inputType == "insertText" || e.inputType == "insertCompositionText") && (s.inputState.insertingText = e.data, s.inputState.insertingTextAt = Date.now()), e.inputType == "insertReplacementText" && s.observer.editContext) {
    let r = (t = e.dataTransfer) === null || t === void 0 ? void 0 : t.getData("text/plain"), o = e.getTargetRanges();
    if (r && o.length) {
      let l = o[0], a = s.posAtDOM(l.startContainer, l.startOffset), h = s.posAtDOM(l.endContainer, l.endOffset);
      return rr(s, { from: a, to: h, insert: s.state.toText(r) }, null), !0;
    }
  }
  let n;
  if (S.chrome && S.android && (n = Gl.find((r) => r.inputType == e.inputType)) && (s.observer.delayAndroidKey(n.key, n.keyCode), n.key == "Backspace" || n.key == "Delete")) {
    let r = ((i = window.visualViewport) === null || i === void 0 ? void 0 : i.height) || 0;
    setTimeout(() => {
      var o;
      (((o = window.visualViewport) === null || o === void 0 ? void 0 : o.height) || 0) > r + 10 && s.hasFocus && (s.contentDOM.blur(), s.focus());
    }, 100);
  }
  return S.ios && e.inputType == "deleteContentForward" && s.observer.flushSoon(), S.safari && e.inputType == "insertText" && s.inputState.composing >= 0 && setTimeout(() => ue.compositionend(s, e), 20), !1;
};
const Xr = /* @__PURE__ */ new Set();
function yc(s) {
  Xr.has(s) || (Xr.add(s), s.addEventListener("copy", () => {
  }), s.addEventListener("cut", () => {
  }));
}
const Qr = ["pre-wrap", "normal", "pre-line", "break-spaces"];
let Vt = !1;
function Zr() {
  Vt = !1;
}
class xc {
  constructor(e) {
    this.lineWrapping = e, this.doc = N.empty, this.heightSamples = {}, this.lineHeight = 14, this.charWidth = 7, this.textHeight = 14, this.lineLength = 30;
  }
  heightForGap(e, t) {
    let i = this.doc.lineAt(t).number - this.doc.lineAt(e).number + 1;
    return this.lineWrapping && (i += Math.max(0, Math.ceil((t - e - i * this.lineLength * 0.5) / this.lineLength))), this.lineHeight * i;
  }
  heightForLine(e) {
    return this.lineWrapping ? (1 + Math.max(0, Math.ceil((e - this.lineLength) / Math.max(1, this.lineLength - 5)))) * this.lineHeight : this.lineHeight;
  }
  setDoc(e) {
    return this.doc = e, this;
  }
  mustRefreshForWrapping(e) {
    return Qr.indexOf(e) > -1 != this.lineWrapping;
  }
  mustRefreshForHeights(e) {
    let t = !1;
    for (let i = 0; i < e.length; i++) {
      let n = e[i];
      n < 0 ? i++ : this.heightSamples[Math.floor(n * 10)] || (t = !0, this.heightSamples[Math.floor(n * 10)] = !0);
    }
    return t;
  }
  refresh(e, t, i, n, r, o) {
    let l = Qr.indexOf(e) > -1, a = Math.abs(t - this.lineHeight) > 0.3 || this.lineWrapping != l;
    if (this.lineWrapping = l, this.lineHeight = t, this.charWidth = i, this.textHeight = n, this.lineLength = r, a) {
      this.heightSamples = {};
      for (let h = 0; h < o.length; h++) {
        let f = o[h];
        f < 0 ? h++ : this.heightSamples[Math.floor(f * 10)] = !0;
      }
    }
    return a;
  }
}
class bc {
  constructor(e, t) {
    this.from = e, this.heights = t, this.index = 0;
  }
  get more() {
    return this.index < this.heights.length;
  }
}
class Ae {
  /**
  @internal
  */
  constructor(e, t, i, n, r) {
    this.from = e, this.length = t, this.top = i, this.height = n, this._content = r;
  }
  /**
  The type of element this is. When querying lines, this may be
  an array of all the blocks that make up the line.
  */
  get type() {
    return typeof this._content == "number" ? ce.Text : Array.isArray(this._content) ? this._content : this._content.type;
  }
  /**
  The end of the element as a document position.
  */
  get to() {
    return this.from + this.length;
  }
  /**
  The bottom position of the element.
  */
  get bottom() {
    return this.top + this.height;
  }
  /**
  If this is a widget block, this will return the widget
  associated with it.
  */
  get widget() {
    return this._content instanceof bt ? this._content.widget : null;
  }
  /**
  If this is a textblock, this holds the number of line breaks
  that appear in widgets inside the block.
  */
  get widgetLineBreaks() {
    return typeof this._content == "number" ? this._content : 0;
  }
  /**
  @internal
  */
  join(e) {
    let t = (Array.isArray(this._content) ? this._content : [this]).concat(Array.isArray(e._content) ? e._content : [e]);
    return new Ae(this.from, this.length + e.length, this.top, this.height + e.height, t);
  }
}
var z = /* @__PURE__ */ (function(s) {
  return s[s.ByPos = 0] = "ByPos", s[s.ByHeight = 1] = "ByHeight", s[s.ByPosNoHeight = 2] = "ByPosNoHeight", s;
})(z || (z = {}));
const Gi = 1e-3;
class ae {
  constructor(e, t, i = 2) {
    this.length = e, this.height = t, this.flags = i;
  }
  get outdated() {
    return (this.flags & 2) > 0;
  }
  set outdated(e) {
    this.flags = (e ? 2 : 0) | this.flags & -3;
  }
  setHeight(e) {
    this.height != e && (Math.abs(this.height - e) > Gi && (Vt = !0), this.height = e);
  }
  // Base case is to replace a leaf node, which simply builds a tree
  // from the new nodes and returns that (HeightMapBranch and
  // HeightMapGap override this to actually use from/to)
  replace(e, t, i) {
    return ae.of(i);
  }
  // Again, these are base cases, and are overridden for branch and gap nodes.
  decomposeLeft(e, t) {
    t.push(this);
  }
  decomposeRight(e, t) {
    t.push(this);
  }
  applyChanges(e, t, i, n) {
    let r = this, o = i.doc;
    for (let l = n.length - 1; l >= 0; l--) {
      let { fromA: a, toA: h, fromB: f, toB: c } = n[l], u = r.lineAt(a, z.ByPosNoHeight, i.setDoc(t), 0, 0), d = u.to >= h ? u : r.lineAt(h, z.ByPosNoHeight, i, 0, 0);
      for (c += d.to - h, h = d.to; l > 0 && u.from <= n[l - 1].toA; )
        a = n[l - 1].fromA, f = n[l - 1].fromB, l--, a < u.from && (u = r.lineAt(a, z.ByPosNoHeight, i, 0, 0));
      f += u.from - a, a = u.from;
      let p = or.build(i.setDoc(o), e, f, c);
      r = on(r, r.replace(a, h, p));
    }
    return r.updateHeight(i, 0);
  }
  static empty() {
    return new ge(0, 0, 0);
  }
  // nodes uses null values to indicate the position of line breaks.
  // There are never line breaks at the start or end of the array, or
  // two line breaks next to each other, and the array isn't allowed
  // to be empty (same restrictions as return value from the builder).
  static of(e) {
    if (e.length == 1)
      return e[0];
    let t = 0, i = e.length, n = 0, r = 0;
    for (; ; )
      if (t == i)
        if (n > r * 2) {
          let l = e[t - 1];
          l.break ? e.splice(--t, 1, l.left, null, l.right) : e.splice(--t, 1, l.left, l.right), i += 1 + l.break, n -= l.size;
        } else if (r > n * 2) {
          let l = e[i];
          l.break ? e.splice(i, 1, l.left, null, l.right) : e.splice(i, 1, l.left, l.right), i += 2 + l.break, r -= l.size;
        } else
          break;
      else if (n < r) {
        let l = e[t++];
        l && (n += l.size);
      } else {
        let l = e[--i];
        l && (r += l.size);
      }
    let o = 0;
    return e[t - 1] == null ? (o = 1, t--) : e[t] == null && (o = 1, i++), new kc(ae.of(e.slice(0, t)), o, ae.of(e.slice(i)));
  }
}
function on(s, e) {
  return s == e ? s : (s.constructor != e.constructor && (Vt = !0), e);
}
ae.prototype.size = 1;
const wc = /* @__PURE__ */ B.replace({});
class ta extends ae {
  constructor(e, t, i) {
    super(e, t), this.deco = i, this.spaceAbove = 0;
  }
  mainBlock(e, t) {
    return new Ae(t, this.length, e + this.spaceAbove, this.height - this.spaceAbove, this.deco || 0);
  }
  blockAt(e, t, i, n) {
    return this.spaceAbove && e < i + this.spaceAbove ? new Ae(n, 0, i, this.spaceAbove, wc) : this.mainBlock(i, n);
  }
  lineAt(e, t, i, n, r) {
    let o = this.mainBlock(n, r);
    return this.spaceAbove ? this.blockAt(0, i, n, r).join(o) : o;
  }
  forEachLine(e, t, i, n, r, o) {
    e <= r + this.length && t >= r && o(this.lineAt(0, z.ByPos, i, n, r));
  }
  setMeasuredHeight(e) {
    let t = e.heights[e.index++];
    t < 0 ? (this.spaceAbove = -t, t = e.heights[e.index++]) : this.spaceAbove = 0, this.setHeight(t);
  }
  updateHeight(e, t = 0, i = !1, n) {
    return n && n.from <= t && n.more && this.setMeasuredHeight(n), this.outdated = !1, this;
  }
  toString() {
    return `block(${this.length})`;
  }
}
class ge extends ta {
  constructor(e, t, i) {
    super(e, t, null), this.collapsed = 0, this.widgetHeight = 0, this.breaks = 0, this.spaceAbove = i;
  }
  mainBlock(e, t) {
    return new Ae(t, this.length, e + this.spaceAbove, this.height - this.spaceAbove, this.breaks);
  }
  replace(e, t, i) {
    let n = i[0];
    return i.length == 1 && (n instanceof ge || n instanceof ie && n.flags & 4) && Math.abs(this.length - n.length) < 10 ? (n instanceof ie ? n = new ge(n.length, this.height, this.spaceAbove) : n.height = this.height, this.outdated || (n.outdated = !1), n) : ae.of(i);
  }
  updateHeight(e, t = 0, i = !1, n) {
    return n && n.from <= t && n.more ? this.setMeasuredHeight(n) : (i || this.outdated) && (this.spaceAbove = 0, this.setHeight(Math.max(this.widgetHeight, e.heightForLine(this.length - this.collapsed)) + this.breaks * e.lineHeight)), this.outdated = !1, this;
  }
  toString() {
    return `line(${this.length}${this.collapsed ? -this.collapsed : ""}${this.widgetHeight ? ":" + this.widgetHeight : ""})`;
  }
}
class ie extends ae {
  constructor(e) {
    super(e, 0);
  }
  heightMetrics(e, t) {
    let i = e.doc.lineAt(t).number, n = e.doc.lineAt(t + this.length).number, r = n - i + 1, o, l = 0;
    if (e.lineWrapping) {
      let a = Math.min(this.height, e.lineHeight * r);
      o = a / r, this.length > r + 1 && (l = (this.height - a) / (this.length - r - 1));
    } else
      o = this.height / r;
    return { firstLine: i, lastLine: n, perLine: o, perChar: l };
  }
  blockAt(e, t, i, n) {
    let { firstLine: r, lastLine: o, perLine: l, perChar: a } = this.heightMetrics(t, n);
    if (t.lineWrapping) {
      let h = n + (e < t.lineHeight ? 0 : Math.round(Math.max(0, Math.min(1, (e - i) / this.height)) * this.length)), f = t.doc.lineAt(h), c = l + f.length * a, u = Math.max(i, e - c / 2);
      return new Ae(f.from, f.length, u, c, 0);
    } else {
      let h = Math.max(0, Math.min(o - r, Math.floor((e - i) / l))), { from: f, length: c } = t.doc.line(r + h);
      return new Ae(f, c, i + l * h, l, 0);
    }
  }
  lineAt(e, t, i, n, r) {
    if (t == z.ByHeight)
      return this.blockAt(e, i, n, r);
    if (t == z.ByPosNoHeight) {
      let { from: d, to: p } = i.doc.lineAt(e);
      return new Ae(d, p - d, 0, 0, 0);
    }
    let { firstLine: o, perLine: l, perChar: a } = this.heightMetrics(i, r), h = i.doc.lineAt(e), f = l + h.length * a, c = h.number - o, u = n + l * c + a * (h.from - r - c);
    return new Ae(h.from, h.length, Math.max(n, Math.min(u, n + this.height - f)), f, 0);
  }
  forEachLine(e, t, i, n, r, o) {
    e = Math.max(e, r), t = Math.min(t, r + this.length);
    let { firstLine: l, perLine: a, perChar: h } = this.heightMetrics(i, r);
    for (let f = e, c = n; f <= t; ) {
      let u = i.doc.lineAt(f);
      if (f == e) {
        let p = u.number - l;
        c += a * p + h * (e - r - p);
      }
      let d = a + h * u.length;
      o(new Ae(u.from, u.length, c, d, 0)), c += d, f = u.to + 1;
    }
  }
  replace(e, t, i) {
    let n = this.length - t;
    if (n > 0) {
      let r = i[i.length - 1];
      r instanceof ie ? i[i.length - 1] = new ie(r.length + n) : i.push(null, new ie(n - 1));
    }
    if (e > 0) {
      let r = i[0];
      r instanceof ie ? i[0] = new ie(e + r.length) : i.unshift(new ie(e - 1), null);
    }
    return ae.of(i);
  }
  decomposeLeft(e, t) {
    t.push(new ie(e - 1), null);
  }
  decomposeRight(e, t) {
    t.push(null, new ie(this.length - e - 1));
  }
  updateHeight(e, t = 0, i = !1, n) {
    let r = t + this.length;
    if (n && n.from <= t + this.length && n.more) {
      let o = [], l = Math.max(t, n.from), a = -1;
      for (n.from > t && o.push(new ie(n.from - t - 1).updateHeight(e, t)); l <= r && n.more; ) {
        let f = e.doc.lineAt(l).length;
        o.length && o.push(null);
        let c = n.heights[n.index++], u = 0;
        c < 0 && (u = -c, c = n.heights[n.index++]), a == -1 ? a = c : Math.abs(c - a) >= Gi && (a = -2);
        let d = new ge(f, c, u);
        d.outdated = !1, o.push(d), l += f + 1;
      }
      l <= r && o.push(null, new ie(r - l).updateHeight(e, l));
      let h = ae.of(o);
      return (a < 0 || Math.abs(h.height - this.height) >= Gi || Math.abs(a - this.heightMetrics(e, t).perLine) >= Gi) && (Vt = !0), on(this, h);
    } else (i || this.outdated) && (this.setHeight(e.heightForGap(t, t + this.length)), this.outdated = !1);
    return this;
  }
  toString() {
    return `gap(${this.length})`;
  }
}
class kc extends ae {
  constructor(e, t, i) {
    super(e.length + t + i.length, e.height + i.height, t | (e.outdated || i.outdated ? 2 : 0)), this.left = e, this.right = i, this.size = e.size + i.size;
  }
  get break() {
    return this.flags & 1;
  }
  blockAt(e, t, i, n) {
    let r = i + this.left.height;
    return e < r ? this.left.blockAt(e, t, i, n) : this.right.blockAt(e, t, r, n + this.left.length + this.break);
  }
  lineAt(e, t, i, n, r) {
    let o = n + this.left.height, l = r + this.left.length + this.break, a = t == z.ByHeight ? e < o : e < l, h = a ? this.left.lineAt(e, t, i, n, r) : this.right.lineAt(e, t, i, o, l);
    if (this.break || (a ? h.to < l : h.from > l))
      return h;
    let f = t == z.ByPosNoHeight ? z.ByPosNoHeight : z.ByPos;
    return a ? h.join(this.right.lineAt(l, f, i, o, l)) : this.left.lineAt(l, f, i, n, r).join(h);
  }
  forEachLine(e, t, i, n, r, o) {
    let l = n + this.left.height, a = r + this.left.length + this.break;
    if (this.break)
      e < a && this.left.forEachLine(e, t, i, n, r, o), t >= a && this.right.forEachLine(e, t, i, l, a, o);
    else {
      let h = this.lineAt(a, z.ByPos, i, n, r);
      e < h.from && this.left.forEachLine(e, h.from - 1, i, n, r, o), h.to >= e && h.from <= t && o(h), t > h.to && this.right.forEachLine(h.to + 1, t, i, l, a, o);
    }
  }
  replace(e, t, i) {
    let n = this.left.length + this.break;
    if (t < n)
      return this.balanced(this.left.replace(e, t, i), this.right);
    if (e > this.left.length)
      return this.balanced(this.left, this.right.replace(e - n, t - n, i));
    let r = [];
    e > 0 && this.decomposeLeft(e, r);
    let o = r.length;
    for (let l of i)
      r.push(l);
    if (e > 0 && eo(r, o - 1), t < this.length) {
      let l = r.length;
      this.decomposeRight(t, r), eo(r, l);
    }
    return ae.of(r);
  }
  decomposeLeft(e, t) {
    let i = this.left.length;
    if (e <= i)
      return this.left.decomposeLeft(e, t);
    t.push(this.left), this.break && (i++, e >= i && t.push(null)), e > i && this.right.decomposeLeft(e - i, t);
  }
  decomposeRight(e, t) {
    let i = this.left.length, n = i + this.break;
    if (e >= n)
      return this.right.decomposeRight(e - n, t);
    e < i && this.left.decomposeRight(e, t), this.break && e < n && t.push(null), t.push(this.right);
  }
  balanced(e, t) {
    return e.size > 2 * t.size || t.size > 2 * e.size ? ae.of(this.break ? [e, null, t] : [e, t]) : (this.left = on(this.left, e), this.right = on(this.right, t), this.setHeight(e.height + t.height), this.outdated = e.outdated || t.outdated, this.size = e.size + t.size, this.length = e.length + this.break + t.length, this);
  }
  updateHeight(e, t = 0, i = !1, n) {
    let { left: r, right: o } = this, l = t + r.length + this.break, a = null;
    return n && n.from <= t + r.length && n.more ? a = r = r.updateHeight(e, t, i, n) : r.updateHeight(e, t, i), n && n.from <= l + o.length && n.more ? a = o = o.updateHeight(e, l, i, n) : o.updateHeight(e, l, i), a ? this.balanced(r, o) : (this.height = this.left.height + this.right.height, this.outdated = !1, this);
  }
  toString() {
    return this.left + (this.break ? " " : "-") + this.right;
  }
}
function eo(s, e) {
  let t, i;
  s[e] == null && (t = s[e - 1]) instanceof ie && (i = s[e + 1]) instanceof ie && s.splice(e - 1, 3, new ie(t.length + 1 + i.length));
}
const Sc = 5;
class or {
  constructor(e, t) {
    this.pos = e, this.oracle = t, this.nodes = [], this.lineStart = -1, this.lineEnd = -1, this.covering = null, this.writtenTo = e;
  }
  get isCovered() {
    return this.covering && this.nodes[this.nodes.length - 1] == this.covering;
  }
  span(e, t) {
    if (this.lineStart > -1) {
      let i = Math.min(t, this.lineEnd), n = this.nodes[this.nodes.length - 1];
      n instanceof ge ? n.length += i - this.pos : (i > this.pos || !this.isCovered) && this.nodes.push(new ge(i - this.pos, -1, 0)), this.writtenTo = i, t > i && (this.nodes.push(null), this.writtenTo++, this.lineStart = -1);
    }
    this.pos = t;
  }
  point(e, t, i) {
    if (e < t || i.heightRelevant) {
      let n = i.widget ? i.widget.estimatedHeight : 0, r = i.widget ? i.widget.lineBreaks : 0;
      n < 0 && (n = this.oracle.lineHeight);
      let o = t - e;
      i.block ? this.addBlock(new ta(o, n, i)) : (o || r || n >= Sc) && this.addLineDeco(n, r, o);
    } else t > e && this.span(e, t);
    this.lineEnd > -1 && this.lineEnd < this.pos && (this.lineEnd = this.oracle.doc.lineAt(this.pos).to);
  }
  enterLine() {
    if (this.lineStart > -1)
      return;
    let { from: e, to: t } = this.oracle.doc.lineAt(this.pos);
    this.lineStart = e, this.lineEnd = t, this.writtenTo < e && ((this.writtenTo < e - 1 || this.nodes[this.nodes.length - 1] == null) && this.nodes.push(this.blankContent(this.writtenTo, e - 1)), this.nodes.push(null)), this.pos > e && this.nodes.push(new ge(this.pos - e, -1, 0)), this.writtenTo = this.pos;
  }
  blankContent(e, t) {
    let i = new ie(t - e);
    return this.oracle.doc.lineAt(e).to == t && (i.flags |= 4), i;
  }
  ensureLine() {
    this.enterLine();
    let e = this.nodes.length ? this.nodes[this.nodes.length - 1] : null;
    if (e instanceof ge)
      return e;
    let t = new ge(0, -1, 0);
    return this.nodes.push(t), t;
  }
  addBlock(e) {
    this.enterLine();
    let t = e.deco;
    t && t.startSide > 0 && !this.isCovered && this.ensureLine(), this.nodes.push(e), this.writtenTo = this.pos = this.pos + e.length, t && t.endSide > 0 && (this.covering = e);
  }
  addLineDeco(e, t, i) {
    let n = this.ensureLine();
    n.length += i, n.collapsed += i, n.widgetHeight = Math.max(n.widgetHeight, e), n.breaks += t, this.writtenTo = this.pos = this.pos + i;
  }
  finish(e) {
    let t = this.nodes.length == 0 ? null : this.nodes[this.nodes.length - 1];
    this.lineStart > -1 && !(t instanceof ge) && !this.isCovered ? this.nodes.push(new ge(0, -1, 0)) : (this.writtenTo < this.pos || t == null) && this.nodes.push(this.blankContent(this.writtenTo, this.pos));
    let i = e;
    for (let n of this.nodes)
      n instanceof ge && n.updateHeight(this.oracle, i), i += n ? n.length : 1;
    return this.nodes;
  }
  // Always called with a region that on both sides either stretches
  // to a line break or the end of the document.
  // The returned array uses null to indicate line breaks, but never
  // starts or ends in a line break, or has multiple line breaks next
  // to each other.
  static build(e, t, i, n) {
    let r = new or(i, e);
    return L.spans(t, i, n, r, 0), r.finish(i);
  }
}
function vc(s, e, t) {
  let i = new Cc();
  return L.compare(s, e, t, i, 0), i.changes;
}
class Cc {
  constructor() {
    this.changes = [];
  }
  compareRange() {
  }
  comparePoint(e, t, i, n) {
    (e < t || i && i.heightRelevant || n && n.heightRelevant) && Et(e, t, this.changes, 5);
  }
}
function Ac(s, e) {
  let t = s.getBoundingClientRect(), i = s.ownerDocument, n = i.defaultView || window, r = Math.max(0, t.left), o = Math.min(n.innerWidth, t.right), l = Math.max(0, t.top), a = Math.min(n.innerHeight, t.bottom);
  for (let h = s.parentNode; h && h != i.body; )
    if (h.nodeType == 1) {
      let f = h, c = window.getComputedStyle(f);
      if ((f.scrollHeight > f.clientHeight || f.scrollWidth > f.clientWidth) && c.overflow != "visible") {
        let u = f.getBoundingClientRect();
        r = Math.max(r, u.left), o = Math.min(o, u.right), l = Math.max(l, u.top), a = Math.min(h == s.parentNode ? n.innerHeight : a, u.bottom);
      }
      h = c.position == "absolute" || c.position == "fixed" ? f.offsetParent : f.parentNode;
    } else if (h.nodeType == 11)
      h = h.host;
    else
      break;
  return {
    left: r - t.left,
    right: Math.max(r, o) - t.left,
    top: l - (t.top + e),
    bottom: Math.max(l, a) - (t.top + e)
  };
}
function Mc(s) {
  let e = s.getBoundingClientRect(), t = s.ownerDocument.defaultView || window;
  return e.left < t.innerWidth && e.right > 0 && e.top < t.innerHeight && e.bottom > 0;
}
function Dc(s, e) {
  let t = s.getBoundingClientRect();
  return {
    left: 0,
    right: t.right - t.left,
    top: e,
    bottom: t.bottom - (t.top + e)
  };
}
class $n {
  constructor(e, t, i, n) {
    this.from = e, this.to = t, this.size = i, this.displaySize = n;
  }
  static same(e, t) {
    if (e.length != t.length)
      return !1;
    for (let i = 0; i < e.length; i++) {
      let n = e[i], r = t[i];
      if (n.from != r.from || n.to != r.to || n.size != r.size)
        return !1;
    }
    return !0;
  }
  draw(e, t) {
    return B.replace({
      widget: new Tc(this.displaySize * (t ? e.scaleY : e.scaleX), t)
    }).range(this.from, this.to);
  }
}
class Tc extends jt {
  constructor(e, t) {
    super(), this.size = e, this.vertical = t;
  }
  eq(e) {
    return e.size == this.size && e.vertical == this.vertical;
  }
  toDOM() {
    let e = document.createElement("div");
    return this.vertical ? e.style.height = this.size + "px" : (e.style.width = this.size + "px", e.style.height = "2px", e.style.display = "inline-block"), e;
  }
  get estimatedHeight() {
    return this.vertical ? this.size : -1;
  }
}
class to {
  constructor(e, t) {
    this.view = e, this.state = t, this.pixelViewport = { left: 0, right: window.innerWidth, top: 0, bottom: 0 }, this.inView = !0, this.paddingTop = 0, this.paddingBottom = 0, this.contentDOMWidth = 0, this.contentDOMHeight = 0, this.editorHeight = 0, this.editorWidth = 0, this.scaleX = 1, this.scaleY = 1, this.scrollOffset = 0, this.scrolledToBottom = !1, this.scrollAnchorPos = 0, this.scrollAnchorHeight = -1, this.scaler = io, this.scrollTarget = null, this.printing = !1, this.mustMeasureContent = !0, this.defaultTextDirection = J.LTR, this.visibleRanges = [], this.mustEnforceCursorAssoc = !1;
    let i = t.facet(nr).some((n) => typeof n != "function" && n.class == "cm-lineWrapping");
    this.heightOracle = new xc(i), this.stateDeco = no(t), this.heightMap = ae.empty().applyChanges(this.stateDeco, N.empty, this.heightOracle.setDoc(t.doc), [new ke(0, 0, 0, t.doc.length)]);
    for (let n = 0; n < 2 && (this.viewport = this.getViewport(0, null), !!this.updateForViewport()); n++)
      ;
    this.updateViewportLines(), this.lineGaps = this.ensureLineGaps([]), this.lineGapDeco = B.set(this.lineGaps.map((n) => n.draw(this, !1))), this.scrollParent = e.scrollDOM, this.computeVisibleRanges();
  }
  updateForViewport() {
    let e = [this.viewport], { main: t } = this.state.selection;
    for (let i = 0; i <= 1; i++) {
      let n = i ? t.head : t.anchor;
      if (!e.some(({ from: r, to: o }) => n >= r && n <= o)) {
        let { from: r, to: o } = this.lineBlockAt(n);
        e.push(new Ei(r, o));
      }
    }
    return this.viewports = e.sort((i, n) => i.from - n.from), this.updateScaler();
  }
  updateScaler() {
    let e = this.scaler;
    return this.scaler = this.heightMap.height <= 7e6 ? io : new lr(this.heightOracle, this.heightMap, this.viewports), e.eq(this.scaler) ? 0 : 2;
  }
  updateViewportLines() {
    this.viewportLines = [], this.heightMap.forEachLine(this.viewport.from, this.viewport.to, this.heightOracle.setDoc(this.state.doc), 0, 0, (e) => {
      this.viewportLines.push(ei(e, this.scaler));
    });
  }
  update(e, t = null) {
    this.state = e.state;
    let i = this.stateDeco;
    this.stateDeco = no(this.state);
    let n = e.changedRanges, r = ke.extendWithRanges(n, vc(i, this.stateDeco, e ? e.changes : X.empty(this.state.doc.length))), o = this.heightMap.height, l = this.scrolledToBottom ? null : this.scrollAnchorAt(this.scrollOffset);
    Zr(), this.heightMap = this.heightMap.applyChanges(this.stateDeco, e.startState.doc, this.heightOracle.setDoc(this.state.doc), r), (this.heightMap.height != o || Vt) && (e.flags |= 2), l ? (this.scrollAnchorPos = e.changes.mapPos(l.from, -1), this.scrollAnchorHeight = l.top) : (this.scrollAnchorPos = -1, this.scrollAnchorHeight = o);
    let a = r.length ? this.mapViewport(this.viewport, e.changes) : this.viewport;
    (t && (t.range.head < a.from || t.range.head > a.to) || !this.viewportIsAppropriate(a)) && (a = this.getViewport(0, t));
    let h = a.from != this.viewport.from || a.to != this.viewport.to;
    this.viewport = a, e.flags |= this.updateForViewport(), (h || !e.changes.empty || e.flags & 2) && this.updateViewportLines(), (this.lineGaps.length || this.viewport.to - this.viewport.from > 4e3) && this.updateLineGaps(this.ensureLineGaps(this.mapLineGaps(this.lineGaps, e.changes))), e.flags |= this.computeVisibleRanges(e.changes), t && (this.scrollTarget = t), !this.mustEnforceCursorAssoc && (e.selectionSet || e.focusChanged) && e.view.lineWrapping && e.state.selection.main.empty && e.state.selection.main.assoc && !e.state.facet(bf) && (this.mustEnforceCursorAssoc = !0);
  }
  measure() {
    let { view: e } = this, t = e.contentDOM, i = window.getComputedStyle(t), n = this.heightOracle, r = i.whiteSpace;
    this.defaultTextDirection = i.direction == "rtl" ? J.RTL : J.LTR;
    let o = this.heightOracle.mustRefreshForWrapping(r) || this.mustMeasureContent === "refresh", l = t.getBoundingClientRect(), a = o || this.mustMeasureContent || this.contentDOMHeight != l.height;
    this.contentDOMHeight = l.height, this.mustMeasureContent = !1;
    let h = 0, f = 0;
    if (l.width && l.height) {
      let { scaleX: D, scaleY: T } = ml(t, l);
      (D > 5e-3 && Math.abs(this.scaleX - D) > 5e-3 || T > 5e-3 && Math.abs(this.scaleY - T) > 5e-3) && (this.scaleX = D, this.scaleY = T, h |= 16, o = a = !0);
    }
    let c = (parseInt(i.paddingTop) || 0) * this.scaleY, u = (parseInt(i.paddingBottom) || 0) * this.scaleY;
    (this.paddingTop != c || this.paddingBottom != u) && (this.paddingTop = c, this.paddingBottom = u, h |= 18), this.editorWidth != e.scrollDOM.clientWidth && (n.lineWrapping && (a = !0), this.editorWidth = e.scrollDOM.clientWidth, h |= 16);
    let d = yl(this.view.contentDOM, !1).y;
    d != this.scrollParent && (this.scrollParent = d, this.scrollAnchorHeight = -1, this.scrollOffset = 0);
    let p = this.getScrollOffset();
    this.scrollOffset != p && (this.scrollAnchorHeight = -1, this.scrollOffset = p), this.scrolledToBottom = bl(this.scrollParent || e.win);
    let g = (this.printing ? Dc : Ac)(t, this.paddingTop), m = g.top - this.pixelViewport.top, y = g.bottom - this.pixelViewport.bottom;
    this.pixelViewport = g;
    let b = this.pixelViewport.bottom > this.pixelViewport.top && this.pixelViewport.right > this.pixelViewport.left;
    if (b != this.inView && (this.inView = b, b && (a = !0)), !this.inView && !this.scrollTarget && !Mc(e.dom))
      return 0;
    let C = l.width;
    if ((this.contentDOMWidth != C || this.editorHeight != e.scrollDOM.clientHeight) && (this.contentDOMWidth = l.width, this.editorHeight = e.scrollDOM.clientHeight, h |= 16), a) {
      let D = e.docView.measureVisibleLineHeights(this.viewport);
      if (n.mustRefreshForHeights(D) && (o = !0), o || n.lineWrapping && Math.abs(C - this.contentDOMWidth) > n.charWidth) {
        let { lineHeight: T, charWidth: M, textHeight: q } = e.docView.measureTextSize();
        o = T > 0 && n.refresh(r, T, M, q, Math.max(5, C / M), D), o && (e.docView.minWidth = 0, h |= 16);
      }
      m > 0 && y > 0 ? f = Math.max(m, y) : m < 0 && y < 0 && (f = Math.min(m, y)), Zr();
      for (let T of this.viewports) {
        let M = T.from == this.viewport.from ? D : e.docView.measureVisibleLineHeights(T);
        this.heightMap = (o ? ae.empty().applyChanges(this.stateDeco, N.empty, this.heightOracle, [new ke(0, 0, 0, e.state.doc.length)]) : this.heightMap).updateHeight(n, 0, o, new bc(T.from, M));
      }
      Vt && (h |= 2);
    }
    let P = !this.viewportIsAppropriate(this.viewport, f) || this.scrollTarget && (this.scrollTarget.range.head < this.viewport.from || this.scrollTarget.range.head > this.viewport.to);
    return P && (h & 2 && (h |= this.updateScaler()), this.viewport = this.getViewport(f, this.scrollTarget), h |= this.updateForViewport()), (h & 2 || P) && this.updateViewportLines(), (this.lineGaps.length || this.viewport.to - this.viewport.from > 4e3) && this.updateLineGaps(this.ensureLineGaps(o ? [] : this.lineGaps, e)), h |= this.computeVisibleRanges(), this.mustEnforceCursorAssoc && (this.mustEnforceCursorAssoc = !1, e.docView.enforceCursorAssoc()), h;
  }
  get visibleTop() {
    return this.scaler.fromDOM(this.pixelViewport.top);
  }
  get visibleBottom() {
    return this.scaler.fromDOM(this.pixelViewport.bottom);
  }
  getViewport(e, t) {
    let i = 0.5 - Math.max(-0.5, Math.min(0.5, e / 1e3 / 2)), n = this.heightMap, r = this.heightOracle, { visibleTop: o, visibleBottom: l } = this, a = new Ei(n.lineAt(o - i * 1e3, z.ByHeight, r, 0, 0).from, n.lineAt(l + (1 - i) * 1e3, z.ByHeight, r, 0, 0).to);
    if (t) {
      let { head: h } = t.range;
      if (h < a.from || h > a.to) {
        let f = Math.min(this.editorHeight, this.pixelViewport.bottom - this.pixelViewport.top), c = n.lineAt(h, z.ByPos, r, 0, 0), u;
        t.y == "center" ? u = (c.top + c.bottom) / 2 - f / 2 : t.y == "start" || t.y == "nearest" && h < a.from ? u = c.top : u = c.bottom - f, a = new Ei(n.lineAt(u - 1e3 / 2, z.ByHeight, r, 0, 0).from, n.lineAt(u + f + 1e3 / 2, z.ByHeight, r, 0, 0).to);
      }
    }
    return a;
  }
  mapViewport(e, t) {
    let i = t.mapPos(e.from, -1), n = t.mapPos(e.to, 1);
    return new Ei(this.heightMap.lineAt(i, z.ByPos, this.heightOracle, 0, 0).from, this.heightMap.lineAt(n, z.ByPos, this.heightOracle, 0, 0).to);
  }
  // Checks if a given viewport covers the visible part of the
  // document and not too much beyond that.
  viewportIsAppropriate({ from: e, to: t }, i = 0) {
    if (!this.inView)
      return !0;
    let { top: n } = this.heightMap.lineAt(e, z.ByPos, this.heightOracle, 0, 0), { bottom: r } = this.heightMap.lineAt(t, z.ByPos, this.heightOracle, 0, 0), { visibleTop: o, visibleBottom: l } = this;
    return (e == 0 || n <= o - Math.max(10, Math.min(
      -i,
      250
      /* VP.MaxCoverMargin */
    ))) && (t == this.state.doc.length || r >= l + Math.max(10, Math.min(
      i,
      250
      /* VP.MaxCoverMargin */
    ))) && n > o - 2 * 1e3 && r < l + 2 * 1e3;
  }
  mapLineGaps(e, t) {
    if (!e.length || t.empty)
      return e;
    let i = [];
    for (let n of e)
      t.touchesRange(n.from, n.to) || i.push(new $n(t.mapPos(n.from), t.mapPos(n.to), n.size, n.displaySize));
    return i;
  }
  // Computes positions in the viewport where the start or end of a
  // line should be hidden, trying to reuse existing line gaps when
  // appropriate to avoid unneccesary redraws.
  // Uses crude character-counting for the positioning and sizing,
  // since actual DOM coordinates aren't always available and
  // predictable. Relies on generous margins (see LG.Margin) to hide
  // the artifacts this might produce from the user.
  ensureLineGaps(e, t) {
    let i = this.heightOracle.lineWrapping, n = i ? 1e4 : 2e3, r = n >> 1, o = n << 1;
    if (this.defaultTextDirection != J.LTR && !i)
      return [];
    let l = [], a = (f, c, u, d) => {
      if (c - f < r)
        return;
      let p = this.state.selection.main, g = [p.from];
      p.empty || g.push(p.to);
      for (let y of g)
        if (y > f && y < c) {
          a(f, y - 10, u, d), a(y + 10, c, u, d);
          return;
        }
      let m = Bc(e, (y) => y.from >= u.from && y.to <= u.to && Math.abs(y.from - f) < r && Math.abs(y.to - c) < r && !g.some((b) => y.from < b && y.to > b));
      if (!m) {
        if (c < u.to && t && i && t.visibleRanges.some((C) => C.from <= c && C.to >= c)) {
          let C = t.moveToLineBoundary(x.cursor(c), !1, !0).head;
          C > f && (c = C);
        }
        let y = this.gapSize(u, f, c, d), b = i || y < 2e6 ? y : 2e6;
        m = new $n(f, c, y, b);
      }
      l.push(m);
    }, h = (f) => {
      if (f.length < o || f.type != ce.Text)
        return;
      let c = Oc(f.from, f.to, this.stateDeco);
      if (c.total < o)
        return;
      let u = this.scrollTarget ? this.scrollTarget.range.head : null, d, p;
      if (i) {
        let g = n / this.heightOracle.lineLength * this.heightOracle.lineHeight, m, y;
        if (u != null) {
          let b = Pi(c, u), C = ((this.visibleBottom - this.visibleTop) / 2 + g) / f.height;
          m = b - C, y = b + C;
        } else
          m = (this.visibleTop - f.top - g) / f.height, y = (this.visibleBottom - f.top + g) / f.height;
        d = Li(c, m), p = Li(c, y);
      } else {
        let g = c.total * this.heightOracle.charWidth, m = n * this.heightOracle.charWidth, y = 0;
        if (g > 2e6)
          for (let T of e)
            T.from >= f.from && T.from < f.to && T.size != T.displaySize && T.from * this.heightOracle.charWidth + y < this.pixelViewport.left && (y = T.size - T.displaySize);
        let b = this.pixelViewport.left + y, C = this.pixelViewport.right + y, P, D;
        if (u != null) {
          let T = Pi(c, u), M = ((C - b) / 2 + m) / g;
          P = T - M, D = T + M;
        } else
          P = (b - m) / g, D = (C + m) / g;
        d = Li(c, P), p = Li(c, D);
      }
      d > f.from && a(f.from, d, f, c), p < f.to && a(p, f.to, f, c);
    };
    for (let f of this.viewportLines)
      Array.isArray(f.type) ? f.type.forEach(h) : h(f);
    return l;
  }
  gapSize(e, t, i, n) {
    let r = Pi(n, i) - Pi(n, t);
    return this.heightOracle.lineWrapping ? e.height * r : n.total * this.heightOracle.charWidth * r;
  }
  updateLineGaps(e) {
    $n.same(e, this.lineGaps) || (this.lineGaps = e, this.lineGapDeco = B.set(e.map((t) => t.draw(this, this.heightOracle.lineWrapping))));
  }
  computeVisibleRanges(e) {
    let t = this.stateDeco;
    this.lineGaps.length && (t = t.concat(this.lineGapDeco));
    let i = [];
    L.spans(t, this.viewport.from, this.viewport.to, {
      span(r, o) {
        i.push({ from: r, to: o });
      },
      point() {
      }
    }, 20);
    let n = 0;
    if (i.length != this.visibleRanges.length)
      n = 12;
    else
      for (let r = 0; r < i.length && !(n & 8); r++) {
        let o = this.visibleRanges[r], l = i[r];
        (o.from != l.from || o.to != l.to) && (n |= 4, e && e.mapPos(o.from, -1) == l.from && e.mapPos(o.to, 1) == l.to || (n |= 8));
      }
    return this.visibleRanges = i, n;
  }
  lineBlockAt(e) {
    return e >= this.viewport.from && e <= this.viewport.to && this.viewportLines.find((t) => t.from <= e && t.to >= e) || ei(this.heightMap.lineAt(e, z.ByPos, this.heightOracle, 0, 0), this.scaler);
  }
  lineBlockAtHeight(e) {
    return e >= this.viewportLines[0].top && e <= this.viewportLines[this.viewportLines.length - 1].bottom && this.viewportLines.find((t) => t.top <= e && t.bottom >= e) || ei(this.heightMap.lineAt(this.scaler.fromDOM(e), z.ByHeight, this.heightOracle, 0, 0), this.scaler);
  }
  getScrollOffset() {
    return (this.scrollParent == this.view.scrollDOM ? this.scrollParent.scrollTop : (this.scrollParent ? this.scrollParent.getBoundingClientRect().top : 0) - this.view.contentDOM.getBoundingClientRect().top) * this.scaleY;
  }
  scrollAnchorAt(e) {
    let t = this.lineBlockAtHeight(e + 8);
    return t.from >= this.viewport.from || this.viewportLines[0].top - e > 200 ? t : this.viewportLines[0];
  }
  elementAtHeight(e) {
    return ei(this.heightMap.blockAt(this.scaler.fromDOM(e), this.heightOracle, 0, 0), this.scaler);
  }
  get docHeight() {
    return this.scaler.toDOM(this.heightMap.height);
  }
  get contentHeight() {
    return this.docHeight + this.paddingTop + this.paddingBottom;
  }
}
class Ei {
  constructor(e, t) {
    this.from = e, this.to = t;
  }
}
function Oc(s, e, t) {
  let i = [], n = s, r = 0;
  return L.spans(t, s, e, {
    span() {
    },
    point(o, l) {
      o > n && (i.push({ from: n, to: o }), r += o - n), n = l;
    }
  }, 20), n < e && (i.push({ from: n, to: e }), r += e - n), { total: r, ranges: i };
}
function Li({ total: s, ranges: e }, t) {
  if (t <= 0)
    return e[0].from;
  if (t >= 1)
    return e[e.length - 1].to;
  let i = Math.floor(s * t);
  for (let n = 0; ; n++) {
    let { from: r, to: o } = e[n], l = o - r;
    if (i <= l)
      return r + i;
    i -= l;
  }
}
function Pi(s, e) {
  let t = 0;
  for (let { from: i, to: n } of s.ranges) {
    if (e <= n) {
      t += e - i;
      break;
    }
    t += n - i;
  }
  return t / s.total;
}
function Bc(s, e) {
  for (let t of s)
    if (e(t))
      return t;
}
const io = {
  toDOM(s) {
    return s;
  },
  fromDOM(s) {
    return s;
  },
  scale: 1,
  eq(s) {
    return s == this;
  }
};
function no(s) {
  let e = s.facet(Cn).filter((i) => typeof i != "function"), t = s.facet(sr).filter((i) => typeof i != "function");
  return t.length && e.push(L.join(t)), e;
}
class lr {
  constructor(e, t, i) {
    let n = 0, r = 0, o = 0;
    this.viewports = i.map(({ from: l, to: a }) => {
      let h = t.lineAt(l, z.ByPos, e, 0, 0).top, f = t.lineAt(a, z.ByPos, e, 0, 0).bottom;
      return n += f - h, { from: l, to: a, top: h, bottom: f, domTop: 0, domBottom: 0 };
    }), this.scale = (7e6 - n) / (t.height - n);
    for (let l of this.viewports)
      l.domTop = o + (l.top - r) * this.scale, o = l.domBottom = l.domTop + (l.bottom - l.top), r = l.bottom;
  }
  toDOM(e) {
    for (let t = 0, i = 0, n = 0; ; t++) {
      let r = t < this.viewports.length ? this.viewports[t] : null;
      if (!r || e < r.top)
        return n + (e - i) * this.scale;
      if (e <= r.bottom)
        return r.domTop + (e - r.top);
      i = r.bottom, n = r.domBottom;
    }
  }
  fromDOM(e) {
    for (let t = 0, i = 0, n = 0; ; t++) {
      let r = t < this.viewports.length ? this.viewports[t] : null;
      if (!r || e < r.domTop)
        return i + (e - n) / this.scale;
      if (e <= r.domBottom)
        return r.top + (e - r.domTop);
      i = r.bottom, n = r.domBottom;
    }
  }
  eq(e) {
    return e instanceof lr ? this.scale == e.scale && this.viewports.length == e.viewports.length && this.viewports.every((t, i) => t.from == e.viewports[i].from && t.to == e.viewports[i].to) : !1;
  }
}
function ei(s, e) {
  if (e.scale == 1)
    return s;
  let t = e.toDOM(s.top), i = e.toDOM(s.bottom);
  return new Ae(s.from, s.length, t, i - t, Array.isArray(s._content) ? s._content.map((n) => ei(n, e)) : s._content);
}
const Ri = /* @__PURE__ */ v.define({ combine: (s) => s.join(" ") }), Es = /* @__PURE__ */ v.define({ combine: (s) => s.indexOf(!0) > -1 }), Ls = /* @__PURE__ */ nt.newName(), ia = /* @__PURE__ */ nt.newName(), na = /* @__PURE__ */ nt.newName(), sa = { "&light": "." + ia, "&dark": "." + na };
function Ps(s, e, t) {
  return new nt(e, {
    finish(i) {
      return /&/.test(i) ? i.replace(/&\w*/, (n) => {
        if (n == "&")
          return s;
        if (!t || !t[n])
          throw new RangeError(`Unsupported selector: ${n}`);
        return t[n];
      }) : s + " " + i;
    }
  });
}
const Ec = /* @__PURE__ */ Ps("." + Ls, {
  "&": {
    position: "relative !important",
    boxSizing: "border-box",
    "&.cm-focused": {
      // Provide a simple default outline to make sure a focused
      // editor is visually distinct. Can't leave the default behavior
      // because that will apply to the content element, which is
      // inside the scrollable container and doesn't include the
      // gutters. We also can't use an 'auto' outline, since those
      // are, for some reason, drawn behind the element content, which
      // will cause things like the active line background to cover
      // the outline (#297).
      outline: "1px dotted #212121"
    },
    display: "flex !important",
    flexDirection: "column"
  },
  ".cm-scroller": {
    display: "flex !important",
    alignItems: "flex-start !important",
    fontFamily: "monospace",
    lineHeight: 1.4,
    height: "100%",
    overflowX: "auto",
    position: "relative",
    zIndex: 0,
    overflowAnchor: "none"
  },
  ".cm-content": {
    margin: 0,
    flexGrow: 2,
    flexShrink: 0,
    display: "block",
    whiteSpace: "pre",
    wordWrap: "normal",
    // Issue #456
    boxSizing: "border-box",
    minHeight: "100%",
    padding: "4px 0",
    outline: "none",
    "&[contenteditable=true]": {
      WebkitUserModify: "read-write-plaintext-only"
    }
  },
  ".cm-lineWrapping": {
    whiteSpace_fallback: "pre-wrap",
    // For IE
    whiteSpace: "break-spaces",
    wordBreak: "break-word",
    // For Safari, which doesn't support overflow-wrap: anywhere
    overflowWrap: "anywhere",
    flexShrink: 1
  },
  "&light .cm-content": { caretColor: "black" },
  "&dark .cm-content": { caretColor: "white" },
  ".cm-line": {
    display: "block",
    padding: "0 2px 0 6px"
  },
  ".cm-layer": {
    position: "absolute",
    left: 0,
    top: 0,
    contain: "size style",
    "& > *": {
      position: "absolute"
    }
  },
  "&light .cm-selectionBackground": {
    background: "#d9d9d9"
  },
  "&dark .cm-selectionBackground": {
    background: "#222"
  },
  "&light.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground": {
    background: "#d7d4f0"
  },
  "&dark.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground": {
    background: "#233"
  },
  ".cm-cursorLayer": {
    pointerEvents: "none"
  },
  "&.cm-focused > .cm-scroller > .cm-cursorLayer": {
    animation: "steps(1) cm-blink 1.2s infinite"
  },
  // Two animations defined so that we can switch between them to
  // restart the animation without forcing another style
  // recomputation.
  "@keyframes cm-blink": { "0%": {}, "50%": { opacity: 0 }, "100%": {} },
  "@keyframes cm-blink2": { "0%": {}, "50%": { opacity: 0 }, "100%": {} },
  ".cm-cursor, .cm-dropCursor": {
    borderLeft: "1.2px solid black",
    marginLeft: "-0.6px",
    pointerEvents: "none"
  },
  ".cm-cursor": {
    display: "none"
  },
  "&dark .cm-cursor": {
    borderLeftColor: "#ddd"
  },
  ".cm-selectionHandle": {
    backgroundColor: "currentColor",
    width: "1.5px"
  },
  ".cm-selectionHandle-start::before, .cm-selectionHandle-end::before": {
    content: '""',
    backgroundColor: "inherit",
    borderRadius: "50%",
    width: "8px",
    height: "8px",
    position: "absolute",
    left: "-3.25px"
  },
  ".cm-selectionHandle-start::before": { top: "-8px" },
  ".cm-selectionHandle-end::before": { bottom: "-8px" },
  ".cm-dropCursor": {
    position: "absolute"
  },
  "&.cm-focused > .cm-scroller > .cm-cursorLayer .cm-cursor": {
    display: "block"
  },
  ".cm-iso": {
    unicodeBidi: "isolate"
  },
  ".cm-announced": {
    position: "fixed",
    top: "-10000px"
  },
  "@media print": {
    ".cm-announced": { display: "none" }
  },
  "&light .cm-activeLine": { backgroundColor: "#cceeff44" },
  "&dark .cm-activeLine": { backgroundColor: "#99eeff33" },
  "&light .cm-specialChar": { color: "red" },
  "&dark .cm-specialChar": { color: "#f78" },
  ".cm-gutters": {
    flexShrink: 0,
    display: "flex",
    height: "100%",
    boxSizing: "border-box",
    zIndex: 200
  },
  ".cm-gutters-before": { insetInlineStart: 0 },
  ".cm-gutters-after": { insetInlineEnd: 0 },
  "&light .cm-gutters": {
    backgroundColor: "#f5f5f5",
    color: "#6c6c6c",
    border: "0px solid #ddd",
    "&.cm-gutters-before": { borderRightWidth: "1px" },
    "&.cm-gutters-after": { borderLeftWidth: "1px" }
  },
  "&dark .cm-gutters": {
    backgroundColor: "#333338",
    color: "#ccc"
  },
  ".cm-gutter": {
    display: "flex !important",
    // Necessary -- prevents margin collapsing
    flexDirection: "column",
    flexShrink: 0,
    boxSizing: "border-box",
    minHeight: "100%",
    overflow: "hidden"
  },
  ".cm-gutterElement": {
    boxSizing: "border-box"
  },
  ".cm-lineNumbers .cm-gutterElement": {
    padding: "0 3px 0 5px",
    minWidth: "20px",
    textAlign: "right",
    whiteSpace: "nowrap"
  },
  "&light .cm-activeLineGutter": {
    backgroundColor: "#e2f2ff"
  },
  "&dark .cm-activeLineGutter": {
    backgroundColor: "#222227"
  },
  ".cm-panels": {
    boxSizing: "border-box",
    position: "sticky",
    left: 0,
    right: 0,
    zIndex: 300
  },
  "&light .cm-panels": {
    backgroundColor: "#f5f5f5",
    color: "black"
  },
  "&light .cm-panels-top": {
    borderBottom: "1px solid #ddd"
  },
  "&light .cm-panels-bottom": {
    borderTop: "1px solid #ddd"
  },
  "&dark .cm-panels": {
    backgroundColor: "#333338",
    color: "white"
  },
  ".cm-dialog": {
    padding: "2px 19px 4px 6px",
    position: "relative",
    "& label": { fontSize: "80%" }
  },
  ".cm-dialog-close": {
    position: "absolute",
    top: "3px",
    right: "4px",
    backgroundColor: "inherit",
    border: "none",
    font: "inherit",
    fontSize: "14px",
    padding: "0"
  },
  ".cm-tab": {
    display: "inline-block",
    overflow: "hidden",
    verticalAlign: "bottom"
  },
  ".cm-widgetBuffer": {
    verticalAlign: "text-top",
    height: "1em",
    width: 0,
    display: "inline"
  },
  ".cm-placeholder": {
    color: "#888",
    display: "inline-block",
    verticalAlign: "top",
    userSelect: "none"
  },
  ".cm-highlightSpace": {
    backgroundImage: "radial-gradient(circle at 50% 55%, #aaa 20%, transparent 5%)",
    backgroundPosition: "center"
  },
  ".cm-highlightTab": {
    backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="20"><path stroke="%23888" stroke-width="1" fill="none" d="M1 10H196L190 5M190 15L196 10M197 4L197 16"/></svg>')`,
    backgroundSize: "auto 100%",
    backgroundPosition: "right 90%",
    backgroundRepeat: "no-repeat"
  },
  ".cm-trailingSpace": {
    backgroundColor: "#ff332255"
  },
  ".cm-button": {
    verticalAlign: "middle",
    color: "inherit",
    fontSize: "70%",
    padding: ".2em 1em",
    borderRadius: "1px"
  },
  "&light .cm-button": {
    backgroundImage: "linear-gradient(#eff1f5, #d9d9df)",
    border: "1px solid #888",
    "&:active": {
      backgroundImage: "linear-gradient(#b4b4b4, #d0d3d6)"
    }
  },
  "&dark .cm-button": {
    backgroundImage: "linear-gradient(#393939, #111)",
    border: "1px solid #888",
    "&:active": {
      backgroundImage: "linear-gradient(#111, #333)"
    }
  },
  ".cm-textfield": {
    verticalAlign: "middle",
    color: "inherit",
    fontSize: "70%",
    border: "1px solid silver",
    padding: ".2em .5em"
  },
  "&light .cm-textfield": {
    backgroundColor: "white"
  },
  "&dark .cm-textfield": {
    border: "1px solid #555",
    backgroundColor: "inherit"
  }
}, sa), Lc = {
  childList: !0,
  characterData: !0,
  subtree: !0,
  attributes: !0,
  characterDataOldValue: !0
}, Un = S.ie && S.ie_version <= 11;
class Pc {
  constructor(e) {
    this.view = e, this.active = !1, this.editContext = null, this.selectionRange = new lf(), this.selectionChanged = !1, this.delayedFlush = -1, this.resizeTimeout = -1, this.queue = [], this.delayedAndroidKey = null, this.flushingAndroidKey = -1, this.lastChange = 0, this.scrollTargets = [], this.intersection = null, this.resizeScroll = null, this.intersecting = !1, this.gapIntersection = null, this.gaps = [], this.printQuery = null, this.parentCheck = -1, this.dom = e.contentDOM, this.observer = new MutationObserver((t) => {
      for (let i of t)
        this.queue.push(i);
      (S.ie && S.ie_version <= 11 || S.ios && e.composing) && t.some((i) => i.type == "childList" && i.removedNodes.length || i.type == "characterData" && i.oldValue.length > i.target.nodeValue.length) ? this.flushSoon() : this.flush();
    }), window.EditContext && S.android && e.constructor.EDIT_CONTEXT !== !1 && // Chrome <126 doesn't support inverted selections in edit context (#1392)
    !(S.chrome && S.chrome_version < 126) && (this.editContext = new Ic(e), e.state.facet(Ue) && (e.contentDOM.editContext = this.editContext.editContext)), Un && (this.onCharData = (t) => {
      this.queue.push({
        target: t.target,
        type: "characterData",
        oldValue: t.prevValue
      }), this.flushSoon();
    }), this.onSelectionChange = this.onSelectionChange.bind(this), this.onResize = this.onResize.bind(this), this.onPrint = this.onPrint.bind(this), this.onScroll = this.onScroll.bind(this), window.matchMedia && (this.printQuery = window.matchMedia("print")), typeof ResizeObserver == "function" && (this.resizeScroll = new ResizeObserver(() => {
      var t;
      ((t = this.view.docView) === null || t === void 0 ? void 0 : t.lastUpdate) < Date.now() - 75 && this.onResize();
    }), this.resizeScroll.observe(e.scrollDOM)), this.addWindowListeners(this.win = e.win), this.start(), typeof IntersectionObserver == "function" && (this.intersection = new IntersectionObserver((t) => {
      this.parentCheck < 0 && (this.parentCheck = setTimeout(this.listenForScroll.bind(this), 1e3)), t.length > 0 && t[t.length - 1].intersectionRatio > 0 != this.intersecting && (this.intersecting = !this.intersecting, this.intersecting != this.view.inView && this.onScrollChanged(document.createEvent("Event")));
    }, { threshold: [0, 1e-3] }), this.intersection.observe(this.dom), this.gapIntersection = new IntersectionObserver((t) => {
      t.length > 0 && t[t.length - 1].intersectionRatio > 0 && this.onScrollChanged(document.createEvent("Event"));
    }, {})), this.listenForScroll(), this.readSelectionRange();
  }
  onScrollChanged(e) {
    this.view.inputState.runHandlers("scroll", e), this.intersecting && this.view.measure();
  }
  onScroll(e) {
    this.intersecting && this.flush(!1), this.editContext && this.view.requestMeasure(this.editContext.measureReq), this.onScrollChanged(e);
  }
  onResize() {
    this.resizeTimeout < 0 && (this.resizeTimeout = setTimeout(() => {
      this.resizeTimeout = -1, this.view.requestMeasure();
    }, 50));
  }
  onPrint(e) {
    (e.type == "change" || !e.type) && !e.matches || (this.view.viewState.printing = !0, this.view.measure(), setTimeout(() => {
      this.view.viewState.printing = !1, this.view.requestMeasure();
    }, 500));
  }
  updateGaps(e) {
    if (this.gapIntersection && (e.length != this.gaps.length || this.gaps.some((t, i) => t != e[i]))) {
      this.gapIntersection.disconnect();
      for (let t of e)
        this.gapIntersection.observe(t);
      this.gaps = e;
    }
  }
  onSelectionChange(e) {
    let t = this.selectionChanged;
    if (!this.readSelectionRange() || this.delayedAndroidKey)
      return;
    let { view: i } = this, n = this.selectionRange;
    if (i.state.facet(Ue) ? i.root.activeElement != this.dom : !ni(this.dom, n))
      return;
    let r = n.anchorNode && i.docView.tile.nearest(n.anchorNode);
    if (r && r.isWidget() && r.widget.ignoreEvent(e)) {
      t || (this.selectionChanged = !1);
      return;
    }
    (S.ie && S.ie_version <= 11 || S.android && S.chrome) && !i.state.selection.main.empty && // (Selection.isCollapsed isn't reliable on IE)
    n.focusNode && si(n.focusNode, n.focusOffset, n.anchorNode, n.anchorOffset) ? this.flushSoon() : this.flush(!1);
  }
  readSelectionRange() {
    let { view: e } = this, t = ci(e.root);
    if (!t)
      return !1;
    let i = S.safari && e.root.nodeType == 11 && e.root.activeElement == this.dom && Rc(this.view, t) || t;
    if (!i || this.selectionRange.eq(i))
      return !1;
    let n = ni(this.dom, i);
    return n && !this.selectionChanged && e.inputState.lastFocusTime > Date.now() - 200 && e.inputState.lastTouchTime < Date.now() - 300 && hf(this.dom, i) ? (this.view.inputState.lastFocusTime = 0, e.docView.updateSelection(), !1) : (this.selectionRange.setRange(i), n && (this.selectionChanged = !0), !0);
  }
  setSelectionRange(e, t) {
    this.selectionRange.set(e.node, e.offset, t.node, t.offset), this.selectionChanged = !1;
  }
  clearSelectionRange() {
    this.selectionRange.set(null, 0, null, 0);
  }
  listenForScroll() {
    this.parentCheck = -1;
    let e = 0, t = null;
    for (let i = this.dom; i; )
      if (i.nodeType == 1)
        !t && e < this.scrollTargets.length && this.scrollTargets[e] == i ? e++ : t || (t = this.scrollTargets.slice(0, e)), t && t.push(i), i = i.assignedSlot || i.parentNode;
      else if (i.nodeType == 11)
        i = i.host;
      else
        break;
    if (e < this.scrollTargets.length && !t && (t = this.scrollTargets.slice(0, e)), t) {
      for (let i of this.scrollTargets)
        i.removeEventListener("scroll", this.onScroll);
      for (let i of this.scrollTargets = t)
        i.addEventListener("scroll", this.onScroll);
    }
  }
  ignore(e) {
    if (!this.active)
      return e();
    try {
      return this.stop(), e();
    } finally {
      this.start(), this.clear();
    }
  }
  start() {
    this.active || (this.observer.observe(this.dom, Lc), Un && this.dom.addEventListener("DOMCharacterDataModified", this.onCharData), this.active = !0);
  }
  stop() {
    this.active && (this.active = !1, this.observer.disconnect(), Un && this.dom.removeEventListener("DOMCharacterDataModified", this.onCharData));
  }
  // Throw away any pending changes
  clear() {
    this.processRecords(), this.queue.length = 0, this.selectionChanged = !1;
  }
  // Chrome Android, especially in combination with GBoard, not only
  // doesn't reliably fire regular key events, but also often
  // surrounds the effect of enter or backspace with a bunch of
  // composition events that, when interrupted, cause text duplication
  // or other kinds of corruption. This hack makes the editor back off
  // from handling DOM changes for a moment when such a key is
  // detected (via beforeinput or keydown), and then tries to flush
  // them or, if that has no effect, dispatches the given key.
  delayAndroidKey(e, t) {
    var i;
    if (!this.delayedAndroidKey) {
      let n = () => {
        let r = this.delayedAndroidKey;
        r && (this.clearDelayedAndroidKey(), this.view.inputState.lastKeyCode = r.keyCode, this.view.inputState.lastKeyTime = Date.now(), !this.flush() && r.force && Lt(this.dom, r.key, r.keyCode));
      };
      this.flushingAndroidKey = this.view.win.requestAnimationFrame(n);
    }
    (!this.delayedAndroidKey || e == "Enter") && (this.delayedAndroidKey = {
      key: e,
      keyCode: t,
      // Only run the key handler when no changes are detected if
      // this isn't coming right after another change, in which case
      // it is probably part of a weird chain of updates, and should
      // be ignored if it returns the DOM to its previous state.
      force: this.lastChange < Date.now() - 50 || !!(!((i = this.delayedAndroidKey) === null || i === void 0) && i.force)
    });
  }
  clearDelayedAndroidKey() {
    this.win.cancelAnimationFrame(this.flushingAndroidKey), this.delayedAndroidKey = null, this.flushingAndroidKey = -1;
  }
  flushSoon() {
    this.delayedFlush < 0 && (this.delayedFlush = this.view.win.requestAnimationFrame(() => {
      this.delayedFlush = -1, this.flush();
    }));
  }
  forceFlush() {
    this.delayedFlush >= 0 && (this.view.win.cancelAnimationFrame(this.delayedFlush), this.delayedFlush = -1), this.flush();
  }
  pendingRecords() {
    for (let e of this.observer.takeRecords())
      this.queue.push(e);
    return this.queue;
  }
  processRecords() {
    let e = this.pendingRecords();
    e.length && (this.queue = []);
    let t = -1, i = -1, n = !1;
    for (let r of e) {
      let o = this.readMutation(r);
      o && (o.typeOver && (n = !0), t == -1 ? { from: t, to: i } = o : (t = Math.min(o.from, t), i = Math.max(o.to, i)));
    }
    return { from: t, to: i, typeOver: n };
  }
  readChange() {
    let { from: e, to: t, typeOver: i } = this.processRecords(), n = this.selectionChanged && ni(this.dom, this.selectionRange);
    if (e < 0 && !n)
      return null;
    e > -1 && (this.lastChange = Date.now()), this.view.inputState.lastFocusTime = 0, this.selectionChanged = !1;
    let r = new Qf(this.view, e, t, i);
    return this.view.docView.domChanged = { newSel: r.newSel ? r.newSel.main : null }, r;
  }
  // Apply pending changes, if any
  flush(e = !0) {
    if (this.delayedFlush >= 0 || this.delayedAndroidKey)
      return !1;
    e && this.readSelectionRange();
    let t = this.readChange();
    if (!t)
      return this.view.requestMeasure(), !1;
    let i = this.view.state, n = $l(this.view, t);
    return this.view.state == i && (t.domChanged || t.newSel && !rn(this.view.state.selection, t.newSel.main)) && this.view.update([]), n;
  }
  readMutation(e) {
    let t = this.view.docView.tile.nearest(e.target);
    if (!t || t.isWidget())
      return null;
    if (t.markDirty(e.type == "attributes"), e.type == "childList") {
      let i = so(t, e.previousSibling || e.target.previousSibling, -1), n = so(t, e.nextSibling || e.target.nextSibling, 1);
      return {
        from: i ? t.posAfter(i) : t.posAtStart,
        to: n ? t.posBefore(n) : t.posAtEnd,
        typeOver: !1
      };
    } else return e.type == "characterData" ? { from: t.posAtStart, to: t.posAtEnd, typeOver: e.target.nodeValue == e.oldValue } : null;
  }
  setWindow(e) {
    e != this.win && (this.removeWindowListeners(this.win), this.win = e, this.addWindowListeners(this.win));
  }
  addWindowListeners(e) {
    e.addEventListener("resize", this.onResize), this.printQuery ? this.printQuery.addEventListener ? this.printQuery.addEventListener("change", this.onPrint) : this.printQuery.addListener(this.onPrint) : e.addEventListener("beforeprint", this.onPrint), e.addEventListener("scroll", this.onScroll), e.document.addEventListener("selectionchange", this.onSelectionChange);
  }
  removeWindowListeners(e) {
    e.removeEventListener("scroll", this.onScroll), e.removeEventListener("resize", this.onResize), this.printQuery ? this.printQuery.removeEventListener ? this.printQuery.removeEventListener("change", this.onPrint) : this.printQuery.removeListener(this.onPrint) : e.removeEventListener("beforeprint", this.onPrint), e.document.removeEventListener("selectionchange", this.onSelectionChange);
  }
  update(e) {
    this.editContext && (this.editContext.update(e), e.startState.facet(Ue) != e.state.facet(Ue) && (e.view.contentDOM.editContext = e.state.facet(Ue) ? this.editContext.editContext : null));
  }
  destroy() {
    var e, t, i;
    this.stop(), (e = this.intersection) === null || e === void 0 || e.disconnect(), (t = this.gapIntersection) === null || t === void 0 || t.disconnect(), (i = this.resizeScroll) === null || i === void 0 || i.disconnect();
    for (let n of this.scrollTargets)
      n.removeEventListener("scroll", this.onScroll);
    this.removeWindowListeners(this.win), clearTimeout(this.parentCheck), clearTimeout(this.resizeTimeout), this.win.cancelAnimationFrame(this.delayedFlush), this.win.cancelAnimationFrame(this.flushingAndroidKey), this.editContext && (this.view.contentDOM.editContext = null, this.editContext.destroy());
  }
}
function so(s, e, t) {
  for (; e; ) {
    let i = U.get(e);
    if (i && i.parent == s)
      return i;
    let n = e.parentNode;
    e = n != s.dom ? n : t > 0 ? e.nextSibling : e.previousSibling;
  }
  return null;
}
function ro(s, e) {
  let t = e.startContainer, i = e.startOffset, n = e.endContainer, r = e.endOffset, o = s.docView.domAtPos(s.state.selection.main.anchor, 1);
  return si(o.node, o.offset, n, r) && ([t, i, n, r] = [n, r, t, i]), { anchorNode: t, anchorOffset: i, focusNode: n, focusOffset: r };
}
function Rc(s, e) {
  if (e.getComposedRanges) {
    let n = e.getComposedRanges(s.root)[0];
    if (n)
      return ro(s, n);
  }
  let t = null;
  function i(n) {
    n.preventDefault(), n.stopImmediatePropagation(), t = n.getTargetRanges()[0];
  }
  return s.contentDOM.addEventListener("beforeinput", i, !0), s.dom.ownerDocument.execCommand("indent"), s.contentDOM.removeEventListener("beforeinput", i, !0), t ? ro(s, t) : null;
}
class Ic {
  constructor(e) {
    this.from = 0, this.to = 0, this.pendingContextChange = null, this.handlers = /* @__PURE__ */ Object.create(null), this.composing = null, this.resetRange(e.state);
    let t = this.editContext = new window.EditContext({
      text: e.state.doc.sliceString(this.from, this.to),
      selectionStart: this.toContextPos(Math.max(this.from, Math.min(this.to, e.state.selection.main.anchor))),
      selectionEnd: this.toContextPos(e.state.selection.main.head)
    });
    this.handlers.textupdate = (i) => {
      let n = e.state.selection.main, { anchor: r, head: o } = n, l = this.toEditorPos(i.updateRangeStart), a = this.toEditorPos(i.updateRangeEnd);
      e.inputState.composing >= 0 && !this.composing && (this.composing = { contextBase: i.updateRangeStart, editorBase: l, drifted: !1 });
      let h = a - l > i.text.length;
      l == this.from && r < this.from ? l = r : a == this.to && r > this.to && (a = r);
      let f = Ul(e.state.sliceDoc(l, a), i.text, (h ? n.from : n.to) - l, h ? "end" : null);
      if (!f) {
        let u = x.single(this.toEditorPos(i.selectionStart), this.toEditorPos(i.selectionEnd));
        rn(u, n) || e.dispatch({ selection: u, userEvent: "select" });
        return;
      }
      let c = {
        from: f.from + l,
        to: f.toA + l,
        insert: N.of(i.text.slice(f.from, f.toB).split(`
`))
      };
      if ((S.mac || S.android) && c.from == o - 1 && /^\. ?$/.test(i.text) && e.contentDOM.getAttribute("autocorrect") == "off" && (c = { from: l, to: a, insert: N.of([i.text.replace(".", " ")]) }), this.pendingContextChange = c, !e.state.readOnly) {
        let u = this.to - this.from + (c.to - c.from + c.insert.length);
        rr(e, c, x.single(this.toEditorPos(i.selectionStart, u), this.toEditorPos(i.selectionEnd, u)));
      }
      this.pendingContextChange && (this.revertPending(e.state), this.setSelection(e.state)), c.from < c.to && !c.insert.length && e.inputState.composing >= 0 && !/[\\p{Alphabetic}\\p{Number}_]/.test(t.text.slice(Math.max(0, i.updateRangeStart - 1), Math.min(t.text.length, i.updateRangeStart + 1))) && this.handlers.compositionend(i);
    }, this.handlers.characterboundsupdate = (i) => {
      let n = [], r = null;
      for (let o = this.toEditorPos(i.rangeStart), l = this.toEditorPos(i.rangeEnd); o < l; o++) {
        let a = e.coordsForChar(o);
        r = a && new DOMRect(a.left, a.top, a.right - a.left, a.bottom - a.top) || r || new DOMRect(), n.push(r);
      }
      t.updateCharacterBounds(i.rangeStart, n);
    }, this.handlers.textformatupdate = (i) => {
      let n = [];
      for (let r of i.getTextFormats()) {
        let o = r.underlineStyle, l = r.underlineThickness;
        if (!/none/i.test(o) && !/none/i.test(l)) {
          let a = this.toEditorPos(r.rangeStart), h = this.toEditorPos(r.rangeEnd);
          if (a < h) {
            let f = `text-decoration: underline ${/^[a-z]/.test(o) ? o + " " : o == "Dashed" ? "dashed " : o == "Squiggle" ? "wavy " : ""}${/thin/i.test(l) ? 1 : 2}px`;
            n.push(B.mark({ attributes: { style: f } }).range(a, h));
          }
        }
      }
      e.dispatch({ effects: Il.of(B.set(n)) });
    }, this.handlers.compositionstart = () => {
      e.inputState.composing < 0 && (e.inputState.composing = 0, e.inputState.compositionFirstChange = !0);
    }, this.handlers.compositionend = () => {
      if (e.inputState.composing = -1, e.inputState.compositionFirstChange = null, this.composing) {
        let { drifted: i } = this.composing;
        this.composing = null, i && this.reset(e.state);
      }
    };
    for (let i in this.handlers)
      t.addEventListener(i, this.handlers[i]);
    this.measureReq = { read: (i) => {
      this.editContext.updateControlBounds(i.contentDOM.getBoundingClientRect());
      let n = ci(i.root);
      n && n.rangeCount && this.editContext.updateSelectionBounds(n.getRangeAt(0).getBoundingClientRect());
    } };
  }
  applyEdits(e) {
    let t = 0, i = !1, n = this.pendingContextChange;
    return e.changes.iterChanges((r, o, l, a, h) => {
      if (i)
        return;
      let f = h.length - (o - r);
      if (n && o >= n.to)
        if (n.from == r && n.to == o && n.insert.eq(h)) {
          n = this.pendingContextChange = null, t += f, this.to += f;
          return;
        } else
          n = null, this.revertPending(e.state);
      if (r += t, o += t, o <= this.from)
        this.from += f, this.to += f;
      else if (r < this.to) {
        if (r < this.from || o > this.to || this.to - this.from + h.length > 3e4) {
          i = !0;
          return;
        }
        this.editContext.updateText(this.toContextPos(r), this.toContextPos(o), h.toString()), this.to += f;
      }
      t += f;
    }), n && !i && this.revertPending(e.state), !i;
  }
  update(e) {
    let t = this.pendingContextChange, i = e.startState.selection.main;
    this.composing && (this.composing.drifted || !e.changes.touchesRange(i.from, i.to) && e.transactions.some((n) => !n.isUserEvent("input.type") && n.changes.touchesRange(this.from, this.to))) ? (this.composing.drifted = !0, this.composing.editorBase = e.changes.mapPos(this.composing.editorBase)) : !this.applyEdits(e) || !this.rangeIsValid(e.state) ? (this.pendingContextChange = null, this.reset(e.state)) : (e.docChanged || e.selectionSet || t) && this.setSelection(e.state), (e.geometryChanged || e.docChanged || e.selectionSet) && e.view.requestMeasure(this.measureReq);
  }
  resetRange(e) {
    let { head: t } = e.selection.main;
    this.from = Math.max(
      0,
      t - 1e4
      /* CxVp.Margin */
    ), this.to = Math.min(
      e.doc.length,
      t + 1e4
      /* CxVp.Margin */
    );
  }
  reset(e) {
    this.resetRange(e), this.editContext.updateText(0, this.editContext.text.length, e.doc.sliceString(this.from, this.to)), this.setSelection(e);
  }
  revertPending(e) {
    let t = this.pendingContextChange;
    this.pendingContextChange = null, this.editContext.updateText(this.toContextPos(t.from), this.toContextPos(t.from + t.insert.length), e.doc.sliceString(t.from, t.to));
  }
  setSelection(e) {
    let { main: t } = e.selection, i = this.toContextPos(Math.max(this.from, Math.min(this.to, t.anchor))), n = this.toContextPos(t.head);
    (this.editContext.selectionStart != i || this.editContext.selectionEnd != n) && this.editContext.updateSelection(i, n);
  }
  rangeIsValid(e) {
    let { head: t } = e.selection.main;
    return !(this.from > 0 && t - this.from < 500 || this.to < e.doc.length && this.to - t < 500 || this.to - this.from > 1e4 * 3);
  }
  toEditorPos(e, t = this.to - this.from) {
    e = Math.min(e, t);
    let i = this.composing;
    return i && i.drifted ? i.editorBase + (e - i.contextBase) : e + this.from;
  }
  toContextPos(e) {
    let t = this.composing;
    return t && t.drifted ? t.contextBase + (e - t.editorBase) : e - this.from;
  }
  destroy() {
    for (let e in this.handlers)
      this.editContext.removeEventListener(e, this.handlers[e]);
  }
}
class A {
  /**
  The current editor state.
  */
  get state() {
    return this.viewState.state;
  }
  /**
  To be able to display large documents without consuming too much
  memory or overloading the browser, CodeMirror only draws the
  code that is visible (plus a margin around it) to the DOM. This
  property tells you the extent of the current drawn viewport, in
  document positions.
  */
  get viewport() {
    return this.viewState.viewport;
  }
  /**
  When there are, for example, large collapsed ranges in the
  viewport, its size can be a lot bigger than the actual visible
  content. Thus, if you are doing something like styling the
  content in the viewport, it is preferable to only do so for
  these ranges, which are the subset of the viewport that is
  actually drawn.
  */
  get visibleRanges() {
    return this.viewState.visibleRanges;
  }
  /**
  Returns false when the editor is entirely scrolled out of view
  or otherwise hidden.
  */
  get inView() {
    return this.viewState.inView;
  }
  /**
  Indicates whether the user is currently composing text via
  [IME](https://en.wikipedia.org/wiki/Input_method), and at least
  one change has been made in the current composition.
  */
  get composing() {
    return !!this.inputState && this.inputState.composing > 0;
  }
  /**
  Indicates whether the user is currently in composing state. Note
  that on some platforms, like Android, this will be the case a
  lot, since just putting the cursor on a word starts a
  composition there.
  */
  get compositionStarted() {
    return !!this.inputState && this.inputState.composing >= 0;
  }
  /**
  The document or shadow root that the view lives in.
  */
  get root() {
    return this._root;
  }
  /**
  @internal
  */
  get win() {
    return this.dom.ownerDocument.defaultView || window;
  }
  /**
  Construct a new view. You'll want to either provide a `parent`
  option, or put `view.dom` into your document after creating a
  view, so that the user can see the editor.
  */
  constructor(e = {}) {
    var t;
    this.plugins = [], this.pluginMap = /* @__PURE__ */ new Map(), this.editorAttrs = {}, this.contentAttrs = {}, this.bidiCache = [], this.destroyed = !1, this.updateState = 2, this.measureScheduled = -1, this.measureRequests = [], this.contentDOM = document.createElement("div"), this.scrollDOM = document.createElement("div"), this.scrollDOM.tabIndex = -1, this.scrollDOM.className = "cm-scroller", this.scrollDOM.appendChild(this.contentDOM), this.announceDOM = document.createElement("div"), this.announceDOM.className = "cm-announced", this.announceDOM.setAttribute("aria-live", "polite"), this.dom = document.createElement("div"), this.dom.appendChild(this.announceDOM), this.dom.appendChild(this.scrollDOM), e.parent && e.parent.appendChild(this.dom);
    let { dispatch: i } = e;
    this.dispatchTransactions = e.dispatchTransactions || i && ((n) => n.forEach((r) => i(r, this))) || ((n) => this.update(n)), this.dispatch = this.dispatch.bind(this), this._root = e.root || af(e.parent) || document, this.viewState = new to(this, e.state || I.create(e)), e.scrollTo && e.scrollTo.is(Ti) && (this.viewState.scrollTarget = e.scrollTo.value.clip(this.viewState.state)), this.plugins = this.state.facet(Dt).map((n) => new Vn(n));
    for (let n of this.plugins)
      n.update(this);
    this.observer = new Pc(this), this.inputState = new ic(this), this.inputState.ensureHandlers(this.plugins), this.docView = new qr(this), this.mountStyles(), this.updateAttrs(), this.updateState = 0, this.requestMeasure(), !((t = document.fonts) === null || t === void 0) && t.ready && document.fonts.ready.then(() => {
      this.viewState.mustMeasureContent = "refresh", this.requestMeasure();
    });
  }
  dispatch(...e) {
    let t = e.length == 1 && e[0] instanceof Q ? e : e.length == 1 && Array.isArray(e[0]) ? e[0] : [this.state.update(...e)];
    this.dispatchTransactions(t, this);
  }
  /**
  Update the view for the given array of transactions. This will
  update the visible document and selection to match the state
  produced by the transactions, and notify view plugins of the
  change. You should usually call
  [`dispatch`](https://codemirror.net/6/docs/ref/#view.EditorView.dispatch) instead, which uses this
  as a primitive.
  */
  update(e) {
    if (this.updateState != 0)
      throw new Error("Calls to EditorView.update are not allowed while an update is in progress");
    let t = !1, i = !1, n, r = this.state;
    for (let u of e) {
      if (u.startState != r)
        throw new RangeError("Trying to update state with a transaction that doesn't start from the previous state.");
      r = u.state;
    }
    if (this.destroyed) {
      this.viewState.state = r;
      return;
    }
    let o = this.hasFocus, l = 0, a = null;
    e.some((u) => u.annotation(Ql)) ? (this.inputState.notifiedFocused = o, l = 1) : o != this.inputState.notifiedFocused && (this.inputState.notifiedFocused = o, a = Zl(r, o), a || (l = 1));
    let h = this.observer.delayedAndroidKey, f = null;
    if (h ? (this.observer.clearDelayedAndroidKey(), f = this.observer.readChange(), (f && !this.state.doc.eq(r.doc) || !this.state.selection.eq(r.selection)) && (f = null)) : this.observer.clear(), r.facet(I.phrases) != this.state.facet(I.phrases))
      return this.setState(r);
    n = tn.create(this, r, e), n.flags |= l;
    let c = this.viewState.scrollTarget;
    try {
      this.updateState = 2;
      for (let u of e) {
        if (c && (c = c.map(u.changes)), u.scrollIntoView) {
          let { main: d } = u.state.selection, { x: p, y: g } = this.state.facet(A.cursorScrollMargin);
          c = new Pt(d.empty ? d : x.cursor(d.head, d.head > d.anchor ? -1 : 1), "nearest", "nearest", g, p);
        }
        for (let d of u.effects)
          d.is(Ti) && (c = d.value.clip(this.state));
      }
      this.viewState.update(n, c), this.bidiCache = ln.update(this.bidiCache, n.changes), n.empty || (this.updatePlugins(n), this.inputState.update(n)), t = this.docView.update(n), this.state.facet(Zt) != this.styleModules && this.mountStyles(), i = this.updateAttrs(), this.showAnnouncements(e), this.docView.updateSelection(t, e.some((u) => u.isUserEvent("select.pointer")));
    } finally {
      this.updateState = 0;
    }
    if (n.startState.facet(Ri) != n.state.facet(Ri) && (this.viewState.mustMeasureContent = !0), (t || i || c || this.viewState.mustEnforceCursorAssoc || this.viewState.mustMeasureContent) && this.requestMeasure(), t && this.docViewUpdate(), !n.empty)
      for (let u of this.state.facet(Ds))
        try {
          u(n);
        } catch (d) {
          Ve(this.state, d, "update listener");
        }
    (a || f) && Promise.resolve().then(() => {
      a && this.state == a.startState && this.dispatch(a), f && !$l(this, f) && h.force && Lt(this.contentDOM, h.key, h.keyCode);
    });
  }
  /**
  Reset the view to the given state. (This will cause the entire
  document to be redrawn and all view plugins to be reinitialized,
  so you should probably only use it when the new state isn't
  derived from the old state. Otherwise, use
  [`dispatch`](https://codemirror.net/6/docs/ref/#view.EditorView.dispatch) instead.)
  */
  setState(e) {
    if (this.updateState != 0)
      throw new Error("Calls to EditorView.setState are not allowed while an update is in progress");
    if (this.destroyed) {
      this.viewState.state = e;
      return;
    }
    this.updateState = 2;
    let t = this.hasFocus;
    try {
      for (let i of this.plugins)
        i.destroy(this);
      this.viewState = new to(this, e), this.plugins = e.facet(Dt).map((i) => new Vn(i)), this.pluginMap.clear();
      for (let i of this.plugins)
        i.update(this);
      this.docView.destroy(), this.docView = new qr(this), this.inputState.ensureHandlers(this.plugins), this.mountStyles(), this.updateAttrs(), this.bidiCache = [];
    } finally {
      this.updateState = 0;
    }
    t && this.focus(), this.requestMeasure();
  }
  updatePlugins(e) {
    let t = e.startState.facet(Dt), i = e.state.facet(Dt);
    if (t != i) {
      let n = [];
      for (let r of i) {
        let o = t.indexOf(r);
        if (o < 0)
          n.push(new Vn(r));
        else {
          let l = this.plugins[o];
          l.mustUpdate = e, n.push(l);
        }
      }
      for (let r of this.plugins)
        r.mustUpdate != e && r.destroy(this);
      this.plugins = n, this.pluginMap.clear();
    } else
      for (let n of this.plugins)
        n.mustUpdate = e;
    for (let n = 0; n < this.plugins.length; n++)
      this.plugins[n].update(this);
    t != i && this.inputState.ensureHandlers(this.plugins);
  }
  docViewUpdate() {
    for (let e of this.plugins) {
      let t = e.value;
      if (t && t.docViewUpdate)
        try {
          t.docViewUpdate(this);
        } catch (i) {
          Ve(this.state, i, "doc view update listener");
        }
    }
  }
  /**
  @internal
  */
  measure(e = !0) {
    if (this.destroyed)
      return;
    if (this.measureScheduled > -1 && this.win.cancelAnimationFrame(this.measureScheduled), this.observer.delayedAndroidKey) {
      this.measureScheduled = -1, this.requestMeasure();
      return;
    }
    this.measureScheduled = 0, e && this.observer.forceFlush();
    let t = null, i = this.viewState.scrollParent, n = this.viewState.getScrollOffset(), { scrollAnchorPos: r, scrollAnchorHeight: o } = this.viewState;
    Math.abs(n - this.viewState.scrollOffset) > 1 && (o = -1), this.viewState.scrollAnchorHeight = -1;
    try {
      for (let l = 0; ; l++) {
        if (o < 0)
          if (bl(i || this.win))
            r = -1, o = this.viewState.heightMap.height;
          else {
            let d = this.viewState.scrollAnchorAt(n);
            r = d.from, o = d.top;
          }
        this.updateState = 1;
        let a = this.viewState.measure();
        if (!a && !this.measureRequests.length && this.viewState.scrollTarget == null)
          break;
        if (l > 5) {
          console.warn(this.measureRequests.length ? "Measure loop restarted more than 5 times" : "Viewport failed to stabilize");
          break;
        }
        let h = [];
        a & 4 || ([this.measureRequests, h] = [h, this.measureRequests]);
        let f = h.map((d) => {
          try {
            return d.read(this);
          } catch (p) {
            return Ve(this.state, p), oo;
          }
        }), c = tn.create(this, this.state, []), u = !1;
        c.flags |= a, t ? t.flags |= a : t = c, this.updateState = 2, c.empty || (this.updatePlugins(c), this.inputState.update(c), this.updateAttrs(), u = this.docView.update(c), u && this.docViewUpdate());
        for (let d = 0; d < h.length; d++)
          if (f[d] != oo)
            try {
              let p = h[d];
              p.write && p.write(f[d], this);
            } catch (p) {
              Ve(this.state, p);
            }
        if (u && this.docView.updateSelection(!0), !c.viewportChanged && this.measureRequests.length == 0) {
          if (this.viewState.editorHeight)
            if (this.viewState.scrollTarget) {
              this.docView.scrollIntoView(this.viewState.scrollTarget), this.viewState.scrollTarget = null, o = -1;
              continue;
            } else {
              let p = ((r < 0 ? this.viewState.heightMap.height : this.viewState.lineBlockAt(r).top) - o) / this.scaleY;
              if ((p > 1 || p < -1) && (i == this.scrollDOM || this.hasFocus || Math.max(this.inputState.lastWheelEvent, this.inputState.lastTouchTime) > Date.now() - 100)) {
                n = n + p, i ? i.scrollTop += p : this.win.scrollBy(0, p), o = -1;
                continue;
              }
            }
          break;
        }
      }
    } finally {
      this.updateState = 0, this.measureScheduled = -1;
    }
    if (t && !t.empty)
      for (let l of this.state.facet(Ds))
        l(t);
  }
  /**
  Get the CSS classes for the currently active editor themes.
  */
  get themeClasses() {
    return Ls + " " + (this.state.facet(Es) ? na : ia) + " " + this.state.facet(Ri);
  }
  updateAttrs() {
    let e = lo(this, Nl, {
      class: "cm-editor" + (this.hasFocus ? " cm-focused " : " ") + this.themeClasses
    }), t = {
      spellcheck: "false",
      autocorrect: "off",
      autocapitalize: "off",
      writingsuggestions: "false",
      translate: "no",
      contenteditable: this.state.facet(Ue) ? "true" : "false",
      class: "cm-content",
      style: `${S.tabSize}: ${this.state.tabSize}`,
      role: "textbox",
      "aria-multiline": "true"
    };
    this.state.readOnly && (t["aria-readonly"] = "true"), lo(this, nr, t);
    let i = this.observer.ignore(() => {
      let n = Nr(this.contentDOM, this.contentAttrs, t), r = Nr(this.dom, this.editorAttrs, e);
      return n || r;
    });
    return this.editorAttrs = e, this.contentAttrs = t, i;
  }
  showAnnouncements(e) {
    let t = !0;
    for (let i of e)
      for (let n of i.effects)
        if (n.is(A.announce)) {
          t && (this.announceDOM.textContent = ""), t = !1;
          let r = this.announceDOM.appendChild(document.createElement("div"));
          r.textContent = n.value;
        }
  }
  mountStyles() {
    this.styleModules = this.state.facet(Zt);
    let e = this.state.facet(A.cspNonce);
    nt.mount(this.root, this.styleModules.concat(Ec).reverse(), e ? { nonce: e } : void 0);
  }
  readMeasured() {
    if (this.updateState == 2)
      throw new Error("Reading the editor layout isn't allowed during an update");
    this.updateState == 0 && this.measureScheduled > -1 && this.measure(!1);
  }
  /**
  Schedule a layout measurement, optionally providing callbacks to
  do custom DOM measuring followed by a DOM write phase. Using
  this is preferable reading DOM layout directly from, for
  example, an event handler, because it'll make sure measuring and
  drawing done by other components is synchronized, avoiding
  unnecessary DOM layout computations.
  */
  requestMeasure(e) {
    if (this.measureScheduled < 0 && (this.measureScheduled = this.win.requestAnimationFrame(() => this.measure())), e) {
      if (this.measureRequests.indexOf(e) > -1)
        return;
      if (e.key != null) {
        for (let t = 0; t < this.measureRequests.length; t++)
          if (this.measureRequests[t].key === e.key) {
            this.measureRequests[t] = e;
            return;
          }
      }
      this.measureRequests.push(e);
    }
  }
  /**
  Get the value of a specific plugin, if present. Note that
  plugins that crash can be dropped from a view, so even when you
  know you registered a given plugin, it is recommended to check
  the return value of this method.
  */
  plugin(e) {
    let t = this.pluginMap.get(e);
    return (t === void 0 || t && t.plugin != e) && this.pluginMap.set(e, t = this.plugins.find((i) => i.plugin == e) || null), t && t.update(this).value;
  }
  /**
  The top position of the document, in screen coordinates. This
  may be negative when the editor is scrolled down. Points
  directly to the top of the first line, not above the padding.
  */
  get documentTop() {
    return this.contentDOM.getBoundingClientRect().top + this.viewState.paddingTop;
  }
  /**
  Reports the padding above and below the document.
  */
  get documentPadding() {
    return { top: this.viewState.paddingTop, bottom: this.viewState.paddingBottom };
  }
  /**
  If the editor is transformed with CSS, this provides the scale
  along the X axis. Otherwise, it will just be 1. Note that
  transforms other than translation and scaling are not supported.
  */
  get scaleX() {
    return this.viewState.scaleX;
  }
  /**
  Provide the CSS transformed scale along the Y axis.
  */
  get scaleY() {
    return this.viewState.scaleY;
  }
  /**
  Find the text line or block widget at the given vertical
  position (which is interpreted as relative to the [top of the
  document](https://codemirror.net/6/docs/ref/#view.EditorView.documentTop)).
  */
  elementAtHeight(e) {
    return this.readMeasured(), this.viewState.elementAtHeight(e);
  }
  /**
  Find the line block (see
  [`lineBlockAt`](https://codemirror.net/6/docs/ref/#view.EditorView.lineBlockAt)) at the given
  height, again interpreted relative to the [top of the
  document](https://codemirror.net/6/docs/ref/#view.EditorView.documentTop).
  */
  lineBlockAtHeight(e) {
    return this.readMeasured(), this.viewState.lineBlockAtHeight(e);
  }
  /**
  Get the extent and vertical position of all [line
  blocks](https://codemirror.net/6/docs/ref/#view.EditorView.lineBlockAt) in the viewport. Positions
  are relative to the [top of the
  document](https://codemirror.net/6/docs/ref/#view.EditorView.documentTop);
  */
  get viewportLineBlocks() {
    return this.viewState.viewportLines;
  }
  /**
  Find the line block around the given document position. A line
  block is a range delimited on both sides by either a
  non-[hidden](https://codemirror.net/6/docs/ref/#view.Decoration^replace) line break, or the
  start/end of the document. It will usually just hold a line of
  text, but may be broken into multiple textblocks by block
  widgets.
  */
  lineBlockAt(e) {
    return this.viewState.lineBlockAt(e);
  }
  /**
  The editor's total content height.
  */
  get contentHeight() {
    return this.viewState.contentHeight;
  }
  /**
  Move a cursor position by [grapheme
  cluster](https://codemirror.net/6/docs/ref/#state.findClusterBreak). `forward` determines whether
  the motion is away from the line start, or towards it. In
  bidirectional text, the line is traversed in visual order, using
  the editor's [text direction](https://codemirror.net/6/docs/ref/#view.EditorView.textDirection).
  When the start position was the last one on the line, the
  returned position will be across the line break. If there is no
  further line, the original position is returned.
  
  By default, this method moves over a single cluster. The
  optional `by` argument can be used to move across more. It will
  be called with the first cluster as argument, and should return
  a predicate that determines, for each subsequent cluster,
  whether it should also be moved over.
  */
  moveByChar(e, t, i) {
    return jn(this, e, Kr(this, e, t, i));
  }
  /**
  Move a cursor position across the next group of either
  [letters](https://codemirror.net/6/docs/ref/#state.EditorState.charCategorizer) or non-letter
  non-whitespace characters.
  */
  moveByGroup(e, t) {
    return jn(this, e, Kr(this, e, t, (i) => Uf(this, e.head, i)));
  }
  /**
  Get the cursor position visually at the start or end of a line.
  Note that this may differ from the _logical_ position at its
  start or end (which is simply at `line.from`/`line.to`) if text
  at the start or end goes against the line's base text direction.
  */
  visualLineSide(e, t) {
    let i = this.bidiSpans(e), n = this.textDirectionAt(e.from), r = i[t ? i.length - 1 : 0];
    return x.cursor(r.side(t, n) + e.from, r.forward(!t, n) ? 1 : -1);
  }
  /**
  Move to the next line boundary in the given direction. If
  `includeWrap` is true, line wrapping is on, and there is a
  further wrap point on the current line, the wrap point will be
  returned. Otherwise this function will return the start or end
  of the line.
  */
  moveToLineBoundary(e, t, i = !0) {
    return $f(this, e, t, i);
  }
  /**
  Move a cursor position vertically. When `distance` isn't given,
  it defaults to moving to the next line (including wrapped
  lines). Otherwise, `distance` should provide a positive distance
  in pixels.
  
  When `start` has a
  [`goalColumn`](https://codemirror.net/6/docs/ref/#state.SelectionRange.goalColumn), the vertical
  motion will use that as a target horizontal position. Otherwise,
  the cursor's own horizontal position is used. The returned
  cursor will have its goal column set to whichever column was
  used.
  */
  moveVertically(e, t, i) {
    return jn(this, e, Gf(this, e, t, i));
  }
  /**
  Find the DOM parent node and offset (child offset if `node` is
  an element, character offset when it is a text node) at the
  given document position.
  
  Note that for positions that aren't currently in
  `visibleRanges`, the resulting DOM position isn't necessarily
  meaningful (it may just point before or after a placeholder
  element).
  */
  domAtPos(e, t = 1) {
    return this.docView.domAtPos(e, t);
  }
  /**
  Find the document position at the given DOM node. Can be useful
  for associating positions with DOM events. Will raise an error
  when `node` isn't part of the editor content.
  */
  posAtDOM(e, t = 0) {
    return this.docView.posFromDOM(e, t);
  }
  posAtCoords(e, t = !0) {
    this.readMeasured();
    let i = Os(this, e, t);
    return i && i.pos;
  }
  posAndSideAtCoords(e, t = !0) {
    return this.readMeasured(), Os(this, e, t);
  }
  /**
  Get the screen coordinates at the given document position.
  `side` determines whether the coordinates are based on the
  element before (-1) or after (1) the position (if no element is
  available on the given side, the method will transparently use
  another strategy to get reasonable coordinates).
  */
  coordsAtPos(e, t = 1) {
    this.readMeasured();
    let i = this.docView.coordsAt(e, t);
    if (!i || i.left == i.right)
      return i;
    let n = this.state.doc.lineAt(e), r = this.bidiSpans(n), o = r[He.find(r, e - n.from, -1, t)];
    return en(i, o.dir == J.LTR == t > 0);
  }
  /**
  Return the rectangle around a given character. If `pos` does not
  point in front of a character that is in the viewport and
  rendered (i.e. not replaced, not a line break), this will return
  null. For space characters that are a line wrap point, this will
  return the position before the line break.
  */
  coordsForChar(e) {
    return this.readMeasured(), this.docView.coordsForChar(e);
  }
  /**
  The default width of a character in the editor. May not
  accurately reflect the width of all characters (given variable
  width fonts or styling of invididual ranges).
  */
  get defaultCharacterWidth() {
    return this.viewState.heightOracle.charWidth;
  }
  /**
  The default height of a line in the editor. May not be accurate
  for all lines.
  */
  get defaultLineHeight() {
    return this.viewState.heightOracle.lineHeight;
  }
  /**
  The text direction
  ([`direction`](https://developer.mozilla.org/en-US/docs/Web/CSS/direction)
  CSS property) of the editor's content element.
  */
  get textDirection() {
    return this.viewState.defaultTextDirection;
  }
  /**
  Find the text direction of the block at the given position, as
  assigned by CSS. If
  [`perLineTextDirection`](https://codemirror.net/6/docs/ref/#view.EditorView^perLineTextDirection)
  isn't enabled, or the given position is outside of the viewport,
  this will always return the same as
  [`textDirection`](https://codemirror.net/6/docs/ref/#view.EditorView.textDirection). Note that
  this may trigger a DOM layout.
  */
  textDirectionAt(e) {
    return !this.state.facet(Pl) || e < this.viewport.from || e > this.viewport.to ? this.textDirection : (this.readMeasured(), this.docView.textDirectionAt(e));
  }
  /**
  Whether this editor [wraps lines](https://codemirror.net/6/docs/ref/#view.EditorView.lineWrapping)
  (as determined by the
  [`white-space`](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
  CSS property of its content element).
  */
  get lineWrapping() {
    return this.viewState.heightOracle.lineWrapping;
  }
  /**
  Returns the bidirectional text structure of the given line
  (which should be in the current document) as an array of span
  objects. The order of these spans matches the [text
  direction](https://codemirror.net/6/docs/ref/#view.EditorView.textDirection)—if that is
  left-to-right, the leftmost spans come first, otherwise the
  rightmost spans come first.
  */
  bidiSpans(e) {
    if (e.length > Nc)
      return Al(e.length);
    let t = this.textDirectionAt(e.from), i;
    for (let r of this.bidiCache)
      if (r.from == e.from && r.dir == t && (r.fresh || Cl(r.isolates, i = Hr(this, e))))
        return r.order;
    i || (i = Hr(this, e));
    let n = mf(e.text, t, i);
    return this.bidiCache.push(new ln(e.from, e.to, t, i, !0, n)), n;
  }
  /**
  Check whether the editor has focus.
  */
  get hasFocus() {
    var e;
    return (this.dom.ownerDocument.hasFocus() || S.safari && ((e = this.inputState) === null || e === void 0 ? void 0 : e.lastContextMenu) > Date.now() - 3e4) && this.root.activeElement == this.contentDOM;
  }
  /**
  Put focus on the editor.
  */
  focus() {
    this.observer.ignore(() => {
      xl(this.contentDOM), this.docView.updateSelection();
    });
  }
  /**
  Update the [root](https://codemirror.net/6/docs/ref/##view.EditorViewConfig.root) in which the editor lives. This is only
  necessary when moving the editor's existing DOM to a new window or shadow root.
  */
  setRoot(e) {
    this._root != e && (this._root = e, this.observer.setWindow((e.nodeType == 9 ? e : e.ownerDocument).defaultView || window), this.mountStyles());
  }
  /**
  Clean up this editor view, removing its element from the
  document, unregistering event handlers, and notifying
  plugins. The view instance can no longer be used after
  calling this.
  */
  destroy() {
    this.root.activeElement == this.contentDOM && this.contentDOM.blur();
    for (let e of this.plugins)
      e.destroy(this);
    this.plugins = [], this.inputState.destroy(), this.docView.destroy(), this.dom.remove(), this.observer.destroy(), this.measureScheduled > -1 && this.win.cancelAnimationFrame(this.measureScheduled), this.destroyed = !0;
  }
  /**
  Returns an effect that can be
  [added](https://codemirror.net/6/docs/ref/#state.TransactionSpec.effects) to a transaction to
  cause it to scroll the given position or range into view.
  */
  static scrollIntoView(e, t = {}) {
    var i, n, r, o;
    return Ti.of(new Pt(typeof e == "number" ? x.cursor(e) : e, (i = t.y) !== null && i !== void 0 ? i : "nearest", (n = t.x) !== null && n !== void 0 ? n : "nearest", (r = t.yMargin) !== null && r !== void 0 ? r : 5, (o = t.xMargin) !== null && o !== void 0 ? o : 5));
  }
  /**
  Return an effect that resets the editor to its current (at the
  time this method was called) scroll position. Note that this
  only affects the editor's own scrollable element, not parents.
  See also
  [`EditorViewConfig.scrollTo`](https://codemirror.net/6/docs/ref/#view.EditorViewConfig.scrollTo).
  
  The effect should be used with a document identical to the one
  it was created for. Failing to do so is not an error, but may
  not scroll to the expected position. You can
  [map](https://codemirror.net/6/docs/ref/#state.StateEffect.map) the effect to account for changes.
  */
  scrollSnapshot() {
    let { scrollTop: e, scrollLeft: t } = this.scrollDOM, i = this.viewState.scrollAnchorAt(e);
    return Ti.of(new Pt(x.cursor(i.from), "start", "start", i.top - e, t, !0));
  }
  /**
  Enable or disable tab-focus mode, which disables key bindings
  for Tab and Shift-Tab, letting the browser's default
  focus-changing behavior go through instead. This is useful to
  prevent trapping keyboard users in your editor.
  
  Without argument, this toggles the mode. With a boolean, it
  enables (true) or disables it (false). Given a number, it
  temporarily enables the mode until that number of milliseconds
  have passed or another non-Tab key is pressed.
  */
  setTabFocusMode(e) {
    e == null ? this.inputState.tabFocusMode = this.inputState.tabFocusMode < 0 ? 0 : -1 : typeof e == "boolean" ? this.inputState.tabFocusMode = e ? 0 : -1 : this.inputState.tabFocusMode != 0 && (this.inputState.tabFocusMode = Date.now() + e);
  }
  /**
  Returns an extension that can be used to add DOM event handlers.
  The value should be an object mapping event names to handler
  functions. For any given event, such functions are ordered by
  extension precedence, and the first handler to return true will
  be assumed to have handled that event, and no other handlers or
  built-in behavior will be activated for it. These are registered
  on the [content element](https://codemirror.net/6/docs/ref/#view.EditorView.contentDOM), except
  for `scroll` handlers, which will be called any time the
  editor's [scroll element](https://codemirror.net/6/docs/ref/#view.EditorView.scrollDOM) or one of
  its parent nodes is scrolled.
  */
  static domEventHandlers(e) {
    return ye.define(() => ({}), { eventHandlers: e });
  }
  /**
  Create an extension that registers DOM event observers. Contrary
  to event [handlers](https://codemirror.net/6/docs/ref/#view.EditorView^domEventHandlers),
  observers can't be prevented from running by a higher-precedence
  handler returning true. They also don't prevent other handlers
  and observers from running when they return true, and should not
  call `preventDefault`.
  */
  static domEventObservers(e) {
    return ye.define(() => ({}), { eventObservers: e });
  }
  /**
  Create a theme extension. The first argument can be a
  [`style-mod`](https://code.haverbeke.berlin/marijn/style-mod#documentation)
  style spec providing the styles for the theme. These will be
  prefixed with a generated class for the style.
  
  Because the selectors will be prefixed with a scope class, rule
  that directly match the editor's [wrapper
  element](https://codemirror.net/6/docs/ref/#view.EditorView.dom)—to which the scope class will be
  added—need to be explicitly differentiated by adding an `&` to
  the selector for that element—for example
  `&.cm-focused`.
  
  When `dark` is set to true, the theme will be marked as dark,
  which will cause the `&dark` rules from [base
  themes](https://codemirror.net/6/docs/ref/#view.EditorView^baseTheme) to be used (as opposed to
  `&light` when a light theme is active).
  */
  static theme(e, t) {
    let i = nt.newName(), n = [Ri.of(i), Zt.of(Ps(`.${i}`, e))];
    return t && t.dark && n.push(Es.of(!0)), n;
  }
  /**
  Create an extension that adds styles to the base theme. Like
  with [`theme`](https://codemirror.net/6/docs/ref/#view.EditorView^theme), use `&` to indicate the
  place of the editor wrapper element when directly targeting
  that. You can also use `&dark` or `&light` instead to only
  target editors with a dark or light theme.
  */
  static baseTheme(e) {
    return kn.lowest(Zt.of(Ps("." + Ls, e, sa)));
  }
  /**
  Retrieve an editor view instance from the view's DOM
  representation.
  */
  static findFromDOM(e) {
    var t;
    let i = e.querySelector(".cm-content"), n = i && U.get(i) || U.get(e);
    return ((t = n?.root) === null || t === void 0 ? void 0 : t.view) || null;
  }
}
A.styleModule = Zt;
A.inputHandler = El;
A.clipboardInputFilter = tr;
A.clipboardOutputFilter = ir;
A.scrollHandler = Rl;
A.focusChangeEffect = Ll;
A.perLineTextDirection = Pl;
A.exceptionSink = Bl;
A.updateListener = Ds;
A.editable = Ue;
A.mouseSelectionStyle = Ol;
A.dragMovesSelection = Tl;
A.clickAddsSelectionRange = Dl;
A.decorations = Cn;
A.blockWrappers = Wl;
A.outerDecorations = sr;
A.atomicRanges = bi;
A.bidiIsolatedRanges = Fl;
A.cursorScrollMargin = /* @__PURE__ */ v.define({
  combine: (s) => {
    let e = 5, t = 5;
    for (let i of s)
      typeof i == "number" ? e = t = i : { x: e, y: t } = i;
    return { x: e, y: t };
  }
});
A.scrollMargins = Hl;
A.darkTheme = Es;
A.cspNonce = /* @__PURE__ */ v.define({ combine: (s) => s.length ? s[0] : "" });
A.contentAttributes = nr;
A.editorAttributes = Nl;
A.lineWrapping = /* @__PURE__ */ A.contentAttributes.of({ class: "cm-lineWrapping" });
A.announce = /* @__PURE__ */ W.define();
const Nc = 4096, oo = {};
class ln {
  constructor(e, t, i, n, r, o) {
    this.from = e, this.to = t, this.dir = i, this.isolates = n, this.fresh = r, this.order = o;
  }
  static update(e, t) {
    if (t.empty && !e.some((r) => r.fresh))
      return e;
    let i = [], n = e.length ? e[e.length - 1].dir : J.LTR;
    for (let r = Math.max(0, e.length - 10); r < e.length; r++) {
      let o = e[r];
      o.dir == n && !t.touchesRange(o.from, o.to) && i.push(new ln(t.mapPos(o.from, 1), t.mapPos(o.to, -1), o.dir, o.isolates, !1, o.order));
    }
    return i;
  }
}
function lo(s, e, t) {
  for (let i = s.state.facet(e), n = i.length - 1; n >= 0; n--) {
    let r = i[n], o = typeof r == "function" ? r(s) : r;
    o && Qs(o, t);
  }
  return t;
}
const Wc = S.mac ? "mac" : S.windows ? "win" : S.linux ? "linux" : "key";
function Fc(s, e) {
  const t = s.split(/-(?!$)/);
  let i = t[t.length - 1];
  i == "Space" && (i = " ");
  let n, r, o, l;
  for (let a = 0; a < t.length - 1; ++a) {
    const h = t[a];
    if (/^(cmd|meta|m)$/i.test(h))
      l = !0;
    else if (/^a(lt)?$/i.test(h))
      n = !0;
    else if (/^(c|ctrl|control)$/i.test(h))
      r = !0;
    else if (/^s(hift)?$/i.test(h))
      o = !0;
    else if (/^mod$/i.test(h))
      e == "mac" ? l = !0 : r = !0;
    else
      throw new Error("Unrecognized modifier name: " + h);
  }
  return n && (i = "Alt-" + i), r && (i = "Ctrl-" + i), l && (i = "Meta-" + i), o && (i = "Shift-" + i), i;
}
function Ii(s, e, t) {
  return e.altKey && (s = "Alt-" + s), e.ctrlKey && (s = "Ctrl-" + s), e.metaKey && (s = "Meta-" + s), t !== !1 && e.shiftKey && (s = "Shift-" + s), s;
}
const Hc = /* @__PURE__ */ kn.default(/* @__PURE__ */ A.domEventHandlers({
  keydown(s, e) {
    return la(oa(e.state), s, e, "editor");
  }
})), ra = /* @__PURE__ */ v.define({ enables: Hc }), ao = /* @__PURE__ */ new WeakMap();
function oa(s) {
  let e = s.facet(ra), t = ao.get(e);
  return t || ao.set(e, t = qc(e.reduce((i, n) => i.concat(n), []))), t;
}
function Vc(s, e, t) {
  return la(oa(s.state), e, s, t);
}
let et = null;
const zc = 4e3;
function qc(s, e = Wc) {
  let t = /* @__PURE__ */ Object.create(null), i = /* @__PURE__ */ Object.create(null), n = (o, l) => {
    let a = i[o];
    if (a == null)
      i[o] = l;
    else if (a != l)
      throw new Error("Key binding " + o + " is used both as a regular binding and as a multi-stroke prefix");
  }, r = (o, l, a, h, f) => {
    var c, u;
    let d = t[o] || (t[o] = /* @__PURE__ */ Object.create(null)), p = l.split(/ (?!$)/).map((y) => Fc(y, e));
    for (let y = 1; y < p.length; y++) {
      let b = p.slice(0, y).join(" ");
      n(b, !0), d[b] || (d[b] = {
        preventDefault: !0,
        stopPropagation: !1,
        run: [(C) => {
          let P = et = { view: C, prefix: b, scope: o };
          return setTimeout(() => {
            et == P && (et = null);
          }, zc), !0;
        }]
      });
    }
    let g = p.join(" ");
    n(g, !1);
    let m = d[g] || (d[g] = {
      preventDefault: !1,
      stopPropagation: !1,
      run: ((u = (c = d._any) === null || c === void 0 ? void 0 : c.run) === null || u === void 0 ? void 0 : u.slice()) || []
    });
    a && m.run.push(a), h && (m.preventDefault = !0), f && (m.stopPropagation = !0);
  };
  for (let o of s) {
    let l = o.scope ? o.scope.split(" ") : ["editor"];
    if (o.any)
      for (let h of l) {
        let f = t[h] || (t[h] = /* @__PURE__ */ Object.create(null));
        f._any || (f._any = { preventDefault: !1, stopPropagation: !1, run: [] });
        let { any: c } = o;
        for (let u in f)
          f[u].run.push((d) => c(d, Rs));
      }
    let a = o[e] || o.key;
    if (a)
      for (let h of l)
        r(h, a, o.run, o.preventDefault, o.stopPropagation), o.shift && r(h, "Shift-" + a, o.shift, o.preventDefault, o.stopPropagation);
  }
  return t;
}
let Rs = null;
function la(s, e, t, i) {
  Rs = e;
  let n = Zh(e), r = Qo(n, 0), o = Zo(r) == n.length && n != " ", l = "", a = !1, h = !1, f = !1;
  et && et.view == t && et.scope == i && (l = et.prefix + " ", _l.indexOf(e.keyCode) < 0 && (h = !0, et = null));
  let c = /* @__PURE__ */ new Set(), u = (m) => {
    if (m) {
      for (let y of m.run)
        if (!c.has(y) && (c.add(y), y(t)))
          return m.stopPropagation && (f = !0), !0;
      m.preventDefault && (m.stopPropagation && (f = !0), h = !0);
    }
    return !1;
  }, d = s[i], p, g;
  return d && (u(d[l + Ii(n, e, !o)]) ? a = !0 : o && (e.altKey || e.metaKey || e.ctrlKey) && // Ctrl-Alt may be used for AltGr on Windows
  !(S.windows && e.ctrlKey && e.altKey) && // Alt-combinations on macOS tend to be typed characters
  !(S.mac && e.altKey && !(e.ctrlKey || e.metaKey)) && (p = st[e.keyCode]) && p != n ? (u(d[l + Ii(p, e, !0)]) || e.shiftKey && (g = hi[e.keyCode]) != n && g != p && u(d[l + Ii(g, e, !1)])) && (a = !0) : o && e.shiftKey && u(d[l + Ii(n, e, !0)]) && (a = !0), !a && u(d._any) && (a = !0)), h && (a = !0), a && f && e.stopPropagation(), Rs = null, a;
}
const ho = /* @__PURE__ */ v.define({
  combine(s) {
    let e, t;
    for (let i of s)
      e = e || i.topContainer, t = t || i.bottomContainer;
    return { topContainer: e, bottomContainer: t };
  }
});
function aa(s, e) {
  let t = s.plugin(ha), i = t ? t.specs.indexOf(e) : -1;
  return i > -1 ? t.panels[i] : null;
}
const ha = /* @__PURE__ */ ye.fromClass(class {
  constructor(s) {
    this.input = s.state.facet(an), this.specs = this.input.filter((t) => t), this.panels = this.specs.map((t) => t(s));
    let e = s.state.facet(ho);
    this.top = new Ni(s, !0, e.topContainer), this.bottom = new Ni(s, !1, e.bottomContainer), this.top.sync(this.panels.filter((t) => t.top)), this.bottom.sync(this.panels.filter((t) => !t.top));
    for (let t of this.panels)
      t.dom.classList.add("cm-panel"), t.mount && t.mount();
  }
  update(s) {
    let e = s.state.facet(ho);
    this.top.container != e.topContainer && (this.top.sync([]), this.top = new Ni(s.view, !0, e.topContainer)), this.bottom.container != e.bottomContainer && (this.bottom.sync([]), this.bottom = new Ni(s.view, !1, e.bottomContainer)), this.top.syncClasses(), this.bottom.syncClasses();
    let t = s.state.facet(an);
    if (t != this.input) {
      let i = t.filter((a) => a), n = [], r = [], o = [], l = [];
      for (let a of i) {
        let h = this.specs.indexOf(a), f;
        h < 0 ? (f = a(s.view), l.push(f)) : (f = this.panels[h], f.update && f.update(s)), n.push(f), (f.top ? r : o).push(f);
      }
      this.specs = i, this.panels = n, this.top.sync(r), this.bottom.sync(o);
      for (let a of l)
        a.dom.classList.add("cm-panel"), a.mount && a.mount();
    } else
      for (let i of this.panels)
        i.update && i.update(s);
  }
  destroy() {
    this.top.sync([]), this.bottom.sync([]);
  }
}, {
  provide: (s) => A.scrollMargins.of((e) => {
    let t = e.plugin(s);
    return t && { top: t.top.scrollMargin(), bottom: t.bottom.scrollMargin() };
  })
});
class Ni {
  constructor(e, t, i) {
    this.view = e, this.top = t, this.container = i, this.dom = void 0, this.classes = "", this.panels = [], this.syncClasses();
  }
  sync(e) {
    for (let t of this.panels)
      t.destroy && e.indexOf(t) < 0 && t.destroy();
    this.panels = e, this.syncDOM();
  }
  syncDOM() {
    if (this.panels.length == 0) {
      this.dom && (this.dom.remove(), this.dom = void 0);
      return;
    }
    if (!this.dom) {
      this.dom = document.createElement("div"), this.dom.className = this.top ? "cm-panels cm-panels-top" : "cm-panels cm-panels-bottom", this.dom.style[this.top ? "top" : "bottom"] = "0";
      let t = this.container || this.view.dom;
      t.insertBefore(this.dom, this.top ? t.firstChild : null);
    }
    let e = this.dom.firstChild;
    for (let t of this.panels)
      if (t.dom.parentNode == this.dom) {
        for (; e != t.dom; )
          e = fo(e);
        e = e.nextSibling;
      } else
        this.dom.insertBefore(t.dom, e);
    for (; e; )
      e = fo(e);
  }
  scrollMargin() {
    return !this.dom || this.container ? 0 : Math.max(0, this.top ? this.dom.getBoundingClientRect().bottom - Math.max(0, this.view.scrollDOM.getBoundingClientRect().top) : Math.min(innerHeight, this.view.scrollDOM.getBoundingClientRect().bottom) - this.dom.getBoundingClientRect().top);
  }
  syncClasses() {
    if (!(!this.container || this.classes == this.view.themeClasses)) {
      for (let e of this.classes.split(" "))
        e && this.container.classList.remove(e);
      for (let e of (this.classes = this.view.themeClasses).split(" "))
        e && this.container.classList.add(e);
    }
  }
}
function fo(s) {
  let e = s.nextSibling;
  return s.remove(), e;
}
const an = /* @__PURE__ */ v.define({
  enables: ha
});
function Kc(s, e) {
  let t, i = new Promise((o) => t = o), n = (o) => jc(o, e, t);
  s.state.field(Gn, !1) ? s.dispatch({ effects: fa.of(n) }) : s.dispatch({ effects: W.appendConfig.of(Gn.init(() => [n])) });
  let r = ca.of(n);
  return { close: r, result: i.then((o) => ((s.win.queueMicrotask || ((a) => s.win.setTimeout(a, 10)))(() => {
    s.state.field(Gn).indexOf(n) > -1 && s.dispatch({ effects: r });
  }), o)) };
}
const Gn = /* @__PURE__ */ Oe.define({
  create() {
    return [];
  },
  update(s, e) {
    for (let t of e.effects)
      t.is(fa) ? s = [t.value].concat(s) : t.is(ca) && (s = s.filter((i) => i != t.value));
    return s;
  },
  provide: (s) => an.computeN([s], (e) => e.field(s))
}), fa = /* @__PURE__ */ W.define(), ca = /* @__PURE__ */ W.define();
function jc(s, e, t) {
  let i = e.content ? e.content(s, () => o(null)) : null;
  if (!i) {
    if (i = Z("form"), e.input) {
      let l = Z("input", e.input);
      /^(text|password|number|email|tel|url)$/.test(l.type) && l.classList.add("cm-textfield"), l.name || (l.name = "input"), i.appendChild(Z("label", (e.label || "") + ": ", l));
    } else
      i.appendChild(document.createTextNode(e.label || ""));
    i.appendChild(document.createTextNode(" ")), i.appendChild(Z("button", { class: "cm-button", type: "submit" }, e.submitLabel || "OK"));
  }
  let n = i.nodeName == "FORM" ? [i] : i.querySelectorAll("form");
  for (let l = 0; l < n.length; l++) {
    let a = n[l];
    a.addEventListener("keydown", (h) => {
      h.keyCode == 27 ? (h.preventDefault(), o(null)) : h.keyCode == 13 && (h.preventDefault(), o(a));
    }), a.addEventListener("submit", (h) => {
      h.preventDefault(), o(a);
    });
  }
  let r = Z("div", i, Z("button", {
    onclick: () => o(null),
    "aria-label": s.state.phrase("close"),
    class: "cm-dialog-close",
    type: "button"
  }, ["×"]));
  e.class && (r.className = e.class), r.classList.add("cm-dialog");
  function o(l) {
    r.contains(r.ownerDocument.activeElement) && s.focus(), t(l);
  }
  return {
    dom: r,
    top: e.top,
    mount: () => {
      if (e.focus) {
        let l;
        typeof e.focus == "string" ? l = i.querySelector(e.focus) : l = i.querySelector("input") || i.querySelector("button"), l && "select" in l ? l.select() : l && "focus" in l && l.focus();
      }
    }
  };
}
class Ye extends yt {
  /**
  @internal
  */
  compare(e) {
    return this == e || this.constructor == e.constructor && this.eq(e);
  }
  /**
  Compare this marker to another marker of the same type.
  */
  eq(e) {
    return !1;
  }
  /**
  Called if the marker has a `toDOM` method and its representation
  was removed from a gutter.
  */
  destroy(e) {
  }
}
Ye.prototype.elementClass = "";
Ye.prototype.toDOM = void 0;
Ye.prototype.mapMode = me.TrackBefore;
Ye.prototype.startSide = Ye.prototype.endSide = -1;
Ye.prototype.point = !0;
const _i = /* @__PURE__ */ v.define(), $c = /* @__PURE__ */ v.define(), Uc = {
  class: "",
  renderEmptyElements: !1,
  elementStyle: "",
  markers: () => L.empty,
  lineMarker: () => null,
  widgetMarker: () => null,
  lineMarkerChange: null,
  initialSpacer: null,
  updateSpacer: null,
  domEventHandlers: {},
  side: "before"
}, oi = /* @__PURE__ */ v.define();
function Gc(s) {
  return [ua(), oi.of({ ...Uc, ...s })];
}
const co = /* @__PURE__ */ v.define({
  combine: (s) => s.some((e) => e)
});
function ua(s) {
  return [
    _c
  ];
}
const _c = /* @__PURE__ */ ye.fromClass(class {
  constructor(s) {
    this.view = s, this.domAfter = null, this.prevViewport = s.viewport, this.dom = document.createElement("div"), this.dom.className = "cm-gutters cm-gutters-before", this.dom.setAttribute("aria-hidden", "true"), this.dom.style.minHeight = this.view.contentHeight / this.view.scaleY + "px", this.gutters = s.state.facet(oi).map((e) => new po(s, e)), this.fixed = !s.state.facet(co);
    for (let e of this.gutters)
      e.config.side == "after" ? this.getDOMAfter().appendChild(e.dom) : this.dom.appendChild(e.dom);
    this.fixed && (this.dom.style.position = "sticky"), this.syncGutters(!1), s.scrollDOM.insertBefore(this.dom, s.contentDOM);
  }
  getDOMAfter() {
    return this.domAfter || (this.domAfter = document.createElement("div"), this.domAfter.className = "cm-gutters cm-gutters-after", this.domAfter.setAttribute("aria-hidden", "true"), this.domAfter.style.minHeight = this.view.contentHeight / this.view.scaleY + "px", this.domAfter.style.position = this.fixed ? "sticky" : "", this.view.scrollDOM.appendChild(this.domAfter)), this.domAfter;
  }
  update(s) {
    if (this.updateGutters(s)) {
      let e = this.prevViewport, t = s.view.viewport, i = Math.min(e.to, t.to) - Math.max(e.from, t.from);
      this.syncGutters(i < (t.to - t.from) * 0.8);
    }
    if (s.geometryChanged) {
      let e = this.view.contentHeight / this.view.scaleY + "px";
      this.dom.style.minHeight = e, this.domAfter && (this.domAfter.style.minHeight = e);
    }
    this.view.state.facet(co) != !this.fixed && (this.fixed = !this.fixed, this.dom.style.position = this.fixed ? "sticky" : "", this.domAfter && (this.domAfter.style.position = this.fixed ? "sticky" : "")), this.prevViewport = s.view.viewport;
  }
  syncGutters(s) {
    let e = this.dom.nextSibling;
    s && (this.dom.remove(), this.domAfter && this.domAfter.remove());
    let t = L.iter(this.view.state.facet(_i), this.view.viewport.from), i = [], n = this.gutters.map((r) => new Jc(r, this.view.viewport, -this.view.documentPadding.top));
    for (let r of this.view.viewportLineBlocks)
      if (i.length && (i = []), Array.isArray(r.type)) {
        let o = !0;
        for (let l of r.type)
          if (l.type == ce.Text && o) {
            Is(t, i, l.from);
            for (let a of n)
              a.line(this.view, l, i);
            o = !1;
          } else if (l.widget)
            for (let a of n)
              a.widget(this.view, l);
      } else if (r.type == ce.Text) {
        Is(t, i, r.from);
        for (let o of n)
          o.line(this.view, r, i);
      } else if (r.widget)
        for (let o of n)
          o.widget(this.view, r);
    for (let r of n)
      r.finish();
    s && (this.view.scrollDOM.insertBefore(this.dom, e), this.domAfter && this.view.scrollDOM.appendChild(this.domAfter));
  }
  updateGutters(s) {
    let e = s.startState.facet(oi), t = s.state.facet(oi), i = s.docChanged || s.heightChanged || s.viewportChanged || !L.eq(s.startState.facet(_i), s.state.facet(_i), s.view.viewport.from, s.view.viewport.to);
    if (e == t)
      for (let n of this.gutters)
        n.update(s) && (i = !0);
    else {
      i = !0;
      let n = [];
      for (let r of t) {
        let o = e.indexOf(r);
        o < 0 ? n.push(new po(this.view, r)) : (this.gutters[o].update(s), n.push(this.gutters[o]));
      }
      for (let r of this.gutters)
        r.dom.remove(), n.indexOf(r) < 0 && r.destroy();
      for (let r of n)
        r.config.side == "after" ? this.getDOMAfter().appendChild(r.dom) : this.dom.appendChild(r.dom);
      this.gutters = n;
    }
    return i;
  }
  destroy() {
    for (let s of this.gutters)
      s.destroy();
    this.dom.remove(), this.domAfter && this.domAfter.remove();
  }
}, {
  provide: (s) => A.scrollMargins.of((e) => {
    let t = e.plugin(s);
    if (!t || t.gutters.length == 0 || !t.fixed)
      return null;
    let i = t.dom.offsetWidth * e.scaleX, n = t.domAfter ? t.domAfter.offsetWidth * e.scaleX : 0;
    return e.textDirection == J.LTR ? { left: i, right: n } : { right: i, left: n };
  })
});
function uo(s) {
  return Array.isArray(s) ? s : [s];
}
function Is(s, e, t) {
  for (; s.value && s.from <= t; )
    s.from == t && e.push(s.value), s.next();
}
class Jc {
  constructor(e, t, i) {
    this.gutter = e, this.height = i, this.i = 0, this.cursor = L.iter(e.markers, t.from);
  }
  addElement(e, t, i) {
    let { gutter: n } = this, r = (t.top - this.height) / e.scaleY, o = t.height / e.scaleY;
    if (this.i == n.elements.length) {
      let l = new da(e, o, r, i);
      n.elements.push(l), n.dom.appendChild(l.dom);
    } else
      n.elements[this.i].update(e, o, r, i);
    this.height = t.bottom, this.i++;
  }
  line(e, t, i) {
    let n = [];
    Is(this.cursor, n, t.from), i.length && (n = n.concat(i));
    let r = this.gutter.config.lineMarker(e, t, n);
    r && n.unshift(r);
    let o = this.gutter;
    n.length == 0 && !o.config.renderEmptyElements || this.addElement(e, t, n);
  }
  widget(e, t) {
    let i = this.gutter.config.widgetMarker(e, t.widget, t), n = i ? [i] : null;
    for (let r of e.state.facet($c)) {
      let o = r(e, t.widget, t);
      o && (n || (n = [])).push(o);
    }
    n && this.addElement(e, t, n);
  }
  finish() {
    let e = this.gutter;
    for (; e.elements.length > this.i; ) {
      let t = e.elements.pop();
      e.dom.removeChild(t.dom), t.destroy();
    }
  }
}
class po {
  constructor(e, t) {
    this.view = e, this.config = t, this.elements = [], this.spacer = null, this.dom = document.createElement("div"), this.dom.className = "cm-gutter" + (this.config.class ? " " + this.config.class : "");
    for (let i in t.domEventHandlers)
      this.dom.addEventListener(i, (n) => {
        let r = n.target, o;
        if (r != this.dom && this.dom.contains(r)) {
          for (; r.parentNode != this.dom; )
            r = r.parentNode;
          let a = r.getBoundingClientRect();
          o = (a.top + a.bottom) / 2;
        } else
          o = n.clientY;
        let l = e.lineBlockAtHeight(o - e.documentTop);
        t.domEventHandlers[i](e, l, n) && n.preventDefault();
      });
    this.markers = uo(t.markers(e)), t.initialSpacer && (this.spacer = new da(e, 0, 0, [t.initialSpacer(e)]), this.dom.appendChild(this.spacer.dom), this.spacer.dom.style.cssText += "visibility: hidden; pointer-events: none");
  }
  update(e) {
    let t = this.markers;
    if (this.markers = uo(this.config.markers(e.view)), this.spacer && this.config.updateSpacer) {
      let n = this.config.updateSpacer(this.spacer.markers[0], e);
      n != this.spacer.markers[0] && this.spacer.update(e.view, 0, 0, [n]);
    }
    let i = e.view.viewport;
    return !L.eq(this.markers, t, i.from, i.to) || (this.config.lineMarkerChange ? this.config.lineMarkerChange(e) : !1);
  }
  destroy() {
    for (let e of this.elements)
      e.destroy();
  }
}
class da {
  constructor(e, t, i, n) {
    this.height = -1, this.above = 0, this.markers = [], this.dom = document.createElement("div"), this.dom.className = "cm-gutterElement", this.update(e, t, i, n);
  }
  update(e, t, i, n) {
    this.height != t && (this.height = t, this.dom.style.height = t + "px"), this.above != i && (this.dom.style.marginTop = (this.above = i) ? i + "px" : ""), Yc(this.markers, n) || this.setMarkers(e, n);
  }
  setMarkers(e, t) {
    let i = "cm-gutterElement", n = this.dom.firstChild;
    for (let r = 0, o = 0; ; ) {
      let l = o, a = r < t.length ? t[r++] : null, h = !1;
      if (a) {
        let f = a.elementClass;
        f && (i += " " + f);
        for (let c = o; c < this.markers.length; c++)
          if (this.markers[c].compare(a)) {
            l = c, h = !0;
            break;
          }
      } else
        l = this.markers.length;
      for (; o < l; ) {
        let f = this.markers[o++];
        if (f.toDOM) {
          f.destroy(n);
          let c = n.nextSibling;
          n.remove(), n = c;
        }
      }
      if (!a)
        break;
      a.toDOM && (h ? n = n.nextSibling : this.dom.insertBefore(a.toDOM(e), n)), h && o++;
    }
    this.dom.className = i, this.markers = t;
  }
  destroy() {
    this.setMarkers(null, []);
  }
}
function Yc(s, e) {
  if (s.length != e.length)
    return !1;
  for (let t = 0; t < s.length; t++)
    if (!s[t].compare(e[t]))
      return !1;
  return !0;
}
const Xc = /* @__PURE__ */ v.define(), Qc = /* @__PURE__ */ v.define(), Tt = /* @__PURE__ */ v.define({
  combine(s) {
    return Kt(s, { formatNumber: String, domEventHandlers: {} }, {
      domEventHandlers(e, t) {
        let i = Object.assign({}, e);
        for (let n in t) {
          let r = i[n], o = t[n];
          i[n] = r ? (l, a, h) => r(l, a, h) || o(l, a, h) : o;
        }
        return i;
      }
    });
  }
});
class _n extends Ye {
  constructor(e) {
    super(), this.number = e;
  }
  eq(e) {
    return this.number == e.number;
  }
  toDOM() {
    return document.createTextNode(this.number);
  }
}
function Jn(s, e) {
  return s.state.facet(Tt).formatNumber(e, s.state);
}
const Zc = /* @__PURE__ */ oi.compute([Tt], (s) => ({
  class: "cm-lineNumbers",
  renderEmptyElements: !1,
  markers(e) {
    return e.state.facet(Xc);
  },
  lineMarker(e, t, i) {
    return i.some((n) => n.toDOM) ? null : new _n(Jn(e, e.state.doc.lineAt(t.from).number));
  },
  widgetMarker: (e, t, i) => {
    for (let n of e.state.facet(Qc)) {
      let r = n(e, t, i);
      if (r)
        return r;
    }
    return null;
  },
  lineMarkerChange: (e) => e.startState.facet(Tt) != e.state.facet(Tt),
  initialSpacer(e) {
    return new _n(Jn(e, go(e.state.doc.lines)));
  },
  updateSpacer(e, t) {
    let i = Jn(t.view, go(t.view.state.doc.lines));
    return i == e.number ? e : new _n(i);
  },
  domEventHandlers: s.facet(Tt).domEventHandlers,
  side: "before"
}));
function eu(s = {}) {
  return [
    Tt.of(s),
    ua(),
    Zc
  ];
}
function go(s) {
  let e = 9;
  for (; e < s; )
    e = e * 10 + 9;
  return e;
}
const tu = /* @__PURE__ */ new class extends Ye {
  constructor() {
    super(...arguments), this.elementClass = "cm-activeLineGutter";
  }
}(), iu = /* @__PURE__ */ _i.compute(["selection"], (s) => {
  let e = [], t = -1;
  for (let i of s.selection.ranges) {
    let n = s.doc.lineAt(i.head).from;
    n > t && (t = n, e.push(tu.range(n)));
  }
  return L.of(e);
});
function nu() {
  return iu;
}
const su = 1024;
let ru = 0;
class Se {
  constructor(e, t) {
    this.from = e, this.to = t;
  }
}
class E {
  /**
  Create a new node prop type.
  */
  constructor(e = {}) {
    this.id = ru++, this.perNode = !!e.perNode, this.deserialize = e.deserialize || (() => {
      throw new Error("This node type doesn't define a deserialize function");
    }), this.combine = e.combine || null;
  }
  /**
  This is meant to be used with
  [`NodeSet.extend`](#common.NodeSet.extend) or
  [`LRParser.configure`](#lr.ParserConfig.props) to compute
  prop values for each node type in the set. Takes a [match
  object](#common.NodeType^match) or function that returns undefined
  if the node type doesn't get this prop, and the prop's value if
  it does.
  */
  add(e) {
    if (this.perNode)
      throw new RangeError("Can't add per-node props to node types");
    return typeof e != "function" && (e = de.match(e)), (t) => {
      let i = e(t);
      return i === void 0 ? null : [this, i];
    };
  }
}
E.closedBy = new E({ deserialize: (s) => s.split(" ") });
E.openedBy = new E({ deserialize: (s) => s.split(" ") });
E.group = new E({ deserialize: (s) => s.split(" ") });
E.isolate = new E({ deserialize: (s) => {
  if (s && s != "rtl" && s != "ltr" && s != "auto")
    throw new RangeError("Invalid value for isolate: " + s);
  return s || "auto";
} });
E.contextHash = new E({ perNode: !0 });
E.lookAhead = new E({ perNode: !0 });
E.mounted = new E({ perNode: !0 });
class Rt {
  constructor(e, t, i, n = !1) {
    this.tree = e, this.overlay = t, this.parser = i, this.bracketed = n;
  }
  /**
  @internal
  */
  static get(e) {
    return e && e.props && e.props[E.mounted.id];
  }
}
const ou = /* @__PURE__ */ Object.create(null);
class de {
  /**
  @internal
  */
  constructor(e, t, i, n = 0) {
    this.name = e, this.props = t, this.id = i, this.flags = n;
  }
  /**
  Define a node type.
  */
  static define(e) {
    let t = e.props && e.props.length ? /* @__PURE__ */ Object.create(null) : ou, i = (e.top ? 1 : 0) | (e.skipped ? 2 : 0) | (e.error ? 4 : 0) | (e.name == null ? 8 : 0), n = new de(e.name || "", t, e.id, i);
    if (e.props) {
      for (let r of e.props)
        if (Array.isArray(r) || (r = r(n)), r) {
          if (r[0].perNode)
            throw new RangeError("Can't store a per-node prop on a node type");
          t[r[0].id] = r[1];
        }
    }
    return n;
  }
  /**
  Retrieves a node prop for this type. Will return `undefined` if
  the prop isn't present on this node.
  */
  prop(e) {
    return this.props[e.id];
  }
  /**
  True when this is the top node of a grammar.
  */
  get isTop() {
    return (this.flags & 1) > 0;
  }
  /**
  True when this node is produced by a skip rule.
  */
  get isSkipped() {
    return (this.flags & 2) > 0;
  }
  /**
  Indicates whether this is an error node.
  */
  get isError() {
    return (this.flags & 4) > 0;
  }
  /**
  When true, this node type doesn't correspond to a user-declared
  named node, for example because it is used to cache repetition.
  */
  get isAnonymous() {
    return (this.flags & 8) > 0;
  }
  /**
  Returns true when this node's name or one of its
  [groups](#common.NodeProp^group) matches the given string.
  */
  is(e) {
    if (typeof e == "string") {
      if (this.name == e)
        return !0;
      let t = this.prop(E.group);
      return t ? t.indexOf(e) > -1 : !1;
    }
    return this.id == e;
  }
  /**
  Create a function from node types to arbitrary values by
  specifying an object whose property names are node or
  [group](#common.NodeProp^group) names. Often useful with
  [`NodeProp.add`](#common.NodeProp.add). You can put multiple
  names, separated by spaces, in a single property name to map
  multiple node names to a single value.
  */
  static match(e) {
    let t = /* @__PURE__ */ Object.create(null);
    for (let i in e)
      for (let n of i.split(" "))
        t[n] = e[i];
    return (i) => {
      for (let n = i.prop(E.group), r = -1; r < (n ? n.length : 0); r++) {
        let o = t[r < 0 ? i.name : n[r]];
        if (o)
          return o;
      }
    };
  }
}
de.none = new de(
  "",
  /* @__PURE__ */ Object.create(null),
  0,
  8
  /* NodeFlag.Anonymous */
);
class pa {
  /**
  Create a set with the given types. The `id` property of each
  type should correspond to its position within the array.
  */
  constructor(e) {
    this.types = e;
    for (let t = 0; t < e.length; t++)
      if (e[t].id != t)
        throw new RangeError("Node type ids should correspond to array positions when creating a node set");
  }
  /**
  Create a copy of this set with some node properties added. The
  arguments to this method can be created with
  [`NodeProp.add`](#common.NodeProp.add).
  */
  extend(...e) {
    let t = [];
    for (let i of this.types) {
      let n = null;
      for (let r of e) {
        let o = r(i);
        if (o) {
          n || (n = Object.assign({}, i.props));
          let l = o[1], a = o[0];
          a.combine && a.id in n && (l = a.combine(n[a.id], l)), n[a.id] = l;
        }
      }
      t.push(n ? new de(i.name, n, i.id, i.flags) : i);
    }
    return new pa(t);
  }
}
const Wi = /* @__PURE__ */ new WeakMap(), mo = /* @__PURE__ */ new WeakMap();
var H;
(function(s) {
  s[s.ExcludeBuffers = 1] = "ExcludeBuffers", s[s.IncludeAnonymous = 2] = "IncludeAnonymous", s[s.IgnoreMounts = 4] = "IgnoreMounts", s[s.IgnoreOverlays = 8] = "IgnoreOverlays", s[s.EnterBracketed = 16] = "EnterBracketed";
})(H || (H = {}));
class Y {
  /**
  Construct a new tree. See also [`Tree.build`](#common.Tree^build).
  */
  constructor(e, t, i, n, r) {
    if (this.type = e, this.children = t, this.positions = i, this.length = n, this.props = null, r && r.length) {
      this.props = /* @__PURE__ */ Object.create(null);
      for (let [o, l] of r)
        this.props[typeof o == "number" ? o : o.id] = l;
    }
  }
  /**
  @internal
  */
  toString() {
    let e = Rt.get(this);
    if (e && !e.overlay)
      return e.tree.toString();
    let t = "";
    for (let i of this.children) {
      let n = i.toString();
      n && (t && (t += ","), t += n);
    }
    return this.type.name ? (/\W/.test(this.type.name) && !this.type.isError ? JSON.stringify(this.type.name) : this.type.name) + (t.length ? "(" + t + ")" : "") : t;
  }
  /**
  Get a [tree cursor](#common.TreeCursor) positioned at the top of
  the tree. Mode can be used to [control](#common.IterMode) which
  nodes the cursor visits.
  */
  cursor(e = 0) {
    return new hn(this.topNode, e);
  }
  /**
  Get a [tree cursor](#common.TreeCursor) pointing into this tree
  at the given position and side (see
  [`moveTo`](#common.TreeCursor.moveTo).
  */
  cursorAt(e, t = 0, i = 0) {
    let n = Wi.get(this) || this.topNode, r = new hn(n);
    return r.moveTo(e, t), Wi.set(this, r._tree), r;
  }
  /**
  Get a [syntax node](#common.SyntaxNode) object for the top of the
  tree.
  */
  get topNode() {
    return new re(this, 0, 0, null);
  }
  /**
  Get the [syntax node](#common.SyntaxNode) at the given position.
  If `side` is -1, this will move into nodes that end at the
  position. If 1, it'll move into nodes that start at the
  position. With 0, it'll only enter nodes that cover the position
  from both sides.
  
  Note that this will not enter
  [overlays](#common.MountedTree.overlay), and you often want
  [`resolveInner`](#common.Tree.resolveInner) instead.
  */
  resolve(e, t = 0) {
    let i = di(Wi.get(this) || this.topNode, e, t, !1);
    return Wi.set(this, i), i;
  }
  /**
  Like [`resolve`](#common.Tree.resolve), but will enter
  [overlaid](#common.MountedTree.overlay) nodes, producing a syntax node
  pointing into the innermost overlaid tree at the given position
  (with parent links going through all parent structure, including
  the host trees).
  */
  resolveInner(e, t = 0) {
    let i = di(mo.get(this) || this.topNode, e, t, !0);
    return mo.set(this, i), i;
  }
  /**
  In some situations, it can be useful to iterate through all
  nodes around a position, including those in overlays that don't
  directly cover the position. This method gives you an iterator
  that will produce all nodes, from small to big, around the given
  position.
  */
  resolveStack(e, t = 0) {
    return hu(this, e, t);
  }
  /**
  Iterate over the tree and its children, calling `enter` for any
  node that touches the `from`/`to` region (if given) before
  running over such a node's children, and `leave` (if given) when
  leaving the node. When `enter` returns `false`, that node will
  not have its children iterated over (or `leave` called).
  */
  iterate(e) {
    let { enter: t, leave: i, from: n = 0, to: r = this.length } = e, o = e.mode || 0, l = (o & H.IncludeAnonymous) > 0;
    for (let a = this.cursor(o | H.IncludeAnonymous); ; ) {
      let h = !1;
      if (a.from <= r && a.to >= n && (!l && a.type.isAnonymous || t(a) !== !1)) {
        if (a.firstChild())
          continue;
        h = !0;
      }
      for (; h && i && (l || !a.type.isAnonymous) && i(a), !a.nextSibling(); ) {
        if (!a.parent())
          return;
        h = !0;
      }
    }
  }
  /**
  Get the value of the given [node prop](#common.NodeProp) for this
  node. Works with both per-node and per-type props.
  */
  prop(e) {
    return e.perNode ? this.props ? this.props[e.id] : void 0 : this.type.prop(e);
  }
  /**
  Returns the node's [per-node props](#common.NodeProp.perNode) in a
  format that can be passed to the [`Tree`](#common.Tree)
  constructor.
  */
  get propValues() {
    let e = [];
    if (this.props)
      for (let t in this.props)
        e.push([+t, this.props[t]]);
    return e;
  }
  /**
  Balance the direct children of this tree, producing a copy of
  which may have children grouped into subtrees with type
  [`NodeType.none`](#common.NodeType^none).
  */
  balance(e = {}) {
    return this.children.length <= 8 ? this : fr(de.none, this.children, this.positions, 0, this.children.length, 0, this.length, (t, i, n) => new Y(this.type, t, i, n, this.propValues), e.makeTree || ((t, i, n) => new Y(de.none, t, i, n)));
  }
  /**
  Build a tree from a postfix-ordered buffer of node information,
  or a cursor over such a buffer.
  */
  static build(e) {
    return fu(e);
  }
}
Y.empty = new Y(de.none, [], [], 0);
class ar {
  constructor(e, t) {
    this.buffer = e, this.index = t;
  }
  get id() {
    return this.buffer[this.index - 4];
  }
  get start() {
    return this.buffer[this.index - 3];
  }
  get end() {
    return this.buffer[this.index - 2];
  }
  get size() {
    return this.buffer[this.index - 1];
  }
  get pos() {
    return this.index;
  }
  next() {
    this.index -= 4;
  }
  fork() {
    return new ar(this.buffer, this.index);
  }
}
class ot {
  /**
  Create a tree buffer.
  */
  constructor(e, t, i) {
    this.buffer = e, this.length = t, this.set = i;
  }
  /**
  @internal
  */
  get type() {
    return de.none;
  }
  /**
  @internal
  */
  toString() {
    let e = [];
    for (let t = 0; t < this.buffer.length; )
      e.push(this.childString(t)), t = this.buffer[t + 3];
    return e.join(",");
  }
  /**
  @internal
  */
  childString(e) {
    let t = this.buffer[e], i = this.buffer[e + 3], n = this.set.types[t], r = n.name;
    if (/\W/.test(r) && !n.isError && (r = JSON.stringify(r)), e += 4, i == e)
      return r;
    let o = [];
    for (; e < i; )
      o.push(this.childString(e)), e = this.buffer[e + 3];
    return r + "(" + o.join(",") + ")";
  }
  /**
  @internal
  */
  findChild(e, t, i, n, r) {
    let { buffer: o } = this, l = -1;
    for (let a = e; a != t && !(ga(r, n, o[a + 1], o[a + 2]) && (l = a, i > 0)); a = o[a + 3])
      ;
    return l;
  }
  /**
  @internal
  */
  slice(e, t, i) {
    let n = this.buffer, r = new Uint16Array(t - e), o = 0;
    for (let l = e, a = 0; l < t; ) {
      r[a++] = n[l++], r[a++] = n[l++] - i;
      let h = r[a++] = n[l++] - i;
      r[a++] = n[l++] - e, o = Math.max(o, h);
    }
    return new ot(r, o, this.set);
  }
}
function ga(s, e, t, i) {
  switch (s) {
    case -2:
      return t < e;
    case -1:
      return i >= e && t < e;
    case 0:
      return t < e && i > e;
    case 1:
      return t <= e && i > e;
    case 2:
      return i > e;
    case 4:
      return !0;
  }
}
function di(s, e, t, i) {
  for (var n; s.from == s.to || (t < 1 ? s.from >= e : s.from > e) || (t > -1 ? s.to <= e : s.to < e); ) {
    let o = !i && s instanceof re && s.index < 0 ? null : s.parent;
    if (!o)
      return s;
    s = o;
  }
  let r = i ? 0 : H.IgnoreOverlays;
  if (i)
    for (let o = s, l = o.parent; l; o = l, l = o.parent)
      o instanceof re && o.index < 0 && ((n = l.enter(e, t, r)) === null || n === void 0 ? void 0 : n.from) != o.from && (s = l);
  for (; ; ) {
    let o = s.enter(e, t, r);
    if (!o)
      return s;
    s = o;
  }
}
class ma {
  cursor(e = 0) {
    return new hn(this, e);
  }
  getChild(e, t = null, i = null) {
    let n = yo(this, e, t, i);
    return n.length ? n[0] : null;
  }
  getChildren(e, t = null, i = null) {
    return yo(this, e, t, i);
  }
  resolve(e, t = 0) {
    return di(this, e, t, !1);
  }
  resolveInner(e, t = 0) {
    return di(this, e, t, !0);
  }
  matchContext(e) {
    return Ns(this.parent, e);
  }
  enterUnfinishedNodesBefore(e) {
    let t = this.childBefore(e), i = this;
    for (; t; ) {
      let n = t.lastChild;
      if (!n || n.to != t.to)
        break;
      n.type.isError && n.from == n.to ? (i = t, t = n.prevSibling) : t = n;
    }
    return i;
  }
  get node() {
    return this;
  }
  get next() {
    return this.parent;
  }
}
class re extends ma {
  constructor(e, t, i, n) {
    super(), this._tree = e, this.from = t, this.index = i, this._parent = n;
  }
  get type() {
    return this._tree.type;
  }
  get name() {
    return this._tree.type.name;
  }
  get to() {
    return this.from + this._tree.length;
  }
  nextChild(e, t, i, n, r = 0) {
    for (let o = this; ; ) {
      for (let { children: l, positions: a } = o._tree, h = t > 0 ? l.length : -1; e != h; e += t) {
        let f = l[e], c = a[e] + o.from, u;
        if (!(!(r & H.EnterBracketed && f instanceof Y && (u = Rt.get(f)) && !u.overlay && u.bracketed && i >= c && i <= c + f.length) && !ga(n, i, c, c + f.length))) {
          if (f instanceof ot) {
            if (r & H.ExcludeBuffers)
              continue;
            let d = f.findChild(0, f.buffer.length, t, i - c, n);
            if (d > -1)
              return new ze(new lu(o, f, e, c), null, d);
          } else if (r & H.IncludeAnonymous || !f.type.isAnonymous || hr(f)) {
            let d;
            if (!(r & H.IgnoreMounts) && (d = Rt.get(f)) && !d.overlay)
              return new re(d.tree, c, e, o);
            let p = new re(f, c, e, o);
            return r & H.IncludeAnonymous || !p.type.isAnonymous ? p : p.nextChild(t < 0 ? f.children.length - 1 : 0, t, i, n, r);
          }
        }
      }
      if (r & H.IncludeAnonymous || !o.type.isAnonymous || (o.index >= 0 ? e = o.index + t : e = t < 0 ? -1 : o._parent._tree.children.length, o = o._parent, !o))
        return null;
    }
  }
  get firstChild() {
    return this.nextChild(
      0,
      1,
      0,
      4
      /* Side.DontCare */
    );
  }
  get lastChild() {
    return this.nextChild(
      this._tree.children.length - 1,
      -1,
      0,
      4
      /* Side.DontCare */
    );
  }
  childAfter(e) {
    return this.nextChild(
      0,
      1,
      e,
      2
      /* Side.After */
    );
  }
  childBefore(e) {
    return this.nextChild(
      this._tree.children.length - 1,
      -1,
      e,
      -2
      /* Side.Before */
    );
  }
  prop(e) {
    return this._tree.prop(e);
  }
  enter(e, t, i = 0) {
    let n;
    if (!(i & H.IgnoreOverlays) && (n = Rt.get(this._tree)) && n.overlay) {
      let r = e - this.from, o = i & H.EnterBracketed && n.bracketed;
      for (let { from: l, to: a } of n.overlay)
        if ((t > 0 || o ? l <= r : l < r) && (t < 0 || o ? a >= r : a > r))
          return new re(n.tree, n.overlay[0].from + this.from, -1, this);
    }
    return this.nextChild(0, 1, e, t, i);
  }
  nextSignificantParent() {
    let e = this;
    for (; e.type.isAnonymous && e._parent; )
      e = e._parent;
    return e;
  }
  get parent() {
    return this._parent ? this._parent.nextSignificantParent() : null;
  }
  get nextSibling() {
    return this._parent && this.index >= 0 ? this._parent.nextChild(
      this.index + 1,
      1,
      0,
      4
      /* Side.DontCare */
    ) : null;
  }
  get prevSibling() {
    return this._parent && this.index >= 0 ? this._parent.nextChild(
      this.index - 1,
      -1,
      0,
      4
      /* Side.DontCare */
    ) : null;
  }
  get tree() {
    return this._tree;
  }
  toTree() {
    return this._tree;
  }
  /**
  @internal
  */
  toString() {
    return this._tree.toString();
  }
}
function yo(s, e, t, i) {
  let n = s.cursor(), r = [];
  if (!n.firstChild())
    return r;
  if (t != null) {
    for (let o = !1; !o; )
      if (o = n.type.is(t), !n.nextSibling())
        return r;
  }
  for (; ; ) {
    if (i != null && n.type.is(i))
      return r;
    if (n.type.is(e) && r.push(n.node), !n.nextSibling())
      return i == null ? r : [];
  }
}
function Ns(s, e, t = e.length - 1) {
  for (let i = s; t >= 0; i = i.parent) {
    if (!i)
      return !1;
    if (!i.type.isAnonymous) {
      if (e[t] && e[t] != i.name)
        return !1;
      t--;
    }
  }
  return !0;
}
class lu {
  constructor(e, t, i, n) {
    this.parent = e, this.buffer = t, this.index = i, this.start = n;
  }
}
class ze extends ma {
  get name() {
    return this.type.name;
  }
  get from() {
    return this.context.start + this.context.buffer.buffer[this.index + 1];
  }
  get to() {
    return this.context.start + this.context.buffer.buffer[this.index + 2];
  }
  constructor(e, t, i) {
    super(), this.context = e, this._parent = t, this.index = i, this.type = e.buffer.set.types[e.buffer.buffer[i]];
  }
  child(e, t, i) {
    let { buffer: n } = this.context, r = n.findChild(this.index + 4, n.buffer[this.index + 3], e, t - this.context.start, i);
    return r < 0 ? null : new ze(this.context, this, r);
  }
  get firstChild() {
    return this.child(
      1,
      0,
      4
      /* Side.DontCare */
    );
  }
  get lastChild() {
    return this.child(
      -1,
      0,
      4
      /* Side.DontCare */
    );
  }
  childAfter(e) {
    return this.child(
      1,
      e,
      2
      /* Side.After */
    );
  }
  childBefore(e) {
    return this.child(
      -1,
      e,
      -2
      /* Side.Before */
    );
  }
  prop(e) {
    return this.type.prop(e);
  }
  enter(e, t, i = 0) {
    if (i & H.ExcludeBuffers)
      return null;
    let { buffer: n } = this.context, r = n.findChild(this.index + 4, n.buffer[this.index + 3], t > 0 ? 1 : -1, e - this.context.start, t);
    return r < 0 ? null : new ze(this.context, this, r);
  }
  get parent() {
    return this._parent || this.context.parent.nextSignificantParent();
  }
  externalSibling(e) {
    return this._parent ? null : this.context.parent.nextChild(
      this.context.index + e,
      e,
      0,
      4
      /* Side.DontCare */
    );
  }
  get nextSibling() {
    let { buffer: e } = this.context, t = e.buffer[this.index + 3];
    return t < (this._parent ? e.buffer[this._parent.index + 3] : e.buffer.length) ? new ze(this.context, this._parent, t) : this.externalSibling(1);
  }
  get prevSibling() {
    let { buffer: e } = this.context, t = this._parent ? this._parent.index + 4 : 0;
    return this.index == t ? this.externalSibling(-1) : new ze(this.context, this._parent, e.findChild(
      t,
      this.index,
      -1,
      0,
      4
      /* Side.DontCare */
    ));
  }
  get tree() {
    return null;
  }
  toTree() {
    let e = [], t = [], { buffer: i } = this.context, n = this.index + 4, r = i.buffer[this.index + 3];
    if (r > n) {
      let o = i.buffer[this.index + 1];
      e.push(i.slice(n, r, o)), t.push(0);
    }
    return new Y(this.type, e, t, this.to - this.from);
  }
  /**
  @internal
  */
  toString() {
    return this.context.buffer.childString(this.index);
  }
}
function ya(s) {
  if (!s.length)
    return null;
  let e = 0, t = s[0];
  for (let r = 1; r < s.length; r++) {
    let o = s[r];
    (o.from > t.from || o.to < t.to) && (t = o, e = r);
  }
  let i = t instanceof re && t.index < 0 ? null : t.parent, n = s.slice();
  return i ? n[e] = i : n.splice(e, 1), new au(n, t);
}
class au {
  constructor(e, t) {
    this.heads = e, this.node = t;
  }
  get next() {
    return ya(this.heads);
  }
}
function hu(s, e, t) {
  let i = s.resolveInner(e, t), n = null;
  for (let r = i instanceof re ? i : i.context.parent; r; r = r.parent)
    if (r.index < 0) {
      let o = r.parent;
      (n || (n = [i])).push(o.resolve(e, t)), r = o;
    } else {
      let o = Rt.get(r.tree);
      if (o && o.overlay && o.overlay[0].from <= e && o.overlay[o.overlay.length - 1].to >= e) {
        let l = new re(o.tree, o.overlay[0].from + r.from, -1, r);
        (n || (n = [i])).push(di(l, e, t, !1));
      }
    }
  return n ? ya(n) : i;
}
class hn {
  /**
  Shorthand for `.type.name`.
  */
  get name() {
    return this.type.name;
  }
  /**
  @internal
  */
  constructor(e, t = 0) {
    if (this.buffer = null, this.stack = [], this.index = 0, this.bufferNode = null, this.mode = t & ~H.EnterBracketed, e instanceof re)
      this.yieldNode(e);
    else {
      this._tree = e.context.parent, this.buffer = e.context;
      for (let i = e._parent; i; i = i._parent)
        this.stack.unshift(i.index);
      this.bufferNode = e, this.yieldBuf(e.index);
    }
  }
  yieldNode(e) {
    return e ? (this._tree = e, this.type = e.type, this.from = e.from, this.to = e.to, !0) : !1;
  }
  yieldBuf(e, t) {
    this.index = e;
    let { start: i, buffer: n } = this.buffer;
    return this.type = t || n.set.types[n.buffer[e]], this.from = i + n.buffer[e + 1], this.to = i + n.buffer[e + 2], !0;
  }
  /**
  @internal
  */
  yield(e) {
    return e ? e instanceof re ? (this.buffer = null, this.yieldNode(e)) : (this.buffer = e.context, this.yieldBuf(e.index, e.type)) : !1;
  }
  /**
  @internal
  */
  toString() {
    return this.buffer ? this.buffer.buffer.childString(this.index) : this._tree.toString();
  }
  /**
  @internal
  */
  enterChild(e, t, i) {
    if (!this.buffer)
      return this.yield(this._tree.nextChild(e < 0 ? this._tree._tree.children.length - 1 : 0, e, t, i, this.mode));
    let { buffer: n } = this.buffer, r = n.findChild(this.index + 4, n.buffer[this.index + 3], e, t - this.buffer.start, i);
    return r < 0 ? !1 : (this.stack.push(this.index), this.yieldBuf(r));
  }
  /**
  Move the cursor to this node's first child. When this returns
  false, the node has no child, and the cursor has not been moved.
  */
  firstChild() {
    return this.enterChild(
      1,
      0,
      4
      /* Side.DontCare */
    );
  }
  /**
  Move the cursor to this node's last child.
  */
  lastChild() {
    return this.enterChild(
      -1,
      0,
      4
      /* Side.DontCare */
    );
  }
  /**
  Move the cursor to the first child that ends after `pos`.
  */
  childAfter(e) {
    return this.enterChild(
      1,
      e,
      2
      /* Side.After */
    );
  }
  /**
  Move to the last child that starts before `pos`.
  */
  childBefore(e) {
    return this.enterChild(
      -1,
      e,
      -2
      /* Side.Before */
    );
  }
  /**
  Move the cursor to the child around `pos`. If side is -1 the
  child may end at that position, when 1 it may start there. This
  will also enter [overlaid](#common.MountedTree.overlay)
  [mounted](#common.NodeProp^mounted) trees unless `overlays` is
  set to false.
  */
  enter(e, t, i = this.mode) {
    return this.buffer ? i & H.ExcludeBuffers ? !1 : this.enterChild(1, e, t) : this.yield(this._tree.enter(e, t, i));
  }
  /**
  Move to the node's parent node, if this isn't the top node.
  */
  parent() {
    if (!this.buffer)
      return this.yieldNode(this.mode & H.IncludeAnonymous ? this._tree._parent : this._tree.parent);
    if (this.stack.length)
      return this.yieldBuf(this.stack.pop());
    let e = this.mode & H.IncludeAnonymous ? this.buffer.parent : this.buffer.parent.nextSignificantParent();
    return this.buffer = null, this.yieldNode(e);
  }
  /**
  @internal
  */
  sibling(e) {
    if (!this.buffer)
      return this._tree._parent ? this.yield(this._tree.index < 0 ? null : this._tree._parent.nextChild(this._tree.index + e, e, 0, 4, this.mode)) : !1;
    let { buffer: t } = this.buffer, i = this.stack.length - 1;
    if (e < 0) {
      let n = i < 0 ? 0 : this.stack[i] + 4;
      if (this.index != n)
        return this.yieldBuf(t.findChild(
          n,
          this.index,
          -1,
          0,
          4
          /* Side.DontCare */
        ));
    } else {
      let n = t.buffer[this.index + 3];
      if (n < (i < 0 ? t.buffer.length : t.buffer[this.stack[i] + 3]))
        return this.yieldBuf(n);
    }
    return i < 0 ? this.yield(this.buffer.parent.nextChild(this.buffer.index + e, e, 0, 4, this.mode)) : !1;
  }
  /**
  Move to this node's next sibling, if any.
  */
  nextSibling() {
    return this.sibling(1);
  }
  /**
  Move to this node's previous sibling, if any.
  */
  prevSibling() {
    return this.sibling(-1);
  }
  atLastNode(e) {
    let t, i, { buffer: n } = this;
    if (n) {
      if (e > 0) {
        if (this.index < n.buffer.buffer.length)
          return !1;
      } else
        for (let r = 0; r < this.index; r++)
          if (n.buffer.buffer[r + 3] < this.index)
            return !1;
      ({ index: t, parent: i } = n);
    } else
      ({ index: t, _parent: i } = this._tree);
    for (; i; { index: t, _parent: i } = i)
      if (t > -1)
        for (let r = t + e, o = e < 0 ? -1 : i._tree.children.length; r != o; r += e) {
          let l = i._tree.children[r];
          if (this.mode & H.IncludeAnonymous || l instanceof ot || !l.type.isAnonymous || hr(l))
            return !1;
        }
    return !0;
  }
  move(e, t) {
    if (t && this.enterChild(
      e,
      0,
      4
      /* Side.DontCare */
    ))
      return !0;
    for (; ; ) {
      if (this.sibling(e))
        return !0;
      if (this.atLastNode(e) || !this.parent())
        return !1;
    }
  }
  /**
  Move to the next node in a
  [pre-order](https://en.wikipedia.org/wiki/Tree_traversal#Pre-order,_NLR)
  traversal, going from a node to its first child or, if the
  current node is empty or `enter` is false, its next sibling or
  the next sibling of the first parent node that has one.
  */
  next(e = !0) {
    return this.move(1, e);
  }
  /**
  Move to the next node in a last-to-first pre-order traversal. A
  node is followed by its last child or, if it has none, its
  previous sibling or the previous sibling of the first parent
  node that has one.
  */
  prev(e = !0) {
    return this.move(-1, e);
  }
  /**
  Move the cursor to the innermost node that covers `pos`. If
  `side` is -1, it will enter nodes that end at `pos`. If it is 1,
  it will enter nodes that start at `pos`.
  */
  moveTo(e, t = 0) {
    for (; (this.from == this.to || (t < 1 ? this.from >= e : this.from > e) || (t > -1 ? this.to <= e : this.to < e)) && this.parent(); )
      ;
    for (; this.enterChild(1, e, t); )
      ;
    return this;
  }
  /**
  Get a [syntax node](#common.SyntaxNode) at the cursor's current
  position.
  */
  get node() {
    if (!this.buffer)
      return this._tree;
    let e = this.bufferNode, t = null, i = 0;
    if (e && e.context == this.buffer)
      e: for (let n = this.index, r = this.stack.length; r >= 0; ) {
        for (let o = e; o; o = o._parent)
          if (o.index == n) {
            if (n == this.index)
              return o;
            t = o, i = r + 1;
            break e;
          }
        n = this.stack[--r];
      }
    for (let n = i; n < this.stack.length; n++)
      t = new ze(this.buffer, t, this.stack[n]);
    return this.bufferNode = new ze(this.buffer, t, this.index);
  }
  /**
  Get the [tree](#common.Tree) that represents the current node, if
  any. Will return null when the node is in a [tree
  buffer](#common.TreeBuffer).
  */
  get tree() {
    return this.buffer ? null : this._tree._tree;
  }
  /**
  Iterate over the current node and all its descendants, calling
  `enter` when entering a node and `leave`, if given, when leaving
  one. When `enter` returns `false`, any children of that node are
  skipped, and `leave` isn't called for it.
  */
  iterate(e, t) {
    for (let i = 0; ; ) {
      let n = !1;
      if (this.type.isAnonymous || e(this) !== !1) {
        if (this.firstChild()) {
          i++;
          continue;
        }
        this.type.isAnonymous || (n = !0);
      }
      for (; ; ) {
        if (n && t && t(this), n = this.type.isAnonymous, !i)
          return;
        if (this.nextSibling())
          break;
        this.parent(), i--, n = !0;
      }
    }
  }
  /**
  Test whether the current node matches a given context—a sequence
  of direct parent node names. Empty strings in the context array
  are treated as wildcards.
  */
  matchContext(e) {
    if (!this.buffer)
      return Ns(this.node.parent, e);
    let { buffer: t } = this.buffer, { types: i } = t.set;
    for (let n = e.length - 1, r = this.stack.length - 1; n >= 0; r--) {
      if (r < 0)
        return Ns(this._tree, e, n);
      let o = i[t.buffer[this.stack[r]]];
      if (!o.isAnonymous) {
        if (e[n] && e[n] != o.name)
          return !1;
        n--;
      }
    }
    return !0;
  }
}
function hr(s) {
  return s.children.some((e) => e instanceof ot || !e.type.isAnonymous || hr(e));
}
function fu(s) {
  var e;
  let { buffer: t, nodeSet: i, maxBufferLength: n = su, reused: r = [], minRepeatType: o = i.types.length } = s, l = Array.isArray(t) ? new ar(t, t.length) : t, a = i.types, h = 0, f = 0;
  function c(D, T, M, q, V, $) {
    let { id: R, start: O, end: K, size: j } = l, te = f, Xe = h;
    if (j < 0)
      if (l.next(), j == -1) {
        let $e = r[R];
        M.push($e), q.push(O - D);
        return;
      } else if (j == -3) {
        h = R;
        return;
      } else if (j == -4) {
        f = R;
        return;
      } else
        throw new RangeError(`Unrecognized record size: ${j}`);
    let Gt = a[R], vi, ft, kr = O - D;
    if (K - O <= n && (ft = m(l.pos - T, V))) {
      let $e = new Uint16Array(ft.size - ft.skip), be = l.pos - ft.size, Le = $e.length;
      for (; l.pos > be; )
        Le = y(ft.start, $e, Le);
      vi = new ot($e, K - ft.start, i), kr = ft.start - D;
    } else {
      let $e = l.pos - j;
      l.next();
      let be = [], Le = [], ct = R >= o ? R : -1, vt = 0, Ci = K;
      for (; l.pos > $e; )
        ct >= 0 && l.id == ct && l.size >= 0 ? (l.end <= Ci - n && (p(be, Le, O, vt, l.end, Ci, ct, te, Xe), vt = be.length, Ci = l.end), l.next()) : $ > 2500 ? u(O, $e, be, Le) : c(O, $e, be, Le, ct, $ + 1);
      if (ct >= 0 && vt > 0 && vt < be.length && p(be, Le, O, vt, O, Ci, ct, te, Xe), be.reverse(), Le.reverse(), ct > -1 && vt > 0) {
        let Sr = d(Gt, Xe);
        vi = fr(Gt, be, Le, 0, be.length, 0, K - O, Sr, Sr);
      } else
        vi = g(Gt, be, Le, K - O, te - K, Xe);
    }
    M.push(vi), q.push(kr);
  }
  function u(D, T, M, q) {
    let V = [], $ = 0, R = -1;
    for (; l.pos > T; ) {
      let { id: O, start: K, end: j, size: te } = l;
      if (te > 4)
        l.next();
      else {
        if (R > -1 && K < R)
          break;
        R < 0 && (R = j - n), V.push(O, K, j), $++, l.next();
      }
    }
    if ($) {
      let O = new Uint16Array($ * 4), K = V[V.length - 2];
      for (let j = V.length - 3, te = 0; j >= 0; j -= 3)
        O[te++] = V[j], O[te++] = V[j + 1] - K, O[te++] = V[j + 2] - K, O[te++] = te;
      M.push(new ot(O, V[2] - K, i)), q.push(K - D);
    }
  }
  function d(D, T) {
    return (M, q, V) => {
      let $ = 0, R = M.length - 1, O, K;
      if (R >= 0 && (O = M[R]) instanceof Y) {
        if (!R && O.type == D && O.length == V)
          return O;
        (K = O.prop(E.lookAhead)) && ($ = q[R] + O.length + K);
      }
      return g(D, M, q, V, $, T);
    };
  }
  function p(D, T, M, q, V, $, R, O, K) {
    let j = [], te = [];
    for (; D.length > q; )
      j.push(D.pop()), te.push(T.pop() + M - V);
    D.push(g(i.types[R], j, te, $ - V, O - $, K)), T.push(V - M);
  }
  function g(D, T, M, q, V, $, R) {
    if ($) {
      let O = [E.contextHash, $];
      R = R ? [O].concat(R) : [O];
    }
    if (V > 25) {
      let O = [E.lookAhead, V];
      R = R ? [O].concat(R) : [O];
    }
    return new Y(D, T, M, q, R);
  }
  function m(D, T) {
    let M = l.fork(), q = 0, V = 0, $ = 0, R = M.end - n, O = { size: 0, start: 0, skip: 0 };
    e: for (let K = M.pos - D; M.pos > K; ) {
      let j = M.size;
      if (M.id == T && j >= 0) {
        O.size = q, O.start = V, O.skip = $, $ += 4, q += 4, M.next();
        continue;
      }
      let te = M.pos - j;
      if (j < 0 || te < K || M.start < R)
        break;
      let Xe = M.id >= o ? 4 : 0, Gt = M.start;
      for (M.next(); M.pos > te; ) {
        if (M.size < 0)
          if (M.size == -3 || M.size == -4)
            Xe += 4;
          else
            break e;
        else M.id >= o && (Xe += 4);
        M.next();
      }
      V = Gt, q += j, $ += Xe;
    }
    return (T < 0 || q == D) && (O.size = q, O.start = V, O.skip = $), O.size > 4 ? O : void 0;
  }
  function y(D, T, M) {
    let { id: q, start: V, end: $, size: R } = l;
    if (l.next(), R >= 0 && q < o) {
      let O = M;
      if (R > 4) {
        let K = l.pos - (R - 4);
        for (; l.pos > K; )
          M = y(D, T, M);
      }
      T[--M] = O, T[--M] = $ - D, T[--M] = V - D, T[--M] = q;
    } else R == -3 ? h = q : R == -4 && (f = q);
    return M;
  }
  let b = [], C = [];
  for (; l.pos > 0; )
    c(s.start || 0, s.bufferStart || 0, b, C, -1, 0);
  let P = (e = s.length) !== null && e !== void 0 ? e : b.length ? C[0] + b[0].length : 0;
  return new Y(a[s.topID], b.reverse(), C.reverse(), P);
}
const xo = /* @__PURE__ */ new WeakMap();
function Ji(s, e) {
  if (!s.isAnonymous || e instanceof ot || e.type != s)
    return 1;
  let t = xo.get(e);
  if (t == null) {
    t = 1;
    for (let i of e.children) {
      if (i.type != s || !(i instanceof Y)) {
        t = 1;
        break;
      }
      t += Ji(s, i);
    }
    xo.set(e, t);
  }
  return t;
}
function fr(s, e, t, i, n, r, o, l, a) {
  let h = 0;
  for (let p = i; p < n; p++)
    h += Ji(s, e[p]);
  let f = Math.ceil(
    h * 1.5 / 8
    /* Balance.BranchFactor */
  ), c = [], u = [];
  function d(p, g, m, y, b) {
    for (let C = m; C < y; ) {
      let P = C, D = g[C], T = Ji(s, p[C]);
      for (C++; C < y; C++) {
        let M = Ji(s, p[C]);
        if (T + M >= f)
          break;
        T += M;
      }
      if (C == P + 1) {
        if (T > f) {
          let M = p[P];
          d(M.children, M.positions, 0, M.children.length, g[P] + b);
          continue;
        }
        c.push(p[P]);
      } else {
        let M = g[C - 1] + p[C - 1].length - D;
        c.push(fr(s, p, g, P, C, D, M, null, a));
      }
      u.push(D + b - r);
    }
  }
  return d(e, t, i, n, 0), (l || a)(c, u, o);
}
class cg {
  constructor() {
    this.map = /* @__PURE__ */ new WeakMap();
  }
  setBuffer(e, t, i) {
    let n = this.map.get(e);
    n || this.map.set(e, n = /* @__PURE__ */ new Map()), n.set(t, i);
  }
  getBuffer(e, t) {
    let i = this.map.get(e);
    return i && i.get(t);
  }
  /**
  Set the value for this syntax node.
  */
  set(e, t) {
    e instanceof ze ? this.setBuffer(e.context.buffer, e.index, t) : e instanceof re && this.map.set(e.tree, t);
  }
  /**
  Retrieve value for this syntax node, if it exists in the map.
  */
  get(e) {
    return e instanceof ze ? this.getBuffer(e.context.buffer, e.index) : e instanceof re ? this.map.get(e.tree) : void 0;
  }
  /**
  Set the value for the node that a cursor currently points to.
  */
  cursorSet(e, t) {
    e.buffer ? this.setBuffer(e.buffer.buffer, e.index, t) : this.map.set(e.tree, t);
  }
  /**
  Retrieve the value for the node that a cursor currently points
  to.
  */
  cursorGet(e) {
    return e.buffer ? this.getBuffer(e.buffer.buffer, e.index) : this.map.get(e.tree);
  }
}
class _e {
  /**
  Construct a tree fragment. You'll usually want to use
  [`addTree`](#common.TreeFragment^addTree) and
  [`applyChanges`](#common.TreeFragment^applyChanges) instead of
  calling this directly.
  */
  constructor(e, t, i, n, r = !1, o = !1) {
    this.from = e, this.to = t, this.tree = i, this.offset = n, this.open = (r ? 1 : 0) | (o ? 2 : 0);
  }
  /**
  Whether the start of the fragment represents the start of a
  parse, or the end of a change. (In the second case, it may not
  be safe to reuse some nodes at the start, depending on the
  parsing algorithm.)
  */
  get openStart() {
    return (this.open & 1) > 0;
  }
  /**
  Whether the end of the fragment represents the end of a
  full-document parse, or the start of a change.
  */
  get openEnd() {
    return (this.open & 2) > 0;
  }
  /**
  Create a set of fragments from a freshly parsed tree, or update
  an existing set of fragments by replacing the ones that overlap
  with a tree with content from the new tree. When `partial` is
  true, the parse is treated as incomplete, and the resulting
  fragment has [`openEnd`](#common.TreeFragment.openEnd) set to
  true.
  */
  static addTree(e, t = [], i = !1) {
    let n = [new _e(0, e.length, e, 0, !1, i)];
    for (let r of t)
      r.to > e.length && n.push(r);
    return n;
  }
  /**
  Apply a set of edits to an array of fragments, removing or
  splitting fragments as necessary to remove edited ranges, and
  adjusting offsets for fragments that moved.
  */
  static applyChanges(e, t, i = 128) {
    if (!t.length)
      return e;
    let n = [], r = 1, o = e.length ? e[0] : null;
    for (let l = 0, a = 0, h = 0; ; l++) {
      let f = l < t.length ? t[l] : null, c = f ? f.fromA : 1e9;
      if (c - a >= i)
        for (; o && o.from < c; ) {
          let u = o;
          if (a >= u.from || c <= u.to || h) {
            let d = Math.max(u.from, a) - h, p = Math.min(u.to, c) - h;
            u = d >= p ? null : new _e(d, p, u.tree, u.offset + h, l > 0, !!f);
          }
          if (u && n.push(u), o.to > c)
            break;
          o = r < e.length ? e[r++] : null;
        }
      if (!f)
        break;
      a = f.toA, h = f.toA - f.toB;
    }
    return n;
  }
}
class cu {
  /**
  Start a parse, returning a [partial parse](#common.PartialParse)
  object. [`fragments`](#common.TreeFragment) can be passed in to
  make the parse incremental.
  
  By default, the entire input is parsed. You can pass `ranges`,
  which should be a sorted array of non-empty, non-overlapping
  ranges, to parse only those ranges. The tree returned in that
  case will start at `ranges[0].from`.
  */
  startParse(e, t, i) {
    return typeof e == "string" && (e = new uu(e)), i = i ? i.length ? i.map((n) => new Se(n.from, n.to)) : [new Se(0, 0)] : [new Se(0, e.length)], this.createParse(e, t || [], i);
  }
  /**
  Run a full parse, returning the resulting tree.
  */
  parse(e, t, i) {
    let n = this.startParse(e, t, i);
    for (; ; ) {
      let r = n.advance();
      if (r)
        return r;
    }
  }
}
class uu {
  constructor(e) {
    this.string = e;
  }
  get length() {
    return this.string.length;
  }
  chunk(e) {
    return this.string.slice(e);
  }
  get lineChunks() {
    return !1;
  }
  read(e, t) {
    return this.string.slice(e, t);
  }
}
function ug(s) {
  return (e, t, i, n) => new pu(e, s, t, i, n);
}
class bo {
  constructor(e, t, i, n, r, o) {
    this.parser = e, this.parse = t, this.overlay = i, this.bracketed = n, this.target = r, this.from = o;
  }
}
function wo(s) {
  if (!s.length || s.some((e) => e.from >= e.to))
    throw new RangeError("Invalid inner parse ranges given: " + JSON.stringify(s));
}
class du {
  constructor(e, t, i, n, r, o, l, a) {
    this.parser = e, this.predicate = t, this.mounts = i, this.index = n, this.start = r, this.bracketed = o, this.target = l, this.prev = a, this.depth = 0, this.ranges = [];
  }
}
const Ws = new E({ perNode: !0 });
class pu {
  constructor(e, t, i, n, r) {
    this.nest = t, this.input = i, this.fragments = n, this.ranges = r, this.inner = [], this.innerDone = 0, this.baseTree = null, this.stoppedAt = null, this.baseParse = e;
  }
  advance() {
    if (this.baseParse) {
      let i = this.baseParse.advance();
      if (!i)
        return null;
      if (this.baseParse = null, this.baseTree = i, this.startInner(), this.stoppedAt != null)
        for (let n of this.inner)
          n.parse.stopAt(this.stoppedAt);
    }
    if (this.innerDone == this.inner.length) {
      let i = this.baseTree;
      return this.stoppedAt != null && (i = new Y(i.type, i.children, i.positions, i.length, i.propValues.concat([[Ws, this.stoppedAt]]))), i;
    }
    let e = this.inner[this.innerDone], t = e.parse.advance();
    if (t) {
      this.innerDone++;
      let i = Object.assign(/* @__PURE__ */ Object.create(null), e.target.props);
      i[E.mounted.id] = new Rt(t, e.overlay, e.parser, e.bracketed), e.target.props = i;
    }
    return null;
  }
  get parsedPos() {
    if (this.baseParse)
      return 0;
    let e = this.input.length;
    for (let t = this.innerDone; t < this.inner.length; t++)
      this.inner[t].from < e && (e = Math.min(e, this.inner[t].parse.parsedPos));
    return e;
  }
  stopAt(e) {
    if (this.stoppedAt = e, this.baseParse)
      this.baseParse.stopAt(e);
    else
      for (let t = this.innerDone; t < this.inner.length; t++)
        this.inner[t].parse.stopAt(e);
  }
  startInner() {
    let e = new yu(this.fragments), t = null, i = null, n = new hn(new re(this.baseTree, this.ranges[0].from, 0, null), H.IncludeAnonymous | H.IgnoreMounts);
    e: for (let r, o; ; ) {
      let l = !0, a;
      if (this.stoppedAt != null && n.from >= this.stoppedAt)
        l = !1;
      else if (e.hasNode(n)) {
        if (t) {
          let h = t.mounts.find((f) => f.frag.from <= n.from && f.frag.to >= n.to && f.mount.overlay);
          if (h)
            for (let f of h.mount.overlay) {
              let c = f.from + h.pos, u = f.to + h.pos;
              c >= n.from && u <= n.to && !t.ranges.some((d) => d.from < u && d.to > c) && t.ranges.push({ from: c, to: u });
            }
        }
        l = !1;
      } else if (i && (o = gu(i.ranges, n.from, n.to)))
        l = o != 2;
      else if (!n.type.isAnonymous && (r = this.nest(n, this.input)) && (n.from < n.to || !r.overlay)) {
        n.tree || (mu(n), t && t.depth++, i && i.depth++);
        let h = e.findMounts(n.from, r.parser);
        if (typeof r.overlay == "function")
          t = new du(r.parser, r.overlay, h, this.inner.length, n.from, !!r.bracketed, n.tree, t);
        else {
          let f = vo(this.ranges, r.overlay || (n.from < n.to ? [new Se(n.from, n.to)] : []));
          f.length && wo(f), (f.length || !r.overlay) && this.inner.push(new bo(r.parser, f.length ? r.parser.startParse(this.input, Co(h, f), f) : r.parser.startParse(""), r.overlay ? r.overlay.map((c) => new Se(c.from - n.from, c.to - n.from)) : null, !!r.bracketed, n.tree, f.length ? f[0].from : n.from)), r.overlay ? f.length && (i = { ranges: f, depth: 0, prev: i }) : l = !1;
        }
      } else if (t && (a = t.predicate(n)) && (a === !0 && (a = new Se(n.from, n.to)), a.from < a.to)) {
        let h = t.ranges.length - 1;
        h >= 0 && t.ranges[h].to == a.from ? t.ranges[h] = { from: t.ranges[h].from, to: a.to } : t.ranges.push(a);
      }
      if (l && n.firstChild())
        t && t.depth++, i && i.depth++;
      else
        for (; !n.nextSibling(); ) {
          if (!n.parent())
            break e;
          if (t && !--t.depth) {
            let h = vo(this.ranges, t.ranges);
            h.length && (wo(h), this.inner.splice(t.index, 0, new bo(t.parser, t.parser.startParse(this.input, Co(t.mounts, h), h), t.ranges.map((f) => new Se(f.from - t.start, f.to - t.start)), t.bracketed, t.target, h[0].from))), t = t.prev;
          }
          i && !--i.depth && (i = i.prev);
        }
    }
  }
}
function gu(s, e, t) {
  for (let i of s) {
    if (i.from >= t)
      break;
    if (i.to > e)
      return i.from <= e && i.to >= t ? 2 : 1;
  }
  return 0;
}
function ko(s, e, t, i, n, r) {
  if (e < t) {
    let o = s.buffer[e + 1];
    i.push(s.slice(e, t, o)), n.push(o - r);
  }
}
function mu(s) {
  let { node: e } = s, t = [], i = e.context.buffer;
  do
    t.push(s.index), s.parent();
  while (!s.tree);
  let n = s.tree, r = n.children.indexOf(i), o = n.children[r], l = o.buffer, a = [r];
  function h(f, c, u, d, p, g) {
    let m = t[g], y = [], b = [];
    ko(o, f, m, y, b, d);
    let C = l[m + 1], P = l[m + 2];
    a.push(y.length);
    let D = g ? h(m + 4, l[m + 3], o.set.types[l[m]], C, P - C, g - 1) : e.toTree();
    return y.push(D), b.push(C - d), ko(o, l[m + 3], c, y, b, d), new Y(u, y, b, p);
  }
  n.children[r] = h(0, l.length, de.none, 0, o.length, t.length - 1);
  for (let f of a) {
    let c = s.tree.children[f], u = s.tree.positions[f];
    s.yield(new re(c, u + s.from, f, s._tree));
  }
}
class So {
  constructor(e, t) {
    this.offset = t, this.done = !1, this.cursor = e.cursor(H.IncludeAnonymous | H.IgnoreMounts);
  }
  // Move to the first node (in pre-order) that starts at or after `pos`.
  moveTo(e) {
    let { cursor: t } = this, i = e - this.offset;
    for (; !this.done && t.from < i; )
      if (!(t.to >= e && t.enter(i, 1, H.IgnoreOverlays | H.ExcludeBuffers))) if (t.to <= e)
        t.next(!1) || (this.done = !0);
      else
        break;
  }
  hasNode(e) {
    if (this.moveTo(e.from), !this.done && this.cursor.from + this.offset == e.from && this.cursor.tree)
      for (let t = this.cursor.tree; ; ) {
        if (t == e.tree)
          return !0;
        if (t.children.length && t.positions[0] == 0 && t.children[0] instanceof Y)
          t = t.children[0];
        else
          break;
      }
    return !1;
  }
}
class yu {
  constructor(e) {
    var t;
    if (this.fragments = e, this.curTo = 0, this.fragI = 0, e.length) {
      let i = this.curFrag = e[0];
      this.curTo = (t = i.tree.prop(Ws)) !== null && t !== void 0 ? t : i.to, this.inner = new So(i.tree, -i.offset);
    } else
      this.curFrag = this.inner = null;
  }
  hasNode(e) {
    for (; this.curFrag && e.from >= this.curTo; )
      this.nextFrag();
    return this.curFrag && this.curFrag.from <= e.from && this.curTo >= e.to && this.inner.hasNode(e);
  }
  nextFrag() {
    var e;
    if (this.fragI++, this.fragI == this.fragments.length)
      this.curFrag = this.inner = null;
    else {
      let t = this.curFrag = this.fragments[this.fragI];
      this.curTo = (e = t.tree.prop(Ws)) !== null && e !== void 0 ? e : t.to, this.inner = new So(t.tree, -t.offset);
    }
  }
  findMounts(e, t) {
    var i;
    let n = [];
    if (this.inner) {
      this.inner.cursor.moveTo(e, 1);
      for (let r = this.inner.cursor.node; r; r = r.parent) {
        let o = (i = r.tree) === null || i === void 0 ? void 0 : i.prop(E.mounted);
        if (o && o.parser == t)
          for (let l = this.fragI; l < this.fragments.length; l++) {
            let a = this.fragments[l];
            if (a.from >= r.to)
              break;
            a.tree == this.curFrag.tree && n.push({
              frag: a,
              pos: r.from - a.offset,
              mount: o
            });
          }
      }
    }
    return n;
  }
}
function vo(s, e) {
  let t = null, i = e;
  for (let n = 1, r = 0; n < s.length; n++) {
    let o = s[n - 1].to, l = s[n].from;
    for (; r < i.length; r++) {
      let a = i[r];
      if (a.from >= l)
        break;
      a.to <= o || (t || (i = t = e.slice()), a.from < o ? (t[r] = new Se(a.from, o), a.to > l && t.splice(r + 1, 0, new Se(l, a.to))) : a.to > l ? t[r--] = new Se(l, a.to) : t.splice(r--, 1));
    }
  }
  return i;
}
function xu(s, e, t, i) {
  let n = 0, r = 0, o = !1, l = !1, a = -1e9, h = [];
  for (; ; ) {
    let f = n == s.length ? 1e9 : o ? s[n].to : s[n].from, c = r == e.length ? 1e9 : l ? e[r].to : e[r].from;
    if (o != l) {
      let u = Math.max(a, t), d = Math.min(f, c, i);
      u < d && h.push(new Se(u, d));
    }
    if (a = Math.min(f, c), a == 1e9)
      break;
    f == a && (o ? (o = !1, n++) : o = !0), c == a && (l ? (l = !1, r++) : l = !0);
  }
  return h;
}
function Co(s, e) {
  let t = [];
  for (let { pos: i, mount: n, frag: r } of s) {
    let o = i + (n.overlay ? n.overlay[0].from : 0), l = o + n.tree.length, a = Math.max(r.from, o), h = Math.min(r.to, l);
    if (n.overlay) {
      let f = n.overlay.map((u) => new Se(u.from + i, u.to + i)), c = xu(e, f, a, h);
      for (let u = 0, d = a; ; u++) {
        let p = u == c.length, g = p ? h : c[u].from;
        if (g > d && t.push(new _e(d, g, n.tree, -o, r.from >= d || r.openStart, r.to <= g || r.openEnd)), p)
          break;
        d = c[u].to;
      }
    } else
      t.push(new _e(a, h, n.tree, -o, r.from >= o || r.openStart, r.to <= l || r.openEnd));
  }
  return t;
}
let bu = 0;
class we {
  /**
  @internal
  */
  constructor(e, t, i, n) {
    this.name = e, this.set = t, this.base = i, this.modified = n, this.id = bu++;
  }
  toString() {
    let { name: e } = this;
    for (let t of this.modified)
      t.name && (e = `${t.name}(${e})`);
    return e;
  }
  static define(e, t) {
    let i = typeof e == "string" ? e : "?";
    if (e instanceof we && (t = e), t?.base)
      throw new Error("Can not derive from a modified tag");
    let n = new we(i, [], null, []);
    if (n.set.push(n), t)
      for (let r of t.set)
        n.set.push(r);
    return n;
  }
  /**
  Define a tag _modifier_, which is a function that, given a tag,
  will return a tag that is a subtag of the original. Applying the
  same modifier to a twice tag will return the same value (`m1(t1)
  == m1(t1)`) and applying multiple modifiers will, regardless or
  order, produce the same tag (`m1(m2(t1)) == m2(m1(t1))`).
  
  When multiple modifiers are applied to a given base tag, each
  smaller set of modifiers is registered as a parent, so that for
  example `m1(m2(m3(t1)))` is a subtype of `m1(m2(t1))`,
  `m1(m3(t1)`, and so on.
  */
  static defineModifier(e) {
    let t = new fn(e);
    return (i) => i.modified.indexOf(t) > -1 ? i : fn.get(i.base || i, i.modified.concat(t).sort((n, r) => n.id - r.id));
  }
}
let wu = 0;
class fn {
  constructor(e) {
    this.name = e, this.instances = [], this.id = wu++;
  }
  static get(e, t) {
    if (!t.length)
      return e;
    let i = t[0].instances.find((l) => l.base == e && ku(t, l.modified));
    if (i)
      return i;
    let n = [], r = new we(e.name, n, e, t);
    for (let l of t)
      l.instances.push(r);
    let o = Su(t);
    for (let l of e.set)
      if (!l.modified.length)
        for (let a of o)
          n.push(fn.get(l, a));
    return r;
  }
}
function ku(s, e) {
  return s.length == e.length && s.every((t, i) => t == e[i]);
}
function Su(s) {
  let e = [[]];
  for (let t = 0; t < s.length; t++)
    for (let i = 0, n = e.length; i < n; i++)
      e.push(e[i].concat(s[t]));
  return e.sort((t, i) => i.length - t.length);
}
function vu(s) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in s) {
    let i = s[t];
    Array.isArray(i) || (i = [i]);
    for (let n of t.split(" "))
      if (n) {
        let r = [], o = 2, l = n;
        for (let c = 0; ; ) {
          if (l == "..." && c > 0 && c + 3 == n.length) {
            o = 1;
            break;
          }
          let u = /^"(?:[^"\\]|\\.)*?"|[^\/!]+/.exec(l);
          if (!u)
            throw new RangeError("Invalid path: " + n);
          if (r.push(u[0] == "*" ? "" : u[0][0] == '"' ? JSON.parse(u[0]) : u[0]), c += u[0].length, c == n.length)
            break;
          let d = n[c++];
          if (c == n.length && d == "!") {
            o = 0;
            break;
          }
          if (d != "/")
            throw new RangeError("Invalid path: " + n);
          l = n.slice(c);
        }
        let a = r.length - 1, h = r[a];
        if (!h)
          throw new RangeError("Invalid path: " + n);
        let f = new pi(i, o, a > 0 ? r.slice(0, a) : null);
        e[h] = f.sort(e[h]);
      }
  }
  return xa.add(e);
}
const xa = new E({
  combine(s, e) {
    let t, i, n;
    for (; s || e; ) {
      if (!s || e && s.depth >= e.depth ? (n = e, e = e.next) : (n = s, s = s.next), t && t.mode == n.mode && !n.context && !t.context)
        continue;
      let r = new pi(n.tags, n.mode, n.context);
      t ? t.next = r : i = r, t = r;
    }
    return i;
  }
});
class pi {
  constructor(e, t, i, n) {
    this.tags = e, this.mode = t, this.context = i, this.next = n;
  }
  get opaque() {
    return this.mode == 0;
  }
  get inherit() {
    return this.mode == 1;
  }
  sort(e) {
    return !e || e.depth < this.depth ? (this.next = e, this) : (e.next = this.sort(e.next), e);
  }
  get depth() {
    return this.context ? this.context.length : 0;
  }
}
pi.empty = new pi([], 2, null);
function ba(s, e) {
  let t = /* @__PURE__ */ Object.create(null);
  for (let r of s)
    if (!Array.isArray(r.tag))
      t[r.tag.id] = r.class;
    else
      for (let o of r.tag)
        t[o.id] = r.class;
  let { scope: i, all: n = null } = e || {};
  return {
    style: (r) => {
      let o = n;
      for (let l of r)
        for (let a of l.set) {
          let h = t[a.id];
          if (h) {
            o = o ? o + " " + h : h;
            break;
          }
        }
      return o;
    },
    scope: i
  };
}
function Cu(s, e) {
  let t = null;
  for (let i of s) {
    let n = i.style(e);
    n && (t = t ? t + " " + n : n);
  }
  return t;
}
function Au(s, e, t, i = 0, n = s.length) {
  let r = new Mu(i, Array.isArray(e) ? e : [e], t);
  r.highlightRange(s.cursor(), i, n, "", r.highlighters), r.flush(n);
}
class Mu {
  constructor(e, t, i) {
    this.at = e, this.highlighters = t, this.span = i, this.class = "";
  }
  startSpan(e, t) {
    t != this.class && (this.flush(e), e > this.at && (this.at = e), this.class = t);
  }
  flush(e) {
    e > this.at && this.class && this.span(this.at, e, this.class);
  }
  highlightRange(e, t, i, n, r) {
    let { type: o, from: l, to: a } = e;
    if (l >= i || a <= t)
      return;
    o.isTop && (r = this.highlighters.filter((d) => !d.scope || d.scope(o)));
    let h = n, f = Du(e) || pi.empty, c = Cu(r, f.tags);
    if (c && (h && (h += " "), h += c, f.mode == 1 && (n += (n ? " " : "") + c)), this.startSpan(Math.max(t, l), h), f.opaque)
      return;
    let u = e.tree && e.tree.prop(E.mounted);
    if (u && u.overlay) {
      let d = e.node.enter(u.overlay[0].from + l, 1), p = this.highlighters.filter((m) => !m.scope || m.scope(u.tree.type)), g = e.firstChild();
      for (let m = 0, y = l; ; m++) {
        let b = m < u.overlay.length ? u.overlay[m] : null, C = b ? b.from + l : a, P = Math.max(t, y), D = Math.min(i, C);
        if (P < D && g)
          for (; e.from < D && (this.highlightRange(e, P, D, n, r), this.startSpan(Math.min(D, e.to), h), !(e.to >= C || !e.nextSibling())); )
            ;
        if (!b || C > i)
          break;
        y = b.to + l, y > t && (this.highlightRange(d.cursor(), Math.max(t, b.from + l), Math.min(i, y), "", p), this.startSpan(Math.min(i, y), h));
      }
      g && e.parent();
    } else if (e.firstChild()) {
      u && (n = "");
      do
        if (!(e.to <= t)) {
          if (e.from >= i)
            break;
          this.highlightRange(e, t, i, n, r), this.startSpan(Math.min(i, e.to), h);
        }
      while (e.nextSibling());
      e.parent();
    }
  }
}
function Du(s) {
  let e = s.type.prop(xa);
  for (; e && e.context && !s.matchContext(e.context); )
    e = e.next;
  return e || null;
}
const w = we.define, Fi = w(), Qe = w(), Ao = w(Qe), Mo = w(Qe), Ze = w(), Hi = w(Ze), Yn = w(Ze), Ne = w(), ut = w(Ne), Re = w(), Ie = w(), Fs = w(), Yt = w(Fs), Vi = w(), k = {
  /**
  A comment.
  */
  comment: Fi,
  /**
  A line [comment](#highlight.tags.comment).
  */
  lineComment: w(Fi),
  /**
  A block [comment](#highlight.tags.comment).
  */
  blockComment: w(Fi),
  /**
  A documentation [comment](#highlight.tags.comment).
  */
  docComment: w(Fi),
  /**
  Any kind of identifier.
  */
  name: Qe,
  /**
  The [name](#highlight.tags.name) of a variable.
  */
  variableName: w(Qe),
  /**
  A type [name](#highlight.tags.name).
  */
  typeName: Ao,
  /**
  A tag name (subtag of [`typeName`](#highlight.tags.typeName)).
  */
  tagName: w(Ao),
  /**
  A property or field [name](#highlight.tags.name).
  */
  propertyName: Mo,
  /**
  An attribute name (subtag of [`propertyName`](#highlight.tags.propertyName)).
  */
  attributeName: w(Mo),
  /**
  The [name](#highlight.tags.name) of a class.
  */
  className: w(Qe),
  /**
  A label [name](#highlight.tags.name).
  */
  labelName: w(Qe),
  /**
  A namespace [name](#highlight.tags.name).
  */
  namespace: w(Qe),
  /**
  The [name](#highlight.tags.name) of a macro.
  */
  macroName: w(Qe),
  /**
  A literal value.
  */
  literal: Ze,
  /**
  A string [literal](#highlight.tags.literal).
  */
  string: Hi,
  /**
  A documentation [string](#highlight.tags.string).
  */
  docString: w(Hi),
  /**
  A character literal (subtag of [string](#highlight.tags.string)).
  */
  character: w(Hi),
  /**
  An attribute value (subtag of [string](#highlight.tags.string)).
  */
  attributeValue: w(Hi),
  /**
  A number [literal](#highlight.tags.literal).
  */
  number: Yn,
  /**
  An integer [number](#highlight.tags.number) literal.
  */
  integer: w(Yn),
  /**
  A floating-point [number](#highlight.tags.number) literal.
  */
  float: w(Yn),
  /**
  A boolean [literal](#highlight.tags.literal).
  */
  bool: w(Ze),
  /**
  Regular expression [literal](#highlight.tags.literal).
  */
  regexp: w(Ze),
  /**
  An escape [literal](#highlight.tags.literal), for example a
  backslash escape in a string.
  */
  escape: w(Ze),
  /**
  A color [literal](#highlight.tags.literal).
  */
  color: w(Ze),
  /**
  A URL [literal](#highlight.tags.literal).
  */
  url: w(Ze),
  /**
  A language keyword.
  */
  keyword: Re,
  /**
  The [keyword](#highlight.tags.keyword) for the self or this
  object.
  */
  self: w(Re),
  /**
  The [keyword](#highlight.tags.keyword) for null.
  */
  null: w(Re),
  /**
  A [keyword](#highlight.tags.keyword) denoting some atomic value.
  */
  atom: w(Re),
  /**
  A [keyword](#highlight.tags.keyword) that represents a unit.
  */
  unit: w(Re),
  /**
  A modifier [keyword](#highlight.tags.keyword).
  */
  modifier: w(Re),
  /**
  A [keyword](#highlight.tags.keyword) that acts as an operator.
  */
  operatorKeyword: w(Re),
  /**
  A control-flow related [keyword](#highlight.tags.keyword).
  */
  controlKeyword: w(Re),
  /**
  A [keyword](#highlight.tags.keyword) that defines something.
  */
  definitionKeyword: w(Re),
  /**
  A [keyword](#highlight.tags.keyword) related to defining or
  interfacing with modules.
  */
  moduleKeyword: w(Re),
  /**
  An operator.
  */
  operator: Ie,
  /**
  An [operator](#highlight.tags.operator) that dereferences something.
  */
  derefOperator: w(Ie),
  /**
  Arithmetic-related [operator](#highlight.tags.operator).
  */
  arithmeticOperator: w(Ie),
  /**
  Logical [operator](#highlight.tags.operator).
  */
  logicOperator: w(Ie),
  /**
  Bit [operator](#highlight.tags.operator).
  */
  bitwiseOperator: w(Ie),
  /**
  Comparison [operator](#highlight.tags.operator).
  */
  compareOperator: w(Ie),
  /**
  [Operator](#highlight.tags.operator) that updates its operand.
  */
  updateOperator: w(Ie),
  /**
  [Operator](#highlight.tags.operator) that defines something.
  */
  definitionOperator: w(Ie),
  /**
  Type-related [operator](#highlight.tags.operator).
  */
  typeOperator: w(Ie),
  /**
  Control-flow [operator](#highlight.tags.operator).
  */
  controlOperator: w(Ie),
  /**
  Program or markup punctuation.
  */
  punctuation: Fs,
  /**
  [Punctuation](#highlight.tags.punctuation) that separates
  things.
  */
  separator: w(Fs),
  /**
  Bracket-style [punctuation](#highlight.tags.punctuation).
  */
  bracket: Yt,
  /**
  Angle [brackets](#highlight.tags.bracket) (usually `<` and `>`
  tokens).
  */
  angleBracket: w(Yt),
  /**
  Square [brackets](#highlight.tags.bracket) (usually `[` and `]`
  tokens).
  */
  squareBracket: w(Yt),
  /**
  Parentheses (usually `(` and `)` tokens). Subtag of
  [bracket](#highlight.tags.bracket).
  */
  paren: w(Yt),
  /**
  Braces (usually `{` and `}` tokens). Subtag of
  [bracket](#highlight.tags.bracket).
  */
  brace: w(Yt),
  /**
  Content, for example plain text in XML or markup documents.
  */
  content: Ne,
  /**
  [Content](#highlight.tags.content) that represents a heading.
  */
  heading: ut,
  /**
  A level 1 [heading](#highlight.tags.heading).
  */
  heading1: w(ut),
  /**
  A level 2 [heading](#highlight.tags.heading).
  */
  heading2: w(ut),
  /**
  A level 3 [heading](#highlight.tags.heading).
  */
  heading3: w(ut),
  /**
  A level 4 [heading](#highlight.tags.heading).
  */
  heading4: w(ut),
  /**
  A level 5 [heading](#highlight.tags.heading).
  */
  heading5: w(ut),
  /**
  A level 6 [heading](#highlight.tags.heading).
  */
  heading6: w(ut),
  /**
  A prose [content](#highlight.tags.content) separator (such as a horizontal rule).
  */
  contentSeparator: w(Ne),
  /**
  [Content](#highlight.tags.content) that represents a list.
  */
  list: w(Ne),
  /**
  [Content](#highlight.tags.content) that represents a quote.
  */
  quote: w(Ne),
  /**
  [Content](#highlight.tags.content) that is emphasized.
  */
  emphasis: w(Ne),
  /**
  [Content](#highlight.tags.content) that is styled strong.
  */
  strong: w(Ne),
  /**
  [Content](#highlight.tags.content) that is part of a link.
  */
  link: w(Ne),
  /**
  [Content](#highlight.tags.content) that is styled as code or
  monospace.
  */
  monospace: w(Ne),
  /**
  [Content](#highlight.tags.content) that has a strike-through
  style.
  */
  strikethrough: w(Ne),
  /**
  Inserted text in a change-tracking format.
  */
  inserted: w(),
  /**
  Deleted text.
  */
  deleted: w(),
  /**
  Changed text.
  */
  changed: w(),
  /**
  An invalid or unsyntactic element.
  */
  invalid: w(),
  /**
  Metadata or meta-instruction.
  */
  meta: Vi,
  /**
  [Metadata](#highlight.tags.meta) that applies to the entire
  document.
  */
  documentMeta: w(Vi),
  /**
  [Metadata](#highlight.tags.meta) that annotates or adds
  attributes to a given syntactic element.
  */
  annotation: w(Vi),
  /**
  Processing instruction or preprocessor directive. Subtag of
  [meta](#highlight.tags.meta).
  */
  processingInstruction: w(Vi),
  /**
  [Modifier](#highlight.Tag^defineModifier) that indicates that a
  given element is being defined. Expected to be used with the
  various [name](#highlight.tags.name) tags.
  */
  definition: we.defineModifier("definition"),
  /**
  [Modifier](#highlight.Tag^defineModifier) that indicates that
  something is constant. Mostly expected to be used with
  [variable names](#highlight.tags.variableName).
  */
  constant: we.defineModifier("constant"),
  /**
  [Modifier](#highlight.Tag^defineModifier) used to indicate that
  a [variable](#highlight.tags.variableName) or [property
  name](#highlight.tags.propertyName) is being called or defined
  as a function.
  */
  function: we.defineModifier("function"),
  /**
  [Modifier](#highlight.Tag^defineModifier) that can be applied to
  [names](#highlight.tags.name) to indicate that they belong to
  the language's standard environment.
  */
  standard: we.defineModifier("standard"),
  /**
  [Modifier](#highlight.Tag^defineModifier) that indicates a given
  [names](#highlight.tags.name) is local to some scope.
  */
  local: we.defineModifier("local"),
  /**
  A generic variant [modifier](#highlight.Tag^defineModifier) that
  can be used to tag language-specific alternative variants of
  some common tag. It is recommended for themes to define special
  forms of at least the [string](#highlight.tags.string) and
  [variable name](#highlight.tags.variableName) tags, since those
  come up a lot.
  */
  special: we.defineModifier("special")
};
for (let s in k) {
  let e = k[s];
  e instanceof we && (e.name = s);
}
ba([
  { tag: k.link, class: "tok-link" },
  { tag: k.heading, class: "tok-heading" },
  { tag: k.emphasis, class: "tok-emphasis" },
  { tag: k.strong, class: "tok-strong" },
  { tag: k.keyword, class: "tok-keyword" },
  { tag: k.atom, class: "tok-atom" },
  { tag: k.bool, class: "tok-bool" },
  { tag: k.url, class: "tok-url" },
  { tag: k.labelName, class: "tok-labelName" },
  { tag: k.inserted, class: "tok-inserted" },
  { tag: k.deleted, class: "tok-deleted" },
  { tag: k.literal, class: "tok-literal" },
  { tag: k.string, class: "tok-string" },
  { tag: k.number, class: "tok-number" },
  { tag: [k.regexp, k.escape, k.special(k.string)], class: "tok-string2" },
  { tag: k.variableName, class: "tok-variableName" },
  { tag: k.local(k.variableName), class: "tok-variableName tok-local" },
  { tag: k.definition(k.variableName), class: "tok-variableName tok-definition" },
  { tag: k.special(k.variableName), class: "tok-variableName2" },
  { tag: k.definition(k.propertyName), class: "tok-propertyName tok-definition" },
  { tag: k.typeName, class: "tok-typeName" },
  { tag: k.namespace, class: "tok-namespace" },
  { tag: k.className, class: "tok-className" },
  { tag: k.macroName, class: "tok-macroName" },
  { tag: k.propertyName, class: "tok-propertyName" },
  { tag: k.operator, class: "tok-operator" },
  { tag: k.comment, class: "tok-comment" },
  { tag: k.meta, class: "tok-meta" },
  { tag: k.invalid, class: "tok-invalid" },
  { tag: k.punctuation, class: "tok-punctuation" }
]);
var Xn;
const Ot = /* @__PURE__ */ new E();
function Tu(s) {
  return v.define({
    combine: s ? (e) => e.concat(s) : void 0
  });
}
const Ou = /* @__PURE__ */ new E();
class De {
  /**
  Construct a language object. If you need to invoke this
  directly, first define a data facet with
  [`defineLanguageFacet`](https://codemirror.net/6/docs/ref/#language.defineLanguageFacet), and then
  configure your parser to [attach](https://codemirror.net/6/docs/ref/#language.languageDataProp) it
  to the language's outer syntax node.
  */
  constructor(e, t, i = [], n = "") {
    this.data = e, this.name = n, I.prototype.hasOwnProperty("tree") || Object.defineProperty(I.prototype, "tree", { get() {
      return xe(this);
    } }), this.parser = t, this.extension = [
      lt.of(this),
      I.languageData.of((r, o, l) => {
        let a = Do(r, o, l), h = a.type.prop(Ot);
        if (!h)
          return [];
        let f = r.facet(h), c = a.type.prop(Ou);
        if (c) {
          let u = a.resolve(o - a.from, l);
          for (let d of c)
            if (d.test(u, r)) {
              let p = r.facet(d.facet);
              return d.type == "replace" ? p : p.concat(f);
            }
        }
        return f;
      })
    ].concat(i);
  }
  /**
  Query whether this language is active at the given position.
  */
  isActiveAt(e, t, i = -1) {
    return Do(e, t, i).type.prop(Ot) == this.data;
  }
  /**
  Find the document regions that were parsed using this language.
  The returned regions will _include_ any nested languages rooted
  in this language, when those exist.
  */
  findRegions(e) {
    let t = e.facet(lt);
    if (t?.data == this.data)
      return [{ from: 0, to: e.doc.length }];
    if (!t || !t.allowsNesting)
      return [];
    let i = [], n = (r, o) => {
      if (r.prop(Ot) == this.data) {
        i.push({ from: o, to: o + r.length });
        return;
      }
      let l = r.prop(E.mounted);
      if (l) {
        if (l.tree.prop(Ot) == this.data) {
          if (l.overlay)
            for (let a of l.overlay)
              i.push({ from: a.from + o, to: a.to + o });
          else
            i.push({ from: o, to: o + r.length });
          return;
        } else if (l.overlay) {
          let a = i.length;
          if (n(l.tree, l.overlay[0].from + o), i.length > a)
            return;
        }
      }
      for (let a = 0; a < r.children.length; a++) {
        let h = r.children[a];
        h instanceof Y && n(h, r.positions[a] + o);
      }
    };
    return n(xe(e), 0), i;
  }
  /**
  Indicates whether this language allows nested languages. The
  default implementation returns true.
  */
  get allowsNesting() {
    return !0;
  }
}
De.setState = /* @__PURE__ */ W.define();
function Do(s, e, t) {
  let i = s.facet(lt), n = xe(s).topNode;
  if (!i || i.allowsNesting)
    for (let r = n; r; r = r.enter(e, t, H.ExcludeBuffers | H.EnterBracketed))
      r.type.isTop && (n = r);
  return n;
}
class Hs extends De {
  constructor(e, t, i) {
    super(e, t, [], i), this.parser = t;
  }
  /**
  Define a language from a parser.
  */
  static define(e) {
    let t = Tu(e.languageData);
    return new Hs(t, e.parser.configure({
      props: [Ot.add((i) => i.isTop ? t : void 0)]
    }), e.name);
  }
  /**
  Create a new instance of this language with a reconfigured
  version of its parser and optionally a new name.
  */
  configure(e, t) {
    return new Hs(this.data, this.parser.configure(e), t || this.name);
  }
  get allowsNesting() {
    return this.parser.hasWrappers();
  }
}
function xe(s) {
  let e = s.field(De.state, !1);
  return e ? e.tree : Y.empty;
}
class Bu {
  /**
  Create an input object for the given document.
  */
  constructor(e) {
    this.doc = e, this.cursorPos = 0, this.string = "", this.cursor = e.iter();
  }
  get length() {
    return this.doc.length;
  }
  syncTo(e) {
    return this.string = this.cursor.next(e - this.cursorPos).value, this.cursorPos = e + this.string.length, this.cursorPos - this.string.length;
  }
  chunk(e) {
    return this.syncTo(e), this.string;
  }
  get lineChunks() {
    return !0;
  }
  read(e, t) {
    let i = this.cursorPos - this.string.length;
    return e < i || t >= this.cursorPos ? this.doc.sliceString(e, t) : this.string.slice(e - i, t - i);
  }
}
let Xt = null;
class cn {
  constructor(e, t, i = [], n, r, o, l, a) {
    this.parser = e, this.state = t, this.fragments = i, this.tree = n, this.treeLen = r, this.viewport = o, this.skipped = l, this.scheduleOn = a, this.parse = null, this.tempSkipped = [];
  }
  /**
  @internal
  */
  static create(e, t, i) {
    return new cn(e, t, [], Y.empty, 0, i, [], null);
  }
  startParse() {
    return this.parser.startParse(new Bu(this.state.doc), this.fragments);
  }
  /**
  @internal
  */
  work(e, t) {
    return t != null && t >= this.state.doc.length && (t = void 0), this.tree != Y.empty && this.isDone(t ?? this.state.doc.length) ? (this.takeTree(), !0) : this.withContext(() => {
      var i;
      if (typeof e == "number") {
        let n = Date.now() + e;
        e = () => Date.now() > n;
      }
      for (this.parse || (this.parse = this.startParse()), t != null && (this.parse.stoppedAt == null || this.parse.stoppedAt > t) && t < this.state.doc.length && this.parse.stopAt(t); ; ) {
        let n = this.parse.advance();
        if (n)
          if (this.fragments = this.withoutTempSkipped(_e.addTree(n, this.fragments, this.parse.stoppedAt != null)), this.treeLen = (i = this.parse.stoppedAt) !== null && i !== void 0 ? i : this.state.doc.length, this.tree = n, this.parse = null, this.treeLen < (t ?? this.state.doc.length))
            this.parse = this.startParse();
          else
            return !0;
        if (e())
          return !1;
      }
    });
  }
  /**
  @internal
  */
  takeTree() {
    let e, t;
    this.parse && (e = this.parse.parsedPos) >= this.treeLen && ((this.parse.stoppedAt == null || this.parse.stoppedAt > e) && this.parse.stopAt(e), this.withContext(() => {
      for (; !(t = this.parse.advance()); )
        ;
    }), this.treeLen = e, this.tree = t, this.fragments = this.withoutTempSkipped(_e.addTree(this.tree, this.fragments, !0)), this.parse = null);
  }
  withContext(e) {
    let t = Xt;
    Xt = this;
    try {
      return e();
    } finally {
      Xt = t;
    }
  }
  withoutTempSkipped(e) {
    for (let t; t = this.tempSkipped.pop(); )
      e = To(e, t.from, t.to);
    return e;
  }
  /**
  @internal
  */
  changes(e, t) {
    let { fragments: i, tree: n, treeLen: r, viewport: o, skipped: l } = this;
    if (this.takeTree(), !e.empty) {
      let a = [];
      if (e.iterChangedRanges((h, f, c, u) => a.push({ fromA: h, toA: f, fromB: c, toB: u })), i = _e.applyChanges(i, a), n = Y.empty, r = 0, o = { from: e.mapPos(o.from, -1), to: e.mapPos(o.to, 1) }, this.skipped.length) {
        l = [];
        for (let h of this.skipped) {
          let f = e.mapPos(h.from, 1), c = e.mapPos(h.to, -1);
          f < c && l.push({ from: f, to: c });
        }
      }
    }
    return new cn(this.parser, t, i, n, r, o, l, this.scheduleOn);
  }
  /**
  @internal
  */
  updateViewport(e) {
    if (this.viewport.from == e.from && this.viewport.to == e.to)
      return !1;
    this.viewport = e;
    let t = this.skipped.length;
    for (let i = 0; i < this.skipped.length; i++) {
      let { from: n, to: r } = this.skipped[i];
      n < e.to && r > e.from && (this.fragments = To(this.fragments, n, r), this.skipped.splice(i--, 1));
    }
    return this.skipped.length >= t ? !1 : (this.reset(), !0);
  }
  /**
  @internal
  */
  reset() {
    this.parse && (this.takeTree(), this.parse = null);
  }
  /**
  Notify the parse scheduler that the given region was skipped
  because it wasn't in view, and the parse should be restarted
  when it comes into view.
  */
  skipUntilInView(e, t) {
    this.skipped.push({ from: e, to: t });
  }
  /**
  Returns a parser intended to be used as placeholder when
  asynchronously loading a nested parser. It'll skip its input and
  mark it as not-really-parsed, so that the next update will parse
  it again.
  
  When `until` is given, a reparse will be scheduled when that
  promise resolves.
  */
  static getSkippingParser(e) {
    return new class extends cu {
      createParse(t, i, n) {
        let r = n[0].from, o = n[n.length - 1].to;
        return {
          parsedPos: r,
          advance() {
            let a = Xt;
            if (a) {
              for (let h of n)
                a.tempSkipped.push(h);
              e && (a.scheduleOn = a.scheduleOn ? Promise.all([a.scheduleOn, e]) : e);
            }
            return this.parsedPos = o, new Y(de.none, [], [], o - r);
          },
          stoppedAt: null,
          stopAt() {
          }
        };
      }
    }();
  }
  /**
  @internal
  */
  isDone(e) {
    e = Math.min(e, this.state.doc.length);
    let t = this.fragments;
    return this.treeLen >= e && t.length && t[0].from == 0 && t[0].to >= e;
  }
  /**
  Get the context for the current parse, or `null` if no editor
  parse is in progress.
  */
  static get() {
    return Xt;
  }
}
function To(s, e, t) {
  return _e.applyChanges(s, [{ fromA: e, toA: t, fromB: e, toB: t }]);
}
class zt {
  constructor(e) {
    this.context = e, this.tree = e.tree;
  }
  apply(e) {
    if (!e.docChanged && this.tree == this.context.tree)
      return this;
    let t = this.context.changes(e.changes, e.state), i = this.context.treeLen == e.startState.doc.length ? void 0 : Math.max(e.changes.mapPos(this.context.treeLen), t.viewport.to);
    return t.work(20, i) || t.takeTree(), new zt(t);
  }
  static init(e) {
    let t = Math.min(3e3, e.doc.length), i = cn.create(e.facet(lt).parser, e, { from: 0, to: t });
    return i.work(20, t) || i.takeTree(), new zt(i);
  }
}
De.state = /* @__PURE__ */ Oe.define({
  create: zt.init,
  update(s, e) {
    for (let t of e.effects)
      if (t.is(De.setState))
        return t.value;
    return e.startState.facet(lt) != e.state.facet(lt) ? zt.init(e.state) : s.apply(e);
  }
});
let wa = (s) => {
  let e = setTimeout(
    () => s(),
    500
    /* Work.MaxPause */
  );
  return () => clearTimeout(e);
};
typeof requestIdleCallback < "u" && (wa = (s) => {
  let e = -1, t = setTimeout(
    () => {
      e = requestIdleCallback(s, {
        timeout: 400
        /* Work.MinPause */
      });
    },
    100
    /* Work.MinPause */
  );
  return () => e < 0 ? clearTimeout(t) : cancelIdleCallback(e);
});
const Qn = typeof navigator < "u" && (!((Xn = navigator.scheduling) === null || Xn === void 0) && Xn.isInputPending) ? () => navigator.scheduling.isInputPending() : null, Eu = /* @__PURE__ */ ye.fromClass(class {
  constructor(e) {
    this.view = e, this.working = null, this.workScheduled = 0, this.chunkEnd = -1, this.chunkBudget = -1, this.work = this.work.bind(this), this.scheduleWork();
  }
  update(e) {
    let t = this.view.state.field(De.state).context;
    (t.updateViewport(e.view.viewport) || this.view.viewport.to > t.treeLen) && this.scheduleWork(), (e.docChanged || e.selectionSet) && (this.view.hasFocus && (this.chunkBudget += 50), this.scheduleWork()), this.checkAsyncSchedule(t);
  }
  scheduleWork() {
    if (this.working)
      return;
    let { state: e } = this.view, t = e.field(De.state);
    (t.tree != t.context.tree || !t.context.isDone(e.doc.length)) && (this.working = wa(this.work));
  }
  work(e) {
    this.working = null;
    let t = Date.now();
    if (this.chunkEnd < t && (this.chunkEnd < 0 || this.view.hasFocus) && (this.chunkEnd = t + 3e4, this.chunkBudget = 3e3), this.chunkBudget <= 0)
      return;
    let { state: i, viewport: { to: n } } = this.view, r = i.field(De.state);
    if (r.tree == r.context.tree && r.context.isDone(
      n + 1e5
      /* Work.MaxParseAhead */
    ))
      return;
    let o = Date.now() + Math.min(this.chunkBudget, 100, e && !Qn ? Math.max(25, e.timeRemaining() - 5) : 1e9), l = r.context.treeLen < n && i.doc.length > n + 1e3, a = r.context.work(() => Qn && Qn() || Date.now() > o, n + (l ? 0 : 1e5));
    this.chunkBudget -= Date.now() - t, (a || this.chunkBudget <= 0) && (r.context.takeTree(), this.view.dispatch({ effects: De.setState.of(new zt(r.context)) })), this.chunkBudget > 0 && !(a && !l) && this.scheduleWork(), this.checkAsyncSchedule(r.context);
  }
  checkAsyncSchedule(e) {
    e.scheduleOn && (this.workScheduled++, e.scheduleOn.then(() => this.scheduleWork()).catch((t) => Ve(this.view.state, t)).then(() => this.workScheduled--), e.scheduleOn = null);
  }
  destroy() {
    this.working && this.working();
  }
  isWorking() {
    return !!(this.working || this.workScheduled > 0);
  }
}, {
  eventHandlers: { focus() {
    this.scheduleWork();
  } }
}), lt = /* @__PURE__ */ v.define({
  combine(s) {
    return s.length ? s[0] : null;
  },
  enables: (s) => [
    De.state,
    Eu,
    A.contentAttributes.compute([s], (e) => {
      let t = e.facet(s);
      return t && t.name ? { "data-language": t.name } : {};
    })
  ]
});
class pg {
  /**
  Create a language support object.
  */
  constructor(e, t = []) {
    this.language = e, this.support = t, this.extension = [e, t];
  }
}
class ka {
  constructor(e, t, i, n, r, o = void 0) {
    this.name = e, this.alias = t, this.extensions = i, this.filename = n, this.loadFunc = r, this.support = o, this.loading = null;
  }
  /**
  Start loading the the language. Will return a promise that
  resolves to a [`LanguageSupport`](https://codemirror.net/6/docs/ref/#language.LanguageSupport)
  object when the language successfully loads.
  */
  load() {
    return this.loading || (this.loading = this.loadFunc().then((e) => this.support = e, (e) => {
      throw this.loading = null, e;
    }));
  }
  /**
  Create a language description.
  */
  static of(e) {
    let { load: t, support: i } = e;
    if (!t) {
      if (!i)
        throw new RangeError("Must pass either 'load' or 'support' to LanguageDescription.of");
      t = () => Promise.resolve(i);
    }
    return new ka(e.name, (e.alias || []).concat(e.name).map((n) => n.toLowerCase()), e.extensions || [], e.filename, t, i);
  }
  /**
  Look for a language in the given array of descriptions that
  matches the filename. Will first match
  [`filename`](https://codemirror.net/6/docs/ref/#language.LanguageDescription.filename) patterns,
  and then [extensions](https://codemirror.net/6/docs/ref/#language.LanguageDescription.extensions),
  and return the first language that matches.
  */
  static matchFilename(e, t) {
    for (let n of e)
      if (n.filename && n.filename.test(t))
        return n;
    let i = /\.([^.]+)$/.exec(t);
    if (i) {
      for (let n of e)
        if (n.extensions.indexOf(i[1]) > -1)
          return n;
    }
    return null;
  }
  /**
  Look for a language whose name or alias matches the the given
  name (case-insensitively). If `fuzzy` is true, and no direct
  matchs is found, this'll also search for a language whose name
  or alias occurs in the string (for names shorter than three
  characters, only when surrounded by non-word characters).
  */
  static matchLanguageName(e, t, i = !0) {
    t = t.toLowerCase();
    for (let n of e)
      if (n.alias.some((r) => r == t))
        return n;
    if (i)
      for (let n of e)
        for (let r of n.alias) {
          let o = t.indexOf(r);
          if (o > -1 && (r.length > 2 || !/\w/.test(t[o - 1]) && !/\w/.test(t[o + r.length])))
            return n;
        }
    return null;
  }
}
const Lu = /* @__PURE__ */ v.define(), cr = /* @__PURE__ */ v.define({
  combine: (s) => {
    if (!s.length)
      return "  ";
    let e = s[0];
    if (!e || /\S/.test(e) || Array.from(e).some((t) => t != e[0]))
      throw new Error("Invalid indent unit: " + JSON.stringify(s[0]));
    return e;
  }
});
function un(s) {
  let e = s.facet(cr);
  return e.charCodeAt(0) == 9 ? s.tabSize * e.length : e.length;
}
function gi(s, e) {
  let t = "", i = s.tabSize, n = s.facet(cr)[0];
  if (n == "	") {
    for (; e >= i; )
      t += "	", e -= i;
    n = " ";
  }
  for (let r = 0; r < e; r++)
    t += n;
  return t;
}
function ur(s, e) {
  s instanceof I && (s = new Tn(s));
  for (let i of s.state.facet(Lu)) {
    let n = i(s, e);
    if (n !== void 0)
      return n;
  }
  let t = xe(s.state);
  return t.length >= e ? Ru(s, t, e) : null;
}
class Tn {
  /**
  Create an indent context.
  */
  constructor(e, t = {}) {
    this.state = e, this.options = t, this.unit = un(e);
  }
  /**
  Get a description of the line at the given position, taking
  [simulated line
  breaks](https://codemirror.net/6/docs/ref/#language.IndentContext.constructor^options.simulateBreak)
  into account. If there is such a break at `pos`, the `bias`
  argument determines whether the part of the line line before or
  after the break is used.
  */
  lineAt(e, t = 1) {
    let i = this.state.doc.lineAt(e), { simulateBreak: n, simulateDoubleBreak: r } = this.options;
    return n != null && n >= i.from && n <= i.to ? r && n == e ? { text: "", from: e } : (t < 0 ? n < e : n <= e) ? { text: i.text.slice(n - i.from), from: n } : { text: i.text.slice(0, n - i.from), from: i.from } : i;
  }
  /**
  Get the text directly after `pos`, either the entire line
  or the next 100 characters, whichever is shorter.
  */
  textAfterPos(e, t = 1) {
    if (this.options.simulateDoubleBreak && e == this.options.simulateBreak)
      return "";
    let { text: i, from: n } = this.lineAt(e, t);
    return i.slice(e - n, Math.min(i.length, e + 100 - n));
  }
  /**
  Find the column for the given position.
  */
  column(e, t = 1) {
    let { text: i, from: n } = this.lineAt(e, t), r = this.countColumn(i, e - n), o = this.options.overrideIndentation ? this.options.overrideIndentation(n) : -1;
    return o > -1 && (r += o - this.countColumn(i, i.search(/\S|$/))), r;
  }
  /**
  Find the column position (taking tabs into account) of the given
  position in the given string.
  */
  countColumn(e, t = e.length) {
    return Sn(e, this.state.tabSize, t);
  }
  /**
  Find the indentation column of the line at the given point.
  */
  lineIndent(e, t = 1) {
    let { text: i, from: n } = this.lineAt(e, t), r = this.options.overrideIndentation;
    if (r) {
      let o = r(n);
      if (o > -1)
        return o;
    }
    return this.countColumn(i, i.search(/\S|$/));
  }
  /**
  Returns the [simulated line
  break](https://codemirror.net/6/docs/ref/#language.IndentContext.constructor^options.simulateBreak)
  for this context, if any.
  */
  get simulatedBreak() {
    return this.options.simulateBreak || null;
  }
}
const Pu = /* @__PURE__ */ new E();
function Ru(s, e, t) {
  let i = e.resolveStack(t), n = e.resolveInner(t, -1).resolve(t, 0).enterUnfinishedNodesBefore(t);
  if (n != i.node) {
    let r = [];
    for (let o = n; o && !(o.from < i.node.from || o.to > i.node.to || o.from == i.node.from && o.type == i.node.type); o = o.parent)
      r.push(o);
    for (let o = r.length - 1; o >= 0; o--)
      i = { node: r[o], next: i };
  }
  return Sa(i, s, t);
}
function Sa(s, e, t) {
  for (let i = s; i; i = i.next) {
    let n = Nu(i.node);
    if (n)
      return n(dr.create(e, t, i));
  }
  return 0;
}
function Iu(s) {
  return s.pos == s.options.simulateBreak && s.options.simulateDoubleBreak;
}
function Nu(s) {
  let e = s.type.prop(Pu);
  if (e)
    return e;
  let t = s.firstChild, i;
  if (t && (i = t.type.prop(E.closedBy))) {
    let n = s.lastChild, r = n && i.indexOf(n.name) > -1;
    return (o) => va(o, !0, 1, void 0, r && !Iu(o) ? n.from : void 0);
  }
  return s.parent == null ? Wu : null;
}
function Wu() {
  return 0;
}
class dr extends Tn {
  constructor(e, t, i) {
    super(e.state, e.options), this.base = e, this.pos = t, this.context = i;
  }
  /**
  The syntax tree node to which the indentation strategy
  applies.
  */
  get node() {
    return this.context.node;
  }
  /**
  @internal
  */
  static create(e, t, i) {
    return new dr(e, t, i);
  }
  /**
  Get the text directly after `this.pos`, either the entire line
  or the next 100 characters, whichever is shorter.
  */
  get textAfter() {
    return this.textAfterPos(this.pos);
  }
  /**
  Get the indentation at the reference line for `this.node`, which
  is the line on which it starts, unless there is a node that is
  _not_ a parent of this node covering the start of that line. If
  so, the line at the start of that node is tried, again skipping
  on if it is covered by another such node.
  */
  get baseIndent() {
    return this.baseIndentFor(this.node);
  }
  /**
  Get the indentation for the reference line of the given node
  (see [`baseIndent`](https://codemirror.net/6/docs/ref/#language.TreeIndentContext.baseIndent)).
  */
  baseIndentFor(e) {
    let t = this.state.doc.lineAt(e.from);
    for (; ; ) {
      let i = e.resolve(t.from);
      for (; i.parent && i.parent.from == i.from; )
        i = i.parent;
      if (Fu(i, e))
        break;
      t = this.state.doc.lineAt(i.from);
    }
    return this.lineIndent(t.from);
  }
  /**
  Continue looking for indentations in the node's parent nodes,
  and return the result of that.
  */
  continue() {
    return Sa(this.context.next, this.base, this.pos);
  }
}
function Fu(s, e) {
  for (let t = e; t; t = t.parent)
    if (s == t)
      return !0;
  return !1;
}
function Hu(s) {
  let e = s.node, t = e.childAfter(e.from), i = e.lastChild;
  if (!t)
    return null;
  let n = s.options.simulateBreak, r = s.state.doc.lineAt(t.from), o = n == null || n <= r.from ? r.to : Math.min(r.to, n);
  for (let l = t.to; ; ) {
    let a = e.childAfter(l);
    if (!a || a == i)
      return null;
    if (!a.type.isSkipped) {
      if (a.from >= o)
        return null;
      let h = /^ */.exec(r.text.slice(t.to - r.from))[0].length;
      return { from: t.from, to: t.to + h };
    }
    l = a.to;
  }
}
function gg({ closing: s, align: e = !0, units: t = 1 }) {
  return (i) => va(i, e, t, s);
}
function va(s, e, t, i, n) {
  let r = s.textAfter, o = r.match(/^\s*/)[0].length, l = i && r.slice(o, o + i.length) == i || n == s.pos + o, a = e ? Hu(s) : null;
  return a ? l ? s.column(a.from) : s.column(a.to) : s.baseIndent + (l ? 0 : s.unit * t);
}
const mg = (s) => s.baseIndent;
function yg({ except: s, units: e = 1 } = {}) {
  return (t) => {
    let i = s && s.test(t.textAfter);
    return t.baseIndent + (i ? 0 : e * t.unit);
  };
}
const Vu = 200;
function zu() {
  return I.transactionFilter.of((s) => {
    if (!s.docChanged || !s.isUserEvent("input.type") && !s.isUserEvent("input.complete"))
      return s;
    let e = s.startState.languageDataAt("indentOnInput", s.startState.selection.main.head);
    if (!e.length)
      return s;
    let t = s.newDoc, { head: i } = s.newSelection.main, n = t.lineAt(i);
    if (i > n.from + Vu)
      return s;
    let r = t.sliceString(n.from, i);
    if (!e.some((h) => h.test(r)))
      return s;
    let { state: o } = s, l = -1, a = [];
    for (let { head: h } of o.selection.ranges) {
      let f = o.doc.lineAt(h);
      if (f.from == l)
        continue;
      l = f.from;
      let c = ur(o, f.from);
      if (c == null)
        continue;
      let u = /^\s*/.exec(f.text)[0], d = gi(o, c);
      u != d && a.push({ from: f.from, to: f.from + u.length, insert: d });
    }
    return a.length ? [s, { changes: a, sequential: !0 }] : s;
  });
}
const qu = /* @__PURE__ */ v.define(), Ku = /* @__PURE__ */ new E();
function xg(s) {
  let e = s.firstChild, t = s.lastChild;
  return e && e.to < t.from ? { from: e.to, to: t.type.isError ? s.to : t.from } : null;
}
function ju(s, e, t) {
  let i = xe(s);
  if (i.length < t)
    return null;
  let n = i.resolveStack(t, 1), r = null;
  for (let o = n; o; o = o.next) {
    let l = o.node;
    if (l.to <= t || l.from > t)
      continue;
    if (r && l.from < e)
      break;
    let a = l.type.prop(Ku);
    if (a && (l.to < i.length - 50 || i.length == s.doc.length || !$u(l))) {
      let h = a(l, s);
      h && h.from <= t && h.from >= e && h.to > t && (r = h);
    }
  }
  return r;
}
function $u(s) {
  let e = s.lastChild;
  return e && e.to == s.to && e.type.isError;
}
function dn(s, e, t) {
  for (let i of s.facet(qu)) {
    let n = i(s, e, t);
    if (n)
      return n;
  }
  return ju(s, e, t);
}
function Ca(s, e) {
  let t = e.mapPos(s.from, 1), i = e.mapPos(s.to, -1);
  return t >= i ? void 0 : { from: t, to: i };
}
const On = /* @__PURE__ */ W.define({ map: Ca }), wi = /* @__PURE__ */ W.define({ map: Ca });
function Aa(s) {
  let e = [];
  for (let { head: t } of s.state.selection.ranges)
    e.some((i) => i.from <= t && i.to >= t) || e.push(s.lineBlockAt(t));
  return e;
}
const St = /* @__PURE__ */ Oe.define({
  create() {
    return B.none;
  },
  update(s, e) {
    e.isUserEvent("delete") && e.changes.iterChangedRanges((t, i) => s = Oo(s, t, i)), s = s.map(e.changes);
    for (let t of e.effects)
      if (t.is(On) && !Uu(s, t.value.from, t.value.to)) {
        let { preparePlaceholder: i } = e.state.facet(Ta), n = i ? B.replace({ widget: new Zu(i(e.state, t.value)) }) : Bo;
        s = s.update({ add: [n.range(t.value.from, t.value.to)] });
      } else t.is(wi) && (s = s.update({
        filter: (i, n) => t.value.from != i || t.value.to != n,
        filterFrom: t.value.from,
        filterTo: t.value.to
      }));
    return e.selection && (s = Oo(s, e.selection.main.head)), s;
  },
  provide: (s) => A.decorations.from(s),
  toJSON(s, e) {
    let t = [];
    return s.between(0, e.doc.length, (i, n) => {
      t.push(i, n);
    }), t;
  },
  fromJSON(s) {
    if (!Array.isArray(s) || s.length % 2)
      throw new RangeError("Invalid JSON for fold state");
    let e = [];
    for (let t = 0; t < s.length; ) {
      let i = s[t++], n = s[t++];
      if (typeof i != "number" || typeof n != "number")
        throw new RangeError("Invalid JSON for fold state");
      e.push(Bo.range(i, n));
    }
    return B.set(e, !0);
  }
});
function Oo(s, e, t = e) {
  let i = !1;
  return s.between(e, t, (n, r) => {
    n < t && r > e && (i = !0);
  }), i ? s.update({
    filterFrom: e,
    filterTo: t,
    filter: (n, r) => n >= t || r <= e
  }) : s;
}
function pn(s, e, t) {
  var i;
  let n = null;
  return (i = s.field(St, !1)) === null || i === void 0 || i.between(e, t, (r, o) => {
    (!n || n.from > r) && (n = { from: r, to: o });
  }), n;
}
function Uu(s, e, t) {
  let i = !1;
  return s.between(e, e, (n, r) => {
    n == e && r == t && (i = !0);
  }), i;
}
function Ma(s, e) {
  return s.field(St, !1) ? e : e.concat(W.appendConfig.of(Oa()));
}
const Gu = (s) => {
  for (let e of Aa(s)) {
    let t = dn(s.state, e.from, e.to);
    if (t)
      return s.dispatch({ effects: Ma(s.state, [On.of(t), Da(s, t)]) }), !0;
  }
  return !1;
}, _u = (s) => {
  if (!s.state.field(St, !1))
    return !1;
  let e = [];
  for (let t of Aa(s)) {
    let i = pn(s.state, t.from, t.to);
    i && e.push(wi.of(i), Da(s, i, !1));
  }
  return e.length && s.dispatch({ effects: e }), e.length > 0;
};
function Da(s, e, t = !0) {
  let i = s.state.doc.lineAt(e.from).number, n = s.state.doc.lineAt(e.to).number;
  return A.announce.of(`${s.state.phrase(t ? "Folded lines" : "Unfolded lines")} ${i} ${s.state.phrase("to")} ${n}.`);
}
const Ju = (s) => {
  let { state: e } = s, t = [];
  for (let i = 0; i < e.doc.length; ) {
    let n = s.lineBlockAt(i), r = dn(e, n.from, n.to);
    r && t.push(On.of(r)), i = (r ? s.lineBlockAt(r.to) : n).to + 1;
  }
  return t.length && s.dispatch({ effects: Ma(s.state, t) }), !!t.length;
}, Yu = (s) => {
  let e = s.state.field(St, !1);
  if (!e || !e.size)
    return !1;
  let t = [];
  return e.between(0, s.state.doc.length, (i, n) => {
    t.push(wi.of({ from: i, to: n }));
  }), s.dispatch({ effects: t }), !0;
}, Xu = [
  { key: "Ctrl-Shift-[", mac: "Cmd-Alt-[", run: Gu },
  { key: "Ctrl-Shift-]", mac: "Cmd-Alt-]", run: _u },
  { key: "Ctrl-Alt-[", run: Ju },
  { key: "Ctrl-Alt-]", run: Yu }
], Qu = {
  placeholderDOM: null,
  preparePlaceholder: null,
  placeholderText: "…"
}, Ta = /* @__PURE__ */ v.define({
  combine(s) {
    return Kt(s, Qu);
  }
});
function Oa(s) {
  return [St, id];
}
function Ba(s, e) {
  let { state: t } = s, i = t.facet(Ta), n = (o) => {
    let l = s.lineBlockAt(s.posAtDOM(o.target)), a = pn(s.state, l.from, l.to);
    a && s.dispatch({ effects: wi.of(a) }), o.preventDefault();
  };
  if (i.placeholderDOM)
    return i.placeholderDOM(s, n, e);
  let r = document.createElement("span");
  return r.textContent = i.placeholderText, r.setAttribute("aria-label", t.phrase("folded code")), r.title = t.phrase("unfold"), r.className = "cm-foldPlaceholder", r.onclick = n, r;
}
const Bo = /* @__PURE__ */ B.replace({ widget: /* @__PURE__ */ new class extends jt {
  toDOM(s) {
    return Ba(s, null);
  }
}() });
class Zu extends jt {
  constructor(e) {
    super(), this.value = e;
  }
  eq(e) {
    return this.value == e.value;
  }
  toDOM(e) {
    return Ba(e, this.value);
  }
}
const ed = {
  openText: "⌄",
  closedText: "›",
  markerDOM: null,
  domEventHandlers: {},
  foldingChanged: () => !1
};
class Zn extends Ye {
  constructor(e, t) {
    super(), this.config = e, this.open = t;
  }
  eq(e) {
    return this.config == e.config && this.open == e.open;
  }
  toDOM(e) {
    if (this.config.markerDOM)
      return this.config.markerDOM(this.open);
    let t = document.createElement("span");
    return t.textContent = this.open ? this.config.openText : this.config.closedText, t.title = e.state.phrase(this.open ? "Fold line" : "Unfold line"), t;
  }
}
function td(s = {}) {
  let e = { ...ed, ...s }, t = new Zn(e, !0), i = new Zn(e, !1), n = ye.fromClass(class {
    constructor(o) {
      this.from = o.viewport.from, this.markers = this.buildMarkers(o);
    }
    update(o) {
      (o.docChanged || o.viewportChanged || o.startState.facet(lt) != o.state.facet(lt) || o.startState.field(St, !1) != o.state.field(St, !1) || xe(o.startState) != xe(o.state) || e.foldingChanged(o)) && (this.markers = this.buildMarkers(o.view));
    }
    buildMarkers(o) {
      let l = new xt();
      for (let a of o.viewportLineBlocks) {
        let h = pn(o.state, a.from, a.to) ? i : dn(o.state, a.from, a.to) ? t : null;
        h && l.add(a.from, a.from, h);
      }
      return l.finish();
    }
  }), { domEventHandlers: r } = e;
  return [
    n,
    Gc({
      class: "cm-foldGutter",
      markers(o) {
        var l;
        return ((l = o.plugin(n)) === null || l === void 0 ? void 0 : l.markers) || L.empty;
      },
      initialSpacer() {
        return new Zn(e, !1);
      },
      domEventHandlers: {
        ...r,
        click: (o, l, a) => {
          if (r.click && r.click(o, l, a))
            return !0;
          let h = pn(o.state, l.from, l.to);
          if (h)
            return o.dispatch({ effects: wi.of(h) }), !0;
          let f = dn(o.state, l.from, l.to);
          return f ? (o.dispatch({ effects: On.of(f) }), !0) : !1;
        }
      }
    }),
    Oa()
  ];
}
const id = /* @__PURE__ */ A.baseTheme({
  ".cm-foldPlaceholder": {
    backgroundColor: "#eee",
    border: "1px solid #ddd",
    color: "#888",
    borderRadius: ".2em",
    margin: "0 1px",
    padding: "0 1px",
    cursor: "pointer"
  },
  ".cm-foldGutter span": {
    padding: "0 1px",
    cursor: "pointer"
  }
});
class Bn {
  constructor(e, t) {
    this.specs = e;
    let i;
    function n(l) {
      let a = nt.newName();
      return (i || (i = /* @__PURE__ */ Object.create(null)))["." + a] = l, a;
    }
    const r = typeof t.all == "string" ? t.all : t.all ? n(t.all) : void 0, o = t.scope;
    this.scope = o instanceof De ? (l) => l.prop(Ot) == o.data : o ? (l) => l == o : void 0, this.style = ba(e.map((l) => ({
      tag: l.tag,
      class: l.class || n(Object.assign({}, l, { tag: null }))
    })), {
      all: r
    }).style, this.module = i ? new nt(i) : null, this.themeType = t.themeType;
  }
  /**
  Create a highlighter style that associates the given styles to
  the given tags. The specs must be objects that hold a style tag
  or array of tags in their `tag` property, and either a single
  `class` property providing a static CSS class (for highlighter
  that rely on external styling), or a
  [`style-mod`](https://github.com/marijnh/style-mod#documentation)-style
  set of CSS properties (which define the styling for those tags).
  
  The CSS rules created for a highlighter will be emitted in the
  order of the spec's properties. That means that for elements that
  have multiple tags associated with them, styles defined further
  down in the list will have a higher CSS precedence than styles
  defined earlier.
  */
  static define(e, t) {
    return new Bn(e, t || {});
  }
}
const Vs = /* @__PURE__ */ v.define(), Ea = /* @__PURE__ */ v.define({
  combine(s) {
    return s.length ? [s[0]] : null;
  }
});
function es(s) {
  let e = s.facet(Vs);
  return e.length ? e : s.facet(Ea);
}
function nd(s, e) {
  let t = [rd], i;
  return s instanceof Bn && (s.module && t.push(A.styleModule.of(s.module)), i = s.themeType), e?.fallback ? t.push(Ea.of(s)) : i ? t.push(Vs.computeN([A.darkTheme], (n) => n.facet(A.darkTheme) == (i == "dark") ? [s] : [])) : t.push(Vs.of(s)), t;
}
class sd {
  constructor(e) {
    this.markCache = /* @__PURE__ */ Object.create(null), this.tree = xe(e.state), this.decorations = this.buildDeco(e, es(e.state)), this.decoratedTo = e.viewport.to;
  }
  update(e) {
    let t = xe(e.state), i = es(e.state), n = i != es(e.startState), { viewport: r } = e.view, o = e.changes.mapPos(this.decoratedTo, 1);
    t.length < r.to && !n && t.type == this.tree.type && o >= r.to ? (this.decorations = this.decorations.map(e.changes), this.decoratedTo = o) : (t != this.tree || e.viewportChanged || n) && (this.tree = t, this.decorations = this.buildDeco(e.view, i), this.decoratedTo = r.to);
  }
  buildDeco(e, t) {
    if (!t || !this.tree.length)
      return B.none;
    let i = new xt();
    for (let { from: n, to: r } of e.visibleRanges)
      Au(this.tree, t, (o, l, a) => {
        i.add(o, l, this.markCache[a] || (this.markCache[a] = B.mark({ class: a })));
      }, n, r);
    return i.finish();
  }
}
const rd = /* @__PURE__ */ kn.high(/* @__PURE__ */ ye.fromClass(sd, {
  decorations: (s) => s.decorations
})), od = /* @__PURE__ */ Bn.define([
  {
    tag: k.meta,
    color: "#404740"
  },
  {
    tag: k.link,
    textDecoration: "underline"
  },
  {
    tag: k.heading,
    textDecoration: "underline",
    fontWeight: "bold"
  },
  {
    tag: k.emphasis,
    fontStyle: "italic"
  },
  {
    tag: k.strong,
    fontWeight: "bold"
  },
  {
    tag: k.strikethrough,
    textDecoration: "line-through"
  },
  {
    tag: k.keyword,
    color: "#708"
  },
  {
    tag: [k.atom, k.bool, k.url, k.contentSeparator, k.labelName],
    color: "#219"
  },
  {
    tag: [k.literal, k.inserted],
    color: "#164"
  },
  {
    tag: [k.string, k.deleted],
    color: "#a11"
  },
  {
    tag: [k.regexp, k.escape, /* @__PURE__ */ k.special(k.string)],
    color: "#e40"
  },
  {
    tag: /* @__PURE__ */ k.definition(k.variableName),
    color: "#00f"
  },
  {
    tag: /* @__PURE__ */ k.local(k.variableName),
    color: "#30a"
  },
  {
    tag: [k.typeName, k.namespace],
    color: "#085"
  },
  {
    tag: k.className,
    color: "#167"
  },
  {
    tag: [/* @__PURE__ */ k.special(k.variableName), k.macroName],
    color: "#256"
  },
  {
    tag: /* @__PURE__ */ k.definition(k.propertyName),
    color: "#00c"
  },
  {
    tag: k.comment,
    color: "#940"
  },
  {
    tag: k.invalid,
    color: "#f00"
  }
]), ld = /* @__PURE__ */ A.baseTheme({
  "&.cm-focused .cm-matchingBracket": { backgroundColor: "#328c8252" },
  "&.cm-focused .cm-nonmatchingBracket": { backgroundColor: "#bb555544" }
}), La = 1e4, Pa = "()[]{}", Ra = /* @__PURE__ */ v.define({
  combine(s) {
    return Kt(s, {
      afterCursor: !0,
      brackets: Pa,
      maxScanDistance: La,
      renderMatch: fd
    });
  }
}), ad = /* @__PURE__ */ B.mark({ class: "cm-matchingBracket" }), hd = /* @__PURE__ */ B.mark({ class: "cm-nonmatchingBracket" });
function fd(s) {
  let e = [], t = s.matched ? ad : hd;
  return e.push(t.range(s.start.from, s.start.to)), s.end && e.push(t.range(s.end.from, s.end.to)), e;
}
function Eo(s) {
  let e = [], t = s.facet(Ra);
  for (let i of s.selection.ranges) {
    if (!i.empty)
      continue;
    let n = qe(s, i.head, -1, t) || i.head > 0 && qe(s, i.head - 1, 1, t) || t.afterCursor && (qe(s, i.head, 1, t) || i.head < s.doc.length && qe(s, i.head + 1, -1, t));
    n && (e = e.concat(t.renderMatch(n, s)));
  }
  return B.set(e, !0);
}
const cd = /* @__PURE__ */ ye.fromClass(class {
  constructor(s) {
    this.paused = !1, this.decorations = Eo(s.state);
  }
  update(s) {
    (s.docChanged || s.selectionSet || this.paused) && (s.view.composing ? (this.decorations = this.decorations.map(s.changes), this.paused = !0) : (this.decorations = Eo(s.state), this.paused = !1));
  }
}, {
  decorations: (s) => s.decorations
}), ud = [
  cd,
  ld
];
function dd(s = {}) {
  return [Ra.of(s), ud];
}
const pd = /* @__PURE__ */ new E();
function zs(s, e, t) {
  let i = s.prop(e < 0 ? E.openedBy : E.closedBy);
  if (i)
    return i;
  if (s.name.length == 1) {
    let n = t.indexOf(s.name);
    if (n > -1 && n % 2 == (e < 0 ? 1 : 0))
      return [t[n + e]];
  }
  return null;
}
function qs(s) {
  let e = s.type.prop(pd);
  return e ? e(s.node) : s;
}
function qe(s, e, t, i = {}) {
  let n = i.maxScanDistance || La, r = i.brackets || Pa, o = xe(s), l = o.resolveInner(e, t);
  for (let a = l; a; a = a.parent) {
    let h = zs(a.type, t, r);
    if (h && a.from < a.to) {
      let f = qs(a);
      if (f && (t > 0 ? e >= f.from && e < f.to : e > f.from && e <= f.to))
        return gd(s, e, t, a, f, h, r);
    }
  }
  return md(s, e, t, o, l.type, n, r);
}
function gd(s, e, t, i, n, r, o) {
  let l = i.parent, a = { from: n.from, to: n.to }, h = 0, f = l?.cursor();
  if (f && (t < 0 ? f.childBefore(i.from) : f.childAfter(i.to)))
    do
      if (t < 0 ? f.to <= i.from : f.from >= i.to) {
        if (h == 0 && r.indexOf(f.type.name) > -1 && f.from < f.to) {
          let c = qs(f);
          return { start: a, end: c ? { from: c.from, to: c.to } : void 0, matched: !0 };
        } else if (zs(f.type, t, o))
          h++;
        else if (zs(f.type, -t, o)) {
          if (h == 0) {
            let c = qs(f);
            return {
              start: a,
              end: c && c.from < c.to ? { from: c.from, to: c.to } : void 0,
              matched: !1
            };
          }
          h--;
        }
      }
    while (t < 0 ? f.prevSibling() : f.nextSibling());
  return { start: a, matched: !1 };
}
function md(s, e, t, i, n, r, o) {
  if (t < 0 ? !e : e == s.doc.length)
    return null;
  let l = t < 0 ? s.sliceDoc(e - 1, e) : s.sliceDoc(e, e + 1), a = o.indexOf(l);
  if (a < 0 || a % 2 == 0 != t > 0)
    return null;
  let h = { from: t < 0 ? e - 1 : e, to: t > 0 ? e + 1 : e }, f = s.doc.iterRange(e, t > 0 ? s.doc.length : 0), c = 0;
  for (let u = 0; !f.next().done && u <= r; ) {
    let d = f.value;
    t < 0 && (u += d.length);
    let p = e + u * t;
    for (let g = t > 0 ? 0 : d.length - 1, m = t > 0 ? d.length : -1; g != m; g += t) {
      let y = o.indexOf(d[g]);
      if (!(y < 0 || i.resolveInner(p + g, 1).type != n))
        if (y % 2 == 0 == t > 0)
          c++;
        else {
          if (c == 1)
            return { start: h, end: { from: p + g, to: p + g + 1 }, matched: y >> 1 == a >> 1 };
          c--;
        }
    }
    t > 0 && (u += d.length);
  }
  return f.done ? { start: h, matched: !1 } : null;
}
const yd = /* @__PURE__ */ Object.create(null), Lo = [de.none], Po = [], Ro = /* @__PURE__ */ Object.create(null), xd = /* @__PURE__ */ Object.create(null);
for (let [s, e] of [
  ["variable", "variableName"],
  ["variable-2", "variableName.special"],
  ["string-2", "string.special"],
  ["def", "variableName.definition"],
  ["tag", "tagName"],
  ["attribute", "attributeName"],
  ["type", "typeName"],
  ["builtin", "variableName.standard"],
  ["qualifier", "modifier"],
  ["error", "invalid"],
  ["header", "heading"],
  ["property", "propertyName"]
])
  xd[s] = /* @__PURE__ */ bd(yd, e);
function ts(s, e) {
  Po.indexOf(s) > -1 || (Po.push(s), console.warn(e));
}
function bd(s, e) {
  let t = [];
  for (let l of e.split(" ")) {
    let a = [];
    for (let h of l.split(".")) {
      let f = s[h] || k[h];
      f ? typeof f == "function" ? a.length ? a = a.map(f) : ts(h, `Modifier ${h} used at start of tag`) : a.length ? ts(h, `Tag ${h} used as modifier`) : a = Array.isArray(f) ? f : [f] : ts(h, `Unknown highlighting tag ${h}`);
    }
    for (let h of a)
      t.push(h);
  }
  if (!t.length)
    return 0;
  let i = e.replace(/ /g, "_"), n = i + " " + t.map((l) => l.id), r = Ro[n];
  if (r)
    return r.id;
  let o = Ro[n] = de.define({
    id: Lo.length,
    name: i,
    props: [vu({ [i]: t })]
  });
  return Lo.push(o), o.id;
}
J.RTL, J.LTR;
const wd = (s) => {
  let { state: e } = s, t = e.doc.lineAt(e.selection.main.from), i = gr(s.state, t.from);
  return i.line ? kd(s) : i.block ? vd(s) : !1;
};
function pr(s, e) {
  return ({ state: t, dispatch: i }) => {
    if (t.readOnly)
      return !1;
    let n = s(e, t);
    return n ? (i(t.update(n)), !0) : !1;
  };
}
const kd = /* @__PURE__ */ pr(
  Md,
  0
  /* CommentOption.Toggle */
), Sd = /* @__PURE__ */ pr(
  Ia,
  0
  /* CommentOption.Toggle */
), vd = /* @__PURE__ */ pr(
  (s, e) => Ia(s, e, Ad(e)),
  0
  /* CommentOption.Toggle */
);
function gr(s, e) {
  let t = s.languageDataAt("commentTokens", e, 1);
  return t.length ? t[0] : {};
}
const Qt = 50;
function Cd(s, { open: e, close: t }, i, n) {
  let r = s.sliceDoc(i - Qt, i), o = s.sliceDoc(n, n + Qt), l = /\s*$/.exec(r)[0].length, a = /^\s*/.exec(o)[0].length, h = r.length - l;
  if (r.slice(h - e.length, h) == e && o.slice(a, a + t.length) == t)
    return {
      open: { pos: i - l, margin: l && 1 },
      close: { pos: n + a, margin: a && 1 }
    };
  let f, c;
  n - i <= 2 * Qt ? f = c = s.sliceDoc(i, n) : (f = s.sliceDoc(i, i + Qt), c = s.sliceDoc(n - Qt, n));
  let u = /^\s*/.exec(f)[0].length, d = /\s*$/.exec(c)[0].length, p = c.length - d - t.length;
  return f.slice(u, u + e.length) == e && c.slice(p, p + t.length) == t ? {
    open: {
      pos: i + u + e.length,
      margin: /\s/.test(f.charAt(u + e.length)) ? 1 : 0
    },
    close: {
      pos: n - d - t.length,
      margin: /\s/.test(c.charAt(p - 1)) ? 1 : 0
    }
  } : null;
}
function Ad(s) {
  let e = [];
  for (let t of s.selection.ranges) {
    let i = s.doc.lineAt(t.from), n = t.to <= i.to ? i : s.doc.lineAt(t.to);
    n.from > i.from && n.from == t.to && (n = t.to == i.to + 1 ? i : s.doc.lineAt(t.to - 1));
    let r = e.length - 1;
    r >= 0 && e[r].to > i.from ? e[r].to = n.to : e.push({ from: i.from + /^\s*/.exec(i.text)[0].length, to: n.to });
  }
  return e;
}
function Ia(s, e, t = e.selection.ranges) {
  let i = t.map((r) => gr(e, r.from).block);
  if (!i.every((r) => r))
    return null;
  let n = t.map((r, o) => Cd(e, i[o], r.from, r.to));
  if (s != 2 && !n.every((r) => r))
    return { changes: e.changes(t.map((r, o) => n[o] ? [] : [{ from: r.from, insert: i[o].open + " " }, { from: r.to, insert: " " + i[o].close }])) };
  if (s != 1 && n.some((r) => r)) {
    let r = [];
    for (let o = 0, l; o < n.length; o++)
      if (l = n[o]) {
        let a = i[o], { open: h, close: f } = l;
        r.push({ from: h.pos - a.open.length, to: h.pos + h.margin }, { from: f.pos - f.margin, to: f.pos + a.close.length });
      }
    return { changes: r };
  }
  return null;
}
function Md(s, e, t = e.selection.ranges) {
  let i = [], n = -1;
  e: for (let { from: r, to: o } of t) {
    let l = i.length, a = 1e9, h;
    for (let f = r; f <= o; ) {
      let c = e.doc.lineAt(f);
      if (h == null && (h = gr(e, c.from).line, !h))
        continue e;
      if (c.from > n && (r == o || o > c.from)) {
        n = c.from;
        let u = /^\s*/.exec(c.text)[0].length, d = u == c.length, p = c.text.slice(u, u + h.length) == h ? u : -1;
        u < c.text.length && u < a && (a = u), i.push({ line: c, comment: p, token: h, indent: u, empty: d, single: !1 });
      }
      f = c.to + 1;
    }
    if (a < 1e9)
      for (let f = l; f < i.length; f++)
        i[f].indent < i[f].line.text.length && (i[f].indent = a);
    i.length == l + 1 && (i[l].single = !0);
  }
  if (s != 2 && i.some((r) => r.comment < 0 && (!r.empty || r.single))) {
    let r = [];
    for (let { line: l, token: a, indent: h, empty: f, single: c } of i)
      (c || !f) && r.push({ from: l.from + h, insert: a + " " });
    let o = e.changes(r);
    return { changes: o, selection: e.selection.map(o, 1) };
  } else if (s != 1 && i.some((r) => r.comment >= 0)) {
    let r = [];
    for (let { line: o, comment: l, token: a } of i)
      if (l >= 0) {
        let h = o.from + l, f = h + a.length;
        o.text[f - o.from] == " " && f++, r.push({ from: h, to: f });
      }
    return { changes: r };
  }
  return null;
}
const Ks = /* @__PURE__ */ at.define(), Dd = /* @__PURE__ */ at.define(), Td = /* @__PURE__ */ v.define(), Na = /* @__PURE__ */ v.define({
  combine(s) {
    return Kt(s, {
      minDepth: 100,
      newGroupDelay: 500,
      joinToEvent: (e, t) => t
    }, {
      minDepth: Math.max,
      newGroupDelay: Math.min,
      joinToEvent: (e, t) => (i, n) => e(i, n) || t(i, n)
    });
  }
}), Wa = /* @__PURE__ */ Oe.define({
  create() {
    return Ke.empty;
  },
  update(s, e) {
    let t = e.state.facet(Na), i = e.annotation(Ks);
    if (i) {
      let a = fe.fromTransaction(e, i.selection), h = i.side, f = h == 0 ? s.undone : s.done;
      return a ? f = gn(f, f.length, t.minDepth, a) : f = Va(f, e.startState.selection), new Ke(h == 0 ? i.rest : f, h == 0 ? f : i.rest);
    }
    let n = e.annotation(Dd);
    if ((n == "full" || n == "before") && (s = s.isolate()), e.annotation(Q.addToHistory) === !1)
      return e.changes.empty ? s : s.addMapping(e.changes.desc);
    let r = fe.fromTransaction(e), o = e.annotation(Q.time), l = e.annotation(Q.userEvent);
    return r ? s = s.addChanges(r, o, l, t, e) : e.selection && (s = s.addSelection(e.startState.selection, o, l, t.newGroupDelay)), (n == "full" || n == "after") && (s = s.isolate()), s;
  },
  toJSON(s) {
    return { done: s.done.map((e) => e.toJSON()), undone: s.undone.map((e) => e.toJSON()) };
  },
  fromJSON(s) {
    return new Ke(s.done.map(fe.fromJSON), s.undone.map(fe.fromJSON));
  }
});
function Od(s = {}) {
  return [
    Wa,
    Na.of(s),
    A.domEventHandlers({
      beforeinput(e, t) {
        let i = e.inputType == "historyUndo" ? Fa : e.inputType == "historyRedo" ? js : null;
        return i ? (e.preventDefault(), i(t)) : !1;
      }
    })
  ];
}
function En(s, e) {
  return function({ state: t, dispatch: i }) {
    if (!e && t.readOnly)
      return !1;
    let n = t.field(Wa, !1);
    if (!n)
      return !1;
    let r = n.pop(s, t, e);
    return r ? (i(r), !0) : !1;
  };
}
const Fa = /* @__PURE__ */ En(0, !1), js = /* @__PURE__ */ En(1, !1), Bd = /* @__PURE__ */ En(0, !0), Ed = /* @__PURE__ */ En(1, !0);
class fe {
  constructor(e, t, i, n, r) {
    this.changes = e, this.effects = t, this.mapped = i, this.startSelection = n, this.selectionsAfter = r;
  }
  setSelAfter(e) {
    return new fe(this.changes, this.effects, this.mapped, this.startSelection, e);
  }
  toJSON() {
    var e, t, i;
    return {
      changes: (e = this.changes) === null || e === void 0 ? void 0 : e.toJSON(),
      mapped: (t = this.mapped) === null || t === void 0 ? void 0 : t.toJSON(),
      startSelection: (i = this.startSelection) === null || i === void 0 ? void 0 : i.toJSON(),
      selectionsAfter: this.selectionsAfter.map((n) => n.toJSON())
    };
  }
  static fromJSON(e) {
    return new fe(e.changes && X.fromJSON(e.changes), [], e.mapped && je.fromJSON(e.mapped), e.startSelection && x.fromJSON(e.startSelection), e.selectionsAfter.map(x.fromJSON));
  }
  // This does not check `addToHistory` and such, it assumes the
  // transaction needs to be converted to an item. Returns null when
  // there are no changes or effects in the transaction.
  static fromTransaction(e, t) {
    let i = ve;
    for (let n of e.startState.facet(Td)) {
      let r = n(e);
      r.length && (i = i.concat(r));
    }
    return !i.length && e.changes.empty ? null : new fe(e.changes.invert(e.startState.doc), i, void 0, t || e.startState.selection, ve);
  }
  static selection(e) {
    return new fe(void 0, ve, void 0, void 0, e);
  }
}
function gn(s, e, t, i) {
  let n = e + 1 > t + 20 ? e - t - 1 : 0, r = s.slice(n, e);
  return r.push(i), r;
}
function Ld(s, e) {
  let t = [], i = !1;
  return s.iterChangedRanges((n, r) => t.push(n, r)), e.iterChangedRanges((n, r, o, l) => {
    for (let a = 0; a < t.length; ) {
      let h = t[a++], f = t[a++];
      l >= h && o <= f && (i = !0);
    }
  }), i;
}
function Pd(s, e) {
  return s.ranges.length == e.ranges.length && s.ranges.filter((t, i) => t.empty != e.ranges[i].empty).length === 0;
}
function Ha(s, e) {
  return s.length ? e.length ? s.concat(e) : s : e;
}
const ve = [], Rd = 200;
function Va(s, e) {
  if (s.length) {
    let t = s[s.length - 1], i = t.selectionsAfter.slice(Math.max(0, t.selectionsAfter.length - Rd));
    return i.length && i[i.length - 1].eq(e) ? s : (i.push(e), gn(s, s.length - 1, 1e9, t.setSelAfter(i)));
  } else
    return [fe.selection([e])];
}
function Id(s) {
  let e = s[s.length - 1], t = s.slice();
  return t[s.length - 1] = e.setSelAfter(e.selectionsAfter.slice(0, e.selectionsAfter.length - 1)), t;
}
function is(s, e) {
  if (!s.length)
    return s;
  let t = s.length, i = ve;
  for (; t; ) {
    let n = Nd(s[t - 1], e, i);
    if (n.changes && !n.changes.empty || n.effects.length) {
      let r = s.slice(0, t);
      return r[t - 1] = n, r;
    } else
      e = n.mapped, t--, i = n.selectionsAfter;
  }
  return i.length ? [fe.selection(i)] : ve;
}
function Nd(s, e, t) {
  let i = Ha(s.selectionsAfter.length ? s.selectionsAfter.map((l) => l.map(e)) : ve, t);
  if (!s.changes)
    return fe.selection(i);
  let n = s.changes.map(e), r = e.mapDesc(s.changes, !0), o = s.mapped ? s.mapped.composeDesc(r) : r;
  return new fe(n, W.mapEffects(s.effects, e), o, s.startSelection.map(r), i);
}
const Wd = /^(input\.type|delete)($|\.)/;
class Ke {
  constructor(e, t, i = 0, n = void 0) {
    this.done = e, this.undone = t, this.prevTime = i, this.prevUserEvent = n;
  }
  isolate() {
    return this.prevTime ? new Ke(this.done, this.undone) : this;
  }
  addChanges(e, t, i, n, r) {
    let o = this.done, l = o[o.length - 1];
    return l && l.changes && !l.changes.empty && e.changes && (!i || Wd.test(i)) && (!l.selectionsAfter.length && t - this.prevTime < n.newGroupDelay && n.joinToEvent(r, Ld(l.changes, e.changes)) || // For compose (but not compose.start) events, always join with previous event
    i == "input.type.compose") ? o = gn(o, o.length - 1, n.minDepth, new fe(e.changes.compose(l.changes), Ha(W.mapEffects(e.effects, l.changes), l.effects), l.mapped, l.startSelection, ve)) : o = gn(o, o.length, n.minDepth, e), new Ke(o, ve, t, i);
  }
  addSelection(e, t, i, n) {
    let r = this.done.length ? this.done[this.done.length - 1].selectionsAfter : ve;
    return r.length > 0 && t - this.prevTime < n && i == this.prevUserEvent && i && /^select($|\.)/.test(i) && Pd(r[r.length - 1], e) ? this : new Ke(Va(this.done, e), this.undone, t, i);
  }
  addMapping(e) {
    return new Ke(is(this.done, e), is(this.undone, e), this.prevTime, this.prevUserEvent);
  }
  pop(e, t, i) {
    let n = e == 0 ? this.done : this.undone;
    if (n.length == 0)
      return null;
    let r = n[n.length - 1], o = r.selectionsAfter[0] || (r.startSelection ? r.startSelection.map(r.changes.invertedDesc, 1) : t.selection);
    if (i && r.selectionsAfter.length)
      return t.update({
        selection: r.selectionsAfter[r.selectionsAfter.length - 1],
        annotations: Ks.of({ side: e, rest: Id(n), selection: o }),
        userEvent: e == 0 ? "select.undo" : "select.redo",
        scrollIntoView: !0
      });
    if (r.changes) {
      let l = n.length == 1 ? ve : n.slice(0, n.length - 1);
      return r.mapped && (l = is(l, r.mapped)), t.update({
        changes: r.changes,
        selection: r.startSelection,
        effects: r.effects,
        annotations: Ks.of({ side: e, rest: l, selection: o }),
        filter: !1,
        userEvent: e == 0 ? "undo" : "redo",
        scrollIntoView: !0
      });
    } else
      return null;
  }
}
Ke.empty = /* @__PURE__ */ new Ke(ve, ve);
const Fd = [
  { key: "Mod-z", run: Fa, preventDefault: !0 },
  { key: "Mod-y", mac: "Mod-Shift-z", run: js, preventDefault: !0 },
  { linux: "Ctrl-Shift-z", run: js, preventDefault: !0 },
  { key: "Mod-u", run: Bd, preventDefault: !0 },
  { key: "Alt-u", mac: "Mod-Shift-u", run: Ed, preventDefault: !0 }
];
function $t(s, e) {
  return x.create(s.ranges.map(e), s.mainIndex);
}
function Be(s, e) {
  return s.update({ selection: e, scrollIntoView: !0, userEvent: "select" });
}
function Ee({ state: s, dispatch: e }, t) {
  let i = $t(s.selection, t);
  return i.eq(s.selection, !0) ? !1 : (e(Be(s, i)), !0);
}
function Ln(s, e) {
  return x.cursor(e ? s.to : s.from);
}
function za(s, e) {
  return Ee(s, (t) => t.empty ? s.moveByChar(t, e) : Ln(t, e));
}
function oe(s) {
  return s.textDirectionAt(s.state.selection.main.head) == J.LTR;
}
const qa = (s) => za(s, !oe(s)), Ka = (s) => za(s, oe(s));
function ja(s, e) {
  return Ee(s, (t) => t.empty ? s.moveByGroup(t, e) : Ln(t, e));
}
const Hd = (s) => ja(s, !oe(s)), Vd = (s) => ja(s, oe(s));
function zd(s, e, t) {
  if (e.type.prop(t))
    return !0;
  let i = e.to - e.from;
  return i && (i > 2 || /[^\s,.;:]/.test(s.sliceDoc(e.from, e.to))) || e.firstChild;
}
function Pn(s, e, t) {
  let i = xe(s).resolveInner(e.head), n = t ? E.closedBy : E.openedBy;
  for (let a = e.head; ; ) {
    let h = t ? i.childAfter(a) : i.childBefore(a);
    if (!h)
      break;
    zd(s, h, n) ? i = h : a = t ? h.to : h.from;
  }
  let r = i.type.prop(n), o, l;
  return r && (o = t ? qe(s, i.from, 1) : qe(s, i.to, -1)) && o.matched ? l = t ? o.end.to : o.end.from : l = t ? i.to : i.from, x.cursor(l, t ? -1 : 1);
}
const qd = (s) => Ee(s, (e) => Pn(s.state, e, !oe(s))), Kd = (s) => Ee(s, (e) => Pn(s.state, e, oe(s)));
function $a(s, e) {
  return Ee(s, (t) => {
    if (!t.empty)
      return Ln(t, e);
    let i = s.moveVertically(t, e);
    return i.head != t.head ? i : s.moveToLineBoundary(t, e);
  });
}
const Ua = (s) => $a(s, !1), Ga = (s) => $a(s, !0);
function _a(s) {
  let e = s.scrollDOM.clientHeight < s.scrollDOM.scrollHeight - 2, t = 0, i = 0, n;
  if (e) {
    for (let r of s.state.facet(A.scrollMargins)) {
      let o = r(s);
      o?.top && (t = Math.max(o?.top, t)), o?.bottom && (i = Math.max(o?.bottom, i));
    }
    n = s.scrollDOM.clientHeight - t - i;
  } else
    n = (s.dom.ownerDocument.defaultView || window).innerHeight;
  return {
    marginTop: t,
    marginBottom: i,
    selfScroll: e,
    height: Math.max(s.defaultLineHeight, n - 5)
  };
}
function Ja(s, e) {
  let t = _a(s), { state: i } = s, n = $t(i.selection, (o) => o.empty ? s.moveVertically(o, e, t.height) : Ln(o, e));
  if (n.eq(i.selection))
    return !1;
  let r;
  if (t.selfScroll) {
    let o = s.coordsAtPos(i.selection.main.head), l = s.scrollDOM.getBoundingClientRect(), a = l.top + t.marginTop, h = l.bottom - t.marginBottom;
    o && o.top > a && o.bottom < h && (r = A.scrollIntoView(n.main.head, { y: "start", yMargin: o.top - a }));
  }
  return s.dispatch(Be(i, n), { effects: r }), !0;
}
const Io = (s) => Ja(s, !1), $s = (s) => Ja(s, !0);
function ht(s, e, t) {
  let i = s.lineBlockAt(e.head), n = s.moveToLineBoundary(e, t);
  if (n.head == e.head && n.head != (t ? i.to : i.from) && (n = s.moveToLineBoundary(e, t, !1)), !t && n.head == i.from && i.length) {
    let r = /^\s*/.exec(s.state.sliceDoc(i.from, Math.min(i.from + 100, i.to)))[0].length;
    r && e.head != i.from + r && (n = x.cursor(i.from + r));
  }
  return n;
}
const jd = (s) => Ee(s, (e) => ht(s, e, !0)), $d = (s) => Ee(s, (e) => ht(s, e, !1)), Ud = (s) => Ee(s, (e) => ht(s, e, !oe(s))), Gd = (s) => Ee(s, (e) => ht(s, e, oe(s))), _d = (s) => Ee(s, (e) => x.cursor(s.lineBlockAt(e.head).from, 1)), Jd = (s) => Ee(s, (e) => x.cursor(s.lineBlockAt(e.head).to, -1));
function Yd(s, e, t) {
  let i = !1, n = $t(s.selection, (r) => {
    let o = qe(s, r.head, -1) || qe(s, r.head, 1) || r.head > 0 && qe(s, r.head - 1, 1) || r.head < s.doc.length && qe(s, r.head + 1, -1);
    if (!o || !o.end)
      return r;
    i = !0;
    let l = o.start.from == r.head ? o.end.to : o.end.from;
    return x.cursor(l);
  });
  return i ? (e(Be(s, n)), !0) : !1;
}
const Xd = ({ state: s, dispatch: e }) => Yd(s, e);
function Ce(s, e) {
  let t = $t(s.state.selection, (i) => {
    let n = e(i);
    return x.range(i.anchor, n.head, n.goalColumn, n.bidiLevel || void 0, n.assoc);
  });
  return t.eq(s.state.selection) ? !1 : (s.dispatch(Be(s.state, t)), !0);
}
function Ya(s, e) {
  return Ce(s, (t) => s.moveByChar(t, e));
}
const Xa = (s) => Ya(s, !oe(s)), Qa = (s) => Ya(s, oe(s));
function Za(s, e) {
  return Ce(s, (t) => s.moveByGroup(t, e));
}
const Qd = (s) => Za(s, !oe(s)), Zd = (s) => Za(s, oe(s)), ep = (s) => Ce(s, (e) => Pn(s.state, e, !oe(s))), tp = (s) => Ce(s, (e) => Pn(s.state, e, oe(s)));
function eh(s, e) {
  return Ce(s, (t) => s.moveVertically(t, e));
}
const th = (s) => eh(s, !1), ih = (s) => eh(s, !0);
function nh(s, e) {
  return Ce(s, (t) => s.moveVertically(t, e, _a(s).height));
}
const No = (s) => nh(s, !1), Wo = (s) => nh(s, !0), ip = (s) => Ce(s, (e) => ht(s, e, !0)), np = (s) => Ce(s, (e) => ht(s, e, !1)), sp = (s) => Ce(s, (e) => ht(s, e, !oe(s))), rp = (s) => Ce(s, (e) => ht(s, e, oe(s))), op = (s) => Ce(s, (e) => x.cursor(s.lineBlockAt(e.head).from)), lp = (s) => Ce(s, (e) => x.cursor(s.lineBlockAt(e.head).to)), Fo = ({ state: s, dispatch: e }) => (e(Be(s, { anchor: 0 })), !0), Ho = ({ state: s, dispatch: e }) => (e(Be(s, { anchor: s.doc.length })), !0), Vo = ({ state: s, dispatch: e }) => (e(Be(s, { anchor: s.selection.main.anchor, head: 0 })), !0), zo = ({ state: s, dispatch: e }) => (e(Be(s, { anchor: s.selection.main.anchor, head: s.doc.length })), !0), ap = ({ state: s, dispatch: e }) => (e(s.update({ selection: { anchor: 0, head: s.doc.length }, userEvent: "select" })), !0), hp = ({ state: s, dispatch: e }) => {
  let t = Rn(s).map(({ from: i, to: n }) => x.range(i, Math.min(n + 1, s.doc.length)));
  return e(s.update({ selection: x.create(t), userEvent: "select" })), !0;
}, fp = ({ state: s, dispatch: e }) => {
  let t = $t(s.selection, (i) => {
    let n = xe(s), r = n.resolveStack(i.from, 1);
    if (i.empty) {
      let o = n.resolveStack(i.from, -1);
      o.node.from >= r.node.from && o.node.to <= r.node.to && (r = o);
    }
    for (let o = r; o; o = o.next) {
      let { node: l } = o;
      if ((l.from < i.from && l.to >= i.to || l.to > i.to && l.from <= i.from) && o.next)
        return x.range(l.to, l.from);
    }
    return i;
  });
  return t.eq(s.selection) ? !1 : (e(Be(s, t)), !0);
};
function sh(s, e) {
  let { state: t } = s, i = t.selection, n = t.selection.ranges.slice();
  for (let r of t.selection.ranges) {
    let o = t.doc.lineAt(r.head);
    if (e ? o.to < s.state.doc.length : o.from > 0)
      for (let l = r; ; ) {
        let a = s.moveVertically(l, e);
        if (a.head < o.from || a.head > o.to) {
          n.some((h) => h.head == a.head) || n.push(a);
          break;
        } else {
          if (a.head == l.head)
            break;
          l = a;
        }
      }
  }
  return n.length == i.ranges.length ? !1 : (s.dispatch(Be(t, x.create(n, n.length - 1))), !0);
}
const cp = (s) => sh(s, !1), up = (s) => sh(s, !0), dp = ({ state: s, dispatch: e }) => {
  let t = s.selection, i = null;
  return t.ranges.length > 1 ? i = x.create([t.main]) : t.main.empty || (i = x.create([x.cursor(t.main.head)])), i ? (e(Be(s, i)), !0) : !1;
};
function ki(s, e) {
  if (s.state.readOnly)
    return !1;
  let t = "delete.selection", { state: i } = s, n = i.changeByRange((r) => {
    let { from: o, to: l } = r;
    if (o == l) {
      let a = e(r);
      a < o ? (t = "delete.backward", a = zi(s, a, !1)) : a > o && (t = "delete.forward", a = zi(s, a, !0)), o = Math.min(o, a), l = Math.max(l, a);
    } else
      o = zi(s, o, !1), l = zi(s, l, !0);
    return o == l ? { range: r } : { changes: { from: o, to: l }, range: x.cursor(o, o < r.head ? -1 : 1) };
  });
  return n.changes.empty ? !1 : (s.dispatch(i.update(n, {
    scrollIntoView: !0,
    userEvent: t,
    effects: t == "delete.selection" ? A.announce.of(i.phrase("Selection deleted")) : void 0
  })), !0);
}
function zi(s, e, t) {
  if (s instanceof A)
    for (let i of s.state.facet(A.atomicRanges).map((n) => n(s)))
      i.between(e, e, (n, r) => {
        n < e && r > e && (e = t ? r : n);
      });
  return e;
}
const rh = (s, e, t) => ki(s, (i) => {
  let n = i.from, { state: r } = s, o = r.doc.lineAt(n), l, a;
  if (t && !e && n > o.from && n < o.from + 200 && !/[^ \t]/.test(l = o.text.slice(0, n - o.from))) {
    if (l[l.length - 1] == "	")
      return n - 1;
    let h = Sn(l, r.tabSize), f = h % un(r) || un(r);
    for (let c = 0; c < f && l[l.length - 1 - c] == " "; c++)
      n--;
    a = n;
  } else
    a = ee(o.text, n - o.from, e, e) + o.from, a == n && o.number != (e ? r.doc.lines : 1) ? a += e ? 1 : -1 : !e && /[\ufe00-\ufe0f]/.test(o.text.slice(a - o.from, n - o.from)) && (a = ee(o.text, a - o.from, !1, !1) + o.from);
  return a;
}), Us = (s) => rh(s, !1, !0), oh = (s) => rh(s, !0, !1), lh = (s, e) => ki(s, (t) => {
  let i = t.head, { state: n } = s, r = n.doc.lineAt(i), o = n.charCategorizer(i);
  for (let l = null; ; ) {
    if (i == (e ? r.to : r.from)) {
      i == t.head && r.number != (e ? n.doc.lines : 1) && (i += e ? 1 : -1);
      break;
    }
    let a = ee(r.text, i - r.from, e) + r.from, h = r.text.slice(Math.min(i, a) - r.from, Math.max(i, a) - r.from), f = o(h);
    if (l != null && f != l)
      break;
    (h != " " || i != t.head) && (l = f), i = a;
  }
  return i;
}), ah = (s) => lh(s, !1), pp = (s) => lh(s, !0), gp = (s) => ki(s, (e) => {
  let t = s.lineBlockAt(e.head).to;
  return e.head < t ? t : Math.min(s.state.doc.length, e.head + 1);
}), mp = (s) => ki(s, (e) => {
  let t = s.moveToLineBoundary(e, !1).head;
  return e.head > t ? t : Math.max(0, e.head - 1);
}), yp = (s) => ki(s, (e) => {
  let t = s.moveToLineBoundary(e, !0).head;
  return e.head < t ? t : Math.min(s.state.doc.length, e.head + 1);
}), xp = ({ state: s, dispatch: e }) => {
  if (s.readOnly)
    return !1;
  let t = s.changeByRange((i) => ({
    changes: { from: i.from, to: i.to, insert: N.of(["", ""]) },
    range: x.cursor(i.from)
  }));
  return e(s.update(t, { scrollIntoView: !0, userEvent: "input" })), !0;
}, bp = ({ state: s, dispatch: e }) => {
  if (s.readOnly)
    return !1;
  let t = s.changeByRange((i) => {
    if (!i.empty || i.from == 0 || i.from == s.doc.length)
      return { range: i };
    let n = i.from, r = s.doc.lineAt(n), o = n == r.from ? n - 1 : ee(r.text, n - r.from, !1) + r.from, l = n == r.to ? n + 1 : ee(r.text, n - r.from, !0) + r.from;
    return {
      changes: { from: o, to: l, insert: s.doc.slice(n, l).append(s.doc.slice(o, n)) },
      range: x.cursor(l)
    };
  });
  return t.changes.empty ? !1 : (e(s.update(t, { scrollIntoView: !0, userEvent: "move.character" })), !0);
};
function Rn(s) {
  let e = [], t = -1;
  for (let i of s.selection.ranges) {
    let n = s.doc.lineAt(i.from), r = s.doc.lineAt(i.to);
    if (!i.empty && i.to == r.from && (r = s.doc.lineAt(i.to - 1)), t >= n.number) {
      let o = e[e.length - 1];
      o.to = r.to, o.ranges.push(i);
    } else
      e.push({ from: n.from, to: r.to, ranges: [i] });
    t = r.number + 1;
  }
  return e;
}
function hh(s, e, t) {
  if (s.readOnly)
    return !1;
  let i = [], n = [];
  for (let r of Rn(s)) {
    if (t ? r.to == s.doc.length : r.from == 0)
      continue;
    let o = s.doc.lineAt(t ? r.to + 1 : r.from - 1), l = o.length + 1;
    if (t) {
      i.push({ from: r.to, to: o.to }, { from: r.from, insert: o.text + s.lineBreak });
      for (let a of r.ranges)
        n.push(x.range(Math.min(s.doc.length, a.anchor + l), Math.min(s.doc.length, a.head + l)));
    } else {
      i.push({ from: o.from, to: r.from }, { from: r.to, insert: s.lineBreak + o.text });
      for (let a of r.ranges)
        n.push(x.range(a.anchor - l, a.head - l));
    }
  }
  return i.length ? (e(s.update({
    changes: i,
    scrollIntoView: !0,
    selection: x.create(n, s.selection.mainIndex),
    userEvent: "move.line"
  })), !0) : !1;
}
const wp = ({ state: s, dispatch: e }) => hh(s, e, !1), kp = ({ state: s, dispatch: e }) => hh(s, e, !0);
function fh(s, e, t) {
  if (s.readOnly)
    return !1;
  let i = [];
  for (let r of Rn(s))
    t ? i.push({ from: r.from, insert: s.doc.slice(r.from, r.to) + s.lineBreak }) : i.push({ from: r.to, insert: s.lineBreak + s.doc.slice(r.from, r.to) });
  let n = s.changes(i);
  return e(s.update({
    changes: n,
    selection: s.selection.map(n, t ? 1 : -1),
    scrollIntoView: !0,
    userEvent: "input.copyline"
  })), !0;
}
const Sp = ({ state: s, dispatch: e }) => fh(s, e, !1), vp = ({ state: s, dispatch: e }) => fh(s, e, !0), Cp = (s) => {
  if (s.state.readOnly)
    return !1;
  let { state: e } = s, t = e.changes(Rn(e).map(({ from: n, to: r }) => (n > 0 ? n-- : r < e.doc.length && r++, { from: n, to: r }))), i = $t(e.selection, (n) => {
    let r;
    if (s.lineWrapping) {
      let o = s.lineBlockAt(n.head), l = s.coordsAtPos(n.head, n.assoc || 1);
      l && (r = o.bottom + s.documentTop - l.bottom + s.defaultLineHeight / 2);
    }
    return s.moveVertically(n, !0, r);
  }).map(t);
  return s.dispatch({ changes: t, selection: i, scrollIntoView: !0, userEvent: "delete.line" }), !0;
};
function Ap(s, e) {
  if (/\(\)|\[\]|\{\}/.test(s.sliceDoc(e - 1, e + 1)))
    return { from: e, to: e };
  let t = xe(s).resolveInner(e), i = t.childBefore(e), n = t.childAfter(e), r;
  return i && n && i.to <= e && n.from >= e && (r = i.type.prop(E.closedBy)) && r.indexOf(n.name) > -1 && s.doc.lineAt(i.to).from == s.doc.lineAt(n.from).from && !/\S/.test(s.sliceDoc(i.to, n.from)) ? { from: i.to, to: n.from } : null;
}
const qo = /* @__PURE__ */ ch(!1), Mp = /* @__PURE__ */ ch(!0);
function ch(s) {
  return ({ state: e, dispatch: t }) => {
    if (e.readOnly)
      return !1;
    let i = e.changeByRange((n) => {
      let { from: r, to: o } = n, l = e.doc.lineAt(r), a = !s && r == o && Ap(e, r);
      s && (r = o = (o <= l.to ? l : e.doc.lineAt(o)).to);
      let h = new Tn(e, { simulateBreak: r, simulateDoubleBreak: !!a }), f = ur(h, r);
      for (f == null && (f = Sn(/^\s*/.exec(e.doc.lineAt(r).text)[0], e.tabSize)); o < l.to && /\s/.test(l.text[o - l.from]); )
        o++;
      a ? { from: r, to: o } = a : r > l.from && r < l.from + 100 && !/\S/.test(l.text.slice(0, r)) && (r = l.from);
      let c = ["", gi(e, f)];
      return a && c.push(gi(e, h.lineIndent(l.from, -1))), {
        changes: { from: r, to: o, insert: N.of(c) },
        range: x.cursor(r + 1 + c[1].length)
      };
    });
    return t(e.update(i, { scrollIntoView: !0, userEvent: "input" })), !0;
  };
}
function mr(s, e) {
  let t = -1;
  return s.changeByRange((i) => {
    let n = [];
    for (let o = i.from; o <= i.to; ) {
      let l = s.doc.lineAt(o);
      l.number > t && (i.empty || i.to > l.from) && (e(l, n, i), t = l.number), o = l.to + 1;
    }
    let r = s.changes(n);
    return {
      changes: n,
      range: x.range(r.mapPos(i.anchor, 1), r.mapPos(i.head, 1))
    };
  });
}
const Dp = ({ state: s, dispatch: e }) => {
  if (s.readOnly)
    return !1;
  let t = /* @__PURE__ */ Object.create(null), i = new Tn(s, { overrideIndentation: (r) => {
    let o = t[r];
    return o ?? -1;
  } }), n = mr(s, (r, o, l) => {
    let a = ur(i, r.from);
    if (a == null)
      return;
    /\S/.test(r.text) || (a = 0);
    let h = /^\s*/.exec(r.text)[0], f = gi(s, a);
    (h != f || l.from < r.from + h.length) && (t[r.from] = a, o.push({ from: r.from, to: r.from + h.length, insert: f }));
  });
  return n.changes.empty || e(s.update(n, { userEvent: "indent" })), !0;
}, uh = ({ state: s, dispatch: e }) => s.readOnly ? !1 : (e(s.update(mr(s, (t, i) => {
  i.push({ from: t.from, insert: s.facet(cr) });
}), { userEvent: "input.indent" })), !0), dh = ({ state: s, dispatch: e }) => s.readOnly ? !1 : (e(s.update(mr(s, (t, i) => {
  let n = /^\s*/.exec(t.text)[0];
  if (!n)
    return;
  let r = Sn(n, s.tabSize), o = 0, l = gi(s, Math.max(0, r - un(s)));
  for (; o < n.length && o < l.length && n.charCodeAt(o) == l.charCodeAt(o); )
    o++;
  i.push({ from: t.from + o, to: t.from + n.length, insert: l.slice(o) });
}), { userEvent: "delete.dedent" })), !0), Tp = (s) => (s.setTabFocusMode(), !0), Op = [
  { key: "Ctrl-b", run: qa, shift: Xa, preventDefault: !0 },
  { key: "Ctrl-f", run: Ka, shift: Qa },
  { key: "Ctrl-p", run: Ua, shift: th },
  { key: "Ctrl-n", run: Ga, shift: ih },
  { key: "Ctrl-a", run: _d, shift: op },
  { key: "Ctrl-e", run: Jd, shift: lp },
  { key: "Ctrl-d", run: oh },
  { key: "Ctrl-h", run: Us },
  { key: "Ctrl-k", run: gp },
  { key: "Ctrl-Alt-h", run: ah },
  { key: "Ctrl-o", run: xp },
  { key: "Ctrl-t", run: bp },
  { key: "Ctrl-v", run: $s }
], Bp = /* @__PURE__ */ [
  { key: "ArrowLeft", run: qa, shift: Xa, preventDefault: !0 },
  { key: "Mod-ArrowLeft", mac: "Alt-ArrowLeft", run: Hd, shift: Qd, preventDefault: !0 },
  { mac: "Cmd-ArrowLeft", run: Ud, shift: sp, preventDefault: !0 },
  { key: "ArrowRight", run: Ka, shift: Qa, preventDefault: !0 },
  { key: "Mod-ArrowRight", mac: "Alt-ArrowRight", run: Vd, shift: Zd, preventDefault: !0 },
  { mac: "Cmd-ArrowRight", run: Gd, shift: rp, preventDefault: !0 },
  { key: "ArrowUp", run: Ua, shift: th, preventDefault: !0 },
  { mac: "Cmd-ArrowUp", run: Fo, shift: Vo },
  { mac: "Ctrl-ArrowUp", run: Io, shift: No },
  { key: "ArrowDown", run: Ga, shift: ih, preventDefault: !0 },
  { mac: "Cmd-ArrowDown", run: Ho, shift: zo },
  { mac: "Ctrl-ArrowDown", run: $s, shift: Wo },
  { key: "PageUp", run: Io, shift: No },
  { key: "PageDown", run: $s, shift: Wo },
  { key: "Home", run: $d, shift: np, preventDefault: !0 },
  { key: "Mod-Home", run: Fo, shift: Vo },
  { key: "End", run: jd, shift: ip, preventDefault: !0 },
  { key: "Mod-End", run: Ho, shift: zo },
  { key: "Enter", run: qo, shift: qo },
  { key: "Mod-a", run: ap },
  { key: "Backspace", run: Us, shift: Us, preventDefault: !0 },
  { key: "Delete", run: oh, preventDefault: !0 },
  { key: "Mod-Backspace", mac: "Alt-Backspace", run: ah, preventDefault: !0 },
  { key: "Mod-Delete", mac: "Alt-Delete", run: pp, preventDefault: !0 },
  { mac: "Mod-Backspace", run: mp, preventDefault: !0 },
  { mac: "Mod-Delete", run: yp, preventDefault: !0 }
].concat(/* @__PURE__ */ Op.map((s) => ({ mac: s.key, run: s.run, shift: s.shift }))), Ep = /* @__PURE__ */ [
  { key: "Alt-ArrowLeft", mac: "Ctrl-ArrowLeft", run: qd, shift: ep },
  { key: "Alt-ArrowRight", mac: "Ctrl-ArrowRight", run: Kd, shift: tp },
  { key: "Alt-ArrowUp", run: wp },
  { key: "Shift-Alt-ArrowUp", run: Sp },
  { key: "Alt-ArrowDown", run: kp },
  { key: "Shift-Alt-ArrowDown", run: vp },
  { key: "Mod-Alt-ArrowUp", run: cp },
  { key: "Mod-Alt-ArrowDown", run: up },
  { key: "Escape", run: dp },
  { key: "Mod-Enter", run: Mp },
  { key: "Alt-l", mac: "Ctrl-l", run: hp },
  { key: "Mod-i", run: fp, preventDefault: !0 },
  { key: "Mod-[", run: dh },
  { key: "Mod-]", run: uh },
  { key: "Mod-Alt-\\", run: Dp },
  { key: "Shift-Mod-k", run: Cp },
  { key: "Shift-Mod-\\", run: Xd },
  { key: "Mod-/", run: wd },
  { key: "Alt-A", run: Sd },
  { key: "Ctrl-m", mac: "Shift-Alt-m", run: Tp }
].concat(Bp), Lp = { key: "Tab", run: uh, shift: dh }, Ko = typeof String.prototype.normalize == "function" ? (s) => s.normalize("NFKD") : (s) => s;
class qt {
  /**
  Create a text cursor. The query is the search string, `from` to
  `to` provides the region to search.
  
  When `normalize` is given, it will be called, on both the query
  string and the content it is matched against, before comparing.
  You can, for example, create a case-insensitive search by
  passing `s => s.toLowerCase()`.
  
  Text is always normalized with
  [`.normalize("NFKD")`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize)
  (when supported).
  */
  constructor(e, t, i = 0, n = e.length, r, o) {
    this.test = o, this.value = { from: 0, to: 0, precise: !1 }, this.done = !1, this.matches = [], this.buffer = "", this.bufferPos = 0, this.iter = e.iterRange(i, n), this.bufferStart = i, this.normalize = r ? (l) => r(Ko(l)) : Ko, this.query = this.normalize(t);
  }
  peek() {
    if (this.bufferPos == this.buffer.length) {
      if (this.bufferStart += this.buffer.length, this.iter.next(), this.iter.done)
        return -1;
      this.bufferPos = 0, this.buffer = this.iter.value;
    }
    return Qo(this.buffer, this.bufferPos);
  }
  /**
  Look for the next match. Updates the iterator's
  [`value`](https://codemirror.net/6/docs/ref/#search.SearchCursor.value) and
  [`done`](https://codemirror.net/6/docs/ref/#search.SearchCursor.done) properties. Should be called
  at least once before using the cursor.
  */
  next() {
    for (; this.matches.length; )
      this.matches.pop();
    return this.nextOverlapping();
  }
  /**
  The `next` method will ignore matches that partially overlap a
  previous match. This method behaves like `next`, but includes
  such matches.
  */
  nextOverlapping() {
    for (; ; ) {
      let e = this.peek();
      if (e < 0)
        return this.done = !0, this;
      let t = Nh(e), i = this.bufferStart + this.bufferPos;
      this.bufferPos += Zo(e);
      let n = this.normalize(t);
      if (n.length)
        for (let r = 0, o = i, l = !0; ; r++) {
          let a = n.charCodeAt(r), h = this.match(a, o, l, this.bufferPos + this.bufferStart, r == n.length - 1);
          if (h)
            return this.value = h, this;
          if (r == n.length - 1)
            break;
          l && r < t.length && t.charCodeAt(r) == a ? o++ : l = !1;
        }
    }
  }
  match(e, t, i, n, r) {
    let o = null;
    for (let l = 0; l < this.matches.length; ) {
      let a = this.matches[l], h = !1;
      this.query.charCodeAt(a.index) == e && (a.index == this.query.length - 1 ? o = { from: a.from, to: n, precise: r && a.precise } : (a.index++, h = !0)), h ? l++ : this.matches.splice(l, 1);
    }
    return this.query.charCodeAt(0) == e && (this.query.length == 1 ? o = { from: t, to: n, precise: i && r } : this.matches.push({ from: t, index: 1, precise: i })), o && this.test && !this.test(o.from, o.to, this.buffer, this.bufferStart) && (o = null), o;
  }
}
typeof Symbol < "u" && (qt.prototype[Symbol.iterator] = function() {
  return this;
});
const ph = { from: -1, to: -1, match: /* @__PURE__ */ /.*/.exec(""), precise: !0 }, yr = "gm" + (/x/.unicode == null ? "" : "u");
class gh {
  /**
  Create a cursor that will search the given range in the given
  document. `query` should be the raw pattern (as you'd pass it to
  `new RegExp`).
  */
  constructor(e, t, i, n = 0, r = e.length) {
    if (this.text = e, this.to = r, this.curLine = "", this.done = !1, this.value = ph, /\\[sWDnr]|\n|\r|\[\^/.test(t))
      return new mh(e, t, i, n, r);
    this.re = new RegExp(t, yr + (i?.ignoreCase ? "i" : "")), this.test = i?.test, this.iter = e.iter();
    let o = e.lineAt(n);
    this.curLineStart = o.from, this.matchPos = mn(e, n), this.getLine(this.curLineStart);
  }
  getLine(e) {
    this.iter.next(e), this.iter.lineBreak ? this.curLine = "" : (this.curLine = this.iter.value, this.curLineStart + this.curLine.length > this.to && (this.curLine = this.curLine.slice(0, this.to - this.curLineStart)), this.iter.next());
  }
  nextLine() {
    this.curLineStart = this.curLineStart + this.curLine.length + 1, this.curLineStart > this.to ? this.curLine = "" : this.getLine(0);
  }
  /**
  Move to the next match, if there is one.
  */
  next() {
    for (let e = this.matchPos - this.curLineStart; ; ) {
      this.re.lastIndex = e;
      let t = this.matchPos <= this.to && this.re.exec(this.curLine);
      if (t) {
        let i = this.curLineStart + t.index, n = i + t[0].length;
        if (this.matchPos = mn(this.text, n + (i == n ? 1 : 0)), i == this.curLineStart + this.curLine.length && this.nextLine(), (i < n || i > this.value.to) && (!this.test || this.test(i, n, t)))
          return this.value = { from: i, to: n, precise: !0, match: t }, this;
        e = this.matchPos - this.curLineStart;
      } else if (this.curLineStart + this.curLine.length < this.to)
        this.nextLine(), e = 0;
      else
        return this.done = !0, this;
    }
  }
}
const ns = /* @__PURE__ */ new WeakMap();
class It {
  constructor(e, t) {
    this.from = e, this.text = t;
  }
  get to() {
    return this.from + this.text.length;
  }
  static get(e, t, i) {
    let n = ns.get(e);
    if (!n || n.from >= i || n.to <= t) {
      let l = new It(t, e.sliceString(t, i));
      return ns.set(e, l), l;
    }
    if (n.from == t && n.to == i)
      return n;
    let { text: r, from: o } = n;
    return o > t && (r = e.sliceString(t, o) + r, o = t), n.to < i && (r += e.sliceString(n.to, i)), ns.set(e, new It(o, r)), new It(t, r.slice(t - o, i - o));
  }
}
class mh {
  constructor(e, t, i, n, r) {
    this.text = e, this.to = r, this.done = !1, this.value = ph, this.matchPos = mn(e, n), this.re = new RegExp(t, yr + (i?.ignoreCase ? "i" : "")), this.test = i?.test, this.flat = It.get(e, n, this.chunkEnd(
      n + 5e3
      /* Chunk.Base */
    ));
  }
  chunkEnd(e) {
    return e >= this.to ? this.to : this.text.lineAt(e).to;
  }
  next() {
    for (; ; ) {
      let e = this.re.lastIndex = this.matchPos - this.flat.from, t = this.re.exec(this.flat.text);
      if (t && !t[0] && t.index == e && (this.re.lastIndex = e + 1, t = this.re.exec(this.flat.text)), t) {
        let i = this.flat.from + t.index, n = i + t[0].length;
        if ((this.flat.to >= this.to || t.index + t[0].length <= this.flat.text.length - 10) && (!this.test || this.test(i, n, t)))
          return this.value = { from: i, to: n, precise: !0, match: t }, this.matchPos = mn(this.text, n + (i == n ? 1 : 0)), this;
      }
      if (this.flat.to == this.to)
        return this.done = !0, this;
      this.flat = It.get(this.text, this.flat.from, this.chunkEnd(this.flat.from + this.flat.text.length * 2));
    }
  }
}
typeof Symbol < "u" && (gh.prototype[Symbol.iterator] = mh.prototype[Symbol.iterator] = function() {
  return this;
});
function Pp(s) {
  try {
    return new RegExp(s, yr), !0;
  } catch {
    return !1;
  }
}
function mn(s, e) {
  if (e >= s.length)
    return e;
  let t = s.lineAt(e), i;
  for (; e < t.to && (i = t.text.charCodeAt(e - t.from)) >= 56320 && i < 57344; )
    e++;
  return e;
}
const Rp = (s) => {
  let { state: e } = s, t = String(e.doc.lineAt(s.state.selection.main.head).number), { close: i, result: n } = Kc(s, {
    label: e.phrase("Go to line"),
    input: { type: "text", name: "line", value: t },
    focus: !0,
    submitLabel: e.phrase("go")
  });
  return n.then((r) => {
    let o = r && /^([+-])?(\d+)?(:\d+)?(%)?$/.exec(r.elements.line.value);
    if (!o) {
      s.dispatch({ effects: i });
      return;
    }
    let l = e.doc.lineAt(e.selection.main.head), [, a, h, f, c] = o, u = f ? +f.slice(1) : 0, d = h ? +h : l.number;
    if (h && c) {
      let m = d / 100;
      a && (m = m * (a == "-" ? -1 : 1) + l.number / e.doc.lines), d = Math.round(e.doc.lines * m);
    } else h && a && (d = d * (a == "-" ? -1 : 1) + l.number);
    let p = e.doc.line(Math.max(1, Math.min(e.doc.lines, d))), g = x.cursor(p.from + Math.max(0, Math.min(u, p.length)));
    s.dispatch({
      effects: [i, A.scrollIntoView(g.from, { y: "center" })],
      selection: g
    });
  }), !0;
}, Ip = {
  highlightWordAroundCursor: !1,
  minSelectionLength: 1,
  maxMatches: 100,
  wholeWords: !1
}, Np = /* @__PURE__ */ v.define({
  combine(s) {
    return Kt(s, Ip, {
      highlightWordAroundCursor: (e, t) => e || t,
      minSelectionLength: Math.min,
      maxMatches: Math.min
    });
  }
});
function Wp(s) {
  return [qp, zp];
}
const Fp = /* @__PURE__ */ B.mark({ class: "cm-selectionMatch" }), Hp = /* @__PURE__ */ B.mark({ class: "cm-selectionMatch cm-selectionMatch-main" });
function jo(s, e, t, i) {
  return (t == 0 || s(e.sliceDoc(t - 1, t)) != _.Word) && (i == e.doc.length || s(e.sliceDoc(i, i + 1)) != _.Word);
}
function Vp(s, e, t, i) {
  return s(e.sliceDoc(t, t + 1)) == _.Word && s(e.sliceDoc(i - 1, i)) == _.Word;
}
const zp = /* @__PURE__ */ ye.fromClass(class {
  constructor(s) {
    this.decorations = this.getDeco(s);
  }
  update(s) {
    (s.selectionSet || s.docChanged || s.viewportChanged) && (this.decorations = this.getDeco(s.view));
  }
  getDeco(s) {
    let e = s.state.facet(Np), { state: t } = s, i = t.selection;
    if (i.ranges.length > 1)
      return B.none;
    let n = i.main, r, o = null;
    if (n.empty) {
      if (!e.highlightWordAroundCursor)
        return B.none;
      let a = t.wordAt(n.head);
      if (!a)
        return B.none;
      o = t.charCategorizer(n.head), r = t.sliceDoc(a.from, a.to);
    } else {
      let a = n.to - n.from;
      if (a < e.minSelectionLength || a > 200)
        return B.none;
      if (e.wholeWords) {
        if (r = t.sliceDoc(n.from, n.to), o = t.charCategorizer(n.head), !(jo(o, t, n.from, n.to) && Vp(o, t, n.from, n.to)))
          return B.none;
      } else if (r = t.sliceDoc(n.from, n.to), !r)
        return B.none;
    }
    let l = [];
    for (let a of s.visibleRanges) {
      let h = new qt(t.doc, r, a.from, a.to);
      for (; !h.next().done; ) {
        let { from: f, to: c } = h.value;
        if ((!o || jo(o, t, f, c)) && (n.empty && f <= n.from && c >= n.to ? l.push(Hp.range(f, c)) : (f >= n.to || c <= n.from) && l.push(Fp.range(f, c)), l.length > e.maxMatches))
          return B.none;
      }
    }
    return B.set(l);
  }
}, {
  decorations: (s) => s.decorations
}), qp = /* @__PURE__ */ A.baseTheme({
  ".cm-selectionMatch": { backgroundColor: "#99ff7780" },
  ".cm-searchMatch .cm-selectionMatch": { backgroundColor: "transparent" }
}), Kp = ({ state: s, dispatch: e }) => {
  let { selection: t } = s, i = x.create(t.ranges.map((n) => s.wordAt(n.head) || x.cursor(n.head)), t.mainIndex);
  return i.eq(t) ? !1 : (e(s.update({ selection: i })), !0);
};
function jp(s, e) {
  let { main: t, ranges: i } = s.selection, n = s.wordAt(t.head), r = n && n.from == t.from && n.to == t.to;
  for (let o = !1, l = new qt(s.doc, e, i[i.length - 1].to); ; )
    if (l.next(), l.done) {
      if (o)
        return null;
      l = new qt(s.doc, e, 0, Math.max(0, i[i.length - 1].from - 1)), o = !0;
    } else {
      if (o && i.some((a) => a.from == l.value.from))
        continue;
      if (r) {
        let a = s.wordAt(l.value.from);
        if (!a || a.from != l.value.from || a.to != l.value.to)
          continue;
      }
      return l.value;
    }
}
const $p = ({ state: s, dispatch: e }) => {
  let { ranges: t } = s.selection;
  if (t.some((r) => r.from === r.to))
    return Kp({ state: s, dispatch: e });
  let i = s.sliceDoc(t[0].from, t[0].to);
  if (s.selection.ranges.some((r) => s.sliceDoc(r.from, r.to) != i))
    return !1;
  let n = jp(s, i);
  return n ? (e(s.update({
    selection: s.selection.addRange(x.range(n.from, n.to), !1),
    effects: A.scrollIntoView(n.to)
  })), !0) : !1;
}, Ut = /* @__PURE__ */ v.define({
  combine(s) {
    return Kt(s, {
      top: !1,
      caseSensitive: !1,
      literal: !1,
      regexp: !1,
      wholeWord: !1,
      createPanel: (e) => new rg(e),
      scrollToMatch: (e) => A.scrollIntoView(e)
    });
  }
});
class yh {
  /**
  Create a query object.
  */
  constructor(e) {
    this.search = e.search, this.caseSensitive = !!e.caseSensitive, this.literal = !!e.literal, this.regexp = !!e.regexp, this.replace = e.replace || "", this.valid = !!this.search && (!this.regexp || Pp(this.search)), this.unquoted = this.unquote(this.search), this.wholeWord = !!e.wholeWord, this.test = e.test;
  }
  /**
  @internal
  */
  unquote(e) {
    return this.literal ? e : e.replace(/\\([nrt\\])/g, (t, i) => i == "n" ? `
` : i == "r" ? "\r" : i == "t" ? "	" : "\\");
  }
  /**
  Compare this query to another query.
  */
  eq(e) {
    return this.search == e.search && this.replace == e.replace && this.caseSensitive == e.caseSensitive && this.regexp == e.regexp && this.wholeWord == e.wholeWord && this.test == e.test;
  }
  /**
  @internal
  */
  create() {
    return this.regexp ? new Xp(this) : new _p(this);
  }
  /**
  Get a search cursor for this query, searching through the given
  range in the given state.
  */
  getCursor(e, t = 0, i) {
    let n = e.doc ? e : I.create({ doc: e });
    return i == null && (i = n.doc.length), this.regexp ? Mt(this, n, t, i) : At(this, n, t, i);
  }
}
class xh {
  constructor(e) {
    this.spec = e;
  }
}
function Up(s, e, t) {
  return (i, n, r, o) => {
    if (t && !t(i, n, r, o))
      return !1;
    let l = i >= o && n <= o + r.length ? r.slice(i - o, n - o) : e.doc.sliceString(i, n);
    return s(l, e, i, n);
  };
}
function At(s, e, t, i) {
  let n;
  return s.wholeWord && (n = Gp(e.doc, e.charCategorizer(e.selection.main.head))), s.test && (n = Up(s.test, e, n)), new qt(e.doc, s.unquoted, t, i, s.caseSensitive ? void 0 : (r) => r.toLowerCase(), n);
}
function Gp(s, e) {
  return (t, i, n, r) => ((r > t || r + n.length < i) && (r = Math.max(0, t - 2), n = s.sliceString(r, Math.min(s.length, i + 2))), (e(yn(n, t - r)) != _.Word || e(xn(n, t - r)) != _.Word) && (e(xn(n, i - r)) != _.Word || e(yn(n, i - r)) != _.Word));
}
class _p extends xh {
  constructor(e) {
    super(e);
  }
  nextMatch(e, t, i) {
    let n = At(this.spec, e, i, e.doc.length).nextOverlapping();
    if (n.done) {
      let r = Math.min(e.doc.length, t + this.spec.unquoted.length);
      n = At(this.spec, e, 0, r).nextOverlapping();
    }
    return n.done || n.value.from == t && n.value.to == i ? null : n.value;
  }
  // Searching in reverse is, rather than implementing an inverted search
  // cursor, done by scanning chunk after chunk forward.
  prevMatchInRange(e, t, i) {
    for (let n = i; ; ) {
      let r = Math.max(t, n - 1e4 - this.spec.unquoted.length), o = At(this.spec, e, r, n), l = null;
      for (; !o.nextOverlapping().done; )
        l = o.value;
      if (l)
        return l;
      if (r == t)
        return null;
      n -= 1e4;
    }
  }
  prevMatch(e, t, i) {
    let n = this.prevMatchInRange(e, 0, t);
    return n || (n = this.prevMatchInRange(e, Math.max(0, i - this.spec.unquoted.length), e.doc.length)), n && (n.from != t || n.to != i) ? n : null;
  }
  getReplacement(e) {
    return this.spec.unquote(this.spec.replace);
  }
  matchAll(e, t) {
    let i = At(this.spec, e, 0, e.doc.length), n = [];
    for (; !i.next().done; ) {
      if (n.length >= t)
        return null;
      n.push(i.value);
    }
    return n;
  }
  highlight(e, t, i, n) {
    let r = At(this.spec, e, Math.max(0, t - this.spec.unquoted.length), Math.min(i + this.spec.unquoted.length, e.doc.length));
    for (; !r.next().done; )
      n(r.value.from, r.value.to);
  }
}
function Jp(s, e, t) {
  return (i, n, r) => (!t || t(i, n, r)) && s(r[0], e, i, n);
}
function Mt(s, e, t, i) {
  let n;
  return s.wholeWord && (n = Yp(e.charCategorizer(e.selection.main.head))), s.test && (n = Jp(s.test, e, n)), new gh(e.doc, s.search, { ignoreCase: !s.caseSensitive, test: n }, t, i);
}
function yn(s, e) {
  return s.slice(ee(s, e, !1), e);
}
function xn(s, e) {
  return s.slice(e, ee(s, e));
}
function Yp(s) {
  return (e, t, i) => !i[0].length || (s(yn(i.input, i.index)) != _.Word || s(xn(i.input, i.index)) != _.Word) && (s(xn(i.input, i.index + i[0].length)) != _.Word || s(yn(i.input, i.index + i[0].length)) != _.Word);
}
class Xp extends xh {
  nextMatch(e, t, i) {
    let n = Mt(this.spec, e, i, e.doc.length).next();
    return n.done && (n = Mt(this.spec, e, 0, t).next()), n.done ? null : n.value;
  }
  prevMatchInRange(e, t, i) {
    for (let n = 1; ; n++) {
      let r = Math.max(
        t,
        i - n * 1e4
        /* FindPrev.ChunkSize */
      ), o = Mt(this.spec, e, r, i), l = null;
      for (; !o.next().done; )
        l = o.value;
      if (l && (r == t || l.from > r + 10))
        return l;
      if (r == t)
        return null;
    }
  }
  prevMatch(e, t, i) {
    return this.prevMatchInRange(e, 0, t) || this.prevMatchInRange(e, i, e.doc.length);
  }
  getReplacement(e) {
    return this.spec.unquote(this.spec.replace).replace(/\$([$&]|\d+)/g, (t, i) => {
      if (i == "&")
        return e.match[0];
      if (i == "$")
        return "$";
      for (let n = i.length; n > 0; n--) {
        let r = +i.slice(0, n);
        if (r > 0 && r < e.match.length)
          return e.match[r] + i.slice(n);
      }
      return t;
    });
  }
  matchAll(e, t) {
    let i = Mt(this.spec, e, 0, e.doc.length), n = [];
    for (; !i.next().done; ) {
      if (n.length >= t)
        return null;
      n.push(i.value);
    }
    return n;
  }
  highlight(e, t, i, n) {
    let r = Mt(this.spec, e, Math.max(
      0,
      t - 250
      /* RegExp.HighlightMargin */
    ), Math.min(i + 250, e.doc.length));
    for (; !r.next().done; )
      n(r.value.from, r.value.to);
  }
}
const mi = /* @__PURE__ */ W.define(), xr = /* @__PURE__ */ W.define(), it = /* @__PURE__ */ Oe.define({
  create(s) {
    return new ss(Gs(s).create(), null);
  },
  update(s, e) {
    for (let t of e.effects)
      t.is(mi) ? s = new ss(t.value.create(), s.panel) : t.is(xr) && (s = new ss(s.query, t.value ? br : null));
    return s;
  },
  provide: (s) => an.from(s, (e) => e.panel)
});
class ss {
  constructor(e, t) {
    this.query = e, this.panel = t;
  }
}
const Qp = /* @__PURE__ */ B.mark({ class: "cm-searchMatch" }), Zp = /* @__PURE__ */ B.mark({ class: "cm-searchMatch cm-searchMatch-selected" }), eg = /* @__PURE__ */ ye.fromClass(class {
  constructor(s) {
    this.view = s, this.decorations = this.highlight(s.state.field(it));
  }
  update(s) {
    let e = s.state.field(it);
    (e != s.startState.field(it) || s.docChanged || s.selectionSet || s.viewportChanged) && (this.decorations = this.highlight(e));
  }
  highlight({ query: s, panel: e }) {
    if (!e || !s.spec.valid)
      return B.none;
    let { view: t } = this, i = new xt();
    for (let n = 0, r = t.visibleRanges, o = r.length; n < o; n++) {
      let { from: l, to: a } = r[n];
      for (; n < o - 1 && a > r[n + 1].from - 500; )
        a = r[++n].to;
      s.highlight(t.state, l, a, (h, f) => {
        let c = t.state.selection.ranges.some((u) => u.from == h && u.to == f);
        i.add(h, f, c ? Zp : Qp);
      });
    }
    return i.finish();
  }
}, {
  decorations: (s) => s.decorations
});
function Si(s) {
  return (e) => {
    let t = e.state.field(it, !1);
    return t && t.query.spec.valid ? s(e, t) : kh(e);
  };
}
const bn = /* @__PURE__ */ Si((s, { query: e }) => {
  let { to: t } = s.state.selection.main, i = e.nextMatch(s.state, t, t);
  if (!i)
    return !1;
  let n = x.single(i.from, i.to), r = s.state.facet(Ut);
  return s.dispatch({
    selection: n,
    effects: [wr(s, i), r.scrollToMatch(n.main, s)],
    userEvent: "select.search"
  }), wh(s), !0;
}), wn = /* @__PURE__ */ Si((s, { query: e }) => {
  let { state: t } = s, { from: i } = t.selection.main, n = e.prevMatch(t, i, i);
  if (!n)
    return !1;
  let r = x.single(n.from, n.to), o = s.state.facet(Ut);
  return s.dispatch({
    selection: r,
    effects: [wr(s, n), o.scrollToMatch(r.main, s)],
    userEvent: "select.search"
  }), wh(s), !0;
}), tg = /* @__PURE__ */ Si((s, { query: e }) => {
  let t = e.matchAll(s.state, 1e3);
  return !t || !t.length ? !1 : (s.dispatch({
    selection: x.create(t.map((i) => x.range(i.from, i.to))),
    userEvent: "select.search.matches"
  }), !0);
}), ig = ({ state: s, dispatch: e }) => {
  let t = s.selection;
  if (t.ranges.length > 1 || t.main.empty)
    return !1;
  let { from: i, to: n } = t.main, r = [], o = 0;
  for (let l = new qt(s.doc, s.sliceDoc(i, n)); !l.next().done; ) {
    if (r.length > 1e3)
      return !1;
    l.value.from == i && (o = r.length), r.push(x.range(l.value.from, l.value.to));
  }
  return e(s.update({
    selection: x.create(r, o),
    userEvent: "select.search.matches"
  })), !0;
}, $o = /* @__PURE__ */ Si((s, { query: e }) => {
  let { state: t } = s, { from: i, to: n } = t.selection.main;
  if (t.readOnly)
    return !1;
  let r = e.nextMatch(t, i, i);
  if (!r)
    return !1;
  let o = r, l = [], a, h, f = [];
  o.precise ? o.from == i && o.to == n && (h = t.toText(e.getReplacement(o)), l.push({ from: o.from, to: o.to, insert: h }), f.push(A.announce.of(t.phrase("replaced match on line $", t.doc.lineAt(i).number) + "."))) : o = e.nextMatch(t, o.from, o.to);
  let c = s.state.changes(l);
  return o && (a = x.single(o.from, o.to).map(c), f.push(wr(s, o)), f.push(t.facet(Ut).scrollToMatch(a.main, s))), s.dispatch({
    changes: c,
    selection: a,
    effects: f,
    userEvent: "input.replace"
  }), !0;
}), ng = /* @__PURE__ */ Si((s, { query: e }) => {
  if (s.state.readOnly)
    return !1;
  let t = [];
  for (let n of e.matchAll(s.state, 1e9)) {
    let { from: r, to: o, precise: l } = n;
    l && t.push({ from: r, to: o, insert: e.getReplacement(n) });
  }
  if (!t.length)
    return !1;
  let i = s.state.phrase("replaced $ matches", t.length) + ".";
  return s.dispatch({
    changes: t,
    effects: A.announce.of(i),
    userEvent: "input.replace.all"
  }), !0;
});
function br(s) {
  return s.state.facet(Ut).createPanel(s);
}
function Gs(s, e) {
  var t, i, n, r, o;
  let l = s.selection.main, a = l.empty || l.to > l.from + 100 ? "" : s.sliceDoc(l.from, l.to);
  if (e && !a)
    return e;
  let h = s.facet(Ut);
  return new yh({
    search: ((t = e?.literal) !== null && t !== void 0 ? t : h.literal) ? a : a.replace(/\n/g, "\\n"),
    caseSensitive: (i = e?.caseSensitive) !== null && i !== void 0 ? i : h.caseSensitive,
    literal: (n = e?.literal) !== null && n !== void 0 ? n : h.literal,
    regexp: (r = e?.regexp) !== null && r !== void 0 ? r : h.regexp,
    wholeWord: (o = e?.wholeWord) !== null && o !== void 0 ? o : h.wholeWord
  });
}
function bh(s) {
  let e = aa(s, br);
  return e && e.dom.querySelector("[main-field]");
}
function wh(s) {
  let e = bh(s);
  e && e == s.root.activeElement && e.select();
}
const kh = (s) => {
  let e = s.state.field(it, !1);
  if (e && e.panel) {
    let t = bh(s);
    if (t && t != s.root.activeElement) {
      let i = Gs(s.state, e.query.spec);
      i.valid && s.dispatch({ effects: mi.of(i) }), t.focus(), t.select();
    }
  } else
    s.dispatch({ effects: [
      xr.of(!0),
      e ? mi.of(Gs(s.state, e.query.spec)) : W.appendConfig.of(lg)
    ] });
  return !0;
}, Sh = (s) => {
  let e = s.state.field(it, !1);
  if (!e || !e.panel)
    return !1;
  let t = aa(s, br);
  return t && t.dom.contains(s.root.activeElement) && s.focus(), s.dispatch({ effects: xr.of(!1) }), !0;
}, sg = [
  { key: "Mod-f", run: kh, scope: "editor search-panel" },
  { key: "F3", run: bn, shift: wn, scope: "editor search-panel", preventDefault: !0 },
  { key: "Mod-g", run: bn, shift: wn, scope: "editor search-panel", preventDefault: !0 },
  { key: "Escape", run: Sh, scope: "editor search-panel" },
  { key: "Mod-Shift-l", run: ig },
  { key: "Mod-Alt-g", run: Rp },
  { key: "Mod-d", run: $p, preventDefault: !0 }
];
class rg {
  constructor(e) {
    this.view = e;
    let t = this.query = e.state.field(it).query.spec;
    this.commit = this.commit.bind(this), this.searchField = Z("input", {
      value: t.search,
      placeholder: pe(e, "Find"),
      "aria-label": pe(e, "Find"),
      class: "cm-textfield",
      name: "search",
      form: "",
      "main-field": "true",
      onchange: this.commit,
      onkeyup: this.commit
    }), this.replaceField = Z("input", {
      value: t.replace,
      placeholder: pe(e, "Replace"),
      "aria-label": pe(e, "Replace"),
      class: "cm-textfield",
      name: "replace",
      form: "",
      onchange: this.commit,
      onkeyup: this.commit
    }), this.caseField = Z("input", {
      type: "checkbox",
      name: "case",
      form: "",
      checked: t.caseSensitive,
      onchange: this.commit
    }), this.reField = Z("input", {
      type: "checkbox",
      name: "re",
      form: "",
      checked: t.regexp,
      onchange: this.commit
    }), this.wordField = Z("input", {
      type: "checkbox",
      name: "word",
      form: "",
      checked: t.wholeWord,
      onchange: this.commit
    });
    function i(n, r, o) {
      return Z("button", { class: "cm-button", name: n, onclick: r, type: "button" }, o);
    }
    this.dom = Z("div", { onkeydown: (n) => this.keydown(n), class: "cm-search" }, [
      this.searchField,
      i("next", () => bn(e), [pe(e, "next")]),
      i("prev", () => wn(e), [pe(e, "previous")]),
      i("select", () => tg(e), [pe(e, "all")]),
      Z("label", null, [this.caseField, pe(e, "match case")]),
      Z("label", null, [this.reField, pe(e, "regexp")]),
      Z("label", null, [this.wordField, pe(e, "by word")]),
      ...e.state.readOnly ? [] : [
        Z("br"),
        this.replaceField,
        i("replace", () => $o(e), [pe(e, "replace")]),
        i("replaceAll", () => ng(e), [pe(e, "replace all")])
      ],
      Z("button", {
        name: "close",
        onclick: () => Sh(e),
        "aria-label": pe(e, "close"),
        type: "button"
      }, ["×"])
    ]);
  }
  commit() {
    let e = new yh({
      search: this.searchField.value,
      caseSensitive: this.caseField.checked,
      regexp: this.reField.checked,
      wholeWord: this.wordField.checked,
      replace: this.replaceField.value
    });
    e.eq(this.query) || (this.query = e, this.view.dispatch({ effects: mi.of(e) }));
  }
  keydown(e) {
    Vc(this.view, e, "search-panel") ? e.preventDefault() : e.keyCode == 13 && e.target == this.searchField ? (e.preventDefault(), (e.shiftKey ? wn : bn)(this.view)) : e.keyCode == 13 && e.target == this.replaceField && (e.preventDefault(), $o(this.view));
  }
  update(e) {
    for (let t of e.transactions)
      for (let i of t.effects)
        i.is(mi) && !i.value.eq(this.query) && this.setQuery(i.value);
  }
  setQuery(e) {
    this.query = e, this.searchField.value = e.search, this.replaceField.value = e.replace, this.caseField.checked = e.caseSensitive, this.reField.checked = e.regexp, this.wordField.checked = e.wholeWord;
  }
  mount() {
    this.searchField.select();
  }
  get pos() {
    return 80;
  }
  get top() {
    return this.view.state.facet(Ut).top;
  }
}
function pe(s, e) {
  return s.state.phrase(e);
}
const qi = 30, Ki = /[\s\.,:;?!]/;
function wr(s, { from: e, to: t }) {
  let i = s.state.doc.lineAt(e), n = s.state.doc.lineAt(t).to, r = Math.max(i.from, e - qi), o = Math.min(n, t + qi), l = s.state.sliceDoc(r, o);
  if (r != i.from) {
    for (let a = 0; a < qi; a++)
      if (!Ki.test(l[a + 1]) && Ki.test(l[a])) {
        l = l.slice(a);
        break;
      }
  }
  if (o != n) {
    for (let a = l.length - 1; a > l.length - qi; a--)
      if (!Ki.test(l[a - 1]) && Ki.test(l[a])) {
        l = l.slice(0, a);
        break;
      }
  }
  return A.announce.of(`${s.state.phrase("current match")}. ${l} ${s.state.phrase("on line")} ${i.number}.`);
}
const og = /* @__PURE__ */ A.baseTheme({
  ".cm-panel.cm-search": {
    padding: "2px 6px 4px",
    position: "relative",
    "& [name=close]": {
      position: "absolute",
      top: "0",
      right: "4px",
      backgroundColor: "inherit",
      border: "none",
      font: "inherit",
      padding: 0,
      margin: 0
    },
    "& input, & button, & label": {
      margin: ".2em .6em .2em 0"
    },
    "& input[type=checkbox]": {
      marginRight: ".2em"
    },
    "& label": {
      fontSize: "80%",
      whiteSpace: "pre"
    }
  },
  "&light .cm-searchMatch": { backgroundColor: "#ffff0054" },
  "&dark .cm-searchMatch": { backgroundColor: "#00ffff8a" },
  "&light .cm-searchMatch-selected": { backgroundColor: "#ff6a0054" },
  "&dark .cm-searchMatch-selected": { backgroundColor: "#ff00ff8a" }
}), lg = [
  it,
  /* @__PURE__ */ kn.low(eg),
  og
], ag = /* @__PURE__ */ vh({
  name: "CodeMirrorEditor",
  __name: "CodeMirrorEditor",
  props: {
    modelValue: {},
    readonly: { type: Boolean },
    filename: {}
  },
  emits: ["update:modelValue"],
  setup(s, { emit: e }) {
    const t = s, i = e, n = Ch(null);
    let r = null;
    const o = new Wt(), l = new Wt(), a = /* @__PURE__ */ new Map();
    function h(u) {
      const d = u.split("/").pop() ?? "", p = d.lastIndexOf(".");
      return p >= 0 ? d.slice(p + 1).toLowerCase() : "";
    }
    async function f(u) {
      const d = a.get(u);
      if (d) return d;
      let p = [];
      switch (u) {
        case "json":
        case "jsonc":
        case "lock": {
          const { json: g } = await import("./index-b8TYJBio.js");
          p = g();
          break;
        }
        case "js":
        case "mjs":
        case "cjs": {
          const { javascript: g } = await import("./index-C2kj7Fyq.js").then((m) => m.i);
          p = g();
          break;
        }
        case "jsx": {
          const { javascript: g } = await import("./index-C2kj7Fyq.js").then((m) => m.i);
          p = g({ jsx: !0 });
          break;
        }
        case "ts": {
          const { javascript: g } = await import("./index-C2kj7Fyq.js").then((m) => m.i);
          p = g({ typescript: !0 });
          break;
        }
        case "tsx": {
          const { javascript: g } = await import("./index-C2kj7Fyq.js").then((m) => m.i);
          p = g({ typescript: !0, jsx: !0 });
          break;
        }
        case "vue":
        case "svelte":
        case "html":
        case "htm": {
          const { html: g } = await import("./index-CLK_2Y72.js");
          p = g();
          break;
        }
        case "css":
        case "scss":
        case "sass":
        case "less": {
          const { css: g } = await import("./index-3MWoBbsB.js");
          p = g();
          break;
        }
        case "md":
        case "markdown": {
          const { markdown: g } = await import("./index-b7QehgWN.js");
          p = g();
          break;
        }
        case "yml":
        case "yaml": {
          const { yaml: g } = await import("./index-CMSBtuvw.js");
          p = g();
          break;
        }
        case "xml":
        case "svg": {
          const { xml: g } = await import("./index-CH7b2rZ5.js");
          p = g();
          break;
        }
        default:
          p = [];
      }
      return a.set(u, p), p;
    }
    function c() {
      return [
        eu(),
        nu(),
        Od(),
        td(),
        zu(),
        dd(),
        Wp(),
        nd(od, { fallback: !0 }),
        ra.of([...Ep, ...Fd, ...Xu, ...sg, Lp]),
        A.lineWrapping,
        A.updateListener.of((u) => {
          if (!u.docChanged) return;
          const d = u.state.doc.toString();
          d !== t.modelValue && i("update:modelValue", d);
        })
      ];
    }
    return Ah(async () => {
      if (!n.value) return;
      const u = t.filename ? await f(h(t.filename)) : [], d = I.create({
        doc: t.modelValue ?? "",
        extensions: [
          ...c(),
          o.of(I.readOnly.of(!!t.readonly)),
          l.of(u)
        ]
      });
      r = new A({ state: d, parent: n.value });
    }), In(
      () => t.readonly,
      (u) => {
        r?.dispatch({
          effects: o.reconfigure(I.readOnly.of(!!u))
        });
      }
    ), In(
      () => t.filename,
      async (u) => {
        if (!r) return;
        const d = u ? h(u) : "", p = d ? await f(d) : [];
        r.dispatch({ effects: l.reconfigure(p) });
      }
    ), In(
      () => t.modelValue,
      (u) => {
        if (!r) return;
        const d = r.state.doc.toString();
        u !== d && r.dispatch({
          changes: { from: 0, to: d.length, insert: u ?? "" }
        });
      }
    ), Mh(() => {
      r?.destroy(), r = null;
    }), (u, d) => (Dh(), Th("div", {
      ref_key: "container",
      ref: n,
      class: "vuefinder__codemirror-editor"
    }, null, 512));
  }
}), bg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ag
}, Symbol.toStringTag, { value: "Module" }));
export {
  at as A,
  ra as B,
  bg as C,
  B as D,
  x as E,
  v as F,
  Ot as G,
  ug as H,
  H as I,
  vu as J,
  Ou as K,
  Hs as L,
  me as M,
  E as N,
  xe as O,
  cn as P,
  k as Q,
  yt as R,
  W as S,
  we as T,
  jt as W,
  su as a,
  I as b,
  A as c,
  De as d,
  ka as e,
  pg as f,
  pa as g,
  de as h,
  cg as i,
  cu as j,
  kn as k,
  Oe as l,
  N as m,
  Q as n,
  Y as o,
  pd as p,
  yg as q,
  Sn as r,
  Tu as s,
  gg as t,
  mg as u,
  xg as v,
  Ku as w,
  qu as x,
  Pu as y,
  cr as z
};
