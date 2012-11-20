/**
 * Modalski - jQuery Plugin for Modal Dialogs
 * @author 2011 CC-BY dimw
 * @since 2011-08-08
 */

var Modalski = {
	element :	{
		mask 	: undefined,
		window	: undefined
	},
	preventClose : false,
	data : undefined,
	actionProxy : function(url){ return url; }
};


Modalski.init = function(){
	$('body').append('<div class="modalski window"></div><div class="modalski mask"></div>');
	
	Modalski.element.mask 	= $('.modalski.mask');
	Modalski.element.window	= $('.modalski.window');
	
	$(document).keyup(function(e) {
    	if(e.keyCode == 27 && !Modalski.preventClose)
    			Modalski.close();
	});
	
	Modalski.element.mask.click(function(){
		if(!Modalski.preventClose)
			Modalski.close();
	});   
	
};


/**
 * Create blang dialog window and fill it with content
 */
Modalski.update = function(data) {
	
	var winH = $(window).height();
    var winW = $(window).width();
	
	if(data==undefined) {
		Modalski.preventClose = false;
		Modalski.element.window.html('');
		Modalski.element.window.addClass('loading');
	} else {
		//preventClose = true;
		Modalski.element.window.removeClass('loading');
		Modalski.element.window.html(data);

		// fix sizing
		if(Modalski.data['windowWidth']!=undefined) {
			Modalski.element.window.width(Math.min(Modalski.data['windowWidth'], winW));
		} else {
			Modalski.element.window.width('auto');
		}
		
		if(Modalski.data['windowHeight']!=undefined) {
	    	Modalski.element.window.height(Math.min(Modalski.data['windowHeight'], winH));
		} else {
			Modalski.element.window.height('auto');
		}
		
		if(Modalski.data['modal']!=undefined) {
			Modalski.preventClose = Modalski.data['modal'];
		}
		
	}
    
    // center dialog
    Modalski.element.window.css('top',  winH/2-Modalski.element.window.height()/2);
    Modalski.element.window.css('left', winW/2-Modalski.element.window.width()/2);
    
    // fix reset button
    $(Modalski.element.window).find('button[type=reset]').click(function() {
    	Modalski.close();
    });
    
    // fix submit button
    $(Modalski.element.window).find('form').bind('submit', function(e){
    	var form = $(this);
    	var action = form.attr('action');
    	if(action != undefined && action != ""){
    		form.find('button[type=submit]').prop('disabled', true).removeClass('ok').addClass('busy');
    		action = Modalski.actionProxy(action);
    		$.post(action, form.serializeArray(), function(data){
    			Modalski.update(data);
    		});
    	} else {
    		Modalski.close(form.serializeJSON());
    	}
    	return false;
    });    
};


/**
 * Show the window
 * @param href Page to load
 * @param data Modal configuration
 */
Modalski.show = function(href, data){
	Modalski.data = data;
	$.extend();
	
	Modalski.element.mask.fadeTo("fast", 0.6);  
	Modalski.element.window.fadeIn("fast");
	
    Modalski.update();
    
    var hrefNew = Modalski.actionProxy(href);
    $.get(hrefNew, function(pageContent){
		Modalski.update(pageContent);
    });
};


Modalski.close = function(formData){	
	if(formData!=undefined && Modalski.data != undefined && Modalski.data['callback']){
		try{
			var fn = new Function('data', Modalski.data['callback']);
			fn(formData);
		} catch(e){
			console.log(e);
		}
	}

	Modalski.element.mask.fadeOut("fast");
	Modalski.element.window.fadeOut("fast");
	Modalski.data = undefined;
};

Modalski.closeDelayed = function(delay, formData){
	 setTimeout(function(){
         Modalski.close(formData);
     }, delay);  
};

Modalski.updateRel = function(){
	$('a[rel=modal]').unbind('click').bind('click',function(e) {
		 e.preventDefault();
		 var href = $(this).attr('href');
		 Modalski.show(href, $(this).data());
	});
};

Modalski.slient = function(url, what, where) {
	$.get(url, function(data){
		var content = $(data).find(what).html();
		if(content != "")
			$(where).html(content);
	});
};

/* Modalski autobind */
$(document).ready(function() {
	Modalski.init();
	Modalski.updateRel();
});


/* Adding JSON serialization ability to jQuery */
(function( $ ){
	$.fn.serializeJSON=function() {
		var json = {};
		jQuery.map($(this).serializeArray(), function(n, i){
			json[n['name']] = n['value'];
		});
		return json;
	};
})( jQuery );

