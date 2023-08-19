import { EmpolyeeService } from '../empolyee.service';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'email',
    'status',
    'group',
    'actions'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _empService : EmpolyeeService,
    private _router : Router
  ) {}

  ngOnInit() {
    this.getEmployee()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getEmployee() {
    this._empService.getAllEmployee().subscribe({
      next : res => {
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
        console.log(res)
      },
      error : console.log
    })
  }

  getDetail(id : string) {
    this._router.navigateByUrl(`/employee/form/${id}`)
    return this._empService.getEmployeeDetail(id)
  }

  editEmployee(id: number) {
  }

  deleteEmployee(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this todo!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this._empService.deleteEmployee(id).subscribe(() => {
          this.getEmployee();
          Swal.fire('Deleted!', 'Your todo has been deleted.', 'success');
        });
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelled',
          'Your employee data is safe :)',
          'success'
        )
      }
    });
  }

}
