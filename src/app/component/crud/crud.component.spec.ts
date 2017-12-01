import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgModule } from '@angular/core';
import { CrudComponent } from './crud.component';
import { Department } from '../../shared/form-model';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { FormService } from '../../shared/form-service';
class MockFormService  {
  
      constructor() {
          
      }
  
      // testContacts:Department = new Department();
      // testContacts.id=1;
      // testContacts.name='Sales';
  
      // public getContacts(): Observable<Array<Contact>> {
      //     return Observable.of(this.testContacts);
      // }
  }
describe("Department Crud", () => {
  
  let fixture: ComponentFixture<CrudComponent>,
    app: CrudComponent;
   let formService:FormService;
  let httpClient:HttpClient;
  let formServiceStub:FormService;
  let Promise;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CrudComponent],
       imports: [FormsModule],
       providers: [FormService,HttpClient,
        [ {provide: FormService, useValue: formServiceStub} ]]
       
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(CrudComponent);
    app = fixture.componentInstance;
   formService= fixture.debugElement.injector.get(FormService);

  });
  it("should define all the properties", () => {
    expect(app.showAddPanel).toBeDefined();
    expect(app.showAddPanel).toBeFalsy();
    expect(app.departments).toBeDefined();
    expect(app.departments.length).toEqual(0);
  });

  it('should define all the methods', () => {
    expect(app.AddDepartment).toBeDefined();
    expect(app.AddForm).toBeDefined();
  });
  fit('should call loaddepartment',()=>{
    //spyOn((<any>app),'loadDepartments')
    spyOn(formService,'getDepartment').and.returnValue(Promise.resolve({id:1,name:'sales'}));
    (<any>app).loadDepartments();
    expect((<any>app).getDepartment).toHaveBeenCalled();
   
  })
  it('should succeed when input value is valid to AddDepartment',()=>{
     
    spyOn(formService,'saveDepartment');
    app.AddDepartment('Sales');
    let empObj=new Department();
     
    expect(app.deptId).toBe(0);
    expect(empObj.name).toEqual('Sales');
  })

  it('should clear when call clearForm()', () => {
    app.deptId = 10;
    app.deptName = "HR";
    app.clearForm();
    expect(app.deptId).toBeUndefined();
    expect(app.deptName).toBeUndefined();
  });
  it("should fail, when pass undefined value to editRow()", () => {
    expect(app.editRow(undefined)).toThrowError("Invalid input value")
  })
  it('should success when the input value is valid when call editRow()', () => {
    spyOn(app, "AddForm");
    spyOn(app, "editRow");
    app.editRow({ name: "HR", id: 1 });
    expect(app.editRow).toHaveBeenCalledWith({ name: "HR", id: 1 });
    expect(app.showAddPanel).toBeFalsy();
    expect(app.AddForm).toHaveBeenCalled();
    expect(app.deptId).toBe(1);
    expect(app.deptName).toBe("HR");
  });

  // // it('should fail when the AddForm throw error when call editRow()', () => {
  // //   spyOn(app, "AddForm").and.throwError("I'm failed");
  // //   spyOn(app, "editRow");
  // //   spyOn(app, "clearForm");
  // //   spyOn(console, "error");
  // //   app.editRow({ name: "HR", id: 1 });
  // //   expect(app.editRow).toHaveBeenCalledWith({ name: "HR", id: 1 });
  // //   expect(app.showAddPanel).toBeFalsy();
  // //   expect(app.AddForm).toHaveBeenCalled();
  // //   expect(app.deptId).toBe(1);
  // //   expect(app.deptName).toBe("HR");
  // //   expect(app.editRow).toThrowError("I'm failed")
  // // });
  // it('should fail when the AddForm throw error when call editRow()', () => {
  //   spyOn(app, "AddForm");
  //   spyOn(app, "editRow");
  //   spyOn(app, "clearForm").and.throwError("I'm failed");
  //   spyOn(console, "error");
  //   app.editRow({ name: "HR", id: 1 });
  // });
  // it('should call department', () => {
  //   spyOn((<any>app), "loadDepartments");
  //   app["loadDepartments"]();
  //   (<any>app).loadDepartments
  // });
   it("", () => {
    app.ngOnInit();
     (app).deleteRow(2);
   });
});



