import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-media-card',
  templateUrl: './media-card.component.html',
  styleUrls: ['./media-card.component.scss']
})
export class MediaCardComponent implements OnInit {
  @Input() id = ""
  @Input() thumbnail = ""
  @Input() title = ""
  @Input() date = ""
  @Input() category = ""
  @Input() description = ""

  constructor() { }

  ngOnInit(): void {
  }

}
