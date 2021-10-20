import { report } from "../models/report";
import { Base } from "../base";
import MethodOverload = Base.MethodOverload;
import NoArgMethodOverload = Base.NoArgMethodOverload;

export class Reports {
    /**
     * Create a report
     * @param report
     * @param options
     */
    create: MethodOverload<report.CreateReport, report.ReportData>;

    /**
     * Get a report
     * @param reportId
     * @param options
     */
    get: MethodOverload<string, report.ReportData>;

    /**
     * Get all reports
     * @param options
     */
    getAll: NoArgMethodOverload<report.ReportData[]>;
}
