import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Perro } from './perro';

describe('Perro', () => {
  let component: Perro;
  let fixture: ComponentFixture<Perro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Perro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Perro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
