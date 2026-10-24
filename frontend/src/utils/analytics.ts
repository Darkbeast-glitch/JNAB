/**
 * Umami Analytics Integration for JNAB Innovations
 * Privacy-focused, lightweight analytics with custom event tracking.
 */

declare global {
  interface Window {
    umami?: {
      track: {
        (eventName: string, eventData?: Record<string, any>): void;
        (customFn: (props: Record<string, any>) => Record<string, any>): void;
      };
    };
  }
}

/**
 * Automatically initializes and injects the Umami tracking script
 * if VITE_UMAMI_WEBSITE_ID is provided in the environment.
 */
export const initUmami = (): void => {
  if (typeof window === 'undefined') return;

  const websiteId = (import.meta as any).env?.VITE_UMAMI_WEBSITE_ID;
  const scriptUrl =
    (import.meta as any).env?.VITE_UMAMI_SCRIPT_URL ||
    'https://cloud.umami.is/script.js';
  const hostUrl = (import.meta as any).env?.VITE_UMAMI_HOST_URL;
  const domains = (import.meta as any).env?.VITE_UMAMI_DOMAINS;

  if (!websiteId || typeof websiteId !== 'string' || !websiteId.trim()) {
    if ((import.meta as any).env?.DEV) {
      console.info(
        '[Umami Analytics] VITE_UMAMI_WEBSITE_ID is not configured. Event logging will be output to console in DEV mode.'
      );
    }
    return;
  }

  // Prevent duplicate script injection
  const existingScript = document.querySelector('script[data-website-id]');
  if (existingScript) return;

  try {
    const script = document.createElement('script');
    script.defer = true;
    script.async = true;
    script.src = scriptUrl.trim();
    script.setAttribute('data-website-id', websiteId.trim());

    if (hostUrl && typeof hostUrl === 'string') {
      script.setAttribute('data-host-url', hostUrl.trim());
    }

    if (domains && typeof domains === 'string') {
      script.setAttribute('data-domains', domains.trim());
    }

    document.head.appendChild(script);

    if ((import.meta as any).env?.DEV) {
      console.info(`[Umami Analytics] Script loaded from ${scriptUrl} with ID: ${websiteId}`);
    }
  } catch (error) {
    console.warn('[Umami Analytics] Failed to initialize Umami script:', error);
  }
};

/**
 * Track custom events with optional structured properties.
 * Safe to call even if the Umami script is not loaded or blocked by adblockers.
 */
export const trackEvent = (
  eventName: string,
  eventData?: Record<string, string | number | boolean | null | undefined>
): void => {
  if (typeof window === 'undefined') return;

  try {
    if (window.umami && typeof window.umami.track === 'function') {
      window.umami.track(eventName, eventData);
    } else if ((import.meta as any).env?.DEV) {
      console.log(`📊 [Umami Event] ${eventName}`, eventData || {});
    }
  } catch (err) {
    // Fail silently so user interactions are never blocked
    if ((import.meta as any).env?.DEV) {
      console.warn(`[Umami Track Error] ${eventName}:`, err);
    }
  }
};

/**
 * Pre-defined high-intent conversion event helpers for JNAB
 */
export const Analytics = {
  // Client Quote & Estimator Events
  quoteModalOpened: (source: string, preselectedTrack?: string) => {
    trackEvent('quote_modal_opened', { source, track: preselectedTrack || 'default' });
  },
  quoteSubmitted: (track: 'project' | 'talent' | 'academy' | string, details?: Record<string, any>) => {
    trackEvent('quote_submitted', { track, ...details });
  },

  // Contact Page Events
  contactFormSubmitted: (intent?: string) => {
    trackEvent('contact_form_submitted', { intent: intent || 'general_inquiry' });
  },

  // Careers & Job Applications
  careerModalOpened: (roleTitle: string) => {
    trackEvent('career_modal_opened', { role: roleTitle });
  },
  careerApplicationSubmitted: (roleTitle: string, applicantEmail?: string) => {
    trackEvent('career_application_submitted', { role: roleTitle });
  },

  // Academy CTA
  academyTrackClicked: (trackName: string) => {
    trackEvent('academy_track_clicked', { track: trackName });
  },

  // Outbound / Portfolio
  externalProjectClicked: (projectName: string, url: string) => {
    trackEvent('external_project_clicked', { project: projectName, url });
  },
  partnerClicked: (partnerName: string) => {
    trackEvent('partner_clicked', { partner: partnerName });
  },
};
