// Build-demo registry. A build's `demo` key maps to its component.
// Unknown keys render nothing, which lets scaffolded industries declare
// builds before their demos exist.

import type { ComponentType } from "react";
import BehaviourRecoveryDemo from "./BehaviourRecoveryDemo";
import ProfitCommandDemo from "./ProfitCommandDemo";
import CODConfirmDemo from "./CODConfirmDemo";
import StudioEngineDemo from "./StudioEngineDemo";

const REGISTRY: Record<string, ComponentType> = {
  BehaviourRecoveryDemo,
  ProfitCommandDemo,
  CODConfirmDemo,
  StudioEngineDemo,
};

export function getDemo(key: string): ComponentType | null {
  return REGISTRY[key] ?? null;
}
