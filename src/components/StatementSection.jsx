import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Code2, Layout, Sparkles, Megaphone } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LINE_1 = "We Build. We Automate. We Transform.";
const LINE_2 = "From Thoughts to Implementation.";

const SplitChars = ({ text }) => {
  const words = text.split(" ");
  return (
    <span aria-label={text} style={{ display: 'inline-block' }}>
      {words.map((word, wIdx) => (
        <span
          key={wIdx}
          style={{
            display: 'inline-block',
            whiteSpace: 'nowrap'
          }}
        >
          {word.split("").map((char, cIdx) => (
            <span
              key={cIdx}
              className="heading-char"
              style={{
                display: 'inline-block',
                opacity: 0,
                transform: 'translateY(40px)',
                willChange: 'transform, opacity'
              }}
            >
              {char}
            </span>
          ))}
          {wIdx < words.length - 1 && (
            <span
              className="heading-char"
              style={{
                display: 'inline-block',
                opacity: 0,
                transform: 'translateY(40px)',
                willChange: 'transform, opacity'
              }}
            >
              {'\u00A0'}
            </span>
          )}
        </span>
      ))}
    </span>
  );
};

const SERVICE_PILLARS = [
  {
    title: 'Software Development',
    image: '/1.jpg',
    icon: <Code2 size={24} color="#ED0000" />,
    description: 'End-to-end engineering for web, mobile, and enterprise platforms. We build resilient architectures that scale with zero compromise on speed.',
    highlights: ['Enterprise Platforms', 'Cloud Architecture', 'Microservices', 'API Ecosystems'],
    cta: 'Explore Software',
    href: '#process-section'
  },
  {
    title: 'Design & Digital',
    image: '/21.jpg',
    icon: <Layout size={24} color="#ED0000" />,
    description: 'Research-led product design and frontend engineering that turns complex workflows into intuitive, engaging user experiences.',
    highlights: ['Design Systems', 'Design Tokens', 'Human Interfaces', 'Accessibility'],
    cta: 'Explore Design',
    href: '#case-studies'
  },
  {
    title: 'AI & ML',
    image: '/3.jpg',
    icon: <Sparkles size={24} color="#ED0000" />,
    description: 'Production-grade AI and ML systems including predictive models, generative AI, LLM fine-tuning, and intelligent automation pipelines.',
    highlights: ['Predictive Models', 'LLM Pipelines', 'Computer Vision', 'Agentic Systems'],
    cta: 'Explore AI & ML',
    href: '#ai-ecosystems'
  },
  {
    title: 'Digital & Branding',
    image: '/4.jpg',
    icon: <Megaphone size={24} color="#ED0000" />,
    description: 'Performance marketing and brand programmes that compound over time. Data-informed creative that acquires, converts, and retains.',
    highlights: ['Brand Foundations', 'Growth Loops', 'Storytelling', 'Digital Signals'],
    cta: 'Explore Digital',
    href: '#contact-section'
  }
];

export default function StatementSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    if (!section || !heading) return;

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const chars = heading.querySelectorAll(".heading-char");
    const cards = cardsRef.current.filter(Boolean);

    if (isReduced) {
      gsap.set(chars, { opacity: 1, y: 0 });
      if (cards.length) gsap.set(cards, { opacity: 1, y: 0 });
      return;
    }

    const isMobile = window.innerWidth < 768;

    // Initial state matching ozrit.com
    gsap.set(chars, { opacity: 0, y: 40 });
    if (cards.length) gsap.set(cards, { opacity: 0, y: 50 });

    let scrollTl = null;
    let cardTrigger = null;

    if (isMobile) {
      // Mobile smooth entry
      cardTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(chars, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.015,
            ease: "power3.out"
          });
          if (cards.length) {
            gsap.to(cards, {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: "power3.out",
              delay: 0.3
            });
          }
        }
      });
    } else {
      // Desktop GSAP scroll-scrubbed character reveal identical to live Ozrit
      scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          end: "top 25%",
          scrub: 1.2
        }
      });

      scrollTl.to(chars, {
        opacity: 1,
        y: 0,
        duration: 0.08,
        stagger: 0.015,
        ease: "power3.out"
      });

      // Cards reveal slightly later as user scrolls deeper
      cardTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top 60%",
        once: true,
        onEnter: () => {
          if (cards.length) {
            gsap.to(cards, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.12,
              ease: "power3.out"
            });
          }
        }
      });
    }

    return () => {
      if (scrollTl) scrollTl.kill();
      if (cardTrigger) cardTrigger.kill();
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services-section"
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#ffffff',
        overflow: 'hidden',
        padding: '90px 24px 110px 24px'
      }}
    >
      <style>{`
        .heading-char {
          display: inline-block;
          will-change: transform, opacity;
        }
        .oz-statement-line-1,
        .oz-statement-line-2 {
          display: block;
        }
        @media (min-width: 768px) {
          .oz-statement-line-1,
          .oz-statement-line-2 {
            white-space: nowrap;
          }
        }
        .oz-desktop-accordion {
          display: flex !important;
          gap: 16px;
          height: 540px;
          user-select: none;
        }
        .oz-mobile-accordion {
          display: none !important;
          flex-direction: column;
          gap: 24px;
        }
        @media (max-width: 900px) {
          .oz-desktop-accordion {
            display: none !important;
          }
          .oz-mobile-accordion {
            display: flex !important;
          }
        }
      `}</style>

      <div style={{ maxWidth: '1440px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        
        {/* Section Heading with GSAP Scroll-Scrubbed Character Animation matching live Ozrit */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2
            ref={headingRef}
            data-line="true"
            style={{
              fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif",
              fontSize: 'clamp(1.75rem, 3.4vw, 3.6rem)',
              fontWeight: '800',
              color: '#0f172a',
              letterSpacing: '-0.03em',
              lineHeight: 1.25,
              maxWidth: '1400px',
              margin: '0 auto'
            }}
          >
            <span className="oz-statement-line-1" data-line="true">
              <SplitChars text={LINE_1} />
            </span>
            <span
              className="oz-statement-line-2"
              data-line="true"
              style={{
                marginTop: '10px',
                color: '#1e293b'
              }}
            >
              <SplitChars text={LINE_2} />
            </span>
          </h2>
        </div>

        {/* Desktop Interactive Expanding Accordion */}
        <div className="oz-desktop-accordion">
          {SERVICE_PILLARS.map((service, idx) => {
            const isExpanded = activeIdx === idx;

            return (
              <div
                key={service.title}
                ref={(el) => (cardsRef.current[idx] = el)}
                onClick={() => setActiveIdx(idx)}
                style={{
                  position: 'relative',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  flex: isExpanded ? 4 : 1,
                  transition: 'flex 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease',
                  boxShadow: isExpanded
                    ? '0 25px 60px rgba(0, 0, 0, 0.22)'
                    : '0 10px 30px rgba(0, 0, 0, 0.08)',
                  backgroundColor: '#0a0a0a'
                }}
              >
                {/* Background Image */}
                <img
                  src={service.image}
                  alt={service.title}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: isExpanded ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 0.8s ease'
                  }}
                  onError={(e) => {
                    const fallbacks = [
                      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80',
                      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1200&q=80',
                      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
                      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80'
                    ];
                    e.currentTarget.src = fallbacks[idx % fallbacks.length];
                  }}
                />

                {/* Dark Gradient Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: isExpanded
                      ? 'linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.3) 100%)'
                      : 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.2) 100%)',
                    transition: 'background 0.5s ease'
                  }}
                />

                {/* Top Corner Icon */}
                <div style={{ position: 'absolute', top: '24px', left: '24px', zIndex: 10 }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '14px',
                      backgroundColor: 'rgba(255, 255, 255, 0.12)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    {service.icon}
                  </div>
                </div>

                {/* Content Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    padding: '32px',
                    zIndex: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end'
                  }}
                >
                  {/* Collapsed State Title */}
                  {!isExpanded && (
                    <div style={{ transition: 'all 0.3s ease' }}>
                      <h3
                        style={{
                          fontSize: '22px',
                          fontWeight: '800',
                          color: '#ffffff',
                          lineHeight: 1.25,
                          letterSpacing: '-0.02em',
                          margin: 0
                        }}
                      >
                        {service.title}
                      </h3>
                      <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '600' }}>
                        Click to expand
                      </p>
                    </div>
                  )}

                  {/* Expanded State Full Card */}
                  {isExpanded && (
                    <div style={{ maxWidth: '560px' }}>
                      <h3
                        style={{
                          fontSize: '28px',
                          fontWeight: '800',
                          color: '#ffffff',
                          letterSpacing: '-0.02em',
                          marginBottom: '12px'
                        }}
                      >
                        {service.title}
                      </h3>

                      <p
                        style={{
                          fontSize: '15px',
                          color: 'rgba(255, 255, 255, 0.85)',
                          lineHeight: 1.65,
                          marginBottom: '20px'
                        }}
                      >
                        {service.description}
                      </p>

                      {/* Highlight badges */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
                        {service.highlights.map((item) => (
                          <span
                            key={item}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '6px 14px',
                              borderRadius: '9999px',
                              fontSize: '12px',
                              fontWeight: '600',
                              backgroundColor: 'rgba(255, 255, 255, 0.15)',
                              border: '1px solid rgba(255, 255, 255, 0.25)',
                              color: '#ffffff'
                            }}
                          >
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ED0000' }} />
                            {item}
                          </span>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <a
                        href={service.href}
                        className="gl-btn-primary"
                        style={{
                          padding: '12px 28px',
                          fontSize: '14px'
                        }}
                      >
                        <span className="shimmer" />
                        <span>{service.cta}</span>
                        <ArrowUpRight size={16} />
                      </a>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Mobile Vertical Stack */}
        <div className="oz-mobile-accordion">
          {SERVICE_PILLARS.map((service, idx) => (
            <div
              key={service.title}
              style={{
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                backgroundColor: '#0a0a0a',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)'
              }}
            >
              <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                <img
                  src={service.image}
                  alt={service.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0a0a0a 0%, transparent 100%)' }} />
                <div style={{ position: 'absolute', top: '16px', left: '16px', width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(255, 255, 255, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {service.icon}
                </div>
              </div>

              <div style={{ padding: '24px', marginTop: '-20px', position: 'relative', zIndex: 10 }}>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', marginBottom: '8px' }}>
                  {service.title}
                </h3>
                <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6, marginBottom: '16px' }}>
                  {service.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                  {service.highlights.map((h) => (
                    <span
                      key={h}
                      style={{ fontSize: '11px', fontWeight: '600', padding: '4px 10px', borderRadius: '9999px', backgroundColor: 'rgba(255, 255, 255, 0.08)', color: 'rgba(255, 255, 255, 0.8)' }}
                    >
                      {h}
                    </span>
                  ))}
                </div>

                <a
                  href={service.href}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#ED0000', fontSize: '14px', fontWeight: '700', textDecoration: 'none' }}
                >
                  <span>{service.cta}</span>
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
