import React, { useState } from 'react';
import { ChevronDown, ShieldCheck } from 'lucide-react';
import { COMPLIANCE_ITEMS } from '../data/websiteData';

export default function ComplianceSection() {
  const [openIndex, setOpenIndex] = useState(2); // Default to 03 / 06 like in screenshot

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section
      id="compliance"
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #003da5 0%, #0052CC 45%, #002B7A 100%)',
        color: '#ffffff',
        padding: '100px 24px 120px 24px'
      }}
    >
      {/* 3D Wireframe Sphere background effect */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          left: '-10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '64px',
            alignItems: 'center'
          }}
        >
          {/* Left Column: Heading and Regulatory Statement */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '9999px',
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(8px)',
                marginBottom: '20px'
              }}
            >
              <ShieldCheck size={16} color="#ffffff" />
              <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                ZERO REGULATORY SURPRISES
              </span>
            </div>

            <h2
              style={{
                fontSize: 'clamp(2.4rem, 4.6vw, 4.2rem)',
                fontWeight: '900',
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                marginBottom: '24px'
              }}
            >
              Compliance Built In,
              <span style={{ display: 'block', opacity: 0.95 }}>
                Not Bolted On
              </span>
            </h2>

            <p
              style={{
                fontSize: 'clamp(1.05rem, 1.8vw, 1.2rem)',
                lineHeight: 1.7,
                color: 'rgba(255, 255, 255, 0.9)',
                maxWidth: '520px'
              }}
            >
              Regulatory requirements show up in architecture reviews, threat models, and rollout gates from sprint zero. Every system we ship is reviewed against the standards your <strong style={{ textDecoration: 'underline', textUnderlineOffset: '4px' }}>industry, region, and customers</strong> actually live under, so production never surprises your auditors.
            </p>
          </div>

          {/* Right Column: 6 Interactive Accordion Items matching live Ozrit Screenshot 10 */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {COMPLIANCE_ITEMS.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  style={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.25)',
                    padding: '24px 0',
                    cursor: 'pointer'
                  }}
                  onClick={() => toggleAccordion(idx)}
                >
                  {/* Accordion Row Header */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                      <span
                        style={{
                          fontSize: '13px',
                          fontWeight: '700',
                          color: 'rgba(255, 255, 255, 0.65)',
                          letterSpacing: '0.08em',
                          minWidth: '55px'
                        }}
                      >
                        {item.num}
                      </span>

                      <h3
                        style={{
                          fontSize: 'clamp(1.15rem, 2vw, 1.45rem)',
                          fontWeight: '700',
                          color: '#ffffff',
                          margin: 0,
                          letterSpacing: '-0.01em'
                        }}
                      >
                        {item.title}
                      </h3>
                    </div>

                    <div
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        color: '#ffffff',
                        opacity: 0.85
                      }}
                    >
                      <ChevronDown size={22} />
                    </div>
                  </div>

                  {/* Expanded Tags */}
                  {isOpen && (
                    <div
                      style={{
                        paddingTop: '18px',
                        paddingLeft: '79px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '10px'
                      }}
                    >
                      {item.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          style={{
                            padding: '6px 16px',
                            borderRadius: '9999px',
                            background: 'rgba(255, 255, 255, 0.2)',
                            backdropFilter: 'blur(8px)',
                            border: '1px solid rgba(255, 255, 255, 0.35)',
                            color: '#ffffff',
                            fontSize: '12.5px',
                            fontWeight: '700',
                            letterSpacing: '0.04em'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.25)' }} />
          </div>

        </div>

      </div>
    </section>
  );
}
