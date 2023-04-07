import { Category } from "./Category";

export interface Note{
  title:string,
  description:string,
  archived:boolean,
  id?:number,
  categories?:Category[]
}