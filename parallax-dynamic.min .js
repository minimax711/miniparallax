const parallax=document.querySelectorAll(".parallax"),observers=document.querySelectorAll(".mini-observer"),startUp=t=>{t.forEach(function(t){let e=window.innerHeight;t.getAttribute("speed")||t.setAttribute("speed",.25);let r=t.getAttribute("speed"),l=t.clientHeight,a=(e-l)*r;t.setAttribute("calc",(e-l)*.5),t.setAttribute("offset",t.getBoundingClientRect().top+window.pageYOffset),null==t.getAttribute("noscale")&&(t.style.height=l+a+"px",t.style.top=-.5*a+"px"),null!==t.getAttribute("x")?t.style.transform="translate3d("+(0-t.getAttribute("offset")+parseInt(t.getAttribute("calc")))*t.getAttribute("speed")+"px, 0, 0)":(t.style.transform="translate3d(0,"+(0-t.getAttribute("offset")+parseInt(t.getAttribute("calc")))*t.getAttribute("speed")+"px, 0)",null==t.getAttribute("y")&&t.setAttribute("y",""))})};function scrollFc(){let t=window.scrollY,e=document.querySelectorAll(".parallax[x]"),r=document.querySelectorAll(".parallax[y]");e.forEach(function(e){e.style.transform="translate3d("+(t-e.getAttribute("offset")+parseInt(e.getAttribute("calc")))*e.getAttribute("speed")+"px, 0, 0)"}),r.forEach(function(e){e.style.transform="translate3d(0,"+(t-e.getAttribute("offset")+parseInt(e.getAttribute("calc")))*e.getAttribute("speed")+"px, 0)"})}function cleanUp(){window.removeEventListener("scroll",scrollFc)}function isElement(t){return"object"==typeof HTMLElement?t instanceof HTMLElement:t&&"object"==typeof t&&null!==t&&1===t.nodeType&&"string"==typeof t.nodeName}function observerSetup(t){let e=(t,e)=>{for(let r of t)"childList"===r.type?r.addedNodes.forEach(t=>{isElement(t)&&(t.classList.contains("parallax")?startUp(t):startUp(t.querySelectorAll(".parallax")))}):"attributes"===r.type&&"class"===r.attributeName&&isElement(r.target)&&(r.target.classList.contains("parallax")?startUp(r.target):startUp(r.target.querySelectorAll(".parallax")))},r=new MutationObserver(e);r.observe(t,{attributes:!0,childList:!0,subtree:!0})}function handleResize(){cleanUp(),startUp(document.querySelectorAll(".parallax")),window.addEventListener("scroll",scrollFc)}startUp(parallax),window.addEventListener("scroll",scrollFc),observers.forEach(t=>observerSetup(t));let timeout=!1;window.addEventListener("resize",function(){clearTimeout(timeout),timeout=setTimeout(getDimensions,250)}),getDimensions();