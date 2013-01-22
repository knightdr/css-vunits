css-vunits (Native viewport units resize)
==========

Viewport relative units. See http://www.w3.org/TR/css3-values/#viewport-relative-lengths. 
These units are dynamic, meaning they change as the device's viewport changes. 
Viewport units can be used with any css properties that accepts a length, so they're not just for ```font-size```.

**NOTE**: Only supports native implementation of viewport units. This forces repaint so units resize as viewport changes.

##Units support
* **vw**: 1vw is 1% of the width of the viewport
* **vh**: 1vh is 1% of the height of the viewport
* **vmin**: Is the smaller of the viewport's width or height
* **vmax**: Not supported as this time

##Examples
```
<script type="text/javascript">
    CSSVUnits.add('p');
</script>
```

If you wish to updated multiple selectors at once, create a comma delimited list as you would in css.

##Polyfill
See master branch for a polyfill version that supports IE <9, Chrome <20, Firefox <19, etc.
