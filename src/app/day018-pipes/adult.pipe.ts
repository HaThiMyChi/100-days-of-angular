import { PipeTransform , Pipe} from "@angular/core";
@Pipe({
    name: 'adult',
    pure: false
  })

export class AdultPipe implements PipeTransform {
    transform(value:any) {
        return value.filter((x:any) => x.age > 18);
    }
}