import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPartidasComponent } from './dashboard-partidas.component';

describe('DashboardPartidasComponent', () => {
  let component: DashboardPartidasComponent;
  let fixture: ComponentFixture<DashboardPartidasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardPartidasComponent]
    });
    fixture = TestBed.createComponent(DashboardPartidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
