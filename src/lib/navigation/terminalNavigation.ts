interface NavigationPayload {
  type: "route" | "section";
  destination: string;
  router?: any;
}

export const navigateFromTerminal = ({ type, destination, router }: NavigationPayload) => {
  if (typeof window === "undefined") return;

  sessionStorage.setItem("terminal_navigation", "true");
  sessionStorage.setItem("terminal_return_target", "terminal");

  // Dispatch custom event to notify BackToTerminal component of navigation
  window.dispatchEvent(new Event("terminal_navigated"));

  if (type === "route") {
    if (router) {
      router.push(destination);
    } else {
      window.location.href = destination;
    }
  } else if (type === "section") {
    const el = document.getElementById(destination);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }
};
