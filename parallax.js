//PARALLAX by Max Paga / 2022
const parallax = document.querySelectorAll(".parallax");
const observers = document.querySelectorAll(".mini-observer");
const startUp = (nodes) => {
  nodes.forEach(function (p) {
    //variables
    const VH = window.innerHeight;
    if (!p.getAttribute("speed")) p.setAttribute("speed", 0.25);
    let speed = p.getAttribute("speed");
    let height = p.clientHeight;
    let scale = (VH - height) * speed;

    //attributes needed inside the scroll event
    p.setAttribute("calc", (VH - height) * 0.5);
    p.setAttribute(
      "offset",
      p.getBoundingClientRect().top + window.pageYOffset
    );

    if (p.getAttribute("noscale") == null) {
      //element is scaled up to *exactly* fill the wrapper
      p.style.height = height + scale + "px";
      p.style.top = scale * -0.5 + "px";
    }

    //initialise position before scroll listener is called
    if (p.getAttribute("x") !== null) {
      //among X axis
      p.style.transform =
        "translate3d(" +
        (0 - p.getAttribute("offset") + parseInt(p.getAttribute("calc"))) *
          p.getAttribute("speed") +
        "px, 0, 0)";
    } else {
      //among Y axis
      p.style.transform =
        "translate3d(0," +
        (0 - p.getAttribute("offset") + parseInt(p.getAttribute("calc"))) *
          p.getAttribute("speed") +
        "px, 0)";
      //sets Y - needed to be individually called in scroll listener - also checks if y is already set
      if (p.getAttribute("y") == null) p.setAttribute("y", "");
    }
  });
};

startUp(parallax);

function scrollFc() {
  const posY = window.scrollY;

  //needed to set direction (best solution for now)
  const parX = document.querySelectorAll(".parallax[x]");
  const parY = document.querySelectorAll(".parallax[y]");

  //this is calculated whenever the user scrolls (suprisingly performant)
  parX.forEach(function (p) {
    p.style.transform =
      "translate3d(" +
      (posY - p.getAttribute("offset") + parseInt(p.getAttribute("calc"))) *
        p.getAttribute("speed") +
      "px, 0, 0)";
  });
  parY.forEach(function (p) {
    p.style.transform =
      "translate3d(0," +
      (posY - p.getAttribute("offset") + parseInt(p.getAttribute("calc"))) *
        p.getAttribute("speed") +
      "px, 0)";
  });
}

function cleanUp() {
  window.removeEventListener("scroll", scrollFc);
}

//scroll listener
window.addEventListener("scroll", scrollFc);

observers.forEach((observer) => observerSetup(observer));

function isElement(o) {
  return typeof HTMLElement === "object"
    ? o instanceof HTMLElement //DOM2
    : o &&
        typeof o === "object" &&
        o !== null &&
        o.nodeType === 1 &&
        typeof o.nodeName === "string";
}

function observerSetup(node) {
  // Options for the observer (which mutations to observe)
  const config = {
    attributes: true,
    childList: true,
    subtree: true,
  };

  // Callback function to execute when mutations are observed
  const callback = (mutationList, observer) => {
    for (const mutation of mutationList) {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => {
          isElement(node) &&
            (node.classList.contains("parallax")
              ? startUp(node)
              : startUp(node.querySelectorAll(".parallax")));
        });
      } else if (mutation.type === "attributes") {
        if (mutation.attributeName === "class" && isElement(mutation.target)) {
          mutation.target.classList.contains("parallax")
            ? startUp(mutation.target)
            : startUp(mutation.target.querySelectorAll(".parallax"));
        }
      }
    }
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(node, config);
}

function handleResize() {
  cleanUp();
  startUp(document.querySelectorAll(".parallax"));
  window.addEventListener("scroll", scrollFc);
}

let timeout = false;
// window.resize event listener
window.addEventListener("resize", function () {
  // clear the timeout
  clearTimeout(timeout);
  // start timing for event "completion"
  timeout = setTimeout(getDimensions, 250);
});

getDimensions();
