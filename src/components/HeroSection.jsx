import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section
      id="hero-section"
      style={{
        position: 'relative',
        width: '100%',
        height: '100svh',
        minHeight: '620px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      {/* Background Fullscreen Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/team.jpg"
        aria-hidden="true"
        src="https://ozrit-office.b-cdn.net/download%20(1)%20(1).mp4"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />

      {/* Atmospheric Overlays matching live Ozrit */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.1) 100%)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.65) 100%)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Hero Content matching exact typography of live Ozrit */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '80px 24px 0 24px',
          width: '100%'
        }}
      >
        <div style={{ maxWidth: '880px', textAlign: 'left', color: '#ffffff' }}>
          
          <h1
            style={{
              fontSize: 'clamp(2.4rem, 5.2vw, 4.2rem)',
              fontWeight: '800',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              margin: '0 0 22px 0'
            }}
          >
            <span style={{ display: 'block' }}>Custom Software and</span>
            <span style={{ display: 'block' }}>AI Systems Built for</span>
            <span style={{ display: 'block' }}>Indian and Global Enterprises</span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '680px',
              fontWeight: '400',
              lineHeight: 1.6,
              margin: '0 0 36px 0'
            }}
          >
            From Hyderabad. 500+ engineers. Production-grade delivery across healthcare, fintech, logistics, and SaaS.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px' }}>
            {/* Primary Button */}
            <a
              href="#process-section"
              className="gl-btn-primary"
              style={{
                fontSize: '16px',
                padding: '14px 32px'
              }}
            >
              <span className="shimmer" />
              <span>See How We Work</span>
              <ArrowRight size={18} />
            </a>

            {/* Secondary Button */}
            <a
              href="#contact-section"
              className="gl-btn-secondary"
              style={{
                fontSize: '16px',
                padding: '14px 32px'
              }}
            >
              <span>Talk to Our Team</span>
              <ArrowUpRight size={18} />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
