/**
 * Server component dispatcher for product-description animations.
 *
 * A product's recipe in `data/product-animations.json` is a list of
 * `ProductAnimation` entries. Each entry names a variant ("counter", "flow",
 * "checklist", "compare") and carries the data payload that variant expects.
 * This wrapper picks the right component to render. Kept thin on purpose: all
 * the interactive / Motion logic lives in the underlying client components
 * (which are already used by the industry-4.0 pages), so we don't duplicate
 * them.
 *
 * Rendering: we wrap each animation in a thin container so spacing & captions
 * match the description column, and let the inner component handle its own
 * dark panel.
 */

import { CounterMetrics } from "./CounterMetrics";
import { FlowchartSteps } from "./FlowchartSteps";
import { UnboxingChecklist } from "./UnboxingChecklist";
import { ComparisonBar } from "./ComparisonBar";

export type Metric = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export type FlowStep = { label: string; time?: string };

export type ComparisonRow = {
  label: string;
  before: { label: string; value: number; unit?: string };
  after: { label: string; value: number; unit?: string };
};

export type ProductAnimation =
  | {
      type: "counter";
      /** 0-indexed paragraph after which this animation appears. Clamped at render. */
      insertAfterParagraph: number;
      data: { metrics: Metric[] };
    }
  | {
      type: "flow";
      insertAfterParagraph: number;
      data: { steps: FlowStep[]; totalTime?: string };
    }
  | {
      type: "checklist";
      insertAfterParagraph: number;
      data: { items: string[] };
    }
  | {
      type: "compare";
      insertAfterParagraph: number;
      data: { heading?: string; rows: ComparisonRow[] };
    };

const ACCENT = "#1e6bb8";

export function ProductAnimationBlock({ anim }: { anim: ProductAnimation }) {
  switch (anim.type) {
    case "counter":
      return <CounterMetrics metrics={anim.data.metrics} accent={ACCENT} />;
    case "flow":
      return (
        <FlowchartSteps
          steps={anim.data.steps}
          totalTime={anim.data.totalTime}
          accent={ACCENT}
        />
      );
    case "checklist":
      return <UnboxingChecklist items={anim.data.items} accent={ACCENT} />;
    case "compare":
      return (
        <ComparisonBar
          rows={anim.data.rows}
          heading={anim.data.heading}
          accent={ACCENT}
        />
      );
  }
}
