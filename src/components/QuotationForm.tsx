'use client';

import React from 'react';
import { QuotationData, ServiceItem } from '@/types/quotation';
import { SERVICE_CATEGORIES } from '@/data/services';
import {
  Plus,
  Trash2,
  FileText,
  Building2,
  User,
  CreditCard,
  ShieldCheck,
  Sparkles,
  Percent,
} from 'lucide-react';

interface QuotationFormProps {
  data: QuotationData;
  onChange: (data: QuotationData) => void;
  onOpenCatalog: () => void;
}

export const QuotationForm: React.FC<QuotationFormProps> = ({
  data,
  onChange,
  onOpenCatalog,
}) => {
  // Helpers to update nested state
  const updateCompany = (field: keyof typeof data.company, val: string) => {
    onChange({
      ...data,
      company: { ...data.company, [field]: val },
    });
  };

  const updateClient = (field: keyof typeof data.client, val: string) => {
    onChange({
      ...data,
      client: { ...data.client, [field]: val },
    });
  };

  const updateItem = (index: number, field: keyof ServiceItem, val: string | number) => {
    const newItems = [...data.items];
    const target = { ...newItems[index], [field]: val };

    if (field === 'quantity' || field === 'rate') {
      const q = field === 'quantity' ? Number(val) : target.quantity;
      const r = field === 'rate' ? Number(val) : target.rate;
      target.amount = (isNaN(q) ? 0 : q) * (isNaN(r) ? 0 : r);
    }

    newItems[index] = target;
    recalculateTotals(newItems, data.discountRate, data.taxRate);
  };

  const removeItem = (index: number) => {
    const newItems = data.items.filter((_, i) => i !== index);
    recalculateTotals(newItems, data.discountRate, data.taxRate);
  };

  const addNewItem = () => {
    const newItem: ServiceItem = {
      id: `item-${Date.now()}`,
      category: 'DIGITAL PRESENCE',
      title: 'Custom Digital Service',
      description: 'Scope and details of service deliverables.',
      quantity: 1,
      rate: 25000,
      amount: 25000,
    };
    recalculateTotals([...data.items, newItem], data.discountRate, data.taxRate);
  };

  const recalculateTotals = (
    items: ServiceItem[],
    discRate: number,
    taxRate: number
  ) => {
    const subtotal = items.reduce((acc, it) => acc + (Number(it.amount) || 0), 0);
    const discAmount = (subtotal * (Number(discRate) || 0)) / 100;
    const taxable = subtotal - discAmount;
    const taxAmount = (taxable * (Number(taxRate) || 0)) / 100;
    const grandTotal = taxable + taxAmount;

    onChange({
      ...data,
      items,
      subtotal,
      discountRate: discRate,
      discountAmount: discAmount,
      taxRate: taxRate,
      taxAmount: taxAmount,
      grandTotal,
    });
  };

  const handleDiscountChange = (discRate: number) => {
    recalculateTotals(data.items, discRate, data.taxRate);
  };

  const handleTaxChange = (taxRate: number) => {
    recalculateTotals(data.items, data.discountRate, taxRate);
  };

  // Payment term handlers
  const updatePaymentTerm = (idx: number, val: string) => {
    const updated = [...data.paymentTerms];
    updated[idx] = val;
    onChange({ ...data, paymentTerms: updated });
  };

  const addPaymentTerm = () => {
    onChange({
      ...data,
      paymentTerms: [...data.paymentTerms, 'Custom milestone payment percentage'],
    });
  };

  const removePaymentTerm = (idx: number) => {
    onChange({
      ...data,
      paymentTerms: data.paymentTerms.filter((_, i) => i !== idx),
    });
  };

  // Terms & Conditions handlers
  const updateTermCondition = (idx: number, val: string) => {
    const updated = [...data.termsAndConditions];
    updated[idx] = val;
    onChange({ ...data, termsAndConditions: updated });
  };

  const addTermCondition = () => {
    onChange({
      ...data,
      termsAndConditions: [
        ...data.termsAndConditions,
        'Additional project policy or delivery condition.',
      ],
    });
  };

  const removeTermCondition = (idx: number) => {
    onChange({
      ...data,
      termsAndConditions: data.termsAndConditions.filter((_, i) => i !== idx),
    });
  };

  // Flattened services for the select dropdown
  const allCategorizedOptions = SERVICE_CATEGORIES.flatMap((c) =>
    c.services.map((s) => ({
      category: c.title,
      name: s.name,
      defaultPrice: s.defaultPrice,
      description: s.description,
    }))
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        padding: '1.25rem',
      }}
    >
      {/* 1. Quotation Document Meta */}
      <div className="form-card">
        <div className="form-card-header">
          <FileText size={17} color="#3b82f6" />
          <h3>Quotation Details &amp; Header</h3>
        </div>
        <div
          className="responsive-meta-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginTop: '1rem',
          }}
        >
          <div>
            <label className="form-label">Quotation Number</label>
            <input
              type="text"
              value={data.quotationNo}
              onChange={(e) => onChange({ ...data, quotationNo: e.target.value })}
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Quotation Date</label>
            <input
              type="text"
              value={data.date}
              onChange={(e) => onChange({ ...data, date: e.target.value })}
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Validity (Until Date)</label>
            <input
              type="text"
              value={data.validUntil}
              onChange={(e) => onChange({ ...data, validUntil: e.target.value })}
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Currency Symbol</label>
            <select
              value={data.currency}
              onChange={(e) => onChange({ ...data, currency: e.target.value })}
              className="form-input"
            >
              <option value="₹">₹ (INR - Rupee)</option>
              <option value="$">$ (USD - Dollar)</option>
              <option value="€">€ (EUR - Euro)</option>
              <option value="£">£ (GBP - Pound)</option>
              <option value="AED">AED (Dirham)</option>
            </select>
          </div>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <label className="form-label">Salutation & Greeting</label>
          <input
            type="text"
            value={data.salutation}
            onChange={(e) => onChange({ ...data, salutation: e.target.value })}
            className="form-input"
            style={{ marginBottom: '0.5rem' }}
          />
          <label className="form-label">Introductory Statement</label>
          <textarea
            rows={2}
            value={data.introMessage}
            onChange={(e) => onChange({ ...data, introMessage: e.target.value })}
            className="form-input"
          />
        </div>
      </div>

      {/* 2. Client & Target Information */}
      <div className="form-card">
        <div className="form-card-header">
          <User size={17} color="#3b82f6" />
          <h3>Client Information (To:)</h3>
        </div>
        <div
          className="responsive-meta-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
            marginTop: '1rem',
          }}
        >
          <div>
            <label className="form-label">Client / Business Name</label>
            <input
              type="text"
              value={data.client.name}
              onChange={(e) => updateClient('name', e.target.value)}
              className="form-input"
              placeholder="e.g. kk Multi services"
            />
          </div>
          <div>
            <label className="form-label">Client Email</label>
            <input
              type="email"
              value={data.client.email}
              onChange={(e) => updateClient('email', e.target.value)}
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Client Phone</label>
            <input
              type="text"
              value={data.client.phone}
              onChange={(e) => updateClient('phone', e.target.value)}
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Client City / Address</label>
            <input
              type="text"
              value={data.client.address}
              onChange={(e) => updateClient('address', e.target.value)}
              className="form-input"
            />
          </div>
        </div>
      </div>

      {/* 3. Cost Breakdown & Services Items */}
      <div className="form-card">
        <div
          className="form-card-header"
          style={{ justifyContent: 'space-between', flexWrap: 'wrap' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Sparkles size={17} color="#3b82f6" />
            <h3>Cost Breakdown &amp; Line Items</h3>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={onOpenCatalog}
              style={{
                background: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '6px',
                color: '#e2e8f0',
                padding: '0.4rem 0.85rem',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <Sparkles size={13} color="#94a3b8" />
              <span>Browse Catalog</span>
            </button>
            <button
              type="button"
              onClick={addNewItem}
              style={{
                background: '#2563eb',
                border: 'none',
                borderRadius: '6px',
                color: '#ffffff',
                padding: '0.4rem 0.85rem',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
            >
              <Plus size={14} />
              <span>Add Custom Row</span>
            </button>
          </div>
        </div>

        {/* List of items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '1.25rem' }}>
          {data.items.map((item, idx) => (
            <div
              key={item.id}
              style={{
                background: '#0b0f19',
                border: '1px solid #1f2937',
                borderRadius: '8px',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                position: 'relative',
              }}
            >
              {/* Row 1: Dropdown selector + Title */}
              <div
                className="item-row-top"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(200px, 1.2fr) minmax(200px, 1.8fr) auto',
                  gap: '0.75rem',
                  alignItems: 'center',
                }}
              >
                <div>
                  <label className="form-label" style={{ fontSize: '0.72rem' }}>
                    Select Preset Service
                  </label>
                  <select
                    className="form-input"
                    value={item.title}
                    onChange={(e) => {
                      const selected = allCategorizedOptions.find(
                        (o) => o.name === e.target.value
                      );
                      if (selected) {
                        updateItem(idx, 'title', selected.name);
                        updateItem(idx, 'description', selected.description);
                        updateItem(idx, 'rate', selected.defaultPrice);
                        updateItem(idx, 'category', selected.category);
                      } else {
                        updateItem(idx, 'title', e.target.value);
                      }
                    }}
                    style={{ fontSize: '0.82rem' }}
                  >
                    <option value={item.title}>{item.title} (Current)</option>
                    <optgroup label="── 01 DIGITAL PRESENCE ──">
                      {SERVICE_CATEGORIES[0].services.map((s) => (
                        <option key={s.name} value={s.name}>
                          {s.name} (₹{s.defaultPrice.toLocaleString('en-IN')})
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="── 02 DIGITAL MARKETING ──">
                      {SERVICE_CATEGORIES[1].services.map((s) => (
                        <option key={s.name} value={s.name}>
                          {s.name} (₹{s.defaultPrice.toLocaleString('en-IN')})
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="── 03 SOFTWARE & ENTERPRISE ──">
                      {SERVICE_CATEGORIES[2].services.map((s) => (
                        <option key={s.name} value={s.name}>
                          {s.name} (₹{s.defaultPrice.toLocaleString('en-IN')})
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="── 04 AI & ADVANCED TECH ──">
                      {SERVICE_CATEGORIES[3].services.map((s) => (
                        <option key={s.name} value={s.name}>
                          {s.name} (₹{s.defaultPrice.toLocaleString('en-IN')})
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="── SUPPORT & MAINTENANCE ──">
                      {SERVICE_CATEGORIES[4].services.map((s) => (
                        <option key={s.name} value={s.name}>
                          {s.name} (₹{s.defaultPrice.toLocaleString('en-IN')})
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                <div>
                  <label className="form-label" style={{ fontSize: '0.72rem' }}>
                    Service Item Title (as printed)
                  </label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => updateItem(idx, 'title', e.target.value)}
                    className="form-input"
                    style={{ fontWeight: 600 }}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => removeItem(idx)}
                  style={{
                    background: 'rgba(239, 68, 68, 0.12)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#f87171',
                    borderRadius: '8px',
                    padding: '0.55rem',
                    cursor: 'pointer',
                    marginTop: '1.2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  title="Delete row"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {/* Row 2: Description + Quantity + Rate + Total Amount */}
              <div
                className="item-row-details"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(200px, 2fr) 90px 140px 140px',
                  gap: '0.75rem',
                  alignItems: 'flex-start',
                }}
              >
                <div>
                  <label className="form-label" style={{ fontSize: '0.72rem' }}>
                    Description / Scope Notes
                  </label>
                  <input
                    type="text"
                    value={item.description || ''}
                    onChange={(e) => updateItem(idx, 'description', e.target.value)}
                    className="form-input"
                    placeholder="Provide deliverables or duration details..."
                  />
                </div>

                <div>
                  <label className="form-label" style={{ fontSize: '0.72rem' }}>
                    Qty
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateItem(idx, 'quantity', e.target.value)}
                    className="form-input"
                    style={{ textAlign: 'center', fontFamily: 'var(--font-mono)' }}
                  />
                </div>

                <div>
                  <label className="form-label" style={{ fontSize: '0.72rem' }}>
                    Rate ({data.currency})
                  </label>
                  <input
                    type="number"
                    value={item.rate}
                    onChange={(e) => updateItem(idx, 'rate', e.target.value)}
                    className="form-input"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  />
                </div>

                <div className="item-amount-box">
                  <label className="form-label" style={{ fontSize: '0.72rem' }}>
                    Amount ({data.currency})
                  </label>
                  <div
                    style={{
                      background: '#111827',
                      border: '1px solid #2d3748',
                      borderRadius: '6px',
                      padding: '0.55rem 0.75rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      color: '#f8fafc',
                      textAlign: 'right',
                      fontSize: '0.9rem',
                    }}
                  >
                    {data.currency} {item.amount.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {data.items.length === 0 && (
            <div
              style={{
                padding: '2.5rem',
                textAlign: 'center',
                background: 'rgba(15, 23, 42, 0.5)',
                borderRadius: '10px',
                border: '1px dashed rgba(255, 255, 255, 0.15)',
              }}
            >
              <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>
                No line items added yet. Click below to add services.
              </p>
              <button
                type="button"
                onClick={onOpenCatalog}
                style={{
                  background: '#2563eb',
                  color: '#fff',
                  border: 'none',
                  padding: '0.55rem 1.25rem',
                  borderRadius: '6px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Browse Service Catalog
              </button>
            </div>
          )}
        </div>

        {/* Calculation summary bar */}
        <div
          className="calc-summary-grid"
          style={{
            marginTop: '1.5rem',
            padding: '1.25rem',
            background: '#0f172a',
            borderRadius: '8px',
            border: '1px solid #1f2937',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            alignItems: 'center',
          }}
        >
          <div>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Subtotal</span>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.15rem',
                fontWeight: 700,
                color: '#fff',
              }}
            >
              {data.currency} {data.subtotal.toLocaleString('en-IN')}
            </div>
          </div>

          <div>
            <label className="form-label" style={{ fontSize: '0.72rem' }}>
              Discount (%)
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <input
                type="number"
                min="0"
                max="100"
                value={data.discountRate}
                onChange={(e) => handleDiscountChange(Number(e.target.value))}
                className="form-input"
                style={{ width: '85px', fontFamily: 'var(--font-mono)' }}
              />
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                (-{data.currency} {data.discountAmount.toLocaleString('en-IN')})
              </span>
            </div>
          </div>

          <div>
            <label className="form-label" style={{ fontSize: '0.72rem' }}>
              Tax / GST (%)
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <input
                type="number"
                min="0"
                max="28"
                value={data.taxRate}
                onChange={(e) => handleTaxChange(Number(e.target.value))}
                className="form-input"
                style={{ width: '85px', fontFamily: 'var(--font-mono)' }}
              />
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                (+{data.currency} {data.taxAmount.toLocaleString('en-IN')})
              </span>
            </div>
          </div>

          <div
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '6px',
              background: '#1e293b',
              border: '1px solid #334155',
              textAlign: 'right',
            }}
          >
            <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>
              GRAND TOTAL
            </span>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.3rem',
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '-0.01em',
              }}
            >
              {data.currency} {data.grandTotal.toLocaleString('en-IN')}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Payment Terms & Conditions */}
      <div
        className="terms-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {/* Payment Terms */}
        <div className="form-card">
          <div
            className="form-card-header"
            style={{ justifyContent: 'space-between' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CreditCard size={17} color="#3b82f6" />
              <h3>Payment Terms</h3>
            </div>
            <button
              type="button"
              onClick={addPaymentTerm}
              style={{
                background: '#1f2937',
                border: '1px solid #374151',
                color: '#e2e8f0',
                borderRadius: '6px',
                padding: '0.25rem 0.55rem',
                fontSize: '0.75rem',
                cursor: 'pointer',
              }}
            >
              + Add Term
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
            {data.paymentTerms.map((term, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                <span style={{ color: '#94a3b8', fontWeight: 700 }}>•</span>
                <input
                  type="text"
                  value={term}
                  onChange={(e) => updatePaymentTerm(i, e.target.value)}
                  className="form-input"
                  style={{ fontSize: '0.82rem' }}
                />
                <button
                  type="button"
                  onClick={() => removePaymentTerm(i)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#64748b',
                    cursor: 'pointer',
                    padding: '0.3rem',
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="form-card">
          <div
            className="form-card-header"
            style={{ justifyContent: 'space-between' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={17} color="#3b82f6" />
              <h3>Terms &amp; Conditions</h3>
            </div>
            <button
              type="button"
              onClick={addTermCondition}
              style={{
                background: '#1f2937',
                border: '1px solid #374151',
                color: '#e2e8f0',
                borderRadius: '6px',
                padding: '0.25rem 0.55rem',
                fontSize: '0.75rem',
                cursor: 'pointer',
              }}
            >
              + Add Clause
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
            {data.termsAndConditions.map((clause, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                <span
                  style={{
                    color: '#94a3b8',
                    fontWeight: 600,
                    minWidth: '18px',
                    fontSize: '0.8rem',
                  }}
                >
                  {i + 1}.
                </span>
                <input
                  type="text"
                  value={clause}
                  onChange={(e) => updateTermCondition(i, e.target.value)}
                  className="form-input"
                  style={{ fontSize: '0.82rem' }}
                />
                <button
                  type="button"
                  onClick={() => removeTermCondition(i)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#64748b',
                    cursor: 'pointer',
                    padding: '0.3rem',
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Company Details & Signatory Settings */}
      <div className="form-card">
        <div className="form-card-header">
          <Building2 size={17} color="#3b82f6" />
          <h3>Company Information &amp; Signatory</h3>
        </div>
        <div
          className="company-meta-grid responsive-meta-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
            marginTop: '1rem',
          }}
        >
          <div>
            <label className="form-label">Company Brand Name</label>
            <input
              type="text"
              value={data.company.name}
              onChange={(e) => updateCompany('name', e.target.value)}
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              value={data.company.phone}
              onChange={(e) => updateCompany('phone', e.target.value)}
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Email Address</label>
            <input
              type="email"
              value={data.company.email}
              onChange={(e) => updateCompany('email', e.target.value)}
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Website Domain</label>
            <input
              type="text"
              value={data.company.website}
              onChange={(e) => updateCompany('website', e.target.value)}
              className="form-input"
            />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">Footer Office Address (Official Bottom Banner)</label>
            <input
              type="text"
              value={data.company.footerAddress}
              onChange={(e) => updateCompany('footerAddress', e.target.value)}
              className="form-input"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
