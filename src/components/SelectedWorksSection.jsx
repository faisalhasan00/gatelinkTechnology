import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, ExternalLink, X, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CASE_STUDIES } from '../data/websiteData';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const isDarkBg = (bg) => {
  if (!bg) return true;
  if (['#191414', '#111111', '#FF5A5F', '#0D1B2A', '#0F2417', '#1A1713', '#0A151E', '#0C1E30', '#090909', '#080808'].includes(bg)) return true;
  if (bg.startsWith('#') && (bg.length === 7 || bg.length === 4)) {
    let hex = bg.slice(1);
    if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('');
    const r = parseInt(hex.substring(0, 2), 16) || 0;
    const g = parseInt(hex.substring(2, 4), 16) || 0;
    const b = parseInt(hex.substring(4, 6), 16) || 0;
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    return luminance < 140;
  }
  return true;
};
const getTextColor = (bg) => (isDarkBg(bg) ? '#ffffff' : '#111827');
const getSubTextColor = (bg) => (isDarkBg(bg) ? 'rgba(255,255,255,0.72)' : 'rgba(0,0,0,0.65)');

const HeadingChars = ({ text }) => (
  <span aria-label={text} style={{ display: 'inline-block' }}>
    {text.split('').map((char, r) => (
      <span
        key={r}
        className="cs-heading-char"
        style={{
          display: 'inline-block',
          opacity: 0,
          transform: 'translateY(20px)',
          willChange: 'transform, opacity'
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))}
  </span>
);

export default function SelectedWorksSection() {
  const [activeModalCase, setActiveModalCase] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const eyebrowRef = useRef(null);
  const subRef = useRef(null);
  const trackContainerRef = useRef(null);
  const trackRef = useRef(null);
  const cardsRef = useRef([]);
  const glareRef = useRef([]);
  const activeHoverIndexRef = useRef(null);

  // Resize handler
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    setMounted(true);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Desktop Pin & Horizontal Scroll & 3D Tilt Animations (matching live Ozrit)
  useEffect(() => {
    if (!mounted || isMobile) return;

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const section = sectionRef.current;
    const heading = headingRef.current;
    const eyebrow = eyebrowRef.current;
    const subtitle = subRef.current;
    const container = trackContainerRef.current;
    const track = trackRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !container || !track || cards.length === 0) return;

    const cardWidth = window.innerWidth < 1024 ? 360 : 420;
    cards.forEach((card) => {
      card.style.width = `${cardWidth}px`;
    });

    const totalTrackWidth = cards.length * cardWidth + (cards.length - 1) * 24 + 80;
    const scrollDistance = Math.max(0, totalTrackWidth - container.offsetWidth);

    // 1. Entrance timeline matching live Ozrit 3bwciyz9rne7e.js
    const entranceTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        end: 'top 15%',
        scrub: isReduced ? false : 0.6
      }
    });

    if (eyebrow) {
      entranceTl.fromTo(eyebrow, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.15, ease: 'power2.out' }, 0);
    }

    if (heading) {
      const chars = heading.querySelectorAll('.cs-heading-char');
      entranceTl.fromTo(chars, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.15, stagger: 0.015, ease: 'power3.out' }, 0);
    }

    if (subtitle) {
      entranceTl.fromTo(subtitle, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.15, ease: 'power2.out' }, 0.1);
    }

    cards.forEach((card, idx) => {
      entranceTl.fromTo(
        card,
        { y: isReduced ? 0 : 45, opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, duration: 0.3, ease: 'power3.out' },
        0.15 + 0.18 * idx
      );
    });

    // 2. Section Pin & Horizontal Scrub
    const pinTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${scrollDistance + 0.35 * window.innerHeight}`,
        pin: true,
        scrub: isReduced ? false : 0.6,
        anticipatePin: 1
      }
    });

    if (scrollDistance > 0) {
      pinTl.fromTo(track, { x: 0 }, { x: -scrollDistance, ease: 'none', duration: 1 }, 0);
    }

    // 3. Mousemove 3D Perspective Tilt on hovered card
    const onMouseMove = (e) => {
      if (isReduced) return;
      const activeIdx = activeHoverIndexRef.current;
      if (activeIdx === null || activeIdx === undefined) return;
      const card = cardsRef.current[activeIdx];
      const glare = glareRef.current[activeIdx];
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(card, {
        rotateY: 12 * nx,
        rotateX: -(10 * ny),
        duration: 0.25,
        ease: 'power2.out',
        transformPerspective: 1000,
        overwrite: 'auto'
      });

      if (glare) {
        gsap.set(glare, {
          background: `radial-gradient(circle at ${(nx + 0.5) * 100}% ${(ny + 0.5) * 100}%, rgba(255,255,255,0.22) 0%, transparent 60%)`
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      entranceTl.kill();
      pinTl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
      });
    };
  }, [isMobile, mounted]);

  // Mobile layout entrance animation
  useEffect(() => {
    if (!mounted || !isMobile) return;

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const section = sectionRef.current;
    const heading = headingRef.current;
    const eyebrow = eyebrowRef.current;
    const subtitle = subRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section) return;

    if (isReduced) {
      if (heading) gsap.set(heading.querySelectorAll('.cs-heading-char'), { opacity: 1, y: 0 });
      if (eyebrow) gsap.set(eyebrow, { opacity: 1 });
      if (subtitle) gsap.set(subtitle, { opacity: 1, y: 0 });
      gsap.set(cards, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    const mobTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        end: 'top 15%',
        scrub: 0.8
      }
    });

    if (eyebrow) mobTl.fromTo(eyebrow, { opacity: 0 }, { opacity: 1, duration: 0.05 }, 0);
    if (heading) {
      const chars = heading.querySelectorAll('.cs-heading-char');
      mobTl.fromTo(chars, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.08, stagger: 0.015, ease: 'power3.out' }, 0);
    }
    if (subtitle) mobTl.fromTo(subtitle, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.08, ease: 'power2.out' }, 0.1);

    cards.forEach((card, idx) => {
      mobTl.fromTo(
        card,
        { opacity: 0, y: 40, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: 'power3.out' },
        0.15 + 0.12 * idx
      );
    });

    return () => {
      mobTl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
      });
    };
  }, [isMobile, mounted]);

  // Card hover handling
  const handleCardEnter = (idx) => {
    if (isMobile || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    activeHoverIndexRef.current = idx;
    const card = cardsRef.current[idx];
    const glare = glareRef.current[idx];

    if (card) {
      gsap.to(card, {
        scale: 1.035,
        z: 40,
        boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }
    if (glare) {
      gsap.to(glare, { opacity: 1, duration: 0.25, overwrite: 'auto' });
    }
  };

  const handleCardLeave = (idx) => {
    if (isMobile) return;
    if (activeHoverIndexRef.current === idx) {
      activeHoverIndexRef.current = null;
    }
    const card = cardsRef.current[idx];
    const glare = glareRef.current[idx];

    if (card) {
      gsap.to(card, {
        scale: 1,
        rotateY: 0,
        rotateX: 0,
        z: 0,
        boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
        duration: 0.45,
        ease: 'power2.inOut',
        overwrite: 'auto'
      });
    }
    if (glare) {
      gsap.to(glare, { opacity: 0, duration: 0.25, overwrite: 'auto' });
    }
  };

  const scrollByAmount = (direction) => {
    const delta = direction === 'left' ? -460 : 460;
    window.scrollBy({ top: delta, behavior: 'smooth' });
  };

  return (
    <section
      id="case-studies"
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#090909',
        padding: '95px 0 80px 0',
        overflow: 'hidden'
      }}
    >
      {/* Top Right "View All Case Studies" Pill matching live Ozrit */}
      <div
        style={{
          position: 'absolute',
          top: '100px',
          right: '36px',
          zIndex: 20
        }}
        className="hidden md:flex"
      >
        <a
          href="#contact-section"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 22px',
            borderRadius: '9999px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'rgba(255, 255, 255, 0.85)',
            fontSize: '13.5px',
            fontWeight: '600',
            textDecoration: 'none',
            backgroundColor: 'transparent',
            transition: 'all 0.25s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#ffffff';
            e.currentTarget.style.color = '#000000';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)';
          }}
        >
          <span>View All Case Studies</span>
          <ArrowUpRight size={15} />
        </a>
      </div>

      {/* Header Container */}
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center', marginBottom: '35px' }}>
          <p
            ref={eyebrowRef}
            style={{
              fontSize: '13px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.25em',
              color: '#00C2FF',
              marginBottom: '12px'
            }}
          >
            SELECTED WORKS
          </p>

          <h2
            ref={headingRef}
            style={{
              fontSize: 'clamp(2.4rem, 4.8vw, 4.4rem)',
              fontWeight: '800',
              color: '#ffffff',
              letterSpacing: '-0.03em',
              margin: '0 0 14px 0',
              lineHeight: 1.15
            }}
          >
            {mounted ? <HeadingChars text="Case Studies" /> : 'Case Studies'}
          </h2>

          <p
            ref={subRef}
            style={{
              fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
              color: 'rgba(255, 255, 255, 0.75)',
              maxWidth: '850px',
              margin: '0 auto',
              lineHeight: 1.6
            }}
          >
            Explore our featured production deployments — delivering autonomous AI, high-velocity mobile commerce, luxury digital platforms, and real-time enterprise SaaS.
          </p>
        </div>

        {/* Carousel Navigation Buttons on Desktop */}
        <div
          style={{
            display: isMobile ? 'none' : 'flex',
            justifyContent: 'flex-end',
            gap: '10px',
            marginBottom: '15px',
            paddingRight: '12px'
          }}
        >
          <button
            onClick={() => scrollByAmount('left')}
            aria-label="Previous case studies"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0066FF';
              e.currentTarget.style.borderColor = '#00C2FF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
            }}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scrollByAmount('right')}
            aria-label="Next case studies"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0066FF';
              e.currentTarget.style.borderColor = '#00C2FF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
            }}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Desktop Pinned Horizontal Strip */}
      {!isMobile && (
        <div
          ref={trackContainerRef}
          style={{
            position: 'relative',
            width: '100%',
            userSelect: 'none',
            overflow: 'hidden',
            height: 'clamp(460px, 60vh, 580px)'
          }}
        >
          <div
            ref={trackRef}
            style={{
              position: 'absolute',
              top: '50%',
              left: '40px',
              transform: 'translateY(-50%)',
              display: 'flex',
              gap: '24px',
              willChange: 'transform',
              paddingRight: '60px'
            }}
          >
            {CASE_STUDIES.map((study, idx) => (
              <div
                key={study.id}
                ref={(el) => (cardsRef.current[idx] = el)}
                onMouseEnter={() => handleCardEnter(idx)}
                onMouseLeave={() => handleCardLeave(idx)}
                onClick={() => setActiveModalCase(study)}
                style={{
                  width: '420px',
                  height: 'clamp(440px, 54vh, 530px)',
                  backgroundColor: study.bg || '#F9F7F4',
                  borderRadius: '24px',
                  position: 'relative',
                  flexShrink: 0,
                  cursor: 'pointer',
                  transform: 'translateZ(0)',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                {/* Dynamic Radial Glare Layer */}
                <div
                  ref={(el) => (glareRef.current[idx] = el)}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    opacity: 0,
                    zIndex: 10,
                    borderRadius: 'inherit',
                    transition: 'opacity 0.25s ease'
                  }}
                />

                {/* Card Content matching live Ozrit */}
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    {/* Top Bar: Logo & Index */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '24px 24px 0 24px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', height: '40px' }}>
                        {study.logo ? (
                          <img
                            src={study.logo}
                            alt={`${study.client} logo`}
                            style={{
                              height: '36px',
                              maxWidth: '160px',
                              objectFit: 'contain'
                            }}
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              if (e.currentTarget.nextSibling) {
                                e.currentTarget.nextSibling.style.display = 'flex';
                              }
                            }}
                          />
                        ) : null}
                        <span
                          style={{
                            display: study.logo ? 'none' : 'flex',
                            height: '36px',
                            alignItems: 'center',
                            fontSize: '18px',
                            fontWeight: '700',
                            color: getTextColor(study.bg)
                          }}
                        >
                          {study.client}
                        </span>
                      </div>

                      <span
                        style={{
                          fontSize: '12px',
                          fontWeight: '700',
                          fontFamily: 'monospace',
                          color: getSubTextColor(study.bg),
                          letterSpacing: '0.05em'
                        }}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Description */}
                    <div style={{ padding: '16px 24px 8px 24px' }}>
                      <p
                        style={{
                          fontSize: '14.5px',
                          lineHeight: 1.6,
                          fontWeight: '500',
                          color: getTextColor(study.bg),
                          margin: 0
                        }}
                      >
                        {study.description}
                      </p>
                    </div>
                  </div>

                  {/* Device Preview Image Container */}
                  <div
                    style={{
                      position: 'relative',
                      flex: 1,
                      minHeight: '185px',
                      margin: '6px 20px 14px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      borderRadius: '16px',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      boxShadow: '0 12px 28px rgba(0, 0, 0, 0.45)',
                      backgroundColor: 'rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    <img
                      src={study.image || ''}
                      alt={`${study.client} preview`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                  </div>

                  {/* Footer Row: "Case Study" + Circular Arrow Badge */}
                  <div
                    style={{
                      padding: '0 24px 22px 24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: '800',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: getTextColor(study.bg)
                      }}
                    >
                      Case Study
                    </span>
                    <div
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: study.textColor || '#0066FF',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                      }}
                    >
                      <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M4 12L12 4M12 4H6M12 4V10"
                          stroke="#FFFFFF"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Stacked Layout with GSAP Scroll Trigger Entrance */}
      {isMobile && (
        <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {CASE_STUDIES.map((study, idx) => (
            <div
              key={study.id}
              ref={(el) => (cardsRef.current[idx] = el)}
              onClick={() => setActiveModalCase(study)}
              style={{
                backgroundColor: study.bg || '#F9F7F4',
                borderRadius: '20px',
                padding: '24px 20px',
                cursor: 'pointer',
                position: 'relative',
                boxShadow: '0 8px 24px rgba(0,0,0,0.25)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', height: '36px' }}>
                {study.logo ? (
                  <img
                    src={study.logo}
                    alt={study.client}
                    style={{ height: '30px', maxWidth: '140px', objectFit: 'contain' }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      if (e.currentTarget.nextSibling) {
                        e.currentTarget.nextSibling.style.display = 'inline-block';
                      }
                    }}
                  />
                ) : null}
                <span
                  style={{
                    display: study.logo ? 'none' : 'inline-block',
                    fontSize: '18px',
                    fontWeight: '800',
                    color: getTextColor(study.bg)
                  }}
                >
                  {study.client}
                </span>
                <span style={{ fontSize: '12px', fontWeight: '700', fontFamily: 'monospace', color: getSubTextColor(study.bg) }}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </div>

              <p style={{ fontSize: '14px', lineHeight: 1.6, color: getTextColor(study.bg), marginBottom: '18px' }}>
                {study.description}
              </p>

              <div
                style={{
                  height: '190px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 8px 22px rgba(0, 0, 0, 0.4)',
                  backgroundColor: 'rgba(0, 0, 0, 0.3)'
                }}
              >
                <img
                  src={study.image}
                  alt={`${study.client} preview`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.12em', textTransform: 'uppercase', color: getTextColor(study.bg) }}>
                  Case Study
                </span>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: study.textColor || '#0066FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <ArrowUpRight size={16} color="#ffffff" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Case Study Detail Modal */}
      {activeModalCase && (
        <div
          onClick={() => setActiveModalCase(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 300,
            background: 'rgba(0, 0, 0, 0.88)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#0b1120',
              border: '1px solid rgba(0, 194, 255, 0.35)',
              borderRadius: '24px',
              maxWidth: '720px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '38px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 102, 255, 0.25)',
              position: 'relative'
            }}
          >
            <button
              onClick={() => setActiveModalCase(null)}
              aria-label="Close modal"
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00C2FF' }} />
              <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#00C2FF' }}>
                {activeModalCase.category} · Case Study {activeModalCase.num}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
              {activeModalCase.logo ? (
                <img
                  src={activeModalCase.logo}
                  alt={`${activeModalCase.client} logo`}
                  style={{ height: '36px', maxWidth: '180px', objectFit: 'contain' }}
                />
              ) : null}
              <h3
                style={{
                  fontSize: '32px',
                  fontWeight: '800',
                  color: '#fff',
                  margin: 0,
                  display: activeModalCase.logo ? 'none' : 'block'
                }}
              >
                {activeModalCase.client}
              </h3>
            </div>

            <div style={{ fontSize: '16px', color: '#38bdf8', fontWeight: '700', marginBottom: '20px' }}>
              {activeModalCase.slogan}
            </div>

            {/* Modal Hero Preview Image */}
            {activeModalCase.image && (
              <div
                style={{
                  width: '100%',
                  height: '240px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  marginBottom: '24px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.5)',
                  backgroundColor: 'rgba(0, 0, 0, 0.4)'
                }}
              >
                <img
                  src={activeModalCase.image}
                  alt={`${activeModalCase.client} mockup`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            )}

            <p style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.7, marginBottom: '22px' }}>
              {activeModalCase.description}
            </p>

            {/* Problem & Contribution Highlights */}
            {activeModalCase.problem && (
              <div style={{ marginBottom: '18px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '14px 18px' }}>
                <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#38bdf8', marginBottom: '5px' }}>
                  The Problem It Solves
                </div>
                <p style={{ fontSize: '13.5px', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6, margin: 0 }}>
                  {activeModalCase.problem}
                </p>
              </div>
            )}

            {activeModalCase.contribution && (
              <div style={{ marginBottom: '22px', background: 'rgba(0, 194, 255, 0.06)', border: '1px solid rgba(0, 194, 255, 0.25)', borderRadius: '12px', padding: '14px 18px' }}>
                <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#00C2FF', marginBottom: '5px' }}>
                  Our Engineering Contribution
                </div>
                <p style={{ fontSize: '13.5px', color: '#e0f2fe', lineHeight: 1.6, margin: 0 }}>
                  {activeModalCase.contribution}
                </p>
              </div>
            )}

            {/* Key Capabilities */}
            {activeModalCase.capabilities && activeModalCase.capabilities.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '12.5px', fontWeight: '700', color: '#fff', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Key Capabilities
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '8px' }}>
                  {activeModalCase.capabilities.map((cap, cIdx) => (
                    <div key={cIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.85)', background: 'rgba(255, 255, 255, 0.03)', padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                      <span style={{ color: '#00C2FF', fontWeight: 'bold' }}>•</span>
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Impact Metrics */}
            {activeModalCase.metrics && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '28px' }}>
                {activeModalCase.metrics.map((m, mIdx) => (
                  <div key={mIdx} style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                    <div style={{ fontSize: '26px', fontWeight: '800', color: '#00C2FF' }}>{m.value}</div>
                    <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.6)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '4px' }}>{m.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Founder Quote */}
            {activeModalCase.quote && (
              <div style={{ background: 'rgba(0, 102, 255, 0.08)', borderLeft: '3px solid #00C2FF', padding: '16px 20px', borderRadius: '0 12px 12px 0', marginBottom: '28px' }}>
                <p style={{ fontStyle: 'italic', color: '#e0f2fe', fontSize: '14px', lineHeight: 1.6, margin: '0 0 8px 0' }}>
                  "{activeModalCase.quote.text}"
                </p>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#ffffff' }}>
                  — {activeModalCase.quote.name}, <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{activeModalCase.quote.title}</span>
                </div>
              </div>
            )}

            <h4 style={{ fontSize: '13px', fontWeight: '700', color: '#fff', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Architecture & Tech Stack
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
              {activeModalCase.tags.map((t, idx) => (
                <span key={idx} style={{ background: 'rgba(0, 102, 255, 0.15)', border: '1px solid rgba(0, 194, 255, 0.35)', color: '#bae6fd', padding: '6px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: '600' }}>
                  {t}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {activeModalCase.liveUrl && (
                <a
                  href={activeModalCase.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gl-btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <span>Visit Live Project</span>
                  <ExternalLink size={18} />
                </a>
              )}

              <a
                href="#contact-section"
                onClick={() => setActiveModalCase(null)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '14px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                  e.currentTarget.style.borderColor = 'rgba(0, 194, 255, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)';
                }}
              >
                <span>Discuss Similar Solution with GateLink</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
