export namespace securityInfo {
    type AVSResult =
        | "NO_CHECK"
        | "NO_MATCH"
        | "ADDRESS_MATCH_ONLY"
        | "POSTAL_CODE_MATCH_ONLY"
        | "FULL_MATCH";

    interface SecurityInfoData {
        AVSResult: AVSResult;
    }
}
