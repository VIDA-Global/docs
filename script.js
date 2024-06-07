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
