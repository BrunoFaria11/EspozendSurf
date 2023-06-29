import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBanner',
})
export class FilterBannerPipe implements PipeTransform {
  transform(values: any[], ...args: unknown[]): any[] {
    return values.filter((v) => v.isToShow);
  }
}
