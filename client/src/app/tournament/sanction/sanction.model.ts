enum SanctionRequestStatus {
  Started = 'Started',
  Submitted = 'Submitted',
  Approved = 'Approved',
  Rejected = 'Rejected',
  Withdrawn = 'Withdrawn'
}

export class SanctionRequest {
  tournamentName: string;
  startDate: Date;
  endDate: Date;
  status: SanctionRequestStatus
}
