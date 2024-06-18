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
const container = document.querySelector("#zapier-container");

if (container === null) {
    console.log("Zapier element does not exist.");
} else {
    console.log("Zapier element exists.");
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
    //element.signUpEmail = "email_of_your_user@example.com";
    //element.signUpFirstName = "first_name_of_your_user";
    //element.signUpLastName = "last_name_of_your_user";
    element.clientId = "4ztZwOUy6owmn3O9h3IhW0bs89Elxp45qSkqWGCt";
    element.theme = "light";
    element.appSearchBarDisplay = "show";
    container.appendChild(element);    
}