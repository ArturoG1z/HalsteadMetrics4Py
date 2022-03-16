import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Input() isBackShown: boolean;
  @Input() isAboutShown: boolean;
  @Input() isAboutDisabled = false;
  @Input() isToggleShown: boolean;
  @Input() isHomePage = false;
  @Input() isDBPage = false;
  @Output() clickToggle = new EventEmitter<boolean>();
  isEditable = false;
  constructor(
  ) {}

  ngOnInit() {}

  toggle() {
    this.isEditable = !this.isEditable;
    this.clickToggle.emit(this.isEditable);
  }
}
