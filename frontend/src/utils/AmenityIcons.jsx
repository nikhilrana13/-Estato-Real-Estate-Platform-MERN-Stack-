// import {
//   FaSwimmingPool,
//   FaDumbbell,
//   FaParking,
//   FaWater,
//   FaVideo,
//   FaBolt,
//   FaShieldAlt,
//   FaTree,
// } from "react-icons/fa";
// import { MdLocalLaundryService } from "react-icons/md";
// import { GiPowerGenerator } from "react-icons/gi";
// import { HiOutlineQuestionMarkCircle } from "react-icons/hi";
// import { FaElevator } from "react-icons/fa6";

// export const AMENITY_ICONS = {
//   gym: FaDumbbell,
//   swimmingpool: FaSwimmingPool,
//   pool: FaSwimmingPool,
//   parking: FaParking,
//   lift: FaElevator,
//   elevator: FaElevator,
//   powerbackup: FaBolt,
//   generator: GiPowerGenerator,
//   watersupply: FaWater,
//   cctv: FaVideo,
//   security: FaShieldAlt,
//   garden: FaTree,
//   laundry: MdLocalLaundryService,
//   default: HiOutlineQuestionMarkCircle,
// };

import {
  MdOutlineDinnerDining,
  MdKitchen,
  MdOutlineSecurity,
  MdSportsGymnastics,
  MdOutlineSportsBaseball,
} from "react-icons/md";

import {
  LucideWashingMachine,
  LucideSofa,
  LucideMicrowave,
  AirVentIcon,
  Tv2Icon,
  BedDouble,
} from "lucide-react";

import {
  GiGasStove,
  GiWaterTank,
  GiChimney,
  GiLift,
  GiPlantRoots,
  GiGate,
} from "react-icons/gi";
import { RiFridgeLine } from "react-icons/ri";
import { FaCarBattery, FaPersonSwimming, FaIntercom, FaGlassWater } from "react-icons/fa6";
import { BiSolidBuildingHouse } from "react-icons/bi";
import { Fan, Lightbulb, House, Cctv } from "lucide-react";
import { PiCarBatteryFill, PiWifiHighLight, PiSecurityCameraFill } from "react-icons/pi";
import { GrCafeteria } from "react-icons/gr";

export const AMENITY_ICONS = {
  // ===== FLAT AMENITIES =====
  diningtable: MdOutlineDinnerDining,
  washingmachine: LucideWashingMachine,
  cupboard: BiSolidBuildingHouse,
  sofa: LucideSofa,
  microwave: LucideMicrowave,
  stove: GiGasStove,
  fridge: RiFridgeLine,
  waterpurifier: GiWaterTank,
  gaspipeline: GiGasStove,
  chimney: GiChimney,
  modularkitchen: MdKitchen,
  fan: Fan,
  light: Lightbulb,
  ac: AirVentIcon,
  tv: Tv2Icon,
  bed: BedDouble,
  geyser: GiGasStove,
  // ===== SOCIETY AMENITIES =====
  powerbackup: FaCarBattery,
  swimmingpool: FaPersonSwimming,
  gym: MdSportsGymnastics,
  lift: GiLift,
  intercom: FaIntercom,
  garden: GiPlantRoots,
  sports: MdOutlineSportsBaseball,
  kidsarea: MdOutlineSportsBaseball,
  cctv: Cctv,
  clubhouse: House,
  communityhall: GiGate,
  watersupply: GiWaterTank,
  waterstorage: FaGlassWater,
  internetconnectivity: PiWifiHighLight,
  security: MdOutlineSecurity,
  // ===== COMMERCIAL AMENITIES =====
  cafeteria: GrCafeteria,
  powerbackupcommercial: PiCarBatteryFill,
  cctvcommercial: PiSecurityCameraFill,
  // ===== FALLBACK =====
  default: GiGate,
};
