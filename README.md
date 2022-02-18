# winamp-gamma
learning of winamp changing it skin color


References:
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
