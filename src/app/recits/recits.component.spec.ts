import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecitsComponent } from './recits.component';

describe('RecitsComponent', () => {
  let component: RecitsComponent;
  let fixture: ComponentFixture<RecitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecitsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
