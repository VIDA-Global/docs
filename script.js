/*
* Vida White-label Customization Script
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
    match: /(.*\.)?automatedphone\.ai$/,
    brandName: "AutomatedPhone",
    replacements: [
        { from: /help@vida\.inc/gi, to: "help@automatedphone.ai" },
        { from: /api\.vida\.dev/gi, to: "api.automatedphone.ai" },
        { from: /Vida(\.io)?/gi, to: "AutomatedPhone" },
    ],
    logoLightUrl: "https://vidapublic.s3.us-east-2.amazonaws.com/automated-phone-light.png",
    logoDarkUrl: "https://vidapublic.s3.us-east-2.amazonaws.com/automated-phone-dark.png",
  }
  // Removed generic fallback to avoid unintended replacements on vida.io
];

// Get current domain config based on regex match
const hostname = window.location.hostname;
const currentDomainConfig = domainConfig.find(config => config.match.test(hostname));

// Replace text mentions (preventing infinite loops and unintended skips)
function replaceBrandMentions() {
  if (!currentDomainConfig || !currentDomainConfig.replacements) return;

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);

  while (walker.nextNode()) {
    const node = walker.currentNode;

    if (node.__whitelabeled) continue;

    const isCodeElement = node.parentElement.closest('pre, code, script, style');

    currentDomainConfig.replacements.forEach(({from, to}) => {
      const allowInCode = /api\.vida\.dev|help@vida\.inc/i.test(from.source);

      if (!isCodeElement || allowInCode) {
        // Use a fresh regex to avoid internal state issues
        node.nodeValue = node.nodeValue.replace(new RegExp(from.source, from.flags), to);
      }
    });

    node.__whitelabeled = true;
  }
}


// Replace logo
function replaceLogo() {
  if (!currentDomainConfig) return;

  const logoImgs = document.querySelectorAll('div.flex-1.flex.items-center.gap-x-4 a img');
  logoImgs.forEach(img => {
    if (img.alt === 'light logo') {
      img.src = currentDomainConfig.logoLightUrl;
      img.alt = `${currentDomainConfig.brandName} Logo Light`;
    } else if (img.alt === 'dark logo') {
      img.src = currentDomainConfig.logoDarkUrl;
      img.alt = `${currentDomainConfig.brandName} Logo Dark`;
    }
  });
}

// Initialize replacements
function initializeWhiteLabel() {
  if (currentDomainConfig) {
    replaceBrandMentions();
    replaceLogo();
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
console.log("Custom vida script loaded!")

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
    console.log("Loaded Vida Widget JS")
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