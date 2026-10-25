import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

export default function OfficesSection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      id="offices"
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#080808',
        padding: '80px 24px 100px 24px',
        overflow: 'hidden'
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        
        {/* Section Header matching live Ozrit */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span
            style={{
              fontSize: '12px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: '#00C2FF',
              display: 'block',
              marginBottom: '12px'
            }}
          >
            Our Offices
          </span>
          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
              fontWeight: '700',
              color: '#ffffff',
              letterSpacing: '-0.025em',
              margin: 0
            }}
          >
            Global Presence, Local Expertise
          </h2>
        </div>

        {/* Authentic OZRIT Single Flagship Office Card (Hyderabad) */}
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <a
            href="https://maps.app.goo.gl/NaRz9ELh7N6Px4nV9"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              height: '380px',
              display: 'block',
              cursor: 'pointer',
              textDecoration: 'none',
              boxShadow: isHovered
                ? '0 25px 50px -12px rgba(0, 102, 255, 0.35), 0 0 0 1px rgba(0, 194, 255, 0.45)'
                : '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.08)',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Office Image */}
            <img
              src="/hyd.webp"
              alt="Hyderabad office building"
              loading="lazy"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            />

            {/* Gradient Overlays */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: isHovered
                  ? 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.25) 100%)'
                  : 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.4) 100%)',
                transition: 'background 0.5s ease'
              }}
            />

            {/* Top Right Map Pin Circle */}
            <div
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                zIndex: 10,
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: isHovered ? 1 : 0.7,
                transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                transition: 'all 0.3s ease'
              }}
            >
              <MapPin size={16} color="#ffffff" />
            </div>

            {/* Bottom Content */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 10,
                padding: '24px 28px'
              }}
            >
              <h3
                style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: isHovered ? '#00C2FF' : '#ffffff',
                  marginBottom: '8px',
                  lineHeight: 1.2,
                  transition: 'color 0.3s ease'
                }}
              >
                Hyderabad
              </h3>
              <p
                style={{
                  fontSize: '14.5px',
                  color: 'rgba(255, 255, 255, 0.95)',
                  fontWeight: '500',
                  lineHeight: 1.5,
                  margin: 0,
                  textShadow: '0 2px 8px rgba(0,0,0,0.8)'
                }}
              >
                1009, 10th Floor, Vasavi Sky City, Gachibowli, Hyderabad, Telangana 500032.
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
