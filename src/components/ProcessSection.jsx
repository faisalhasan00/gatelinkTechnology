import React, { useState } from 'react';

const STEPS = [
  {
    num: '01',
    title: 'Requirement Analysis',
    desc: 'Understanding your business needs',
    position: 'top' // node above center line
  },
  {
    num: '02',
    title: 'Strategy & Planning',
    desc: 'Crafting the right roadmap',
    position: 'bottom' // node below center line
  },
  {
    num: '03',
    title: 'Design & Development',
    desc: 'Building scalable solutions',
    position: 'top'
  },
  {
    num: '04',
    title: 'Testing & Launch',
    desc: 'Ensuring quality delivery',
    position: 'bottom'
  },
  {
    num: '05',
    title: 'Support & Maintenance',
    desc: 'Continuous improvements',
    position: 'top'
  }
];

export default function ProcessSection() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <section
      id="process-section"
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#080808',
        padding: '90px 24px 110px 24px',
        overflow: 'hidden'
      }}
    >
      {/* Subtle ambient radial background */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          height: '60%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(239, 68, 68, 0.04) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Section Heading */}
        <h2
          style={{
            fontSize: 'clamp(2rem, 3.6vw, 3.2rem)',
            fontWeight: '800',
            color: '#ffffff',
            textAlign: 'center',
            marginBottom: '70px',
            letterSpacing: '-0.02em'
          }}
        >
          Our Proven Development Process
        </h2>

        {/* Desktop Sinusoidal Timeline */}
        <div className="oz-process-timeline-desktop" style={{ position: 'relative', padding: '40px 0 20px 0' }}>
          
          {/* Continuous Sinusoidal Wave SVG matching live ozrit */}
          <div
            style={{
              position: 'absolute',
              top: '60px',
              left: '4%',
              right: '4%',
              height: '80px',
              pointerEvents: 'none',
              zIndex: 1
            }}
          >
            <svg
              width="100%"
              height="80"
              viewBox="0 0 1000 80"
              preserveAspectRatio="none"
              style={{ overflow: 'visible' }}
            >
              <defs>
                <linearGradient id="liveProcessGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                  <stop offset="25%" stopColor="#dc2626" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="#ef4444" stopOpacity="0.85" />
                  <stop offset="75%" stopColor="#dc2626" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              <path
                d="M 0 40 C 125 5, 125 75, 250 40 S 375 5, 500 40 S 625 75, 750 40 S 875 5, 1000 40"
                stroke="url(#liveProcessGrad)"
                strokeWidth="1.8"
                fill="none"
                strokeDasharray="6 4"
              />
            </svg>
          </div>

          {/* 5 Evenly Distributed Step Items */}
          <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 10 }}>
            {STEPS.map((step, idx) => {
              const isHovered = hoveredIdx === idx;
              // Node vertical positioning: top nodes sit slightly higher, bottom nodes sit slightly lower
              const nodeOffsetY = step.position === 'top' ? '-10px' : '15px';

              return (
                <div
                  key={step.num}
                  style={{
                    width: '19%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'default',
                    textAlign: 'center',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  {/* Glowing Circular Number Node */}
                  <div
                    style={{
                      position: 'relative',
                      marginBottom: '24px',
                      transform: `translateY(${nodeOffsetY})`,
                      transition: 'transform 0.3s ease'
                    }}
                  >
                    {/* Pulsing Backing Glow */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: '-12px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(239, 68, 68, 0.45) 0%, transparent 70%)',
                        opacity: isHovered ? 1 : 0.4,
                        transform: isHovered ? 'scale(1.25)' : 'scale(1)',
                        transition: 'all 0.3s ease',
                        pointerEvents: 'none'
                      }}
                    />

                    <div
                      style={{
                        position: 'relative',
                        width: '54px',
                        height: '54px',
                        borderRadius: '50%',
                        backgroundColor: '#0a0a0a',
                        border: isHovered ? '1.5px solid #ef4444' : '1.5px solid rgba(255, 255, 255, 0.18)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: isHovered
                          ? '0 0 20px rgba(239, 68, 68, 0.6)'
                          : '0 4px 15px rgba(0, 0, 0, 0.5)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <span
                        style={{
                          fontSize: '13px',
                          fontWeight: '700',
                          color: isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.85)'
                        }}
                      >
                        {step.num}
                      </span>
                    </div>
                  </div>

                  {/* Title & One-line Description matching live Ozrit */}
                  <div style={{ marginTop: '8px' }}>
                    <h3
                      style={{
                        fontSize: '15px',
                        fontWeight: '700',
                        color: isHovered ? '#ef4444' : '#ffffff',
                        marginBottom: '6px',
                        transition: 'color 0.25s ease'
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '12.5px',
                        color: 'rgba(255, 255, 255, 0.45)',
                        lineHeight: 1.5,
                        maxWidth: '190px',
                        margin: '0 auto'
                      }}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="oz-process-timeline-mobile" style={{ flexDirection: 'column', gap: '32px', position: 'relative', paddingLeft: '48px' }}>
          {/* Vertical Timeline Guide Line */}
          <div
            style={{
              position: 'absolute',
              left: '20px',
              top: '12px',
              bottom: '12px',
              width: '2px',
              background: 'linear-gradient(to bottom, #ef4444, #dc2626, #b91c1c)',
              opacity: 0.4
            }}
          />

          {STEPS.map((step) => (
            <div key={step.num} style={{ position: 'relative' }}>
              {/* Circular Step Badge */}
              <div
                style={{
                  position: 'absolute',
                  left: '-48px',
                  top: '0',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: '#0a0a0a',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)'
                }}
              >
                <span style={{ fontSize: '12px', fontWeight: '800', color: '#ef4444' }}>
                  {step.num}
                </span>
              </div>

              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#ffffff', marginBottom: '4px' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.55)', lineHeight: 1.5 }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
