import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "stripHtml",
})
export class StripHtmlPipe implements PipeTransform {
    transform(value: string | null): any {
        return value?.replace(/<.*?>/g, "").replace(/&nbsp;/g, " "); // replace tags
    }
}
