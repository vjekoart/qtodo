import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageViewComponent } from './homepage-view.component';

describe('HomepageViewComponent', () => {
  let component: HomepageViewComponent;
  let fixture: ComponentFixture<HomepageViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
