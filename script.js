/*
* Vida White-label Customization Script
*/

window.dataLayer = window.dataLayer || [];
console.log("Custom white-label script loaded!");

// Define domain-specific rules
const domainConfig = [
  {
    match: /^vidadev\.lylepratt\.com$/,
    brandName: "Vida Dev",
    replacements: [
      { from: /Vida(\.io)?/gi, to: "Vida Dev" }
    ],
    logoLightUrl: "https://vidapublic.s3.us-east-2.amazonaws.com/custom_profile_dp_alianza.jpg",
    logoDarkUrl: "https://vidapublic.s3.us-east-2.amazonaws.com/custom_profile_dp_alianza.jpg",
  },
  {
    match: /(.*\.)?automatedphone\.ai$/,
    brandName: "Automated Phone",
    replacements: [
      { from: /Vida(\.io)?/gi, to: "Automated Phone" }
    ],
    logoLightUrl: "https://vidapublic.s3.us-east-2.amazonaws.com/custom_profile_dp_alianza.jpg",
    logoDarkUrl: "https://vidapublic.s3.us-east-2.amazonaws.com/custom_profile_dp_alianza.jpg",
  },
  {
    match: /.*/,
    brandName: "Generic Brand",
    replacements: [
      { from: /Vida(\.io)?/gi, to: "Generic Brand" }
    ],
    logoLightUrl: "https://vidapublic.s3.us-east-2.amazonaws.com/custom_profile_dp_alianza.jpg",
    logoDarkUrl: "https://vidapublic.s3.us-east-2.amazonaws.com/custom_profile_dp_alianza.jpg",
  }
];

// Get current domain config based on regex match
const hostname = window.location.hostname;
const currentDomainConfig = domainConfig.find(config => config.match.test(hostname));

// Replace text mentions
function replaceBrandMentions() {
  if (!currentDomainConfig || !currentDomainConfig.replacements) return;

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);

  while (walker.nextNode()) {
    currentDomainConfig.replacements.forEach(({from, to}) => {
      walker.currentNode.nodeValue = walker.currentNode.nodeValue.replace(from, to);
    });
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
window.dataLayer = window.dataLayer || [];
console.log("Custom vida script loaded!")

/* Load Vida Widget Script and CSS for Demos */
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

  if (container === null) {
    return;
  }

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

// Observe changes for dynamic navigation and white-labeling
observeAndInitialize();
