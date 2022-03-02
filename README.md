# winamp-gamma
learning of winamp changing it skin color


References:
* http://forums.winamp.com/showpost.php?p=999630&postcount=5
    ```
    intGammaRed = (intRed - 128) * 32
    intGammaGreen = (intGreen - 128) * 32
    intGammaBlue = (intBlue - 128) * 32

    intRed   = Int((intGammaRed / 32) + 128)
    intGreen = Int((intGammaGreen / 32) + 128)
    intBlue  = Int((intGammaBlue / 32) + 128)```

* https://vanseodesign.com/web-design/svg-filter-primitives-fecomponenttransfer/
* https://tympanus.net/codrops/2019/02/05/svg-filter-effects-duotone-images-with-fecomponenttransfer/
* https://www.dynamsoft.com/codepool/image-processing-opencv-gamma-correction.html
* https://webplatform.github.io/docs/svg/elements/feComponentTransfer/
* https://css-tricks.com/using-svg-to-create-a-duotone-image-effect/

* https://ithelp.ithome.com.tw/articles/10160563?sc=rss.iron
    The formula of linear is: C' = slope * C + intercept ) 
    The formula of gamma is: C' = amplitude * pow(C, exponent) + offset, 
    so it has three parameters: amplitude, exponent, offset.

* https://www.w3.org/TR/2002/CR-SVG11-20020430/filters.html#feComponentTransferTypeAttribute
    The attributes below apply to sub-elements 'feFuncR', 'feFuncG', 'feFuncB' and 'feFuncA' define the transfer functions.
    Attribute definitions:
        type = "identity | table | discrete | linear | gamma"    

* https://chowdera.com/2021/09/20210930161004274t.html
    Electron app with irregular shape
* https://livebook.manning.com/concept/electron/frameless-app
    Draggable rounded corner Electron app
* https://www.youtube.com/watch?v=wiblQhPqXdY&t=539s
    Draggable div element Electron app

* https://pawelporwisz.pl/winamp/ColorThemes/wct_en.php
    The 'gammagroup' object is an element that defines specific GUI element (for example: Titlebar). It contains 'id', 'value', 'gray' and 'boost' attributes.

    The `id` attribute declares the name of GUI element that we want to describe
    The `value` attribute declares the color of specific GUI element (in RGB or HSL scale, scope is -4096 to 4096)
    The `gray` attribute defines grayscale value (1 or 2). 
        When set to "1" the gammagroup elements will be treated as having a light gray base. 
        When set to "2" the gammagroup elements will be treated as having a dark gray base.
    The `boost` attribute defines saturation (0 or 1). When set to "1", boost brightens up the gammagroup by adding 50% more white to it.

* http://srufaculty.sru.edu/david.dailey/svg/SVGOpen2010/filters2.htm
    SVG Filter demos

* https://www.hackification.io/blog/2020/08/10/svg-effect-shiny-metal/
    Shiny-metal effect

* https://stackoverflow.com/a/47860596
    SVG: Chains along a path
* https://gist.github.com/watous/b634d3d1d266ce161d3b0d05d423b7df/
    path pattern examples