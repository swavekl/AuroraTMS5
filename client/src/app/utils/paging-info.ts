// class for sending query parameters for paging through results
export class PagingInfo {

  constructor (
    public startIndex: number,
    public pageSize: number,
    public searchTerms: string
  ) {
  }
}
