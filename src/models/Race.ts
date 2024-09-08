import { IHorse } from "./Horse";

export interface IRaceResults {
  id: string;
  lap: number;
  distance: number;
  horses: IHorse[];
}
