import React from 'react';
import { Star, MessageCircle } from 'lucide-react';
import { RATINGS } from '../data/websiteData';

const SOCIAL_ICONS = [
  {
    name: 'Facebook',
    href: 'https://facebook.com',
    svg: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    )
  },
  {
    name: 'X (Twitter)',
    href: 'https://x.com',
    svg: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    )
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com',
    svg: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
      </svg>
    )
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com',
    svg: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    )
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com',
    svg: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.78v8.37H6.46v-8.37M7.85 6.46a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24Z"/>
      </svg>
    )
  }
];

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#000000',
        color: '#ffffff',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative',
        zIndex: 20
      }}
    >
      {/* 5-Star Ratings Strip matching Ozrit Screenshot */}
      <div
        style={{
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '28px 24px'
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '16px'
            }}
          >
            {RATINGS.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px 18px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.07)',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(237, 0, 0, 0.3)';
                  e.currentTarget.style.background = 'rgba(237, 0, 0, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.07)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                }}
              >
                <Star size={14} fill="#f59e0b" color="#f59e0b" />
                <span style={{ fontSize: '13.5px', fontWeight: '800', color: '#ffffff' }}>
                  {item.score}
                </span>
                <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'rgba(255, 255, 255, 0.5)' }}>
                  {item.platform}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar: Logo + Social + Links */}
      <div style={{ padding: '36px 24px 44px 24px' }}>
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px'
          }}
        >
          {/* Logo & Copyright */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <a href="#" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <img
                src="/gatelink-logo.png"
                alt="GateLink Technologies Logo"
                style={{
                  height: '34px',
                  width: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                  filter: 'drop-shadow(0 0 10px rgba(0, 163, 255, 0.25))'
                }}
              />
            </a>

            <div style={{ fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.45)' }}>
              Copyright © {new Date().getFullYear()} GateLink Technologies. All Rights Reserved.
            </div>
          </div>

          {/* Social Icons (5 Circles) matching Ozrit screenshot 24 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {SOCIAL_ICONS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255, 255, 255, 0.7)',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#ED0000';
                  e.currentTarget.style.borderColor = '#ED0000';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                }}
              >
                {social.svg}
              </a>
            ))}
          </div>

          {/* Footer Navigation Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <a href="#process-section" style={{ color: 'rgba(255, 255, 255, 0.55)', fontSize: '13px', textDecoration: 'none', transition: 'color 0.2s' }}>
              How We Work
            </a>
            <a href="#compliance" style={{ color: 'rgba(255, 255, 255, 0.55)', fontSize: '13px', textDecoration: 'none', transition: 'color 0.2s' }}>
              Compliance
            </a>
            <a href="#contact-section" style={{ color: 'rgba(255, 255, 255, 0.55)', fontSize: '13px', textDecoration: 'none', transition: 'color 0.2s' }}>
              Contact Us
            </a>
            <a href="#contact-section" style={{ color: 'rgba(255, 255, 255, 0.55)', fontSize: '13px', textDecoration: 'none', transition: 'color 0.2s' }}>
              Privacy Policy
            </a>
          </div>

        </div>
      </div>

      {/* Floating WhatsApp Action Widget (Official OZRIT) */}
      <a
        href="https://wa.me/919177756789"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Connect on WhatsApp"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 100,
          width: '54px',
          height: '54px',
          borderRadius: '50%',
          backgroundColor: '#25D366',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 25px rgba(37, 211, 102, 0.45)',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.08)';
          e.currentTarget.style.boxShadow = '0 12px 30px rgba(37, 211, 102, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(37, 211, 102, 0.45)';
        }}
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="#ffffff">
          <path d="M12.031 2C6.495 2 2 6.495 2 12.031c0 1.947.556 3.766 1.521 5.309L2 22l4.828-1.503c1.488.89 3.226 1.402 5.203 1.402 5.536 0 10.031-4.495 10.031-10.031C22.062 6.495 17.567 2 12.031 2Zm0 18.328c-1.745 0-3.328-.508-4.667-1.378l-.334-.216-3.111.968.989-3.036-.237-.361a8.27 8.27 0 0 1-1.341-4.674c0-4.606 3.747-8.353 8.353-8.353s8.353 3.747 8.353 8.353-3.747 8.353-8.353 8.353Zm4.622-6.262c-.253-.127-1.498-.74-1.73-.824-.233-.085-.402-.127-.571.127-.169.254-.656.824-.804.994-.148.169-.296.19-.549.063-.253-.127-1.07-.394-2.038-1.257-.753-.672-1.262-1.502-1.41-1.756-.148-.254-.016-.391.111-.518.115-.114.254-.296.381-.444.127-.148.169-.254.254-.423.085-.169.042-.317-.021-.444-.063-.127-.571-1.376-.783-1.883-.206-.495-.415-.428-.571-.436-.148-.008-.317-.01-.487-.01-.169 0-.444.063-.677.317-.233.254-.888.868-.888 2.116s.91 2.455 1.037 2.624c.127.169 1.791 2.735 4.339 3.834.606.262 1.08.419 1.449.536.609.193 1.163.166 1.601.101.488-.073 1.498-.613 1.71-1.206.211-.593.211-1.101.148-1.206-.063-.106-.233-.169-.486-.296Z" />
        </svg>
      </a>
    </footer>
  );
}
