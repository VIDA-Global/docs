/*
* Vida White-label Customization Script for UI
*/

window.dataLayer = window.dataLayer || [];
console.log("Custom white-label script loaded!");

// Define domain-specific rules
const domainConfig = [
  {
    match: /^vidadev\.lylepratt\.com$/,
    brandName: "AutomatedPhone",
    replacements: [
      { from: /help@vida\.inc/gi, to: "help@automatedphone.ai" },
      { from: /api\.vida\.dev/gi, to: "api.automatedphone.ai" },
      { from: /Vida(\.io)?/gi, to: "AutomatedPhone" },
    ],
    logoLightUrl: "https://vidapublic.s3.us-east-2.amazonaws.com/automated-phone-light.png",
    logoDarkUrl: "https://vidapublic.s3.us-east-2.amazonaws.com/automated-phone-dark.png",
  },
  {
    match: /^voice\.shure\.ai$/,
    brandName: "Shure AI",
    replacements: [
      { from: /help@vida\.inc/gi, to: "dev@shure.ai" },
      { from: /api\.vida\.dev/gi, to: "api.vida.dev" },
      { from: /Vida(\.io)?/gi, to: "Shure AI" },
    ],
    logoLightUrl: "https://vidapublic.s3.us-east-2.amazonaws.com/shure-ai-logo-cropped.png",
    logoDarkUrl: "https://vidapublic.s3.us-east-2.amazonaws.com/shure-ai-logo-cropped.png",
  },
  {
    match: /^jobnimbus\.automatedphone\.ai$/,
    brandName: "JobNimbus",
    faviconUrl: "https://webappui.jobnimbus.com/images/favicon.png",
    replacements: [
      { from: /help@vida\.inc/gi, to: "help@automatedphone.ai" },
      { from: /api\.vida\.dev/gi, to: "api.vida.dev" },
      { from: /Vida(\.io)?/gi, to: "JobNimbus" },
    ],
    logoLightUrl: "https://vidapublic.s3.us-east-2.amazonaws.com/jobnimbus-logo.png",
    logoDarkUrl: "https://vidapublic.s3.us-east-2.amazonaws.com/jobnimbus-logo.png",
  },
  {
    match: /^marketinghub\.jobnimbus\.com$/,
    brandName: "JobNimbus",
    faviconUrl: "https://webappui.jobnimbus.com/images/favicon.png",
    replacements: [
      { from: /help@vida\.inc/gi, to: "help@automatedphone.ai" },
      { from: /api\.vida\.dev/gi, to: "api.vida.dev" },
      { from: /Vida(\.io)?/gi, to: "JobNimbus" },
    ],
    logoLightUrl: "https://vidapublic.s3.us-east-2.amazonaws.com/jobnimbus-logo.png",
    logoDarkUrl: "https://vidapublic.s3.us-east-2.amazonaws.com/jobnimbus-logo.png",
  },
  {
    match: /^agent\.myproclaim\.com$/,
    brandName: "Proclaim AI",
    replacements: [
      { from: /help@vida\.inc/gi, to: "help@proclaimvoip.com" },
      { from: /api\.vida\.dev/gi, to: "api.automatedphone.ai" },
      { from: /Vida(\.io)?/gi, to: "Proclaim AI" },
    ],
    logoLightUrl: "https://vidapublic.s3.us-east-2.amazonaws.com/proclaimvoip_white.png",
    logoDarkUrl: "https://vidapublic.s3.us-east-2.amazonaws.com/proclaimvoip_white.png",
  },
  {
    match: /(.*\.)?automatedphone\.ai$/,
    brandName: "AutomatedPhone",
    replacements: [
      { from: /help@vida\.inc/gi, to: "help@automatedphone.ai" },
      { from: /api\.vida\.dev/gi, to: "api.automatedphone.ai" },
      { from: /Vida(\.io)?/gi, to: "AutomatedPhone" },
    ],
    logoLightUrl: "https://vidapublic.s3.us-east-2.amazonaws.com/automated-phone-light.png",
    logoDarkUrl: "https://vidapublic.s3.us-east-2.amazonaws.com/automated-phone-dark.png",
  },
  {
    match: /^app\.getvoicebot\.com$/,
    brandName: "VoiceBot",
    replacements: [
      { from: /help@vida\.inc/gi, to: "help@getvoicebot.com" },
      { from: /api\.vida\.dev/gi, to: "api.getvoicebot.com" },
      { from: /Vida(\.io)?/gi, to: "VoiceBot" },
    ],
    logoLightUrl: "https://lirp.cdn-website.com/6c7f9e27/dms3rep/multi/opt/VoiceBot_Header_Logo2-243w.png",
    logoDarkUrl: "https://lirp.cdn-website.com/6c7f9e27/dms3rep/multi/opt/VoiceBot_Header_Logo2-243w.png",
  }  
  // Removed generic fallback to avoid unintended replacements on vida.io
];

// Immediately set a data attribute based on the domain
(function() {
  const hostname = window.location.hostname;
  // Determine if the current domain matches any white-label domain
  const isWhiteLabel = domainConfig.some(config => config.match.test(hostname));
  // Add a data attribute to <html> so CSS can react accordingly
  document.documentElement.setAttribute('data-domain', isWhiteLabel ? 'whitelabel' : 'default');
})();

// Get current domain config based on regex match
const hostname = window.location.hostname;
const currentDomainConfig = domainConfig.find(config => config.match.test(hostname));

// Redirect to vida.io if no domain match
if (!currentDomainConfig && !hostname.includes("vida.io")) {
  console.log("No matching domain found. Redirecting to vida.io/docs with the same path");
  const currentPath = window.location.pathname + window.location.search + window.location.hash;
  window.location.href = "https://vida.io/docs" + currentPath;
}

// Replace text mentions (enhanced handling for code blocks)
function replaceBrandMentions() {
  if (!currentDomainConfig || !currentDomainConfig.replacements) return;

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);

  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.__whitelabeled) continue;

    const isCodeElement =
      node.parentElement && node.parentElement.closest('pre, code, script, style');

    currentDomainConfig.replacements.forEach(({ from, to }) => {
      const allowInCode =
        from.source.includes('api\\.vida\\.dev') || from.source.includes('help@vida\\.inc');

      if (!isCodeElement || allowInCode) {
        node.nodeValue = node.nodeValue.replace(from, to);
      }
    });

    node.__whitelabeled = true;
  }
}


// replace urls
function replaceURLs() {
  if (!currentDomainConfig) return; // Only run on whitelabel domains
  const newDomain = window.location.hostname;
  // Process all anchor tags in the document
  document.querySelectorAll('a').forEach(link => {
    if (link.href && link.href.indexOf('vida.io') !== -1) {
      link.href = link.href.replace(/vida\.io/gi, newDomain);
    }
  });
}

// Replace logo
function replaceLogo() {  
  const logoImgs = document.querySelectorAll('div.flex-1.flex.items-center.gap-x-4 a img');
  logoImgs.forEach(img => {
    let newSrc, newAlt;
    
    // If there's a whitelabel config, use that; otherwise use the default Vida logos.
    if (currentDomainConfig) {
      if (img.alt === 'light logo') {
        newSrc = currentDomainConfig.logoLightUrl;
        newAlt = `${currentDomainConfig.brandName} Logo Light`;
      } else if (img.alt === 'dark logo') {
        newSrc = currentDomainConfig.logoDarkUrl;
        newAlt = `${currentDomainConfig.brandName} Logo Dark`;
      }
    } else {
      if (img.alt === 'light logo') {
        newSrc = 'https://mintlify.s3.us-west-1.amazonaws.com/vida/logos/light.svg';
        newAlt = 'Vida Logo Light';
      } else if (img.alt === 'dark logo') {
        newSrc = 'https://mintlify.s3.us-west-1.amazonaws.com/vida/logos/dark.svg';
        newAlt = 'Vida Logo Dark';
      }
    }

    // Preload the new image before applying it.
    if (newSrc) {
      const preloadedImage = new Image();
      preloadedImage.onload = function() {
        img.src = newSrc;
        img.alt = newAlt;
        // Use inline style with !important to override any CSS hiding the element.
        img.style.setProperty('visibility', 'visible', 'important');
      };
      preloadedImage.src = newSrc;
    }
  });
}

function removeUnwantedNavItems() {
  const sectionHeadersToRemove = [
    "Enablement",
    "Agent Examples",
    "Integrations",
  ];

  const individualItemsToRemove = [
    "Athena Health",
    "Cox Automotive",
    "White-Label Capabilities",
    "Enabling SMS",
    "OpenAI Speech-to-Speech"
  ];

  document.querySelectorAll('h5').forEach(h5 => {
    const title = h5.textContent.trim();
    if (sectionHeadersToRemove.includes(title)) {
      const container = h5.closest('div');
      if (container) container.style.display = 'none';
    }
  });

  document.querySelectorAll('li').forEach(li => {
    const label = li.textContent.trim();
    if (individualItemsToRemove.some(item => label.includes(item))) {
      li.style.display = 'none';
    }
  });
}

function removeUnwantedHeaderLinks() {
  const headerLinkTextsToRemove = [
    "OpenAPI Definition",
    "Examples",
    "Pricing",
    "Login"
  ];

  document.querySelectorAll('nav ul li a').forEach(link => {
    const text = link.textContent.trim();
    if (headerLinkTextsToRemove.includes(text)) {
      const li = link.closest('li');
      if (li) li.style.display = 'none';
    }
  });

  const ctaButton = document.querySelector('#topbar-cta-button');
  if (ctaButton) ctaButton.style.display = 'none';
}

function hideSocialIcons() {
  // Only act when a white-label domain is active
  if (!currentDomainConfig) return;

  // Hide every social-icon link in the footer
  document
    .querySelectorAll('#footer .flex a')
    .forEach(a => { a.style.display = 'none'; });
}

function replaceFavicon() {
  if (!currentDomainConfig || !currentDomainConfig.faviconUrl) return;

  // Remove all existing favicon links
  const selectors = [
    "link[rel='icon']",
    "link[rel='shortcut icon']",
    "link[rel='apple-touch-icon']",
    "link[rel='mask-icon']"
  ];
  selectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => el.remove());
  });

  // Add the new favicon
  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/png';
  link.href = currentDomainConfig.faviconUrl;
  document.head.appendChild(link);

  console.log(`[White-label] Favicon set to ${link.href}`);
}


// Initialize replacements
function initializeWhiteLabel() {
  replaceLogo(); 
  replaceFavicon();
  if (currentDomainConfig) {
    replaceURLs(); // Update URLs to point at the current domain 
    replaceBrandMentions();
    removeUnwantedNavItems();
    removeUnwantedHeaderLinks();
    hideSocialIcons();
    console.log("White-label applied for domain:", currentDomainConfig.brandName);
  }
}

// Function to observe and initialize white-label replacements and Zapier embed
function observeAndInitialize() {
  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach(() => {
      initializeWhiteLabel();
      initializeZapierEmbed();
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

// Wait for DOM load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initializeWhiteLabel();
    observeAndInitialize();
  });
} else {
  initializeWhiteLabel();
  observeAndInitialize();
}

/*
* Vida Style Scripts Locked and Loaded
*/
console.log("Custom vida script loaded!");

function loadCSS(url, callback) {
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  link.onload = callback;
  document.head.appendChild(link);
}

function loadJS(url, callback) {
  var script = document.createElement('script');
  script.src = url;
  script.type = 'text/javascript';
  script.async = true;
  script.onload = callback;
  document.head.appendChild(script);
}

loadJS('https://vida.io/embed/button/v1/script.js', function() {
  console.log("Loaded Vida Widget JS");
});

/*
* Zapier Embed
*/
function initializeZapierEmbed() {
  const container = document.querySelector("#zapier-container");

  if (!container) return;

  if (!container.querySelector("zapier-full-experience")) {
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://cdn.zapier.com/packages/partner-sdk/v0/zapier-elements/zapier-elements.esm.js";
    document.head.appendChild(script);

    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "https://cdn.zapier.com/packages/partner-sdk/v0/zapier-elements/zapier-elements.css";
    document.head.appendChild(stylesheet);

    const element = document.createElement("zapier-full-experience");
    element.clientId = "4ztZwOUy6owmn3O9h3IhW0bs89Elxp45qSkqWGCt";
    element.theme = "light";
    element.appSearchBarDisplay = "show";
    container.appendChild(element);
  }
}
