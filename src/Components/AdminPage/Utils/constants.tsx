
import { RcFile } from "antd/es/upload";

export const ACTION_HANDLE = {
    EDIT: 'EDIT',
    ADD: 'ADD',
}

export const jwt_admin = localStorage.getItem("Token");

export const messageConfig = {
    top: 25,
    duration: 2,
    maxCount: 3,
}

export const resetUser = {
    Id: '',
    Username: '',
    Email: '',
    EmployeeNumber: '',
    AvatarPath: 'http://localhost:63642/Files/Avatar/default-user-profile.png',
    FirstName: '',
    LastName: '',
    Sex: true,
    Created: '',
    Birthday: '',
    JobTitle: '',
    Company: '',
    Unit: '',
    Function: '',
    SectionsOrTeam: '',
    Groups: '',
    OfficeLocation: '',
    LineManager: '',
    BelongToDepartments: '',
    Rank: '',
    EmployeeType: '',
    Rights: '',
    Nation: '',
    Phone: '',
    IdCardNumber: '',
    DateOfIdCard: '',
    PlaceOfIdCard: '',
    HealthInsurance: '',
    StartingDate: '',
    StartingDateOfficial: '',
    LeavingDate: '',
    StartDateMaternityLeave: '',
    Note: '',
    AcademicLevel: '',
    Qualification: '',
    BusinessPhone: '',
    HomePhone: '',
    PersonalEmail: '',
    BankName: '',
    BankBranchNumber: '',
    BankBranchName: '',
    BankAccountNumber: '',
    BankAccountName: '',
    Street: '',
    FlatNumber: '',
    City: '',
    Province: '',
    PostalCode: '',
    Country: '',
    MartialStatus: '',
    ContactName: '',
    Relationship: '',
    PhoneR: '',
    StreetR: '',
    FlatNumberR: '',
    CityR: '',
    ProvinceR: '',
    PostalCodeR: '',
    CountryR: '',
    Signature: '',
    RoleIdToAdd: '',
    UserRoles: {
        UserId: '',
        RoleId: '',
    },
    DepartmentMembers: {
        UserId: '',
        DepartmentId: '',
    },
    Roles: [],
    Departments: [],
    Password: ''
}

export const resetDepartment = {
    Id: '',
    Name: '',
    ContactInfo: '',
    Code: '',
    UnderDepartment: '',
    Description: '',
    Manager: '',
    Supervisors: [],
    ManEm: false,
    SupEm: false,
}

export const resetRole = {
    Id: '',
    Title: '',
}