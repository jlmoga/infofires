

// function to execute other code AFTER the deviceready event
function isDeviceReady(action) {
	if (window.deviceReady === true) {
		var connection = checkConnection();
		switch (action) {
		case "toastReady":
			break;
		case "action2":
			// code
			break;
		case "action3":
			// code
			break;
		}
	} else {
		window.setTimeout("isDeviceReady(\"" + action + "\");", 100);
	}
}


// reset panel states
function resetPanelState() {
	window.localStorage.setItem('panelLeft', 'closed');
	window.localStorage.setItem('panelRight', 'closed');
}


// show title icon with the dashes more to the left
function panelMenuLeftOpened(holo) {
	if (window.localStorage.getItem("pageNaveType") === "menu") {
		$("#btnMenu" + window.localStorage.getItem("divIdGlobal")).attr("src", "images/icons/ic_launcher_full_menu_opened" + holo + ".png");
	}
}

// show title icon with the dashes more to the right
function panelMenuLeftClosed(holo) {
	if (window.localStorage.getItem("pageNaveType") === "menu") {
		$("#btnMenu" + window.localStorage.getItem("divIdGlobal")).attr("src", "images/icons/ic_launcher_full_menu" + holo + ".png");
	}
}



// assign click events to elements
function htmlClickEventHandlers(id, action) {
	/** use action "menu" when using app icon as side panel (#panelMenu...)
	*	use action "back" when using app icon as back
	*/
	// every page
	$('#btnMenu' + id).off("click").on("click",
		function (e) {
			if (e) { e.preventDefault(); }
			if (action !== "back") {
				togglePanel('#panelMenu' + id);
			} else {
				window.history.back();
			}
		});
	$('#btnOptions' + id).off("click").on("click",
		function (e) {
			if (e) { e.preventDefault(); }
			togglePanel('#panelOptions' + id);
		});
	// specific page...
	if (id === "Index") {
		$('#clearFirstBoot').off("click").on("click",
			function (e) {
				if (e) { e.preventDefault(); }
				clearFirstBoot();
			});
	} else if (id === "Second") {
		// do nothing
	} else if (id === "Third") {
		// do nothing
	} else if (id === "Service") {
		initServiceSettings();
	}
	// every page but...
	if (id !== "Third") {
	}
}


// initialize page variables and elements on create
function initPageVarsOnCreate(id) {
	if (id === "Index") {
		htmlClickEventHandlers(id, "menu");
	} else {
		htmlClickEventHandlers(id, "back");
	}
	// specific page...
	if (id === "Index") {
		//isDeviceReady("toastReady");
	} else if (id === "Second") {
		//toast('Holo Dark example', 'short');
	} else if (id === "Third") {
		//toast('Holo Light example', 'short');
	} else if (id === "Service") {
		// do nothing
	}
}


// initialize page variables on beforeshow
function initPageVarsOnShow(id) {
	// every page...
	resetPanelState();
	window.localStorage.setItem("divIdGlobal", id);

	panelMenu(id);
	panelMenuRight(id);
	panelHandling("");

	if (id === "Index") {
		pressEffectHeader(true, "menu", "");		
	} else {
		pressEffectHeader(true, "back", "_light");
	}

	
	// specific page...
	if (id === "Index") {
		//pressEffectFooter(true, true, "");
	} else if (id === "Cerca") {
		//pressEffectFooter(true, true, "");
		//getSystemSpecs();
	}
}





// default left panelmenu (define menu for all pages)
function panelMenu(divId) {
	var panel = '#panelMenu' + divId + 'UL';
	$(panel).children().remove('li');

	switch (divId) {
		case "Index":
			$(panel).append('<li data-icon="false" class="headerSpace"><p>&nbsp;</p></li>'); // empty space, needed for header
			$(panel).append('<li data-icon="false"><a class="panelText" href="#cercaPage"><img src="./images/icons/ic_action_search.png" class="ui-li-icon largerIcon">cerca</a></li>');
			break;
		case "Cerca":
			$(panel).append('<li data-icon="false" class="headerSpace"><p>&nbsp;</p></li>'); // empty space, needed for header
			$(panel).append('<li data-icon="false"><a class="panelText" href="#indexPage"><img src="./images/icons/ic_action_home.png" class="ui-li-icon largerIcon">home</a></li>');
			break;
	}
	$(panel).listview('refresh');
}

// default right panelmenu (define menu for all pages)
function panelMenuRight(divId) {
	var panel = '#panelMenuOptions' + divId + 'UL';
	$(panel).children().remove('li');
	$(panel).append('<li data-icon="false" class="headerSpace"><p>&nbsp;</p></li>'); // empty space, needed for header
	$(panel).append('<li data-icon="false"><a class="panelText" onclick="appstore(\'org.teusink.droidpapers\', \'app\')"><img src="./images/icons/ic_action_mitjavida.png" class="ui-li-icon largerIcon">mitjavida</a></li>');
	$(panel).append('<li data-icon="false"><a class="panelText" onclick="appstore(\'org.teusink.droidpapers\', \'app\')"><img src="./images/icons/ic_action_information.png" class="ui-li-icon largerIcon">ajuda</a></li>');
	$(panel).listview('refresh');
}

// panel open and closed handling
function panelHandling(holo) {
	$("#panelMenu" + window.localStorage.getItem("divIdGlobal")).panel({
		open: function (e, ui) {
			if (e) { e.preventDefault(); }
			window.localStorage.setItem("panelLeft", 'open');
			panelMenuLeftOpened(holo);
		}
	});
	$("#panelMenu" + window.localStorage.getItem("divIdGlobal")).panel({
		close: function (e, ui) {
			if (e) { e.preventDefault(); }
			window.localStorage.setItem("panelLeft", 'closed');
			panelMenuLeftClosed(holo);
		}
	});
	$("#panelOptionsRight" + window.localStorage.getItem("divIdGlobal")).panel({
		open: function (e, ui) {
			if (e) { e.preventDefault(); }
			window.localStorage.setItem("panelRight", 'open');
		}
	});
	$("#panelOptionsRight" + window.localStorage.getItem("divIdGlobal")).panel({
		close: function (e, ui) {
			if (e) { e.preventDefault(); }
			window.localStorage.setItem("panelRight", 'closed');
		}
	});
}




// press effect in header bar
function pressEffectHeader(share, action, holo) {
	/** use action "menu" when using app icon as side panel (#panelMenu...)
	*	use action "back" when using app icon as back
	*	use holo "" when using dark action bar
	*	use holo "_light" when using light action bar
	*/
	window.localStorage.setItem("pageNaveType", action);
	// restore icons
	if (action === "menu") {
		$("#btnMenu" + window.localStorage.getItem("divIdGlobal")).attr("src", "images/icons/ic_launcher_full_menu" + holo + ".png");
		// detect swiperight to open left panel upon swiperight
		$(document).off('swiperight').on('swiperight', "#" + $.mobile.activePage.attr("id"), function (e) {
			if (e) { e.preventDefault(); }
			// check if there are no open panels, otherwise ignore swipe
			if (window.localStorage.getItem('panelLeft') !== "open" && window.localStorage.getItem('panelRight') !== "open") {
				togglePanel('#panelMenu' + window.localStorage.getItem("divIdGlobal"));
			}
		});
	} else {
		// remove swipe event, because there is no page visible with a panelmenu
		$(document).off('swiperight');
	}
	
	// header title press effect (left panel)
	$(document).on('vmousedown', "#btnMenu" + window.localStorage.getItem("divIdGlobal"), function (e) {
		if (e) { e.preventDefault(); }
		if (action !== "back") {
			if (window.localStorage.getItem('panelLeft') !== 'open') {
				$("#btnMenu" + window.localStorage.getItem("divIdGlobal")).attr("src", "images/icons/ic_launcher_full_menu_selected" + holo + ".png");
			} else {
				$("#btnMenu" + window.localStorage.getItem("divIdGlobal")).attr("src", "images/icons/ic_launcher_full_menu_selected_opened" + holo + ".png");
			}
		} else {
			$("#btnMenu" + window.localStorage.getItem("divIdGlobal")).attr("src", "images/icons/ic_launcher_full_arrow_selected" + holo + ".png");
		}
	});
	$(document).on('vmouseup', "#btnMenu" + window.localStorage.getItem("divIdGlobal"), function (e) {
		if (e) { e.preventDefault(); }
		if (action !== "back") {
			if (window.localStorage.getItem('panelLeft') !== 'open') {
				$("#btnMenu" + window.localStorage.getItem("divIdGlobal")).attr("src", "images/icons/ic_launcher_full_menu" + holo + ".png");
			} else {
				$("#btnMenu" + window.localStorage.getItem("divIdGlobal")).attr("src", "images/icons/ic_launcher_full_menu_opened" + holo + ".png");
			}
		} else {
			$("#btnMenu" + window.localStorage.getItem("divIdGlobal")).attr("src", "images/icons/ic_launcher_full_arrow" + holo + ".png");
		}
	});
	// overflow title press effect (right panel)
	$(document).on('vmousedown', "#btnOptions" + window.localStorage.getItem("divIdGlobal"), function (e) {
		if (e) { e.preventDefault(); }
		$("#btnOptions" + window.localStorage.getItem("divIdGlobal")).attr("src", "images/icons/ic_action_overflow_selected_header" + holo + ".png");
	});
	$(document).on('vmouseup', "#btnOptions" + window.localStorage.getItem("divIdGlobal"), function (e) {
		if (e) { e.preventDefault(); }
		$("#btnOptions" + window.localStorage.getItem("divIdGlobal")).attr("src", "images/icons/ic_action_overflow_header" + holo + ".png");
	});
	// share press effect
	if (share === true) {
		$(document).on('vmousedown', "#headerShare" + window.localStorage.getItem("divIdGlobal"), function (e) {
			if (e) { e.preventDefault(); }
			$("#headerShare" + window.localStorage.getItem("divIdGlobal")).attr("src", "images/icons/ic_action_share_selected_header" + holo + ".png");
		});
		$(document).on('vmouseup', "#headerShare" + window.localStorage.getItem("divIdGlobal"), function (e) {
			if (e) { e.preventDefault(); }
			$("#headerShare" + window.localStorage.getItem("divIdGlobal")).attr("src", "images/icons/ic_action_share_header" + holo + ".png");
		});
	}
}




// #indexPage
$(document).on('pagebeforeshow', '#indexPage', function (e) {
	if (e) { e.preventDefault(); }
	initPageVarsOnShow('Index');
});
$(document).on('pagecreate', '#indexPage', function (e) {
	if (e) { e.preventDefault(); }
	initPageVarsOnCreate('Index');
});

// #cercaPage
$(document).on('pagebeforeshow', '#cercaPage', function (e) {
	if (e) { e.preventDefault(); }
	initPageVarsOnShow('Cerca');
});
$(document).on('pagecreate', '#cercaPage', function (e) {
	if (e) { e.preventDefault(); }
	initPageVarsOnCreate('Cerca');
});


// toggle panel menu (open/close)
function togglePanel(panel) {
	$(panel).panel("toggle");
}
