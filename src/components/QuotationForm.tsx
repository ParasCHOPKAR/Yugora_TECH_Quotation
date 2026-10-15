'use client';

import React from 'react';
import { QuotationData, ServiceItem } from '@/types/quotation';
import { SERVICE_CATEGORIES, CONNECTIT_ANNUAL_PLANS } from '@/data/services';
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
  Calendar,
} from 'lucide-react';

// Helper to convert formatted/manual date string to YYYY-MM-DD for native date picker
function parseToIsoDate(val: string): string {
  if (!val || typeof val !== 'string') return '';
  const trimmed = val.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return trimmed;
  }
  // Check dd/mm/yyyy or dd-mm-yyyy
  const dmyMatch = trimmed.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
  if (dmyMatch) {
    const d = parseInt(dmyMatch[1], 10);
    const m = parseInt(dmyMatch[2], 10);
    const y = parseInt(dmyMatch[3], 10);
    const date = new Date(y, m - 1, d);
    if (!isNaN(date.getTime())) {
      return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    }
  }
  const timestamp = Date.parse(trimmed);
  if (!isNaN(timestamp)) {
    const d = new Date(timestamp);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }
  return '';
}

// Helper to format ISO YYYY-MM-DD to friendly quotation date (e.g., 28 August 2026)
function formatIsoToQuotationDate(isoDate: string): string {
  if (!isoDate) return '';
  const parts = isoDate.split('-');
  if (parts.length === 3) {
    const y = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10) - 1;
    const d = parseInt(parts[2], 10);
    const date = new Date(y, m, d);
    if (!isNaN(date.getTime())) {
      return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    }
  }
  return isoDate;
}

// Reusable Date input field supporting both manual typing and calendar picker
interface DateInputFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

const DateInputField: React.FC<DateInputFieldProps> = ({
  label,
  value,
  onChange,
  placeholder = 'e.g. 28 August 2026',
}) => {
  const dateInputRef = React.useRef<HTMLInputElement>(null);
  const isoValue = parseToIsoDate(value);

  const handleOpenPicker = () => {
    if (dateInputRef.current) {
      if ('showPicker' in HTMLInputElement.prototype) {
        try {
          dateInputRef.current.showPicker();
          return;
        } catch {
          // Fallback
        }
      }
      dateInputRef.current.focus();
    }
  };

  return (
    <div>
      <label className="form-label">{label}</label>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="form-input"
          placeholder={placeholder}
          style={{ paddingRight: '2.5rem' }}
        />
        {/* Hidden native date input for calendar selection */}
        <input
          ref={dateInputRef}
          type="date"
          value={isoValue}
          onChange={(e) => {
            if (e.target.value) {
              onChange(formatIsoToQuotationDate(e.target.value));
            }
          }}
          tabIndex={-1}
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '0.35rem',
            width: '2.2rem',
            height: '2.2rem',
            opacity: 0,
            cursor: 'pointer',
            zIndex: 3,
          }}
        />
        {/* Calendar visual icon button */}
        <button
          type="button"
          onClick={handleOpenPicker}
          tabIndex={-1}
          title="Pick date from calendar"
          aria-label="Pick date from calendar"
          style={{
            position: 'absolute',
            right: '0.4rem',
            width: '2.2rem',
            height: '2.2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            border: 'none',
            color: '#6366f1',
            borderRadius: '6px',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        >
          <Calendar size={17} />
        </button>
      </div>
    </div>
  );
};

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
          <DateInputField
            label="Quotation Date"
            value={data.date}
            onChange={(val) => onChange({ ...data, date: val })}
            placeholder="e.g. 28 August 2026"
          />
          <DateInputField
            label="Validity (Until Date)"
            value={data.validUntil}
            onChange={(val) => onChange({ ...data, validUntil: val })}
            placeholder="e.g. 27 September 2026"
          />
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
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {data.items.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  if (confirm('Clear all services from quotation?')) {
                    recalculateTotals([], data.discountRate, data.taxRate);
                  }
                }}
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  borderRadius: '6px',
                  color: '#f87171',
                  padding: '0.4rem 0.75rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Clear All
              </button>
            )}
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

        {/* Quick Add CONNECTit Automation Package */}
        <div
          style={{
            background: 'linear-gradient(90deg, rgba(37, 211, 102, 0.08) 0%, rgba(59, 130, 246, 0.08) 100%)',
            border: '1px solid rgba(37, 211, 102, 0.25)',
            borderRadius: '8px',
            padding: '0.75rem 1rem',
            marginTop: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              style={{
                fontSize: '0.7rem',
                fontWeight: 800,
                color: '#25d366',
                background: 'rgba(37, 211, 102, 0.15)',
                border: '1px solid rgba(37, 211, 102, 0.35)',
                padding: '0.15rem 0.45rem',
                borderRadius: '4px',
                letterSpacing: '0.04em',
              }}
            >
              CONNECTit
            </span>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#f8fafc' }}>
              Add Annual Automation Plan:
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
            {CONNECTIT_ANNUAL_PLANS.map((plan) => (
              <button
                key={plan.id}
                type="button"
                onClick={() => {
                  const newItem: ServiceItem = {
                    id: `item-${Date.now()}-${plan.id}`,
                    category: plan.serviceItem.category,
                    title: plan.serviceItem.name,
                    description: plan.serviceItem.description,
                    quantity: 1,
                    rate: plan.serviceItem.defaultPrice,
                    amount: plan.serviceItem.defaultPrice,
                  };
                  recalculateTotals([...data.items, newItem], data.discountRate, data.taxRate);
                }}
                title={plan.tagline}
                style={{
                  background: plan.popular ? 'rgba(37, 211, 102, 0.2)' : '#111827',
                  border: plan.popular ? '1px solid #25d366' : '1px solid #374151',
                  color: plan.popular ? '#4ade80' : '#cbd5e1',
                  padding: '0.3rem 0.6rem',
                  borderRadius: '5px',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  transition: 'all 0.15s ease',
                }}
              >
                <span>{plan.name}</span>
                <span style={{ color: '#94a3b8', fontSize: '0.7rem' }}>
                  ₹{plan.price.toLocaleString('en-IN')}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Display Mode Card / Selector */}
        <div
          style={{
            background: '#0b0f19',
            border: '1px solid #1f2937',
            borderRadius: '8px',
            padding: '0.85rem 1rem',
            marginTop: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f8fafc' }}>
                Pricing Display Mode:
              </span>
              <span
                style={{
                  fontSize: '0.7rem',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '4px',
                  fontWeight: 600,
                  background: data.hideIndividualAmounts
                    ? 'rgba(37, 99, 235, 0.2)'
                    : 'rgba(16, 185, 129, 0.2)',
                  color: data.hideIndividualAmounts ? '#60a5fa' : '#34d399',
                  border: data.hideIndividualAmounts
                    ? '1px solid rgba(59, 130, 246, 0.3)'
                    : '1px solid rgba(16, 185, 129, 0.3)',
                }}
              >
                {data.hideIndividualAmounts
                  ? 'Total Amount Only'
                  : 'Itemized Pricing'}
              </span>
            </div>
            <p
              style={{
                fontSize: '0.74rem',
                color: '#94a3b8',
                margin: '0.25rem 0 0 0',
              }}
            >
              {data.hideIndividualAmounts
                ? '✓ Only selected services are listed on quotation. Individual service prices are hidden; only Grand Total is visible.'
                : 'Each service shows its individual rate and amount column on the quotation.'}
            </p>
          </div>

          {/* Toggle pill selector */}
          <div
            style={{
              display: 'flex',
              background: '#111827',
              padding: '0.2rem',
              borderRadius: '6px',
              border: '1px solid #374151',
            }}
          >
            <button
              type="button"
              onClick={() => onChange({ ...data, hideIndividualAmounts: false })}
              style={{
                background: !data.hideIndividualAmounts ? '#2563eb' : 'transparent',
                color: !data.hideIndividualAmounts ? '#ffffff' : '#94a3b8',
                border: 'none',
                padding: '0.35rem 0.75rem',
                borderRadius: '5px',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              Itemized Pricing
            </button>
            <button
              type="button"
              onClick={() => onChange({ ...data, hideIndividualAmounts: true })}
              style={{
                background: data.hideIndividualAmounts ? '#2563eb' : 'transparent',
                color: data.hideIndividualAmounts ? '#ffffff' : '#94a3b8',
                border: 'none',
                padding: '0.35rem 0.75rem',
                borderRadius: '5px',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              Total Amount Only
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
                    {SERVICE_CATEGORIES.map((cat) => (
                      <optgroup
                        key={cat.id}
                        label={`── ${cat.code ? cat.code + ' ' : ''}${cat.title} ──`}
                      >
                        {cat.services.map((s) => (
                          <option key={s.name} value={s.name}>
                            {s.name} (₹{s.defaultPrice.toLocaleString('en-IN')})
                          </option>
                        ))}
                      </optgroup>
                    ))}
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
                    Rate ({data.currency}){' '}
                    {data.hideIndividualAmounts && (
                      <span style={{ color: '#60a5fa', fontSize: '0.66rem', fontWeight: 500 }}>
                        (Hidden on quote)
                      </span>
                    )}
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
                    Amount ({data.currency}){' '}
                    {data.hideIndividualAmounts && (
                      <span style={{ color: '#60a5fa', fontSize: '0.66rem', fontWeight: 500 }}>
                        (Hidden on quote)
                      </span>
                    )}
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

          {data.hideIndividualAmounts && (
            <div
              style={{
                gridColumn: '1 / -1',
                background: 'rgba(37, 99, 235, 0.12)',
                border: '1px solid rgba(59, 130, 246, 0.35)',
                borderRadius: '6px',
                padding: '0.65rem 0.95rem',
                fontSize: '0.78rem',
                color: '#93c5fd',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
              }}
            >
              <Sparkles size={15} color="#60a5fa" style={{ flexShrink: 0 }} />
              <span>
                <b>Total Amount Only Mode Active:</b> The quotation lists selected services and their deliverables without individual prices. Only this Grand Total (<b>{data.currency} {data.grandTotal.toLocaleString('en-IN')}</b>) is visible to the client.
              </span>
            </div>
          )}
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
