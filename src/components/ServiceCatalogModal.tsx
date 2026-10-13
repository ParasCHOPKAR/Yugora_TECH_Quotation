'use client';

import React, { useState } from 'react';
import { SERVICE_CATEGORIES, CategorizedService } from '@/data/services';
import { Plus, X, Search, Check, Sparkles, Layers } from 'lucide-react';

interface ServiceCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectService: (service: CategorizedService) => void;
  onSelectMultiple?: (
    services: CategorizedService[],
    replaceExisting?: boolean,
    hideAmounts?: boolean
  ) => void;
  initialHideAmounts?: boolean;
}

export const ServiceCatalogModal: React.FC<ServiceCatalogModalProps> = ({
  isOpen,
  onClose,
  onSelectService,
  onSelectMultiple,
  initialHideAmounts = false,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItems, setSelectedItems] = useState<CategorizedService[]>([]);
  const [hideAmountsOnQuotation, setHideAmountsOnQuotation] = useState<boolean>(initialHideAmounts);

  if (!isOpen) return null;

  const filteredCategories =
    activeCategory === 'selected'
      ? [
          {
            id: 'selected',
            code: '★',
            title: 'SELECTED SERVICES ONLY',
            color: '#3b82f6',
            services: selectedItems.filter(
              (s) =>
                s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                s.description.toLowerCase().includes(searchTerm.toLowerCase())
            ),
          },
        ].filter((cat) => cat.services.length > 0)
      : SERVICE_CATEGORIES.map((cat) => {
          const services = cat.services.filter((s) => {
            const matchSearch =
              s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              s.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchCat = activeCategory === 'all' || activeCategory === cat.id;
            return matchSearch && matchCat;
          });
          return { ...cat, services };
        }).filter((cat) => cat.services.length > 0);

  const toggleSelect = (service: CategorizedService) => {
    if (selectedItems.some((i) => i.name === service.name)) {
      setSelectedItems(selectedItems.filter((i) => i.name !== service.name));
    } else {
      setSelectedItems([...selectedItems, service]);
    }
  };

  const selectedTotal = selectedItems.reduce(
    (acc, it) => acc + (Number(it.defaultPrice) || 0),
    0
  );

  const handleApplySelected = (replaceExisting: boolean) => {
    if (onSelectMultiple && selectedItems.length > 0) {
      onSelectMultiple(selectedItems, replaceExisting, hideAmountsOnQuotation);
      setSelectedItems([]);
      onClose();
    }
  };

  return (
    <div
      className="modal-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 10, 20, 0.85)',
        backdropFilter: 'blur(10px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      <div
        className="modal-container"
        style={{
          background: '#111827',
          border: '1px solid #1f2937',
          boxShadow: '0 20px 45px rgba(0, 0, 0, 0.6)',
          borderRadius: '10px',
          width: '100%',
          maxWidth: '920px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Modal Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid #1f2937',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#0b0f19',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '6px',
              background: '#1f2937',
              border: '1px solid #374151',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#3b82f6',
            }}>
              <Layers size={18} />
            </div>
            <div>
              <h3 style={{
                fontSize: '1.15rem',
                fontWeight: 700,
                color: '#fff',
                letterSpacing: '-0.01em',
                margin: 0,
              }}>
                Add Services to Quotation
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0 }}>
                Select from Digital Presence, Marketing, Enterprise Software & AI catalogs
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              color: '#cbd5e1',
              cursor: 'pointer',
              padding: '0.4rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Search & Category Filter */}
        <div style={{
          padding: '1rem 1.5rem',
          borderBottom: '1px solid #1f2937',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          background: '#0e1422',
        }}>
          {/* Search bar */}
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
          }}>
            <Search size={16} style={{ position: 'absolute', left: '1rem', color: '#64748b' }} />
            <input
              type="text"
              placeholder="Search services (e.g. ERP, SEO, Chatbot, Dynamic Website)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 1rem 0.65rem 2.6rem',
                borderRadius: '6px',
                border: '1px solid #2d3748',
                background: '#0b0f19',
                color: '#fff',
                fontSize: '0.88rem',
                outline: 'none',
              }}
            />
          </div>

          {/* Category Tabs */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            overflowX: 'auto',
            paddingBottom: '0.25rem',
          }}>
            <button
              onClick={() => setActiveCategory('all')}
              style={{
                padding: '0.35rem 0.75rem',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                border: activeCategory === 'all' ? '1px solid #3b82f6' : '1px solid #2d3748',
                background: activeCategory === 'all' ? '#1e3a8a' : '#111827',
                color: activeCategory === 'all' ? '#ffffff' : '#94a3b8',
              }}
            >
              All Categories
            </button>
            <button
              onClick={() => setActiveCategory('selected')}
              style={{
                padding: '0.35rem 0.75rem',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                border: activeCategory === 'selected' ? '1px solid #3b82f6' : '1px solid #2d3748',
                background: activeCategory === 'selected' ? '#1d4ed8' : '#0b0f19',
                color: activeCategory === 'selected' ? '#ffffff' : selectedItems.length > 0 ? '#60a5fa' : '#64748b',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
            >
              <span>★ View Only Selected</span>
              <span
                style={{
                  background: activeCategory === 'selected' ? '#ffffff' : '#1f2937',
                  color: activeCategory === 'selected' ? '#1d4ed8' : '#e2e8f0',
                  padding: '0.05rem 0.4rem',
                  borderRadius: '10px',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                }}
              >
                {selectedItems.length}
              </span>
            </button>
            {SERVICE_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  border: activeCategory === cat.id ? '1px solid #3b82f6' : '1px solid #2d3748',
                  background: activeCategory === cat.id ? '#1e3a8a' : '#111827',
                  color: activeCategory === cat.id ? '#ffffff' : '#94a3b8',
                }}
              >
                {cat.code} {cat.title}
              </button>
            ))}
          </div>
        </div>

        {/* Services List */}
        <div style={{
          padding: '1.25rem 1.5rem',
          overflowY: 'auto',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}>
          {filteredCategories.map(cat => (
            <div key={cat.id}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                marginBottom: '0.75rem',
              }}>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  color: cat.color,
                  letterSpacing: '0.08em',
                  background: `${cat.color}18`,
                  padding: '0.2rem 0.5rem',
                  borderRadius: '4px',
                  border: `1px solid ${cat.color}40`,
                }}>
                  {cat.code}
                </span>
                <h4 style={{
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  color: '#e2e8f0',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  margin: 0,
                }}>
                  {cat.title}
                </h4>
              </div>

              <div
                className="services-cards-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: '0.75rem',
                }}
              >
                {cat.services.map((service, idx) => {
                  const isSelected = selectedItems.some(i => i.name === service.name);
                  return (
                    <div
                      key={idx}
                      style={{
                        background: isSelected ? '#1e293b' : '#0b0f19',
                        border: isSelected ? '1px solid #3b82f6' : '1px solid #1f2937',
                        borderRadius: '8px',
                        padding: '0.85rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: '0.6rem',
                        transition: 'all 0.15s ease',
                        cursor: 'pointer',
                      }}
                      onClick={() => toggleSelect(service)}
                    >
                      <div>
                        <div style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          justifyContent: 'space-between',
                          gap: '0.5rem',
                          marginBottom: '0.35rem',
                        }}>
                          <span style={{
                            fontWeight: 600,
                            fontSize: '0.86rem',
                            color: '#ffffff',
                          }}>
                            {service.name}
                          </span>
                          <span style={{
                            fontWeight: 600,
                            fontSize: '0.82rem',
                            color: '#e2e8f0',
                            fontFamily: 'var(--font-mono)',
                            whiteSpace: 'nowrap',
                          }}>
                            ₹ {service.defaultPrice.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <p style={{
                          fontSize: '0.74rem',
                          color: '#94a3b8',
                          lineHeight: '1.35',
                          margin: 0,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}>
                          {service.description}
                        </p>
                      </div>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: '0.4rem',
                        paddingTop: '0.4rem',
                        borderTop: '1px solid #1f2937',
                      }}>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectService(service);
                            onClose();
                          }}
                          style={{
                            background: '#1f2937',
                            border: '1px solid #374151',
                            borderRadius: '5px',
                            color: '#e2e8f0',
                            padding: '0.25rem 0.6rem',
                            fontSize: '0.72rem',
                            fontWeight: 500,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                          }}
                        >
                          <Plus size={12} />
                          <span>Add Direct</span>
                        </button>

                        <div style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '4px',
                          border: isSelected ? '1px solid #2563eb' : '1px solid #4b5563',
                          background: isSelected ? '#2563eb' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                        }}>
                          {isSelected && <Check size={12} />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '1rem 1.5rem',
            borderTop: '1px solid #1f2937',
            background: '#0b0f19',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          {/* Left info & option */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc' }}>
                {selectedItems.length} service(s) selected
              </span>
              {selectedItems.length > 0 && (
                <span
                  style={{
                    fontSize: '0.82rem',
                    color: '#60a5fa',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                    background: 'rgba(37, 99, 235, 0.15)',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '4px',
                  }}
                >
                  Package Total: ₹{selectedTotal.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            {/* User requested option: hide individual service amount, only total amount visible */}
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.78rem',
                color: hideAmountsOnQuotation ? '#60a5fa' : '#94a3b8',
                userSelect: 'none',
              }}
            >
              <input
                type="checkbox"
                checked={hideAmountsOnQuotation}
                onChange={(e) => setHideAmountsOnQuotation(e.target.checked)}
                style={{ accentColor: '#2563eb', cursor: 'pointer' }}
              />
              <span style={{ fontWeight: hideAmountsOnQuotation ? 600 : 400 }}>
                Hide individual service amounts on quotation (Show Total Amount only)
              </span>
            </label>
          </div>

          {/* Right action buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '0.45rem 0.85rem',
                borderRadius: '6px',
                background: '#1f2937',
                border: '1px solid #374151',
                color: '#cbd5e1',
                fontSize: '0.8rem',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>

            {/* Set as quotation (only selected services) */}
            <button
              type="button"
              onClick={() => handleApplySelected(true)}
              disabled={selectedItems.length === 0}
              title="Replace current quotation line items with ONLY these selected services"
              style={{
                padding: '0.45rem 1rem',
                borderRadius: '6px',
                background: selectedItems.length > 0 ? '#1d4ed8' : '#1f2937',
                border: '1px solid rgba(59, 130, 246, 0.5)',
                color: selectedItems.length > 0 ? '#ffffff' : '#64748b',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: selectedItems.length > 0 ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <Check size={14} />
              <span>Set as Quotation (Only Selected)</span>
            </button>

            {/* Append to existing quotation */}
            <button
              type="button"
              onClick={() => handleApplySelected(false)}
              disabled={selectedItems.length === 0}
              title="Append these services to the existing items on the quotation"
              style={{
                padding: '0.45rem 1rem',
                borderRadius: '6px',
                background: selectedItems.length > 0 ? '#2563eb' : '#1f2937',
                border: 'none',
                color: selectedItems.length > 0 ? '#ffffff' : '#64748b',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: selectedItems.length > 0 ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <Plus size={14} />
              <span>+ Add to Existing</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
