import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-movie-trailer',
  templateUrl: './movie-trailer.component.html',
  styleUrls: ['./movie-trailer.component.css']
})
export class MovieTrailerComponent {
  @Input() trailerLink: any;
  @Output() close: EventEmitter<any> = new EventEmitter;



  onClose() {
    this.close.emit()
  }
}
