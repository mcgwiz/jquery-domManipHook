jquery-domManipHook
===================

Simple facility to execute code on any HTML fragment attached to the DOM with jQuery *2.1.4 and earlier*. Specifically, this is useful in codebases where WebComponents-style "custom tags" exist, and need to be initialized when attached to the DOM. For example, if we are using [jQuery.friendlyTime](https://github.com/blocvox/jquery-friendlyTime) to create a custom Date tag, and we have a template that generates its HTML, we can use jquery.domManipHook to automagically initialize the Date tag whenever it's attached to the DOM.

```html
<html>
<head>
  <title>Demo</title>
  <script src="jquery.js"></script>
  <script src="jquery.friendlyTime.js"></script>
  <script src="jquery.domManipHook.js"></script>
  <script type="text/javascript">
    // Register our hook.
    $.fn.domManip.hooks.push(function(el, $el) { $el.parent().find('.date').friendlyTime(); });  
  </script>
</head>
<body>
  <!-- stuff -->
  <script type="text/javascript">
    // Attach an HTML fragment. Our hook will automatically run against it.
    $('body').append('<span class="date" data-time="' + new Date().toISOString() + '">');
  </script>
</body>
</html>
```

jQuery.domManipHook also supports AMD. See `demo.html` for an example.
