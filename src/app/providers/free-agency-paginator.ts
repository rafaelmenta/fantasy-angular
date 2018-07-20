import { MatPaginatorIntl } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class FreeAgencyPaginator extends MatPaginatorIntl {

  itemsPerPageLabel = 'Jogadores por página';
  nextPageLabel = 'Próxima página';
  previousPageLabel = 'Página anterior';
  firstPageLabel = 'Primeira página';
  lastPageLabel = 'Última pagina';

  getRangeLabel = function (page: number, pageSize: number, length: number) {
    let max = page * pageSize + pageSize;
    if (max > length) {
      max = length;
    }

    return `Exibindo ${page * pageSize + 1} - ${max} de ${length}`;
  };

}
