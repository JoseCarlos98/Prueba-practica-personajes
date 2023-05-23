import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime, startWith, takeUntil } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit, AfterViewInit, OnDestroy {
  
  onDestroy = new Subject<void>();

  filterName = new FormControl({ value: '', disabled: false });
  filterSpecie = new FormControl({ value: '', disabled: false });
  filterGender = new FormControl({ value: 'todos', disabled: false });
  filterEstatus = new FormControl({ value: 'todos', disabled: false });
  filterType = new FormControl({ value: '', disabled: false });

  characters: any[] = [];
  charactersFilters: any[] = [];

  constructor( private apiServices: ApiService ) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.insertDataTable();
    this.insertFilters()
  }

  insertFilters() {
    combineLatest([
      this.filterName.valueChanges.pipe(startWith('')),
      this.filterSpecie.valueChanges.pipe(startWith('')),
      this.filterType.valueChanges.pipe(startWith('')),
      this.filterGender.valueChanges.pipe(startWith('')),
      this.filterEstatus.valueChanges.pipe(startWith(''))
    ]).pipe(
      debounceTime(500),
      takeUntil(this.onDestroy)
    ).subscribe(() => {
      this.insertDataTable();
    });
  }

  getFiltros() {
    let params = new HttpParams();

    if (this.filterName.value) params = params.append('name', this.filterName.value);
    if (this.filterSpecie.value) params = params.append('species', this.filterSpecie.value);
    if (this.filterEstatus.value != 'todos') params = params.append('status', this.filterEstatus.value);
    if (this.filterGender.value != 'todos') params = params.append('gender', this.filterGender.value);
    
    return params
  }

  insertDataTable() {
    this.apiServices.getDataObject(this.getFiltros()).pipe(takeUntil(this.onDestroy)).subscribe((data:any) => {
      if (data.error) this.characters = [];
        else this.characters = data.results;
   })
  }

  cleanFilters() {
    this.filterName.patchValue('')
    this.filterSpecie.patchValue('')
    this.filterEstatus.patchValue('todos')
    this.filterGender.patchValue('todos')

  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}