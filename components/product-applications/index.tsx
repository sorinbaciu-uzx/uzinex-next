import { PipeInspectionAnim } from "./PipeInspectionAnim";
import { SewerNetworkAnim } from "./SewerNetworkAnim";
import { PtzCameraAnim } from "./PtzCameraAnim";
import { CrawlerTracksAnim } from "./CrawlerTracksAnim";
import { ExcavatorBucketAnim } from "./ExcavatorBucketAnim";
import { JawCrusherAnim } from "./JawCrusherAnim";
import { DemolitionShearsAnim } from "./DemolitionShearsAnim";
import { GrabClawAnim } from "./GrabClawAnim";
import { RipperToothAnim } from "./RipperToothAnim";
import { QuickCouplerAnim } from "./QuickCouplerAnim";
import { CncSpindleAnim } from "./CncSpindleAnim";
import { LatheSpinningAnim } from "./LatheSpinningAnim";
import { EdgeBandingAnim } from "./EdgeBandingAnim";
import { ShredderTwinAnim } from "./ShredderTwinAnim";
import { MagneticSeparatorAnim } from "./MagneticSeparatorAnim";
import { ConveyorBeltAnim } from "./ConveyorBeltAnim";
import { BalePressAnim } from "./BalePressAnim";
import { PalletWrapAnim } from "./PalletWrapAnim";
import { ShrinkTunnelAnim } from "./ShrinkTunnelAnim";
import { StrappingAnim } from "./StrappingAnim";
import { LabelPrintAnim } from "./LabelPrintAnim";
import { HeatPumpAnim } from "./HeatPumpAnim";
import { LaserCutAnim } from "./LaserCutAnim";
import { WoodSawAnim } from "./WoodSawAnim";
import { VideoscopeProbeAnim } from "./VideoscopeProbeAnim";
import { ExcavatorArmAnim } from "./ExcavatorArmAnim";
import { CompactorPlateAnim } from "./CompactorPlateAnim";
import { RotaryScreenAnim } from "./RotaryScreenAnim";
import { FoodFactoryAnim } from "./FoodFactoryAnim";
import { AutoIndustryAnim } from "./AutoIndustryAnim";
import { ElectronicBoardAnim } from "./ElectronicBoardAnim";
import { TireRecycleAnim } from "./TireRecycleAnim";
import { IndustrialPressAnim } from "./IndustrialPressAnim";
import { BoxFormingAnim } from "./BoxFormingAnim";
import { BottleFillAnim } from "./BottleFillAnim";
import { GearMechanismAnim } from "./GearMechanismAnim";
import { StonePolishAnim } from "./StonePolishAnim";
import { FurnitureAssemblyAnim } from "./FurnitureAssemblyAnim";

export { ApplicationIcon } from "./icons";
export type { ApplicationIconId } from "./icons";

export type ApplicationAnimationId =
  | "pipe-inspection"
  | "sewer-network"
  | "ptz-camera"
  | "crawler-tracks"
  | "excavator-bucket"
  | "jaw-crusher"
  | "demolition-shears"
  | "grab-claw"
  | "ripper-tooth"
  | "quick-coupler"
  | "cnc-spindle"
  | "lathe-spinning"
  | "edge-banding"
  | "shredder-twin"
  | "magnetic-separator"
  | "conveyor-belt"
  | "bale-press"
  | "pallet-wrap"
  | "shrink-tunnel"
  | "strapping"
  | "label-print"
  | "heat-pump"
  | "laser-cut"
  | "wood-saw"
  | "videoscope-probe"
  | "excavator-arm"
  | "compactor-plate"
  | "rotary-screen"
  | "food-factory"
  | "auto-industry"
  | "electronic-board"
  | "tire-recycle"
  | "industrial-press"
  | "box-forming"
  | "bottle-fill"
  | "gear-mechanism"
  | "stone-polish"
  | "furniture-assembly";

const REGISTRY: Record<ApplicationAnimationId, () => React.ReactElement> = {
  "pipe-inspection": PipeInspectionAnim,
  "sewer-network": SewerNetworkAnim,
  "ptz-camera": PtzCameraAnim,
  "crawler-tracks": CrawlerTracksAnim,
  "excavator-bucket": ExcavatorBucketAnim,
  "jaw-crusher": JawCrusherAnim,
  "demolition-shears": DemolitionShearsAnim,
  "grab-claw": GrabClawAnim,
  "ripper-tooth": RipperToothAnim,
  "quick-coupler": QuickCouplerAnim,
  "cnc-spindle": CncSpindleAnim,
  "lathe-spinning": LatheSpinningAnim,
  "edge-banding": EdgeBandingAnim,
  "shredder-twin": ShredderTwinAnim,
  "magnetic-separator": MagneticSeparatorAnim,
  "conveyor-belt": ConveyorBeltAnim,
  "bale-press": BalePressAnim,
  "pallet-wrap": PalletWrapAnim,
  "shrink-tunnel": ShrinkTunnelAnim,
  "strapping": StrappingAnim,
  "label-print": LabelPrintAnim,
  "heat-pump": HeatPumpAnim,
  "laser-cut": LaserCutAnim,
  "wood-saw": WoodSawAnim,
  "videoscope-probe": VideoscopeProbeAnim,
  "excavator-arm": ExcavatorArmAnim,
  "compactor-plate": CompactorPlateAnim,
  "rotary-screen": RotaryScreenAnim,
  "food-factory": FoodFactoryAnim,
  "auto-industry": AutoIndustryAnim,
  "electronic-board": ElectronicBoardAnim,
  "tire-recycle": TireRecycleAnim,
  "industrial-press": IndustrialPressAnim,
  "box-forming": BoxFormingAnim,
  "bottle-fill": BottleFillAnim,
  "gear-mechanism": GearMechanismAnim,
  "stone-polish": StonePolishAnim,
  "furniture-assembly": FurnitureAssemblyAnim,
};

export function ApplicationAnimation({ id }: { id: ApplicationAnimationId }) {
  const Component = REGISTRY[id];
  if (!Component) return null;
  return <Component />;
}

export const APPLICATION_ANIMATION_IDS = Object.keys(REGISTRY) as ApplicationAnimationId[];
