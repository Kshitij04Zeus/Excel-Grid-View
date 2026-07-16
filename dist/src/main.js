import './style.css';
import { DataStore } from './utils/DataStore';
import { Grid } from './utils/Grid';
import { ViewPort } from './utils/ViewPort';
import { generateRecords } from './utils/generate-data';
import { Constants } from './utils/Constants';
// import employeeData from "./employees.json";
window.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("gridCanvas");
    if (!canvas)
        throw new Error("Grid canvas is not found");
    const datastore = new DataStore();
    const records = generateRecords(Constants.TOTAL_ROWS);
    datastore.setRecords(records);
    const viewport = new ViewPort(datastore);
    new Grid(datastore, viewport, canvas);
});
//# sourceMappingURL=main.js.map