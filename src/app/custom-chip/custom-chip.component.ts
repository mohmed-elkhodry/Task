import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, ElementRef, Input, OnInit, ViewChild,HostListener } from '@angular/core';
import { Ioption } from './option.interface';

@Component({
  selector: 'custom-chip',
  templateUrl: './custom-chip.component.html',
  styleUrls: ['./custom-chip.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CustomChipComponent,
      multi: true,
    },
  ],
})


export class CustomChipComponent implements OnInit, ControlValueAccessor {
  ENTER_KEY_CODE = 13;
  DOWN_ARROW_KEY_CODE = 40;
  UP_ARROW_KEY_CODE = 38;
  ESCAPE_KEY_CODE = 27;
  @HostListener("document:keyup", ['$event']) onKeyup(event: KeyboardEvent){
    if(this.isShowSuggestions){
      switch (event.keyCode) {
        case this.ENTER_KEY_CODE:
          this.setSelectedListItem();
          this.isShowSuggestions = false;
          return;

        case this.DOWN_ARROW_KEY_CODE:
          this.focusNextListItem(this.DOWN_ARROW_KEY_CODE);
          return;

        case this.UP_ARROW_KEY_CODE:
          this.focusNextListItem(this.UP_ARROW_KEY_CODE);
          return;

        case this.ESCAPE_KEY_CODE:
          this.isShowSuggestions = false
          return;

        default:
          return;
      }
    }
  }
  private setSelectedListItem() {
    const focusedElement = document.querySelector(".suggestions li.focus") as HTMLElement;
    if (focusedElement){
      focusedElement.click()
    }
  }
  private focusNextListItem(ARROW_KEY_CODE: any) {
    const lis = document.querySelectorAll(".suggestions li");
    const Focusedlis = document.querySelectorAll(".suggestions li.focus");
      if (Focusedlis.length === 0) {
        lis[0].classList.add("focus")
      } else {
        const activeFocus = +Focusedlis[0].getAttribute("tabIndex")!;
        Focusedlis[0].classList.remove("focus");
        const nextIndex = ARROW_KEY_CODE === this.DOWN_ARROW_KEY_CODE ? activeFocus + 1 : activeFocus - 1
        const nextElement = document.querySelector(`.suggestions li[tabIndex='${nextIndex}']`);
        if (nextElement) {
          nextElement?.classList.add("focus")
        }

    }
  }
  @Input() items: Ioption[] = [];
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @ViewChild('searchInput')
  searchInout!: ElementRef;
  public filteredItems: Ioption[] = [];
  public isShowSuggestions: boolean = false;
  public SelectedTags: Ioption[] = [];
  private onChange = (value: Ioption[]) => { };
  private onTouched = () => { };



  constructor() {}
  writeValue(obj: any): void {
    this.onChange(obj);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public ShowSuggestions(evt: Event) {
    const inputVal = (evt.target as HTMLInputElement).value;
    if (inputVal) this.isShowSuggestions = true;
    else {
      this.isShowSuggestions = false;
      return;
    }
    this.filter(inputVal);
  }

  private filter(val: string) {
    this.filteredItems = this.items.filter(
      (opt) =>
        opt.label.toLowerCase().startsWith(val.toLowerCase()) &&
        this.SelectedTags.findIndex(
          (slectedOpt) => slectedOpt.id === opt.id
        ) === -1
    );
  }

  public addItemToSelectedTags(item: Ioption) {
    this.SelectedTags.push(item);
    //reset input after selection
    (this.searchInout.nativeElement as HTMLInputElement).value = '';
    this.isShowSuggestions = false;
    this.onChange(this.SelectedTags)
  }
  public removeItemFromSelectedTags(id: number) {
    this.SelectedTags = this.SelectedTags.filter((opt) => opt.id != id);
    this.onChange(this.SelectedTags)
  }

  public trackByFn(index:number,item:Ioption) {
    return item.id;
  }

  dummy(){
    console.log("hhh")
  }

  ngOnInit(): void {}
}
