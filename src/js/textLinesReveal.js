import SplitType from "split-type";
import { wrapLines } from "./utils";
import { gsap } from "gsap";

export class TextLinesReveal {
  DOM = {
    el: null,
  };
  SplitTypeInstance;
  isVisible;
  inTimeline;
  outTimeline;

  constructor(DOM_el) {
    this.DOM = {
      el: DOM_el,
    };

    this.SplitTypeInstance = new SplitType(this.DOM.el, { types: "lines" });
    wrapLines(this.SplitTypeInstance.lines, "div", "oh");
    this.initEvents();
  }

  in(animation = true) {
    this.isVisible = true;

    gsap.killTweensOf(this.SplitTypeInstance.lines);
    this.inTimeline = gsap
      .timeline({
        defaults: {
          duration: 1.1,
          ease: "power4.inOut",
        },
      })
      .addLabel("start", 0)
      .set(
        this.SplitTypeInstance.lines,
        {
          yPercent: 105,
        },
        "start"
      );

    if (animation) {
      this.inTimeline.to(
        this.SplitTypeInstance.lines,
        {
          yPercent: 0,
          stagger: 0.05,
        },
        "start"
      );
    } else {
      this.inTimeline.set(
        this.SplitTypeInstance.lines,
        {
          yPercent: 0,
        },
        "start"
      );
    }

    return this.inTimeline;
  }

  out(animation = true) {
    this.isVisible = false;

    gsap.killTweensOf(this.SplitTypeInstance.lines);

    this.outTimeline = gsap
      .timeline({
        defaults: {
          duration: 1.1,
          ease: "power4.inOut",
        },
      })
      .addLabel("start", 0);

    if (animation) {
      this.outTimeline.to(
        this.SplitTypeInstance.lines,
        {
          yPercent: -105,
          stagger: 0.05,
        },
        "start"
      );
    } else {
      this.outTimeline.set(
        this.SplitTypeInstance.lines,
        {
          yPercent: -105,
        },
        "start"
      );
    }

    return this.outTimeline;
  }

  initEvents() {
    window.addEventListener("resize", () => {
      this.SplitTypeInstance.split();

      wrapLines(this.SplitTypeInstance.lines, "div", "oh");

      if (!this.isVisible) {
        gsap.set(this.SplitTypeInstance.lines, { yPercent: 105 });
      }
    });
  }
}
