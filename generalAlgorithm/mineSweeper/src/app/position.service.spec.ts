/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PositionService } from './position.service';

describe('PositionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PositionService]
    });
  });

  it('should ...', inject([PositionService], (service: PositionService) => {
    expect(service).toBeTruthy();
  }));
});
