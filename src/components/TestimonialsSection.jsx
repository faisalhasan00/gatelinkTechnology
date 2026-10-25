import React from 'react';
import { Star } from 'lucide-react';
import { TESTIMONIALS, TRUSTED_PARTNERS } from '../data/websiteData';

export default function TestimonialsSection() {
  const half = Math.ceil(TESTIMONIALS.length / 2);
  const row1 = [...TESTIMONIALS.slice(0, half), ...TESTIMONIALS.slice(0, half)];
  const row2 = [...TESTIMONIALS.slice(half), ...TESTIMONIALS.slice(half)];

  const partnerLogos = [...TRUSTED_PARTNERS, ...TRUSTED_PARTNERS, ...TRUSTED_PARTNERS];

  const renderCard = (item, idx) => (
    <div
      key={idx}
      style={{
        width: '380px',
        flexShrink: 0,
        background: 'rgba(255, 255, 255, 0.025)',
        border: '1px solid rgba(255, 255, 255, 0.07)',
        borderRadius: '20px',
        padding: '32px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.3s, background 0.3s'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(0, 194, 255, 0.45)';
        e.currentTarget.style.background = 'rgba(0, 102, 255, 0.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.07)';
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.025)';
      }}
    >
      {/* Decorative Quotation Mark */}
      <div
        style={{
          position: 'absolute',
          top: '12px',
          right: '20px',
          fontSize: '100px',
          lineHeight: 1,
          color: 'rgba(255, 255, 255, 0.03)',
          fontFamily: 'Georgia, serif',
          userSelect: 'none',
          pointerEvents: 'none'
        }}
      >
        “
      </div>

      {/* 5 Gold Stars */}
      <div style={{ display: 'flex', gap: '3px', marginBottom: '20px' }}>
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
        ))}
      </div>

      {/* Testimonial Quote */}
      <p style={{ color: 'rgba(255, 255, 255, 0.72)', fontSize: '14.5px', lineHeight: 1.75, marginBottom: '28px' }}>
        “{item.quote}”
      </p>

      <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.06)', marginBottom: '20px' }} />

      {/* Author Info matching live Ozrit */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.04))',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: '700',
            color: 'rgba(255, 255, 255, 0.75)'
          }}
        >
          {item.initial || item.author?.[0]}
        </div>
        <div>
          <p style={{ color: '#ffffff', fontSize: '13.5px', fontWeight: '600', margin: 0 }}>
            {item.author}
          </p>
          <p style={{ color: 'rgba(255, 255, 255, 0.35)', fontSize: '12px', margin: 0 }}>
            {item.role} · {item.company}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="testimonials"
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#080808',
        padding: '80px 0 110px 0',
        overflow: 'hidden'
      }}
    >
      {/* 1. Organizations We've Worked With (Live Ozrit Partner Logos) */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 72px auto', textAlign: 'center', padding: '0 24px' }}>
        <span
          style={{
            fontSize: '11px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.22em',
            color: '#00C2FF',
            display: 'block',
            marginBottom: '10px'
          }}
        >
          TRUSTED PARTNERS
        </span>

        <h3
          style={{
            fontSize: 'clamp(2rem, 3.8vw, 3rem)',
            fontWeight: '800',
            color: '#ffffff',
            letterSpacing: '-0.025em',
            marginBottom: '36px'
          }}
        >
          Organizations We've Worked With
        </h3>

        {/* Partners Scrolling Track */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              width: '80px',
              background: 'linear-gradient(to right, #080808, transparent)',
              zIndex: 10,
              pointerEvents: 'none'
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              width: '80px',
              background: 'linear-gradient(to left, #080808, transparent)',
              zIndex: 10,
              pointerEvents: 'none'
            }}
          />

          <div className="aso-track" style={{ gap: '48px', alignItems: 'center', padding: '12px 0' }}>
            {partnerLogos.map((p, idx) => (
              <div
                key={idx}
                style={{
                  height: '42px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0.65,
                  transition: 'opacity 0.3s ease',
                  flexShrink: 0
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0.65'}
              >
                <img
                  src={p.logo}
                  alt={p.name}
                  style={{
                    maxHeight: '32px',
                    width: 'auto',
                    filter: 'grayscale(1) brightness(1.8)'
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextSibling.style.display = 'block';
                  }}
                />
                <span
                  style={{
                    display: 'none',
                    fontSize: '18px',
                    fontWeight: '800',
                    color: 'rgba(255, 255, 255, 0.7)',
                    letterSpacing: '0.04em'
                  }}
                >
                  {p.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 60px auto', height: '1px', background: 'rgba(255, 255, 255, 0.05)' }} />

      {/* 2. Trusted by Industry Leaders (Testimonials) */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', textAlign: 'center', padding: '0 24px', marginBottom: '56px' }}>
        <h2
          style={{
            fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
            fontWeight: '800',
            color: '#ffffff',
            letterSpacing: '-0.025em',
            margin: '0 0 16px 0'
          }}
        >
          Trusted by Industry Leaders
        </h2>
      </div>

      {/* Row 1: Leftward scroll */}
      <div style={{ position: 'relative', overflow: 'hidden', marginBottom: '24px' }}>
        <div className="marquee-row-left" style={{ display: 'flex', gap: '24px', width: 'max-content' }}>
          {row1.map((item, idx) => renderCard(item, idx))}
        </div>
      </div>

      {/* Row 2: Rightward scroll */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="marquee-row-right" style={{ display: 'flex', gap: '24px', width: 'max-content' }}>
          {row2.map((item, idx) => renderCard(item, idx))}
        </div>
      </div>
    </section>
  );
}
