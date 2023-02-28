import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(data: any[] | undefined, key: string, search: string = ''): any {
    if(!data) { return data }

    if(!search.trim()) { return data }

    return data.filter(obj => obj[key].toLowerCase().includes(search.toLowerCase()))
  }
}
