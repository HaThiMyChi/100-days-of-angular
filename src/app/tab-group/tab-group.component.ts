import { Component, OnInit, Input, Output, EventEmitter, ContentChildren, QueryList } from '@angular/core';
import { TabPanelComponent } from '../tab-panel/tab-panel.component';

@Component({
  selector: 'app-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss']
})
export class TabGroupComponent implements OnInit {
  tabPanelList: TabPanelComponent[] = [];

  @Input() tabActiveIndex = 0;
  @Output() tabActiveIndexChange = new EventEmitter<number>();

  @ContentChildren(TabPanelComponent) tabPanels!: QueryList<TabPanelComponent>;

  ngAfterContentInit() {
    console.log(this.tabPanels);
    this.tabPanels.changes.subscribe(console.log);
  }

  constructor() { }

  ngOnInit(): void {
  }

  // selectItem(idx: number) {
  //   this.tabActiveIndex = idx;
  //   this.tabActiveChange.emit(idx);
  // }

  // addTabPanel(tab: TabPanelComponent) {
  //   this.tabPanelList.push(tab);
  // }

  // removeTabPanel(tab: TabPanelComponent) {
  //   let index = -1;
  //   const tabPanelList: TabPanelComponent[] = [];
  //   this.tabPanelList.forEach((item, idx) => {
  //     if (tab === item) {
  //       index = idx;
  //       return;

  //     }
  //     tabPanelList.push(item);
  //   });
  //   this.tabPanelList = tabPanelList;
  //   if (index !== -1) {
  //     this.selectItem(0);
  //   }
  // }

  addTab(tab: TabPanelComponent) {
    this.tabPanelList = [...this.tabPanelList, tab];
  }

  removeTab(tab: TabPanelComponent) {
    let found = -1;
    this.tabPanelList = this.tabPanelList.filter((tp, index) => {
      if (tp === tab) {
        found = index;
        return false;
      }
      return true;
    });

    if (found === this.tabActiveIndex) {
      // neu no xoa cai hien tai thi no nhay len kieu la -1 di, con k co thi no lay cai chinh no
      this.tabActiveIndexChange.emit(found === this.tabPanelList.length ? found - 1 : found);
    }
  }

}
