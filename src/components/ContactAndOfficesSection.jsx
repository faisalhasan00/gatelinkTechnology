import React, { useState } from 'react';
import { Send, CheckCircle2, Clock, ShieldCheck, MapPin, Phone, Mail, ArrowUpRight, ArrowRight } from 'lucide-react';
import { HYDERABAD_HEADQUARTERS } from '../data/websiteData';

function triggerConfetti() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  const w = (canvas.width = window.innerWidth);
  const h = (canvas.height = window.innerHeight);

  const colors = ['#0066FF', '#00C2FF', '#0052CC', '#38BDF8', '#FF7A00', '#ffffff'];
  const particles = Array.from({ length: 90 }).map(() => ({
    x: w / 2,
    y: h * 0.6,
    vx: (Math.random() - 0.5) * 16,
    vy: -(Math.random() * 12 + 6),
    color: colors[Math.floor(Math.random() * colors.length)],
    size: Math.random() * 8 + 4,
    rotation: Math.random() * 360,
    rotSpeed: (Math.random() - 0.5) * 10,
    alpha: 1
  }));

  let frame = 0;
  function animate() {
    ctx.clearRect(0, 0, w, h);
    let alive = false;
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35;
      p.rotation += p.rotSpeed;
      p.alpha -= 0.012;
      if (p.alpha > 0) {
        alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      }
    });
    if (alive && frame < 150) {
      frame++;
      requestAnimationFrame(animate);
    } else {
      canvas.remove();
    }
  }
  requestAnimationFrame(animate);
}

export default function ContactAndOfficesSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    purpose: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      triggerConfetti();
    }, 600);
  };

  return (
    <section
      id="contact-section"
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#000000',
        color: '#ffffff',
        padding: '100px 24px 110px 24px',
        overflow: 'hidden'
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        
        {/* Section Top Header */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '24px', marginBottom: '48px' }}>
          <div>
            <span
              style={{
                fontSize: '11px',
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '0.22em',
                color: '#00C2FF',
                display: 'block',
                marginBottom: '10px'
              }}
            >
              START A CONVERSATION
            </span>
            <h2
              style={{
                fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
                fontWeight: '800',
                letterSpacing: '-0.025em',
                color: '#ffffff',
                margin: 0
              }}
            >
              Collaborate with GateLink
            </h2>
          </div>

          <div>
            <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'rgba(255, 255, 255, 0.7)', margin: 0 }}>
              Our Headquarters
            </h3>
          </div>
        </div>

        {/* Side-by-Side: White Contact Form (Left) & Hyderabad Headquarters (Right) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(340px, 1.15fr) minmax(320px, 1fr)',
            gap: '40px',
            alignItems: 'stretch'
          }}
          className="contact-offices-grid"
        >
          {/* Left: White Card Contact Form matching Ozrit Screenshot */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              padding: '40px 36px',
              color: '#111827',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4)'
            }}
          >
            {submitted ? (
              <div style={{ padding: '60px 20px', textAlign: 'center' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: '#e0f2fe',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px auto'
                  }}
                >
                  <CheckCircle2 size={36} color="#0066FF" />
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#111827', marginBottom: '12px' }}>
                  Enquiry Dispatched Successfully!
                </h3>
                <p style={{ fontSize: '15px', color: '#4b5563', lineHeight: 1.6, maxWidth: '440px', margin: '0 auto 28px auto' }}>
                  Thank you, <strong>{formData.name}</strong>. A GateLink engineering lead will review your project requirements and connect within 4 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  style={{
                    padding: '12px 28px',
                    borderRadius: '9999px',
                    background: 'linear-gradient(135deg, #0052CC 0%, #0076FE 60%, #00C2FF 100%)',
                    color: '#fff',
                    border: 'none',
                    fontWeight: '700',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(0, 102, 255, 0.35)'
                  }}
                >
                  Submit Another Project
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Name Input */}
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#374151', marginBottom: '8px' }}>
                    YOUR FULL NAME *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      borderRadius: '12px',
                      border: '1px solid #d1d5db',
                      backgroundColor: '#f9fafb',
                      fontSize: '14px',
                      color: '#111827',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#0066FF')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#d1d5db')}
                  />
                </div>

                {/* Email and Phone Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#374151', marginBottom: '8px' }}>
                      EMAIL *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@company.com"
                      style={{
                        width: '100%',
                        padding: '14px 18px',
                        borderRadius: '12px',
                        border: '1px solid #d1d5db',
                        backgroundColor: '#f9fafb',
                        fontSize: '14px',
                        color: '#111827',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#0066FF')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = '#d1d5db')}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#374151', marginBottom: '8px' }}>
                      PHONE *
                    </label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          padding: '0 12px',
                          borderRadius: '12px',
                          border: '1px solid #d1d5db',
                          backgroundColor: '#f3f4f6',
                          fontSize: '13px',
                          fontWeight: '700',
                          color: '#374151'
                        }}
                      >
                        IN +91
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Mobile number"
                        style={{
                          width: '100%',
                          padding: '14px 18px',
                          borderRadius: '12px',
                          border: '1px solid #d1d5db',
                          backgroundColor: '#f9fafb',
                          fontSize: '14px',
                          color: '#111827',
                          outline: 'none',
                          transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = '#0066FF')}
                        onBlur={(e) => (e.currentTarget.style.borderColor = '#d1d5db')}
                      />
                    </div>
                  </div>
                </div>

                {/* Purpose Dropdown */}
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#374151', marginBottom: '8px' }}>
                    PURPOSE *
                  </label>
                  <select
                    name="purpose"
                    required
                    value={formData.purpose}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      borderRadius: '12px',
                      border: '1px solid #d1d5db',
                      backgroundColor: '#f9fafb',
                      fontSize: '14px',
                      color: '#111827',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="">Select Purpose</option>
                    <option value="Enterprise Custom Software">Enterprise Custom Software</option>
                    <option value="AI / ML Systems & Autonomous Agents">AI / ML Systems & Autonomous Agents</option>
                    <option value="Mobile App Engineering (React Native / iOS / Android)">Mobile App Engineering</option>
                    <option value="Cloud Modernization & Architecture Audit">Cloud Modernization & Architecture</option>
                    <option value="Engineering Staff Augmentation">Engineering Staff Augmentation</option>
                  </select>
                </div>

                {/* Message Textarea */}
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#374151', marginBottom: '8px' }}>
                    MESSAGE *
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      borderRadius: '12px',
                      border: '1px solid #d1d5db',
                      backgroundColor: '#f9fafb',
                      fontSize: '14px',
                      color: '#111827',
                      outline: 'none',
                      resize: 'none',
                      fontFamily: 'inherit',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#0066FF')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = '#d1d5db')}
                  />
                </div>

                {/* Submit Button matching live Ozrit */}
                <div style={{ marginTop: '8px' }}>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '14px 36px',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #0052CC 0%, #0076FE 60%, #00C2FF 100%)',
                      color: '#ffffff',
                      border: 'none',
                      fontSize: '15px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      boxShadow: '0 4px 15px rgba(0, 102, 255, 0.4)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 102, 255, 0.55)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 102, 255, 0.4)';
                    }}
                  >
                    <span>{loading ? 'Submitting...' : 'Submit'}</span>
                    <ArrowRight size={16} color="#ffffff" />
                  </button>
                </div>

                <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0 0 0', lineHeight: 1.5 }}>
                  We respond to every business enquiry within 4 working hours (IST, Mon–Fri).
                </p>
              </form>
            )}
          </div>

          {/* Right: Dedicated Hyderabad Global Headquarters Showcase */}
          <div
            style={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              backgroundColor: '#0a0a0a',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '520px'
            }}
          >
            {/* Background Building Image with Gradient Overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${HYDERABAD_HEADQUARTERS.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(0.65)'
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, #000000 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.7) 100%)'
              }}
            />

            {/* Top Badge & Live Indicator */}
            <div style={{ position: 'relative', zIndex: 2, padding: '32px 32px 0 32px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(0, 102, 255, 0.2)',
                  border: '1px solid rgba(0, 194, 255, 0.45)',
                  backdropFilter: 'blur(8px)',
                  marginBottom: '16px'
                }}
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#00C2FF', display: 'inline-block' }} />
                <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#ffffff' }}>
                  CENTRAL ENGINEERING CAMPUS
                </span>
              </div>

              <h3 style={{ fontSize: '36px', fontWeight: '900', color: '#ffffff', letterSpacing: '-0.02em', margin: 0 }}>
                {HYDERABAD_HEADQUARTERS.city}
              </h3>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#00C2FF', marginTop: '4px' }}>
                {HYDERABAD_HEADQUARTERS.building}
              </div>
            </div>

            {/* Bottom Address, Direct Contact & Map Link */}
            <div style={{ position: 'relative', zIndex: 2, padding: '0 32px 32px 32px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <MapPin size={18} color="#00C2FF" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.5 }}>
                    {HYDERABAD_HEADQUARTERS.address}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Phone size={16} color="#00C2FF" />
                  <a href={`tel:${HYDERABAD_HEADQUARTERS.phone}`} style={{ fontSize: '14px', color: '#ffffff', textDecoration: 'none', fontWeight: '600' }}>
                    {HYDERABAD_HEADQUARTERS.phone}
                  </a>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Mail size={16} color="#00C2FF" />
                  <a href={`mailto:${HYDERABAD_HEADQUARTERS.email}`} style={{ fontSize: '14px', color: '#ffffff', textDecoration: 'none', fontWeight: '600' }}>
                    {HYDERABAD_HEADQUARTERS.email}
                  </a>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Clock size={16} color="#00C2FF" />
                  <span style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)' }}>
                    {HYDERABAD_HEADQUARTERS.workingHours}
                  </span>
                </div>
              </div>

              <a
                href={HYDERABAD_HEADQUARTERS.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  color: '#ffffff',
                  fontSize: '13.5px',
                  fontWeight: '700',
                  textDecoration: 'none',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#0066FF';
                  e.currentTarget.style.borderColor = '#00C2FF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                }}
              >
                <span>Open Google Maps</span>
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
