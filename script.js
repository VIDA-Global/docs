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
    replaceText: /Vida(\.io)?/gi,
    logoLightUrl: "https://vidapublic.s3.us-east-2.amazonaws.com/custom_profile_dp_alianza.jpg",
    logoDarkUrl: "https://vidapublic.s3.us-east-2.amazonaws.com/custom_profile_dp_alianza.jpg",
  },
  {
    match: /(.*\.)?automatedphone\.ai$/,
    brandName: "Automated Phone",
    replaceText: /Vida(\.io)?/gi,
    logoLightUrl: "https://vidapublic.s3.us-east-2.amazonaws.com/custom_profile_dp_alianza.jpg",
    logoDarkUrl: "https://vidapublic.s3.us-east-2.amazonaws.com/custom_profile_dp_alianza.jpg",
  },
  {
    match: /.*/,
    brandName: "Generic Brand",
    replaceText: /Vida(\.io)?/gi,
    logoLightUrl: "https://vidapublic.s3.us-east-2.amazonaws.com/custom_profile_dp_alianza.jpg",
    logoDarkUrl: "https://vidapublic.s3.us-east-2.amazonaws.com/custom_profile_dp_alianza.jpg",
  }
];

// Get current domain config based on regex match
const hostname = window.location.hostname;
const currentDomainConfig = domainConfig.find(config => config.match.test(hostname));

// Replace text mentions
function replaceBrandMentions() {
  if (!currentDomainConfig) return;

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);

  while (walker.nextNode()) {
    walker.currentNode.nodeValue = walker.currentNode.nodeValue.replace(currentDomainConfig.replaceText, currentDomainConfig.brandName);
  }

  console.log("Brand mentions replaced with:", currentDomainConfig.brandName);
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

  console.log("Logos replaced for domain:", hostname);
}

// Initialize replacements
function initializeWhiteLabel() {
  if (currentDomainConfig) {
    replaceBrandMentions();
    replaceLogo();
  }
}

// Wait for DOM load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeWhiteLabel);
} else {
  initializeWhiteLabel();
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

// Usage

/*
loadCSS('https://vidapublic.s3.us-east-2.amazonaws.com/vida-webrtc-widget/index.css', function() {
	console.log("Loaded Vida Widget CSS")
    loadJS('https://vidapublic.s3.us-east-2.amazonaws.com/vida-webrtc-widget/index.js', function() {
    	console.log("Loaded Vida Widget JS")
    });
});
*/
loadJS('https://vida.io/embed/button/v1/script.js', function() {
    console.log("Loaded Vida Widget JS")
});

/*
* Zapier Embed
*/

function initializeZapierEmbed() {
    const container = document.querySelector("#zapier-container");

    if (container === null) {
        console.log("Zapier element does not exist.");
    } else {
        // Check if zapier-full-experience is already appended
        if (!container.querySelector("zapier-full-experience")) {
            console.log("Zapier element exists and will be initialized.");
            
            // Load JS
            const script = document.createElement("script");
            script.type = "module";
            script.src = "https://cdn.zapier.com/packages/partner-sdk/v0/zapier-elements/zapier-elements.esm.js";
            document.head.appendChild(script);

            // Load CSS
            const stylesheet = document.createElement("link");
            stylesheet.rel = "stylesheet";
            stylesheet.href = "https://cdn.zapier.com/packages/partner-sdk/v0/zapier-elements/zapier-elements.css";
            document.head.appendChild(stylesheet);

            // Create and display zapier-full-experience
            const element = document.createElement("zapier-full-experience");
            // element.signUpEmail = "email_of_your_user@example.com";
            // element.signUpFirstName = "first_name_of_your_user";
            // element.signUpLastName = "last_name_of_your_user";
            element.clientId = "4ztZwOUy6owmn3O9h3IhW0bs89Elxp45qSkqWGCt";
            element.theme = "light";
            element.appSearchBarDisplay = "show";
            console.log("Appending Zapier element.")
            container.appendChild(element);
        } else {
            console.log("Zapier embed already initialized.");
        }
    }
}

// Function to observe and initialize the Zapier embed
function observeAndInitialize() {
    const observer = new MutationObserver((mutationsList, observer) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                // Check if the zapier-container element has been added
                if (document.querySelector("#zapier-container")) {
                    console.log("Initializing Zapier via observer.")
                    initializeZapierEmbed();
                    break;
                }
            }
        }
    });

    // Start observing the document body for childList changes
    observer.observe(document.body, { childList: true, subtree: true });
}

// Observe changes for dynamic navigation
observeAndInitialize();
