import { Pipe, PipeTransform } from '@angular/core';

// {{ contact.dob | age }}
// --> 45 years

// {{ contact.dob | age : 1 }}
// --> 45 years

// {{ contact.dob | age : 2 }}
// --> 45 years and 4 months

// {{ contact.dob | age : 3 }}
// --> 45 years and 4 months and 7 days

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(dob: string, flag?: number): any {
    
    if (!dob) {
      return '';
    }

    let dt1 = new Date(dob);
    let diff = Date.now() - dt1.getTime();
    let dt2 = new Date(diff);
    let year = dt2.getFullYear() - 1970;
    let month = dt2.getMonth();
    let days = dt2.getDate();

    let output = '';
    switch (flag) {
      case 2:
        output = `${ year } years and ${ month } months`;
        break;
      case 3:
        output = `${ year } years and ${ month } months and ${ days} days`;
        break;
      case 1:
      default:
        output = `${ year } years`;
    }

    return output;

  }

}
