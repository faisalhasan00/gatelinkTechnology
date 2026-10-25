import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CTABannerSection() {
  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#ED0000',
        color: '#ffffff',
        padding: '90px 24px 96px 24px',
        overflow: 'hidden',
        textAlign: 'center'
      }}
    >
      {/* Subtle Dot Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
          opacity: 0.6,
          pointerEvents: 'none'
        }}
      />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <h2
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 4.4rem)',
            fontWeight: '900',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            marginBottom: '18px',
            textTransform: 'uppercase'
          }}
        >
          <span style={{ fontStyle: 'italic', fontWeight: '400', marginRight: '6px' }}>LET'S</span>
          TURN IDEAS INTO DIGITAL REALITY!
        </h2>

        <p
          style={{
            fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
            color: 'rgba(255, 255, 255, 0.95)',
            maxWidth: '680px',
            margin: '0 auto 36px auto',
            lineHeight: 1.6
          }}
        >
          Let's craft something extraordinary. Connect with us today and bring your ideas to life.
        </p>

        <div>
          <a
            href="#contact-section"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '16px 36px',
              borderRadius: '9999px',
              backgroundColor: '#ffffff',
              color: '#111827',
              fontSize: '15px',
              fontWeight: '700',
              textDecoration: 'none',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.25)';
            }}
          >
            <span>Contact us now</span>
            <ArrowRight size={17} color="#111827" />
          </a>
        </div>
      </div>
    </section>
  );
}
