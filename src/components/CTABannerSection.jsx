import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CTABannerSection() {
  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#06070a',
        padding: '60px 24px 80px 24px',
        overflow: 'hidden'
      }}
    >
      {/* Stealth Dark Enterprise Card */}
      <div
        style={{
          maxWidth: '1320px',
          margin: '0 auto',
          position: 'relative',
          borderRadius: '28px',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(6, 11, 20, 0.98) 100%)',
          border: '1px solid rgba(0, 194, 255, 0.2)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 30px rgba(0, 102, 255, 0.12)',
          padding: '80px 32px 88px 32px',
          overflow: 'hidden',
          textAlign: 'center'
        }}
      >
        {/* Ambient Top Glow */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            height: '240px',
            background: 'radial-gradient(ellipse at 50% 0%, rgba(0, 194, 255, 0.18) 0%, rgba(0, 102, 255, 0.08) 50%, transparent 80%)',
            pointerEvents: 'none'
          }}
        />

        {/* Subtle Tech Dot Grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            opacity: 0.5,
            pointerEvents: 'none'
          }}
        />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1000px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4.8vw, 4rem)',
              fontWeight: '900',
              letterSpacing: '-0.025em',
              lineHeight: 1.15,
              marginBottom: '18px',
              textTransform: 'uppercase',
              color: '#ffffff'
            }}
          >
            <span style={{ fontStyle: 'italic', fontWeight: '400', marginRight: '8px', color: 'rgba(255, 255, 255, 0.85)' }}>
              LET'S
            </span>
            TURN IDEAS INTO{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #00C2FF 0%, #38bdf8 50%, #ffffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              DIGITAL REALITY!
            </span>
          </h2>

          <p
            style={{
              fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '640px',
              margin: '0 auto 36px auto',
              lineHeight: 1.6
            }}
          >
            Let's craft something extraordinary. Connect with our engineering leadership in Hyderabad today and bring your ideas to life.
          </p>

          <div>
            <a
              href="#contact-section"
              className="gl-btn-primary"
              style={{
                fontSize: '15.5px',
                padding: '16px 36px',
                borderRadius: '9999px',
                textDecoration: 'none'
              }}
            >
              <span className="shimmer" />
              <span>Contact Us Now</span>
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
