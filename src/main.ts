import './style.css';
import { DataStore } from './utils/DataStore';
import { Grid } from './utils/Grid';
import { ViewPort } from './utils/ViewPort';
import type { Employee } from "./models/Employee";
import employeeData from "./employees.json";


window.addEventListener("DOMContentLoaded",()=>{
  const canvas=document.getElementById("gridCanvas") as HTMLCanvasElement;
  if(!canvas) throw new Error("Grid canvas is not found");

  const datastore=new DataStore();
  const records:Employee[]=employeeData as Employee[];
  datastore.setRecords(records);
  const viewport=new ViewPort(datastore);
  new Grid(datastore,viewport,canvas);
})