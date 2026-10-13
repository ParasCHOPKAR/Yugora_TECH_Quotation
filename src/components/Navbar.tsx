'use client';

import React from 'react';
import Image from 'next/image';
import { Printer, Sparkles, RotateCcw, Eye, Edit3, Columns } from 'lucide-react';

interface NavbarProps {
  onPrint: () => void;
  onReset: () => void;
  onLoadTemplate: () => void;
  viewMode: 'split' | 'edit' | 'preview';
  setViewMode: (mode: 'split' | 'edit' | 'preview') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onPrint,
  onReset,
  onLoadTemplate,
  viewMode,
  setViewMode,
}) => {
  return (
    <header className="no-print navbar-header" style={{
      borderBottom: '1px solid #1f2937',
      background: '#111827',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      padding: '0.75rem 1.5rem',
    }}>
      <div className="navbar-inner" style={{
        maxWidth: '1600px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.85rem',
      }}>
        {/* Brand & Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <Image
            src="/logo.png"
            alt="Yugora Tech Logo"
            width={42}
            height={42}
            style={{ objectFit: 'contain' }}
            priority
          />
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              <span className="navbar-brand-title" style={{
                fontSize: '1.18rem',
                fontWeight: 700,
                letterSpacing: '-0.01em',
                color: '#ffffff',
              }}>
                Yugora Tech Quotation
              </span>
              <span style={{
                fontSize: '0.62rem',
                fontWeight: 600,
                padding: '0.12rem 0.4rem',
                borderRadius: '4px',
                background: '#1f2937',
                color: '#94a3b8',
                border: '1px solid #374151',
              }}>
                ENTERPRISE
              </span>
            </div>
            <p className="navbar-brand-subtitle" style={{ fontSize: '0.74rem', color: '#94a3b8', margin: 0 }}>
              Official Quotation Generator &amp; Multi-Category Services
            </p>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: '#0b0f19',
          borderRadius: '8px',
          border: '1px solid #1f2937',
          padding: '0.2rem',
        }}>
          <button
            onClick={() => setViewMode('split')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.35rem 0.65rem',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.78rem',
              fontWeight: 600,
              background: viewMode === 'split' ? '#2563eb' : 'transparent',
              color: viewMode === 'split' ? '#ffffff' : '#94a3b8',
              transition: 'all 0.15s ease',
            }}
          >
            <Columns size={14} />
            <span className="hidden-mobile">Split View</span>
          </button>
          <button
            onClick={() => setViewMode('edit')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.4rem 0.75rem',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.78rem',
              fontWeight: 600,
              background: viewMode === 'edit' ? '#2563eb' : 'transparent',
              color: viewMode === 'edit' ? '#ffffff' : '#94a3b8',
              transition: 'all 0.15s ease',
            }}
          >
            <Edit3 size={14} />
            <span className="hidden-mobile">Editor Only</span>
          </button>
          <button
            onClick={() => setViewMode('preview')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.4rem 0.75rem',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.78rem',
              fontWeight: 600,
              background: viewMode === 'preview' ? '#2563eb' : 'transparent',
              color: viewMode === 'preview' ? '#ffffff' : '#94a3b8',
              transition: 'all 0.15s ease',
            }}
          >
            <Eye size={14} />
            <span className="hidden-mobile">A4 Sheet Only</span>
          </button>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <button
            onClick={onLoadTemplate}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.8rem',
              background: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '6px',
              color: '#e2e8f0',
              cursor: 'pointer',
              fontSize: '0.78rem',
              fontWeight: 500,
              transition: 'background 0.15s ease',
            }}
            title="Load Template Example"
          >
            <Sparkles size={13} color="#94a3b8" />
            <span>Load Sample</span>
          </button>

          <button
            onClick={onReset}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.8rem',
              background: '#111827',
              border: '1px solid #374151',
              borderRadius: '6px',
              color: '#94a3b8',
              cursor: 'pointer',
              fontSize: '0.78rem',
              fontWeight: 500,
              transition: 'background 0.15s ease',
            }}
            title="Reset to blank"
          >
            <RotateCcw size={13} />
            <span>Clear</span>
          </button>

          <button
            onClick={onPrint}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.5rem 1rem',
              background: '#2563eb',
              border: 'none',
              borderRadius: '6px',
              color: '#ffffff',
              cursor: 'pointer',
              fontSize: '0.82rem',
              fontWeight: 600,
              transition: 'background 0.15s ease',
            }}
          >
            <Printer size={15} />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>
    </header>
  );
};
