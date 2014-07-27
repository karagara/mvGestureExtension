 window.onload = function() {
	document.getElementById("button").onclick = function() {
		chrome.extension.sendMessage({
	        type: "color-divs"
	    });
	}
	document.getElementById("rButton").onclick = function() {
		chrome.extension.sendMessage({
	        type: "refresh-page"
	    });
	}
	document.getElementById("tButton").onclick = function() {
		chrome.extension.sendMessage({
	        type: "scroll-to-top"
	    });
	}
	document.getElementById("dButton").onclick = function() {
		chrome.extension.sendMessage({
	        type: "scroll-down"
	    });
	}
	document.getElementById("cButton").onclick = function() {
		chrome.extension.sendMessage({
	        type: "connect"
	    });
	}
	document.getElementById("disButton").onclick = function() {
		chrome.extension.sendMessage({
	        type: "disconnect"
	    });
	}
	document.getElementById("sButton").onclick = function() {
		chrome.extension.sendMessage({
	        type: "send-msg"
	    });
	}
	document.getElementById("uButton").onclick = function() {
		chrome.extension.sendMessage({
	        type: "scroll-up"
	    });
	}
}