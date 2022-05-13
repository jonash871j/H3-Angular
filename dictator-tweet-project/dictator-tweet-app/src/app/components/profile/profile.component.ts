import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dictator } from 'src/app/interfaces/dictator';
import { DictatorService } from 'src/app/services/dictator.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute, private dictatorService : DictatorService) { }

  dictator : Dictator = {};

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log();
      this.dictatorService.getDictator(params['dictator']).subscribe((dictator : Dictator) => {
        this.dictator = dictator;
      });
    });
  }
}
