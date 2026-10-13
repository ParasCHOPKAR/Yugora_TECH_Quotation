'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { QuotationData } from '@/types/quotation';
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  ZoomIn,
  ZoomOut,
  Maximize2,
  FileCheck2,
} from 'lucide-react';

interface QuotationPreviewProps {
  data: QuotationData;
  onPrint: () => void;
  onToggleHideAmounts?: (hide: boolean) => void;
}

export const QuotationPreview: React.FC<QuotationPreviewProps> = ({
  data,
  onPrint,
  onToggleHideAmounts,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [showPage2, setShowPage2] = useState<boolean>(true);

  const formatCurrency = (val: number) => {
    return `${data.currency} ${Number(val || 0).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <div
      className="quotation-preview-root"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        paddingBottom: '3rem',
      }}
    >
      {/* Document Control Bar (Hidden when printing) */}
      <div
        className="no-print preview-control-bar"
        style={{
          width: '100%',
          maxWidth: '820px',
          background: '#111827',
          border: '1px solid #1f2937',
          borderRadius: '8px',
          padding: '0.55rem 0.95rem',
          marginBottom: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FileCheck2 size={16} color="#3b82f6" />
          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#f8fafc' }}>
            A4 Print Layout Preview
          </span>
          <span
            style={{
              fontSize: '0.7rem',
              color: '#94a3b8',
              background: '#1f2937',
              border: '1px solid #374151',
              padding: '0.15rem 0.45rem',
              borderRadius: '4px',
            }}
          >
            {showPage2 ? '2 Pages' : '1 Page'}
          </span>
          {data.hideIndividualAmounts && (
            <span
              style={{
                fontSize: '0.7rem',
                color: '#60a5fa',
                background: 'rgba(37, 99, 235, 0.2)',
                border: '1px solid rgba(59, 130, 246, 0.4)',
                padding: '0.15rem 0.45rem',
                borderRadius: '4px',
                fontWeight: 600,
              }}
            >
              Total Only Mode
            </span>
          )}
        </div>

        <div className="preview-control-bar-right" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {/* Hide individual amounts / Total Only toggle */}
          {onToggleHideAmounts && (
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.74rem',
                fontWeight: 600,
                color: data.hideIndividualAmounts ? '#60a5fa' : '#cbd5e1',
                background: data.hideIndividualAmounts
                  ? 'rgba(37, 99, 235, 0.18)'
                  : '#1f2937',
                border: data.hideIndividualAmounts
                  ? '1px solid #3b82f6'
                  : '1px solid #374151',
                padding: '0.2rem 0.55rem',
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              title="When checked, hides individual service amounts on the quotation and displays only the Total Amount"
            >
              <input
                type="checkbox"
                checked={!!data.hideIndividualAmounts}
                onChange={(e) => onToggleHideAmounts(e.target.checked)}
                style={{ accentColor: '#2563eb', cursor: 'pointer' }}
              />
              <span>Total Only (No Line Rates)</span>
            </label>
          )}

          {/* Page toggle */}
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.75rem',
              color: '#cbd5e1',
              cursor: 'pointer',
            }}
          >
            <input
              type="checkbox"
              checked={showPage2}
              onChange={(e) => setShowPage2(e.target.checked)}
              style={{ accentColor: '#0077ff' }}
            />
            <span>Include Page 2</span>
          </label>

          {/* Zoom controls */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(0, 0, 0, 0.35)',
              borderRadius: '6px',
              padding: '0.15rem 0.4rem',
              gap: '0.3rem',
            }}
          >
            <button
              onClick={() => setZoomLevel((z) => Math.max(40, z - 10))}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
              title="Zoom out"
            >
              <ZoomOut size={14} />
            </button>
            <span
              style={{
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                color: '#cbd5e1',
                minWidth: '40px',
                textAlign: 'center',
              }}
            >
              {zoomLevel}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(130, z + 10))}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
              title="Zoom in"
            >
              <ZoomIn size={14} />
            </button>
            <button
              onClick={() => setZoomLevel(100)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
              title="Reset 100%"
            >
              <Maximize2 size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Touch-Friendly Horizontal Scroll Container for Mobile Screens */}
      <div
        className="quotation-sheet-scroll-container"
        style={{
          width: '100%',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {/* Sheet Container with Scalable Zoom */}
        <div
          className="quotation-sheets-container"
          style={{
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease-out',
            display: 'flex',
            flexDirection: 'column',
            gap: '2.5rem',
          }}
        >
        {/* ========================================================= */}
        {/* PAGE 1: MAIN QUOTATION */}
        {/* ========================================================= */}
        <div
          className="quotation-sheet-page"
          style={{
            width: '210mm',
            minHeight: '297mm',
            background: '#ffffff',
            color: '#1a202c',
            boxShadow: '0 15px 45px rgba(0, 0, 0, 0.45)',
            borderRadius: '4px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'hidden',
            boxSizing: 'border-box',
            fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
          }}
        >
          {/* Subtle Watermark in background */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '420px',
              height: '420px',
              opacity: 0.045,
              pointerEvents: 'none',
              zIndex: 0,
            }}
          >
            <Image
              src="/logo.png"
              alt="Watermark"
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>

          {/* PAGE CONTENT CONTAINER */}
          <div
            style={{
              padding: '16mm 16mm 0 16mm',
              position: 'relative',
              zIndex: 1,
              flex: 1,
            }}
          >
            {/* Header: Logo & Company Name (Left), Contact Details (Right) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                paddingBottom: '1.25rem',
              }}
            >
              {/* Brand Left */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div
                  style={{
                    position: 'relative',
                    width: '92px',
                    height: '92px',
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src="/logo.png"
                    alt={data.company.name}
                    fill
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                </div>
                <div>
                  <h1
                    style={{
                      fontSize: '1.85rem',
                      fontWeight: 800,
                      color: '#17345b',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      margin: 0,
                      lineHeight: '1.2',
                    }}
                  >
                    {data.company.name}
                  </h1>
                </div>
              </div>

              {/* Contact Right (styled as in original template) */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem',
                  fontSize: '0.78rem',
                  color: '#334155',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: '1.5px solid #17345b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#17345b',
                    }}
                  >
                    <Phone size={11} />
                  </div>
                  <span>{data.company.phone}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: '1.5px solid #17345b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#17345b',
                    }}
                  >
                    <Mail size={11} />
                  </div>
                  <span>{data.company.email}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: '1.5px solid #17345b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#17345b',
                    }}
                  >
                    <Globe size={11} />
                  </div>
                  <span>{data.company.website}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: '1.5px solid #17345b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#17345b',
                    }}
                  >
                    <MapPin size={11} />
                  </div>
                  <span>{data.company.address}</span>
                </div>
              </div>
            </div>

            {/* Clean Professional Quotation Banner */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.4rem 0.85rem',
                backgroundColor: '#17345b',
                color: '#ffffff',
                borderRadius: '4px',
                marginTop: '0.5rem',
                marginBottom: '1.25rem',
              }}
            >
              <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.08em' }}>
                QUOTATION
              </span>
              <span style={{ fontSize: '0.78rem', opacity: 0.9 }}>
                Ref: {data.quotationNo}
              </span>
            </div>

            {/* Metadata: Quotation No & Date */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.88rem',
                fontWeight: 600,
                color: '#1e293b',
                marginTop: '1.5rem',
                marginBottom: '1rem',
              }}
            >
              <div>
                <span>Quotation No. : </span>
                <span style={{ fontWeight: 700 }}>{data.quotationNo}</span>
              </div>
              <div>{data.date}</div>
            </div>

            {/* Recipient / Client */}
            <div
              style={{
                marginBottom: '1.15rem',
                fontSize: '0.85rem',
                color: '#1e293b',
                lineHeight: '1.45',
              }}
            >
              <div style={{ fontWeight: 500 }}>To,</div>
              <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>
                {data.client.name}
              </div>
              {data.client.address && (
                <div style={{ color: '#475569', fontSize: '0.8rem' }}>
                  {data.client.address}
                </div>
              )}
            </div>

            {/* Salutation & Intro */}
            <div
              style={{
                fontSize: '0.85rem',
                color: '#334155',
                lineHeight: '1.5',
                marginBottom: '1.4rem',
              }}
            >
              <div style={{ fontWeight: 600, marginBottom: '0.35rem' }}>
                {data.salutation}
              </div>
              <p style={{ margin: 0 }}>{data.introMessage}</p>
            </div>

            {/* Cost Breakdown / Services Section Heading */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.65rem',
              }}
            >
              <div
                style={{
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  color: '#17345b',
                }}
              >
                {data.hideIndividualAmounts
                  ? 'Services & Scope of Deliverables :'
                  : 'Cost Breakdown :'}
              </div>
              {data.hideIndividualAmounts && (
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: '#1e40af',
                    backgroundColor: '#eff6ff',
                    border: '1px solid #bfdbfe',
                    padding: '0.15rem 0.55rem',
                    borderRadius: '4px',
                    letterSpacing: '0.03em',
                    textTransform: 'uppercase',
                  }}
                >
                  Lump Sum Package
                </span>
              )}
            </div>

            {/* TABLE */}
            {data.hideIndividualAmounts ? (
              /* LUMP SUM / TOTAL ONLY TABLE (NO INDIVIDUAL SERVICE AMOUNTS) */
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '0.85rem',
                  marginBottom: '1.5rem',
                  border: '1.5px solid #17345b',
                }}
              >
                <thead>
                  <tr
                    style={{
                      backgroundColor: '#17345b',
                      color: '#ffffff',
                      fontWeight: 700,
                    }}
                  >
                    <th
                      style={{
                        textAlign: 'center',
                        padding: '0.6rem 0.5rem',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        width: '7%',
                      }}
                    >
                      Sr.
                    </th>
                    <th
                      style={{
                        textAlign: 'left',
                        padding: '0.6rem 0.85rem',
                        fontSize: '0.84rem',
                        fontWeight: 700,
                        letterSpacing: '0.02em',
                        width: '93%',
                      }}
                    >
                      Scope of Services &amp; Deliverables Included
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((item, idx) => (
                    <tr
                      key={item.id || idx}
                      style={{
                        borderBottom: '1px solid #cbd5e1',
                        backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f8fafc',
                      }}
                    >
                      <td
                        style={{
                          padding: '0.65rem 0.5rem',
                          textAlign: 'center',
                          fontWeight: 700,
                          color: '#475569',
                          verticalAlign: 'top',
                          fontSize: '0.82rem',
                        }}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </td>
                      <td
                        style={{
                          padding: '0.65rem 0.85rem',
                          color: '#1e293b',
                          verticalAlign: 'top',
                        }}
                      >
                        <div
                          style={{
                            fontWeight: 700,
                            color: '#0f172a',
                            fontSize: '0.88rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            flexWrap: 'wrap',
                          }}
                        >
                          <span>{item.title}</span>
                          {item.category && (
                            <span
                              style={{
                                fontSize: '0.66rem',
                                fontWeight: 700,
                                color: '#2563eb',
                                backgroundColor: '#eff6ff',
                                border: '1px solid #bfdbfe',
                                borderRadius: '3px',
                                padding: '0.08rem 0.35rem',
                                letterSpacing: '0.03em',
                                textTransform: 'uppercase',
                              }}
                            >
                              {item.category}
                            </span>
                          )}
                        </div>
                        {item.description && (
                          <div
                            style={{
                              fontSize: '0.78rem',
                              color: '#475569',
                              marginTop: '0.25rem',
                              lineHeight: '1.45',
                            }}
                          >
                            {item.description}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}

                  {/* Subtotal if discount or tax exist */}
                  {(data.discountAmount > 0 || data.taxAmount > 0) && (
                    <tr
                      style={{
                        borderTop: '1.5px solid #17345b',
                        borderBottom: '1px solid #cbd5e1',
                        backgroundColor: '#ffffff',
                      }}
                    >
                      <td
                        colSpan={2}
                        style={{
                          padding: '0.55rem 0.85rem',
                          textAlign: 'right',
                          color: '#1e293b',
                          fontSize: '0.84rem',
                        }}
                      >
                        <span style={{ fontWeight: 600, marginRight: '1.5rem' }}>
                          Package Subtotal:
                        </span>
                        <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                          {formatCurrency(data.subtotal)}
                        </span>
                      </td>
                    </tr>
                  )}

                  {/* Discount if applicable */}
                  {data.discountAmount > 0 && (
                    <tr
                      style={{
                        borderBottom: '1px solid #cbd5e1',
                        backgroundColor: '#ffffff',
                      }}
                    >
                      <td
                        colSpan={2}
                        style={{
                          padding: '0.45rem 0.85rem',
                          textAlign: 'right',
                          color: '#475569',
                          fontSize: '0.82rem',
                        }}
                      >
                        <span style={{ marginRight: '1.5rem' }}>
                          Package Discount ({data.discountRate}%):
                        </span>
                        <span style={{ fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                          - {formatCurrency(data.discountAmount)}
                        </span>
                      </td>
                    </tr>
                  )}

                  {/* Tax if applicable */}
                  {data.taxAmount > 0 && (
                    <tr
                      style={{
                        borderBottom: '1px solid #cbd5e1',
                        backgroundColor: '#ffffff',
                      }}
                    >
                      <td
                        colSpan={2}
                        style={{
                          padding: '0.45rem 0.85rem',
                          textAlign: 'right',
                          color: '#475569',
                          fontSize: '0.82rem',
                        }}
                      >
                        <span style={{ marginRight: '1.5rem' }}>
                          GST / Tax ({data.taxRate}%):
                        </span>
                        <span style={{ fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                          + {formatCurrency(data.taxAmount)}
                        </span>
                      </td>
                    </tr>
                  )}

                  {/* Grand Total Row */}
                  <tr
                    style={{
                      borderTop: '2px solid #17345b',
                      backgroundColor: '#f1f5f9',
                    }}
                  >
                    <td
                      colSpan={2}
                      style={{
                        padding: '0.75rem 1rem',
                        textAlign: 'right',
                        backgroundColor: '#eff6ff',
                        borderTop: '2px solid #17345b',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          gap: '1.5rem',
                        }}
                      >
                        <span
                          style={{
                            fontWeight: 800,
                            fontSize: '0.94rem',
                            color: '#17345b',
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                          }}
                        >
                          Total Package Investment / Grand Total :
                        </span>
                        <span
                          style={{
                            fontWeight: 800,
                            fontSize: '1.15rem',
                            color: '#17345b',
                            fontFamily: 'var(--font-mono)',
                          }}
                        >
                          {formatCurrency(data.grandTotal)}
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              /* DETAILED ITEMIZED TABLE WITH INDIVIDUAL SERVICE AMOUNTS */
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '0.85rem',
                  marginBottom: '1.5rem',
                  border: '1.5px solid #17345b',
                }}
              >
                <thead>
                  <tr
                    style={{
                      backgroundColor: '#17345b',
                      color: '#ffffff',
                      fontWeight: 700,
                    }}
                  >
                    <th
                      style={{
                        textAlign: 'left',
                        padding: '0.6rem 0.85rem',
                        fontSize: '0.84rem',
                        fontWeight: 700,
                        letterSpacing: '0.02em',
                        width: '68%',
                      }}
                    >
                      Description
                    </th>
                    <th
                      style={{
                        textAlign: 'right',
                        padding: '0.6rem 0.85rem',
                        fontSize: '0.84rem',
                        fontWeight: 700,
                        letterSpacing: '0.02em',
                      }}
                    >
                      Amount ({data.currency})
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((item, idx) => (
                    <tr
                      key={item.id || idx}
                      style={{
                        borderBottom: '1px solid #cbd5e1',
                        backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f8fafc',
                      }}
                    >
                      <td
                        style={{
                          padding: '0.6rem 0.85rem',
                          color: '#1e293b',
                          verticalAlign: 'top',
                        }}
                      >
                        <div style={{ fontWeight: 600, color: '#0f172a' }}>
                          {item.title}
                        </div>
                        {item.description && (
                          <div
                            style={{
                              fontSize: '0.76rem',
                              color: '#64748b',
                              marginTop: '0.2rem',
                            }}
                          >
                            {item.description}
                          </div>
                        )}
                      </td>
                      <td
                        style={{
                          padding: '0.6rem 0.85rem',
                          textAlign: 'right',
                          fontWeight: 600,
                          color: '#0f172a',
                          verticalAlign: 'top',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {formatCurrency(item.amount)}
                      </td>
                    </tr>
                  ))}

                  {/* Subtotal */}
                  <tr
                    style={{
                      borderTop: '1.5px solid #17345b',
                      borderBottom: '1px solid #cbd5e1',
                      fontWeight: 600,
                      backgroundColor: '#ffffff',
                    }}
                  >
                    <td
                      style={{
                        padding: '0.55rem 0.85rem',
                        color: '#1e293b',
                      }}
                    >
                      Subtotal
                    </td>
                    <td
                      style={{
                        padding: '0.55rem 0.85rem',
                        textAlign: 'right',
                        color: '#1e293b',
                      }}
                    >
                      {formatCurrency(data.subtotal)}
                    </td>
                  </tr>

                  {/* Optional Discount */}
                  {data.discountAmount > 0 && (
                    <tr
                      style={{
                        borderBottom: '1px solid #cbd5e1',
                        fontSize: '0.82rem',
                        color: '#475569',
                      }}
                    >
                      <td style={{ padding: '0.45rem 0.85rem' }}>
                        Discount ({data.discountRate}%)
                      </td>
                      <td style={{ padding: '0.45rem 0.85rem', textAlign: 'right' }}>
                        - {formatCurrency(data.discountAmount)}
                      </td>
                    </tr>
                  )}

                  {/* Optional GST / Tax */}
                  {data.taxAmount > 0 && (
                    <tr
                      style={{
                        borderBottom: '1px solid #cbd5e1',
                        fontSize: '0.82rem',
                        color: '#475569',
                      }}
                    >
                      <td style={{ padding: '0.45rem 0.85rem' }}>
                        GST / Tax ({data.taxRate}%)
                      </td>
                      <td style={{ padding: '0.45rem 0.85rem', textAlign: 'right' }}>
                        + {formatCurrency(data.taxAmount)}
                      </td>
                    </tr>
                  )}

                  {/* Grand Total */}
                  <tr
                    style={{
                      borderTop: '2px solid #17345b',
                      backgroundColor: '#ffffff',
                    }}
                  >
                    <td
                      style={{
                        padding: '0.65rem 0.85rem',
                        fontWeight: 800,
                        fontSize: '0.92rem',
                        color: '#17345b',
                      }}
                    >
                      Grand Total
                    </td>
                    <td
                      style={{
                        padding: '0.65rem 0.85rem',
                        textAlign: 'right',
                        fontWeight: 800,
                        fontSize: '0.95rem',
                        color: '#17345b',
                      }}
                    >
                      {formatCurrency(data.grandTotal)}
                    </td>
                  </tr>
                </tbody>
              </table>
            )}

            {/* Conditional Content based on 1-Page vs 2-Page mode */}
            {showPage2 ? (
              /* When 2-Page mode is enabled: Page 1 ends cleanly with delivery assurance note */
              <div style={{ marginTop: '1.25rem' }}>
                <div
                  style={{
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '0.85rem 1.15rem',
                    fontSize: '0.82rem',
                    color: '#475569',
                    lineHeight: '1.5',
                  }}
                >
                  <p style={{ margin: '0 0 0.35rem 0', fontWeight: 600, color: '#17345b' }}>
                    Note &amp; Project Deliverables:
                  </p>
                  <p style={{ margin: 0, fontSize: '0.78rem' }}>
                    {data.closingNote || 'All items will be delivered as per agreed project specifications and timelines. Please refer to Page 2 for Payment Terms, Engagement Conditions, and Authorized Acceptance.'}
                  </p>
                </div>
                <div
                  style={{
                    marginTop: '0.75rem',
                    textAlign: 'right',
                    fontSize: '0.75rem',
                    color: '#64748b',
                    fontStyle: 'italic',
                  }}
                >
                  (Continued on Page 2 for Payment Terms, Terms &amp; Conditions and Signatures)
                </div>
              </div>
            ) : (
              /* When 1-Page mode is enabled: Compact Terms & Signatures fit on Page 1 */
              <div style={{ marginTop: '1rem' }}>
                <div style={{ marginBottom: '0.85rem' }}>
                  <div
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: '#1e293b',
                      marginBottom: '0.3rem',
                    }}
                  >
                    Payment Terms :
                  </div>
                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: '1.1rem',
                      fontSize: '0.75rem',
                      color: '#334155',
                      lineHeight: '1.45',
                    }}
                  >
                    {data.paymentTerms.map((term, i) => (
                      <li key={i}>{term}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <div
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: '#1e293b',
                      marginBottom: '0.3rem',
                    }}
                  >
                    Terms &amp; Conditions :
                  </div>
                  <ol
                    style={{
                      margin: 0,
                      paddingLeft: '1.1rem',
                      fontSize: '0.74rem',
                      color: '#334155',
                      lineHeight: '1.4',
                    }}
                  >
                    {data.termsAndConditions.slice(0, 3).map((clause, i) => (
                      <li key={i}>{clause}</li>
                    ))}
                  </ol>
                </div>

                {/* Compact 1-Page Signature */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    paddingTop: '0.5rem',
                    borderTop: '1px dashed #cbd5e1',
                  }}
                >
                  <div style={{ fontSize: '0.76rem', color: '#475569' }}>
                    Client Acceptance: __________________
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#17345b' }}>
                      For {data.company.name}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Authorized Signatory</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* PAGE 1 FOOTER: Deep Navy Address Strip */}
          <div
            style={{
              backgroundColor: '#17345b',
              color: '#ffffff',
              textAlign: 'center',
              fontSize: '0.75rem',
              fontWeight: 500,
              padding: '0.65rem 1rem',
              letterSpacing: '0.01em',
              zIndex: 2,
            }}
          >
            {data.company.footerAddress}
          </div>
        </div>

        {/* ========================================================= */}
        {/* PAGE 2: TERMS, PAYMENT & AUTHORIZATION */}
        {/* ========================================================= */}
        {showPage2 && (
          <div
            className="quotation-sheet-page"
            style={{
              width: '210mm',
              minHeight: '297mm',
              background: '#ffffff',
              color: '#1a202c',
              boxShadow: '0 15px 45px rgba(0, 0, 0, 0.45)',
              borderRadius: '4px',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              overflow: 'hidden',
              boxSizing: 'border-box',
              fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
            }}
          >
            {/* Watermark */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '420px',
                height: '420px',
                opacity: 0.045,
                pointerEvents: 'none',
                zIndex: 0,
              }}
            >
              <Image
                src="/logo.png"
                alt="Watermark"
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>

            {/* PAGE 2 BODY */}
            <div
              style={{
                padding: '16mm 16mm 0 16mm',
                position: 'relative',
                zIndex: 1,
                flex: 1,
              }}
            >
              {/* Header on Page 2 */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: '1rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{ position: 'relative', width: '60px', height: '60px', flexShrink: 0 }}>
                    <Image
                      src="/logo.png"
                      alt={data.company.name}
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <div>
                    <h2
                      style={{
                        fontSize: '1.35rem',
                        fontWeight: 800,
                        color: '#17345b',
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        margin: 0,
                      }}
                    >
                      {data.company.name}
                    </h2>
                    <span style={{ fontSize: '0.74rem', color: '#64748b' }}>
                      Commercial Terms &amp; Authorization
                    </span>
                  </div>
                </div>

                <div style={{ textAlign: 'right', fontSize: '0.75rem', color: '#475569' }}>
                  <div>Ref: <strong>{data.quotationNo}</strong></div>
                  <div>Date: <strong>{data.date}</strong></div>
                </div>
              </div>

              {/* Clean Professional Page 2 Banner */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.4rem 0.85rem',
                  backgroundColor: '#17345b',
                  color: '#ffffff',
                  borderRadius: '4px',
                  marginBottom: '1.25rem',
                }}
              >
                <span style={{ fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.08em' }}>
                  TERMS OF ENGAGEMENT &amp; AUTHORIZATION
                </span>
                <span style={{ fontSize: '0.75rem', opacity: 0.9 }}>
                  Page 2 of 2
                </span>
              </div>

              {/* Payment Terms Section */}
              <div style={{ marginBottom: '1.25rem' }}>
                <div
                  style={{
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    color: '#17345b',
                    marginBottom: '0.45rem',
                  }}
                >
                  Payment Terms &amp; Milestone Schedule :
                </div>
                <div
                  style={{
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '0.75rem 1rem',
                  }}
                >
                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: '1.2rem',
                      fontSize: '0.82rem',
                      color: '#334155',
                      lineHeight: '1.6',
                    }}
                  >
                    {data.paymentTerms.map((term, i) => (
                      <li key={i} style={{ marginBottom: '0.2rem' }}>
                        {term}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Terms & Conditions Section */}
              <div style={{ marginBottom: '1.25rem' }}>
                <div
                  style={{
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    color: '#17345b',
                    marginBottom: '0.45rem',
                  }}
                >
                  Terms &amp; Conditions :
                </div>
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '0.85rem 1rem',
                  }}
                >
                  <ol
                    style={{
                      margin: 0,
                      paddingLeft: '1.2rem',
                      fontSize: '0.79rem',
                      color: '#334155',
                      lineHeight: '1.55',
                    }}
                  >
                    {data.termsAndConditions.map((clause, i) => (
                      <li key={i} style={{ marginBottom: '0.3rem' }}>
                        {clause}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Validity text */}
              <div
                style={{
                  fontSize: '0.82rem',
                  color: '#1e293b',
                  lineHeight: '1.5',
                  marginBottom: '1.25rem',
                  padding: '0.65rem 0.85rem',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                }}
              >
                <strong>Validity: </strong>
                This quotation is valid until <strong>{data.validUntil}</strong>. If you have any questions or require further clarification, please feel free to contact us.
              </div>

              {/* Side-by-Side Signature Boxes */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1.5rem',
                  marginTop: '0.5rem',
                }}
              >
                {/* Left: Client Box */}
                <div
                  style={{
                    border: '1.5px solid #b9d5f3',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '135px',
                    background: '#f8fbff',
                  }}
                >
                  <div
                    style={{
                      background: '#dbeafe',
                      color: '#1e40af',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '0.45rem 0.75rem',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}
                  >
                    CLIENT / AUTHORIZED REPRESENTATIVE
                  </div>
                  <div
                    style={{
                      padding: '0.75rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      flex: 1,
                    }}
                  >
                    <span style={{ fontSize: '0.75rem', color: '#475569' }}>
                      Acceptance Signature &amp; Stamp
                    </span>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        marginTop: '2.5rem',
                        fontSize: '0.72rem',
                        color: '#64748b',
                      }}
                    >
                      <span>Date: _______________</span>
                      <span>Signature: _______________</span>
                    </div>
                  </div>
                </div>

                {/* Right: Company Authorized Box */}
                <div
                  style={{
                    border: '1.5px solid #17345b',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '135px',
                    background: '#ffffff',
                  }}
                >
                  <div
                    style={{
                      background: '#17345b',
                      color: '#ffffff',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '0.45rem 0.75rem',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}
                  >
                    FOR {data.company.name}
                  </div>
                  <div
                    style={{
                      padding: '0.75rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      flex: 1,
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '0.78rem', color: '#17345b', fontWeight: 700 }}>
                          {data.authorizedSignatoryName}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                          {data.authorizedSignatoryTitle}
                        </div>
                      </div>
                      <div
                        style={{
                          border: '1px dashed #64748b',
                          borderRadius: '4px',
                          padding: '0.4rem 0.75rem',
                          textAlign: 'center',
                          color: '#475569',
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          background: '#f8fafc',
                        }}
                      >
                        Official Seal
                      </div>
                    </div>
                    <div
                      style={{
                        borderBottom: '1px solid #cbd5e1',
                        marginTop: '1.5rem',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* PAGE 2 FOOTER: Deep Navy Address Strip */}
            <div
              style={{
                backgroundColor: '#17345b',
                color: '#ffffff',
                textAlign: 'center',
                fontSize: '0.75rem',
                fontWeight: 500,
                padding: '0.65rem 1rem',
                letterSpacing: '0.01em',
                zIndex: 2,
              }}
            >
              {data.company.footerAddress}
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};
