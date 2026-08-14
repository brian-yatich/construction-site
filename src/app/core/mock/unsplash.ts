/**
 * Free-to-use construction/engineering photography from Unsplash (Unsplash License —
 * free for commercial use, no attribution required). Swap these for the client's own
 * photography whenever it's available; nothing else in the app needs to change.
 */
export const unsplash = (photoId: string, w: number, h: number): string =>
  `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const UNSPLASH = {
  workersGroup: '1541888946425-d81bb19240f5',
  workerHardHatFrame: '1587582423116-ec07293f0395',
  towerCraneLowAngle: '1535732759880-bbd5c7265e3f',
  workerPowerTool: '1589939705384-5185137a7f0f',
  cranesAboveBuildings: '1485083269755-a7b559a4fe5e',
  concreteBuilding: '1508450859948-4e04fabaa4ea',
  twoWorkers: '1504307651254-35680f356dfd',
  nightHighRise: '1599995903128-531fc7fb694b',
  buildingsCloudySky: '1565008447742-97f6f38c985c',
  workersSunset: '1579847188804-ecba0e2ea330',

  excavator: '1503708928676-1cb796a0891e',
  roadTrack: '1575281923032-f40d94ef6160',
  heavyEquipmentQuarry: '1517089596392-fb9a9033e05b',

  suspensionBridge: '1529926691761-20fb82067c71',
  concreteBridgeLandscape: '1522775559573-2f76d540932b',
  aerialBridge: '1512187849-463fdb898f21',

  renovationLadder: '1517581177682-a085bb7ffb15',
  renovationTools: '1634586648651-f1fb9ec10d90',
  buildingWithCraneBw: '1601074231509-dce351c05199',
  brownConcreteBuilding: '1621511075938-f03482369feb',
  brownBrickBuilding: '1593786267440-550458cc882a',

  blueprintPencil: '1542621334-a254cf47733d',
  personHoldingPlans: '1581092160562-40aa08e78837',
  personWritingPlans: '1581094488379-6a10d04c0f04',
  personDraftingBlueprint: '1503387837-b154d5074bd2',
  blueprintsSpread: '1762146828422-50a8bd416d3c',
} as const;
