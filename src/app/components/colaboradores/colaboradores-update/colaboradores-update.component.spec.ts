import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaboradoresUpdateComponent } from './colaboradores-update.component';

describe('ColaboradoresUpdateComponent', () => {
  let component: ColaboradoresUpdateComponent;
  let fixture: ComponentFixture<ColaboradoresUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColaboradoresUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColaboradoresUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
