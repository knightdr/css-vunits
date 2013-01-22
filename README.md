css-vunits
==========

Viewport relative units. See http://www.w3.org/TR/css3-values/#viewport-relative-lengths. 
These units are dynamic, meaning they change as the device's viewport changes. 
Viewport units can be used with any css properties that accepts a length, so they're not just for ```font-size```. 

##Units support
* **vw**: 1vw is 1% of the width of the viewport
* **vh**: 1vh is 1% of the height of the viewport
* **vmin**: Is the smaller of the viewport's width or height
* **vmax**: Is the larger of the viewport's width or height

##Native support

Few browsers support viewport units at the moment and those that do differ from the spec when it comes to resizing and ```vmax``` support. See http://caniuse.com/viewport-units

##Examples
```
<script type="text/javascript">
    CSSVUnits.add({
        selector    : 'p',
        style       : {
            "margin"    : "10vh auto",
            "min-width" : "40vw",
            "max-width" : "960px",
            "font-size" : "3vmax",
        }
    });
</script>
```
