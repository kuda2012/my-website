import { useLayoutEffect, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  // Ensure browsers don't restore scroll automatically (Chrome/Safari bfcache)
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "scrollRestoration" in window.history
    ) {
      const prev = window.history.scrollRestoration;
      window.history.scrollRestoration = "manual";
      return () => {
        window.history.scrollRestoration = prev;
        XMLHttpRequestEventTarget;
      };
    }
  }, []);

  // Scroll on navigation BEFORE paint to avoid flicker
  useLayoutEffect(() => {
    // If there is a hash (#section), let the browser handle anchor scrolling
    if (hash) return;

    // If you use a custom scroll container, target it here:
    // const scroller = document.querySelector("main") || window; // adjust if needed

    // Try multiple strategies for cross-browser consistency
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant" in window ? "instant" : "auto",
    });
    // Safari/iOS fallback
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname, search, hash]);

  return null;
}
