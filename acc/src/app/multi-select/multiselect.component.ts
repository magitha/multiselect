import {
    Component,
    Input
  } from '@angular/core';
  import { ListItem, DropdownSettings } from './multiselect.model';

  
  @Component({
    selector: 'multiselect-dropdown',
    templateUrl: './multiselect.component.html',
    styleUrls: ['./multiselect.component.scss']
  })
  export class MultiSelectComponent{
    public _settings: DropdownSettings;
    public _data: Array<ListItem> = [];
    public selectedItems: Array<ListItem> = [];
    _placeholder = 'Select';
    defaultSettings: DropdownSettings = {
      idField: 'id',
      textField: 'text',
      enableCheckAll: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      limitSelection: -1,
      itemsShowLimit: 999999999999,
      noDataAvailablePlaceholderText: 'No data available',
      defaultOpen: false
    };
  
    @Input()
    public set placeholder(value: string) {
      if (value) {
        this._placeholder = value;
      } else {
        this._placeholder = 'Select';
      }
    }
    @Input()
    disabled = false;
  
    @Input()
    public set settings(value: DropdownSettings) {
      if (value) {
        this._settings = Object.assign(this.defaultSettings, value);
      } else {
        this._settings = Object.assign(this.defaultSettings);
      }
    }
  
    @Input()
    public set data(value: Array<any>) {
      if (!value) {
        this._data = [];
      } else {

        this._data = value.map(
          (item: any) =>
            typeof item === 'string'
              ? new ListItem(item)
              : new ListItem({
                  id: item[this._settings.idField],
                  text: item[this._settings.textField]
                })
        );
      }
    }
  
 
  
  
  
 
  
  
    onItemClick($event: any, item: ListItem) {
      if (this.disabled) {
        return false;
      }
  
      const found = this.isSelected(item);
      const allowAdd =
        this._settings.limitSelection === -1 ||
        (this._settings.limitSelection > 0 &&
          this.selectedItems.length < this._settings.limitSelection);
      if (!found) {
        if (allowAdd) {
          this.addSelected(item);
        }
      } else {
        this.removeSelected(item);
      }
      if (
        this._settings.singleSelection &&
        this._settings.closeDropDownOnSelection
      ) {
        this.closeDropdown();
      }
    }
  
  
   
  
  
   
  
    isSelected(clickedItem: ListItem) {
      let found = false;
      this.selectedItems.forEach(item => {
        if (clickedItem.id === item.id) {
          found = true;
        }
      });
      return found;
    }
  
    isLimitSelectionReached(): boolean {
      return this._settings.limitSelection === this.selectedItems.length;
    }
  
    isAllItemsSelected(): boolean {
      return this._data.length === this.selectedItems.length;
    }
  
    
    itemShowRemaining(): number {
      return this.selectedItems.length - this._settings.itemsShowLimit;
    }
  
    addSelected(item: ListItem) {
      if (this._settings.singleSelection) {
        this.selectedItems = [];
        this.selectedItems.push(item);
      } else {
        this.selectedItems.push(item);
      }
  
    }
  
    removeSelected(itemSel: ListItem) {
      this.selectedItems.forEach(item => {
        if (itemSel.id === item.id) {
          this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
        }
      });

    }
  
    
  
    toggleDropdown(evt) {
      evt.preventDefault();
    
      this._settings.defaultOpen = !this._settings.defaultOpen;
    
    }
  
    closeDropdown() {
      this._settings.defaultOpen = false;
    }
  
    toggleSelectAll() {
      if (this.disabled) {
        return false;
      }
      if (!this.isAllItemsSelected()) {
        this.selectedItems = this._data.slice();
      } else {
        this.selectedItems = [];
      }
    }
  }