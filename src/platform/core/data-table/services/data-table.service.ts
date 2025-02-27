import { Injectable } from '@angular/core';

import { TdDataTableSortingOrder } from '../data-table.component';

@Injectable({
  providedIn: 'root',
})
export class TdDataTableService {
  /**
   * params:
   * - data: any[]
   * - searchTerm: string
   * - ignoreCase: boolean = false
   * - excludedColumns: string[] = []
   *
   * Searches [data] parameter for [searchTerm] matches and returns a new array with them.
   */
  filterData(data: any[], searchTerm: string, ignoreCase: boolean = false, excludedColumns?: string[]): any[] {
    let filter: string = searchTerm ? (ignoreCase ? searchTerm.toLowerCase() : searchTerm) : '';
    if (filter) {
      data = data.filter((item: any) => {
        const res: any = Object.keys(item).find((key: string) => {
          if (!excludedColumns || excludedColumns.indexOf(key) === -1) {
            const preItemValue: string = '' + item[key];
            const itemValue: string = ignoreCase ? preItemValue.toLowerCase() : preItemValue;
            return itemValue.indexOf(filter) > -1;
          }
        });
        return !(typeof res === 'undefined');
      });
    }
    return data;
  }

  /**
   * params:
   * - data: any[]
   * - sortBy: string
   * - sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Ascending
   *
   * Sorts [data] parameter by [sortBy] and [sortOrder] and returns the sorted data.
   */
  sortData(data: any[], sortBy: string, sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Ascending): any[] {
    if (sortBy) {
      data = Array.from(data); // Change the array reference to trigger OnPush and not mutate original array
      data.sort((a: any, b: any) => {
        let compA: any = a[sortBy];
        let compB: any = b[sortBy];
        let direction: number = 0;
        if (!Number.isNaN(Number.parseFloat(compA)) && !Number.isNaN(Number.parseFloat(compB))) {
          direction = Number.parseFloat(compA) - Number.parseFloat(compB);
        } else {
          if (compA < compB) {
            direction = -1;
          } else if (compA > compB) {
            direction = 1;
          }
        }
        return direction * (sortOrder === TdDataTableSortingOrder.Descending ? -1 : 1);
      });
    }
    return data;
  }

  /**
   * params:
   * - data: any[]
   * - fromRow: number
   * - toRow: : number
   *
   * Returns a section of the [data] parameter starting from [fromRow] and ending in [toRow].
   */
  pageData(data: any[], fromRow: number, toRow: number): any[] {
    if (fromRow >= 1) {
      data = data.slice(fromRow - 1, toRow);
    }
    return data;
  }
}
