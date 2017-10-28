enum SanctionRequestStatus {
  Started,
  Submitted,
  Approved,
  Rejected,
  Withdrawn
}

export class SanctionRequest {
  tournamentName: string;
  startDate: Date;
  endDate: Date;
  status: SanctionRequestStatus
}
