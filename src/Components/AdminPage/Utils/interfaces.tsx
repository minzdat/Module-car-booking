import { FormInstance } from "antd";
import { RcFile } from "antd/es/upload";
import React from "react";

export interface User {
    Id: string,
    Username: string,
    Email: string,
    EmployeeNumber: string,
    AvatarPath: string,
    FirstName: string,
    LastName: string,
    Sex: Boolean,
    Created: string,
    Birthday: string,
    JobTitle: string,
    Company: string,
    Unit: string,
    Function: string,
    SectionsOrTeam: string,
    Groups: string,
    OfficeLocation: string,
    LineManager: string,
    BelongToDepartments: string,
    Rank: string,
    EmployeeType: string,
    Rights: string,
    Nation: string,
    Phone: string,
    IdCardNumber: string,
    DateOfIdCard: string,
    PlaceOfIdCard: string,
    HealthInsurance: string,
    StartingDate: string,
    StartingDateOfficial: string,
    LeavingDate: string,
    StartDateMaternityLeave: string,
    Note: string,
    AcademicLevel: string,
    Qualification: string,
    BusinessPhone: string,
    HomePhone: string,
    PersonalEmail: string,
    BankName: string,
    BankBranchNumber: string,
    BankBranchName: string,
    BankAccountNumber: string,
    BankAccountName: string,
    Street: string,
    FlatNumber: string,
    City: string,
    Province: string,
    PostalCode: string,
    Country: string,
    MartialStatus: string,
    ContactName: string,
    Relationship: string,
    PhoneR: string,
    StreetR: string,
    FlatNumberR: string,
    CityR: string,
    ProvinceR: string,
    PostalCodeR: string,
    CountryR: string,
    Signature: string,
    RoleIdToAdd: string,
    UserRoles: {
        UserId: string,
        RoleId: string,
    },
    DepartmentMembers: {
        UserId: string,
        DepartmentId: string,
    },
    Roles: string[],
    Departments: string[],
    Password: string,
}

export interface UserRoles {
    UserId: string,
    RoleId: string,
}

export interface DepartmentMembers {
    UserId: string,
    DepartmentId: string,
}

export interface ByIdDepartment {
    Id: string,
    Position: string,
    User: {
        Id: string,
        FirstName: string,
        LastName: string,
        Username: string,
        Email: string,
        JobTitle: string,
        FullName: string,
    },
    Department: {
        Id: string,
        Name: string
    }
}

export interface UserFormProps {
    selectedUser: User;
    setSelectedUser: React.Dispatch<React.SetStateAction<User>>;
    onSave: (values: User, file: RcFile) => void;
    form: FormInstance<User>;
    action: string;
}

export interface Department {
    Id: string,
    Name: string,
    ContactInfo: string,
    Code: string,
    UnderDepartment: string,
    Description: string,
    Manager: string,
    Supervisors: string[]
    ManEm: boolean,
    SupEm: boolean,
}

export interface DepartmentFormProps {
    selectedDepartment: Department;
    setDepartment: React.Dispatch<React.SetStateAction<Department>>;
    onSave: (values: Department) => void;
    form: FormInstance<Department>;
    action: string;
}

export interface Role {
    Id: string,
    Title: string,
}

export interface RoleFormProps {
    selectedRole: Role;
    setSelectedRole: React.Dispatch<React.SetStateAction<Role>>;
    onSave: (values: Role) => void;
    form: FormInstance<Role>;
}

export interface FileObject {
    file: any
}