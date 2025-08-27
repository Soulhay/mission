import { TestBed } from '@angular/core/testing';

import { DataService } from './data';

describe('DataService', () => { // Changed 'Data' to 'DataService'
  let service: DataService; // Changed 'Data' to 'DataService'

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService); // Changed 'Data' to 'DataService'
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
