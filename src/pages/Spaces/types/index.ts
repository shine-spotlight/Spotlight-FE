export type SpaceFilterType = {
  regions: { sido: string; sgg?: string }[];
  eventTypes: string[];
  equipments: string[];
};

export type SpaceItemType = {
  id: number;
  name: string;
  isStar: boolean;
  img: string;
  address: string;
  category: string[];
};
