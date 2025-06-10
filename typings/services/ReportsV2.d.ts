import {reportV2} from "../models/reportV2";
import {base} from "../base";
import MethodOverload = base.MethodOverload;
import NoArgMethodOverload = base.NoArgMethodOverload;

export class ReportsV2 {
    /**
     * Create a report
     * @param report
     * @param options
     */
    create: MethodOverload<reportV2.CreateReportV2, reportV2.ReportDataV2>;

    /**
     * Get a report
     * @param reportId
     * @param options
     */
    get: MethodOverload<string, reportV2.ReportDataV2>;

    /**
     * Get all reports
     * @param options
     */
    getAll: NoArgMethodOverload<reportV2.ReportDataV2[]>;
}
