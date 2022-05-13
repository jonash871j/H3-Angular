import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Dictator } from 'src/app/interfaces/dictator';
import { DictatorService } from 'src/app/services/dictator.service';

@Component({
  selector: 'app-dictators',
  templateUrl: './dictators.component.html',
  styleUrls: ['./dictators.component.css']
})
export class DictatorsComponent implements OnInit {
  constructor(public dictatorService: DictatorService) {}

  $dictators : Observable<Dictator[]> = new Observable;
  selectedDictatorName : string = "";

  ngOnInit(): void {
    this.$dictators = this.dictatorService.getDictators();
  }
}
