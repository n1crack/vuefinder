function ve(z, ae) {
  for (var J = 0; J < ae.length; J++) {
    const m = ae[J];
    if (typeof m != "string" && !Array.isArray(m)) {
      for (const P in m)
        if (P !== "default" && !(P in z)) {
          const K = Object.getOwnPropertyDescriptor(m, P);
          K && Object.defineProperty(z, P, K.get ? K : {
            enumerable: !0,
            get: () => m[P]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(z, Symbol.toStringTag, { value: "Module" }));
}
function be(z) {
  return z && z.__esModule && Object.prototype.hasOwnProperty.call(z, "default") ? z.default : z;
}
var se = { exports: {} };
var Ee = se.exports, ge;
function we() {
  return ge || (ge = 1, (function(z, ae) {
    ((J, m) => {
      z.exports = m();
    })(Ee, function J() {
      var m = typeof self < "u" ? self : typeof window < "u" ? window : m !== void 0 ? m : {}, P, K = !m.document && !!m.postMessage, oe = m.IS_PAPA_WORKER || !1, te = {}, ye = 0, u = {};
      function W(e) {
        this._handle = null, this._finished = !1, this._completed = !1, this._halted = !1, this._input = null, this._baseIndex = 0, this._partialLine = "", this._rowCount = 0, this._start = 0, this._nextChunk = null, this.isFirstChunk = !0, this._completeResults = { data: [], errors: [], meta: {} }, (function(t) {
          var r = he(t);
          r.chunkSize = parseInt(r.chunkSize), t.step || t.chunk || (r.chunkSize = null), this._handle = new le(r), (this._handle.streamer = this)._config = r;
        }).call(this, e), this.parseChunk = function(t, r) {
          var n = parseInt(this._config.skipFirstNLines) || 0;
          if (this.isFirstChunk && 0 < n) {
            let l = this._config.newline;
            l || (i = this._config.quoteChar || '"', l = this._handle.guessLineEndings(t, i)), t = [...t.split(l).slice(n)].join(l);
          }
          this.isFirstChunk && k(this._config.beforeFirstChunk) && (i = this._config.beforeFirstChunk(t)) !== void 0 && (t = i), this.isFirstChunk = !1, this._halted = !1;
          var n = this._partialLine + t, i = (this._partialLine = "", this._handle.parse(n, this._baseIndex, !this._finished));
          if (!this._handle.paused() && !this._handle.aborted()) {
            if (t = i.meta.cursor, n = (this._finished || (this._partialLine = n.substring(t - this._baseIndex), this._baseIndex = t), i && i.data && (this._rowCount += i.data.length), this._finished || this._config.preview && this._rowCount >= this._config.preview), oe) m.postMessage({ results: i, workerId: u.WORKER_ID, finished: n });
            else if (k(this._config.chunk) && !r) {
              if (this._config.chunk(i, this._handle), this._handle.paused() || this._handle.aborted()) return void (this._halted = !0);
              this._completeResults = i = void 0;
            }
            return this._config.step || this._config.chunk || (this._completeResults.data = this._completeResults.data.concat(i.data), this._completeResults.errors = this._completeResults.errors.concat(i.errors), this._completeResults.meta = i.meta), this._completed || !n || !k(this._config.complete) || i && i.meta.aborted || (this._config.complete(this._completeResults, this._input), this._completed = !0), n || i && i.meta.paused || this._nextChunk(), i;
          }
          this._halted = !0;
        }, this._sendError = function(t) {
          k(this._config.error) ? this._config.error(t) : oe && this._config.error && m.postMessage({ workerId: u.WORKER_ID, error: t, finished: !1 });
        };
      }
      function re(e) {
        var t;
        (e = e || {}).chunkSize || (e.chunkSize = u.RemoteChunkSize), W.call(this, e), this._nextChunk = K ? function() {
          this._readChunk(), this._chunkLoaded();
        } : function() {
          this._readChunk();
        }, this.stream = function(r) {
          this._input = r, this._nextChunk();
        }, this._readChunk = function() {
          if (this._finished) this._chunkLoaded();
          else {
            if (t = new XMLHttpRequest(), this._config.withCredentials && (t.withCredentials = this._config.withCredentials), K || (t.onload = $(this._chunkLoaded, this), t.onerror = $(this._chunkError, this)), t.open(this._config.downloadRequestBody ? "POST" : "GET", this._input, !K), this._config.downloadRequestHeaders) {
              var r, n = this._config.downloadRequestHeaders;
              for (r in n) t.setRequestHeader(r, n[r]);
            }
            var i;
            this._config.chunkSize && (i = this._start + this._config.chunkSize - 1, t.setRequestHeader("Range", "bytes=" + this._start + "-" + i));
            try {
              t.send(this._config.downloadRequestBody);
            } catch (l) {
              this._chunkError(l.message);
            }
            K && t.status === 0 && this._chunkError();
          }
        }, this._chunkLoaded = function() {
          t.readyState === 4 && (t.status < 200 || 400 <= t.status ? this._chunkError() : (this._start += this._config.chunkSize || t.responseText.length, this._finished = !this._config.chunkSize || this._start >= ((r) => (r = r.getResponseHeader("Content-Range")) !== null ? parseInt(r.substring(r.lastIndexOf("/") + 1)) : -1)(t), this.parseChunk(t.responseText)));
        }, this._chunkError = function(r) {
          r = t.statusText || r, this._sendError(new Error(r));
        };
      }
      function ie(e) {
        (e = e || {}).chunkSize || (e.chunkSize = u.LocalChunkSize), W.call(this, e);
        var t, r, n = typeof FileReader < "u";
        this.stream = function(i) {
          this._input = i, r = i.slice || i.webkitSlice || i.mozSlice, n ? ((t = new FileReader()).onload = $(this._chunkLoaded, this), t.onerror = $(this._chunkError, this)) : t = new FileReaderSync(), this._nextChunk();
        }, this._nextChunk = function() {
          this._finished || this._config.preview && !(this._rowCount < this._config.preview) || this._readChunk();
        }, this._readChunk = function() {
          var i = this._input, l = (this._config.chunkSize && (l = Math.min(this._start + this._config.chunkSize, this._input.size), i = r.call(i, this._start, l)), t.readAsText(i, this._config.encoding));
          n || this._chunkLoaded({ target: { result: l } });
        }, this._chunkLoaded = function(i) {
          this._start += this._config.chunkSize, this._finished = !this._config.chunkSize || this._start >= this._input.size, this.parseChunk(i.target.result);
        }, this._chunkError = function() {
          this._sendError(t.error);
        };
      }
      function Y(e) {
        var t;
        W.call(this, e = e || {}), this.stream = function(r) {
          return t = r, this._nextChunk();
        }, this._nextChunk = function() {
          var r, n;
          if (!this._finished) return r = this._config.chunkSize, t = r ? (n = t.substring(0, r), t.substring(r)) : (n = t, ""), this._finished = !t, this.parseChunk(n);
        };
      }
      function ne(e) {
        W.call(this, e = e || {});
        var t = [], r = !0, n = !1;
        this.pause = function() {
          W.prototype.pause.apply(this, arguments), this._input.pause();
        }, this.resume = function() {
          W.prototype.resume.apply(this, arguments), this._input.resume();
        }, this.stream = function(i) {
          this._input = i, this._input.on("data", this._streamData), this._input.on("end", this._streamEnd), this._input.on("error", this._streamError);
        }, this._checkIsFinished = function() {
          n && t.length === 1 && (this._finished = !0);
        }, this._nextChunk = function() {
          this._checkIsFinished(), t.length ? this.parseChunk(t.shift()) : r = !0;
        }, this._streamData = $(function(i) {
          try {
            t.push(typeof i == "string" ? i : i.toString(this._config.encoding)), r && (r = !1, this._checkIsFinished(), this.parseChunk(t.shift()));
          } catch (l) {
            this._streamError(l);
          }
        }, this), this._streamError = $(function(i) {
          this._streamCleanUp(), this._sendError(i);
        }, this), this._streamEnd = $(function() {
          this._streamCleanUp(), n = !0, this._streamData("");
        }, this), this._streamCleanUp = $(function() {
          this._input.removeListener("data", this._streamData), this._input.removeListener("end", this._streamEnd), this._input.removeListener("error", this._streamError);
        }, this);
      }
      function le(e) {
        var t, r, n, i, l = Math.pow(2, 53), S = -l, F = /^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/, j = /^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/, d = this, E = 0, a = 0, T = !1, h = !1, c = [], s = { data: [], errors: [], meta: {} };
        function C(p) {
          return e.skipEmptyLines === "greedy" ? p.join("").trim() === "" : p.length === 1 && p[0].length === 0;
        }
        function O() {
          if (s && n && (M("Delimiter", "UndetectableDelimiter", "Unable to auto-detect delimiting character; defaulted to '" + u.DefaultDelimiter + "'"), n = !1), e.skipEmptyLines && (s.data = s.data.filter(function(o) {
            return !C(o);
          })), I()) {
            let o = function(R, x) {
              k(e.transformHeader) && (R = e.transformHeader(R, x)), c.push(R);
            };
            if (s) if (Array.isArray(s.data[0])) {
              for (var p = 0; I() && p < s.data.length; p++) s.data[p].forEach(o);
              s.data.splice(0, 1);
            } else s.data.forEach(o);
          }
          function g(o, R) {
            for (var x = e.header ? {} : [], y = 0; y < o.length; y++) {
              var v = y, _ = o[y], _ = ((U, f) => ((b) => (e.dynamicTypingFunction && e.dynamicTyping[b] === void 0 && (e.dynamicTyping[b] = e.dynamicTypingFunction(b)), (e.dynamicTyping[b] || e.dynamicTyping) === !0))(U) ? f === "true" || f === "TRUE" || f !== "false" && f !== "FALSE" && (((b) => {
                if (F.test(b) && (b = parseFloat(b), S < b && b < l))
                  return 1;
              })(f) ? parseFloat(f) : j.test(f) ? new Date(f) : f === "" ? null : f) : f)(v = e.header ? y >= c.length ? "__parsed_extra" : c[y] : v, _ = e.transform ? e.transform(_, v) : _);
              v === "__parsed_extra" ? (x[v] = x[v] || [], x[v].push(_)) : x[v] = _;
            }
            return e.header && (y > c.length ? M("FieldMismatch", "TooManyFields", "Too many fields: expected " + c.length + " fields but parsed " + y, a + R) : y < c.length && M("FieldMismatch", "TooFewFields", "Too few fields: expected " + c.length + " fields but parsed " + y, a + R)), x;
          }
          var w;
          s && (e.header || e.dynamicTyping || e.transform) && (w = 1, !s.data.length || Array.isArray(s.data[0]) ? (s.data = s.data.map(g), w = s.data.length) : s.data = g(s.data, 0), e.header && s.meta && (s.meta.fields = c), a += w);
        }
        function I() {
          return e.header && c.length === 0;
        }
        function M(p, g, w, o) {
          p = { type: p, code: g, message: w }, o !== void 0 && (p.row = o), s.errors.push(p);
        }
        k(e.step) && (i = e.step, e.step = function(p) {
          s = p, I() ? O() : (O(), s.data.length !== 0 && (E += p.data.length, e.preview && E > e.preview ? r.abort() : (s.data = s.data[0], i(s, d))));
        }), this.parse = function(p, g, w) {
          var o = e.quoteChar || '"', o = (e.newline || (e.newline = this.guessLineEndings(p, o)), n = !1, e.delimiter ? k(e.delimiter) && (e.delimiter = e.delimiter(p), s.meta.delimiter = e.delimiter) : ((o = ((R, x, y, v, _) => {
            var U, f, b, Q;
            _ = _ || [",", "	", "|", ";", u.RECORD_SEP, u.UNIT_SEP];
            for (var Z = 0; Z < _.length; Z++) {
              for (var q, V = _[Z], D = 0, N = 0, A = 0, L = (b = void 0, new ue({ comments: v, delimiter: V, newline: x, preview: 10 }).parse(R)), H = 0; H < L.data.length; H++) y && C(L.data[H]) ? A++ : (q = L.data[H].length, N += q, b === void 0 ? b = q : 0 < q && (D += Math.abs(q - b), b = q));
              0 < L.data.length && (N /= L.data.length - A), (f === void 0 || D <= f) && (Q === void 0 || Q < N) && 1.99 < N && (f = D, U = V, Q = N);
            }
            return { successful: !!(e.delimiter = U), bestDelimiter: U };
          })(p, e.newline, e.skipEmptyLines, e.comments, e.delimitersToGuess)).successful ? e.delimiter = o.bestDelimiter : (n = !0, e.delimiter = u.DefaultDelimiter), s.meta.delimiter = e.delimiter), he(e));
          return e.preview && e.header && o.preview++, t = p, r = new ue(o), s = r.parse(t, g, w), O(), T ? { meta: { paused: !0 } } : s || { meta: { paused: !1 } };
        }, this.paused = function() {
          return T;
        }, this.pause = function() {
          T = !0, r.abort(), t = k(e.chunk) ? "" : t.substring(r.getCharIndex());
        }, this.resume = function() {
          d.streamer._halted ? (T = !1, d.streamer.parseChunk(t, !0)) : setTimeout(d.resume, 3);
        }, this.aborted = function() {
          return h;
        }, this.abort = function() {
          h = !0, r.abort(), s.meta.aborted = !0, k(e.complete) && e.complete(s), t = "";
        }, this.guessLineEndings = function(R, o) {
          R = R.substring(0, 1048576);
          var o = new RegExp(X(o) + "([^]*?)" + X(o), "gm"), w = (R = R.replace(o, "")).split("\r"), o = R.split(`
`), R = 1 < o.length && o[0].length < w[0].length;
          if (w.length === 1 || R) return `
`;
          for (var x = 0, y = 0; y < w.length; y++) w[y][0] === `
` && x++;
          return x >= w.length / 2 ? `\r
` : "\r";
        };
      }
      function X(e) {
        return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
      function ue(e) {
        var t = (e = e || {}).delimiter, r = e.newline, n = e.comments, i = e.step, l = e.preview, S = e.fastMode, F = null, j = !1, d = e.quoteChar == null ? '"' : e.quoteChar, E = d;
        if (e.escapeChar !== void 0 && (E = e.escapeChar), (typeof t != "string" || -1 < u.BAD_DELIMITERS.indexOf(t)) && (t = ","), n === t) throw new Error("Comment character same as delimiter");
        n === !0 ? n = "#" : (typeof n != "string" || -1 < u.BAD_DELIMITERS.indexOf(n)) && (n = !1), r !== `
` && r !== "\r" && r !== `\r
` && (r = `
`);
        var a = 0, T = !1;
        this.parse = function(h, c, s) {
          if (typeof h != "string") throw new Error("Input must be a string");
          var C = h.length, O = t.length, I = r.length, M = n.length, p = k(i), g = [], w = [], o = [], R = a = 0;
          if (!h) return D();
          if (S || S !== !1 && h.indexOf(d) === -1) {
            for (var x = h.split(r), y = 0; y < x.length; y++) {
              if (o = x[y], a += o.length, y !== x.length - 1) a += r.length;
              else if (s) return D();
              if (!n || o.substring(0, M) !== n) {
                if (p) {
                  if (g = [], Q(o.split(t)), N(), T) return D();
                } else Q(o.split(t));
                if (l && l <= y) return g = g.slice(0, l), D(!0);
              }
            }
            return D();
          }
          for (var v = h.indexOf(t, a), _ = h.indexOf(r, a), U = new RegExp(X(E) + X(d), "g"), f = h.indexOf(d, a); ; ) if (h[a] === d) for (f = a, a++; ; ) {
            if ((f = h.indexOf(d, f + 1)) === -1) return s || w.push({ type: "Quotes", code: "MissingQuotes", message: "Quoted field unterminated", row: g.length, index: a }), q();
            if (f === C - 1) return q(h.substring(a, f).replace(U, d));
            if (d === E && h[f + 1] === E) f++;
            else if (d === E || f === 0 || h[f - 1] !== E) {
              v !== -1 && v < f + 1 && (v = h.indexOf(t, f + 1));
              var b = Z((_ = _ !== -1 && _ < f + 1 ? h.indexOf(r, f + 1) : _) === -1 ? v : Math.min(v, _));
              if (h.substr(f + 1 + b, O) === t) {
                o.push(h.substring(a, f).replace(U, d)), h[a = f + 1 + b + O] !== d && (f = h.indexOf(d, a)), v = h.indexOf(t, a), _ = h.indexOf(r, a);
                break;
              }
              if (b = Z(_), h.substring(f + 1 + b, f + 1 + b + I) === r) {
                if (o.push(h.substring(a, f).replace(U, d)), V(f + 1 + b + I), v = h.indexOf(t, a), f = h.indexOf(d, a), p && (N(), T)) return D();
                if (l && g.length >= l) return D(!0);
                break;
              }
              w.push({ type: "Quotes", code: "InvalidQuotes", message: "Trailing quote on quoted field is malformed", row: g.length, index: a }), f++;
            }
          }
          else if (n && o.length === 0 && h.substring(a, a + M) === n) {
            if (_ === -1) return D();
            a = _ + I, _ = h.indexOf(r, a), v = h.indexOf(t, a);
          } else if (v !== -1 && (v < _ || _ === -1)) o.push(h.substring(a, v)), a = v + O, v = h.indexOf(t, a);
          else {
            if (_ === -1) break;
            if (o.push(h.substring(a, _)), V(_ + I), p && (N(), T)) return D();
            if (l && g.length >= l) return D(!0);
          }
          return q();
          function Q(A) {
            g.push(A), R = a;
          }
          function Z(A) {
            var L = 0;
            return L = A !== -1 && (A = h.substring(f + 1, A)) && A.trim() === "" ? A.length : L;
          }
          function q(A) {
            return s || (A === void 0 && (A = h.substring(a)), o.push(A), a = C, Q(o), p && N()), D();
          }
          function V(A) {
            a = A, Q(o), o = [], _ = h.indexOf(r, a);
          }
          function D(A) {
            if (e.header && !c && g.length && !j) {
              var L = g[0], H = /* @__PURE__ */ Object.create(null), fe = new Set(L);
              let pe = !1;
              for (let G = 0; G < L.length; G++) {
                let B = L[G];
                if (H[B = k(e.transformHeader) ? e.transformHeader(B, G) : B]) {
                  let ee, _e = H[B];
                  for (; ee = B + "_" + _e, _e++, fe.has(ee); ) ;
                  fe.add(ee), L[G] = ee, H[B]++, pe = !0, (F = F === null ? {} : F)[ee] = B;
                } else H[B] = 1, L[G] = B;
                fe.add(B);
              }
              pe && console.warn("Duplicate headers found and renamed."), j = !0;
            }
            return { data: g, errors: w, meta: { delimiter: t, linebreak: r, aborted: T, truncated: !!A, cursor: R + (c || 0), renamedHeaders: F } };
          }
          function N() {
            i(D()), g = [], w = [];
          }
        }, this.abort = function() {
          T = !0;
        }, this.getCharIndex = function() {
          return a;
        };
      }
      function ke(e) {
        var t = e.data, r = te[t.workerId], n = !1;
        if (t.error) r.userError(t.error, t.file);
        else if (t.results && t.results.data) {
          var i = { abort: function() {
            n = !0, de(t.workerId, { data: [], errors: [], meta: { aborted: !0 } });
          }, pause: ce, resume: ce };
          if (k(r.userStep)) {
            for (var l = 0; l < t.results.data.length && (r.userStep({ data: t.results.data[l], errors: t.results.errors, meta: t.results.meta }, i), !n); l++) ;
            delete t.results;
          } else k(r.userChunk) && (r.userChunk(t.results, i, t.file), delete t.results);
        }
        t.finished && !n && de(t.workerId, t.results);
      }
      function de(e, t) {
        var r = te[e];
        k(r.userComplete) && r.userComplete(t), r.terminate(), delete te[e];
      }
      function ce() {
        throw new Error("Not implemented.");
      }
      function he(e) {
        if (typeof e != "object" || e === null) return e;
        var t, r = Array.isArray(e) ? [] : {};
        for (t in e) r[t] = he(e[t]);
        return r;
      }
      function $(e, t) {
        return function() {
          e.apply(t, arguments);
        };
      }
      function k(e) {
        return typeof e == "function";
      }
      return u.parse = function(e, t) {
        var r = (t = t || {}).dynamicTyping || !1;
        if (k(r) && (t.dynamicTypingFunction = r, r = {}), t.dynamicTyping = r, t.transform = !!k(t.transform) && t.transform, !t.worker || !u.WORKERS_SUPPORTED) return r = null, u.NODE_STREAM_INPUT, typeof e == "string" ? (e = ((n) => n.charCodeAt(0) !== 65279 ? n : n.slice(1))(e), r = new (t.download ? re : Y)(t)) : e.readable === !0 && k(e.read) && k(e.on) ? r = new ne(t) : (m.File && e instanceof File || e instanceof Object) && (r = new ie(t)), r.stream(e);
        (r = (() => {
          var n;
          return !!u.WORKERS_SUPPORTED && (n = (() => {
            var i = m.URL || m.webkitURL || null, l = J.toString();
            return u.BLOB_URL || (u.BLOB_URL = i.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ", "(", l, ")();"], { type: "text/javascript" })));
          })(), (n = new m.Worker(n)).onmessage = ke, n.id = ye++, te[n.id] = n);
        })()).userStep = t.step, r.userChunk = t.chunk, r.userComplete = t.complete, r.userError = t.error, t.step = k(t.step), t.chunk = k(t.chunk), t.complete = k(t.complete), t.error = k(t.error), delete t.worker, r.postMessage({ input: e, config: t, workerId: r.id });
      }, u.unparse = function(e, t) {
        var r = !1, n = !0, i = ",", l = `\r
`, S = '"', F = S + S, j = !1, d = null, E = !1, a = ((() => {
          if (typeof t == "object") {
            if (typeof t.delimiter != "string" || u.BAD_DELIMITERS.filter(function(c) {
              return t.delimiter.indexOf(c) !== -1;
            }).length || (i = t.delimiter), typeof t.quotes != "boolean" && typeof t.quotes != "function" && !Array.isArray(t.quotes) || (r = t.quotes), typeof t.skipEmptyLines != "boolean" && typeof t.skipEmptyLines != "string" || (j = t.skipEmptyLines), typeof t.newline == "string" && (l = t.newline), typeof t.quoteChar == "string" && (S = t.quoteChar), typeof t.header == "boolean" && (n = t.header), Array.isArray(t.columns)) {
              if (t.columns.length === 0) throw new Error("Option columns is empty");
              d = t.columns;
            }
            t.escapeChar !== void 0 && (F = t.escapeChar + S), t.escapeFormulae instanceof RegExp ? E = t.escapeFormulae : typeof t.escapeFormulae == "boolean" && t.escapeFormulae && (E = /^[=+\-@\t\r].*$/);
          }
        })(), new RegExp(X(S), "g"));
        if (typeof e == "string" && (e = JSON.parse(e)), Array.isArray(e)) {
          if (!e.length || Array.isArray(e[0])) return T(null, e, j);
          if (typeof e[0] == "object") return T(d || Object.keys(e[0]), e, j);
        } else if (typeof e == "object") return typeof e.data == "string" && (e.data = JSON.parse(e.data)), Array.isArray(e.data) && (e.fields || (e.fields = e.meta && e.meta.fields || d), e.fields || (e.fields = Array.isArray(e.data[0]) ? e.fields : typeof e.data[0] == "object" ? Object.keys(e.data[0]) : []), Array.isArray(e.data[0]) || typeof e.data[0] == "object" || (e.data = [e.data])), T(e.fields || [], e.data || [], j);
        throw new Error("Unable to serialize unrecognized input");
        function T(c, s, C) {
          var O = "", I = (typeof c == "string" && (c = JSON.parse(c)), typeof s == "string" && (s = JSON.parse(s)), Array.isArray(c) && 0 < c.length), M = !Array.isArray(s[0]);
          if (I && n) {
            for (var p = 0; p < c.length; p++) 0 < p && (O += i), O += h(c[p], p);
            0 < s.length && (O += l);
          }
          for (var g = 0; g < s.length; g++) {
            var w = (I ? c : s[g]).length, o = !1, R = I ? Object.keys(s[g]).length === 0 : s[g].length === 0;
            if (C && !I && (o = C === "greedy" ? s[g].join("").trim() === "" : s[g].length === 1 && s[g][0].length === 0), C === "greedy" && I) {
              for (var x = [], y = 0; y < w; y++) {
                var v = M ? c[y] : y;
                x.push(s[g][v]);
              }
              o = x.join("").trim() === "";
            }
            if (!o) {
              for (var _ = 0; _ < w; _++) {
                0 < _ && !R && (O += i);
                var U = I && M ? c[_] : _;
                O += h(s[g][U], _);
              }
              g < s.length - 1 && (!C || 0 < w && !R) && (O += l);
            }
          }
          return O;
        }
        function h(c, s) {
          var C, O;
          return c == null ? "" : c.constructor === Date ? JSON.stringify(c).slice(1, 25) : (O = !1, E && typeof c == "string" && E.test(c) && (c = "'" + c, O = !0), C = c.toString().replace(a, F), (O = O || r === !0 || typeof r == "function" && r(c, s) || Array.isArray(r) && r[s] || ((I, M) => {
            for (var p = 0; p < M.length; p++) if (-1 < I.indexOf(M[p])) return !0;
            return !1;
          })(C, u.BAD_DELIMITERS) || -1 < C.indexOf(i) || C.charAt(0) === " " || C.charAt(C.length - 1) === " ") ? S + C + S : C);
        }
      }, u.RECORD_SEP = "", u.UNIT_SEP = "", u.BYTE_ORDER_MARK = "\uFEFF", u.BAD_DELIMITERS = ["\r", `
`, '"', u.BYTE_ORDER_MARK], u.WORKERS_SUPPORTED = !K && !!m.Worker, u.NODE_STREAM_INPUT = 1, u.LocalChunkSize = 10485760, u.RemoteChunkSize = 5242880, u.DefaultDelimiter = ",", u.Parser = ue, u.ParserHandle = le, u.NetworkStreamer = re, u.FileStreamer = ie, u.StringStreamer = Y, u.ReadableStreamStreamer = ne, m.jQuery && ((P = m.jQuery).fn.parse = function(e) {
        var t = e.config || {}, r = [];
        return this.each(function(l) {
          if (!(P(this).prop("tagName").toUpperCase() === "INPUT" && P(this).attr("type").toLowerCase() === "file" && m.FileReader) || !this.files || this.files.length === 0) return !0;
          for (var S = 0; S < this.files.length; S++) r.push({ file: this.files[S], inputElem: this, instanceConfig: P.extend({}, t) });
        }), n(), this;
        function n() {
          if (r.length === 0) k(e.complete) && e.complete();
          else {
            var l, S, F, j, d = r[0];
            if (k(e.before)) {
              var E = e.before(d.file, d.inputElem);
              if (typeof E == "object") {
                if (E.action === "abort") return l = "AbortError", S = d.file, F = d.inputElem, j = E.reason, void (k(e.error) && e.error({ name: l }, S, F, j));
                if (E.action === "skip") return void i();
                typeof E.config == "object" && (d.instanceConfig = P.extend(d.instanceConfig, E.config));
              } else if (E === "skip") return void i();
            }
            var a = d.instanceConfig.complete;
            d.instanceConfig.complete = function(T) {
              k(a) && a(T, d.file, d.inputElem), i();
            }, u.parse(d.file, d.instanceConfig);
          }
        }
        function i() {
          r.splice(0, 1), n();
        }
      }), oe && (m.onmessage = function(e) {
        e = e.data, u.WORKER_ID === void 0 && e && (u.WORKER_ID = e.workerId), typeof e.input == "string" ? m.postMessage({ workerId: u.WORKER_ID, results: u.parse(e.input, e.config), finished: !0 }) : (m.File && e.input instanceof File || e.input instanceof Object) && (e = u.parse(e.input, e.config)) && m.postMessage({ workerId: u.WORKER_ID, results: e, finished: !0 });
      }), (re.prototype = Object.create(W.prototype)).constructor = re, (ie.prototype = Object.create(W.prototype)).constructor = ie, (Y.prototype = Object.create(Y.prototype)).constructor = Y, (ne.prototype = Object.create(W.prototype)).constructor = ne, u;
    });
  })(se)), se.exports;
}
var me = we();
const Re = /* @__PURE__ */ be(me), Oe = /* @__PURE__ */ ve({
  __proto__: null,
  default: Re
}, [me]);
export {
  Oe as p
};
