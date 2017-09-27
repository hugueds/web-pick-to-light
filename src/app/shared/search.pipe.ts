import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})

export class SearchPipe implements PipeTransform {

  transform(items: any[], filterName: any) : any[]{
    
    if (!items){
      return [];
    }
    if (!filterName){
      return items;
    }

    
    
  }

}
