// src/components/OffcanvasMenu.tsx
import React, { useEffect, useRef } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  onSearch?: () => void;
  wishlistCount?: number;
  cartCount?: number;
  onLogin?: () => void;
  onRegister?: () => void;
  logoSrc?: string; // defaults to Colorlib path you mapped
};

const OffcanvasMenu: React.FC<Props> = ({
  open,
  onClose,
  onSearch,
  wishlistCount = 0,
  cartCount = 0,
  onLogin,
  onRegister,
  logoSrc = 'https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/templates/ecommerce/fashio/logo.png',
}) => {
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* Overlay */}
      <div
        className="offcanvas-menu-overlay"
        style={{ display: open ? 'block' : 'none' }}
        onClick={onClose}
        aria-hidden={!open}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="offcanvas-menu-wrapper"
        style={{ transform: open ? 'translateX(0)' : 'translateX(100%)' }}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        <button
          type="button"
          className="offcanvas__close"
          aria-label="Close menu"
          onClick={onClose}
        >
          +
        </button>

        <ul className="offcanvas__widget">
          <li>
            <button
              type="button"
              className="icon_search search-switch"
              aria-label="Search"
              onClick={onSearch}
            />
          </li>

          <li>
            <a href="#" aria-label="Wishlist">
              <span className="icon_heart_alt" />
              {wishlistCount > 0 && <div className="tip">{wishlistCount}</div>}
            </a>
          </li>

          <li>
            <a href="#" aria-label="Cart">
              <span className="icon_bag_alt" />
              {cartCount > 0 && <div className="tip">{cartCount}</div>}
            </a>
          </li>
        </ul>

        <div className="offcanvas__logo">
          <a href="/">
            <img src={logoSrc} alt="Logo" />
          </a>
        </div>

        {/* If you use a mobile nav library, mount it into this container */}
        <div id="mobile-menu-wrap" />

        <div className="offcanvas__auth">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onLogin?.();
            }}
          >
            Login
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onRegister?.();
            }}
          >
            Register
          </a>
        </div>
      </div>
    </>
  );
};

export default OffcanvasMenu;
