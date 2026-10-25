import React from 'react';

const PRESS_ITEMS = [
  { name: 'PTI', src: '/pti.png' },
  { name: 'ANI', src: '/ani.png' },
  { name: 'Dailyhunt', src: '/dailyhunt.png' },
  { name: 'Business Standard', src: '/businessstandard.png' },
  { name: 'ThePrint', src: '/theprint.png' },
  { name: 'TV9', src: '/tv9.png' },
  { name: 'Yahoo Finance', src: '/yahoofinance.png' },
  { name: 'JioNews', src: '/jionews.png' },
  { name: 'MSN', src: '/msn.png' },
  { name: 'Telangana Today', src: '/telanganatoday.png' },
  { name: 'Eenadu', src: '/eennadu.png' },
  { name: 'Vaartha Digital', src: '/vaarthadigital.png' },
  { name: 'Udayam', src: '/udayam.png' }
];

export default function PressSection() {
  const marqueeItems = [...PRESS_ITEMS, ...PRESS_ITEMS];

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#f2f2f2',
        padding: '80px 24px 90px 24px',
        overflow: 'hidden',
        borderTop: '1px solid #e5e5e5',
        borderBottom: '1px solid #e5e5e5'
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto 48px auto', textAlign: 'center' }}>
        <h2
          style={{
            fontSize: 'clamp(2rem, 3.8vw, 2.75rem)',
            fontWeight: '800',
            letterSpacing: '-0.025em',
            color: '#141414',
            lineHeight: 1.15,
            margin: '0 0 14px 0'
          }}
        >
          GateLink in the press
        </h2>
        <p style={{ fontSize: '17px', color: '#555555', lineHeight: 1.6 }}>
          Our work and our team have been featured across leading technology and business publications.
        </p>
      </div>

      {/* Infinite Marquee Track with edge gradients */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Soft edge fades */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: '100px',
            background: 'linear-gradient(to right, #f2f2f2, transparent)',
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
            background: 'linear-gradient(to left, #f2f2f2, transparent)',
            zIndex: 10,
            pointerEvents: 'none'
          }}
        />

        <div className="aso-track" style={{ gap: '24px', alignItems: 'center' }}>
          {marqueeItems.map((item, idx) => (
            <div
              key={idx}
              style={{
                width: '192px',
                height: '72px',
                flexShrink: 0,
                borderRadius: '7px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
              }}
            >
              <img
                src={item.src}
                alt={item.name}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '7px',
                  display: 'block'
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
