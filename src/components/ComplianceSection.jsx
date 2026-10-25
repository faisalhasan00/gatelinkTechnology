import React, { useState } from 'react';
import { ChevronDown, ShieldCheck } from 'lucide-react';
import { COMPLIANCE_ITEMS } from '../data/websiteData';

export default function ComplianceSection() {
  const [openIndex, setOpenIndex] = useState(2); // Default to 03 / 06

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
        backgroundColor: '#07080c',
        backgroundImage: 'radial-gradient(ellipse at 15% 45%, rgba(0, 102, 255, 0.09) 0%, transparent 65%)',
        color: '#ffffff',
        padding: '110px 24px 130px 24px',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}
    >
      {/* 3D Wireframe Ring subtle background effect */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          left: '-8%',
          width: '560px',
          height: '560px',
          borderRadius: '50%',
          border: '1px solid rgba(0, 194, 255, 0.12)',
          background: 'radial-gradient(circle, rgba(0, 102, 255, 0.04) 0%, transparent 70%)',
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
                background: 'rgba(0, 102, 255, 0.1)',
                border: '1px solid rgba(0, 194, 255, 0.25)',
                backdropFilter: 'blur(8px)',
                marginBottom: '22px'
              }}
            >
              <ShieldCheck size={16} color="#00C2FF" />
              <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#00C2FF' }}>
                ZERO REGULATORY SURPRISES
              </span>
            </div>

            <h2
              style={{
                fontSize: 'clamp(2.4rem, 4.6vw, 4.2rem)',
                fontWeight: '900',
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                marginBottom: '24px',
                color: '#ffffff'
              }}
            >
              Compliance Built In,
              <span
                style={{
                  display: 'block',
                  background: 'linear-gradient(135deg, #ffffff 40%, #7dd3fc 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Not Bolted On
              </span>
            </h2>

            <p
              style={{
                fontSize: 'clamp(1.05rem, 1.8vw, 1.2rem)',
                lineHeight: 1.7,
                color: 'rgba(255, 255, 255, 0.65)',
                maxWidth: '520px'
              }}
            >
              Regulatory requirements show up in architecture reviews, threat models, and rollout gates from sprint zero. Every system we ship is reviewed against the standards your <strong style={{ color: '#ffffff', textDecoration: 'underline', textUnderlineOffset: '4px', textDecorationColor: '#00C2FF' }}>industry, region, and customers</strong> actually live under, so production never surprises your auditors.
            </p>
          </div>

          {/* Right Column: 6 Interactive Accordion Items matching live Ozrit */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {COMPLIANCE_ITEMS.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  style={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    padding: '24px 0',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
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
                          color: isOpen ? '#00C2FF' : 'rgba(255, 255, 255, 0.4)',
                          letterSpacing: '0.08em',
                          minWidth: '55px',
                          transition: 'color 0.2s'
                        }}
                      >
                        {item.num}
                      </span>

                      <h3
                        style={{
                          fontSize: 'clamp(1.15rem, 2vw, 1.45rem)',
                          fontWeight: '700',
                          color: isOpen ? '#ffffff' : 'rgba(255, 255, 255, 0.85)',
                          margin: 0,
                          letterSpacing: '-0.01em',
                          transition: 'color 0.2s'
                        }}
                      >
                        {item.title}
                      </h3>
                    </div>

                    <div
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), color 0.2s',
                        color: isOpen ? '#00C2FF' : 'rgba(255, 255, 255, 0.4)'
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
                            background: 'rgba(0, 102, 255, 0.1)',
                            backdropFilter: 'blur(8px)',
                            border: '1px solid rgba(0, 194, 255, 0.25)',
                            color: '#7dd3fc',
                            fontSize: '12.5px',
                            fontWeight: '600',
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
            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)' }} />
          </div>

        </div>

      </div>
    </section>
  );
}
