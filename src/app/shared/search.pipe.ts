import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})

export class SearchPipe implements PipeTransform {

  transform(items: any[], field: string, value: string) : any[]{
    if (!items){
      return [];
    }
    if (!field || !value){
      return items;
    }

    return items.filter( i => i[field] == value )



    
  }

}
