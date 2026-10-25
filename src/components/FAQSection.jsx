import React, { useState } from 'react';
import { Plus, X, ArrowRight, MessageSquare } from 'lucide-react';
import { FAQ_ITEMS, FAQ_METRICS } from '../data/websiteData';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section
      id="faq-section"
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#060606',
        color: '#ffffff',
        padding: '100px 24px 120px 24px',
        overflow: 'hidden'
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '64px',
            alignItems: 'start'
          }}
        >
          {/* Left Column matching live Ozrit Screenshot */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '0.22em',
                color: '#00C2FF',
                display: 'block',
                marginBottom: '14px'
              }}
            >
              FAQ
            </span>

            <h2
              style={{
                fontSize: 'clamp(2.4rem, 4.2vw, 3.8rem)',
                fontWeight: '800',
                lineHeight: 1.12,
                letterSpacing: '-0.025em',
                color: '#ffffff',
                marginBottom: '16px'
              }}
            >
              Questions?<br />
              <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>We've got answers.</span>
            </h2>

            <p style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.6)', lineHeight: 1.6, marginBottom: '36px' }}>
              Everything you need to know about working with GateLink Technologies, our engineering standards, and production delivery.
            </p>

            {/* Metrics Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '36px' }}>
              {FAQ_METRICS.map((m, mIdx) => (
                <div key={mIdx} style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '14px', padding: '16px', textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: '800', color: '#00C2FF' }}>{m.value}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.6)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '4px' }}>{m.label}</div>
                </div>
              ))}
            </div>

            {/* Have a question CTA Card */}
            <div
              style={{
                background: 'linear-gradient(145deg, rgba(0, 102, 255, 0.12) 0%, rgba(255, 255, 255, 0.02) 100%)',
                border: '1px solid rgba(0, 194, 255, 0.3)',
                borderRadius: '18px',
                padding: '24px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#00C2FF', marginBottom: '8px' }}>
                <MessageSquare size={16} />
                <span style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Have a specific question?
                </span>
              </div>
              <p style={{ fontSize: '13.5px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6, marginBottom: '16px' }}>
                Have an architecture challenge or high-load platform in mind? Let's discuss your requirements with our technical leads.
              </p>
              <a href="#contact-section" className="gl-btn-primary" style={{ padding: '10px 20px', fontSize: '13px' }}>
                <span>Ask Us Directly</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Right Column: 8 Accordion Items */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {FAQ_ITEMS.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  style={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    padding: '26px 0',
                    cursor: 'pointer'
                  }}
                  onClick={() => toggleAccordion(index)}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '20px' }}>
                      <span style={{ fontSize: '13px', fontWeight: '700', color: '#00C2FF', minWidth: '24px' }}>
                        {faq.num}
                      </span>
                      <h3
                        style={{
                          fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)',
                          fontWeight: '700',
                          color: isOpen ? '#ffffff' : 'rgba(255, 255, 255, 0.9)',
                          lineHeight: 1.4,
                          margin: 0
                        }}
                      >
                        {faq.q}
                      </h3>
                    </div>

                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: isOpen ? '#0066FF' : 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid',
                        borderColor: isOpen ? '#00C2FF' : 'rgba(255, 255, 255, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        color: '#ffffff',
                        transition: 'all 0.25s ease'
                      }}
                    >
                      {isOpen ? <X size={15} /> : <Plus size={15} />}
                    </div>
                  </div>

                  {isOpen && (
                    <div style={{ paddingLeft: '44px', paddingTop: '16px' }}>
                      <p style={{ fontSize: '14.5px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.75, margin: 0 }}>
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }} />
          </div>

        </div>

      </div>
    </section>
  );
}
