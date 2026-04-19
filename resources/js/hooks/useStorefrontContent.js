import { useEffect, useState } from "react";

const defaultContent = {
  auth: {
    isAuthenticated: false,
    isVerified: false,
    user: null,
  },
  settings: {
    siteName: "Matjari",
    navbar: {
      logoPath: "/images/Logo.png",
      homeLabel: "HOME",
      categoryLabel: "CATEGORY",
      searchPlaceholder: "Search products...",
      links: [
        { label: "Telephone & Tablet", url: "/shop" },
        { label: "TV & High Tech", url: "/shop" },
        { label: "Computing", url: "/shop" },
        { label: "Home & Kitchen", url: "/shop" },
      ],
    },
    hero: {
      title: "Welcome to Ecomerce",
      description: "Discover our best products",
    },
    footer: {
      description:
        "Your one-stop destination for daily essentials, curated accessories, and a clean shopping experience.",
      quickLinks: [
        { label: "Home", url: "/" },
        { label: "Shop", url: "/shop" },
        { label: "Favorite", url: "/favorite" },
        { label: "Cart", url: "/cart" },
      ],
      socialLinks: [
        { label: "Facebook", url: "#", icon: "f" },
        { label: "Twitter", url: "#", icon: "x" },
        { label: "GitHub", url: "#", icon: "g" },
        { label: "LinkedIn", url: "#", icon: "in" },
      ],
      newsletterTitle: "Newsletter",
      newsletterText: "Get updates and special offers in your inbox.",
      newsletterPlaceholder: "Enter your email",
      newsletterButtonLabel: "Subscribe",
      copyright: "All rights reserved.",
      policyLabel: "Privacy Policy",
      termsLabel: "Terms & Conditions",
    },
  },
};

let cachedContent = null;
let pendingRequest = null;

async function loadStorefrontContent() {
  if (cachedContent) {
    return cachedContent;
  }

  if (!pendingRequest) {
    pendingRequest = fetch("/api/storefront", {
      headers: {
        Accept: "application/json",
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Storefront request failed with status ${response.status}`);
        }

        return response.json();
      })
      .then((payload) => {
        cachedContent = {
          ...defaultContent,
          ...payload,
          settings: {
            ...defaultContent.settings,
            ...(payload.settings || {}),
            navbar: {
              ...defaultContent.settings.navbar,
              ...(payload.settings?.navbar || {}),
            },
            hero: {
              ...defaultContent.settings.hero,
              ...(payload.settings?.hero || {}),
            },
            footer: {
              ...defaultContent.settings.footer,
              ...(payload.settings?.footer || {}),
            },
          },
          auth: {
            ...defaultContent.auth,
            ...(payload.auth || {}),
          },
        };

        return cachedContent;
      })
      .finally(() => {
        pendingRequest = null;
      });
  }

  return pendingRequest;
}

export default function useStorefrontContent() {
  const [content, setContent] = useState(cachedContent || defaultContent);
  const [loading, setLoading] = useState(!cachedContent);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    loadStorefrontContent()
      .then((payload) => {
        if (!active) return;
        setContent(payload);
        setError(null);
      })
      .catch((err) => {
        if (!active) return;
        setError(err);
      })
      .finally(() => {
        if (!active) return;
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return {
    ...content,
    loading,
    error,
  };
}
