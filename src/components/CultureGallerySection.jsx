import React from 'react';

const PHOTOS = [
  { src: '/team/team1.jpg', alt: 'GateLink engineering team collaborating at Hyderabad tech center' },
  { src: '/team/team2.jpg', alt: 'Inside GateLink open-plan software engineering floor' },
  { src: '/team/team3.jpg', alt: 'GateLink software architects reviewing system design on glass whiteboard' },
  { src: '/team/team4.jpg', alt: 'GateLink engineering team standup in tech lounge' },
  { src: '/team/team5.jpg', alt: 'GateLink frontend developers pair programming at workstation' }
];

export default function CultureGallerySection() {
  // 3x duplicate array to ensure smooth continuous infinite scroll
  const marqueeItems = [...PHOTOS, ...PHOTOS, ...PHOTOS];

  return (
    <section
      id="inside-gatelink"
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: '#080808',
        paddingTop: '90px',
        paddingBottom: '100px',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
        <span
          style={{
            display: 'inline-block',
            marginBottom: '12px',
            fontSize: '12px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: '#00C2FF'
          }}
        >
          Inside GateLink
        </span>

        <h2
          style={{
            fontSize: 'clamp(2rem, 3.8vw, 3rem)',
            fontWeight: '800',
            letterSpacing: '-0.025em',
            color: '#ffffff',
            lineHeight: 1.15,
            margin: '0 0 16px 0'
          }}
        >
          500+ engineers who design, develop, and deliver
        </h2>

        <p
          style={{
            fontSize: '17px',
            color: 'rgba(255, 255, 255, 0.65)',
            maxWidth: '680px',
            lineHeight: 1.6
          }}
        >
          Our people, our Hyderabad office, and the culture behind every project we ship.
        </p>
      </div>

      {/* Infinite Scrolling Office Photo Marquee matching live Ozrit */}
      <div style={{ position: 'relative', marginTop: '48px', overflow: 'hidden' }}>
        
        {/* Soft edge gradient fades */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: '100px',
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
            width: '100px',
            background: 'linear-gradient(to left, #080808, transparent)',
            zIndex: 10,
            pointerEvents: 'none'
          }}
        />

        {/* Scrolling Seamless Filmstrip */}
        <div className="og-track" style={{ display: 'flex', width: 'max-content' }}>
          {marqueeItems.map((item, idx) => (
            <img
              key={idx}
              src={item.src}
              alt={item.alt}
              loading="lazy"
              style={{
                display: 'block',
                height: '320px',
                width: '512px',
                flexShrink: 0,
                objectFit: 'cover'
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
