import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { DynamicContentOneComponent } from '../dynamic-content-one/dynamic-content-one.component';
import { DynamicContentTwoComponent } from '../dynamic-content-two/dynamic-content-two.component';

@Component({
  selector: 'app-example-container',
  templateUrl: './example-container.component.html',
  styleUrls: ['./example-container.component.scss']
})
export class ExampleContainerComponent implements OnInit {
  @ViewChild("dynamicComponent", {read: ViewContainerRef, static: true})
  containerRef!:  ViewContainerRef;

  constructor(private cfr: ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  // Tạo 1 ViewChild trong template. Ở đây là thẻ div #dynamicComponent. Đây sẽ là nơi chúng ta load những components vào ở runtime.
  // Connect #dynamicComponent thông qua @ViewChild. Chúng ta sẽ có 1 ViewContainerRef
  // Inject CompanyFactoryResolver của Angular vào component ExampleContainerComponent.
  // Dùng Resolver connect với component nào chúng ta muốn load dynamic. => Kết quả sẽ trả về 1 Component Factory
  // Dùng ViewContainerRef với Component Factory chúng ta vừa tạo ở trên để load Dynamic Component.

  // Step 4: Add các dynamic components vào entryComponents
  // entryComponents: [DynamicContentOneComponent, DynamicContentTwoComponent],
  async adDynamicCompOne() {
    const {DynamicContentOneComponent} = await import('../dynamic-content-one/dynamic-content-one.component');
    const componentFactory = this.cfr.resolveComponentFactory(
      DynamicContentOneComponent
    );
    const componentRef = this.containerRef.createComponent(componentFactory);
    componentRef.instance.data = "INPUT DATA 1"
  }

  async addDynamicCompTwo() {
    const { DynamicContentTwoComponent } = await import('../dynamic-content-two/dynamic-content-two.component');
    const componentFactory = this.cfr.resolveComponentFactory(
      DynamicContentTwoComponent
    );
    const componentRef = this.containerRef.createComponent(componentFactory);
  }

  clearDynamicComp() {
    this.containerRef.clear();
  }

}
