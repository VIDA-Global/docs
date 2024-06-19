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

loadCSS('https://vidapublic.s3.us-east-2.amazonaws.com/vida-webrtc-widget/index.css', function() {
	console.log("Loaded Vida Widget CSS")
    loadJS('https://vidapublic.s3.us-east-2.amazonaws.com/vida-webrtc-widget/index.js', function() {
    	console.log("Loaded Vida Widget JS")
    });
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
            setTimeout(function() {
                console.log("Appending Zapier element after delay.")
                container.appendChild(element);
            }, 500);
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
                    // Once the element is found and initialized, disconnect the observer
                    observer.disconnect();
                    break;
                }
            }
        }
    });

    // Start observing the document body for childList changes
    observer.observe(document.body, { childList: true, subtree: true });
}

// Initialize on initial load
setTimeout(function() {
    console.log("Initializing Zapier after delay.")
    initializeZapierEmbed();
}, 500);

// Observe changes for dynamic navigation
observeAndInitialize();
