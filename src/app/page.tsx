'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { QuotationForm } from '@/components/QuotationForm';
import { QuotationPreview } from '@/components/QuotationPreview';
import { ServiceCatalogModal } from '@/components/ServiceCatalogModal';
import { DEFAULT_QUOTATION_DATA, CategorizedService } from '@/data/services';
import { QuotationData, ServiceItem } from '@/types/quotation';
import { Sparkles, CheckCircle2, SlidersHorizontal, Download } from 'lucide-react';

export default function Home() {
  const [data, setData] = useState<QuotationData>(DEFAULT_QUOTATION_DATA);
  const [viewMode, setViewMode] = useState<'split' | 'edit' | 'preview'>('split');
  const [isCatalogOpen, setIsCatalogOpen] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    if (confirm('Reset quotation form to blank?')) {
      setData({
        ...DEFAULT_QUOTATION_DATA,
        quotationNo: `QT-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(
          'en-GB',
          { day: 'numeric', month: 'long', year: 'numeric' }
        ),
        client: {
          name: '',
          companyName: '',
          email: '',
          phone: '',
          address: '',
        },
        items: [],
        subtotal: 0,
        taxRate: 0,
        taxAmount: 0,
        discountRate: 0,
        discountAmount: 0,
        grandTotal: 0,
      });
      showToast('Form reset to blank.');
    }
  };

  const handleLoadTemplate = () => {
    setData(DEFAULT_QUOTATION_DATA);
    showToast('Loaded reference template sample.');
  };

  // Add a service selected from the Catalog Modal
  const handleSelectServiceFromCatalog = (service: CategorizedService) => {
    const newItem: ServiceItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      category: service.category,
      title: service.name,
      description: service.description,
      quantity: 1,
      rate: service.defaultPrice,
      amount: service.defaultPrice,
    };

    const newItems = [...data.items, newItem];
    const subtotal = newItems.reduce((acc, it) => acc + (Number(it.amount) || 0), 0);
    const discAmount = (subtotal * data.discountRate) / 100;
    const taxable = subtotal - discAmount;
    const taxAmount = (taxable * data.taxRate) / 100;
    const grandTotal = taxable + taxAmount;

    setData({
      ...data,
      items: newItems,
      subtotal,
      discountAmount: discAmount,
      taxAmount,
      grandTotal,
    });

    showToast(`Added "${service.name}" to quotation`);
  };

  const handleSelectMultipleServices = (
    services: CategorizedService[],
    replaceExisting: boolean = false,
    hideAmounts?: boolean
  ) => {
    const formattedServices: ServiceItem[] = services.map((s) => ({
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      category: s.category,
      title: s.name,
      description: s.description,
      quantity: 1,
      rate: s.defaultPrice,
      amount: s.defaultPrice,
    }));

    const newItems = replaceExisting
      ? formattedServices
      : [...data.items, ...formattedServices];

    const subtotal = newItems.reduce((acc, it) => acc + (Number(it.amount) || 0), 0);
    const discAmount = (subtotal * data.discountRate) / 100;
    const taxable = subtotal - discAmount;
    const taxAmount = (taxable * data.taxRate) / 100;
    const grandTotal = taxable + taxAmount;

    setData({
      ...data,
      items: newItems,
      subtotal,
      discountAmount: discAmount,
      taxAmount,
      grandTotal,
      hideIndividualAmounts:
        hideAmounts !== undefined ? hideAmounts : data.hideIndividualAmounts,
    });

    showToast(
      replaceExisting
        ? `Quotation set to ${services.length} selected services (Total: ₹${grandTotal.toLocaleString('en-IN')})`
        : `Added ${services.length} services to quotation`
    );
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar with brand identity and top actions */}
      <Navbar
        onPrint={handlePrint}
        onReset={handleReset}
        onLoadTemplate={handleLoadTemplate}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {/* Toast Notification */}
      {notification && (
        <div
          className="no-print"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: '#111827',
            border: '1px solid #374151',
            borderRadius: '8px',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.4)',
            padding: '0.75rem 1.25rem',
            color: '#f8fafc',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            zIndex: 999,
            fontSize: '0.85rem',
            fontWeight: 500,
          }}
        >
          <CheckCircle2 size={16} color="#3b82f6" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main Container */}
      <main
        className="app-main-layout"
        style={{
          flex: 1,
          maxWidth: '1750px',
          width: '100%',
          margin: '0 auto',
          padding: '1.25rem',
          display: 'grid',
          gridTemplateColumns:
            viewMode === 'split'
              ? 'minmax(480px, 1fr) minmax(520px, 1.15fr)'
              : '1fr',
          gap: '1.75rem',
          alignItems: 'start',
        }}
      >
        {/* Left Form Editor */}
        {(viewMode === 'split' || viewMode === 'edit') && (
          <div
            className="no-print"
            style={{
              maxHeight: viewMode === 'split' ? 'calc(100vh - 100px)' : 'none',
              overflowY: viewMode === 'split' ? 'auto' : 'visible',
              paddingRight: viewMode === 'split' ? '0.5rem' : '0',
            }}
          >
            {/* Header Banner inside editor */}
            <div
              style={{
                background: '#111827',
                border: '1px solid #1f2937',
                borderRadius: '8px',
                padding: '1rem 1.25rem',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.75rem',
              }}
            >
              <div>
                <h2
                  style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: '#f8fafc',
                    margin: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <Sparkles size={15} color="#3b82f6" />
                  Service Quotation Form
                </h2>
                <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: '0.2rem 0 0 0' }}>
                  Choose from categorized dropdown services or customize rates &amp; deliverables
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsCatalogOpen(true)}
                style={{
                  background: '#2563eb',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#ffffff',
                  padding: '0.5rem 0.95rem',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  transition: 'background 0.15s ease',
                }}
              >
                <SlidersHorizontal size={14} />
                <span>Open Services Drawer</span>
              </button>
            </div>

            <QuotationForm
              data={data}
              onChange={setData}
              onOpenCatalog={() => setIsCatalogOpen(true)}
            />
          </div>
        )}

        {/* Right Live Sheet Preview */}
        {(viewMode === 'split' || viewMode === 'preview') && (
          <div
            className="preview-scroll-wrapper"
            style={{
              maxHeight: viewMode === 'split' ? 'calc(100vh - 100px)' : 'none',
              overflowY: viewMode === 'split' ? 'auto' : 'visible',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <QuotationPreview
              data={data}
              onPrint={handlePrint}
              onToggleHideAmounts={(hide) =>
                setData({ ...data, hideIndividualAmounts: hide })
              }
            />
          </div>
        )}
      </main>

      {/* Catalog Selector Modal */}
      <ServiceCatalogModal
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
        onSelectService={handleSelectServiceFromCatalog}
        onSelectMultiple={handleSelectMultipleServices}
        initialHideAmounts={data.hideIndividualAmounts}
      />
    </div>
  );
}
