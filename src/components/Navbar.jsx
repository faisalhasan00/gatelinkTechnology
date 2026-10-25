import React, { useState, useEffect, useRef } from 'react';
import { Phone, Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react';

const ABOUT_LINKS = [
  { name: 'Careers', href: '#contact-section', badge: 'Hiring' },
  { name: 'Our Team', href: '#inside-ozrit' },
  { name: 'Our Office', href: '#offices' },
  { name: 'Case Studies', href: '#case-studies' },
  { name: 'How We Work', href: '#process-section' },
  { name: 'Compliance', href: '#compliance' }
];

const SERVICES_MEGA = [
  {
    title: 'Software Development',
    links: [
      { name: 'Enterprise Software Development', href: '#services-section' },
      { name: 'SaaS Development', href: '#services-section' },
      { name: 'Website Development', href: '#services-section' },
      { name: 'Mobile App Development', href: '#services-section' },
      { name: 'Application Development', href: '#services-section' },
      { name: 'Blockchain Development', href: '#services-section' },
      { name: 'Custom Software', href: '#services-section' },
      { name: 'E-commerce', href: '#services-section' },
      { name: 'Testing & QA', href: '#services-section' },
      { name: 'AI & ML Development', href: '#ai-ecosystems' }
    ]
  },
  {
    title: 'Design & Digital',
    links: [
      { name: 'CX & DX Solutions', href: '#services-section' },
      { name: 'UI/UX Design Services', href: '#services-section' },
      { name: 'Frontend Engineering Services', href: '#services-section' },
      { name: 'Web Design Services', href: '#services-section' }
    ]
  },
  {
    title: 'AI & ML',
    links: [
      { name: 'AI Development', href: '#ai-ecosystems' },
      { name: 'ML Development', href: '#ai-ecosystems' },
      { name: 'ChatGPT Solutions', href: '#ai-ecosystems' },
      { name: 'AI Chatbot Development', href: '#ai-ecosystems' },
      { name: 'Large Language Model', href: '#ai-ecosystems' },
      { name: 'Generative AI', href: '#ai-ecosystems' }
    ]
  },
  {
    title: 'Digital & Branding',
    links: [
      { name: 'Digital Marketing Services', href: '#services-section' },
      { name: 'SEO Services', href: '#services-section' },
      { name: 'Pay-Per-Click Advertising', href: '#services-section' },
      { name: 'Content Marketing Services', href: '#services-section' },
      { name: 'Email Marketing Services', href: '#services-section' },
      { name: 'Influencer Partnerships', href: '#services-section' },
      { name: 'Social Media Marketing', href: '#services-section' }
    ]
  }
];

const INDUSTRIES_LINKS = [
  { name: 'Health & Fitness', href: '#industries-section' },
  { name: 'Sports & Fitness', href: '#industries-section' },
  { name: 'Information Technology', href: '#industries-section' },
  { name: 'Education', href: '#industries-section' },
  { name: 'Finance & Fintech', href: '#industries-section' },
  { name: 'Real Estate', href: '#industries-section' },
  { name: 'Retail & E-commerce', href: '#industries-section' },
  { name: 'Supply Chain Logistics', href: '#industries-section' },
  { name: 'Food and Hospitality', href: '#industries-section' },
  { name: 'Food Delivery Apps', href: '#industries-section' },
  { name: 'Grocery Apps', href: '#industries-section' },
  { name: 'Hotel Booking Apps', href: '#industries-section' }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileAccordion, setMobileAccordion] = useState(null);
  const dropdownTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (menu) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: '#ffffff',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: isScrolled
            ? '0 4px 25px rgba(0, 0, 0, 0.08)'
            : '0 1px 3px rgba(0, 0, 0, 0.02)',
          transition: 'all 0.3s ease',
          height: '70px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            padding: '0 24px',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%'
          }}
        >
          {/* Logo */}
          <a
            href="#"
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              height: '36px'
            }}
          >
            <img
              src="https://vibemart-ozrit.b-cdn.net/ozrit-website-logos/LOGO/OZRIT_logo_Alpha.svg"
              alt="OZRIT Logo"
              style={{
                height: '34px',
                width: 'auto',
                maxHeight: '34px',
                maxWidth: '180px',
                objectFit: 'contain',
                display: 'block'
              }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextSibling.style.display = 'flex';
              }}
            />
            {/* Fallback branded text mark */}
            <div
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  backgroundColor: '#ED0000',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '900',
                  fontSize: '18px'
                }}
              >
                O
              </div>
              <span
                style={{
                  fontSize: '22px',
                  fontWeight: '900',
                  color: '#000000',
                  letterSpacing: '-0.02em'
                }}
              >
                OZRIT
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '30px',
              height: '100%'
            }}
            className="oz-desktop-nav"
          >
            <style>{`
              @media (min-width: 1024px) {
                .oz-desktop-nav {
                  display: flex !important;
                }
                .oz-desktop-contact {
                  display: inline-flex !important;
                }
                .oz-mobile-toggle {
                  display: none !important;
                }
              }
              @media (max-width: 1023px) {
                .oz-desktop-nav {
                  display: none !important;
                }
                .oz-desktop-contact {
                  display: none !important;
                }
                .oz-mobile-toggle {
                  display: flex !important;
                }
              }
            `}</style>

            <a
              href="#"
              style={{
                color: '#232323',
                fontSize: '14.5px',
                fontWeight: '500',
                textDecoration: 'none',
                transition: 'color 0.2s',
                padding: '20px 0'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ED0000')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#232323')}
            >
              Home
            </a>

            {/* About Us Dropdown */}
            <div
              style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}
              onMouseEnter={() => handleMouseEnter('about')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  color: activeDropdown === 'about' ? '#ED0000' : '#232323',
                  fontSize: '14.5px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '20px 0'
                }}
              >
                <span>About Us</span>
                <ChevronDown
                  size={14}
                  style={{
                    transform: activeDropdown === 'about' ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s',
                    color: activeDropdown === 'about' ? '#ED0000' : '#888'
                  }}
                />
              </button>

              {activeDropdown === 'about' && (
                <div
                  style={{
                    position: 'absolute',
                    top: '70px',
                    left: 0,
                    width: '240px',
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)',
                    border: '1px solid #f3f4f6',
                    padding: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    zIndex: 1100
                  }}
                  onMouseEnter={() => handleMouseEnter('about')}
                  onMouseLeave={handleMouseLeave}
                >
                  {ABOUT_LINKS.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setActiveDropdown(null)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        fontSize: '13.5px',
                        fontWeight: '500',
                        color: '#374151',
                        textDecoration: 'none',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#fef2f2';
                        e.currentTarget.style.color = '#ED0000';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#374151';
                      }}
                    >
                      <span>{link.name}</span>
                      {link.badge ? (
                        <span
                          style={{
                            fontSize: '10px',
                            fontWeight: '700',
                            textTransform: 'uppercase',
                            padding: '2px 8px',
                            borderRadius: '9999px',
                            backgroundColor: '#fee2e2',
                            color: '#ED0000'
                          }}
                        >
                          {link.badge}
                        </span>
                      ) : (
                        <ArrowUpRight size={13} color="#ED0000" />
                      )}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Services 4-Column Mega Menu */}
            <div
              style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}
              onMouseEnter={() => handleMouseEnter('services')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  color: activeDropdown === 'services' ? '#ED0000' : '#232323',
                  fontSize: '14.5px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '20px 0'
                }}
              >
                <span>Services</span>
                <ChevronDown
                  size={14}
                  style={{
                    transform: activeDropdown === 'services' ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s',
                    color: activeDropdown === 'services' ? '#ED0000' : '#888'
                  }}
                />
              </button>

              {activeDropdown === 'services' && (
                <div
                  style={{
                    position: 'fixed',
                    top: '70px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '92vw',
                    maxWidth: '1200px',
                    backgroundColor: '#ffffff',
                    borderRadius: '20px',
                    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.18)',
                    border: '1px solid #f3f4f6',
                    padding: '32px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '28px',
                    zIndex: 1100
                  }}
                  onMouseEnter={() => handleMouseEnter('services')}
                  onMouseLeave={handleMouseLeave}
                >
                  {SERVICES_MEGA.map((pillar) => (
                    <div key={pillar.title} style={{ display: 'flex', flexDirection: 'column' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          marginBottom: '16px',
                          paddingBottom: '10px',
                          borderBottom: '1px solid #f3f4f6'
                        }}
                      >
                        <span
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: '#ED0000',
                            display: 'inline-block'
                          }}
                        />
                        <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#111827', margin: 0 }}>
                          {pillar.title}
                        </h4>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {pillar.links.map((link) => (
                          <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setActiveDropdown(null)}
                            style={{
                              fontSize: '13px',
                              color: '#4b5563',
                              textDecoration: 'none',
                              padding: '4px 0',
                              transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = '#ED0000';
                              e.currentTarget.style.transform = 'translateX(4px)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = '#4b5563';
                              e.currentTarget.style.transform = 'none';
                            }}
                          >
                            {link.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Industries Dropdown */}
            <div
              style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}
              onMouseEnter={() => handleMouseEnter('industries')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  color: activeDropdown === 'industries' ? '#ED0000' : '#232323',
                  fontSize: '14.5px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '20px 0'
                }}
              >
                <span>Industries</span>
                <ChevronDown
                  size={14}
                  style={{
                    transform: activeDropdown === 'industries' ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s',
                    color: activeDropdown === 'industries' ? '#ED0000' : '#888'
                  }}
                />
              </button>

              {activeDropdown === 'industries' && (
                <div
                  style={{
                    position: 'absolute',
                    top: '70px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '480px',
                    backgroundColor: '#ffffff',
                    borderRadius: '18px',
                    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)',
                    border: '1px solid #f3f4f6',
                    padding: '20px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '6px',
                    zIndex: 1100
                  }}
                  onMouseEnter={() => handleMouseEnter('industries')}
                  onMouseLeave={handleMouseLeave}
                >
                  {INDUSTRIES_LINKS.map((ind) => (
                    <a
                      key={ind.name}
                      href={ind.href}
                      onClick={() => setActiveDropdown(null)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '8px',
                        fontSize: '13.5px',
                        fontWeight: '500',
                        color: '#374151',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#fef2f2';
                        e.currentTarget.style.color = '#ED0000';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#374151';
                      }}
                    >
                      <span>{ind.name}</span>
                      <ArrowUpRight size={12} color="#ED0000" />
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a
              href="#insights-section"
              style={{
                color: '#232323',
                fontSize: '14.5px',
                fontWeight: '500',
                textDecoration: 'none',
                transition: 'color 0.2s',
                padding: '20px 0'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ED0000')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#232323')}
            >
              Insights
            </a>

            <a
              href="#contact-section"
              style={{
                color: '#232323',
                fontSize: '14.5px',
                fontWeight: '500',
                textDecoration: 'none',
                transition: 'color 0.2s',
                padding: '20px 0'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ED0000')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#232323')}
            >
              Contact Us
            </a>
          </nav>

          {/* Right Action Button & Mobile Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a
              href="tel:+917382373824"
              aria-label="Call OZRIT at +91 7382373824"
              className="oz-desktop-contact"
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 22px',
                backgroundColor: '#dc2626',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: '600',
                borderRadius: '6px',
                textDecoration: 'none',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#b91c1c')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#dc2626')}
            >
              <Phone size={15} />
              <span>Contact</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="oz-mobile-toggle"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px',
                backgroundColor: 'transparent',
                border: 'none',
                color: '#000000',
                cursor: 'pointer'
              }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            top: '70px',
            zIndex: 999,
            backgroundColor: '#ffffff',
            padding: '24px',
            overflowY: 'auto'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <a
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              style={{ fontSize: '16px', fontWeight: '600', color: '#111827', textDecoration: 'none', padding: '10px 0', borderBottom: '1px solid #f3f4f6' }}
            >
              Home
            </a>

            <div style={{ borderBottom: '1px solid #f3f4f6', paddingBottom: '10px' }}>
              <div
                onClick={() => setMobileAccordion(mobileAccordion === 'about' ? null : 'about')}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', fontSize: '16px', fontWeight: '600', color: '#111827', cursor: 'pointer' }}
              >
                <span>About Us</span>
                <ChevronDown size={16} />
              </div>
              {mobileAccordion === 'about' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingLeft: '14px', paddingTop: '8px' }}>
                  {ABOUT_LINKS.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      style={{ fontSize: '14px', color: '#4b5563', textDecoration: 'none' }}
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div style={{ borderBottom: '1px solid #f3f4f6', paddingBottom: '10px' }}>
              <div
                onClick={() => setMobileAccordion(mobileAccordion === 'services' ? null : 'services')}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', fontSize: '16px', fontWeight: '600', color: '#111827', cursor: 'pointer' }}
              >
                <span>Services</span>
                <ChevronDown size={16} />
              </div>
              {mobileAccordion === 'services' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingLeft: '14px', paddingTop: '8px' }}>
                  {SERVICES_MEGA.map((p) => (
                    <div key={p.title}>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: '#ED0000', marginBottom: '4px' }}>{p.title}</div>
                      {p.links.slice(0, 4).map((l) => (
                        <a
                          key={l.name}
                          href={l.href}
                          onClick={() => setMobileMenuOpen(false)}
                          style={{ display: 'block', fontSize: '13px', color: '#4b5563', textDecoration: 'none', padding: '2px 0' }}
                        >
                          {l.name}
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <a
              href="#insights-section"
              onClick={() => setMobileMenuOpen(false)}
              style={{ fontSize: '16px', fontWeight: '600', color: '#111827', textDecoration: 'none', padding: '10px 0', borderBottom: '1px solid #f3f4f6' }}
            >
              Insights
            </a>

            <a
              href="#contact-section"
              onClick={() => setMobileMenuOpen(false)}
              style={{ fontSize: '16px', fontWeight: '600', color: '#111827', textDecoration: 'none', padding: '10px 0', borderBottom: '1px solid #f3f4f6' }}
            >
              Contact Us
            </a>

            <a
              href="tel:+917382373824"
              style={{
                marginTop: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '14px',
                backgroundColor: '#ED0000',
                color: '#ffffff',
                borderRadius: '10px',
                fontWeight: '600',
                textDecoration: 'none'
              }}
            >
              <Phone size={16} />
              <span>Call +91 7382373824</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
