import React from 'react';

export default function AIEcosystemSection() {
  return (
    <section
      id="ai-ecosystems"
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#070707',
        color: '#ffffff',
        overflow: 'hidden'
      }}
    >
      <style>{`
        .oz-ai-container {
          position: relative;
          min-height: 520px;
          display: flex;
          flex-direction: column;
        }
        .oz-ai-video-wrap {
          position: relative;
          width: 100%;
          height: 320px;
          overflow: hidden;
        }
        .oz-ai-content-wrap {
          position: relative;
          z-index: 10;
          padding: 48px 24px 64px 24px;
        }
        @media (min-width: 1024px) {
          .oz-ai-container {
            flex-direction: row;
            min-height: 580px;
            align-items: center;
          }
          .oz-ai-video-wrap {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            width: 48%;
            height: 100%;
          }
          .oz-ai-content-wrap {
            margin-left: 50%;
            padding: 80px 48px 80px 32px;
            max-width: 700px;
          }
        }
      `}</style>

      <div className="oz-ai-container">
        {/* Left Side: Cinematic AI Hand Video */}
        <div className="oz-ai-video-wrap">
          <video
            src="https://vibemart-ozrit.b-cdn.net/ai3.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          {/* Subtle gradient overlays */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, rgba(0,0,0,0.3), transparent 70%, rgba(7,7,7,0.8))'
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, rgba(0, 102, 255, 0.15), transparent 70%, rgba(0, 194, 255, 0.12))'
            }}
          />
          {/* Edge fade to #070707 for desktop */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              width: '35%',
              background: 'linear-gradient(to left, #070707, transparent)',
              pointerEvents: 'none'
            }}
          />
        </div>

        {/* Right Side: Exact typography from live Ozrit */}
        <div className="oz-ai-content-wrap">
          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4.4vw, 3.5rem)',
              fontWeight: '300',
              fontStyle: 'italic',
              color: 'rgba(255, 255, 255, 0.85)',
              lineHeight: 1.15,
              margin: '0 0 20px 0',
              letterSpacing: '-0.02em'
            }}
          >
            Building AI Ecosystems
            <span
              style={{
                display: 'block',
                fontStyle: 'normal',
                fontWeight: '700',
                color: '#ffffff',
                marginTop: '6px'
              }}
            >
              That Align With Your Organization
            </span>
          </h2>

          <p
            style={{
              fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
              color: 'rgba(255, 255, 255, 0.65)',
              lineHeight: 1.7,
              maxWidth: '520px',
              margin: 0
            }}
          >
            Custom AI and ML models, conversational assistants, and generative systems built on your data and embedded directly into the platforms your teams already run on.
          </p>
        </div>
      </div>
    </section>
  );
}
