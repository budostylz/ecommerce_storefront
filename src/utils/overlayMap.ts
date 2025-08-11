// e.g. src/utils/overlayMap.ts (excerpt)
export const overlayMap = {
  '/contact': {
    contact: {
      id: 'component-contact',
      component: 'Contact',
      position: {
        x: 0,
        y: 'auto',
        width: '100%',
        zIndex: 1
      },
      props: {
        address: '66 West Flagler St, Miami, Florida, 33130',
        phones: ['125-711-811', '125-668-886'],
        supportEmail: 'Support.photography@gmail.com',
        mapSrc:
          'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3586.547649012345!2d-80.1950148236409!3d25.774265911945164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b69f4d0d69cf%3A0x28a55d3ad739888!2s66%20W%20Flagler%20St%2C%20Miami%2C%20FL%2033130!5e0!3m2!1sen!2sus!4v1691777777777!5m2!1sen!2sus'
      },
      tokens: [
        /* ===== Section ===== */
        '--contact-section-bg-contact-1',
        '--contact-section-padding-top-contact-1',
        '--contact-section-padding-bottom-contact-1',

        /* ===== Headings ===== */
        '--contact-heading-font-family-contact-1',
        '--contact-heading-font-size-contact-1',
        '--contact-heading-font-weight-contact-1',
        '--contact-heading-text-transform-contact-1',
        '--contact-heading-color-contact-1',
        '--contact-heading-margin-bottom-contact-1',

        /* ===== Address / Info ===== */
        '--contact-info-item-gap-contact-1',
        '--contact-info-title-font-size-contact-1',
        '--contact-info-title-font-weight-contact-1',
        '--contact-info-title-color-contact-1',
        '--contact-info-text-font-size-contact-1',
        '--contact-info-text-color-contact-1',
        '--contact-info-icon-size-contact-1',
        '--contact-info-icon-color-contact-1',
        '--contact-info-chip-gap-contact-1',

        /* ===== Form ===== */
        '--contact-form-heading-font-family-contact-1',
        '--contact-form-heading-font-size-contact-1',
        '--contact-form-heading-font-weight-contact-1',
        '--contact-form-heading-text-transform-contact-1',
        '--contact-form-heading-color-contact-1',
        '--contact-form-field-height-contact-1',
        '--contact-form-field-font-size-contact-1',
        '--contact-form-field-text-color-contact-1',
        '--contact-form-field-bg-contact-1',
        '--contact-form-field-border-color-contact-1',
        '--contact-form-field-border-radius-contact-1',
        '--contact-form-field-padding-x-contact-1',
        '--contact-form-field-margin-bottom-contact-1',
        '--contact-form-textarea-height-contact-1',
        '--contact-form-placeholder-color-contact-1',

        /* ===== Button ===== */
        '--contact-button-font-size-contact-1',
        '--contact-button-text-transform-contact-1',
        '--contact-button-font-weight-contact-1',
        '--contact-button-text-color-contact-1',
        '--contact-button-bg-contact-1',
        '--contact-button-padding-y-contact-1',
        '--contact-button-padding-x-contact-1',
        '--contact-button-border-radius-contact-1',

        /* ===== Map ===== */
        '--contact-map-height-contact-1',
        '--contact-map-border-width-contact-1',
        '--contact-map-width-contact-1',

        /* ===== Mobile ===== */
        '--contact-heading-font-size-mobile-contact-1',
        '--contact-section-padding-top-mobile-contact-1',
        '--contact-section-padding-bottom-mobile-contact-1',
        '--contact-form-field-margin-bottom-mobile-contact-1',
        '--contact-map-height-mobile-contact-1'
      ],
      editable: true
    }
  }
};
