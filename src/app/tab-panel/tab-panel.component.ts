import { Component, OnDestroy, OnInit, Input, ViewChild, TemplateRef, ContentChild} from '@angular/core';
import { TabGroupComponent } from '../tab-group/tab-group.component';
import { TabContentDirective } from './tab-content.directive';

@Component({
  selector: 'app-tab-panel',
  templateUrl: './tab-panel.component.html',
  styleUrls: ['./tab-panel.component.scss']
})
export class TabPanelComponent implements OnInit, OnDestroy {
  @Input() title!: string;
  @ViewChild(TemplateRef, {static: true}) implicitBody!: TemplateRef<unknown>; // dung de render cho ng-content do no wrap trong ng-template
  @ContentChild(TabContentDirective, {static: true, read: TemplateRef}) explicitBody!: TemplateRef<unknown>;
  constructor(private tabGroup: TabGroupComponent) { } // dung de injection

  get panelBody(): TemplateRef<unknown> {
    return this.explicitBody || this.implicitBody;
  }
  ngOnInit(): void {
    console.log(this.explicitBody);
    this.tabGroup.addTab(this);
  }

  ngOnDestroy(): void {
    this.tabGroup.removeTab(this);
  }

}
