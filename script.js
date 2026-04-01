// FAQ accordion behavior
const accordionItems = document.querySelectorAll(".faq-item");

accordionItems.forEach((item) => {
  const trigger = item.querySelector(".faq-question");

  if (!trigger) {
    return;
  }

  trigger.addEventListener("click", () => {
    const isOpen = item.classList.contains("is-open");

    accordionItems.forEach((entry) => {
      const button = entry.querySelector(".faq-question");
      entry.classList.remove("is-open");

      if (button) {
        button.setAttribute("aria-expanded", "false");
      }
    });

    if (!isOpen) {
      item.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
    }
  });
});

// Smooth scrolling for in-page links with a small offset for the sticky header
const anchorLinks = document.querySelectorAll('a[href^="#"]');
const serviceTitanSchedulerId = "sched_oyzszpzqvx9qjvia9v0nk6qn";
const serviceTitanDirectLink = "https://scheduler.servicetitan.com/?brandId=brand_otm4scgo60cv7y4scvdd0s4s";
const schedulerRetryLimit = 12;
const schedulerRetryDelay = 250;

const openServiceTitanDirectLink = () => {
  window.location.assign(serviceTitanDirectLink);
};

const openServiceTitanScheduler = (attempt = 0) => {
  if (window._scheduler && typeof window._scheduler.show === "function") {
    window._scheduler.show({ schedulerId: serviceTitanSchedulerId });
    return;
  }

  if (attempt >= schedulerRetryLimit) {
    openServiceTitanDirectLink();
    return;
  }

  window.setTimeout(() => {
    openServiceTitanScheduler(attempt + 1);
  }, schedulerRetryDelay);
};

window.showBookingScheduler = (event) => {
  if (event) {
    event.preventDefault();
  }

  if (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname === "::1"
  ) {
    openServiceTitanDirectLink();
    return;
  }

  openServiceTitanScheduler();
};

anchorLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    if (link.hasAttribute("data-booking-trigger")) {
      return;
    }

    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const targetElement = document.querySelector(targetId);

    if (!targetElement) {
      return;
    }

    event.preventDefault();

    const headerOffset = 90;
    const targetTop = targetElement.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({
      top: targetTop,
      behavior: "smooth"
    });
  });
});

// Sticky CTA behavior:
// 1) It can hide near the form before engagement.
// 2) After 3 meaningful scroll interactions, pin it on screen permanently.
const stickyCta = document.querySelector("[data-sticky-cta]");
const formSection = document.querySelector("#lead-form");
const footer = document.querySelector(".site-footer");
const ctaTriggerSection = document.querySelector(".section-heading.centered");

if (stickyCta && formSection) {
  let scrollCount = 0;
  let lastScrollY = window.scrollY;
  let isPinned = false;
  let hideTimer = null;

  const showStickyCta = () => {
    if (hideTimer) {
      clearTimeout(hideTimer);
      hideTimer = null;
    }

    if (stickyCta.classList.contains("is-visible")) {
      return;
    }

    stickyCta.classList.remove("is-hidden", "is-footer-hidden", "is-exiting");
    void stickyCta.offsetWidth;
    stickyCta.classList.add("is-visible");
  };

  const hideStickyCta = (hiddenClass) => {
    if (hideTimer) {
      clearTimeout(hideTimer);
      hideTimer = null;
    }

    if (
      stickyCta.classList.contains(hiddenClass) &&
      !stickyCta.classList.contains("is-visible") &&
      !stickyCta.classList.contains("is-exiting")
    ) {
      return;
    }

    stickyCta.classList.remove("is-visible");
    stickyCta.classList.add("is-exiting");

    hideTimer = window.setTimeout(() => {
      stickyCta.classList.remove("is-exiting");
      stickyCta.classList.add(hiddenClass);
      hideTimer = null;
    }, 420);
  };

  const registerScrollInteraction = () => {
    if (isPinned) {
      return;
    }

    const delta = Math.abs(window.scrollY - lastScrollY);

    if (delta >= 24) {
      scrollCount += 1;
      lastScrollY = window.scrollY;
    }

    if (scrollCount >= 3) {
      isPinned = true;
      stickyCta.classList.remove("is-hidden");
      stickyCta.classList.add("is-pinned");
    }
  };

  const toggleStickyCta = () => {
    const footerVisible = footer
      ? footer.getBoundingClientRect().top < window.innerHeight
      : false;
    const triggerReached = ctaTriggerSection
      ? ctaTriggerSection.getBoundingClientRect().top < window.innerHeight
      : true;

    if (footerVisible) {
      hideStickyCta("is-footer-hidden");
      return;
    }

    if (!triggerReached) {
      hideStickyCta("is-hidden");
      return;
    }

    if (isPinned) {
      showStickyCta();
      return;
    }

    const triggerPoint = formSection.offsetTop - window.innerHeight * 0.65;
    if (window.scrollY >= triggerPoint) {
      hideStickyCta("is-hidden");
      return;
    }

    showStickyCta();
  };

  const handleScroll = () => {
    registerScrollInteraction();
    toggleStickyCta();
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", toggleStickyCta);

  toggleStickyCta();
}
