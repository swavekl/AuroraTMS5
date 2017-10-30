enum SanctionRequestStatus {
  Started = 'Started',
  Submitted = 'Submitted',
  Approved = 'Approved',
  Rejected = 'Rejected',
  Withdrawn = 'Withdrawn'
}

export class SanctionRequest {
  id: number;
  tournamentName: string;
  startDate: Date;
  endDate: Date;
  status: SanctionRequestStatus
}
