import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FEATURED_INSIGHTS } from '../data/websiteData';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PARTICLE_COLORS = ['#ef4444', '#dc2626', '#f87171', '#b91c1c', '#ffffff'];

const SplitWords = ({ text }) => {
  return (
    <span aria-label={text} style={{ display: 'inline-block' }}>
      {text.split(' ').map((word, wIdx) => (
        <span
          key={wIdx}
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            verticalAlign: 'top',
            marginRight: '0.28em'
          }}
        >
          <span
            className="split-word-inner"
            style={{
              display: 'inline-block',
              transform: 'translateY(120%) rotateX(-40deg)',
              transformOrigin: 'bottom center',
              willChange: 'transform'
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
};

export default function FeaturedInsightsSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const laserPathRef = useRef(null);
  const laserOrbRef = useRef(null);
  const laserGlowRef = useRef(null);

  const cardsRef = useRef([]);
  const imagesRef = useRef([]);
  const accentsRef = useRef([]);
  const burstsRef = useRef([]);

  // Resize listener
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    setMounted(true);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Micro particle burst when each card lands
  const triggerBurst = useCallback((idx) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const container = burstsRef.current[idx];
    if (!container) return;
    const dots = container.children;
    Array.from(dots).forEach((dot, dIdx) => {
      const angle = (2 * Math.PI * dIdx) / dots.length + (Math.random() - 0.5);
      const dist = 40 + 70 * Math.random();
      const nx = Math.cos(angle) * dist;
      const ny = Math.sin(angle) * dist - 30;
      const sz = 3 + 3 * Math.random();
      gsap.set(dot, { x: 0, y: 0, width: sz, height: sz, opacity: 1, scale: 1 });
      gsap.to(dot, {
        x: nx,
        y: ny,
        scale: 0,
        opacity: 0,
        rotation: 360 * Math.random(),
        duration: 0.5 + 0.3 * Math.random(),
        ease: 'power3.out'
      });
    });
  }, []);

  // GSAP ScrollTrigger timeline matching live Ozrit
  useEffect(() => {
    if (!mounted) return;

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const section = sectionRef.current;
    const heading = headingRef.current;
    const subtitle = subtitleRef.current;
    const cards = cardsRef.current.filter(Boolean);
    const accents = accentsRef.current.filter(Boolean);
    const laserPath = laserPathRef.current;
    const laserOrb = laserOrbRef.current;
    const laserGlow = laserGlowRef.current;

    if (!section || !heading || cards.length === 0) return;

    if (isReduced) {
      const words = heading.querySelectorAll('.split-word-inner');
      gsap.set(words, { y: 0, rotateX: 0 });
      if (subtitle) gsap.set(subtitle, { y: 0, opacity: 1 });
      gsap.set(cards, { y: 0, opacity: 1, scale: 1, rotateX: 0, rotateY: 0 });
      return;
    }

    // Set SVG laser path initial state
    let totalLen = 0;
    if (laserPath && !isMobile) {
      try {
        totalLen = laserPath.getTotalLength();
        gsap.set(laserPath, { strokeDasharray: totalLen, strokeDashoffset: totalLen });
      } catch (e) {
        // SVG length fallback
      }
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 0.6
      }
    });

    // 1. Heading Word Split Reveal
    const words = heading.querySelectorAll('.split-word-inner');
    if (words.length > 0) {
      tl.fromTo(
        words,
        { y: '120%', rotateX: -40 },
        { y: '0%', rotateX: 0, duration: 0.12, stagger: 0.03, ease: 'power4.out' },
        0
      );
    }

    // 2. Subtitle entrance
    if (subtitle) {
      tl.fromTo(subtitle, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.1, ease: 'power2.out' }, 0.1);
    }

    // 3. Laser Curve Trace & Glowing Orb
    if (laserPath && totalLen > 0 && !isMobile) {
      tl.fromTo(
        laserPath,
        { strokeDashoffset: totalLen },
        { strokeDashoffset: 0, duration: 0.35, ease: 'power1.inOut' },
        0.12
      );

      if (laserOrb) {
        tl.fromTo(laserOrb, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.03 }, 0.12);
        tl.to(
          {},
          {
            duration: 0.35,
            onUpdate: function () {
              const prog = this.progress();
              const pt = laserPath.getPointAtLength(prog * totalLen);
              gsap.set(laserOrb, { x: pt.x, y: pt.y });
              if (laserGlow) {
                gsap.to(laserGlow, { x: pt.x, y: pt.y, duration: 0.15, ease: 'power2.out' });
              }
            }
          },
          0.12
        );
        tl.to(laserOrb, { opacity: 0, scale: 3, duration: 0.04, ease: 'power2.in' }, 0.47);
        if (laserGlow) {
          tl.to(laserGlow, { opacity: 0, scale: 2, duration: 0.04 }, 0.47);
        }
      }
    }

    // 4. Cards 3D Entrance & Accent Overlay Wipe
    cards.forEach((card, idx) => {
      if (isMobile) {
        gsap.set(card, { y: 40, opacity: 0 });
        const mobCardTl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 40%',
            scrub: 0.8
          }
        });
        mobCardTl.fromTo(card, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }, 0);
        if (accents[idx]) {
          mobCardTl.fromTo(
            accents[idx],
            { scaleX: 1, transformOrigin: 'left center' },
            { scaleX: 0, transformOrigin: 'right center', duration: 0.4, ease: 'power2.inOut' },
            0.12
          );
        }
      } else {
        const startTime = 0.15 + 0.08 * idx;
        tl.fromTo(
          card,
          {
            y: 50,
            opacity: 0,
            scale: 0.88,
            rotateX: 10,
            rotateY: idx % 2 === 0 ? -6 : 6,
            transformOrigin: 'center bottom',
            transformPerspective: 1000
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            rotateY: 0,
            duration: 0.2,
            ease: 'power3.out',
            onComplete: () => triggerBurst(idx)
          },
          startTime
        );

        if (accents[idx]) {
          tl.fromTo(
            accents[idx],
            { scaleX: 1, transformOrigin: 'left center' },
            { scaleX: 0, transformOrigin: 'right center', duration: 0.15, ease: 'power2.inOut' },
            startTime + 0.05
          );
        }
      }
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section || st.trigger?.closest?.('#insights-section')) {
          st.kill();
        }
      });
    };
  }, [mounted, isMobile, triggerBurst]);

  // MouseMove 3D Tilt on Hover
  const handleMouseMove = (e, idx) => {
    if (isMobile || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const card = cardsRef.current[idx];
    const img = imagesRef.current[idx];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotateY: 10 * nx,
      rotateX: -(8 * ny),
      y: -6,
      boxShadow: `${16 * nx}px ${16 + 8 * ny}px 40px rgba(0, 0, 0, 0.4), 0 0 24px rgba(239, 68, 68, 0.12)`,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto'
    });

    if (img) {
      gsap.to(img, { scale: 1.08, duration: 0.5, ease: 'power2.out', overwrite: 'auto' });
    }
  };

  const handleMouseLeave = (idx) => {
    if (isMobile) return;
    const card = cardsRef.current[idx];
    const img = imagesRef.current[idx];

    if (card) {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        y: 0,
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
        duration: 0.5,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }

    if (img) {
      gsap.to(img, { scale: 1.04, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
    }
  };

  return (
    <section
      id="insights-section"
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#000000',
        padding: '95px 24px 120px 24px',
        overflow: 'hidden'
      }}
    >
      {/* Background Animated Laser Wave Curve matching live Ozrit */}
      {mounted && !isMobile && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 1,
            overflow: 'visible'
          }}
        >
          <svg
            viewBox="0 0 1200 500"
            fill="none"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'visible' }}
            preserveAspectRatio="none"
          >
            <path
              ref={laserPathRef}
              d="M -20 60 C 150 60, 200 380, 500 250 S 850 420, 1000 200 Q 1100 100, 1220 280"
              stroke="url(#insightGrad)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="insightGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.5" />
                <stop offset="40%" stopColor="#dc2626" stopOpacity="0.7" />
                <stop offset="70%" stopColor="#ef4444" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#b91c1c" stopOpacity="0.6" />
              </linearGradient>
            </defs>
          </svg>

          {/* Traveling Glowing Laser Orb */}
          <div
            ref={laserOrbRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #ffffff 0%, #ef4444 50%, transparent 100%)',
              boxShadow: '0 0 16px 6px rgba(239, 68, 68, 0.7), 0 0 40px 14px rgba(220, 38, 38, 0.4)',
              opacity: 0,
              pointerEvents: 'none'
            }}
          />

          {/* Ambient Glow Aura */}
          <div
            ref={laserGlowRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(239, 68, 68, 0.4) 0%, transparent 70%)',
              opacity: 0,
              filter: 'blur(5px)',
              pointerEvents: 'none'
            }}
          />
        </div>
      )}

      <div style={{ maxWidth: '1440px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <div ref={headingRef} style={{ marginBottom: '50px', position: 'relative', zIndex: 10 }}>
          <p
            style={{
              fontSize: '12.5px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.25em',
              color: '#f87171',
              marginBottom: '10px'
            }}
          >
            THOUGHT LEADERSHIP
          </p>
          <h2
            style={{
              fontSize: 'clamp(2.4rem, 4.2vw, 3.8rem)',
              fontWeight: '800',
              color: '#ffffff',
              letterSpacing: '-0.03em',
              margin: '0 0 14px 0',
              lineHeight: 1.15,
              perspective: '600px'
            }}
          >
            {mounted ? <SplitWords text="Featured Insights" /> : 'Featured Insights'}
          </h2>
          <p
            ref={subtitleRef}
            style={{
              fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
              color: 'rgba(255, 255, 255, 0.55)',
              maxWidth: '750px',
              lineHeight: 1.6,
              margin: 0
            }}
          >
            Practical insights from real-world enterprise system design and delivery.
          </p>
        </div>

        {/* 4 Article Cards Grid with 3D Perspective */}
        <div
          className="oz-insights-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, minmax(0, 1fr))',
            gap: '24px',
            perspective: '1200px',
            position: 'relative',
            zIndex: 10
          }}
        >
          {FEATURED_INSIGHTS.map((article, idx) => (
            <div
              key={idx}
              data-card
              ref={(el) => (cardsRef.current[idx] = el)}
              onMouseMove={(e) => handleMouseMove(e, idx)}
              onMouseLeave={() => handleMouseLeave(idx)}
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '20px',
                backgroundColor: '#0a0a0a',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                cursor: 'pointer',
                transformStyle: 'preserve-3d',
                willChange: 'transform',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                overflow: 'hidden',
                transition: 'border-color 0.3s ease'
              }}
              className="group"
            >
              {/* Micro-particle burst container */}
              <div
                ref={(el) => (burstsRef.current[idx] = el)}
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  overflow: 'visible',
                  zIndex: 30
                }}
              >
                {Array.from({ length: 12 }).map((_, dIdx) => (
                  <div
                    key={dIdx}
                    style={{
                      position: 'absolute',
                      borderRadius: '50%',
                      background: PARTICLE_COLORS[dIdx % PARTICLE_COLORS.length],
                      opacity: 0,
                      top: '40%',
                      left: '50%',
                      width: '4px',
                      height: '4px'
                    }}
                  />
                ))}
              </div>

              {/* Image Container with Fixed Height 195px */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '195px',
                  borderRadius: '18px 18px 0 0',
                  overflow: 'hidden'
                }}
              >
                <div
                  ref={(el) => (imagesRef.current[idx] = el)}
                  style={{
                    width: '100%',
                    height: '100%',
                    willChange: 'transform',
                    transform: 'scale(1.04)'
                  }}
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                </div>

                {/* Accent Wipe Color Overlay (fromTo scaleX: 1 -> 0) */}
                <div
                  ref={(el) => (accentsRef.current[idx] = el)}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 10,
                    backgroundColor: article.accent || '#ef4444',
                    transformOrigin: 'right center'
                  }}
                />

                {/* Dark Hover Tint */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    transition: 'background-color 0.4s ease',
                    zIndex: 5
                  }}
                  className="group-hover:bg-black/20"
                />

                {/* Category Pill */}
                <div style={{ position: 'absolute', top: '14px', left: '14px', zIndex: 15 }}>
                  <span
                    style={{
                      padding: '4px 12px',
                      fontSize: '10.5px',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: '#ffffff',
                      backgroundColor: 'rgba(0, 0, 0, 0.65)',
                      backdropFilter: 'blur(8px)',
                      borderRadius: '9999px',
                      border: '1px solid rgba(255, 255, 255, 0.15)'
                    }}
                  >
                    {article.tag || 'ARTICLES'}
                  </span>
                </div>

                {/* Floating Action Button (Slides up & fades in on hover) */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '14px',
                    right: '14px',
                    zIndex: 15,
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(4px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transform: 'translateY(12px)',
                    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  className="group-hover:opacity-100 group-hover:translate-y-0"
                >
                  <ArrowUpRight size={18} color="#111827" strokeWidth={2.5} />
                </div>
              </div>

              {/* Text Card Body */}
              <div
                style={{
                  padding: '22px 20px',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '170px'
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: '700',
                      color: '#ef4444',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      marginBottom: '8px'
                    }}
                  >
                    {article.category} · {article.readTime}
                  </div>
                  <h3
                    style={{
                      fontSize: '16px',
                      fontWeight: '700',
                      color: '#ffffff',
                      lineHeight: 1.45,
                      margin: 0,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {article.title}
                  </h3>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '16px',
                    marginTop: '16px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    fontSize: '12.5px',
                    fontWeight: '600',
                    color: 'rgba(255, 255, 255, 0.6)'
                  }}
                >
                  <span className="group-hover:text-white transition-colors duration-200">Read Article</span>
                  <ArrowUpRight size={15} color="#ef4444" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
