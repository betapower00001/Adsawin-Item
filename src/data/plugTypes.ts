export interface PlugType {
  id: string;
  name: string;
  // thumbnail shown on the plug type list
  thumb?: string;
}

export const plugTypes: PlugType[] = [
  { id: "universal", name: "Universal", thumb: "/plugs/universal/thumb.png" },
  { id: "thai", name: "Thai", thumb: "/plugs/thai/thumb.png" },
  { id: "eu", name: "EU", thumb: "/plugs/eu/thumb.png" },
  { id: "us", name: "US", thumb: "/plugs/us/thumb.png" },
  { id: "uk", name: "UK", thumb: "/plugs/uk/thumb.png" },
];

export default plugTypes;
