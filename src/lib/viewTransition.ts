export type AnimationVariant =
  | "circle"
  | "rectangle"
  | "gif"
  | "polygon"
  | "circle-blur";

export type AnimationStart =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "center"
  | "top-center"
  | "bottom-center"
  | "bottom-up"
  | "top-down"
  | "left-right"
  | "right-left";

interface Animation {
  name: string;
  css: string;
}

const getPositionCoords = (position: AnimationStart) => {
  switch (position) {
    case "top-left":
      return { cx: "0", cy: "0" };
    case "top-right":
      return { cx: "40", cy: "0" };
    case "bottom-left":
      return { cx: "0", cy: "40" };
    case "bottom-right":
      return { cx: "40", cy: "40" };
    case "top-center":
      return { cx: "20", cy: "0" };
    case "bottom-center":
      return { cx: "20", cy: "40" };
    case "bottom-up":
    case "top-down":
    case "left-right":
    case "right-left":
      return { cx: "20", cy: "20" };
    default:
      return { cx: "20", cy: "20" };
  }
};

const generateSVG = (variant: AnimationVariant, start: AnimationStart) => {
  if (variant === "circle-blur") {
    if (start === "center") {
      return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><filter id="blur"><feGaussianBlur stdDeviation="2"/></filter></defs><circle cx="20" cy="20" r="18" fill="white" filter="url(%23blur)"/></svg>`;
    }
    const positionCoords = getPositionCoords(start);
    const { cx, cy } = positionCoords;
    return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><filter id="blur"><feGaussianBlur stdDeviation="2"/></filter></defs><circle cx="${cx}" cy="${cy}" r="18" fill="white" filter="url(%23blur)"/></svg>`;
  }

  if (start === "center") return "";
  if (variant === "rectangle") return "";

  const positionCoords = getPositionCoords(start);
  const { cx, cy } = positionCoords;

  if (variant === "circle") {
    return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="${cx}" cy="${cy}" r="20" fill="white"/></svg>`;
  }

  return "";
};

const getTransformOrigin = (start: AnimationStart) => {
  switch (start) {
    case "top-left":
      return "top left";
    case "top-right":
      return "top right";
    case "bottom-left":
      return "bottom left";
    case "bottom-right":
      return "bottom right";
    case "top-center":
      return "top center";
    case "bottom-center":
      return "bottom center";
    case "bottom-up":
    case "top-down":
    case "left-right":
    case "right-left":
    case "center":
    default:
      return "center";
  }
};

export const createAnimation = (
  variant: AnimationVariant,
  start: AnimationStart = "center",
  blur = false,
  url?: string,
): Animation => {
  const svg = generateSVG(variant, start);
  const transformOrigin = getTransformOrigin(start);

  if (variant === "rectangle") {
    const getClipPath = (direction: AnimationStart) => {
      switch (direction) {
        case "bottom-up":
          return {
            from: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          };
        case "top-down":
          return {
            from: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          };
        case "left-right":
          return {
            from: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
            to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          };
        case "right-left":
          return {
            from: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
            to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          };
        default:
          return {
            from: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          };
      }
    };

    const clipPath = getClipPath(start);

    return {
      name: `${variant}-${start}${blur ? "-blur" : ""}`,
      css: `
      ::view-transition-group(root) {
        animation-duration: 0.7s;
        animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
      }
      ::view-transition-new(root) {
        animation-name: reveal-new-${start}${blur ? "-blur" : ""};
        ${blur ? "filter: blur(2px);" : ""}
      }
      ::view-transition-old(root) {
        animation: none;
        z-index: -1;
      }
      @keyframes reveal-new-${start}${blur ? "-blur" : ""} {
        from {
          clip-path: ${clipPath.from};
          ${blur ? "filter: blur(8px);" : ""}
        }
        to {
          clip-path: ${clipPath.to};
          ${blur ? "filter: blur(0px);" : ""}
        }
      }
      `,
    };
  }

  if (variant === "circle" && start === "center") {
    return {
      name: `${variant}-${start}${blur ? "-blur" : ""}`,
      css: `
      ::view-transition-group(root) {
        animation-duration: 1.5s;
        animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
        background-color: rgba(255, 255, 255, 0.05);
      }
      ::view-transition-new(root) {
        animation-name: reveal-new${blur ? "-blur" : ""};
      }
      ::view-transition-old(root) {
        animation: fade-old 1.5s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        z-index: -1;
      }
      @keyframes fade-old {
        0% { opacity: 1; filter: blur(0px); }
        50% { opacity: 0.5; filter: blur(2px); }
        100% { opacity: 0; filter: blur(4px); }
      }
      @keyframes reveal-new${blur ? "-blur" : ""} {
        0% {
          clip-path: circle(0% at 50% 50%);
          ${blur ? "filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.3)) blur(2px);" : ""}
        }
        100% {
          clip-path: circle(150% at 50% 50%);
          ${blur ? "filter: drop-shadow(0 0 0px rgba(255, 255, 255, 0)) blur(0px);" : ""}
        }
      }
      `,
    };
  }

  if (variant === "circle" && start !== "center") {
    const getClipPathPosition = (position: AnimationStart) => {
      switch (position) {
        case "top-left": return "0% 0%";
        case "top-right": return "100% 0%";
        case "bottom-left": return "0% 100%";
        case "bottom-right": return "100% 100%";
        case "top-center": return "50% 0%";
        case "bottom-center": return "50% 100%";
        default: return "50% 50%";
      }
    };
    const clipPosition = getClipPathPosition(start);
    return {
      name: `${variant}-${start}${blur ? "-blur" : ""}`,
      css: `
      ::view-transition-group(root) {
        animation-duration: 1.5s;
        animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
        background-color: rgba(255, 255, 255, 0.05);
      }
      ::view-transition-new(root) {
        animation-name: reveal-new-${start}${blur ? "-blur" : ""};
      }
      ::view-transition-old(root) {
        animation: fade-old 1.5s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        z-index: -1;
      }
      @keyframes fade-old {
        0% { opacity: 1; filter: blur(0px); }
        50% { opacity: 0.5; filter: blur(2px); }
        100% { opacity: 0; filter: blur(4px); }
      }
      @keyframes reveal-new-${start}${blur ? "-blur" : ""} {
        0% {
          clip-path: circle(0% at ${clipPosition});
          ${blur ? "filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.3)) blur(2px);" : ""}
        }
        100% {
          clip-path: circle(150% at ${clipPosition});
          ${blur ? "filter: drop-shadow(0 0 0px rgba(255, 255, 255, 0)) blur(0px);" : ""}
        }
      }
      `,
    };
  }

  // Fallback for polygon/circle-blur/gif using mask (requires SVG generation)
  return {
    name: `${variant}-${start}${blur ? "-blur" : ""}`,
    css: `
      ::view-transition-group(root) {
        animation-duration: 1.5s;
        animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
        background-color: rgba(255, 255, 255, 0.05);
      }
      ::view-transition-new(root) {
        mask: url('${svg}') ${start.replace("-", " ")} / 0 no-repeat;
        mask-origin: content-box;
        animation: scale-${start}${blur ? "-blur" : ""} 1.5s cubic-bezier(0.65, 0, 0.35, 1);
        transform-origin: ${transformOrigin};
      }
      ::view-transition-old(root) {
        animation: fade-old 1.5s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        transform-origin: ${transformOrigin};
        z-index: -1;
      }
      @keyframes fade-old {
        0% { opacity: 1; filter: blur(0px); }
        50% { opacity: 0.5; filter: blur(2px); }
        100% { opacity: 0; filter: blur(4px); }
      }
      @keyframes scale-${start}${blur ? "-blur" : ""} {
        0% {
          mask-size: 0vmax;
          ${blur ? "filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.3)) blur(2px);" : ""}
        }
        100% {
          mask-size: 2000vmax;
          ${blur ? "filter: drop-shadow(0 0 0px rgba(255, 255, 255, 0)) blur(0px);" : ""}
        }
      }
    `,
  };
};

export const updateStyles = (css: string) => {
  if (typeof window === "undefined") return;

  const styleId = "view-transition-styles";
  let styleElement = document.getElementById(styleId) as HTMLStyleElement;

  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = styleId;
    document.head.appendChild(styleElement);
  }

  styleElement.textContent = css;
};

// Next.js router.push is async, and document.startViewTransition might not wait for it.
// To force it, we can wrap the routing logic.
export const triggerViewTransition = (
  callback: () => void,
  variant: AnimationVariant = "circle",
  start: AnimationStart = "center",
  blur = false
) => {
  if (typeof window === "undefined" || !document.startViewTransition) {
    callback();
    return;
  }

  const animation = createAnimation(variant, start, blur);
  updateStyles(animation.css);

  document.startViewTransition(async () => {
    // Execute the routing or scrolling action
    callback();
    
    // In Next.js App Router, routing is asynchronous. We might need to wait for a small timeout
    // to ensure the DOM has updated before the transition resolves, or rely on Next.js's internal handling.
    // If it's a synchronous scroll, it's immediate. If it's a route push, we just wait a tick.
    await new Promise((resolve) => setTimeout(resolve, 50));
  });
};
