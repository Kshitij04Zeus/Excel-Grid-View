import { StatsCalculator } from "../utils/StatsCalculator";
export class StatusBarManager {
    selectionManager;
    datastore;
    statsContainer = null;
    constructor(selectionManager, datastore) {
        this.selectionManager = selectionManager;
        this.datastore = datastore;
        this.initUI();
    }
    initUI() {
        this.statsContainer = document.getElementById("statsContainer");
    }
    updateUI() {
        if (!this.statsContainer)
            return;
        const selection = this.selectionManager.getSelection();
        const stats = StatsCalculator.calculate(selection, this.datastore);
        if (stats) {
            this.statsContainer.innerHTML = `
                <span class="mr-3">Average: <strong class="text-slate-800">${StatsCalculator.formatNumber(stats.average)}</strong></span>
                <span class="mr-3">Count: <strong class="text-slate-800">${stats.count}</strong></span>
                <span class="mr-3">Min: <strong class="text-slate-800">${StatsCalculator.formatNumber(stats.min)}</strong></span>
                <span class="mr-3">Max: <strong class="text-slate-800">${StatsCalculator.formatNumber(stats.max)}</strong></span>
                <span>Sum: <strong class="text-slate-800">${StatsCalculator.formatNumber(stats.sum)}</strong></span>
            `;
        }
        else {
            this.statsContainer.innerHTML = "";
        }
    }
}
//# sourceMappingURL=StatusBarManager.js.map