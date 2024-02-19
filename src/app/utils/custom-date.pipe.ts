import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'customDate',
  standalone: true,
})

export class CustomDatePipe implements PipeTransform {
  
  transform(value: Date) {
    return Intl.DateTimeFormat('pl').format(value)
  }

}