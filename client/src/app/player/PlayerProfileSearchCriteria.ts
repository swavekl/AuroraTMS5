import {PagingInfo} from "../utils/paging-info";

/**
 * Class for searching player profiles by either names or usatt id
 */
export class PlayerProfileSearchCriteria extends PagingInfo{

  constructor(startIndex: number,
              pageSize: number,
              public firstName: string,
              public lastName: string,
              public usattId: number) {
    super(startIndex, pageSize, "");
  }
}
