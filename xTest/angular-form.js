var AngularForm = (() => {
  var Tt = Object.defineProperty;
  var To = Object.getOwnPropertyDescriptor;
  var Do = Object.getOwnPropertyNames;
  var Ao = Object.prototype.hasOwnProperty;
  var gr = (e, t, n) => () => {
    if (n) throw n[0];
    try {
      return (e && (t = e((e = 0))), t);
    } catch (r) {
      throw ((n = [r]), r);
    }
  };
  var mr = (e, t) => {
      for (var n in t) Tt(e, n, { get: t[n], enumerable: !0 });
    },
    No = (e, t, n, r) => {
      if ((t && typeof t == 'object') || typeof t == 'function')
        for (let i of Do(t))
          !Ao.call(e, i) &&
            i !== n &&
            Tt(e, i, { get: () => t[i], enumerable: !(r = To(t, i)) || r.enumerable });
      return e;
    };
  var Oo = (e) => No(Tt({}, '__esModule', { value: !0 }), e);
  function v(e) {
    let t = Mt[0];
    return ((Mt[0] = e), t);
  }
  function Fo() {
    return Mt[0];
  }
  function Lo(e) {
    if (!(yt(e) && !e.dirty) && !(!e.dirty && e.lastCleanEpoch === kn)) {
      if (!e.producerMustRecompute(e) && !li(e)) {
        _r(e);
        return;
      }
      (e.producerRecomputeValue(e), _r(e));
    }
  }
  function _r(e) {
    ((e.dirty = !1), (e.lastCleanEpoch = kn));
  }
  function kr(e) {
    return (e && Mo(e), v(e));
  }
  function Mo(e) {
    if (e.producersTail?.knownValidAtEpoch === kn) {
      let t = e.producers;
      for (; t !== void 0; ) ((t.knownValidAtEpoch = null), (t = t.nextProducer));
    }
    ((e.producersTail = void 0), (e.recomputing = !0));
  }
  function zo(e, t) {
    (v(t), e && Bo(e));
  }
  function Bo(e) {
    e.recomputing = !1;
    let t = e.producersTail,
      n = t !== void 0 ? t.nextProducer : e.producers;
    if (n !== void 0) {
      if (yt(e))
        do n = Sn(n);
        while (n !== void 0);
      t !== void 0 ? (t.nextProducer = void 0) : (e.producers = void 0);
    }
  }
  function li(e) {
    for (let t = e.producers; t !== void 0; t = t.nextProducer) {
      let n = t.producer,
        r = t.lastReadVersion;
      if (r !== n.version || (Lo(n), r !== n.version)) return !0;
    }
    return !1;
  }
  function ui(e) {
    if (yt(e)) {
      let t = e.producers;
      for (; t !== void 0; ) t = Sn(t);
    }
    ((e.producers = void 0),
      (e.producersTail = void 0),
      (e.consumers = void 0),
      (e.consumersTail = void 0));
  }
  function Sn(e) {
    let t = e.producer,
      n = e.nextProducer,
      r = e.nextConsumer,
      i = e.prevConsumer;
    if (
      ((e.nextConsumer = void 0),
      (e.prevConsumer = void 0),
      r !== void 0 ? (r.prevConsumer = i) : (t.consumersTail = i),
      i !== void 0)
    )
      i.nextConsumer = r;
    else if (((t.consumers = r), !yt(t))) {
      let s = t.producers;
      for (; s !== void 0; ) s = Sn(s);
    }
    return n;
  }
  function yt(e) {
    return e.consumerIsAlwaysLive || e.consumers !== void 0;
  }
  function Uo() {
    throw new Error();
  }
  function Qo(e) {
    Zo = e;
  }
  function ai() {
    return zt[0];
  }
  function G(e) {
    let t = zt[0];
    return ((zt[0] = e), t);
  }
  function Cn(e) {
    return e === qo || e?.name === '\u0275NotFound';
  }
  function z(e) {
    return typeof e == 'function';
  }
  function ci(e) {
    let t = e((n) => {
      (Error.call(n), (n.stack = new Error().stack));
    });
    return ((t.prototype = Object.create(Error.prototype)), (t.prototype.constructor = t), t);
  }
  function Bt(e, t) {
    if (e) {
      let n = e.indexOf(t);
      0 <= n && e.splice(n, 1);
    }
  }
  function fi(e) {
    return e instanceof K || (e && 'closed' in e && z(e.remove) && z(e.add) && z(e.unsubscribe));
  }
  function Sr(e) {
    z(e) ? e() : e.unsubscribe();
  }
  function Go(e) {
    Ye.setTimeout(() => {
      let { onUnhandledError: t } = he;
      if (t) t(e);
      else throw e;
    });
  }
  function Cr() {}
  function $o(e) {
    return En('E', void 0, e);
  }
  function Ko(e) {
    return En('N', e, void 0);
  }
  function En(e, t, n) {
    return { kind: e, value: t, error: n };
  }
  function Ge(e) {
    if (he.useDeprecatedSynchronousErrorHandling) {
      let t = !ie;
      if ((t && (ie = { errorThrown: !1, error: null }), e(), t)) {
        let { errorThrown: n, error: r } = ie;
        if (((ie = null), n)) throw r;
      }
    } else e();
  }
  function Jo(e) {
    he.useDeprecatedSynchronousErrorHandling && ie && ((ie.errorThrown = !0), (ie.error = e));
  }
  function At(e, t) {
    return Xo.call(e, t);
  }
  function Qe(e) {
    he.useDeprecatedSynchronousErrorHandling ? Jo(e) : Go(e);
  }
  function el(e) {
    throw e;
  }
  function Nt(e, t) {
    let { onStoppedNotification: n } = he;
    n && Ye.setTimeout(() => n(e, t));
  }
  function rl(e) {
    return e;
  }
  function il(e) {
    return e.length === 0
      ? rl
      : e.length === 1
        ? e[0]
        : function (t) {
            return e.reduce((n, r) => r(n), t);
          };
  }
  function Er(e) {
    var t;
    return (t = e ?? he.Promise) !== null && t !== void 0 ? t : Promise;
  }
  function sl(e) {
    return e && z(e.next) && z(e.error) && z(e.complete);
  }
  function ol(e) {
    return (e && e instanceof In) || (sl(e) && fi(e));
  }
  function ll(e) {
    return z(e?.lift);
  }
  function ul(e) {
    return (t) => {
      if (ll(t))
        return t.lift(function (n) {
          try {
            return e(n, this);
          } catch (r) {
            this.error(r);
          }
        });
      throw new TypeError('Unable to lift unknown Observable type');
    };
  }
  function al(e, t, n, r, i) {
    return new cl(e, t, n, r, i);
  }
  function hl(e, t) {
    return ul((n, r) => {
      let i = 0;
      n.subscribe(
        al(r, (s) => {
          r.next(e.call(t, s, i++));
        }),
      );
    });
  }
  function pl(e) {
    return `NG0${Math.abs(e)}`;
  }
  function yl(e, t) {
    return `${pl(e)}${t ? ': ' + t : ''}`;
  }
  function b(e) {
    for (let t in e) if (e[t] === b) return t;
    throw Error('');
  }
  function Ir(e, t) {
    return e ? (t ? `${e} ${t}` : e) : t || '';
  }
  function yi(e) {
    return ((e.__forward_ref__ = yi), e);
  }
  function P(e) {
    return gl(e) ? e() : e;
  }
  function gl(e) {
    return typeof e == 'function' && Object.hasOwn(e, vl) && e.__forward_ref__ === yi;
  }
  function N(e) {
    return { token: e.token, providedIn: e.providedIn || null, factory: e.factory, value: void 0 };
  }
  function xn(e) {
    return ml(e, vi);
  }
  function ml(e, t) {
    return (Object.hasOwn(e, t) && e[t]) || null;
  }
  function wl(e) {
    return (e?.[vi] ?? null) || null;
  }
  function xr(e) {
    return e && Object.hasOwn(e, Tr) ? e[Tr] : null;
  }
  function gi(e) {
    return e && !!e.ɵproviders;
  }
  function Ve(e) {
    return (Tn(e, '@Component'), e[bl] || null);
  }
  function mi(e) {
    return (Tn(e, '@Directive'), e[_l] || null);
  }
  function Sl(e) {
    return (Tn(e, '@Pipe'), e[kl] || null);
  }
  function Tn(e, t) {
    if (e == null) throw new g(-919, !1);
  }
  function bi(e, t) {
    return _i('', -200, t);
  }
  function Dn(e, t) {
    throw new g(-201, !1);
  }
  function _i(e, t, n) {
    let r = new g(t, e);
    return ((r[wi] = t), (r[Cl] = e), n && (r[El] = n), r);
  }
  function Il(e) {
    return e[wi];
  }
  function ki() {
    return Qt;
  }
  function O(e) {
    let t = Qt;
    return ((Qt = e), t);
  }
  function Si(e, t, n) {
    let r = xn(e);
    if (r && r.providedIn == 'root') return r.value === void 0 ? (r.value = r.factory()) : r.value;
    if (n & 8) return null;
    if (t !== void 0) return t;
    Dn(e, '');
  }
  function Al(e, t = 0) {
    let n = ai();
    if (n === void 0) throw new g(-203, !1);
    if (n === null) return Si(e, void 0, t);
    {
      let r = Nl(t),
        i = n.retrieve(e, r);
      if (Cn(i)) {
        if (r.optional) return null;
        throw i;
      }
      return i;
    }
  }
  function C(e, t = 0) {
    return (ki() || Al)(P(e), t);
  }
  function S(e, t) {
    return C(e, je(t));
  }
  function je(e) {
    return typeof e > 'u' || typeof e == 'number'
      ? e
      : 0 | (e.optional && 8) | (e.host && 1) | (e.self && 2) | (e.skipSelf && 4);
  }
  function Nl(e) {
    return { optional: !!(e & 8), host: !!(e & 1), self: !!(e & 2), skipSelf: !!(e & 4) };
  }
  function qt(e) {
    let t = [];
    for (let n = 0; n < e.length; n++) {
      let r = P(e[n]);
      if (Array.isArray(r)) {
        if (r.length === 0) throw new g(900, !1);
        let i,
          s = 0;
        for (let o = 0; o < r.length; o++) {
          let l = r[o],
            u = Ol(l);
          typeof u == 'number' ? (u === -1 ? (i = l.token) : (s |= u)) : (i = l);
        }
        t.push(C(i, s));
      } else t.push(C(r));
    }
    return t;
  }
  function Ol(e) {
    return e[Tl];
  }
  function Re(e, t) {
    return Object.hasOwn(e, Dr) ? e[Dr] : null;
  }
  function An(e, t) {
    e.forEach((n) => (Array.isArray(n) ? An(n, t) : t(n)));
  }
  function Ci(e, t, n) {
    t >= e.length ? e.push(n) : e.splice(t, 0, n);
  }
  function et(e, t) {
    return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
  }
  function Vl(...e) {
    return { ɵproviders: Ti(!0, e), ɵfromNgModule: !0 };
  }
  function Ti(e, ...t) {
    let n = [],
      r = new Set(),
      i,
      s = (o) => {
        n.push(o);
      };
    return (
      An(t, (o) => {
        let l = o;
        Gt(l, s, [], r) && ((i ||= []), i.push(l));
      }),
      i !== void 0 && Di(i, s),
      n
    );
  }
  function Di(e, t) {
    for (let n = 0; n < e.length; n++) {
      let { ngModule: r, providers: i } = e[n];
      Vn(i, (s) => {
        t(s, r);
      });
    }
  }
  function Gt(e, t, n, r) {
    if (((e = P(e)), !e)) return !1;
    let i = null,
      s = xr(e),
      o = !s && Ve(e);
    if (!s && !o) {
      let u = e.ngModule;
      if (((s = xr(u)), s)) i = u;
      else return !1;
    } else {
      if (o && !o.standalone) return !1;
      i = e;
    }
    let l = r.has(i);
    if (o) {
      if (l) return !1;
      if ((r.add(i), o.dependencies)) {
        let u = typeof o.dependencies == 'function' ? o.dependencies() : o.dependencies;
        for (let a of u) Gt(a, t, n, r);
      }
    } else if (s) {
      if (s.imports != null && !l) {
        r.add(i);
        let a;
        (An(s.imports, (c) => {
          Gt(c, t, n, r) && ((a ||= []), a.push(c));
        }),
          a !== void 0 && Di(a, t));
      }
      if (!l) {
        let a = Re(i) || (() => new i());
        (t({ provide: i, useFactory: a, deps: be }, i),
          t({ provide: Ii, useValue: i, multi: !0 }, i),
          t({ provide: On, useValue: () => C(i), multi: !0 }, i));
      }
      let u = s.providers;
      if (u != null && !l) {
        let a = e;
        Vn(u, (c) => {
          t(c, a);
        });
      }
    } else return !1;
    return i !== e && e.providers !== void 0;
  }
  function Vn(e, t) {
    for (let n of e) (gi(n) && (n = n.ɵproviders), Array.isArray(n) ? Vn(n, t) : t(n));
  }
  function Ai(e) {
    return e !== null && typeof e == 'object' && jl in e;
  }
  function Rl(e) {
    return !!(e && e.useExisting);
  }
  function Hl(e) {
    return !!(e && e.useFactory);
  }
  function Wt(e) {
    return typeof e == 'function';
  }
  function jn() {
    return (Ot === void 0 && (Ot = new xi()), Ot);
  }
  function $t(e) {
    let t = xn(e),
      n = t !== null ? t.factory : Re(e);
    if (n !== null) return n;
    if (e instanceof k) throw new g(-204, !1);
    if (e instanceof Function) return Pl(e);
    throw new g(-204, !1);
  }
  function Pl(e) {
    if (e.length > 0) throw new g(-204, !1);
    let t = wl(e);
    return t !== null ? () => t.factory(e) : () => new e();
  }
  function Fl(e) {
    if (Ai(e)) return ve(void 0, e.useValue);
    {
      let t = Ll(e);
      return ve(t, We);
    }
  }
  function Ll(e, t, n) {
    let r;
    if (Wt(e)) {
      let i = P(e);
      return Re(i) || $t(i);
    } else if (Ai(e)) r = () => P(e.useValue);
    else if (Hl(e)) r = () => e.useFactory(...qt(e.deps || []));
    else if (Rl(e)) r = (i, s) => C(P(e.useExisting), s !== void 0 && s & 8 ? 8 : void 0);
    else {
      let i = P(e && (e.useClass || e.provide));
      if (Ml(e)) r = () => new i(...qt(e.deps));
      else return Re(i) || $t(i);
    }
    return r;
  }
  function xe(e) {
    if (e.destroyed) throw new g(-205, !1);
  }
  function ve(e, t, n = !1) {
    return { factory: e, value: t, multi: n ? [] : void 0 };
  }
  function Ml(e) {
    return !!e.deps;
  }
  function zl(e) {
    return e !== null && typeof e == 'object' && typeof e.ngOnDestroy == 'function';
  }
  function Bl(e) {
    return (
      typeof e == 'function' || (typeof e == 'object' && e.ngMetadataName === 'InjectionToken')
    );
  }
  function Kt(e, t) {
    for (let n of e) Array.isArray(n) ? Kt(n, t) : n && gi(n) ? Kt(n.ɵproviders, t) : t(n);
  }
  function Ni(e, t) {
    let n;
    e instanceof Rn ? (xe(e), (n = e)) : (n = new Dl(e));
    let r,
      i = G(n),
      s = O(void 0);
    try {
      return t();
    } finally {
      (G(i), O(s));
    }
  }
  function Ul() {
    return ki() !== void 0 || ai() != null;
  }
  function oe(e) {
    return Array.isArray(e) && typeof e[Vi] == 'object';
  }
  function Z(e) {
    return Array.isArray(e) && e[Vi] === !0;
  }
  function ji(e) {
    return (e.flags & 4) !== 0;
  }
  function wt(e) {
    return e.componentOffset > -1;
  }
  function Ri(e) {
    return (e.flags & 1) === 1;
  }
  function Me(e) {
    return !!e.template;
  }
  function st(e) {
    return (e[p] & 512) !== 0;
  }
  function Se(e) {
    return (e[p] & 256) === 256;
  }
  function D(e) {
    for (; Array.isArray(e); ) e = e[q];
    return e;
  }
  function X(e, t) {
    return D(t[e.index]);
  }
  function Gl(e, t) {
    return e.data[t];
  }
  function ce(e, t) {
    let n = t[e];
    return oe(n) ? n : n[q];
  }
  function Hn(e) {
    return (e[p] & 128) === 128;
  }
  function Wl(e) {
    return Z(e[x]);
  }
  function ot(e, t) {
    return t == null ? null : e[t];
  }
  function Hi(e) {
    e[ge] = 0;
  }
  function Pi(e) {
    e[p] & 1024 || ((e[p] |= 1024), Hn(e) && bt(e));
  }
  function lt(e) {
    return !!(e[p] & 9216 || e[V]?.dirty);
  }
  function Xt(e) {
    (e[J].changeDetectionScheduler?.notify(8), e[p] & 64 && (e[p] |= 1024), lt(e) && bt(e));
  }
  function bt(e) {
    e[J].changeDetectionScheduler?.notify(0);
    let t = de(e);
    for (; t !== null && !(t[p] & 8192 || ((t[p] |= 8192), !Hn(t))); ) t = de(t);
  }
  function Pn(e, t) {
    if (Se(e)) throw new g(911, !1);
    (e[$] === null && (e[$] = []), e[$].push(t));
  }
  function $l(e, t) {
    if (e[$] === null) return;
    let n = e[$].indexOf(t);
    n !== -1 && e[$].splice(n, 1);
  }
  function de(e) {
    let t = e[x];
    return Z(t) ? t[x] : t;
  }
  function Kl(e) {
    return (e[nt] ??= []);
  }
  function Jl(e) {
    return (e.cleanup ??= []);
  }
  function Xl() {
    return _.lFrame.elementDepthCount;
  }
  function Yl() {
    _.lFrame.elementDepthCount++;
  }
  function eu() {
    _.lFrame.elementDepthCount--;
  }
  function tu() {
    return _.skipHydrationRootTNode !== null;
  }
  function nu(e) {
    return _.skipHydrationRootTNode === e;
  }
  function ru() {
    _.skipHydrationRootTNode = null;
  }
  function Y() {
    return _.lFrame.lView;
  }
  function Fi() {
    return _.lFrame.tView;
  }
  function Ce() {
    let e = Li();
    for (; e !== null && e.type === 64; ) e = e.parent;
    return e;
  }
  function Li() {
    return _.lFrame.currentTNode;
  }
  function iu() {
    let e = _.lFrame,
      t = e.currentTNode;
    return e.isParent ? t : t.parent;
  }
  function _t(e, t) {
    let n = _.lFrame;
    ((n.currentTNode = e), (n.isParent = t));
  }
  function Mi() {
    return _.lFrame.isParent;
  }
  function su() {
    _.lFrame.isParent = !1;
  }
  function zi() {
    return Yt;
  }
  function Vr(e) {
    let t = Yt;
    return ((Yt = e), t);
  }
  function ou(e) {
    return (_.lFrame.bindingIndex = e);
  }
  function lu() {
    return _.lFrame.inI18n;
  }
  function uu(e, t) {
    let n = _.lFrame;
    ((n.bindingIndex = n.bindingRootIndex = e), en(t));
  }
  function au() {
    return _.lFrame.currentDirectiveIndex;
  }
  function en(e) {
    _.lFrame.currentDirectiveIndex = e;
  }
  function Bi(e) {
    _.lFrame.currentQueryIndex = e;
  }
  function cu(e) {
    let t = e[y];
    return t.type === 2 ? t.declTNode : t.type === 1 ? e[R] : null;
  }
  function Ui(e, t, n) {
    if (n & 4) {
      let i = t,
        s = e;
      for (
        ;
        ((i = i.parent), i === null && !(n & 1)) &&
        ((i = cu(s)), !(i === null || ((s = s[ke]), i.type & 10)));
      );
      if (i === null) return !1;
      ((t = i), (e = s));
    }
    let r = (_.lFrame = Zi());
    return ((r.currentTNode = t), (r.lView = e), !0);
  }
  function Fn(e) {
    let t = Zi(),
      n = e[y];
    ((_.lFrame = t),
      (t.currentTNode = n.firstChild),
      (t.lView = e),
      (t.tView = n),
      (t.contextLView = e),
      (t.bindingIndex = n.bindingStartIndex),
      (t.inI18n = !1));
  }
  function Zi() {
    let e = _.lFrame,
      t = e === null ? null : e.child;
    return t === null ? Qi(e) : t;
  }
  function Qi(e) {
    let t = {
      currentTNode: null,
      isParent: !0,
      lView: null,
      tView: null,
      selectedIndex: -1,
      contextLView: null,
      elementDepthCount: 0,
      currentNamespace: null,
      currentDirectiveIndex: -1,
      bindingRootIndex: -1,
      bindingIndex: -1,
      currentQueryIndex: 0,
      parent: e,
      child: null,
      inI18n: !1,
    };
    return (e !== null && (e.child = t), t);
  }
  function qi() {
    let e = _.lFrame;
    return ((_.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e);
  }
  function Ln() {
    let e = qi();
    ((e.isParent = !0),
      (e.tView = null),
      (e.selectedIndex = -1),
      (e.contextLView = null),
      (e.elementDepthCount = 0),
      (e.currentDirectiveIndex = -1),
      (e.currentNamespace = null),
      (e.bindingRootIndex = -1),
      (e.bindingIndex = -1),
      (e.currentQueryIndex = 0));
  }
  function du() {
    return _.lFrame.selectedIndex;
  }
  function fe(e) {
    _.lFrame.selectedIndex = e;
  }
  function Wi() {
    return _.lFrame.currentNamespace;
  }
  function Ki() {
    return $i;
  }
  function Ji(e) {
    $i = e;
  }
  function jr(e, t = null, n = null, r) {
    let i = fu(e, t, n, r);
    return (i.resolveInjectorInitializers(), i);
  }
  function fu(e, t = null, n = null, r, i = new Set()) {
    let s = [n || be, Vl(e)],
      o;
    return new Rn(s, t || jn(), o || null, i);
  }
  function pu() {
    return new hu(Y());
  }
  function ut(...e) {}
  function es(e) {
    let t, n;
    function r() {
      e = ut;
      try {
        (n !== void 0 && typeof cancelAnimationFrame == 'function' && cancelAnimationFrame(n),
          t !== void 0 && clearTimeout(t));
      } catch {}
    }
    return (
      (t = setTimeout(() => {
        (e(), r());
      })),
      typeof requestAnimationFrame == 'function' &&
        (n = requestAnimationFrame(() => {
          (e(), r());
        })),
      () => r()
    );
  }
  function mu(e) {
    return (
      queueMicrotask(() => e()),
      () => {
        e = ut;
      }
    );
  }
  function Bn(e) {
    if (e._nesting == 0 && !e.hasPendingMicrotasks && !e.isStable)
      try {
        (e._nesting++, e.onMicrotaskEmpty.emit(null));
      } finally {
        if ((e._nesting--, !e.hasPendingMicrotasks))
          try {
            e.runOutsideAngular(() => e.onStable.emit(null));
          } finally {
            e.isStable = !0;
          }
      }
  }
  function _u(e) {
    if (e.isCheckStableRunning || e.callbackScheduled) return;
    e.callbackScheduled = !0;
    function t() {
      es(() => {
        ((e.callbackScheduled = !1),
          nn(e),
          (e.isCheckStableRunning = !0),
          Bn(e),
          (e.isCheckStableRunning = !1));
      });
    }
    (e.scheduleInRootZone
      ? Zone.root.run(() => {
          t();
        })
      : e._outer.run(() => {
          t();
        }),
      nn(e));
  }
  function ku(e) {
    let t = () => {
        _u(e);
      },
      n = wu++;
    e._inner = e._inner.fork({
      name: 'angular',
      properties: { [zn]: !0, [at]: n, [at + n]: !0 },
      onInvokeTask: (r, i, s, o, l, u) => {
        if (Cu(u)) return r.invokeTask(s, o, l, u);
        try {
          return (Rr(e), r.invokeTask(s, o, l, u));
        } finally {
          (((e.shouldCoalesceEventChangeDetection && o.type === 'eventTask') ||
            e.shouldCoalesceRunChangeDetection) &&
            t(),
            Hr(e));
        }
      },
      onInvoke: (r, i, s, o, l, u, a) => {
        try {
          return (Rr(e), r.invoke(s, o, l, u, a));
        } finally {
          (e.shouldCoalesceRunChangeDetection && !e.callbackScheduled && !Eu(u) && t(), Hr(e));
        }
      },
      onHasTask: (r, i, s, o) => {
        (r.hasTask(s, o),
          i === s &&
            (o.change == 'microTask'
              ? ((e._hasPendingMicrotasks = o.microTask), nn(e), Bn(e))
              : o.change == 'macroTask' && (e.hasPendingMacrotasks = o.macroTask)));
      },
      onHandleError: (r, i, s, o) => (
        r.handleError(s, o),
        e.runOutsideAngular(() => e.onError.emit(o)),
        !1
      ),
    });
  }
  function nn(e) {
    e._hasPendingMicrotasks ||
    ((e.shouldCoalesceEventChangeDetection || e.shouldCoalesceRunChangeDetection) &&
      e.callbackScheduled === !0)
      ? (e.hasPendingMicrotasks = !0)
      : (e.hasPendingMicrotasks = !1);
  }
  function Rr(e) {
    (e._nesting++, e.isStable && ((e.isStable = !1), e.onUnstable.emit(null)));
  }
  function Hr(e) {
    (e._nesting--, Bn(e));
  }
  function Cu(e) {
    return ts(e, '__ignore_ng_zone__');
  }
  function Eu(e) {
    return ts(e, '__scheduler_tick__');
  }
  function ts(e, t) {
    return !Array.isArray(e) || e.length !== 1 ? !1 : e[0]?.data?.[t] === !0;
  }
  function Iu(e) {
    return xu(e) ? e : new Tu(e);
  }
  function xu(e) {
    return (
      e instanceof Error ||
      (typeof e == 'object' &&
        e !== null &&
        typeof e.name == 'string' &&
        typeof e.message == 'string')
    );
  }
  function ju(e) {
    return { toString: e }.toString();
  }
  function Ru(e, t, n, r) {
    t !== null ? t.applyValueToInputSignal(t, r) : (e[n] = r);
  }
  function Pu() {
    return Hu;
  }
  function Fu(e, t, n) {
    let { ngOnChanges: r, ngOnInit: i, ngDoCheck: s } = t.type.prototype;
    if (r) {
      let o = Pu()(t);
      ((n.preOrderHooks ??= []).push(e, o), (n.preOrderCheckHooks ??= []).push(e, o));
    }
    (i && (n.preOrderHooks ??= []).push(0 - e, i),
      s && ((n.preOrderHooks ??= []).push(e, s), (n.preOrderCheckHooks ??= []).push(e, s)));
  }
  function Lu(e, t) {
    for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
      let i = e.data[n].type.prototype,
        {
          ngAfterContentInit: s,
          ngAfterContentChecked: o,
          ngAfterViewInit: l,
          ngAfterViewChecked: u,
          ngOnDestroy: a,
        } = i;
      (s && (e.contentHooks ??= []).push(-n, s),
        o && ((e.contentHooks ??= []).push(n, o), (e.contentCheckHooks ??= []).push(n, o)),
        l && (e.viewHooks ??= []).push(-n, l),
        u && ((e.viewHooks ??= []).push(n, u), (e.viewCheckHooks ??= []).push(n, u)),
        a != null && (e.destroyHooks ??= []).push(n, a));
    }
  }
  function $e(e, t, n) {
    rs(e, t, 3, n);
  }
  function Ke(e, t, n, r) {
    (e[p] & 3) === n && rs(e, t, n, r);
  }
  function Rt(e, t) {
    let n = e[p];
    (n & 3) === t && ((n &= 16383), (n += 1), (e[p] = n));
  }
  function rs(e, t, n, r) {
    let i = r !== void 0 ? e[ge] & 65535 : 0,
      s = r ?? -1,
      o = t.length - 1,
      l = 0;
    for (let u = i; u < o; u++)
      if (typeof t[u + 1] == 'number') {
        if (((l = t[u]), r != null && l >= r)) break;
      } else
        (t[u] < 0 && (e[ge] += 65536),
          (l < s || s == -1) && (Mu(e, n, t, u), (e[ge] = (e[ge] & 4294901760) + u + 2)),
          u++);
  }
  function Fr(e, t) {
    w(m.LifecycleHookStart, e, t);
    let n = v(null);
    try {
      t.call(e);
    } finally {
      (v(n), w(m.LifecycleHookEnd, e, t));
    }
  }
  function Mu(e, t, n, r) {
    let i = n[r] < 0,
      s = n[r + 1],
      o = i ? -n[r] : n[r],
      l = e[o];
    i ? e[p] >> 14 < e[ge] >> 16 && (e[p] & 3) === t && ((e[p] += 16384), Fr(l, s)) : Fr(l, s);
  }
  function zu(e, t, n) {
    let r = 0;
    for (; r < n.length; ) {
      let i = n[r];
      if (typeof i == 'number') {
        if (i !== 0) break;
        r++;
        let s = n[r++],
          o = n[r++],
          l = n[r++];
        e.setAttribute(t, o, l, s);
      } else {
        let s = i,
          o = n[++r];
        (Bu(s) ? e.setProperty(t, s, o) : e.setAttribute(t, s, o), r++);
      }
    }
    return r;
  }
  function Bu(e) {
    return e.charCodeAt(0) === 64;
  }
  function $n(e, t) {
    if (!(t === null || t.length === 0))
      if (e === null || e.length === 0) e = t.slice();
      else {
        let n = -1;
        for (let r = 0; r < t.length; r++) {
          let i = t[r];
          typeof i == 'number'
            ? (n = i)
            : n === 0 ||
              (n === -1 || n === 2 ? Lr(e, n, i, null, t[++r]) : Lr(e, n, i, null, null));
        }
      }
    return e;
  }
  function Lr(e, t, n, r, i) {
    let s = 0,
      o = e.length;
    if (t === -1) o = -1;
    else
      for (; s < e.length; ) {
        let l = e[s++];
        if (typeof l == 'number') {
          if (l === t) {
            o = -1;
            break;
          } else if (l > t) {
            o = s - 1;
            break;
          }
        }
      }
    for (; s < e.length; ) {
      let l = e[s];
      if (typeof l == 'number') break;
      if (l === n) {
        i !== null && (e[s + 1] = i);
        return;
      }
      (s++, i !== null && s++);
    }
    (o !== -1 && (e.splice(o, 0, t), (s = o + 1)),
      e.splice(s++, 0, n),
      i !== null && e.splice(s++, 0, i));
  }
  function is(e) {
    return e !== we;
  }
  function ct(e) {
    return e & 32767;
  }
  function Uu(e) {
    return e >> 16;
  }
  function dt(e, t) {
    let n = Uu(e),
      r = t;
    for (; n > 0; ) ((r = r[ke]), n--);
    return r;
  }
  function Mr(e) {
    let t = rn;
    return ((rn = e), t);
  }
  function qu(e, t, n) {
    let r;
    (typeof n == 'string' ? (r = n.charCodeAt(0) || 0) : Object.hasOwn(n, De) && (r = n[De]),
      r == null && (r = n[De] = Qu++));
    let i = r & ss,
      s = 1 << i;
    t.data[e + (i >> os)] |= s;
  }
  function ls(e, t) {
    let n = us(e, t);
    if (n !== -1) return n;
    let r = t[y];
    r.firstCreatePass &&
      ((e.injectorIndex = t.length), Ht(r.data, e), Ht(t, null), Ht(r.blueprint, null));
    let i = Kn(e, t),
      s = e.injectorIndex;
    if (is(i)) {
      let o = ct(i),
        l = dt(i, t),
        u = l[y].data;
      for (let a = 0; a < 8; a++) t[s + a] = l[o + a] | u[o + a];
    }
    return ((t[s + 8] = i), s);
  }
  function Ht(e, t) {
    e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
  }
  function us(e, t) {
    return e.injectorIndex === -1 ||
      (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
      t[e.injectorIndex + 8] === null
      ? -1
      : e.injectorIndex;
  }
  function Kn(e, t) {
    if (e.parent && e.parent.injectorIndex !== -1) return e.parent.injectorIndex;
    let n = 0,
      r = null,
      i = t;
    for (; i !== null; ) {
      if (((r = hs(i)), r === null)) return we;
      if ((n++, (i = i[ke]), r.injectorIndex !== -1)) return r.injectorIndex | (n << 16);
    }
    return we;
  }
  function Gu(e, t, n) {
    qu(e, t, n);
  }
  function as(e, t, n) {
    if (n & 8 || e !== void 0) return e;
    Dn(t, 'NodeInjector');
  }
  function cs(e, t, n, r) {
    if ((n & 8 && r === void 0 && (r = null), (n & 3) === 0)) {
      let i = e[ae],
        s = O(void 0);
      try {
        return i ? i.get(t, r, n & 8) : Si(t, r, n & 8);
      } finally {
        O(s);
      }
    }
    return as(r, t, n);
  }
  function ds(e, t, n, r = 0, i) {
    if (e !== null) {
      if (t[p] & 2048 && !(r & 2)) {
        let o = Xu(e, t, n, r, M);
        if (o !== M) return o;
      }
      let s = fs(e, t, n, r, M);
      if (s !== M) return s;
    }
    return cs(t, n, r, i);
  }
  function fs(e, t, n, r, i) {
    let s = Ku(n);
    if (typeof s == 'function') {
      if (!Ui(t, e, r)) return r & 1 ? as(i, n, r) : cs(t, n, r, i);
      try {
        let o;
        if (((o = s(r)), o == null && !(r & 8))) Dn(n);
        else return o;
      } finally {
        Gi();
      }
    } else if (typeof s == 'number') {
      let o = null,
        l = us(e, t),
        u = we,
        a = r & 1 ? t[B][R] : null;
      for (
        (l === -1 || r & 4) &&
        ((u = l === -1 ? Kn(e, t) : t[l + 8]),
        u === we || !Br(r, !1) ? (l = -1) : ((o = t[y]), (l = ct(u)), (t = dt(u, t))));
        l !== -1;
      ) {
        let c = t[y];
        if (zr(s, l, c.data)) {
          let d = Wu(l, t, n, o, r, a);
          if (d !== M) return d;
        }
        ((u = t[l + 8]),
          u !== we && Br(r, t[y].data[l + 8] === a) && zr(s, l, t)
            ? ((o = c), (l = ct(u)), (t = dt(u, t)))
            : (l = -1));
      }
    }
    return i;
  }
  function Wu(e, t, n, r, i, s) {
    let o = t[y],
      l = o.data[e + 8],
      u = r == null ? wt(l) && rn : r != o && (l.type & 3) !== 0,
      a = i & 1 && s === l,
      c = $u(l, o, n, u, a);
    return c !== null ? sn(t, o, c, l, i) : M;
  }
  function $u(e, t, n, r, i) {
    let s = e.providerIndexes,
      o = t.data,
      l = s & 1048575,
      u = e.directiveStart,
      a = e.directiveEnd,
      c = s >> 20,
      d = r ? l : l + c,
      h = i ? l + c : a;
    for (let f = d; f < h; f++) {
      let E = o[f];
      if ((f < u && n === E) || (f >= u && E.type === n)) return f;
    }
    if (i) {
      let f = o[u];
      if (f && Me(f) && f.type === n) return u;
    }
    return null;
  }
  function sn(e, t, n, r, i) {
    let s = e[n],
      o = t.data;
    if (s instanceof Wn) {
      let l = s;
      if (l.resolving) throw bi('');
      let u = Mr(l.canSeeViewProviders);
      l.resolving = !0;
      let a = o[n].type || o[n],
        c,
        d = l.injectImpl ? O(l.injectImpl) : null,
        h = Ui(e, r, 0);
      try {
        ((s = e[n] = l.factory(void 0, i, o, e, r)),
          t.firstCreatePass && n >= r.directiveStart && Fu(n, o[n], t));
      } finally {
        (d !== null && O(d), Mr(u), (l.resolving = !1), Gi());
      }
    }
    return s;
  }
  function Ku(e) {
    if (typeof e == 'string') return e.charCodeAt(0) || 0;
    let t = Object.hasOwn(e, De) ? e[De] : void 0;
    return typeof t == 'number' ? (t >= 0 ? t & ss : Ju) : t;
  }
  function zr(e, t, n) {
    let r = 1 << e;
    return !!(n[t + (e >> os)] & r);
  }
  function Br(e, t) {
    return !(e & 2) && !(e & 1 && t);
  }
  function Ju() {
    return new Ne(Ce(), Y());
  }
  function Xu(e, t, n, r, i) {
    let s = e,
      o = t;
    for (; s !== null && o !== null && o[p] & 2048 && !st(o); ) {
      let l = fs(s, o, n, r | 2, M);
      if (l !== M) return l;
      r &= -5;
      let u = s.parent;
      if (!u) {
        let a = o[Oi];
        if (a) {
          let c = a.get(n, M, r);
          if (c !== M) return c;
        }
        ((u = hs(o)), (o = o[ke]));
      }
      s = u;
    }
    return i;
  }
  function hs(e) {
    let t = e[y],
      n = t.type;
    return n === 2 ? t.declTNode : n === 1 ? e[R] : null;
  }
  function Jn(e) {
    return {
      token: e.token,
      providedIn: e.autoProvided === !1 ? null : 'root',
      factory: e.factory,
      value: void 0,
    };
  }
  function Yu() {
    return Xn(Ce(), Y());
  }
  function Xn(e, t) {
    return new ea(X(e, t));
  }
  function ps(e) {
    return (e.flags & 128) === 128;
  }
  function na() {
    return ta++;
  }
  function ra(e) {
    vs.set(e[mt], e);
  }
  function on(e) {
    vs.delete(e[mt]);
  }
  function Fe(e, t) {
    oe(t) ? ((e[Ur] = t[mt]), ra(t)) : (e[Ur] = t);
  }
  function gs(e) {
    return ws(e[He]);
  }
  function ms(e) {
    return ws(e[F]);
  }
  function ws(e) {
    for (; e !== null && !Z(e); ) e = e[F];
    return e;
  }
  function bs(e) {
    ln = e;
  }
  function ia() {
    if (ln !== void 0) return ln;
    if (typeof document < 'u') return document;
    throw new g(210, !1);
  }
  function oa(e, t) {
    if (e == null || typeof e != 'object') return;
    let n = Zr.get(e);
    (n || ((n = new WeakSet()), Zr.set(e, n)), n.add(t));
  }
  function ua(e, t, n, r) {
    la(e, t, n, r);
  }
  function ks(e) {
    return (e.flags & 32) === 32;
  }
  function Ss(e, t, n = !1) {
    return aa(e, t, n);
  }
  function Cs(e, t) {
    let n = e.contentQueries;
    if (n !== null) {
      let r = v(null);
      try {
        for (let i = 0; i < n.length; i += 2) {
          let s = n[i],
            o = n[i + 1];
          if (o !== -1) {
            let l = e.data[o];
            (Bi(s), l.contentQueries(2, t[o], o));
          }
        }
      } finally {
        v(r);
      }
    }
  }
  function un(e, t, n) {
    Bi(0);
    let r = v(null);
    try {
      t(e, n);
    } finally {
      v(r);
    }
  }
  function ca(e, t, n) {
    if (ji(t)) {
      let r = v(null);
      try {
        let i = t.directiveStart,
          s = t.directiveEnd;
        for (let o = i; o < s; o++) {
          let l = e.data[o];
          if (l.contentQueries) {
            let u = n[o];
            l.contentQueries(1, u, o);
          }
        }
      } finally {
        v(r);
      }
    }
  }
  function da(e, t) {
    return e.createText(t);
  }
  function Es(e, t, n) {
    return e.createElement(t, n);
  }
  function le(e, t, n, r, i) {
    e.insertBefore(t, n, r, i);
  }
  function Is(e, t, n) {
    e.appendChild(t, n);
  }
  function Qr(e, t, n, r, i) {
    r !== null ? le(e, t, n, r, i) : Is(e, t, n);
  }
  function fa(e, t, n, r) {
    e.removeChild(null, t, n, r);
  }
  function ha(e, t, n) {
    e.setAttribute(t, 'style', n);
  }
  function pa(e, t, n) {
    n === '' ? e.removeAttribute(t, 'class') : e.setAttribute(t, 'class', n);
  }
  function xs(e, t, n) {
    let { mergedAttrs: r, classes: i, styles: s } = n;
    (r !== null && zu(e, t, r), i !== null && pa(e, t, i), s !== null && ha(e, t, s));
  }
  function va(e) {
    return e.type === 4 && e.value !== ya;
  }
  function an(e) {
    return (e & 1) === 0;
  }
  function qr(e, t) {
    return e ? ':not(' + t.trim() + ')' : t;
  }
  function ga(e) {
    let t = e[0],
      n = 1,
      r = 2,
      i = '',
      s = !1;
    for (; n < e.length; ) {
      let o = e[n];
      if (typeof o == 'string')
        if (r & 2) {
          let l = e[++n];
          i += '[' + o + (l.length > 0 ? '="' + l + '"' : '') + ']';
        } else r & 8 ? (i += '.' + o) : r & 4 && (i += ' ' + o);
      else (i !== '' && !an(o) && ((t += qr(s, i)), (i = '')), (r = o), (s = s || !an(r)));
      n++;
    }
    return (i !== '' && (t += qr(s, i)), t);
  }
  function ma(e) {
    return e.map(ga).join(',');
  }
  function wa(e) {
    let t = [],
      n = [],
      r = 1,
      i = 2;
    for (; r < e.length; ) {
      let s = e[r];
      if (typeof s == 'string') i === 2 ? s !== '' && t.push(s, e[++r]) : i === 8 && n.push(s);
      else {
        if (!an(i)) break;
        i = s;
      }
      r++;
    }
    return (n.length && t.push(1, ...n), t);
  }
  function Yn(e, t) {
    return ba(e, t);
  }
  function As(e) {
    return e ? (e[ke] ?? e) : null;
  }
  function _a(e, t, n) {
    let r = cn.get(e);
    if (!r || r.length === 0) return;
    let i = t.parentNode,
      s = t.previousSibling,
      o = As(n);
    for (let l = r.length - 1; l >= 0; l--) {
      let { el: u, declarationView: a } = r[l],
        c = u.parentNode;
      u === t
        ? (r.splice(l, 1),
          ye.add(u),
          u.dispatchEvent(new CustomEvent('animationend', { detail: { cancel: !0 } })))
        : s && u === s
          ? (r.splice(l, 1),
            u.dispatchEvent(new CustomEvent('animationend', { detail: { cancel: !0 } })),
            u.parentNode?.removeChild(u))
          : c &&
            i &&
            c !== i &&
            (o === null || a === null || o === a) &&
            (r.splice(l, 1),
            u.dispatchEvent(new CustomEvent('animationend', { detail: { cancel: !0 } })),
            u.parentNode?.removeChild(u));
    }
  }
  function ka(e, t, n) {
    let r = As(n),
      i = cn.get(e);
    i
      ? i.some((s) => s.el === t) || i.push({ el: t, declarationView: r })
      : cn.set(e, [{ el: t, declarationView: r }]);
  }
  function Sa(e) {
    Gr.has(e) || (Gr.add(e), performance?.mark?.('mark_feature_usage', { detail: { feature: e } }));
  }
  function Wr(e, t, n, r) {
    dn?.maybeQueueEnterAnimation(e, t, n, r);
  }
  function $r(e, t, n, r) {
    dn === null ? r(!1) : dn.runLeaveAnimationsWithCallback(e, t, n, r);
  }
  function me(e, t, n, r, i, s, o, l) {
    if (i != null) {
      let u,
        a = !1;
      Z(i) ? (u = i) : oe(i) && ((a = !0), (i = i[q]));
      let c = D(i);
      (e === 0 && r !== null
        ? (Wr(l, r, s, n), o == null ? Is(t, r, c) : le(t, r, c, o || null, !0))
        : e === 1 && r !== null
          ? (le(t, r, c, o || null, !0), _a(s, c, l), ye.has(c) || Wr(l, r, s, n))
          : e === 2
            ? (l?.[Zl]?.leave?.has(s.index) && ka(s, c, l),
              ye.delete(c),
              $r(l, s, n, (d) => {
                if (ye.has(c)) {
                  ye.delete(c);
                  return;
                }
                fa(t, c, a, d);
              }))
            : e === 3 &&
              (ye.delete(c),
              $r(l, s, n, () => {
                t.destroyNode(c);
              })),
        u != null && Pa(t, e, n, u, s, r, o));
    }
  }
  function Ea(e, t) {
    (Os(e, t), (t[q] = null), (t[R] = null));
  }
  function Ia(e, t, n, r, i, s) {
    ((r[q] = i), (r[R] = t), Ct(e, r, n, 1, i, s));
  }
  function Os(e, t) {
    (t[J].changeDetectionScheduler?.notify(9), Ct(e, t, t[H], 2, null, null));
  }
  function xa(e) {
    let t = e[He];
    if (!t) return Pt(e[y], e);
    for (; t; ) {
      let n = null;
      if (oe(t)) n = t[He];
      else {
        let r = t[j];
        r && (n = r);
      }
      if (!n) {
        for (; t && !t[F] && t !== e; ) (oe(t) && Pt(t[y], t), (t = t[x]));
        (t === null && (t = e), oe(t) && Pt(t[y], t), (n = t && t[F]));
      }
      t = n;
    }
  }
  function er(e, t) {
    let n = e[it],
      r = n.indexOf(t);
    n.splice(r, 1);
  }
  function Vs(e, t) {
    if (Se(t)) return;
    let n = t[H];
    (n.destroyNode && Ct(e, t, n, 3, null, null), xa(t));
  }
  function Pt(e, t) {
    if (Se(t)) return;
    let n = v(null);
    try {
      ((t[p] &= -129),
        (t[p] |= 256),
        t[V] && ui(t[V]),
        Da(e, t),
        Ta(e, t),
        t[y].type === 1 && t[H].destroy());
      let r = t[Pe];
      if (r !== null && Z(t[x])) {
        r !== t[x] && er(r, t);
        let i = t[gt];
        i !== null && i.detachView(e);
      }
      on(t);
    } finally {
      v(n);
    }
  }
  function Ta(e, t) {
    let n = e.cleanup,
      r = t[nt];
    if (n !== null)
      for (let o = 0; o < n.length - 1; o += 2)
        if (typeof n[o] == 'string') {
          let l = n[o + 3];
          (l >= 0 ? r[l]() : r[-l].unsubscribe(), (o += 2));
        } else {
          let l = r[n[o + 1]];
          n[o].call(l);
        }
    r !== null && (t[nt] = null);
    let i = t[$];
    if (i !== null) {
      t[$] = null;
      for (let o = 0; o < i.length; o++) {
        let l = i[o];
        l();
      }
    }
    let s = t[Ae];
    if (s !== null) {
      t[Ae] = null;
      for (let o of s) o.destroy();
    }
  }
  function Da(e, t) {
    let n;
    if (e != null && (n = e.destroyHooks) != null)
      for (let r = 0; r < n.length; r += 2) {
        let i = t[n[r]];
        if (!(i instanceof Wn)) {
          let s = n[r + 1];
          if (Array.isArray(s))
            for (let o = 0; o < s.length; o += 2) {
              let l = i[s[o]],
                u = s[o + 1];
              w(m.LifecycleHookStart, l, u);
              try {
                u.call(l);
              } finally {
                w(m.LifecycleHookEnd, l, u);
              }
            }
          else {
            w(m.LifecycleHookStart, i, s);
            try {
              s.call(i);
            } finally {
              w(m.LifecycleHookEnd, i, s);
            }
          }
        }
      }
  }
  function Aa(e, t, n) {
    if (t === null) throw new g(510, !1);
    return Na(e, t.parent, n);
  }
  function Na(e, t, n) {
    let r = t;
    for (; r !== null && r.type & 168; ) ((t = r), (r = t.parent));
    if (r === null) return n[q];
    if (wt(r)) {
      let { encapsulation: i } = e.data[r.directiveStart + r.componentOffset];
      if (i === U.None || i === U.Emulated) return null;
    }
    return X(r, n);
  }
  function Oa(e, t, n) {
    return ja(e, t, n);
  }
  function Va(e, t, n) {
    return e.type & 40 ? X(e, n) : null;
  }
  function js(e, t, n, r) {
    let i = Aa(e, r, t),
      s = t[H],
      o = r.parent || t[R],
      l = Oa(o, r, t);
    if (i != null)
      if (Array.isArray(n)) for (let u = 0; u < n.length; u++) Qr(s, i, n[u], l, !1);
      else Qr(s, i, n, l, !1);
    Kr !== void 0 && Kr(s, r, t, n, i);
  }
  function Te(e, t) {
    if (t !== null) {
      let n = t.type;
      if (n & 3) return X(t, e);
      if (n & 4) return fn(-1, e[t.index]);
      if (n & 8) {
        let r = t.child;
        if (r !== null) return Te(e, r);
        {
          let i = e[t.index];
          return Z(i) ? fn(-1, i) : D(i);
        }
      } else {
        if (n & 128) return Te(e, t.next);
        if (n & 32) return Yn(t, e)() || D(e[t.index]);
        {
          let r = Rs(e, t);
          if (r !== null) {
            if (Array.isArray(r)) return r[0];
            let i = de(e[B]);
            return Te(i, r);
          } else return Te(e, t.next);
        }
      }
    }
    return null;
  }
  function Rs(e, t) {
    if (t !== null) {
      let n = e[B][R],
        r = t.projection;
      return n.projection[r];
    }
    return null;
  }
  function fn(e, t) {
    let n = j + e + 1;
    if (n < t.length) {
      let r = t[n],
        i = r[y].firstChild;
      if (i !== null) return Te(r, i);
    }
    return t[_e];
  }
  function tr(e, t, n, r, i, s, o) {
    for (; n != null; ) {
      let l = r[ae];
      if (n.type === 128) {
        n = n.next;
        continue;
      }
      let u = r[n.index],
        a = n.type;
      if ((o && t === 0 && (u && Fe(D(u), r), (n.flags |= 2)), !ks(n)))
        if (a & 8) (tr(e, t, n.child, r, i, s, !1), me(t, e, l, i, u, n, s, r));
        else if (a & 32) {
          let c = Yn(n, r),
            d;
          for (; (d = c()); ) me(t, e, l, i, d, n, s, r);
          me(t, e, l, i, u, n, s, r);
        } else a & 16 ? Ha(e, t, r, n, i, s) : me(t, e, l, i, u, n, s, r);
      n = o ? n.projectionNext : n.next;
    }
  }
  function Ct(e, t, n, r, i, s) {
    e.type === 3 ? Ra(n, r, t, i, s) : tr(n, r, e.firstChild, t, i, s, !1);
  }
  function Ra(e, t, n, r, i) {
    let s = n[y].firstChild,
      o = s.next,
      l = D(n[s.index]),
      u = D(n[o.index]),
      a = o.index + 1,
      c = n[a];
    if (t === 1 || t === 0)
      r !== null &&
        (c && c.hasChildNodes() ? le(e, r, c, i, !0) : (le(e, r, l, i, !0), le(e, r, u, i, !0)));
    else if (t === 2) {
      if ((c || ((c = document.createDocumentFragment()), (n[a] = c)), l && l.parentNode === c))
        return;
      let d = l;
      for (; d !== null; ) {
        let h = d.nextSibling;
        if ((c.appendChild(d), d === u)) break;
        d = h;
      }
    }
  }
  function Ha(e, t, n, r, i, s) {
    let o = n[B],
      l = o[R].projection[r.projection];
    if (Array.isArray(l))
      for (let u = 0; u < l.length; u++) {
        let a = l[u];
        me(t, e, n[ae], i, a, r, s, n);
      }
    else {
      let u = l,
        a = o[x];
      (ps(r) && (u.flags |= 128), tr(e, t, u, a, i, s, !0));
    }
  }
  function Pa(e, t, n, r, i, s, o) {
    let l = r[_e],
      u = D(r);
    if ((l !== u && me(t, e, n, s, l, i, o), (r[p] & 4) === 0))
      for (let a = j; a < r.length; a++) {
        let c = r[a];
        Ct(c[y], c, e, t, s, l);
      }
  }
  function Hs(e, t, n, r, i, s, o, l, u, a, c) {
    let d = Q + r,
      h = d + i,
      f = Fa(d, h),
      E = typeof a == 'function' ? a() : a;
    return (f[y] = {
      type: e,
      blueprint: f,
      template: n,
      queries: null,
      viewQuery: l,
      declTNode: t,
      data: f.slice().fill(null, d),
      bindingStartIndex: d,
      expandoStartIndex: h,
      hostBindingOpCodes: null,
      firstCreatePass: !0,
      firstUpdatePass: !0,
      staticViewQueries: !1,
      staticContentQueries: !1,
      preOrderHooks: null,
      preOrderCheckHooks: null,
      contentHooks: null,
      contentCheckHooks: null,
      viewHooks: null,
      viewCheckHooks: null,
      destroyHooks: null,
      cleanup: null,
      contentQueries: null,
      components: null,
      directiveRegistry: typeof s == 'function' ? s() : s,
      pipeRegistry: typeof o == 'function' ? o() : o,
      firstChild: null,
      schemas: u,
      consts: E,
      incompleteFirstPass: !1,
      ssrId: c,
    });
  }
  function Fa(e, t) {
    let n = [];
    for (let r = 0; r < t; r++) n.push(r < e ? null : Ts);
    return n;
  }
  function La(e) {
    let t = e.tView;
    return t === null || t.incompleteFirstPass
      ? (e.tView = Hs(
          1,
          null,
          e.template,
          e.decls,
          e.vars,
          e.directiveDefs,
          e.pipeDefs,
          e.viewQuery,
          e.schemas,
          e.consts,
          e.id,
        ))
      : t;
  }
  function Ps(e, t, n, r, i, s, o, l, u, a, c) {
    let d = t.blueprint.slice();
    return (
      (d[q] = i),
      (d[p] = r | 4 | 128 | 8 | 64 | 1024),
      (a !== null || (e && e[p] & 2048)) && (d[p] |= 2048),
      Hi(d),
      (d[x] = d[ke] = e),
      (d[A] = n),
      (d[J] = o || (e && e[J])),
      (d[H] = l || (e && e[H])),
      (d[ae] = u || (e && e[ae]) || null),
      (d[R] = s),
      (d[mt] = na()),
      (d[tt] = c),
      (d[Oi] = a),
      (d[B] = t.type == 2 ? e[B] : d),
      d
    );
  }
  function Ma(e, t, n) {
    let r = X(t, e),
      i = La(n),
      s = e[J].rendererFactory,
      o = Ms(e, Ps(e, i, null, Fs(n), r, t, null, s.createRenderer(r, n), null, null, null));
    return (e[t.index] = o);
  }
  function Fs(e) {
    let t = 16;
    return (e.signals ? (t = 4096) : e.onPush && (t = 64), t);
  }
  function Ls(e, t, n, r) {
    if (n === 0) return -1;
    let i = t.length;
    for (let s = 0; s < n; s++) (t.push(r), e.blueprint.push(r), e.data.push(null));
    return i;
  }
  function Ms(e, t) {
    return (e[He] ? (e[Or][F] = t) : (e[He] = t), (e[Or] = t), t);
  }
  function za(e, t, n, r) {
    if (!r)
      if ((t[p] & 3) === 3) {
        let i = e.preOrderCheckHooks;
        i !== null && $e(t, i, n);
      } else {
        let i = e.preOrderHooks;
        i !== null && Ke(t, i, 0, n);
      }
    fe(n);
  }
  function hn(e, t, n, r) {
    let i = v(null);
    try {
      let [s, o, l] = e.inputs[n],
        u = null;
      ((o & Et.SignalBased) !== 0 && (u = t[s][qe]),
        u !== null && u.transformFn !== void 0
          ? (r = u.transformFn(r))
          : l !== null && (r = l.call(t, r)),
        e.setInput !== null ? e.setInput(t, u, r, n, s) : Ru(t, u, s, r));
    } finally {
      v(i);
    }
  }
  function zs(e, t, n, r, i) {
    let s = du(),
      o = r & 2;
    try {
      (fe(-1), o && t.length > Q && za(e, t, Q, !1));
      let l = o ? m.TemplateUpdateStart : m.TemplateCreateStart;
      (w(l, i, n), n(r, i));
    } finally {
      fe(s);
      let l = o ? m.TemplateUpdateEnd : m.TemplateCreateEnd;
      w(l, i, n);
    }
  }
  function Ba(e, t, n) {
    (Ga(e, t, n), (n.flags & 64) === 64 && Wa(e, t, n));
  }
  function Ua(e, t, n = X) {
    let r = t.localNames;
    if (r !== null) {
      let i = t.index + 1;
      for (let s = 0; s < r.length; s += 2) {
        let o = r[s + 1],
          l = o === -1 ? n(t, e) : e[o];
        e[i++] = l;
      }
    }
  }
  function Za(e, t, n, r) {
    let i = r.get(sa, _s) || n === U.ShadowDom || n === U.ExperimentalIsolatedShadowDom,
      s = e.selectRootElement(t, i);
    return (Qa(s), s);
  }
  function Qa(e) {
    qa(e);
  }
  function Ga(e, t, n) {
    let r = n.directiveStart,
      i = n.directiveEnd;
    (wt(n) && Ma(t, n, e.data[r + n.componentOffset]), e.firstCreatePass || ls(n, t));
    let s = n.initialInputs;
    for (let o = r; o < i; o++) {
      let l = e.data[o],
        u = sn(t, e, o, n);
      if ((Fe(u, t), s !== null && Ka(t, o - r, u, l, n, s), Me(l))) {
        let a = ce(n.index, t);
        a[A] = sn(t, e, o, n);
      }
    }
  }
  function Wa(e, t, n) {
    let r = n.directiveStart,
      i = n.directiveEnd,
      s = n.index,
      o = au();
    try {
      fe(s);
      for (let l = r; l < i; l++) {
        let u = e.data[l],
          a = t[l];
        (en(l), (u.hostBindings !== null || u.hostVars !== 0 || u.hostAttrs !== null) && $a(u, a));
      }
    } finally {
      (fe(-1), en(o));
    }
  }
  function $a(e, t) {
    e.hostBindings !== null && e.hostBindings(1, t);
  }
  function Ka(e, t, n, r, i, s) {
    let o = s[t];
    if (o !== null)
      for (let l = 0; l < o.length; l += 2) {
        let u = o[l],
          a = o[l + 1];
        hn(r, n, u, a);
      }
  }
  function Ja(e, t, n, r, i) {
    let s = Q + n,
      o = t[y],
      l = i(o, t, e, r, n);
    ((t[s] = l), _t(e, !0));
    let u = e.type === 2;
    return (
      u ? (xs(t[H], l, e), (Xl() === 0 || Ri(e)) && Fe(l, t), Yl()) : Fe(l, t),
      Ki() && (!u || !ks(e)) && js(o, t, l, e),
      e
    );
  }
  function Xa(e) {
    let t = e;
    return (Mi() ? su() : ((t = t.parent), _t(t, !1)), t);
  }
  function Ya(e, t) {
    let n = e[ae];
    if (!n) return;
    let r;
    try {
      r = n.get(St, null);
    } catch {
      r = null;
    }
    r?.(t);
  }
  function ec(e, t, n, r, i) {
    let s = e.inputs?.[r],
      o = e.hostDirectiveInputs?.[r],
      l = !1;
    if (o)
      for (let u = 0; u < o.length; u += 2) {
        let a = o[u],
          c = o[u + 1],
          d = t.data[a];
        (hn(d, n[a], c, i), (l = !0));
      }
    if (s)
      for (let u of s) {
        let a = n[u],
          c = t.data[u];
        (hn(c, a, r, i), (l = !0));
      }
    return l;
  }
  function tc(e, t) {
    let n = ce(t, e),
      r = n[y];
    nc(r, n);
    let i = n[q];
    (i !== null && n[tt] === null && (n[tt] = Ss(i, n[ae])), w(m.ComponentStart));
    try {
      Bs(r, n, n[A]);
    } finally {
      w(m.ComponentEnd, n[A]);
    }
  }
  function nc(e, t) {
    for (let n = t.length; n < e.blueprint.length; n++) t.push(e.blueprint[n]);
  }
  function Bs(e, t, n) {
    Fn(t);
    try {
      let r = e.viewQuery;
      r !== null && un(1, r, n);
      let i = e.template;
      (i !== null && zs(e, t, i, 1, n),
        e.firstCreatePass && (e.firstCreatePass = !1),
        t[gt]?.finishViewCreation(e),
        e.staticContentQueries && Cs(e, t),
        e.staticViewQueries && un(2, e.viewQuery, n));
      let s = e.components;
      s !== null && rc(t, s);
    } catch (r) {
      throw (e.firstCreatePass && ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)), r);
    } finally {
      ((t[p] &= -5), Ln());
    }
  }
  function rc(e, t) {
    for (let n = 0; n < t.length; n++) tc(e, t[n]);
  }
  function Jr(e, t) {
    return !t || t.firstChild === null || ps(e);
  }
  function ft(e, t, n, r, i = !1) {
    if (e.type === 3) {
      let s = e.firstChild,
        o = s.next,
        l = D(t[s.index]),
        u = D(t[o.index]),
        a = l;
      for (; a !== null && (r.push(a), a !== u); ) a = a.nextSibling;
      return r;
    }
    for (; n !== null; ) {
      if (n.type === 128) {
        n = i ? n.projectionNext : n.next;
        continue;
      }
      let s = t[n.index];
      if (s !== null)
        if (Z(s)) {
          let l = s[_e];
          (l !== s[q] && r.push(D(s)), s[p] & 4 || ic(s, r), r.push(l));
        } else r.push(D(s));
      let o = n.type;
      if (o & 8) ft(e, t, n.child, r);
      else if (o & 32) {
        let l = Yn(n, t),
          u;
        for (; (u = l()); ) r.push(u);
      } else if (o & 16) {
        let l = Rs(t, n);
        if (Array.isArray(l)) r.push(...l);
        else {
          let u = de(t[B]);
          ft(u[y], u, l, r, !0);
        }
      }
      n = i ? n.projectionNext : n.next;
    }
    return r;
  }
  function ic(e, t) {
    for (let n = j; n < e.length; n++) {
      let r = e[n],
        i = r[y].firstChild;
      i !== null && ft(r[y], r, i, t);
    }
  }
  function Us(e) {
    if (e[jt] !== null) {
      for (let t of e[jt]) t.impl.addSequence(t);
      e[jt].length = 0;
    }
  }
  function sc(e) {
    return e[V] ?? oc(e);
  }
  function oc(e) {
    let t = Zs.pop() ?? Object.create(uc);
    return ((t.lView = e), t);
  }
  function lc(e) {
    e.lView[V] !== e && ((e.lView = null), Zs.push(e));
  }
  function ac(e) {
    let t = e[V] ?? Object.create(cc);
    return ((t.lView = e), t);
  }
  function Qs(e) {
    return e.type !== 2;
  }
  function qs(e) {
    if (e[Ae] === null) return;
    let t = !0;
    for (; t; ) {
      let n = !1;
      for (let r of e[Ae])
        if (
          r.dirty &&
          ((n = !0),
          r.zone === null || Zone.current === r.zone ? r.run() : r.zone.run(() => r.run()),
          e[Ae] === null)
        )
          return;
      t = n && !!(e[p] & 8192);
    }
  }
  function Gs(e, t = 0) {
    let n = e[J].rendererFactory,
      r = !1;
    r || n.begin?.();
    try {
      fc(e, t);
    } finally {
      r || n.end?.();
    }
  }
  function fc(e, t) {
    let n = zi();
    try {
      (Vr(!0), pn(e, t));
      let r = 0;
      for (; lt(e); ) {
        if (r === dc) throw new g(103, !1);
        (r++, pn(e, 1));
      }
    } finally {
      Vr(n);
    }
  }
  function hc(e, t, n, r) {
    if (Se(t)) return;
    let i = t[p],
      s = !1,
      o = !1;
    Fn(t);
    let l = !0,
      u = null,
      a = null;
    s ||
      (Qs(e)
        ? ((a = sc(t)), (u = kr(a)))
        : Fo() === null
          ? ((l = !1), (a = ac(t)), (u = kr(a)))
          : t[V] && (ui(t[V]), (t[V] = null)));
    try {
      (Hi(t), ou(e.bindingStartIndex), n !== null && zs(e, t, n, 2, r));
      let c = (i & 3) === 3;
      if (!s)
        if (c) {
          let f = e.preOrderCheckHooks;
          f !== null && $e(t, f, null);
        } else {
          let f = e.preOrderHooks;
          (f !== null && Ke(t, f, 0, null), Rt(t, 0));
        }
      if ((o || pc(t), qs(t), $s(t, 0), e.contentQueries !== null && Cs(e, t), !s))
        if (c) {
          let f = e.contentCheckHooks;
          f !== null && $e(t, f);
        } else {
          let f = e.contentHooks;
          (f !== null && Ke(t, f, 1), Rt(t, 1));
        }
      vc(e, t);
      let d = e.components;
      d !== null && Js(t, d, 0);
      let h = e.viewQuery;
      if ((h !== null && un(2, h, r), !s))
        if (c) {
          let f = e.viewCheckHooks;
          f !== null && $e(t, f);
        } else {
          let f = e.viewHooks;
          (f !== null && Ke(t, f, 2), Rt(t, 2));
        }
      if ((e.firstUpdatePass === !0 && (e.firstUpdatePass = !1), t[Vt])) {
        for (let f of t[Vt]) f();
        t[Vt] = null;
      }
      s || (Us(t), (t[p] &= -73));
    } catch (c) {
      Ws(t, c, s);
    } finally {
      (a !== null && (zo(a, u), l && lc(a)), Ln());
    }
  }
  function Ws(e, t, n) {
    let r = !1,
      i = t,
      s = e,
      o = v(null);
    try {
      for (; s !== null; ) {
        if (Z(s)) {
          s = s[x];
          continue;
        }
        let l = s[Jt];
        if (l)
          try {
            let u = e[B][A],
              a = u?.constructor,
              c = { declarationInstance: u, declarationType: a, caughtBy: l },
              d = v(null);
            try {
              l(Iu(i), c);
            } finally {
              v(d);
            }
            r = !0;
            break;
          } catch (u) {
            i = u;
          }
        s = s[x];
      }
    } finally {
      v(o);
    }
    if (!r) throw (n || bt(e), i);
  }
  function $s(e, t) {
    for (let n = gs(e); n !== null; n = ms(n))
      for (let r = j; r < n.length; r++) {
        let i = n[r];
        Ks(i, t);
      }
  }
  function pc(e) {
    for (let t = gs(e); t !== null; t = ms(t)) {
      if (!(t[p] & 2)) continue;
      let n = t[it];
      for (let r = 0; r < n.length; r++) {
        let i = n[r];
        Pi(i);
      }
    }
  }
  function yc(e, t, n) {
    w(m.ComponentStart);
    let r = ce(t, e);
    try {
      Ks(r, n);
    } finally {
      w(m.ComponentEnd, r[A]);
    }
  }
  function Ks(e, t) {
    Hn(e) && pn(e, t);
  }
  function pn(e, t) {
    let n = e[y],
      r = e[p],
      i = e[V],
      s = !!(t === 0 && r & 16);
    if (
      ((s ||= !!(r & 64 && t === 0)),
      (s ||= !!(r & 1024)),
      (s ||= !!(i?.dirty && li(i))),
      (s ||= !1),
      i && (i.dirty = !1),
      (e[p] &= -9217),
      s)
    )
      hc(n, e, n.template, e[A]);
    else if (r & 8192) {
      let o = v(null);
      try {
        try {
          qs(e);
        } catch (u) {
          Ws(e, u, !1);
        }
        $s(e, 1);
        let l = n.components;
        (l !== null && Js(e, l, 1), Us(e));
      } finally {
        v(o);
      }
    }
  }
  function Js(e, t, n) {
    for (let r = 0; r < t.length; r++) yc(e, t[r], n);
  }
  function vc(e, t) {
    let n = e.hostBindingOpCodes;
    if (n !== null)
      try {
        for (let r = 0; r < n.length; r++) {
          let i = n[r];
          if (i < 0) fe(~i);
          else {
            let s = i,
              o = n[++r],
              l = n[++r];
            uu(o, s);
            let u = t[s];
            w(m.HostBindingsUpdateStart, u);
            try {
              l(2, u);
            } finally {
              w(m.HostBindingsUpdateEnd, u);
            }
          }
        }
      } finally {
        fe(-1);
      }
  }
  function nr(e, t) {
    let n = zi() ? 64 : 1088;
    for (e[J].changeDetectionScheduler?.notify(t); e; ) {
      e[p] |= n;
      let r = de(e);
      if (st(e) && !r) return e;
      e = r;
    }
    return null;
  }
  function gc(e, t, n, r) {
    return [e, !0, 0, t, null, r, null, n, null, null];
  }
  function mc(e, t, n, r = !0) {
    let i = t[y];
    if ((wc(i, t, e, n), r)) {
      let o = fn(n, e),
        l = t[H],
        u = l.parentNode(e[_e]);
      u !== null && Ia(i, e[R], l, t, u, o);
    }
    let s = t[tt];
    s !== null && s.firstChild !== null && (s.firstChild = null);
  }
  function yn(e, t) {
    if (e.length <= j) return;
    let n = j + t,
      r = e[n];
    if (r) {
      let i = r[Pe];
      (i !== null && i !== e && er(i, r), t > 0 && (e[n - 1][F] = r[F]));
      let s = et(e, j + t);
      Ea(r[y], r);
      let o = s[gt];
      (o !== null && o.detachView(s[y]), (r[x] = null), (r[F] = null), (r[p] &= -129));
    }
    return r;
  }
  function wc(e, t, n, r) {
    let i = j + r,
      s = n.length;
    (r > 0 && (n[i - 1][F] = t),
      r < s - j ? ((t[F] = n[i]), Ci(n, j + r, t)) : (n.push(t), (t[F] = null)),
      (t[x] = n));
    let o = t[Pe];
    o !== null && n !== o && Xs(o, t);
    let l = t[gt];
    (l !== null && l.insertView(e), Xt(t), (t[p] |= 128));
  }
  function Xs(e, t) {
    let n = e[it],
      r = t[x];
    if (oe(r)) e[p] |= 2;
    else {
      let i = r[x][B];
      t[B] !== i && (e[p] |= 2);
    }
    n === null ? (e[it] = [t]) : n.push(t);
  }
  function rr(e, t, n, r, i) {
    let s = e.data[t];
    if (s === null) ((s = bc(e, t, n, r, i)), lu() && (s.flags |= 32));
    else if (s.type & 64) {
      ((s.type = n), (s.value = r), (s.attrs = i));
      let o = iu();
      s.injectorIndex = o === null ? -1 : o.injectorIndex;
    }
    return (_t(s, !0), s);
  }
  function bc(e, t, n, r, i) {
    let s = Li(),
      o = Mi(),
      l = o ? s : s && s.parent,
      u = (e.data[t] = kc(e, l, n, t, r, i));
    return (_c(e, u, s, o), u);
  }
  function _c(e, t, n, r) {
    (e.firstChild === null && (e.firstChild = t),
      n !== null &&
        (r
          ? n.child == null && t.parent !== null && (n.child = t)
          : n.next === null && ((n.next = t), (t.prev = n))));
  }
  function kc(e, t, n, r, i, s) {
    let o = t ? t.injectorIndex : -1,
      l = 0;
    return (
      tu() && (l |= 128),
      {
        type: n,
        index: r,
        insertBeforeIndex: null,
        injectorIndex: o,
        directiveStart: -1,
        directiveEnd: -1,
        directiveStylingLast: -1,
        componentOffset: -1,
        controlDirectiveIndex: -1,
        customControlIndex: -1,
        propertyBindings: null,
        flags: l,
        providerIndexes: 0,
        value: i,
        namespace: Wi(),
        attrs: s,
        mergedAttrs: null,
        localNames: null,
        initialInputs: null,
        inputs: null,
        hostDirectiveInputs: null,
        outputs: null,
        hostDirectiveOutputs: null,
        directiveToIndex: null,
        tView: null,
        next: null,
        prev: null,
        projectionNext: null,
        child: null,
        parent: t,
        projection: null,
        styles: null,
        stylesWithoutHost: null,
        residualStyles: void 0,
        classes: null,
        classesWithoutHost: null,
        residualClasses: void 0,
        classBindings: 0,
        styleBindings: 0,
      }
    );
  }
  function Xr(e, t) {
    return Sc(e, t);
  }
  function Ic(e) {
    return e.debugInfo?.className || e.type.name || null;
  }
  function Tc(e, t, n) {
    return function r(i) {
      let s = r.__ngNativeEl__;
      s !== void 0 && oa(i, s);
      let o = wt(e) ? ce(e.index, t) : t;
      nr(o, 5);
      let l = t[A],
        u = Yr(t, l, n, i),
        a = r.__ngNextListenerFn__;
      for (; a; ) ((u = Yr(t, l, a, i) && u), (a = a.__ngNextListenerFn__));
      return u;
    };
  }
  function Yr(e, t, n, r) {
    let i = v(null);
    try {
      return (w(m.OutputStart, t, n), n(r) !== !1);
    } catch (s) {
      return (Ya(e, s), !1);
    } finally {
      (w(m.OutputEnd, t, n), v(i));
    }
  }
  function Dc(e, t, n, r, i, s, o, l) {
    let u = Ri(e),
      a = !1,
      c = null;
    if ((!r && u && (c = Nc(t, n, s, e.index)), c !== null)) {
      let d = c.__ngLastListenerFn__ || c;
      ((d.__ngNextListenerFn__ = o), (c.__ngLastListenerFn__ = o), (a = !0));
    } else {
      let d = X(e, n),
        h = r ? r(d) : d;
      (ua(n, h, s, l), r || (l.__ngNativeEl__ = d));
      let f = i.listen(h, s, l);
      if (!Ac(s)) {
        let E = r ? (I) => r(D(I[e.index])) : e.index;
        Oc(E, t, n, s, l, f, !1);
      }
    }
    return a;
  }
  function Ac(e) {
    return e.startsWith('animation') || e.startsWith('transition');
  }
  function Nc(e, t, n, r) {
    let i = e.cleanup;
    if (i != null)
      for (let s = 0; s < i.length - 1; s += 2) {
        let o = i[s];
        if (o === n && i[s + 1] === r) {
          let l = t[nt],
            u = i[s + 2];
          return l && l.length > u ? l[u] : null;
        }
        typeof o == 'string' && (s += 2);
      }
    return null;
  }
  function Oc(e, t, n, r, i, s, o) {
    let l = t.firstCreatePass ? Jl(t) : null,
      u = Kl(n),
      a = u.length;
    (u.push(i, s), l && l.push(r, e, a, (a + 1) * (o ? -1 : 1)));
  }
  function ht(e, t, n) {
    let r = n ? e.styles : null,
      i = n ? e.classes : null,
      s = 0;
    if (t !== null)
      for (let o = 0; o < t.length; o++) {
        let l = t[o];
        if (typeof l == 'number') s = l;
        else if (s == 1) i = Ir(i, l);
        else if (s == 2) {
          let u = l,
            a = t[++o];
          r = Ir(r, u + ': ' + a + ';');
        }
      }
    (n ? (e.styles = r) : (e.stylesWithoutHost = r),
      n ? (e.classes = i) : (e.classesWithoutHost = i));
  }
  function Vc(e, t = 0) {
    let n = Y();
    if (n === null) return C(e, t);
    let r = Ce();
    return ds(r, n, P(e), t);
  }
  function jc(e, t, n, r, i) {
    let s = r === null ? null : { '': -1 },
      o = i(e, n);
    if (o !== null) {
      let l = o,
        u = null,
        a = null;
      for (let c of o)
        if (c.resolveHostDirectives !== null) {
          [l, u, a] = c.resolveHostDirectives(o);
          break;
        }
      Pc(e, t, n, l, s, u, a);
    }
    s !== null && r !== null && Rc(n, r, s);
  }
  function Rc(e, t, n) {
    let r = (e.localNames = []);
    for (let i = 0; i < t.length; i += 2) {
      let s = n[t[i + 1]];
      if (s == null) throw new g(-301, !1);
      r.push(t[i], s);
    }
  }
  function Hc(e, t, n) {
    ((t.componentOffset = n), (e.components ??= []).push(t.index));
  }
  function Pc(e, t, n, r, i, s, o) {
    let l = r.length,
      u = null;
    for (let h = 0; h < l; h++) {
      let f = r[h];
      (u === null && Me(f) && ((u = f), Hc(e, n, h)), Gu(ls(n, t), e, f.type));
    }
    (Uc(n, e.data.length, l), u?.viewProvidersResolver && u.viewProvidersResolver(u));
    for (let h = 0; h < l; h++) {
      let f = r[h];
      f.providersResolver && f.providersResolver(f);
    }
    let a = !1,
      c = !1,
      d = Ls(e, t, l, null);
    l > 0 && (n.directiveToIndex = new Map());
    for (let h = 0; h < l; h++) {
      let f = r[h];
      if (
        ((n.mergedAttrs = $n(n.mergedAttrs, f.hostAttrs)),
        Lc(e, n, t, d, f),
        Bc(d, f, i),
        o !== null && o.has(f))
      ) {
        let [I, L] = o.get(f);
        n.directiveToIndex.set(f.type, [d, I + n.directiveStart, L + n.directiveStart]);
      } else (s === null || !s.has(f)) && n.directiveToIndex.set(f.type, d);
      (f.contentQueries !== null && (n.flags |= 4),
        (f.hostBindings !== null || f.hostAttrs !== null || f.hostVars !== 0) && (n.flags |= 64));
      let E = f.type.prototype;
      (!a &&
        (E.ngOnChanges || E.ngOnInit || E.ngDoCheck) &&
        ((e.preOrderHooks ??= []).push(n.index), (a = !0)),
        !c &&
          (E.ngOnChanges || E.ngDoCheck) &&
          ((e.preOrderCheckHooks ??= []).push(n.index), (c = !0)),
        d++);
    }
    Fc(e, n, s);
  }
  function Fc(e, t, n) {
    for (let r = t.directiveStart; r < t.directiveEnd; r++) {
      let i = e.data[r];
      if (n === null || !n.has(i)) (ei(0, t, i, r), ei(1, t, i, r), ni(t, r, !1));
      else {
        let s = n.get(i);
        (ti(0, t, s, r), ti(1, t, s, r), ni(t, r, !0));
      }
    }
  }
  function ei(e, t, n, r) {
    let i = e === 0 ? n.inputs : n.outputs;
    for (let s in i)
      if (Object.hasOwn(i, s)) {
        let o;
        (e === 0 ? (o = t.inputs ??= {}) : (o = t.outputs ??= {}),
          (o[s] ??= []),
          o[s].push(r),
          eo(t, s));
      }
  }
  function ti(e, t, n, r) {
    let i = e === 0 ? n.inputs : n.outputs;
    for (let s in i)
      if (Object.hasOwn(i, s)) {
        let o = i[s],
          l;
        (e === 0 ? (l = t.hostDirectiveInputs ??= {}) : (l = t.hostDirectiveOutputs ??= {}),
          (l[o] ??= []),
          l[o].push(r, s),
          eo(t, o));
      }
  }
  function eo(e, t) {
    t === 'class' ? (e.flags |= 8) : t === 'style' && (e.flags |= 16);
  }
  function ni(e, t, n) {
    let { attrs: r, inputs: i, hostDirectiveInputs: s } = e;
    if (r === null || (!n && i === null) || (n && s === null) || va(e)) {
      ((e.initialInputs ??= []), e.initialInputs.push(null));
      return;
    }
    let o = null,
      l = 0;
    for (; l < r.length; ) {
      let u = r[l];
      if (u === 0) {
        l += 4;
        continue;
      } else if (u === 5) {
        l += 2;
        continue;
      } else if (typeof u == 'number') break;
      if (!n && Object.hasOwn(i, u)) {
        let a = i[u];
        for (let c of a)
          if (c === t) {
            ((o ??= []), o.push(u, r[l + 1]));
            break;
          }
      } else if (n && Object.hasOwn(s, u)) {
        let a = s[u];
        for (let c = 0; c < a.length; c += 2)
          if (a[c] === t) {
            ((o ??= []), o.push(a[c + 1], r[l + 1]));
            break;
          }
      }
      l += 2;
    }
    ((e.initialInputs ??= []), e.initialInputs.push(o));
  }
  function Lc(e, t, n, r, i) {
    e.data[r] = i;
    let s = i.factory || (i.factory = Re(i.type, !0)),
      o = new Wn(s, Me(i), Vc, null);
    ((e.blueprint[r] = o), (n[r] = o), Mc(e, t, r, Ls(e, n, i.hostVars, Ts), i));
  }
  function Mc(e, t, n, r, i) {
    let s = i.hostBindings;
    if (s) {
      let o = e.hostBindingOpCodes;
      o === null && (o = e.hostBindingOpCodes = []);
      let l = ~t.index;
      (zc(o) != l && o.push(l), o.push(n, r, s));
    }
  }
  function zc(e) {
    let t = e.length;
    for (; t > 0; ) {
      let n = e[--t];
      if (typeof n == 'number' && n < 0) return n;
    }
    return 0;
  }
  function Bc(e, t, n) {
    if (n) {
      if (t.exportAs) for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
      Me(t) && (n[''] = e);
    }
  }
  function Uc(e, t, n) {
    ((e.flags |= 1), (e.directiveStart = t), (e.directiveEnd = t + n), (e.providerIndexes = t));
  }
  function Zc(e, t, n, r, i, s, o, l) {
    let u = t[y],
      a = u.consts,
      c = ot(a, o),
      d = rr(u, e, n, r, c);
    return (
      s && jc(u, t, d, ot(a, l), i),
      (d.mergedAttrs = $n(d.mergedAttrs, d.attrs)),
      d.attrs !== null && ht(d, d.attrs, !1),
      d.mergedAttrs !== null && ht(d, d.mergedAttrs, !0),
      u.queries !== null && u.queries.elementStart(u, d),
      d
    );
  }
  function Qc(e, t) {
    (Lu(e, t), ji(t) && e.queries.elementEnd(t));
  }
  function qc(e, t, n, r, i, s) {
    let o = t.consts,
      l = ot(o, i),
      u = rr(t, e, n, r, l);
    if (((u.mergedAttrs = $n(u.mergedAttrs, u.attrs)), s != null)) {
      let a = ot(o, s);
      u.localNames = [];
      for (let c = 0; c < a.length; c += 2) u.localNames.push(a[c], -1);
    }
    return (
      u.attrs !== null && ht(u, u.attrs, !1),
      u.mergedAttrs !== null && ht(u, u.mergedAttrs, !0),
      t.queries !== null && t.queries.elementStart(t, u),
      u
    );
  }
  function Wc(e) {
    return Object.keys(e).map((t) => {
      let [n, r, i] = e[t],
        s = { propName: n, templateName: t, isSignal: (r & Et.SignalBased) !== 0 };
      return (i && (s.transform = i), s);
    });
  }
  function $c(e) {
    return Object.keys(e).map((t) => ({ propName: e[t], templateName: t }));
  }
  function Kc(e, t, n) {
    let r = t instanceof ue ? t : t?.injector;
    return (
      r && e.getStandaloneInjector !== null && (r = e.getStandaloneInjector(r) || r),
      r ? new xc(n, r) : n
    );
  }
  function Jc(e) {
    let t = e.get(It, null);
    if (t === null) throw new g(407, !1);
    let n = e.get(Ec, null),
      r = e.get(ns, null),
      i = e.get(Be, null, { optional: !0 });
    return {
      rendererFactory: t,
      sanitizer: n,
      changeDetectionScheduler: r,
      ngReflect: !1,
      tracingService: i,
    };
  }
  function Xc(e, t, n) {
    let r = ed(e);
    return Es(t, r, r === 'svg' ? Ql : r === 'math' ? ql : n);
  }
  function Yc(e) {
    if (
      (e && 'localName' in e && typeof e.localName == 'string'
        ? e.localName
        : e?.tagName
      )?.toLowerCase() === 'script'
    )
      throw new g(905, !1);
  }
  function ed(e) {
    return (e.selectors[0][0] || 'div').toLowerCase();
  }
  function td(e, t, n, r, i) {
    let s = e ? ['ng-version', '22.2.5'] : wa(t.selectors[0]),
      o = null,
      l = null,
      u = 0;
    if (n)
      for (let c of n)
        ((u += c[vn].requiredVars),
          c.create && ((c.targetIdx = 0), (o ??= []).push(c)),
          c.update && ((c.targetIdx = 0), (l ??= []).push(c)));
    if (r)
      for (let c = 0; c < r.length; c++) {
        let d = r[c];
        if (typeof d != 'function')
          for (let h of d.bindings) {
            u += h[vn].requiredVars;
            let f = c + 1;
            (h.create && ((h.targetIdx = f), (o ??= []).push(h)),
              h.update && ((h.targetIdx = f), (l ??= []).push(h)));
          }
      }
    let a = [t];
    if (r)
      for (let c of r) {
        let d = typeof c == 'function' ? c : c.type,
          h = mi(d);
        a.push(h);
      }
    return Hs(0, null, rd(o, l), 1, u, a, null, null, null, [s], null);
  }
  function nd(e, t) {
    let n = e.getRootNode?.();
    return Gc && n instanceof Document ? n.head : n && to && n instanceof ShadowRoot ? n : t().head;
  }
  function rd(e, t) {
    return !e && !t
      ? null
      : (n) => {
          if (n & 1 && e) for (let r of e) r.create();
          if (n & 2 && t) for (let r of t) r.update();
        };
  }
  function ri(e) {
    let t = e[vn].kind;
    return t === 'input' || t === 'twoWay';
  }
  function sd(e, t, n) {
    let r = (e.projection = []);
    for (let i = 0; i < t.length; i++) {
      let s = n[i];
      r.push(s != null && s.length ? Array.from(s) : null);
    }
  }
  function od() {
    let e = Ce();
    return ud(e, Y());
  }
  function ii(e) {
    return e[rt];
  }
  function Lt(e) {
    return e[rt] || (e[rt] = []);
  }
  function ud(e, t) {
    let n,
      r = t[e.index];
    return (
      Z(r) ? (n = r) : ((n = gc(r, t, null, e)), (t[e.index] = n), Ms(t, n)),
      cd(n, t, e, r),
      new ld(n, e, t)
    );
  }
  function ad(e, t) {
    let n = e[H],
      r = n.createComment(''),
      i = X(t, e),
      s = n.parentNode(i);
    return (le(n, s, r, n.nextSibling(i), !1), r);
  }
  function dd(e, t, n, r) {
    if (e[_e]) return;
    let i;
    (n.type & 8 ? (i = D(r)) : (i = ad(t, n)), (e[_e] = i));
  }
  function io(e) {
    return !!e && typeof e.then == 'function';
  }
  function fd(e) {
    return !!e && typeof e.subscribe == 'function';
  }
  function hd(e, t, n = null) {
    return new so({ providers: e, parent: t, debugName: n, runEnvironmentInitializers: !0 })
      .injector;
  }
  function xt(e) {
    return ju(() => {
      let t = md(e),
        n = _n(bn({}, t), {
          decls: e.decls,
          vars: e.vars,
          template: e.template,
          consts: e.consts || null,
          ngContentSelectors: e.ngContentSelectors,
          onPush: e.changeDetection !== ys.Eager,
          directiveDefs: null,
          pipeDefs: null,
          dependencies: (t.standalone && e.dependencies) || null,
          getStandaloneInjector: t.standalone
            ? (i) => i.get(pd).getOrCreateStandaloneInjector(n)
            : null,
          getExternalStyles: null,
          signals: e.signals ?? !1,
          data: e.data || {},
          encapsulation: e.encapsulation || U.Emulated,
          styles: e.styles || be,
          _: null,
          schemas: e.schemas || null,
          tView: null,
          id: '',
        });
      (t.standalone && Sa('NgStandalone'), wd(n));
      let r = e.dependencies;
      return ((n.directiveDefs = si(r, yd)), (n.pipeDefs = si(r, Sl)), (n.id = bd(n)), n);
    });
  }
  function yd(e) {
    return Ve(e) || mi(e);
  }
  function vd(e, t) {
    if (e == null) return Nn;
    let n = {};
    for (let r in e)
      if (Object.hasOwn(e, r)) {
        let i = e[r],
          s,
          o,
          l,
          u;
        (Array.isArray(i)
          ? ((l = i[0]), (s = i[1]), (o = i[2] ?? s), (u = i[3] || null))
          : ((s = i), (o = i), (l = Et.None), (u = null)),
          (n[s] = [r, l, u]),
          (t[s] = o));
      }
    return n;
  }
  function gd(e) {
    if (e == null) return Nn;
    let t = {};
    for (let n in e) Object.hasOwn(e, n) && (t[e[n]] = n);
    return t;
  }
  function md(e) {
    let t = {};
    return {
      type: e.type,
      providersResolver: null,
      viewProvidersResolver: null,
      factory: null,
      hostBindings: e.hostBindings || null,
      hostVars: e.hostVars || 0,
      hostAttrs: e.hostAttrs || null,
      contentQueries: e.contentQueries || null,
      declaredInputs: t,
      inputConfig: e.inputs || Nn,
      exportAs: e.exportAs || null,
      standalone: e.standalone ?? !0,
      signals: e.signals === !0,
      selectors: e.selectors || be,
      viewQuery: e.viewQuery || null,
      features: e.features || null,
      setInput: null,
      resolveHostDirectives: null,
      hostDirectives: null,
      controlDef: null,
      signalFormsInputPresence: null,
      inputs: vd(e.inputs, t),
      outputs: gd(e.outputs),
      debugInfo: null,
    };
  }
  function wd(e) {
    e.features?.forEach((t) => t(e));
  }
  function si(e, t) {
    return e
      ? () => {
          let n = typeof e == 'function' ? e() : e,
            r = [];
          for (let i of n) {
            let s = t(i);
            s !== null && r.push(s);
          }
          return r;
        }
      : null;
  }
  function bd(e) {
    let t = 0,
      n = typeof e.consts == 'function' ? '' : e.consts,
      r = [
        e.selectors,
        e.ngContentSelectors,
        e.hostVars,
        e.hostAttrs,
        n,
        e.vars,
        e.decls,
        e.encapsulation,
        e.standalone,
        e.signals,
        e.exportAs,
        JSON.stringify(e.inputs),
        JSON.stringify(e.outputs),
        Object.getOwnPropertyNames(e.type.prototype),
        !!e.contentQueries,
        !!e.viewQuery,
      ];
    for (let i of r.join('|')) t = (Math.imul(31, t) + i.charCodeAt(0)) << 0;
    return ((t += 2147483648), 'c' + t);
  }
  function Cd() {
    Qo((e) => {
      let t = '';
      throw new g(-600, t);
    });
  }
  function Id(e) {
    return e === void 0 || typeof e == 'string' || e instanceof Element ? { hostElement: e } : e;
  }
  function Je(e, t) {
    let n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  }
  function ne(e, t, n, r) {
    let i = Y(),
      s = i[y],
      o = e + Q,
      l = s.firstCreatePass ? qc(o, s, 2, t, n, r) : s.data[o];
    return (Ja(l, i, e, t, xd), r != null && Ua(i, l), ne);
  }
  function re() {
    let e = Ce(),
      t = Xa(e);
    return (nu(t) && ru(), eu(), re);
  }
  function Dd(e) {
    typeof e == 'string' && (Td = e.toLowerCase().replace(/_/g, '-'));
  }
  function sr(e, t, n) {
    let r = Y(),
      i = Fi(),
      s = Ce();
    return ((s.type & 3 || n) && Dc(s, i, r, n, r[H], e, t, Tc(s, r, t)), sr);
  }
  function pe(e, t = '') {
    let n = Y(),
      r = Fi(),
      i = e + Q,
      s = r.firstCreatePass ? rr(r, i, 1, t, null) : r.data[i],
      o = Ad(r, n, s, t);
    ((n[i] = o), Ki() && js(r, n, o, s), _t(s, !1));
  }
  function Od() {
    return [
      { provide: ns, useExisting: Nd },
      { provide: te, useClass: Su },
      { provide: Gn, useValue: !0 },
    ];
  }
  function Vd() {
    return (typeof $localize < 'u' && $localize.locale) || pt;
  }
  function Ie(e) {
    return !e.moduleRef;
  }
  function Hd(e) {
    let t = Ie(e) ? e.r3Injector : e.moduleRef.injector,
      n = t.get(te);
    return n.run(() => {
      Ie(e)
        ? e.r3Injector.resolveInjectorInitializers()
        : e.moduleRef.resolveInjectorInitializers();
      let r = t.get(St),
        i;
      if (
        (n.runOutsideAngular(() => {
          i = n.onError.subscribe({ next: r });
        }),
        Ie(e))
      ) {
        let s = () => t.destroy(),
          o = e.platformInjector.get(wn);
        (o.add(s),
          t.onDestroy(() => {
            (i.unsubscribe(), o.delete(s));
          }));
      } else {
        let s = () => e.moduleRef.destroy(),
          o = e.platformInjector.get(wn);
        (o.add(s),
          e.moduleRef.onDestroy(() => {
            (Je(e.allPlatformModules, e.moduleRef), i.unsubscribe(), o.delete(s));
          }));
      }
      return Fd(r, n, () => {
        let s = t.get(kt),
          o = s.add(),
          l = t.get(oo);
        return (
          l.runInitializers(),
          l.donePromise
            .then(() => {
              let u = t.get(lo, pt);
              if ((Dd(u || pt), !t.get(Rd, !0)))
                return Ie(e) ? t.get(mn) : (e.allPlatformModules.push(e.moduleRef), e.moduleRef);
              if (Ie(e)) {
                let a = t.get(mn);
                return (e.rootComponent !== void 0 && a.bootstrap(e.rootComponent), a);
              } else return (Pd?.(e.moduleRef, e.allPlatformModules), e.moduleRef);
            })
            .finally(() => {
              s.remove(o);
            })
        );
      });
    });
  }
  function Fd(e, t, n) {
    try {
      let r = n();
      return io(r)
        ? r.catch((i) => {
            throw (t.runOutsideAngular(() => e(i)), i);
          })
        : r;
    } catch (r) {
      throw (t.runOutsideAngular(() => e(r)), r);
    }
  }
  function Ld(e = [], t) {
    return Mn.create({
      name: t,
      providers: [
        { provide: vt, useValue: 'platform' },
        { provide: wn, useValue: new Set([() => (Xe = null)]) },
        ...e,
      ],
    });
  }
  function Md(e = []) {
    if (Xe) return Xe;
    let t = Ld(e);
    return ((Xe = t), Cd(), zd(t), t);
  }
  function zd(e) {
    let t = e.get(Zn, null);
    Ni(e, () => {
      t?.forEach((n) => n());
    });
  }
  function uo(e) {
    let { rootComponent: t, appProviders: n, platformProviders: r, platformRef: i } = e;
    w(m.BootstrapApplicationStart);
    try {
      let s = i?.injector ?? Md(r),
        o = [Od(), Du, ...(n || [])],
        l = new so({ providers: o, parent: s, debugName: '', runEnvironmentInitializers: !1 });
      return Hd({ r3Injector: l.injector, platformInjector: s, rootComponent: t });
    } catch (s) {
      return Promise.reject(s);
    } finally {
      w(m.BootstrapApplicationEnd);
    }
  }
  var Vo,
    jo,
    Ro,
    wr,
    Ho,
    Po,
    br,
    bn,
    _n,
    Mt,
    kn,
    qe,
    oi,
    Zo,
    zt,
    qo,
    Dt,
    K,
    di,
    he,
    Ye,
    Wo,
    ie,
    In,
    Xo,
    Yo,
    Zt,
    tl,
    nl,
    Oe,
    cl,
    dl,
    Le,
    pi,
    fl,
    g,
    vl,
    vi,
    Tr,
    k,
    bl,
    _l,
    kl,
    Dr,
    De,
    Ar,
    wi,
    Cl,
    El,
    Qt,
    xl,
    se,
    Tl,
    Dl,
    Nn,
    be,
    On,
    Ei,
    Ii,
    xi,
    jl,
    vt,
    We,
    Nr,
    Ot,
    ue,
    Rn,
    q,
    y,
    p,
    x,
    F,
    R,
    tt,
    nt,
    A,
    ae,
    J,
    H,
    He,
    Or,
    ke,
    B,
    Pe,
    ge,
    gt,
    mt,
    Oi,
    $,
    Vt,
    Ae,
    V,
    jt,
    Zl,
    Jt,
    Q,
    Vi,
    _e,
    rt,
    it,
    j,
    Ql,
    ql,
    _,
    Yt,
    Gi,
    $i,
    Mn,
    ee,
    Yi,
    hu,
    yu,
    vu,
    kt,
    gu,
    W,
    zn,
    at,
    wu,
    te,
    bu,
    Su,
    ze,
    Tu,
    St,
    Du,
    Un,
    Au,
    Zn,
    Qn,
    qn,
    ns,
    Gn,
    Nu,
    Ou,
    Vu,
    bf,
    m,
    Hu,
    Pr,
    w,
    we,
    Wn,
    rn,
    Zu,
    ss,
    os,
    Qu,
    M,
    Ne,
    ea,
    ys,
    vs,
    ta,
    Ur,
    ln,
    _s,
    sa,
    Zr,
    la,
    aa,
    U,
    ya,
    Ts,
    Ee,
    ba,
    Ds,
    _f,
    cn,
    ye,
    Ns,
    Be,
    Gr,
    Ca,
    dn,
    ja,
    Kr,
    Et,
    qa,
    Zs,
    uc,
    cc,
    dc,
    Ys,
    Sc,
    Cc,
    It,
    Ec,
    Ft,
    xc,
    vn,
    Ue,
    to,
    Gc,
    no,
    id,
    ir,
    ld,
    cd,
    gn,
    so,
    pd,
    _d,
    oo,
    kd,
    Sd,
    Ed,
    mn,
    xd,
    pt,
    Td,
    Ad,
    Nd,
    lo,
    jd,
    kf,
    wn,
    Rd,
    Pd,
    Xe,
    or = gr(() => {
      ((Vo = Object.defineProperty),
        (jo = Object.defineProperties),
        (Ro = Object.getOwnPropertyDescriptors),
        (wr = Object.getOwnPropertySymbols),
        (Ho = Object.prototype.hasOwnProperty),
        (Po = Object.prototype.propertyIsEnumerable),
        (br = (e, t, n) =>
          t in e
            ? Vo(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
            : (e[t] = n)),
        (bn = (e, t) => {
          for (var n in (t ||= {})) Ho.call(t, n) && br(e, n, t[n]);
          if (wr) for (var n of wr(t)) Po.call(t, n) && br(e, n, t[n]);
          return e;
        }),
        (_n = (e, t) => jo(e, Ro(t))),
        (Mt = [null]),
        (kn = 1),
        (qe = Symbol('SIGNAL')));
      oi = {
        version: 0,
        lastCleanEpoch: 0,
        dirty: !1,
        producers: void 0,
        producersTail: void 0,
        consumers: void 0,
        consumersTail: void 0,
        recomputing: !1,
        consumerAllowSignalWrites: !1,
        consumerIsAlwaysLive: !1,
        kind: 'unknown',
        producerMustRecompute: () => !1,
        producerRecomputeValue: () => {},
        consumerMarkedDirty: () => {},
        consumerOnSignalRead: () => {},
      };
      Zo = Uo;
      zt = [void 0];
      qo = Symbol('NotFound');
      Dt = ci(
        (e) =>
          function (t) {
            (e(this),
              (this.message = t
                ? `${t.length} errors occurred during unsubscription:
${t.map((n, r) => `${r + 1}) ${n.toString()}`).join(`
  `)}`
                : ''),
              (this.name = 'UnsubscriptionError'),
              (this.errors = t));
          },
      );
      K = class Ut {
        constructor(t) {
          ((this.initialTeardown = t),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null));
        }
        unsubscribe() {
          let t;
          if (!this.closed) {
            this.closed = !0;
            let { _parentage: n } = this;
            if (n)
              if (((this._parentage = null), Array.isArray(n))) for (let s of n) s.remove(this);
              else n.remove(this);
            let { initialTeardown: r } = this;
            if (z(r))
              try {
                r();
              } catch (s) {
                t = s instanceof Dt ? s.errors : [s];
              }
            let { _finalizers: i } = this;
            if (i) {
              this._finalizers = null;
              for (let s of i)
                try {
                  Sr(s);
                } catch (o) {
                  ((t = t ?? []), o instanceof Dt ? (t = [...t, ...o.errors]) : t.push(o));
                }
            }
            if (t) throw new Dt(t);
          }
        }
        add(t) {
          var n;
          if (t && t !== this)
            if (this.closed) Sr(t);
            else {
              if (t instanceof Ut) {
                if (t.closed || t._hasParent(this)) return;
                t._addParent(this);
              }
              (this._finalizers = (n = this._finalizers) !== null && n !== void 0 ? n : []).push(t);
            }
        }
        _hasParent(t) {
          let { _parentage: n } = this;
          return n === t || (Array.isArray(n) && n.includes(t));
        }
        _addParent(t) {
          let { _parentage: n } = this;
          this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
        }
        _removeParent(t) {
          let { _parentage: n } = this;
          n === t ? (this._parentage = null) : Array.isArray(n) && Bt(n, t);
        }
        remove(t) {
          let { _finalizers: n } = this;
          (n && Bt(n, t), t instanceof Ut && t._removeParent(this));
        }
      };
      K.EMPTY = (() => {
        let e = new K();
        return ((e.closed = !0), e);
      })();
      di = K.EMPTY;
      ((he = {
        onUnhandledError: null,
        onStoppedNotification: null,
        Promise: void 0,
        useDeprecatedSynchronousErrorHandling: !1,
        useDeprecatedNextContext: !1,
      }),
        (Ye = {
          setTimeout(e, t, ...n) {
            let { delegate: r } = Ye;
            return r?.setTimeout ? r.setTimeout(e, t, ...n) : setTimeout(e, t, ...n);
          },
          clearTimeout(e) {
            let { delegate: t } = Ye;
            return (t?.clearTimeout || clearTimeout)(e);
          },
          delegate: void 0,
        }));
      Wo = En('C', void 0, void 0);
      ie = null;
      ((In = class extends K {
        constructor(e) {
          (super(),
            (this.isStopped = !1),
            e ? ((this.destination = e), fi(e) && e.add(this)) : (this.destination = tl));
        }
        static create(e, t, n) {
          return new Zt(e, t, n);
        }
        next(e) {
          this.isStopped ? Nt(Ko(e), this) : this._next(e);
        }
        error(e) {
          this.isStopped ? Nt($o(e), this) : ((this.isStopped = !0), this._error(e));
        }
        complete() {
          this.isStopped ? Nt(Wo, this) : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed || ((this.isStopped = !0), super.unsubscribe(), (this.destination = null));
        }
        _next(e) {
          this.destination.next(e);
        }
        _error(e) {
          try {
            this.destination.error(e);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }),
        (Xo = Function.prototype.bind));
      ((Yo = class {
        constructor(e) {
          this.partialObserver = e;
        }
        next(e) {
          let { partialObserver: t } = this;
          if (t.next)
            try {
              t.next(e);
            } catch (n) {
              Qe(n);
            }
        }
        error(e) {
          let { partialObserver: t } = this;
          if (t.error)
            try {
              t.error(e);
            } catch (n) {
              Qe(n);
            }
          else Qe(e);
        }
        complete() {
          let { partialObserver: e } = this;
          if (e.complete)
            try {
              e.complete();
            } catch (t) {
              Qe(t);
            }
        }
      }),
        (Zt = class extends In {
          constructor(e, t, n) {
            super();
            let r;
            if (z(e) || !e) r = { next: e ?? void 0, error: t ?? void 0, complete: n ?? void 0 };
            else {
              let i;
              this && he.useDeprecatedNextContext
                ? ((i = Object.create(e)),
                  (i.unsubscribe = () => this.unsubscribe()),
                  (r = {
                    next: e.next && At(e.next, i),
                    error: e.error && At(e.error, i),
                    complete: e.complete && At(e.complete, i),
                  }))
                : (r = e);
            }
            this.destination = new Yo(r);
          }
        }));
      ((tl = { closed: !0, next: Cr, error: el, complete: Cr }),
        (nl = (typeof Symbol == 'function' && Symbol.observable) || '@@observable'));
      Oe = class hi {
        constructor(t) {
          t && (this._subscribe = t);
        }
        lift(t) {
          let n = new hi();
          return ((n.source = this), (n.operator = t), n);
        }
        subscribe(t, n, r) {
          let i = ol(t) ? t : new Zt(t, n, r);
          return (
            Ge(() => {
              let { operator: s, source: o } = this;
              i.add(s ? s.call(i, o) : o ? this._subscribe(i) : this._trySubscribe(i));
            }),
            i
          );
        }
        _trySubscribe(t) {
          try {
            return this._subscribe(t);
          } catch (n) {
            t.error(n);
          }
        }
        forEach(t, n) {
          return (
            (n = Er(n)),
            new n((r, i) => {
              let s = new Zt({
                next: (o) => {
                  try {
                    t(o);
                  } catch (l) {
                    (i(l), s.unsubscribe());
                  }
                },
                error: i,
                complete: r,
              });
              this.subscribe(s);
            })
          );
        }
        _subscribe(t) {
          var n;
          return (n = this.source) === null || n === void 0 ? void 0 : n.subscribe(t);
        }
        [nl]() {
          return this;
        }
        pipe(...t) {
          return il(t)(this);
        }
        toPromise(t) {
          return (
            (t = Er(t)),
            new t((n, r) => {
              let i;
              this.subscribe(
                (s) => (i = s),
                (s) => r(s),
                () => n(i),
              );
            })
          );
        }
      };
      Oe.create = (e) => new Oe(e);
      ((cl = class extends In {
        constructor(e, t, n, r, i, s) {
          (super(e),
            (this.onFinalize = i),
            (this.shouldUnsubscribe = s),
            (this._next = t
              ? function (o) {
                  try {
                    t(o);
                  } catch (l) {
                    e.error(l);
                  }
                }
              : super._next),
            (this._error = r
              ? function (o) {
                  try {
                    r(o);
                  } catch (l) {
                    e.error(l);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = n
              ? function () {
                  try {
                    n();
                  } catch (o) {
                    e.error(o);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete));
        }
        unsubscribe() {
          var e;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            let { closed: t } = this;
            (super.unsubscribe(),
              !t && ((e = this.onFinalize) === null || e === void 0 || e.call(this)));
          }
        }
      }),
        (dl = ci(
          (e) =>
            function () {
              (e(this),
                (this.name = 'ObjectUnsubscribedError'),
                (this.message = 'object unsubscribed'));
            },
        )),
        (Le = class extends Oe {
          constructor() {
            (super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null));
          }
          lift(e) {
            let t = new pi(this, this);
            return ((t.operator = e), t);
          }
          _throwIfClosed() {
            if (this.closed) throw new dl();
          }
          next(e) {
            Ge(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers || (this.currentObservers = Array.from(this.observers));
                for (let t of this.currentObservers) t.next(e);
              }
            });
          }
          error(e) {
            Ge(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                ((this.hasError = this.isStopped = !0), (this.thrownError = e));
                let { observers: t } = this;
                for (; t.length; ) t.shift().error(e);
              }
            });
          }
          complete() {
            Ge(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                let { observers: e } = this;
                for (; e.length; ) e.shift().complete();
              }
            });
          }
          unsubscribe() {
            ((this.isStopped = this.closed = !0), (this.observers = this.currentObservers = null));
          }
          get observed() {
            var e;
            return ((e = this.observers) === null || e === void 0 ? void 0 : e.length) > 0;
          }
          _trySubscribe(e) {
            return (this._throwIfClosed(), super._trySubscribe(e));
          }
          _subscribe(e) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(e),
              this._innerSubscribe(e)
            );
          }
          _innerSubscribe(e) {
            let { hasError: t, isStopped: n, observers: r } = this;
            return t || n
              ? di
              : ((this.currentObservers = null),
                r.push(e),
                new K(() => {
                  ((this.currentObservers = null), Bt(r, e));
                }));
          }
          _checkFinalizedStatuses(e) {
            let { hasError: t, thrownError: n, isStopped: r } = this;
            t ? e.error(n) : r && e.complete();
          }
          asObservable() {
            let e = new Oe();
            return ((e.source = this), e);
          }
        }));
      Le.create = (e, t) => new pi(e, t);
      ((pi = class extends Le {
        constructor(e, t) {
          (super(), (this.destination = e), (this.source = t));
        }
        next(e) {
          var t, n;
          (n = (t = this.destination) === null || t === void 0 ? void 0 : t.next) === null ||
            n === void 0 ||
            n.call(t, e);
        }
        error(e) {
          var t, n;
          (n = (t = this.destination) === null || t === void 0 ? void 0 : t.error) === null ||
            n === void 0 ||
            n.call(t, e);
        }
        complete() {
          var e, t;
          (t = (e = this.destination) === null || e === void 0 ? void 0 : e.complete) === null ||
            t === void 0 ||
            t.call(e);
        }
        _subscribe(e) {
          var t, n;
          return (n = (t = this.source) === null || t === void 0 ? void 0 : t.subscribe(e)) !==
            null && n !== void 0
            ? n
            : di;
        }
      }),
        (fl = class extends Le {
          constructor(e) {
            (super(), (this._value = e));
          }
          get value() {
            return this.getValue();
          }
          _subscribe(e) {
            let t = super._subscribe(e);
            return (!t.closed && e.next(this._value), t);
          }
          getValue() {
            let { hasError: e, thrownError: t, _value: n } = this;
            if (e) throw t;
            return (this._throwIfClosed(), n);
          }
          next(e) {
            super.next((this._value = e));
          }
        }));
      g = class extends Error {
        code;
        constructor(e, t) {
          (super(yl(e, t)), (this.code = e));
        }
      };
      vl = b({ __forward_ref__: b });
      ((vi = b({ ɵprov: b })),
        (Tr = b({ ɵinj: b })),
        (k = class {
          _desc;
          ngMetadataName = 'InjectionToken';
          ɵprov;
          constructor(e, t) {
            ((this._desc = e),
              (this.ɵprov = void 0),
              typeof t == 'number'
                ? (this.__NG_ELEMENT_ID__ = t)
                : t !== void 0 &&
                  (this.ɵprov = N({
                    token: this,
                    providedIn: t.providedIn || 'root',
                    factory: t.factory,
                  })));
          }
          get multi() {
            return this;
          }
          toString() {
            return `InjectionToken ${this._desc}`;
          }
        }));
      ((bl = b({ ɵcmp: b })),
        (_l = b({ ɵdir: b })),
        (kl = b({ ɵpipe: b })),
        (Dr = b({ ɵfac: b })),
        (De = b({ __NG_ELEMENT_ID__: b })),
        (Ar = b({ __NG_ENV_ID__: b })));
      ((wi = b({ ngErrorCode: b })), (Cl = b({ ngErrorMessage: b })), (El = b({ ngTokenPath: b })));
      ((xl = {}),
        (se = xl),
        (Tl = '__NG_DI_FLAG__'),
        (Dl = class {
          injector;
          constructor(e) {
            this.injector = e;
          }
          retrieve(e, t) {
            let n = je(t) || 0;
            try {
              return this.injector.get(e, n & 8 ? null : se, n);
            } catch (r) {
              if (Cn(r)) return r;
              throw r;
            }
          }
        }));
      ((Nn = {}),
        (be = []),
        (On = new k('')),
        (Ei = new k('', -1)),
        (Ii = new k('')),
        (xi = class {
          get(e, t = se) {
            if (t === se) {
              let n = _i('', -201);
              throw ((n.name = '\u0275NotFound'), n);
            }
            return t;
          }
        }));
      jl = b({ provide: String, useValue: b });
      ((vt = new k('')), (We = {}), (Nr = {}));
      ((ue = class {}),
        (Rn = class extends ue {
          parent;
          source;
          scopes;
          records = new Map();
          _ngOnDestroyHooks = new Set();
          _onDestroyHooks = [];
          get destroyed() {
            return this._destroyed;
          }
          _destroyed = !1;
          injectorDefTypes;
          constructor(e, t, n, r) {
            (super(),
              (this.parent = t),
              (this.source = n),
              (this.scopes = r),
              Kt(e, (s) => this.processProvider(s)),
              this.records.set(Ei, ve(void 0, this)),
              r.has('environment') && this.records.set(ue, ve(void 0, this)));
            let i = this.records.get(vt);
            (i != null && typeof i.value == 'string' && this.scopes.add(i.value),
              (this.injectorDefTypes = new Set(this.get(Ii, be, { self: !0 }))));
          }
          retrieve(e, t) {
            let n = je(t) || 0;
            try {
              return this.get(e, se, n);
            } catch (r) {
              if (Cn(r)) return r;
              throw r;
            }
          }
          destroy() {
            (xe(this), (this._destroyed = !0));
            let e = v(null);
            try {
              for (let n of this._ngOnDestroyHooks) n.ngOnDestroy();
              let t = this._onDestroyHooks;
              this._onDestroyHooks = [];
              for (let n of t) n();
            } finally {
              (this.records.clear(),
                this._ngOnDestroyHooks.clear(),
                this.injectorDefTypes.clear(),
                v(e));
            }
          }
          onDestroy(e) {
            return (xe(this), this._onDestroyHooks.push(e), () => this.removeOnDestroy(e));
          }
          runInContext(e) {
            xe(this);
            let t = G(this),
              n = O(void 0),
              r;
            try {
              return e();
            } finally {
              (G(t), O(n));
            }
          }
          get(e, t = se, n) {
            if ((xe(this), Object.hasOwn(e, Ar))) return e[Ar](this);
            let r = je(n),
              i,
              s = G(this),
              o = O(void 0);
            try {
              if (!(r & 4)) {
                let u = this.records.get(e);
                if (u === void 0) {
                  let a = Bl(e) && xn(e);
                  (a && this.injectableDefInScope(a) ? (u = ve($t(e), We)) : (u = null),
                    this.records.set(e, u));
                }
                if (u != null) return this.hydrate(e, u, r);
              }
              let l = r & 2 ? jn() : this.parent;
              return ((t = r & 8 && t === se ? null : t), l.get(e, t));
            } catch (l) {
              let u = Il(l);
              throw u === -200 || u === -201 ? new g(u, null) : l;
            } finally {
              (O(o), G(s));
            }
          }
          resolveInjectorInitializers() {
            let e = v(null),
              t = G(this),
              n = O(void 0),
              r;
            try {
              let i = this.get(On, be, { self: !0 });
              for (let s of i) s();
            } finally {
              (G(t), O(n), v(e));
            }
          }
          toString() {
            return 'R3Injector[...]';
          }
          processProvider(e) {
            e = P(e);
            let t = Wt(e) ? e : P(e && e.provide),
              n = Fl(e);
            if (!Wt(e) && e.multi === !0) {
              let r = this.records.get(t);
              (r ||
                ((r = ve(void 0, We, !0)), (r.factory = () => qt(r.multi)), this.records.set(t, r)),
                (t = e),
                r.multi.push(e));
            }
            this.records.set(t, n);
          }
          hydrate(e, t, n) {
            let r = v(null);
            try {
              if (t.value === Nr) throw bi('');
              return (
                t.value === We && ((t.value = Nr), (t.value = t.factory(void 0, n))),
                typeof t.value == 'object' &&
                  t.value &&
                  zl(t.value) &&
                  this._ngOnDestroyHooks.add(t.value),
                t.value
              );
            } finally {
              v(r);
            }
          }
          injectableDefInScope(e) {
            if (!e.providedIn) return !1;
            let t = P(e.providedIn);
            return typeof t == 'string'
              ? t === 'any' || this.scopes.has(t)
              : this.injectorDefTypes.has(t);
          }
          removeOnDestroy(e) {
            let t = this._onDestroyHooks.indexOf(e);
            t !== -1 && this._onDestroyHooks.splice(t, 1);
          }
        }));
      ((q = 0),
        (y = 1),
        (p = 2),
        (x = 3),
        (F = 4),
        (R = 5),
        (tt = 6),
        (nt = 7),
        (A = 8),
        (ae = 9),
        (J = 10),
        (H = 11),
        (He = 12),
        (Or = 13),
        (ke = 14),
        (B = 15),
        (Pe = 16),
        (ge = 17),
        (gt = 18),
        (mt = 19),
        (Oi = 20),
        ($ = 21),
        (Vt = 22),
        (Ae = 23),
        (V = 24),
        (jt = 25),
        (Zl = 26),
        (Jt = 27),
        (Q = 28),
        (Vi = 1),
        (_e = 7),
        (rt = 8),
        (it = 9),
        (j = 10));
      ((Ql = 'svg'), (ql = 'math'));
      ((_ = { lFrame: Qi(null), bindingsEnabled: !0, skipHydrationRootTNode: null }), (Yt = !1));
      Gi = qi;
      $i = !0;
      ((Mn = class Xi {
        static THROW_IF_NOT_FOUND = se;
        static NULL = new xi();
        static create(t, n) {
          if (Array.isArray(t)) return jr({ name: '' }, n, t, '');
          {
            let r = t.name ?? '';
            return jr({ name: r }, t.parent, t.providers, r);
          }
        }
        static ɵprov = N({ token: Xi, providedIn: 'any', factory: () => C(Ei) });
        static __NG_ELEMENT_ID__ = -1;
      }),
        (ee = new k('')),
        (Yi = class {
          static __NG_ELEMENT_ID__ = pu;
          static __NG_ENV_ID__ = (e) => e;
        }),
        (hu = class extends Yi {
          _lView;
          constructor(e) {
            (super(), (this._lView = e));
          }
          get destroyed() {
            return Se(this._lView);
          }
          onDestroy(e) {
            let t = this._lView;
            return (Pn(t, e), () => $l(t, e));
          }
        }));
      ((yu = !1),
        (vu = new k('')),
        (kt = (() => {
          class e {
            taskId = 0;
            pendingTasks = new Set();
            destroyed = !1;
            pendingTask = new fl(!1);
            debugTaskTracker = S(vu, { optional: !0 });
            get hasPendingTasks() {
              return this.destroyed ? !1 : this.pendingTask.value;
            }
            get hasPendingTasksObservable() {
              return this.destroyed
                ? new Oe((n) => {
                    (n.next(!1), n.complete());
                  })
                : this.pendingTask;
            }
            add() {
              !this.hasPendingTasks && !this.destroyed && this.pendingTask.next(!0);
              let n = this.taskId++;
              return (this.pendingTasks.add(n), this.debugTaskTracker?.add(n), n);
            }
            has(n) {
              return this.pendingTasks.has(n);
            }
            remove(n) {
              (this.pendingTasks.delete(n),
                this.debugTaskTracker?.remove(n),
                this.pendingTasks.size === 0 && this.hasPendingTasks && this.pendingTask.next(!1));
            }
            ngOnDestroy() {
              (this.pendingTasks.clear(),
                this.hasPendingTasks && this.pendingTask.next(!1),
                (this.destroyed = !0),
                this.pendingTask.unsubscribe());
            }
            static ɵprov = N({ token: e, providedIn: 'root', factory: () => new e() });
          }
          return e;
        })()),
        (gu = class extends Le {
          __isAsync;
          destroyRef = void 0;
          pendingTasks = void 0;
          constructor(e = !1) {
            (super(),
              (this.__isAsync = e),
              Ul() &&
                ((this.destroyRef = S(Yi, { optional: !0 }) ?? void 0),
                (this.pendingTasks = S(kt, { optional: !0 }) ?? void 0)));
          }
          emit(e) {
            let t = v(null);
            try {
              super.next(e);
            } finally {
              v(t);
            }
          }
          subscribe(e, t, n) {
            let r = e,
              i = t || (() => null),
              s = n;
            if (e && typeof e == 'object') {
              let l = e;
              ((r = l.next?.bind(l)), (i = l.error?.bind(l)), (s = l.complete?.bind(l)));
            }
            this.__isAsync &&
              ((i = this.wrapInTimeout(i)),
              r && (r = this.wrapInTimeout(r)),
              s && (s = this.wrapInTimeout(s)));
            let o = super.subscribe({ next: r, error: i, complete: s });
            return (e instanceof K && e.add(o), o);
          }
          wrapInTimeout(e) {
            return (t) => {
              let n = this.pendingTasks?.add();
              setTimeout(() => {
                try {
                  e(t);
                } finally {
                  n !== void 0 && this.pendingTasks?.remove(n);
                }
              });
            };
          }
        }),
        (W = gu));
      ((zn = 'isAngularZone'),
        (at = zn + '_ID'),
        (wu = 0),
        (te = class tn {
          hasPendingMacrotasks = !1;
          hasPendingMicrotasks = !1;
          isStable = !0;
          onUnstable = new W(!1);
          onMicrotaskEmpty = new W(!1);
          onStable = new W(!1);
          onError = new W(!1);
          constructor(t) {
            let {
              enableLongStackTrace: n = !1,
              shouldCoalesceEventChangeDetection: r = !1,
              shouldCoalesceRunChangeDetection: i = !1,
              scheduleInRootZone: s = yu,
            } = t;
            if (typeof Zone > 'u') throw new g(908, !1);
            Zone.assertZonePatched();
            let o = this;
            ((o._nesting = 0),
              (o._outer = o._inner = Zone.current),
              Zone.TaskTrackingZoneSpec &&
                (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())),
              n &&
                Zone.longStackTraceZoneSpec &&
                (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
              (o.shouldCoalesceEventChangeDetection = !i && r),
              (o.shouldCoalesceRunChangeDetection = i),
              (o.callbackScheduled = !1),
              (o.scheduleInRootZone = s),
              ku(o));
          }
          static isInAngularZone() {
            return typeof Zone < 'u' && Zone.current.get(zn) === !0;
          }
          static assertInAngularZone() {
            if (!tn.isInAngularZone()) throw new g(909, !1);
          }
          static assertNotInAngularZone() {
            if (tn.isInAngularZone()) throw new g(909, !1);
          }
          run(t, n, r) {
            return this._inner.run(t, n, r);
          }
          runTask(t, n, r, i) {
            let s = this._inner,
              o = s.scheduleEventTask('NgZoneEvent: ' + i, t, bu, ut, ut);
            try {
              return s.runTask(o, n, r);
            } finally {
              s.cancelTask(o);
            }
          }
          runGuarded(t, n, r) {
            return this._inner.runGuarded(t, n, r);
          }
          runOutsideAngular(t) {
            return this._outer.run(t);
          }
        }),
        (bu = {}));
      Su = class {
        hasPendingMicrotasks = !1;
        hasPendingMacrotasks = !1;
        isStable = !0;
        onUnstable = new W();
        onMicrotaskEmpty = new W();
        onStable = new W();
        onError = new W();
        run(e, t, n) {
          return e.apply(t, n);
        }
        runGuarded(e, t, n) {
          return e.apply(t, n);
        }
        runOutsideAngular(e) {
          return e();
        }
        runTask(e, t, n, r) {
          return e.apply(t, n);
        }
      };
      ze = class {
        _console = console;
        handleError(e) {
          this._console.error('ERROR', e);
        }
      };
      ((Tu = class extends Error {
        constructor(e) {
          (super(String(e), { cause: e }), (this.name = 'ErrorBoundaryWrappedError'));
        }
      }),
        (St = new k('', {
          factory: () => {
            let e = S(te),
              t = S(ue),
              n;
            return (r) => {
              e.runOutsideAngular(() => {
                t.destroyed && !n
                  ? setTimeout(() => {
                      throw r;
                    })
                  : ((n ??= t.get(ze)), n.handleError(r));
              });
            };
          },
        })),
        (Du = {
          provide: On,
          useValue: () => {
            let e = S(ze, { optional: !0 });
          },
          multi: !0,
        }),
        (Un = new k('', { factory: () => Au })),
        (Au = 'ng'),
        (Zn = new k('')),
        (Qn = new k('', { providedIn: 'platform', factory: () => 'unknown' })),
        (qn = new k('', {
          factory: () =>
            S(ee).body?.querySelector('[ngCspNonce]')?.getAttribute('ngCspNonce') || null,
        })),
        (ns = class {}),
        (Gn = new k('', { factory: () => !0 })),
        (Nu = new k('')),
        (Ou = (() => {
          class e {
            static ɵprov = N({ token: e, providedIn: 'root', factory: () => new Vu() });
          }
          return e;
        })()),
        (Vu = class {
          dirtyEffectCount = 0;
          queues = new Map();
          add(e) {
            (this.enqueue(e), this.schedule(e));
          }
          schedule(e) {
            e.dirty && this.dirtyEffectCount++;
          }
          remove(e) {
            let t = e.zone,
              n = this.queues.get(t);
            n.has(e) && (n.delete(e), e.dirty && this.dirtyEffectCount--);
          }
          enqueue(e) {
            let t = e.zone;
            this.queues.has(t) || this.queues.set(t, new Set());
            let n = this.queues.get(t);
            n.has(e) || n.add(e);
          }
          flush() {
            for (; this.dirtyEffectCount > 0; ) {
              let e = !1;
              for (let [t, n] of this.queues)
                t === null ? (e ||= this.flushQueue(n)) : (e ||= t.run(() => this.flushQueue(n)));
              e || (this.dirtyEffectCount = 0);
            }
          }
          flushQueue(e) {
            let t = !1;
            for (let n of e) n.dirty && (this.dirtyEffectCount--, (t = !0), n.run());
            return t;
          }
        }),
        (bf = class {
          [qe];
          constructor(e) {
            this[qe] = e;
          }
          destroy() {
            this[qe].destroy();
          }
        }));
      m = (function (e) {
        return (
          (e[(e.TemplateCreateStart = 0)] = 'TemplateCreateStart'),
          (e[(e.TemplateCreateEnd = 1)] = 'TemplateCreateEnd'),
          (e[(e.TemplateUpdateStart = 2)] = 'TemplateUpdateStart'),
          (e[(e.TemplateUpdateEnd = 3)] = 'TemplateUpdateEnd'),
          (e[(e.LifecycleHookStart = 4)] = 'LifecycleHookStart'),
          (e[(e.LifecycleHookEnd = 5)] = 'LifecycleHookEnd'),
          (e[(e.OutputStart = 6)] = 'OutputStart'),
          (e[(e.OutputEnd = 7)] = 'OutputEnd'),
          (e[(e.BootstrapApplicationStart = 8)] = 'BootstrapApplicationStart'),
          (e[(e.BootstrapApplicationEnd = 9)] = 'BootstrapApplicationEnd'),
          (e[(e.BootstrapComponentStart = 10)] = 'BootstrapComponentStart'),
          (e[(e.BootstrapComponentEnd = 11)] = 'BootstrapComponentEnd'),
          (e[(e.ChangeDetectionStart = 12)] = 'ChangeDetectionStart'),
          (e[(e.ChangeDetectionEnd = 13)] = 'ChangeDetectionEnd'),
          (e[(e.ChangeDetectionSyncStart = 14)] = 'ChangeDetectionSyncStart'),
          (e[(e.ChangeDetectionSyncEnd = 15)] = 'ChangeDetectionSyncEnd'),
          (e[(e.AfterRenderHooksStart = 16)] = 'AfterRenderHooksStart'),
          (e[(e.AfterRenderHooksEnd = 17)] = 'AfterRenderHooksEnd'),
          (e[(e.ComponentStart = 18)] = 'ComponentStart'),
          (e[(e.ComponentEnd = 19)] = 'ComponentEnd'),
          (e[(e.DeferBlockStateStart = 20)] = 'DeferBlockStateStart'),
          (e[(e.DeferBlockStateEnd = 21)] = 'DeferBlockStateEnd'),
          (e[(e.DynamicComponentStart = 22)] = 'DynamicComponentStart'),
          (e[(e.DynamicComponentEnd = 23)] = 'DynamicComponentEnd'),
          (e[(e.HostBindingsUpdateStart = 24)] = 'HostBindingsUpdateStart'),
          (e[(e.HostBindingsUpdateEnd = 25)] = 'HostBindingsUpdateEnd'),
          e
        );
      })(m || {});
      Hu = null;
      ((Pr = []),
        (w = function (e, t = null, n) {
          for (let r = 0; r < Pr.length; r++) {
            let i = Pr[r];
            i(e, t, n);
          }
        }));
      ((we = -1),
        (Wn = class {
          factory;
          name;
          injectImpl;
          resolving = !1;
          canSeeViewProviders;
          multi;
          componentProviders;
          index;
          providerFactory;
          constructor(e, t, n, r) {
            ((this.factory = e),
              (this.name = r),
              (this.canSeeViewProviders = t),
              (this.injectImpl = n));
          }
        }));
      rn = !0;
      ((Zu = 256), (ss = Zu - 1), (os = 5), (Qu = 0), (M = {}));
      Ne = class {
        _tNode;
        _lView;
        constructor(e, t) {
          ((this._tNode = e), (this._lView = t));
        }
        get(e, t, n) {
          return ds(this._tNode, this._lView, e, je(n), t);
        }
      };
      ea = (() => {
        class e {
          nativeElement;
          constructor(n) {
            this.nativeElement = n;
          }
          static __NG_ELEMENT_ID__ = Yu;
        }
        return e;
      })();
      ((ys = (function (e) {
        return (
          (e[(e.OnPush = 0)] = 'OnPush'),
          (e[(e.Eager = 1)] = 'Eager'),
          (e[(e.Default = 1)] = 'Default'),
          e
        );
      })(ys || {})),
        (vs = new Map()),
        (ta = 0));
      Ur = '__ngContext__';
      ((_s = !1), (sa = new k('', { factory: () => _s })), (Zr = new WeakMap()));
      la = (e, t, n, r) => {};
      aa = () => null;
      U = (function (e) {
        return (
          (e[(e.Emulated = 0)] = 'Emulated'),
          (e[(e.None = 2)] = 'None'),
          (e[(e.ShadowDom = 3)] = 'ShadowDom'),
          (e[(e.ExperimentalIsolatedShadowDom = 4)] = 'ExperimentalIsolatedShadowDom'),
          e
        );
      })(U || {});
      ya = 'ng-template';
      ((Ts = {}),
        (Ee = (function (e) {
          return ((e[(e.Important = 1)] = 'Important'), (e[(e.DashCase = 2)] = 'DashCase'), e);
        })(Ee || {})));
      ((Ds = new Set()),
        (_f =
          typeof document < 'u' && typeof document?.documentElement?.getAnimations == 'function'),
        (cn = new WeakMap()));
      ye = new WeakSet();
      ((Ns = (function (e) {
        return (
          (e[(e.CHANGE_DETECTION = 0)] = 'CHANGE_DETECTION'),
          (e[(e.AFTER_NEXT_RENDER = 1)] = 'AFTER_NEXT_RENDER'),
          e
        );
      })(Ns || {})),
        (Be = new k('')),
        (Gr = new Set()));
      ((Ca = (() => {
        class e {
          impl = null;
          execute() {
            this.impl?.execute();
          }
          static ɵprov = N({ token: e, providedIn: 'root', factory: () => new e() });
        }
        return e;
      })()),
        (dn = null));
      ja = Va;
      Et = (function (e) {
        return (
          (e[(e.None = 0)] = 'None'),
          (e[(e.SignalBased = 1)] = 'SignalBased'),
          (e[(e.HasDecoratorInputTransform = 2)] = 'HasDecoratorInputTransform'),
          e
        );
      })(Et || {});
      qa = () => null;
      Zs = [];
      uc = _n(bn({}, oi), {
        consumerIsAlwaysLive: !0,
        kind: 'template',
        consumerMarkedDirty: (e) => {
          bt(e.lView);
        },
        consumerOnSignalRead() {
          this.lView[V] = this;
        },
      });
      cc = _n(bn({}, oi), {
        consumerIsAlwaysLive: !0,
        kind: 'template',
        consumerMarkedDirty: (e) => {
          let t = de(e.lView);
          for (; t && !Qs(t[y]); ) t = de(t);
          t && Pi(t);
        },
        consumerOnSignalRead() {
          this.lView[V] = this;
        },
      });
      dc = 100;
      Ys = class {
        _lView;
        _cdRefInjectingView;
        _appRef = null;
        _attachedToViewContainer = !1;
        exhaustive;
        get rootNodes() {
          let e = this._lView,
            t = e[y];
          return ft(t, e, t.firstChild, []);
        }
        constructor(e, t) {
          ((this._lView = e), (this._cdRefInjectingView = t));
        }
        get context() {
          return this._lView[A];
        }
        set context(e) {
          this._lView[A] = e;
        }
        get destroyed() {
          return Se(this._lView);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            let e = this._lView[x];
            if (Z(e)) {
              let t = e[rt],
                n = t ? t.indexOf(this) : -1;
              n > -1 && (yn(e, n), et(t, n));
            }
            this._attachedToViewContainer = !1;
          }
          Vs(this._lView[y], this._lView);
        }
        onDestroy(e) {
          Pn(this._lView, e);
        }
        markForCheck() {
          nr(this._cdRefInjectingView || this._lView, 4);
        }
        detach() {
          this._lView[p] &= -129;
        }
        reattach() {
          (Xt(this._lView), (this._lView[p] |= 128));
        }
        detectChanges() {
          ((this._lView[p] |= 1024), Gs(this._lView));
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new g(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          this._appRef = null;
          let e = st(this._lView),
            t = this._lView[Pe];
          (t !== null && !e && er(t, this._lView), Os(this._lView[y], this._lView));
        }
        attachToAppRef(e) {
          if (this._attachedToViewContainer) throw new g(902, !1);
          this._appRef = e;
          let t = st(this._lView),
            n = this._lView[Pe];
          (n !== null && !t && Xs(n, this._lView), Xt(this._lView));
        }
      };
      Sc = () => null;
      ((Cc = class {}),
        (It = class {}),
        (Ec = (() => {
          class e {
            static ɵprov = N({ token: e, providedIn: 'root', factory: () => null });
          }
          return e;
        })()));
      ((Ft = {}),
        (xc = class {
          injector;
          parentInjector;
          constructor(e, t) {
            ((this.injector = e), (this.parentInjector = t));
          }
          get(e, t, n) {
            let r = this.injector.get(e, Ft, n);
            return r !== Ft || t === Ft ? r : this.parentInjector.get(e, t, n);
          }
        }));
      ((vn = Symbol('BINDING')), (Ue = new k('')));
      ((to = typeof ShadowRoot < 'u'), (Gc = typeof Document < 'u'));
      no = class {
        componentDef;
        ngModule;
        selector;
        componentType;
        ngContentSelectors;
        isBoundToModule;
        cachedInputs = null;
        cachedOutputs = null;
        get inputs() {
          return ((this.cachedInputs ??= Wc(this.componentDef.inputs)), this.cachedInputs);
        }
        get outputs() {
          return ((this.cachedOutputs ??= $c(this.componentDef.outputs)), this.cachedOutputs);
        }
        constructor(e, t) {
          ((this.componentDef = e),
            (this.ngModule = t),
            (this.componentType = e.type),
            (this.selector = ma(e.selectors)),
            (this.ngContentSelectors = e.ngContentSelectors ?? []),
            (this.isBoundToModule = !!t));
        }
        create(e, t, n, r, i, s, o, l) {
          w(m.DynamicComponentStart);
          let u = v(null);
          try {
            let a = this.componentDef,
              c = Kc(a, r || this.ngModule, e),
              d = Jc(c),
              h = d.tracingService;
            return h && h.componentCreate
              ? h.componentCreate(Ic(a), () => this.createComponentRef(d, c, t, n, i, s, o, l))
              : this.createComponentRef(d, c, t, n, i, s, o, l);
          } finally {
            v(u);
          }
        }
        createComponentRef(e, t, n, r, i, s, o, l) {
          let u = this.componentDef,
            a = td(r, u, s, i, l),
            c = e.rendererFactory.createRenderer(null, u),
            d = r ? Za(c, r, u.encapsulation, t) : Xc(u, c, o ?? null);
          Yc(d);
          let h = t.get(Ue, null),
            f = nd(d, () => t.get(ee, null) ?? ia());
          h && h.addHost(f);
          let E = s?.some(ri) || i?.some((T) => typeof T != 'function' && T.bindings.some(ri)),
            I = Ps(null, a, null, 512 | Fs(u), null, null, e, c, t, null, Ss(d, t, !0));
          (h &&
            to &&
            f instanceof ShadowRoot &&
            Pn(I, () => {
              h.removeHost(f);
            }),
            (I[Q] = d),
            Fn(I));
          let L = null;
          try {
            let T = Zc(Q, I, 2, '#host', () => a.directiveRegistry, !0, 0);
            (xs(c, d, T),
              Fe(d, I),
              Ba(a, I, T),
              ca(a, T, I),
              Qc(a, T),
              n !== void 0 && sd(T, this.ngContentSelectors, n),
              (L = ce(T.index, I)),
              (I[A] = L[A]),
              Bs(a, I, null));
          } catch (T) {
            throw (L !== null && on(L), on(I), T);
          } finally {
            (w(m.DynamicComponentEnd), Ln());
          }
          return new id(this.componentType, I, !!E);
        }
      };
      id = class extends Cc {
        _rootLView;
        _hasInputBindings;
        instance;
        hostView;
        changeDetectorRef;
        componentType;
        location;
        previousInputValues = null;
        _tNode;
        constructor(e, t, n) {
          (super(),
            (this._rootLView = t),
            (this._hasInputBindings = n),
            (this._tNode = Gl(t[y], Q)),
            (this.location = Xn(this._tNode, t)),
            (this.instance = ce(this._tNode.index, t)[A]),
            (this.hostView = this.changeDetectorRef = new Ys(t, void 0)),
            (this.componentType = e));
        }
        setInput(e, t) {
          this._hasInputBindings;
          let n = this._tNode;
          if (
            ((this.previousInputValues ??= new Map()),
            this.previousInputValues.has(e) && Object.is(this.previousInputValues.get(e), t))
          )
            return;
          let r = this._rootLView,
            i = ec(n, r[y], r, e, t);
          this.previousInputValues.set(e, t);
          let s = ce(n.index, r);
          nr(s, 1);
        }
        get injector() {
          return new Ne(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(e) {
          this.hostView.onDestroy(e);
        }
      };
      ir = (() => {
        class e {
          static __NG_ELEMENT_ID__ = od;
        }
        return e;
      })();
      ld = class ro extends ir {
        _lContainer;
        _hostTNode;
        _hostLView;
        constructor(t, n, r) {
          (super(), (this._lContainer = t), (this._hostTNode = n), (this._hostLView = r));
        }
        get element() {
          return Xn(this._hostTNode, this._hostLView);
        }
        get injector() {
          return new Ne(this._hostTNode, this._hostLView);
        }
        get parentInjector() {
          let t = Kn(this._hostTNode, this._hostLView);
          if (is(t)) {
            let n = dt(t, this._hostLView),
              r = ct(t),
              i = n[y].data[r + 8];
            return new Ne(i, n);
          } else return new Ne(null, this._hostLView);
        }
        clear() {
          for (; this.length > 0; ) this.remove(this.length - 1);
        }
        get(t) {
          let n = ii(this._lContainer);
          return (n !== null && n[t]) || null;
        }
        get length() {
          return this._lContainer.length - j;
        }
        createEmbeddedView(t, n, r) {
          let i, s, o;
          typeof r == 'number'
            ? (i = r)
            : r != null && ((i = r.index), (s = r.injector), (o = r.onError));
          let l = Xr(this._lContainer, t.ssrId),
            u = t.createEmbeddedViewImpl(n || {}, s, l);
          return (o && (u._lView[Jt] = o), this.insertImpl(u, i, Jr(this._hostTNode, l)), u);
        }
        createComponent(t, n, r, i, s, o, l) {
          let u,
            a,
            c = n || {};
          ((u = c.index),
            (r = c.injector),
            (i = c.projectableNodes),
            (s = c.environmentInjector || c.ngModuleRef),
            (o = c.directives),
            (l = c.bindings),
            (a = c.onError));
          let d = new no(Ve(t)),
            h = r || this.parentInjector;
          if (!s && d.ngModule == null) {
            let T = this.parentInjector.get(ue, null);
            T && (s = T);
          }
          let f = Ve(d.componentType ?? {}),
            E = Xr(this._lContainer, f?.id ?? null),
            I = E?.firstChild ?? null,
            L = d.create(h, i, I, s, o, l, this._getHostElementNamespace());
          return (
            a && (L.hostView._lView[Jt] = a),
            this.insertImpl(L.hostView, u, Jr(this._hostTNode, E)),
            L
          );
        }
        _getHostElementNamespace() {
          if (this._hostTNode.type & 2) {
            let t = this._hostTNode.parent ?? this._hostLView[R];
            return t !== null &&
              t.type & 2 &&
              typeof t.value == 'string' &&
              t.value.toLowerCase() === 'foreignobject'
              ? null
              : (t?.namespace ?? null);
          }
          return this._hostTNode.namespace;
        }
        insert(t, n) {
          return this.insertImpl(t, n, !0);
        }
        insertImpl(t, n, r) {
          let i = t._lView;
          if (Wl(i)) {
            let l = this.indexOf(t);
            if (l !== -1) this.detach(l);
            else {
              let u = i[x],
                a = new ro(u, u[R], u[x]);
              a.detach(a.indexOf(t));
            }
          }
          let s = this._adjustIndex(n),
            o = this._lContainer;
          return (mc(o, i, s, r), t.attachToViewContainerRef(), Ci(Lt(o), s, t), t);
        }
        move(t, n) {
          return this.insert(t, n);
        }
        indexOf(t) {
          let n = ii(this._lContainer);
          return n !== null ? n.indexOf(t) : -1;
        }
        remove(t) {
          let n = this._adjustIndex(t, -1),
            r = yn(this._lContainer, n);
          r && (et(Lt(this._lContainer), n), Vs(r[y], r));
        }
        detach(t) {
          let n = this._adjustIndex(t, -1),
            r = yn(this._lContainer, n);
          return r && et(Lt(this._lContainer), n) != null ? new Ys(r) : null;
        }
        _adjustIndex(t, n = 0) {
          return t ?? this.length + n;
        }
      };
      cd = dd;
      ((gn = class {}),
        (so = class extends gn {
          injector;
          instance = null;
          constructor(e) {
            super();
            let t = new Rn(
              [...e.providers, { provide: gn, useValue: this }],
              e.parent || jn(),
              e.debugName,
              new Set(['environment']),
            );
            ((this.injector = t), e.runEnvironmentInitializers && t.resolveInjectorInitializers());
          }
          destroy() {
            this.injector.destroy();
          }
          onDestroy(e) {
            this.injector.onDestroy(e);
          }
        }));
      pd = (() => {
        class e {
          _injector;
          cachedInjectors = new Map();
          constructor(n) {
            this._injector = n;
          }
          getOrCreateStandaloneInjector(n) {
            if (!n.standalone) return null;
            if (!this.cachedInjectors.has(n)) {
              let r = Ti(!1, n.type),
                i = r.length > 0 ? hd([r], this._injector, '') : null;
              this.cachedInjectors.set(n, i);
            }
            return this.cachedInjectors.get(n);
          }
          ngOnDestroy() {
            try {
              for (let n of this.cachedInjectors.values()) n !== null && n.destroy();
            } finally {
              this.cachedInjectors.clear();
            }
          }
          static ɵprov = N({ token: e, providedIn: 'environment', factory: () => new e(C(ue)) });
        }
        return e;
      })();
      ((_d = new k('')),
        (oo = (() => {
          class e {
            resolve;
            reject;
            initialized = !1;
            done = !1;
            donePromise = new Promise((n, r) => {
              ((this.resolve = n), (this.reject = r));
            });
            appInits = S(_d, { optional: !0 }) ?? [];
            injector = S(Mn);
            constructor() {}
            runInitializers() {
              if (this.initialized) return;
              let n = [];
              for (let i of this.appInits) {
                let s = Ni(this.injector, i);
                if (io(s)) n.push(s);
                else if (fd(s)) {
                  let o = new Promise((l, u) => {
                    s.subscribe({ complete: l, error: u });
                  });
                  n.push(o);
                }
              }
              let r = () => {
                ((this.done = !0), this.resolve());
              };
              (Promise.all(n)
                .then(() => {
                  r();
                })
                .catch((i) => {
                  this.reject(i);
                }),
                n.length === 0 && r(),
                (this.initialized = !0));
            }
            static ɵfac = function (n) {
              return new (n || e)();
            };
            static ɵprov = Jn({ token: e, factory: e.ɵfac });
          }
          return e;
        })()),
        (kd = new k('')),
        (Sd = new k('')));
      ((Ed = 10),
        (mn = (() => {
          class e {
            _runningTick = !1;
            _destroyed = !1;
            _destroyListeners = [];
            _views = [];
            internalErrorHandler = S(St);
            afterRenderManager = S(Ca);
            zonelessEnabled = S(Gn);
            rootEffectScheduler = S(Ou);
            dirtyFlags = 0;
            tracingSnapshot = null;
            allTestViews = new Set();
            autoDetectTestViews = new Set();
            includeAllTestViews = !1;
            afterTick = new Le();
            get allViews() {
              return [
                ...(this.includeAllTestViews ? this.allTestViews : this.autoDetectTestViews).keys(),
                ...this._views,
              ];
            }
            get destroyed() {
              return this._destroyed;
            }
            componentTypes = [];
            components = [];
            internalPendingTask = S(kt);
            get isStable() {
              return this.internalPendingTask.hasPendingTasksObservable.pipe(hl((n) => !n));
            }
            constructor() {
              S(Be, { optional: !0 });
            }
            whenStable() {
              let n;
              return new Promise((r) => {
                n = this.isStable.subscribe({
                  next: (i) => {
                    i && r();
                  },
                });
              }).finally(() => {
                n.unsubscribe();
              });
            }
            _injector = S(ue);
            _rendererFactory = null;
            get injector() {
              return this._injector;
            }
            bootstrap(n, r) {
              return this.bootstrapImpl(n, r);
            }
            bootstrapImpl(n, r, i = Mn.NULL) {
              return this._injector.get(te).run(() => {
                if ((w(m.BootstrapComponentStart), !this._injector.get(oo).done)) {
                  let I = '';
                  throw new g(405, I);
                }
                let s = Ve(n),
                  o = this._injector.get(gn),
                  l = new no(s, o);
                this.componentTypes.push(n);
                let { hostElement: u, directives: a, bindings: c } = Id(r),
                  d = u || l.selector,
                  h = l.create(i, [], d, o.injector, a, c),
                  f = h.location.nativeElement,
                  E = h.injector.get(kd, null);
                return (
                  E?.registerApplication(f),
                  h.onDestroy(() => {
                    (this.detachView(h.hostView),
                      Je(this.components, h),
                      E?.unregisterApplication(f));
                  }),
                  this._loadComponent(h),
                  w(m.BootstrapComponentEnd, h),
                  h
                );
              });
            }
            tick() {
              (this.zonelessEnabled || (this.dirtyFlags |= 1), this._tick());
            }
            _tick() {
              (w(m.ChangeDetectionStart),
                this.tracingSnapshot !== null
                  ? this.tracingSnapshot.run(Ns.CHANGE_DETECTION, this.tickImpl)
                  : this.tickImpl());
            }
            tickImpl = () => {
              if (this._runningTick) throw (w(m.ChangeDetectionEnd), new g(101, !1));
              let n = v(null);
              try {
                ((this._runningTick = !0), this.synchronize());
              } finally {
                ((this._runningTick = !1),
                  this.tracingSnapshot?.dispose(),
                  (this.tracingSnapshot = null),
                  v(n),
                  this.afterTick.next(),
                  w(m.ChangeDetectionEnd));
              }
            };
            synchronize() {
              this._rendererFactory === null &&
                !this._injector.destroyed &&
                (this._rendererFactory = this._injector.get(It, null, { optional: !0 }));
              let n = 0;
              for (; this.dirtyFlags !== 0 && n++ < Ed; ) {
                w(m.ChangeDetectionSyncStart);
                try {
                  this.synchronizeOnce();
                } finally {
                  w(m.ChangeDetectionSyncEnd);
                }
              }
            }
            synchronizeOnce() {
              this.dirtyFlags & 16 && ((this.dirtyFlags &= -17), this.rootEffectScheduler.flush());
              let n = !1;
              if (this.dirtyFlags & 7) {
                let r = !!(this.dirtyFlags & 1);
                ((this.dirtyFlags &= -8), (this.dirtyFlags |= 8));
                for (let { _lView: i } of this.allViews) {
                  if (!r && !lt(i)) continue;
                  let s = r && !this.zonelessEnabled ? 0 : 1;
                  (Gs(i, s), (n = !0));
                }
                if (((this.dirtyFlags &= -5), this.syncDirtyFlagsWithViews(), this.dirtyFlags & 23))
                  return;
              }
              (n || (this._rendererFactory?.begin?.(), this._rendererFactory?.end?.()),
                this.dirtyFlags & 8 && ((this.dirtyFlags &= -9), this.afterRenderManager.execute()),
                this.syncDirtyFlagsWithViews());
            }
            syncDirtyFlagsWithViews() {
              if (this.allViews.some(({ _lView: n }) => lt(n))) {
                this.dirtyFlags |= 2;
                return;
              } else this.dirtyFlags &= -8;
            }
            attachView(n) {
              let r = n;
              (this._views.push(r), r.attachToAppRef(this));
            }
            detachView(n) {
              let r = n;
              (Je(this._views, r), r.detachFromAppRef());
            }
            _loadComponent(n) {
              this.attachView(n.hostView);
              try {
                this.tick();
              } catch (r) {
                this.internalErrorHandler(r);
              }
              (this.components.push(n), this._injector.get(Sd, []).forEach((r) => r(n)));
            }
            ngOnDestroy() {
              if (!this._destroyed)
                try {
                  (this._destroyListeners.forEach((n) => n()),
                    this._views.slice().forEach((n) => n.destroy()));
                } finally {
                  ((this._destroyed = !0), (this._views = []), (this._destroyListeners = []));
                }
            }
            onDestroy(n) {
              return (this._destroyListeners.push(n), () => Je(this._destroyListeners, n));
            }
            destroy() {
              if (this._destroyed) throw new g(406, !1);
              let n = this._injector;
              n.destroy && !n.destroyed && n.destroy();
            }
            get viewCount() {
              return this._views.length;
            }
            static ɵfac = function (n) {
              return new (n || e)();
            };
            static ɵprov = Jn({ token: e, factory: e.ɵfac });
          }
          return e;
        })()));
      ((xd = (e, t, n, r, i) => (Ji(!0), Es(t[H], r, Wi()))), (pt = 'en-US'), (Td = pt));
      ((Ad = (e, t, n, r) => (Ji(!0), da(t[H], r))),
        (Nd = (() => {
          class e {
            applicationErrorHandler = S(St);
            appRef = S(mn);
            taskService = S(kt);
            ngZone = S(te);
            zonelessEnabled = S(Gn);
            tracing = S(Be, { optional: !0 });
            zoneIsDefined = typeof Zone < 'u' && !!Zone.root.run;
            schedulerTickApplyArgs = [{ data: { __scheduler_tick__: !0 } }];
            subscriptions = new K();
            angularZoneId = this.zoneIsDefined ? this.ngZone._inner?.get(at) : null;
            scheduleInRootZone =
              !this.zonelessEnabled && this.zoneIsDefined && (S(Nu, { optional: !0 }) ?? !1);
            cancelScheduledCallback = null;
            useMicrotaskScheduler = !1;
            runningTick = !1;
            pendingRenderTaskId = null;
            constructor() {
              (this.subscriptions.add(
                this.appRef.afterTick.subscribe(() => {
                  let n = this.taskService.add();
                  if (
                    !this.runningTick &&
                    (this.cleanup(), !this.zonelessEnabled || this.appRef.includeAllTestViews)
                  ) {
                    this.taskService.remove(n);
                    return;
                  }
                  (this.switchToMicrotaskScheduler(), this.taskService.remove(n));
                }),
              ),
                this.subscriptions.add(
                  this.ngZone.onUnstable.subscribe(() => {
                    this.runningTick || this.cleanup();
                  }),
                ));
            }
            switchToMicrotaskScheduler() {
              this.ngZone.runOutsideAngular(() => {
                let n = this.taskService.add();
                ((this.useMicrotaskScheduler = !0),
                  queueMicrotask(() => {
                    ((this.useMicrotaskScheduler = !1), this.taskService.remove(n));
                  }));
              });
            }
            notify(n) {
              if (!this.zonelessEnabled && n === 5) return;
              switch (n) {
                case 0:
                case 2: {
                  this.appRef.dirtyFlags |= 2;
                  break;
                }
                case 3:
                case 4:
                case 5:
                case 1: {
                  this.appRef.dirtyFlags |= 4;
                  break;
                }
                case 6: {
                  this.appRef.dirtyFlags |= 2;
                  break;
                }
                case 12: {
                  this.appRef.dirtyFlags |= 16;
                  break;
                }
                case 13: {
                  this.appRef.dirtyFlags |= 2;
                  break;
                }
                case 11:
                  break;
                default:
                  this.appRef.dirtyFlags |= 8;
              }
              if (
                ((this.appRef.tracingSnapshot =
                  this.tracing?.snapshot(this.appRef.tracingSnapshot) ?? null),
                !this.shouldScheduleTick())
              )
                return;
              let r = this.useMicrotaskScheduler ? mu : es;
              ((this.pendingRenderTaskId = this.taskService.add()),
                this.scheduleInRootZone
                  ? (this.cancelScheduledCallback = Zone.root.run(() => r(() => this.tick())))
                  : (this.cancelScheduledCallback = this.ngZone.runOutsideAngular(() =>
                      r(() => this.tick()),
                    )));
            }
            shouldScheduleTick() {
              return !(
                this.appRef.destroyed ||
                this.pendingRenderTaskId !== null ||
                this.runningTick ||
                this.appRef._runningTick ||
                (!this.zonelessEnabled &&
                  this.zoneIsDefined &&
                  Zone.current.get(at + this.angularZoneId))
              );
            }
            tick() {
              if (this.runningTick || this.appRef.destroyed) return;
              if (this.appRef.dirtyFlags === 0) {
                this.cleanup();
                return;
              }
              !this.zonelessEnabled && this.appRef.dirtyFlags & 7 && (this.appRef.dirtyFlags |= 1);
              let n = this.taskService.add();
              try {
                this.ngZone.run(
                  () => {
                    ((this.runningTick = !0), this.appRef._tick());
                  },
                  void 0,
                  this.schedulerTickApplyArgs,
                );
              } catch (r) {
                this.applicationErrorHandler(r);
              } finally {
                (this.taskService.remove(n), this.cleanup());
              }
            }
            ngOnDestroy() {
              (this.subscriptions.unsubscribe(), this.cleanup());
            }
            cleanup() {
              if (
                ((this.runningTick = !1),
                this.cancelScheduledCallback?.(),
                (this.cancelScheduledCallback = null),
                this.pendingRenderTaskId !== null)
              ) {
                let n = this.pendingRenderTaskId;
                ((this.pendingRenderTaskId = null), this.taskService.remove(n));
              }
            }
            static ɵfac = function (n) {
              return new (n || e)();
            };
            static ɵprov = Jn({ token: e, factory: e.ɵfac });
          }
          return e;
        })()));
      ((lo = new k('', { factory: () => S(lo, { optional: !0, skipSelf: !0 }) || Vd() })),
        (jd = 1e4),
        (kf = jd - 1e3),
        (wn = new k('')),
        (Rd = new k('')));
      Xe = null;
    });
  var ao = {};
  mr(ao, { LazyTestComponent: () => Bd });
  var Bd,
    co = gr(() => {
      or();
      Bd = class lr {
        static ɵfac = function (t) {
          return new (t || lr)();
        };
        static ɵcmp = xt({
          type: lr,
          selectors: [['app-lazy-test']],
          decls: 4,
          vars: 0,
          template: function (t, n) {
            t & 1 &&
              (ne(0, 'h2'),
              pe(1, 'Komponent \u0142adowany dynamicznie'),
              re(),
              ne(2, 'p'),
              pe(3, 'Je\u015Bli to widzisz, dynamiczny import dzia\u0142a!'),
              re());
          },
          encapsulation: 2,
        });
      };
    });
  var mf = {};
  mr(mf, { init: () => gf });
  or();
  var bo = null;
  function _o() {
    return bo;
  }
  function Ud(e) {
    bo ??= e;
  }
  var Zd = class {};
  function Qd(e, t) {
    t = encodeURIComponent(t);
    for (let n of e.split(';')) {
      let r = n.indexOf('='),
        [i, s] = r == -1 ? [n, ''] : [n.slice(0, r), n.slice(r + 1)];
      if (i.trim() !== t) continue;
      let o = s;
      try {
        o = decodeURIComponent(s);
      } catch {}
      return (o.length > 1 && o[0] === '"' && o[o.length - 1] === '"' && (o = o.slice(1, -1)), o);
    }
    return null;
  }
  var qd = 'browser',
    ko = class {
      _doc;
      constructor(e) {
        this._doc = e;
      }
      manager;
    },
    cr = (() => {
      class e extends ko {
        constructor(n) {
          super(n);
        }
        supports(n) {
          return !0;
        }
        addEventListener(n, r, i, s) {
          return (n.addEventListener(r, i, s), () => this.removeEventListener(n, r, i, s));
        }
        removeEventListener(n, r, i, s) {
          return n.removeEventListener(r, i, s);
        }
        static ɵfac = function (n) {
          return new (n || e)(C(ee));
        };
        static ɵprov = N({ token: e, factory: e.ɵfac });
      }
      return e;
    })(),
    dr = new k(''),
    So = (() => {
      class e {
        _zone;
        _plugins;
        _eventNameToPlugin = new Map();
        constructor(n, r) {
          ((this._zone = r),
            n.forEach((o) => {
              o.manager = this;
            }));
          let i = n.filter((o) => !(o instanceof cr));
          this._plugins = i.slice().reverse();
          let s = n.find((o) => o instanceof cr);
          s && this._plugins.push(s);
        }
        addEventListener(n, r, i, s) {
          return this._findPluginFor(r).addEventListener(n, r, i, s);
        }
        getZone() {
          return this._zone;
        }
        _findPluginFor(n) {
          let r = this._eventNameToPlugin.get(n);
          if (r) return r;
          if (((r = this._plugins.find((i) => i.supports(n))), !r)) throw new g(-5101, !1);
          return (this._eventNameToPlugin.set(n, r), r);
        }
        static ɵfac = function (n) {
          return new (n || e)(C(dr), C(te));
        };
        static ɵprov = N({ token: e, factory: e.ɵfac });
      }
      return e;
    })(),
    ur = 'ng-app-id';
  function fo(e) {
    for (let t of e) t.remove();
  }
  function ho(e, t) {
    let n = t.createElement('style');
    return ((n.textContent = e), n);
  }
  function Gd(e, t, n, r) {
    let i = e.head?.querySelectorAll(`style[${ur}="${t}"],link[${ur}="${t}"]`);
    if (!i || i.length === 0) return !1;
    for (let s of i)
      (s.removeAttribute(ur),
        s instanceof HTMLLinkElement
          ? r.set(s.href.slice(s.href.lastIndexOf('/') + 1), { usage: 0, elements: [s] })
          : s.textContent && n.set(s.textContent, { usage: 0, elements: [s] }));
    return !0;
  }
  function fr(e, t) {
    let n = t.createElement('link');
    return (n.setAttribute('rel', 'stylesheet'), n.setAttribute('href', e), n);
  }
  var po = (() => {
      class e {
        doc;
        appId;
        nonce;
        inline = new Map();
        external = new Map();
        hosts = new Set();
        constructor(n, r, i, s = {}) {
          ((this.doc = n),
            (this.appId = r),
            (this.nonce = i),
            Gd(n, r, this.inline, this.external) && this.hosts.add(n.head));
        }
        addStyles(n, r) {
          for (let i of n) this.addUsage(i, this.inline, ho);
          r?.forEach((i) => this.addUsage(i, this.external, fr));
        }
        removeStyles(n, r) {
          for (let i of n) this.removeUsage(i, this.inline);
          r?.forEach((i) => this.removeUsage(i, this.external));
        }
        addUsage(n, r, i) {
          let s = r.get(n);
          s
            ? s.usage++
            : r.set(n, {
                usage: 1,
                elements: [...this.hosts].map((o) => this.addElement(o, i(n, this.doc))),
              });
        }
        removeUsage(n, r) {
          let i = r.get(n);
          i && (i.usage--, i.usage <= 0 && (fo(i.elements), r.delete(n)));
        }
        ngOnDestroy() {
          for (let [, { elements: n }] of [...this.inline, ...this.external]) fo(n);
          this.hosts.clear();
        }
        addHost(n) {
          if (!this.hosts.has(n)) {
            this.hosts.add(n);
            for (let [r, { elements: i }] of this.inline)
              i.push(this.addElement(n, ho(r, this.doc)));
            for (let [r, { elements: i }] of this.external)
              i.push(this.addElement(n, fr(r, this.doc)));
          }
        }
        removeHost(n) {
          this.hosts.delete(n);
          for (let r of [...this.inline.values(), ...this.external.values()]) {
            let i = [];
            for (let s of r.elements) s.parentNode === n ? s.remove() : i.push(s);
            r.elements = i;
          }
        }
        addElement(n, r) {
          return (this.nonce && r.setAttribute('nonce', this.nonce), n.appendChild(r));
        }
        static ɵfac = function (n) {
          return new (n || e)(C(ee), C(Un), C(qn, 8), C(Qn));
        };
        static ɵprov = N({ token: e, factory: e.ɵfac });
      }
      return e;
    })(),
    ar = {
      svg: 'http://www.w3.org/2000/svg',
      xhtml: 'http://www.w3.org/1999/xhtml',
      xlink: 'http://www.w3.org/1999/xlink',
      xml: 'http://www.w3.org/XML/1998/namespace',
      xmlns: 'http://www.w3.org/2000/xmlns/',
      math: 'http://www.w3.org/1998/Math/MathML',
    },
    yr = /%COMP%/g,
    Co = '%COMP%',
    Wd = `_nghost-${Co}`,
    $d = `_ngcontent-${Co}`,
    Kd = !0,
    Jd = new k('', { factory: () => Kd }),
    Xd = new k('');
  function Yd(e) {
    return $d.replace(yr, e);
  }
  function ef(e) {
    return Wd.replace(yr, e);
  }
  function Eo(e, t) {
    return t.map((n) => n.replace(yr, e));
  }
  var yo = (() => {
      class e {
        eventManager;
        sharedStylesHost;
        appId;
        removeStylesOnCompDestroy;
        doc;
        ngZone;
        nonce;
        tracingService;
        rendererByCompId = new Map();
        defaultRenderer;
        cssVarNamespace;
        constructor(n, r, i, s, o, l, u = null, a = null, c = null) {
          ((this.eventManager = n),
            (this.sharedStylesHost = r),
            (this.appId = i),
            (this.removeStylesOnCompDestroy = s),
            (this.doc = o),
            (this.ngZone = l),
            (this.nonce = u),
            (this.tracingService = a),
            (this.cssVarNamespace = c ?? ''),
            (this.defaultRenderer = new vr(n, o, l, this.tracingService, this.cssVarNamespace)));
        }
        createRenderer(n, r) {
          if (!n || !r) return this.defaultRenderer;
          let i = this.getOrCreateRenderer(n, r);
          return (i instanceof mo ? i.applyToHost(n) : i instanceof hr && i.applyStyles(), i);
        }
        getOrCreateRenderer(n, r) {
          let i = this.rendererByCompId,
            s = i.get(r.id);
          if (!s) {
            let o = this.doc,
              l = this.ngZone,
              u = this.eventManager,
              a = this.sharedStylesHost,
              c = this.removeStylesOnCompDestroy,
              d = this.tracingService;
            switch (r.encapsulation) {
              case U.Emulated:
                s = new mo(u, a, r, this.appId, c, o, l, d, this.cssVarNamespace);
                break;
              case U.ShadowDom:
                return new go(u, n, r, o, l, this.nonce, d, this.cssVarNamespace, a);
              case U.ExperimentalIsolatedShadowDom:
                return new go(u, n, r, o, l, this.nonce, d, this.cssVarNamespace);
              default:
                s = new hr(u, a, r, c, o, l, d, this.cssVarNamespace);
                break;
            }
            i.set(r.id, s);
          }
          return s;
        }
        ngOnDestroy() {
          this.rendererByCompId.clear();
        }
        componentReplaced(n) {
          this.rendererByCompId.delete(n);
        }
        static ɵfac = function (n) {
          return new (n || e)(C(So), C(Ue), C(Un), C(Jd), C(ee), C(te), C(qn), C(Be, 8), C(Xd, 8));
        };
        static ɵprov = N({ token: e, factory: e.ɵfac });
      }
      return e;
    })(),
    vr = class {
      eventManager;
      doc;
      ngZone;
      tracingService;
      cssVarNamespace;
      data = Object.create(null);
      throwOnSyntheticProps = !0;
      constructor(e, t, n, r, i = '') {
        ((this.eventManager = e),
          (this.doc = t),
          (this.ngZone = n),
          (this.tracingService = r),
          (this.cssVarNamespace = i));
      }
      destroy() {}
      destroyNode = null;
      createElement(e, t) {
        return t ? this.doc.createElementNS(ar[t] || t, e) : this.doc.createElement(e);
      }
      createComment(e) {
        return this.doc.createComment(e);
      }
      createText(e) {
        return this.doc.createTextNode(e);
      }
      appendChild(e, t) {
        (vo(e) ? e.content : e).appendChild(t);
      }
      insertBefore(e, t, n) {
        if (e) {
          let r = vo(e) ? e.content : e;
          if (n != null && n.parentNode !== r) throw new g(-5106, !1);
          r.insertBefore(t, n);
        }
      }
      removeChild(e, t) {
        t.remove();
      }
      selectRootElement(e, t) {
        let n = typeof e == 'string' ? this.doc.querySelector(e) : e;
        if (!n) throw new g(-5104, !1);
        return (t || (n.textContent = ''), n);
      }
      parentNode(e) {
        return e.parentNode;
      }
      nextSibling(e) {
        return e.nextSibling;
      }
      setAttribute(e, t, n, r) {
        if (r) {
          t = r + ':' + t;
          let i = ar[r];
          i ? e.setAttributeNS(i, t, n) : e.setAttribute(t, n);
        } else e.setAttribute(t, n);
      }
      removeAttribute(e, t, n) {
        if (n) {
          let r = ar[n];
          r ? e.removeAttributeNS(r, t) : e.removeAttribute(`${n}:${t}`);
        } else e.removeAttribute(t);
      }
      addClass(e, t) {
        e.classList.add(t);
      }
      removeClass(e, t) {
        e.classList.remove(t);
      }
      setStyle(e, t, n, r) {
        let i = t.startsWith('--');
        (i && (t = t.replace('%NS%', this.cssVarNamespace)),
          i || r & (Ee.DashCase | Ee.Important)
            ? e.style.setProperty(t, n, r & Ee.Important ? 'important' : '')
            : (e.style[t] = n));
      }
      removeStyle(e, t, n) {
        let r = t.startsWith('--');
        (r && (t = t.replace('%NS%', this.cssVarNamespace)),
          r || n & Ee.DashCase ? e.style.removeProperty(t) : (e.style[t] = ''));
      }
      setProperty(e, t, n) {
        e != null && (e[t] = n);
      }
      setValue(e, t) {
        e.nodeValue = t;
      }
      listen(e, t, n, r) {
        if (typeof e == 'string' && ((e = _o().getGlobalEventTarget(this.doc, e)), !e))
          throw new g(-5102, !1);
        let i = this.decoratePreventDefault(n);
        return (
          this.tracingService?.wrapEventListener &&
            (i = this.tracingService.wrapEventListener(e, t, i)),
          this.eventManager.addEventListener(e, t, i, r)
        );
      }
      decoratePreventDefault(e) {
        return (t) => {
          if (t === '__ngUnwrap__') return e;
          e(t) === !1 && t.preventDefault();
        };
      }
    };
  function vo(e) {
    return e.tagName === 'TEMPLATE' && e.content !== void 0;
  }
  var go = class extends vr {
      hostEl;
      sharedStylesHost;
      shadowRoot;
      constructor(e, t, n, r, i, s, o, l, u) {
        (super(e, r, i, o, l),
          (this.hostEl = t),
          (this.sharedStylesHost = u),
          (this.shadowRoot = t.attachShadow({ mode: 'open' })),
          this.sharedStylesHost && this.sharedStylesHost.addHost(this.shadowRoot));
        let a = n.styles;
        a = Eo(n.id, a).map((d) => d.replace(/%NS%/g, l));
        for (let d of a) {
          let h = document.createElement('style');
          (s && h.setAttribute('nonce', s), (h.textContent = d), this.shadowRoot.appendChild(h));
        }
        let c = n.getExternalStyles?.();
        if (c)
          for (let d of c) {
            let h = fr(d, r);
            (s && h.setAttribute('nonce', s), this.shadowRoot.appendChild(h));
          }
      }
      nodeOrShadowRoot(e) {
        return e === this.hostEl ? this.shadowRoot : e;
      }
      appendChild(e, t) {
        return super.appendChild(this.nodeOrShadowRoot(e), t);
      }
      insertBefore(e, t, n) {
        return super.insertBefore(this.nodeOrShadowRoot(e), t, n);
      }
      removeChild(e, t) {
        return super.removeChild(null, t);
      }
      parentNode(e) {
        return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(e)));
      }
      destroy() {
        this.sharedStylesHost && this.sharedStylesHost.removeHost(this.shadowRoot);
      }
    },
    hr = class extends vr {
      sharedStylesHost;
      removeStylesOnCompDestroy;
      styles;
      styleUrls;
      constructor(e, t, n, r, i, s, o, l, u) {
        (super(e, i, s, o, l), (this.sharedStylesHost = t), (this.removeStylesOnCompDestroy = r));
        let a = n.styles,
          c = u ? Eo(u, a) : a;
        ((this.styles = c.map((d) => d.replace(/%NS%/g, l))),
          (this.styleUrls = n.getExternalStyles?.(u)));
      }
      applyStyles() {
        this.sharedStylesHost.addStyles(this.styles, this.styleUrls);
      }
      destroy() {
        this.removeStylesOnCompDestroy &&
          Ds.size === 0 &&
          this.sharedStylesHost.removeStyles(this.styles, this.styleUrls);
      }
    },
    mo = class extends hr {
      contentAttr;
      hostAttr;
      constructor(e, t, n, r, i, s, o, l, u) {
        let a = r + '-' + n.id;
        (super(e, t, n, i, s, o, l, u, a), (this.contentAttr = Yd(a)), (this.hostAttr = ef(a)));
      }
      applyToHost(e) {
        (this.applyStyles(), this.setAttribute(e, this.hostAttr, ''));
      }
      createElement(e, t) {
        let n = super.createElement(e, t);
        return (super.setAttribute(n, this.contentAttr, ''), n);
      }
    },
    tf = class Io extends Zd {
      supportsDOMEvents = !0;
      static makeCurrent() {
        Ud(new Io());
      }
      onAndCancel(t, n, r, i) {
        return (
          t.addEventListener(n, r, i),
          () => {
            t.removeEventListener(n, r, i);
          }
        );
      }
      dispatchEvent(t, n) {
        t.dispatchEvent(n);
      }
      remove(t) {
        t.remove();
      }
      createElement(t, n) {
        return ((n = n || this.getDefaultDocument()), n.createElement(t));
      }
      createHtmlDocument() {
        return document.implementation.createHTMLDocument('fakeTitle');
      }
      getDefaultDocument() {
        return document;
      }
      isElementNode(t) {
        return t.nodeType === Node.ELEMENT_NODE;
      }
      isShadowRoot(t) {
        return t instanceof DocumentFragment;
      }
      getGlobalEventTarget(t, n) {
        return n === 'window' ? window : n === 'document' ? t : n === 'body' ? t.body : null;
      }
      getBaseHref(t) {
        let n = nf();
        return n == null ? null : rf(n);
      }
      resetBaseElement() {
        Ze = null;
      }
      getUserAgent() {
        return window.navigator.userAgent;
      }
      getCookie(t) {
        return Qd(document.cookie, t);
      }
    },
    Ze = null;
  function nf() {
    return ((Ze = Ze || document.head.querySelector('base')), Ze ? Ze.getAttribute('href') : null);
  }
  function rf(e) {
    return new URL(e, document.baseURI).pathname;
  }
  var wo = ['alt', 'control', 'meta', 'shift'],
    sf = {
      '\b': 'Backspace',
      '	': 'Tab',
      '\x7F': 'Delete',
      '\x1B': 'Escape',
      Del: 'Delete',
      Esc: 'Escape',
      Left: 'ArrowLeft',
      Right: 'ArrowRight',
      Up: 'ArrowUp',
      Down: 'ArrowDown',
      Menu: 'ContextMenu',
      Scroll: 'ScrollLock',
      Win: 'OS',
    },
    of = {
      alt: (e) => e.altKey,
      control: (e) => e.ctrlKey,
      meta: (e) => e.metaKey,
      shift: (e) => e.shiftKey,
    },
    lf = (() => {
      class e extends ko {
        constructor(n) {
          super(n);
        }
        supports(n) {
          return e.parseEventName(n) != null;
        }
        addEventListener(n, r, i, s) {
          let o = e.parseEventName(r),
            l = e.eventCallback(o.fullKey, i, this.manager.getZone());
          return this.manager
            .getZone()
            .runOutsideAngular(() => _o().onAndCancel(n, o.domEventName, l, s));
        }
        static parseEventName(n) {
          let r = n.toLowerCase().split('.'),
            i = r.shift();
          if (r.length === 0 || !(i === 'keydown' || i === 'keyup')) return null;
          let s = e._normalizeKey(r.pop()),
            o = '',
            l = r.indexOf('code');
          if (
            (l > -1 && (r.splice(l, 1), (o = 'code.')),
            wo.forEach((a) => {
              let c = r.indexOf(a);
              c > -1 && (r.splice(c, 1), (o += a + '.'));
            }),
            (o += s),
            r.length != 0 || s.length === 0)
          )
            return null;
          let u = {};
          return ((u.domEventName = i), (u.fullKey = o), u);
        }
        static matchEventFullKeyCode(n, r) {
          let i = sf[n.key] || n.key,
            s = '';
          return (
            r.indexOf('code.') > -1 && ((i = n.code), (s = 'code.')),
            i == null || !i
              ? !1
              : ((i = i.toLowerCase()),
                i === ' ' ? (i = 'space') : i === '.' && (i = 'dot'),
                wo.forEach((o) => {
                  if (o !== i) {
                    let l = of[o];
                    l(n) && (s += o + '.');
                  }
                }),
                (s += i),
                s === r)
          );
        }
        static eventCallback(n, r, i) {
          return (s) => {
            e.matchEventFullKeyCode(s, n) && i.runGuarded(() => r(s));
          };
        }
        static _normalizeKey(n) {
          return n === 'esc' ? 'escape' : n;
        }
        static ɵfac = function (n) {
          return new (n || e)(C(ee));
        };
        static ɵprov = N({ token: e, factory: e.ɵfac });
      }
      return e;
    })();
  async function uf(e, t) {
    return uo(af(e, t));
  }
  function af(e, t) {
    return {
      platformRef: t?.platformRef,
      appProviders: [...pf, ...(e?.providers ?? [])],
      platformProviders: hf,
    };
  }
  function cf() {
    tf.makeCurrent();
  }
  function df() {
    return new ze();
  }
  function ff() {
    return (bs(document), document);
  }
  var hf = [
      { provide: Qn, useValue: qd },
      { provide: Zn, useValue: cf, multi: !0 },
      { provide: ee, useFactory: ff },
    ],
    pf = [
      { provide: vt, useValue: 'root' },
      { provide: ze, useFactory: df },
      { provide: dr, useClass: cr, multi: !0 },
      { provide: dr, useClass: lf, multi: !0 },
      yo,
      { provide: Ue, useClass: po },
      { provide: po, useExisting: Ue },
      So,
      { provide: It, useExisting: yo },
      [],
    ],
    yf = class pr {
      viewContainer = S(ir);
      async loadComponent() {
        let { LazyTestComponent: t } = await Promise.resolve().then(() => (co(), ao));
        this.viewContainer.createComponent(t);
      }
      static ɵfac = function (t) {
        return new (t || pr)();
      };
      static ɵcmp = xt({
        type: pr,
        selectors: [['aaa-registration-form']],
        decls: 6,
        vars: 0,
        consts: [[3, 'click']],
        template: function (t, n) {
          t & 1 &&
            (ne(0, 'h1'),
            pe(1, 'Rejestracja'),
            re(),
            ne(2, 'h1'),
            pe(3, 'Test chunk\xF3w Angulara'),
            re(),
            ne(4, 'button', 0),
            sr('click', function () {
              return n.loadComponent();
            }),
            pe(5, 'Za\u0142aduj komponent'),
            re());
        },
        styles: ['button[_ngcontent-%COMP%]{background:#00f;color:red}'],
      });
    },
    xo = async (e, t, n, r, i = '') => {
      let s = await uf(),
        o = s.bootstrap(yf, t),
        l = t.ownerDocument,
        u = l.createElement('style');
      return (
        (u.textContent = i),
        l.head.appendChild(u),
        o.setInput('data', n),
        o.setInput('formType', e),
        o.setInput('onSave', r),
        {
          destroy: () => {
            (s.destroy(), u.remove());
          },
          setData: (a) => o.setInput('data', a),
        }
      );
    };
  var vf = '';
  function gf(...e) {
    return xo(...e, vf);
  }
  return Oo(mf);
})();
