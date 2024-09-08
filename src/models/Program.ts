import { IHorse } from "./Horse";

export interface IProgram {
  id: string;
  lap: number;
  distance: number;
  horses: IHorse[];
}
