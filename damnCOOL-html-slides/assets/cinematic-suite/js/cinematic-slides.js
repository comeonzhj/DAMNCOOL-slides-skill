(function () {
  const deck = document.getElementById("deck");
  const canvas = document.getElementById("canvas");
  const steps = Array.from(document.querySelectorAll(".step"));
  const count = document.getElementById("slide-count");
  const transitionNames = ["swoop", "spin", "dive", "snap", "float", "warp"];
  const icons = {
    rocket: "🚀",
    fire: "🔥",
    spark: "✦",
    brain: "🧠",
    eye: "◉",
    map: "🗺",
    shield: "⬟",
    bolt: "⚡",
    seed: "🌱",
    gem: "◆",
    target: "◎",
    wave: "≋",
    lab: "⚗",
    magnet: "⊓",
    compass: "✺",
    sun: "☀",
    moon: "☾",
    star: "★",
    ring: "◌",
    crosshair: "⌖",
    node: "⌬",
    signal: "≋",
    pulse: "〰",
    delta: "△",
    infinity: "∞"
  };

  let activeIndex = 0;
  let overviewOpen = false;

  function numberAttr(node, name, fallback) {
    const raw = node.dataset[name];
    const value = Number(raw);
    return Number.isFinite(value) ? value : fallback;
  }

  function applyStepTransforms() {
    steps.forEach((step) => {
      const x = numberAttr(step, "x", 0);
      const y = numberAttr(step, "y", 0);
      const z = numberAttr(step, "z", 0);
      const scale = numberAttr(step, "scale", 1);
      const rotate = numberAttr(step, "rotate", 0);
      step.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px) scale(${scale}) rotate(${rotate}deg)`;
    });
  }

  function hydrateIcons() {
    document.querySelectorAll(".mega-icon[data-icon]").forEach((node) => {
      const key = node.dataset.icon;
      if (!node.textContent.trim() && icons[key]) node.textContent = icons[key];
    });
    window.CinematicSlides = { icons, goto, next, prev, overview };
  }

  function setTransition(step) {
    const requested = step.dataset.transition || "random";
    const name = requested === "random"
      ? transitionNames[Math.floor(Math.random() * transitionNames.length)]
      : requested;
    document.body.classList.remove(...transitionNames.map((item) => `transition-${item}`));
    document.body.classList.add(`transition-${name}`);
  }

  function setActiveClasses() {
    steps.forEach((step, index) => {
      step.classList.toggle("active", index === activeIndex && !overviewOpen);
      step.classList.toggle("overview", overviewOpen);
      step.setAttribute("aria-hidden", overviewOpen ? "false" : String(index !== activeIndex));
    });
    if (count) count.textContent = `${activeIndex + 1} / ${steps.length}`;
  }

  function goto(index) {
    if (!steps.length) return;
    activeIndex = Math.max(0, Math.min(index, steps.length - 1));
    overviewOpen = false;
    const step = steps[activeIndex];
    const x = numberAttr(step, "x", 0);
    const y = numberAttr(step, "y", 0);
    const z = numberAttr(step, "z", 0);
    const scale = numberAttr(step, "scale", 1);
    const rotate = numberAttr(step, "rotate", 0);
    setTransition(step);
    setActiveClasses();
    deck.style.transform = `scale(${1 / scale})`;
    deck.style.perspective = `${Math.max(420, scale * 1000)}px`;
    canvas.style.transform = `rotate(${-rotate}deg) translate3d(${-x}px, ${-y}px, ${-z}px)`;
    history.replaceState(null, "", `#${activeIndex + 1}`);
  }

  function next() {
    goto(Math.min(activeIndex + 1, steps.length - 1));
  }

  function prev() {
    goto(Math.max(activeIndex - 1, 0));
  }

  function overview() {
    if (!steps.length) return;
    overviewOpen = true;
    const points = steps.map((step) => ({
      x: numberAttr(step, "x", 0),
      y: numberAttr(step, "y", 0)
    }));
    const xs = points.map((point) => point.x);
    const ys = points.map((point) => point.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const x = (minX + maxX) / 2;
    const y = (minY + maxY) / 2;
    const scaleX = (maxX - minX + window.innerWidth) / window.innerWidth;
    const scaleY = (maxY - minY + window.innerHeight) / window.innerHeight;
    const scale = Math.max(1, scaleX, scaleY) * 1.05;
    document.body.classList.remove(...transitionNames.map((item) => `transition-${item}`));
    document.body.classList.add("transition-float");
    setActiveClasses();
    deck.style.transform = `scale(${1 / scale})`;
    deck.style.perspective = `${Math.max(800, scale * 1000)}px`;
    canvas.style.transform = `translate3d(${-x}px, ${-y}px, 0)`;
  }

  function fromHash() {
    const hashIndex = Number(window.location.hash.replace("#", "")) - 1;
    return Number.isFinite(hashIndex) ? hashIndex : 0;
  }

  function bindEvents() {
    window.addEventListener("keydown", (event) => {
      const key = event.key.toLowerCase();
      if ((event.ctrlKey || event.metaKey) && key === "g") {
        event.preventDefault();
        overview();
      } else if (["arrowright", "arrowdown", " ", "pagedown", "tab"].includes(key)) {
        event.preventDefault();
        next();
      } else if (["arrowleft", "arrowup", "pageup"].includes(key)) {
        event.preventDefault();
        prev();
      } else if (["backspace", "escape", "o"].includes(key)) {
        event.preventDefault();
        overview();
      } else if (key === "home") {
        event.preventDefault();
        goto(0);
      } else if (key === "end") {
        event.preventDefault();
        goto(steps.length - 1);
      }
    });

    window.addEventListener("wheel", (event) => {
      if (Math.abs(event.deltaY) < 12) return;
      event.preventDefault();
      event.deltaY > 0 ? next() : prev();
    }, { passive: false });

    steps.forEach((step, index) => {
      step.addEventListener("click", () => {
        if (overviewOpen) goto(index);
        else if (index === activeIndex) next();
        else goto(index);
      });
    });

    window.addEventListener("resize", () => {
      overviewOpen ? overview() : goto(activeIndex);
    });
  }

  applyStepTransforms();
  hydrateIcons();
  bindEvents();
  goto(fromHash());
})();
