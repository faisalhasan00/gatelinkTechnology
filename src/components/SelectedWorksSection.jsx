import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, ExternalLink, X, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CASE_STUDIES } from '../data/websiteData';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const isDarkBg = (bg) => {
  if (!bg) return false;
  if (['#191414', '#111111', '#090909', '#080808'].includes(bg)) return true;
  if (bg.startsWith('#') && (bg.length === 7 || bg.length === 4)) {
    let hex = bg.slice(1);
    if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('');
    const r = parseInt(hex.substring(0, 2), 16) || 0;
    const g = parseInt(hex.substring(2, 4), 16) || 0;
    const b = parseInt(hex.substring(4, 6), 16) || 0;
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    return luminance < 140;
  }
  return false;
};
const getTextColor = (bg) => (isDarkBg(bg) ? '#ffffff' : '#1e293b');
const getSubTextColor = (bg) => (isDarkBg(bg) ? 'rgba(255,255,255,0.72)' : 'rgba(0,0,0,0.48)');

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

    const cardWidth = window.innerWidth < 1024 ? 330 : 380;
    cards.forEach((card) => {
      card.style.width = `${cardWidth}px`;
    });

    const totalTrackWidth = cards.length * cardWidth + (cards.length - 1) * 22 + 80;
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
        minHeight: isMobile ? 'auto' : '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: isMobile ? 'flex-start' : 'center',
        padding: isMobile ? '48px 0' : '24px 0',
        overflow: 'hidden'
      }}
    >
      {/* Header Container - Sleek Responsive Top Bar */}
      <div style={{ maxWidth: '1440px', width: '100%', margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 10, marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <p
              ref={eyebrowRef}
              style={{
                fontSize: '12px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.22em',
                color: '#00C2FF',
                marginBottom: '6px'
              }}
            >
              SELECTED WORKS
            </p>

            <h2
              ref={headingRef}
              style={{
                fontSize: 'clamp(1.9rem, 3.2vw, 2.7rem)',
                fontWeight: '800',
                color: '#ffffff',
                letterSpacing: '-0.03em',
                margin: 0,
                lineHeight: 1.15
              }}
            >
              {mounted ? <HeadingChars text="Case Studies" /> : 'Case Studies'}
            </h2>

            <p
              ref={subRef}
              style={{
                fontSize: '13.5px',
                color: 'rgba(255, 255, 255, 0.72)',
                margin: '5px 0 0 0',
                maxWidth: '650px',
                lineHeight: 1.45
              }}
            >
              Explore our featured production deployments — delivering autonomous AI, high-velocity mobile commerce, luxury digital platforms, and real-time enterprise SaaS.
            </p>
          </div>

          {/* Right: Controls & View All Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a
              href="#contact-section"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                padding: '8px 16px',
                borderRadius: '9999px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'rgba(255, 255, 255, 0.85)',
                fontSize: '12.5px',
                fontWeight: '600',
                textDecoration: 'none',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.color = '#000000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)';
              }}
            >
              <span>View All</span>
              <ArrowUpRight size={14} />
            </a>

            {/* Carousel Navigation Buttons on Desktop */}
            <div style={{ display: isMobile ? 'none' : 'flex', gap: '8px' }}>
              <button
                onClick={() => scrollByAmount('left')}
                aria-label="Previous case studies"
                style={{
                  width: '36px',
                  height: '36px',
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
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scrollByAmount('right')}
                aria-label="Next case studies"
                style={{
                  width: '36px',
                  height: '36px',
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
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
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
            height: '425px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <div
            ref={trackRef}
            style={{
              display: 'flex',
              gap: '22px',
              willChange: 'transform',
              paddingLeft: '40px',
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
                  width: '380px',
                  height: '395px',
                  backgroundColor: study.bg || '#F9F7F4',
                  borderRadius: '24px',
                  position: 'relative',
                  flexShrink: 0,
                  cursor: 'pointer',
                  transform: 'translateZ(0)',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                  boxShadow: '0 14px 36px rgba(0, 0, 0, 0.25)',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
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

                {/* Card Content matching reference image */}
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                  {/* Top Bar: Logo & Index */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '20px 22px 0 22px',
                      height: '52px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {study.id === 'taazabazar' ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <img
                            src="/projects/logos/taazabazar.png"
                            alt="Taaza Bazar"
                            style={{
                              width: '30px',
                              height: '30px',
                              borderRadius: '7px',
                              objectFit: 'cover',
                              boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                            }}
                          />
                          <span
                            style={{
                              fontSize: '17px',
                              fontWeight: '800',
                              color: '#15803D',
                              letterSpacing: '-0.02em',
                              fontFamily: "'Inter', sans-serif"
                            }}
                          >
                            Taaza Bazar
                          </span>
                        </div>
                      ) : study.id === 'buildscape' ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <img
                            src="/projects/logos/buildscape.png"
                            alt="Buildscape"
                            style={{
                              height: '28px',
                              width: 'auto',
                              objectFit: 'contain'
                            }}
                          />
                          <span
                            style={{
                              fontSize: '16.5px',
                              fontWeight: '800',
                              color: '#92400E',
                              letterSpacing: '-0.01em',
                              fontFamily: "'Inter', sans-serif"
                            }}
                          >
                            Buildscape
                          </span>
                        </div>
                      ) : study.id === 'tapmenu' ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                          <img
                            src="/projects/logos/tapmenu.png"
                            alt="TapMenu"
                            style={{
                              height: '26px',
                              width: 'auto',
                              objectFit: 'contain'
                            }}
                          />
                          <span
                            style={{
                              fontSize: '16.5px',
                              fontWeight: '800',
                              color: '#4338CA',
                              letterSpacing: '-0.01em',
                              fontFamily: "'Inter', sans-serif"
                            }}
                          >
                            TapMenu
                          </span>
                        </div>
                      ) : study.logo ? (
                        <img
                          src={study.logo}
                          alt={`${study.client} logo`}
                          style={{
                            height: '28px',
                            width: 'auto',
                            maxWidth: '150px',
                            objectFit: 'contain'
                          }}
                        />
                      ) : (
                        <span style={{ fontSize: '17px', fontWeight: '800', color: '#0F172A' }}>
                          {study.client}
                        </span>
                      )}
                    </div>

                    <span
                      style={{
                        fontSize: '13px',
                        fontWeight: '600',
                        color: '#94A3B8',
                        letterSpacing: '0.04em'
                      }}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Description Paragraph */}
                  <div style={{ padding: '8px 22px 0 22px', flexShrink: 0 }}>
                    <p
                      style={{
                        fontSize: '12.5px',
                        lineHeight: 1.48,
                        fontWeight: '500',
                        color: '#1E293B',
                        margin: 0,
                        display: '-webkit-box',
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {study.description}
                    </p>
                  </div>

                  {/* Device Preview Banner with Colored L-frame */}
                  <div
                    style={{
                      position: 'relative',
                      margin: '14px 18px 0 18px',
                      height: '155px',
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'center'
                    }}
                  >
                    {/* White Inner Card with Accent L-Frame (bottom + left border) */}
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '122px',
                        backgroundColor: '#ffffff',
                        borderRadius: '16px',
                        borderLeft: `6px solid ${study.textColor || '#0066FF'}`,
                        borderBottom: `6px solid ${study.textColor || '#0066FF'}`,
                        borderTop: 'none',
                        borderRight: 'none',
                        boxShadow: '0 6px 18px rgba(0, 0, 0, 0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 14px',
                        overflow: 'visible'
                      }}
                    >
                      {/* Left: Mini Logo & Slogan */}
                      <div style={{ flex: 1, paddingRight: '10px', zIndex: 2 }}>
                        {study.id === 'taazabazar' ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <img
                              src="/projects/logos/taazabazar.png"
                              alt="Taaza Bazar"
                              style={{ width: '20px', height: '20px', borderRadius: '5px', objectFit: 'cover' }}
                            />
                            <span style={{ fontSize: '12px', fontWeight: '800', color: '#15803D' }}>
                              Taaza Bazar
                            </span>
                          </div>
                        ) : study.id === 'buildscape' ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <img
                              src="/projects/logos/buildscape.png"
                              alt="Buildscape"
                              style={{ height: '18px', width: 'auto', objectFit: 'contain' }}
                            />
                            <span style={{ fontSize: '12px', fontWeight: '800', color: '#92400E' }}>
                              Buildscape
                            </span>
                          </div>
                        ) : study.id === 'tapmenu' ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <img
                              src="/projects/logos/tapmenu.png"
                              alt="TapMenu"
                              style={{ height: '16px', width: 'auto', objectFit: 'contain' }}
                            />
                            <span style={{ fontSize: '12px', fontWeight: '800', color: '#4338CA' }}>
                              TapMenu
                            </span>
                          </div>
                        ) : study.logo ? (
                          <img
                            src={study.logo}
                            alt={study.client}
                            style={{
                              height: '18px',
                              width: 'auto',
                              maxWidth: '100px',
                              objectFit: 'contain'
                            }}
                          />
                        ) : (
                          <span style={{ fontSize: '12px', fontWeight: '800', color: '#0F172A' }}>
                            {study.client}
                          </span>
                        )}

                        <p
                          style={{
                            fontSize: '11px',
                            fontWeight: '700',
                            lineHeight: 1.35,
                            color: '#1E293B',
                            margin: '6px 0 0 0',
                            maxWidth: '145px'
                          }}
                        >
                          {study.slogan}
                        </p>
                      </div>

                      {/* Right: Upright 3D Smartphone Mockup overlapping upwards! */}
                      <div
                        style={{
                          position: 'relative',
                          width: '92px',
                          height: '158px',
                          marginTop: '-40px',
                          marginBottom: '-3px',
                          flexShrink: 0,
                          backgroundColor: '#0F172A',
                          borderRadius: '16px',
                          padding: '3px',
                          boxShadow: '0 12px 24px rgba(0, 0, 0, 0.22), 0 2px 6px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.18)',
                          zIndex: 5,
                          display: 'flex',
                          flexDirection: 'column',
                          overflow: 'hidden'
                        }}
                      >
                        {/* Dynamic Island Pill */}
                        <div
                          style={{
                            position: 'absolute',
                            top: '4.5px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '24px',
                            height: '4.5px',
                            backgroundColor: '#000000',
                            borderRadius: '9999px',
                            zIndex: 10
                          }}
                        />
                        {/* Phone Screen Mockup */}
                        <div
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '13px',
                            overflow: 'hidden',
                            backgroundColor: '#000000'
                          }}
                        >
                          <img
                            src={study.image}
                            alt={`${study.client} screen`}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              objectPosition: 'top center',
                              display: 'block'
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Right Colored Action Button */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '18px',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: study.textColor || '#0066FF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 3px 12px ${study.textColor || '#0066FF'}45`,
                      transition: 'transform 0.2s ease'
                    }}
                  >
                    <ArrowUpRight size={18} color="#FFFFFF" strokeWidth={2.4} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Stacked Layout with GSAP Scroll Trigger Entrance */}
      {isMobile && (
        <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {CASE_STUDIES.map((study, idx) => (
            <div
              key={study.id}
              ref={(el) => (cardsRef.current[idx] = el)}
              onClick={() => setActiveModalCase(study)}
              style={{
                backgroundColor: study.bg || '#F9F7F4',
                borderRadius: '24px',
                padding: '24px 20px 20px 20px',
                cursor: 'pointer',
                position: 'relative',
                boxShadow: '0 10px 28px rgba(0,0,0,0.25)',
                overflow: 'hidden'
              }}
            >
              {/* Top Bar: Logo & Index */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', height: '36px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {study.id === 'taazabazar' ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <img
                        src="/projects/logos/taazabazar.png"
                        alt="Taaza Bazar"
                        style={{ width: '32px', height: '32px', borderRadius: '8px', objectFit: 'cover' }}
                      />
                      <span style={{ fontSize: '18px', fontWeight: '800', color: '#15803D' }}>
                        Taaza Bazar
                      </span>
                    </div>
                  ) : study.id === 'buildscape' ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <img
                        src="/projects/logos/buildscape.png"
                        alt="Buildscape"
                        style={{ height: '30px', width: 'auto', objectFit: 'contain' }}
                      />
                      <span style={{ fontSize: '17px', fontWeight: '800', color: '#92400E' }}>
                        Buildscape
                      </span>
                    </div>
                  ) : study.id === 'tapmenu' ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                      <img
                        src="/projects/logos/tapmenu.png"
                        alt="TapMenu"
                        style={{ height: '28px', width: 'auto', objectFit: 'contain' }}
                      />
                      <span style={{ fontSize: '17px', fontWeight: '800', color: '#4338CA' }}>
                        TapMenu
                      </span>
                    </div>
                  ) : study.logo ? (
                    <img
                      src={study.logo}
                      alt={study.client}
                      style={{
                        height: '30px',
                        width: 'auto',
                        maxWidth: '140px',
                        objectFit: 'contain'
                      }}
                    />
                  ) : (
                    <span style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A' }}>
                      {study.client}
                    </span>
                  )}
                </div>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#94A3B8' }}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Description */}
              <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#1E293B', marginBottom: '18px', fontWeight: '500' }}>
                {study.description}
              </p>

              {/* Inner Branded Banner for Mobile */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '165px',
                  display: 'flex',
                  alignItems: 'flex-end',
                  marginBottom: '10px'
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '128px',
                    backgroundColor: '#ffffff',
                    borderRadius: '18px',
                    borderLeft: `6px solid ${study.textColor || '#0066FF'}`,
                    borderBottom: `6px solid ${study.textColor || '#0066FF'}`,
                    borderTop: 'none',
                    borderRight: 'none',
                    boxShadow: '0 6px 18px rgba(0, 0, 0, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 14px',
                    overflow: 'visible'
                  }}
                >
                  {/* Left: Mini Logo & Slogan */}
                  <div style={{ flex: 1, paddingRight: '10px', zIndex: 2 }}>
                    {study.id === 'taazabazar' ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '6px' }}>
                        <img
                          src="/projects/logos/taazabazar.png"
                          alt="Taaza Bazar"
                          style={{ width: '20px', height: '20px', borderRadius: '5px', objectFit: 'cover' }}
                        />
                        <span style={{ fontSize: '12px', fontWeight: '800', color: '#15803D' }}>
                          Taaza Bazar
                        </span>
                      </div>
                    ) : study.id === 'buildscape' ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '6px' }}>
                        <img
                          src="/projects/logos/buildscape.png"
                          alt="Buildscape"
                          style={{ height: '18px', width: 'auto', objectFit: 'contain' }}
                        />
                        <span style={{ fontSize: '12px', fontWeight: '800', color: '#92400E' }}>
                          Buildscape
                        </span>
                      </div>
                    ) : study.id === 'tapmenu' ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '6px' }}>
                        <img
                          src="/projects/logos/tapmenu.png"
                          alt="TapMenu"
                          style={{ height: '18px', width: 'auto', objectFit: 'contain' }}
                        />
                        <span style={{ fontSize: '12px', fontWeight: '800', color: '#4338CA' }}>
                          TapMenu
                        </span>
                      </div>
                    ) : study.logo ? (
                      <img
                        src={study.logo}
                        alt={study.client}
                        style={{
                          height: '18px',
                          width: 'auto',
                          maxWidth: '100px',
                          objectFit: 'contain',
                          marginBottom: '6px'
                        }}
                      />
                    ) : (
                      <span style={{ fontSize: '12px', fontWeight: '800', color: '#0F172A', marginBottom: '6px', display: 'block' }}>
                        {study.client}
                      </span>
                    )}

                    <p
                      style={{
                        fontSize: '11px',
                        fontWeight: '700',
                        lineHeight: 1.35,
                        color: '#1E293B',
                        margin: 0,
                        maxWidth: '145px'
                      }}
                    >
                      {study.slogan}
                    </p>
                  </div>

                  {/* Right: Phone Frame */}
                  <div
                    style={{
                      position: 'relative',
                      width: '90px',
                      height: '154px',
                      marginTop: '-40px',
                      marginBottom: '-3px',
                      flexShrink: 0,
                      backgroundColor: '#0F172A',
                      borderRadius: '16px',
                      padding: '3px',
                      boxShadow: '0 12px 22px rgba(0, 0, 0, 0.22), 0 0 0 1px rgba(255, 255, 255, 0.15)',
                      zIndex: 5,
                      display: 'flex',
                      flexDirection: 'column',
                      overflow: 'hidden'
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: '4px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '24px',
                        height: '4px',
                        backgroundColor: '#000000',
                        borderRadius: '9999px',
                        zIndex: 10
                      }}
                    />
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '13px',
                        overflow: 'hidden',
                        backgroundColor: '#000000'
                      }}
                    >
                      <img
                        src={study.image}
                        alt={`${study.client} screen`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Bottom Action Button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '6px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: study.textColor || '#0066FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 3px 10px ${study.textColor || '#0066FF'}40`
                  }}
                >
                  <ArrowUpRight size={18} color="#ffffff" strokeWidth={2.4} />
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

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
              {activeModalCase.logo ? (
                <img
                  src={activeModalCase.logo}
                  alt={`${activeModalCase.client} logo`}
                  style={{
                    height: activeModalCase.id === 'taazabazar' ? '44px' : '36px',
                    width: activeModalCase.id === 'taazabazar' ? '44px' : 'auto',
                    maxWidth: '180px',
                    borderRadius: activeModalCase.id === 'taazabazar' ? '10px' : '0px',
                    objectFit: 'contain',
                    boxShadow: activeModalCase.id === 'taazabazar' ? '0 4px 12px rgba(0,0,0,0.35)' : 'none'
                  }}
                />
              ) : null}
              <h3
                style={{
                  fontSize: '32px',
                  fontWeight: '800',
                  color: '#fff',
                  margin: 0,
                  display: activeModalCase.logo && activeModalCase.id !== 'taazabazar' ? 'none' : 'block'
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
