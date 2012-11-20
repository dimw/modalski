# Modalski – jQuery Plugin for Modal Dialogs

Modalski is a powerfull and easy to use jQuery plugin which brings you the possibility to load external content within a modal window inside your web site. Existing pages with data and forms will be processed to fit the dialog. No or only minor changes to the source are necessary. Modalski is designed to handle callbacks and loads external pages via Ajax (no iframes).

With Modalski only the relationship attribute has to be added to the anchors to support dialogs. This does not affect the fallback behaviour for browser with deactivated Javascript.


## Installation

The installation of Modalski is very simple. Copy the [modalski](https://github.com/dimw/modalski/tree/master/modalski) folder to your project and bind jQuery followed by the CSS and Javascript files of Modalski in the header of your webpage.

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
<!-- Binding Modalski CSS and JS -->
<link rel="stylesheet" type="text/css" href="modalski/css/modalski.css" />
<script src="modalski/js/modalski.js"></script>
```

The plugin will be initialized on load and will add the modal feature to all anchors on the page containing the ``rel="modal"`` attribute.


## Usage

### Basic Dialog
To create simple dialog window from the content of a page simple add the ``rel="modal"`` attribute to the achor.

```html
<a href="html/simple_modal.html" rel="modal">Open Dialog</a>
```

### Dialog Window Size

To make the dialog window smaller or larger use the data-window-width and data-window-height data attributes. Default window size can be inflienced by adjusting the ``.modalski.window`` class (see *Customization*).

```html
<a href="html/simple_modal.html" rel="modal" data-window-width="600" data-window-height="400">Open dialog</a>
```    

### Integration of a Footer with a Button
A footer class should be used to highlight the possible dialog actions. All buttons with the ``reset`` type will be automatically force the dialog window close on hit.

```html
<div class="footer">
	<button type="reset">Close</button>
</div>
```

### Modal Dialog

Sometimes it is necessary to open a dialog window that can not be closed by hitting outside or pushing ESC. In this case the attribute ``data-modal="true"`` could be useful.

```html
<a href="html/simple_form.html" rel="modal" data-modal="true">Open dialog</a>
```

### Callbacks

In case you are using a form within your modal window it is quite easy to get the submitted data back to the parent document. The function defined in the ``data-callback`` argument will be executed in the case the form was properly submitted. Within the function the parameter ``data`` can be used to access the submitted fields.

```html
<a href="html/simple_form.html" rel="modal" data-callback="alert('Hello '+data['name']+'!');">Open dialog</a>
```

## API

The plugin provides several functions to trigger a certain behaviour using Javascript from the web page or from the dialog itself.

## Show Dialog

Use ``Modalski.show(href, data)`` to open a new dialog. ``href`` should be the linkt to the page to load. ``data`` should be an array with parameter list.

```html
<a href="javascript:Modalski.show('http://www.google.com', {windowWidth: 800})">Close</a>
```

### Close Dialog

An alternative way to close the dialog is to use the global function ``Modalski.close()``.

```html  
<a href="javascript:Modalski.close()">Close</a>
```

For delayed close use ``Modalski.closeDelayed(ms)`` where ``ms`` is waiting time in milliseconds.

```html
<a href="javascript:Modalski.closeDelayed(5000)">Close</a>
```

### Configure the Proxy

In case the defined anchor link should be changed during the dialog creation process, ``Modalski.actionProxy`` function has to be refedined. E.g. for loading a minimized version of the page you should call the following code once:

```js
Modalski.actionProxy = function (url) { 
	url+= '?min=true';
};
```

### Recreate Relations

The following function should be called if a page was changed after the plugin was loaded.

```js
Modalski.updateRel();
```

## Customization

Changes to colours, default dialog size, fonts etc. can be made by adjusting particular values in [modalski.css](modalski/tree/master/modalski/css/modalski.css).


## Questions

If you have any questions, please feel free to ask here.