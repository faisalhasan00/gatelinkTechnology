import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { INDUSTRIES } from '../data/websiteData';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function IndustriesSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  const sectionRef = useRef(null);
  const contentPinRef = useRef(null);
  const imagesContainerRef = useRef(null);
  const descContainerRef = useRef(null);
  const btnContainerRef = useRef(null);
  const listItemsRef = useRef([]);
  const dotsRef = useRef([]);
  const scrollTriggerRef = useRef(null);

  // Resize handler
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    setMounted(true);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // GSAP ScrollTrigger Pinning matching live Ozrit
  useEffect(() => {
    if (!mounted || isMobile) return;

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const section = sectionRef.current;
    const pinContent = contentPinRef.current;

    if (!section || !pinContent) return;

    const count = INDUSTRIES.length;
    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: () => `+=${55 * count}%`,
      pin: pinContent,
      scrub: isReduced ? false : 1.5,
      anticipatePin: 1,
      onUpdate: (self) => {
        const nextIdx = Math.min(Math.floor(self.progress * count), count - 1);
        setActiveIdx(nextIdx);
      }
    });

    scrollTriggerRef.current = st;

    return () => {
      st.kill();
    };
  }, [mounted, isMobile]);

  // Transitions when activeIdx updates (matching live Ozrit)
  useEffect(() => {
    if (!mounted) return;

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = isReduced ? 0.15 : 0.65;

    // 1. Crossfade & scale images in Column 1
    if (imagesContainerRef.current) {
      const imgElements = imagesContainerRef.current.querySelectorAll('[data-industry-img]');
      imgElements.forEach((el, idx) => {
        if (idx === activeIdx) {
          gsap.to(el, {
            opacity: 1,
            scale: 1,
            duration: duration,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        } else {
          gsap.to(el, {
            opacity: 0,
            scale: 1.08,
            duration: 0.5 * duration,
            ease: 'power2.in',
            overwrite: 'auto'
          });
        }
      });
    }

    // 2. Transition category list items in Column 2
    listItemsRef.current.forEach((el, idx) => {
      if (!el) return;
      const dot = dotsRef.current[idx];
      if (idx === activeIdx) {
        gsap.to(el, {
          color: '#ffffff',
          duration: 0.45,
          ease: 'power2.out',
          overwrite: 'auto'
        });
        el.style.fontWeight = '700';
        if (dot) {
          gsap.to(dot, {
            scale: 1,
            opacity: 1,
            duration: 0.35,
            ease: 'back.out(1.7)',
            overwrite: 'auto'
          });
        }
      } else {
        gsap.to(el, {
          color: 'rgba(255, 255, 255, 0.22)',
          duration: 0.35,
          ease: 'power2.out',
          overwrite: 'auto'
        });
        el.style.fontWeight = '400';
        if (dot) {
          gsap.to(dot, {
            scale: 0,
            opacity: 0,
            duration: 0.25,
            ease: 'power2.in',
            overwrite: 'auto'
          });
        }
      }
    });

    // 3. Crossfade & slide description in Column 3
    if (descContainerRef.current) {
      const descElements = descContainerRef.current.querySelectorAll('[data-industry-desc]');
      descElements.forEach((el, idx) => {
        if (idx === activeIdx) {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.8 * duration,
            ease: 'power3.out',
            delay: isReduced ? 0 : 0.08,
            overwrite: 'auto'
          });
        } else {
          gsap.to(el, {
            opacity: 0,
            y: 12,
            duration: 0.4 * duration,
            ease: 'power2.in',
            overwrite: 'auto'
          });
        }
      });
    }

    // 4. CTA button state in Column 3
    if (btnContainerRef.current) {
      const btnElements = btnContainerRef.current.querySelectorAll('[data-industry-btn]');
      btnElements.forEach((el, idx) => {
        if (idx === activeIdx) {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.8 * duration,
            ease: 'power3.out',
            delay: isReduced ? 0 : 0.12,
            overwrite: 'auto'
          });
        } else {
          gsap.to(el, {
            opacity: 0,
            y: 8,
            duration: 0.3 * duration,
            ease: 'power2.in',
            overwrite: 'auto'
          });
        }
      });
    }
  }, [activeIdx, mounted]);

  // Click on sector to jump
  const handleSelectIndustry = (idx) => {
    setActiveIdx(idx);
    if (!isMobile && scrollTriggerRef.current) {
      const st = scrollTriggerRef.current;
      const count = INDUSTRIES.length;
      const targetProgress = (idx + 0.2) / count;
      const targetY = st.start + targetProgress * (st.end - st.start);
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="industries-section"
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#000000',
        color: '#ffffff',
        minHeight: isMobile ? 'auto' : undefined
      }}
    >
      <div ref={contentPinRef}>
        <div
          style={{
            position: 'relative',
            minHeight: isMobile ? 'auto' : '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '70px 24px 85px 24px',
            maxWidth: '1440px',
            margin: '0 auto'
          }}
        >
          {/* Top Header */}
          <div style={{ marginBottom: '45px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '24px'
              }}
            >
              <div>
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
                  INDUSTRIES WE SERVE
                </p>
                <h2
                  style={{
                    fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
                    fontWeight: '800',
                    lineHeight: 1.15,
                    letterSpacing: '-0.03em',
                    color: '#ffffff',
                    maxWidth: '820px',
                    margin: 0
                  }}
                >
                  Solving Complex Challenges Across Every Major Sector
                </h2>
              </div>

              <a
                href="#contact-section"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '11px 24px',
                  borderRadius: '9999px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
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
                  e.currentTarget.style.color = '#ffffff';
                }}
              >
                <span>Check All Industries</span>
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>

          {/* 3 Column Interactive Split matching live Ozrit */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'minmax(320px, 1.1fr) minmax(240px, 0.95fr) minmax(320px, 1.35fr)',
              gap: isMobile ? '32px' : '48px',
              alignItems: 'center'
            }}
          >
            {/* Column 1: Crossfading Industry Photo */}
            <div>
              <div
                ref={imagesContainerRef}
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: isMobile ? '4 / 3' : '3 / 4',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)',
                  backgroundColor: '#0a0a0a'
                }}
              >
                {INDUSTRIES.map((ind, r) => (
                  <div
                    key={ind.name}
                    data-industry-img
                    style={{
                      position: 'absolute',
                      inset: 0,
                      opacity: r === 0 ? 1 : 0,
                      transform: r === 0 ? 'scale(1)' : 'scale(1.08)',
                      willChange: 'transform, opacity'
                    }}
                  >
                    <img
                      src={ind.image}
                      alt={ind.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                  </div>
                ))}
                {/* Subtle Bottom Ambient Gradient */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, transparent 45%)',
                    pointerEvents: 'none'
                  }}
                />
              </div>
            </div>

            {/* Column 2: Vertical List of Sectors */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {INDUSTRIES.map((ind, a) => {
                const isSelected = activeIdx === a;
                return (
                  <button
                    key={ind.name}
                    ref={(el) => (listItemsRef.current[a] = el)}
                    onClick={() => handleSelectIndustry(a)}
                    style={{
                      position: 'relative',
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      padding: '16px 0',
                      border: 'none',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                      color: isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.22)',
                      fontWeight: isSelected ? 700 : 400,
                      transition: 'all 0.3s ease'
                    }}
                    className="group"
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span
                        style={{
                          fontSize: 'clamp(1.35rem, 2.3vw, 1.95rem)',
                          letterSpacing: '-0.02em',
                          transition: 'transform 0.25s ease'
                        }}
                        className="group-hover:translate-x-1"
                      >
                        {ind.name}
                      </span>

                      {/* Glowing Red Active Indicator Dot */}
                      <span
                        ref={(el) => (dotsRef.current[a] = el)}
                        style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: '#ef4444',
                          boxShadow: '0 0 14px 2px rgba(239, 68, 68, 0.7)',
                          display: 'inline-block',
                          opacity: isSelected ? 1 : 0,
                          transform: isSelected ? 'scale(1)' : 'scale(0)',
                          transition: 'opacity 0.25s ease'
                        }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Column 3: Stacked Dynamic Descriptions & CTA */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div
                ref={descContainerRef}
                style={{
                  position: 'relative',
                  minHeight: isMobile ? 'auto' : '260px',
                  marginBottom: '28px'
                }}
              >
                {INDUSTRIES.map((ind, a) => (
                  <div
                    key={ind.name}
                    data-industry-desc
                    style={{
                      opacity: a === 0 ? 1 : 0,
                      position: isMobile ? (a === activeIdx ? 'relative' : 'none') : a === 0 ? 'relative' : 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      display: isMobile && a !== activeIdx ? 'none' : 'block',
                      willChange: 'transform, opacity'
                    }}
                  >
                    {ind.description.map((paragraph, pIdx) => (
                      <p
                        key={pIdx}
                        style={{
                          fontSize: '15px',
                          color: pIdx === 0 ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.6)',
                          lineHeight: 1.7,
                          marginBottom: '16px'
                        }}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ))}
              </div>

              {/* Dynamic Know More Action Button */}
              <div ref={btnContainerRef} style={{ position: 'relative', height: '48px' }}>
                {INDUSTRIES.map((ind, a) => (
                  <a
                    key={ind.name}
                    data-industry-btn
                    href="#contact-section"
                    style={{
                      opacity: a === 0 ? 1 : 0,
                      position: isMobile ? (a === activeIdx ? 'relative' : 'none') : a === 0 ? 'relative' : 'absolute',
                      top: 0,
                      left: 0,
                      display: isMobile && a !== activeIdx ? 'none' : 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 26px',
                      borderRadius: '9999px',
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                      color: '#ffffff',
                      fontSize: '13.5px',
                      fontWeight: '600',
                      textDecoration: 'none',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      transition: 'all 0.25s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#ffffff';
                      e.currentTarget.style.color = '#000000';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                      e.currentTarget.style.color = '#ffffff';
                    }}
                  >
                    <span>Know More about {ind.name}</span>
                    <ArrowUpRight size={15} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
