"use client";

import React from 'react';

const Radio = ({ onChange }: { onChange?: (val: string) => void }) => {
  return (
    <div className="styled-radio-wrapper">
      <style dangerouslySetInnerHTML={{__html: `
        .styled-radio-wrapper {
          --accent: #ff3e3e;
          --panel-bg: #000000;
          --wheel-bg: #111111;
          --text-active: #ffffff;
          --text-idle: rgba(255, 255, 255, 0.1);
        }

        .styled-radio-wrapper .wheel-selector {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .styled-radio-wrapper .hint-pop {
          position: absolute;
          top: -40px;
          font-family: "Inter", sans-serif;
          font-weight: 800;
          font-size: 0.6rem;
          letter-spacing: 2px;
          color: #666;
          text-transform: uppercase;
          animation: pulseHint 2s infinite ease-in-out;
          pointer-events: none;
        }

        @keyframes pulseHint {
          0%,
          100% {
            opacity: 0.8;
            transform: translateY(0);
          }
          50% {
            opacity: 1;
            transform: translateY(-2px);
          }
        }

        .styled-radio-wrapper .radio-input {
          position: relative;
          height: 240px;
          width: 280px;
          background: #050505;
          border: 1px solid #222;
          border-radius: 30px;
          overflow: hidden;
          display: flex;
          align-items: center;
          box-shadow:
            0 20px 50px rgba(0, 0, 0, 0.7),
            inset 0 0 20px rgba(0, 0, 0, 1);
        }

        .styled-radio-wrapper .radio-input::after {
          content: "";
          position: absolute;
          right: -200px;
          width: 400px;
          height: 400px;
          background: repeating-conic-gradient(
            from 0deg,
            #111 0deg 10deg,
            #151515 10deg 20deg
          );
          border-radius: 50%;
          z-index: 1;
          opacity: 0.5;
        }
        
        .styled-radio-wrapper .radio-input::before {
          content: "";
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          width: 6px;
          height: 6px;
          background: var(--accent);
          border-radius: 50%;
          z-index: 30;
          box-shadow:
            0 0 15px var(--accent),
            0 0 30px var(--accent);
          pointer-events: none;
        }

        .styled-radio-wrapper .radio-input input {
          display: none;
        }

        .styled-radio-wrapper .glass-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.05) 0%,
            rgba(255, 255, 255, 0) 50%,
            rgba(0, 0, 0, 0.5) 100%
          );
          z-index: 25;
          pointer-events: none;
        }

        .styled-radio-wrapper .wheel-label {
          position: absolute;
          left: 45px;
          display: flex;
          flex-direction: column;
          transition: all 0.7s cubic-bezier(0.19, 1, 0.22, 1);
          transform-origin: 320px center;
          transform: rotate(var(--angle));
          filter: blur(2px);
          opacity: 0.1;
          z-index: 5;
        }

        .styled-radio-wrapper .wheel-label .num {
          font-family: "Inter", sans-serif;
          font-weight: 900;
          font-size: 0.7rem;
          color: #ff3e3e;
          margin-bottom: -5px;
        }

        .styled-radio-wrapper .wheel-label .label {
          font-family: "Inter", sans-serif;
          font-weight: 900;
          font-size: 1.6rem;
          color: #fff;
          letter-spacing: -1px;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .styled-radio-wrapper .radio-input:has(#value-1:checked) .wheel-label {
          transform: rotate(calc(var(--angle) + 30deg));
        }
        .styled-radio-wrapper .radio-input:has(#value-2:checked) .wheel-label {
          transform: rotate(calc(var(--angle) + 0deg));
        }
        .styled-radio-wrapper .radio-input:has(#value-3:checked) .wheel-label {
          transform: rotate(calc(var(--angle) - 30deg));
        }

        .styled-radio-wrapper .radio-input input:checked + .wheel-label {
          opacity: 1;
          filter: blur(0);
          transform: rotate(0deg) translateX(10px);
          z-index: 10;
        }

        .styled-radio-wrapper .radio-input input:checked + .wheel-label .label {
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
        }

        .styled-radio-wrapper .next-trigger {
          position: absolute;
          inset: 0;
          z-index: -1;
          cursor: pointer;
        }
        .styled-radio-wrapper .radio-input:has(#value-1:checked) #trigger-for-1,
        .styled-radio-wrapper .radio-input:has(#value-2:checked) #trigger-for-2,
        .styled-radio-wrapper .radio-input:has(#value-3:checked) #trigger-for-3 {
          z-index: 100;
        }
      `}} />
      <div className="wheel-selector">
        <div className="hint-pop">TAP TO SELECT</div>
        <div className="radio-input">
          <label htmlFor="value-2" className="next-trigger" id="trigger-for-1" />
          <label htmlFor="value-3" className="next-trigger" id="trigger-for-2" />
          <label htmlFor="value-1" className="next-trigger" id="trigger-for-3" />
          <div className="glass-overlay" />
          <input defaultValue="value-1" name="value-radio" id="value-1" type="radio" defaultChecked onChange={(e) => onChange?.(e.target.value)} />
          <label className="wheel-label" htmlFor="value-1" style={{ '--angle': '-30deg' } as React.CSSProperties}>
            <span className="num">01</span>
            <span className="label">DRIVE MAD</span>
          </label>
          <input defaultValue="value-2" name="value-radio" id="value-2" type="radio" onChange={(e) => onChange?.(e.target.value)} />
          <label className="wheel-label" htmlFor="value-2" style={{ '--angle': '0deg' } as React.CSSProperties}>
            <span className="num">02</span>
            <span className="label">LUDO ROYAL</span>
          </label>
          <input defaultValue="value-3" name="value-radio" id="value-3" type="radio" onChange={(e) => onChange?.(e.target.value)} />
          <label className="wheel-label" htmlFor="value-3" style={{ '--angle': '30deg' } as React.CSSProperties}>
            <span className="num">03</span>
            <span className="label">MATH BATTLE</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default Radio;
