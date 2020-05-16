import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.css"],
})
export class ModalComponent implements OnInit {
  constructor() {}
  @Input() title: String;
  @Output() closeModal = new EventEmitter<any>();
  onClose() {
    this.closeModal.emit();
  }
  ngOnInit() {}
}
