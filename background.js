// listening for an event / one-time requests
// coming from the popup
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    route(request.type);
    return true;
});


if (!localStorage["scrollPos"]){
	localStorage["scrollPos"] = 0;
}

var ws = null;
var connected = false;

// var serverUrl;
// var connectionStatus;
// var sendMessage;


//route requests from buttons and WS
var route = function(inc) {
    switch(inc) {
    case "color-divs":
        colorDivs();
    break;
    case "refresh-page":
        refreshPage();
    break;
    case "scroll-to-top":
    	scrollToTop();
    break;
    case "scroll-up":
    	scrollUp();
    break;
    case "scroll-down":
    	scrollDown();
    break;
    case "connect":
    	openCon();
    break;
    case "disconnect":
    	closeCon();
    break;
    case "send-msg":
    	sendMsg();
    break;
    case "no-command":
    break;
	}
}

// send a message to the content script
var colorDivs = function() {
	chrome.tabs.getSelected(null, function(tab){
	    chrome.tabs.sendMessage(tab.id, {type: "colors-div", color: "#F00"});
	    // setting a badge
		chrome.browserAction.setBadgeText({text: "red!"});
	});
}

var refreshPage = function(){
	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.reload(tab.id);
	});
}

var scrollToTop = function(){
	chrome.tabs.getSelected(null, function(tab) {
		localStorage["scrollPos"] = 0;
		var numString = localStorage["scrollPos"].toString();
		chrome.tabs.sendMessage(tab.id, {type: "scroll-down", pos: numString, speed : "1000"});
		chrome.browserAction.setBadgeText({text: numString})
	});
}

var scrollUp = function(){
	chrome.tabs.getSelected(null, function(tab){
		if (localStorage["scrollPos"] > 0 )
			localStorage["scrollPos"] = parseInt(localStorage["scrollPos"]) - 1;
		var numString = localStorage["scrollPos"].toString();
		chrome.tabs.sendMessage(tab.id, {type: "scroll-down", pos: numString, speed : "400"});
		chrome.browserAction.setBadgeText({text: numString});
	});
}

var scrollDown = function(){
	chrome.tabs.getSelected(null, function(tab){
		if (localStorage["scrollPos"] < 20 )
			localStorage["scrollPos"]++;
		var numString = localStorage["scrollPos"].toString();
		chrome.tabs.sendMessage(tab.id, {type: "scroll-down", pos: numString, speed : "400"});
		chrome.browserAction.setBadgeText({text: numString});
	});
}

var closeCon = function() {
	if (ws) {
		// console.log('CLOSING ...');
		ws.close();
	}
	connected = false;
	// connectionStatus.text('CLOSED');

	// serverUrl.removeAttr('disabled');
}

var openCon = function() {
	closeCon();
	var url = "ws://localhost:9002";
	ws = new WebSocket(url);
	ws.onopen = onOpen;
	ws.onclose = onClose;
	ws.onmessage = onMessage;
	ws.onerror = onError;

	// connectionStatus.text('OPENING ...');
}

var sendMsg = function(){
	var msg = "refresh-page";
	ws.send(msg);
}

var onOpen = function() {
	chrome.browserAction.setBadgeText("open");
	connected = true;
};

var onClose = function() {
	ws = null;
};

var onMessage = function(event) {
	var data = event.data;
	route(data);
};

var onError = function(event) {
	alert(event.data);
}



