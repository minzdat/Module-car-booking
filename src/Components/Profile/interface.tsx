import { RcFile } from "antd/lib/upload";
export interface API {
  EmployeeNumber: string;
  Username: string;
  Email: string;
  AvatarPath: string;
  FirstName: string;
  LastName: string;
  Sex: boolean;
  Birthday: string;
  JobTitle: string;
  Company: string;
  Unit: string;
  Function: string;
  SectionsOrTeam: string;
  Groups: string;
  OfficeLocation: string;
  LineManager: string;
  BelongToDepartments: string;
  Rank: string;
  EmployeeType: string;
  Rights: string;
  Nation: string;
  Phone: string;
  IdCardNumber: string;
  DateOfIdCard: string;
  PlaceOfIdCard: string;
  HealthInsurance: string;
  StartingDate: string;
  StartingDateOfficial: string;
  LeavingDate: string;
  StartDateMaternityLeave: string;
  Note: string;
  AcademicLevel: string;
  Qualification: string;
  BusinessPhone: string;
  HomePhone: string;
  PersonalEmail: string;
  BankName: string;
  BankBranchNumber: string;
  BankBranchName: string;
  BankAccountNumber: string;
  BankAccountName: string;
  Street: string;
  FlatNumber: string;
  City: string;
  Province: string;
  PostalCode: string;
  Country: string;
  MartialStatus: string;
  ContactName: string;
  Relationship: string;
  PhoneR: string;
  StreetR: string;
  FlatNumberR: string;
  CityR: string;
  ProvinceR: string;
  PostalCodeR: string;
  CountryR: string;
  Signature: string;
  SignatureTemp: string;
  // AvatarPathtemp: string;
}

export interface SignatureProps {
  isEditing: boolean;
  infoAPI: API
  setInfoAPI: React.Dispatch<React.SetStateAction<API>>;
}

export interface OverviewProps {
  isEditing: boolean;
  infoAPI: {
    EmployeeNumber: string;
    Username: string;
    Email: string;
    FirstName: string;
    LastName: string;
    Sex: boolean;
    Birthday: string;
    JobTitle: string;
    Company: string;
    Unit: string;
    Function: string;
    SectionsOrTeam: string;
    Groups: string;
    OfficeLocation: string;
    LineManager: string;
    BelongToDepartments: string;
    Rank: string;
    EmployeeType: string;
    Rights: string;
  };
  setInfoAPI: React.Dispatch<React.SetStateAction<API>>;
}
export interface AdditionalProps {
  isEditing: boolean;
  infoAPI: {
    Nation: string;
    Phone: string;
    IdCardNumber: string;
    DateOfIdCard: string;
    PlaceOfIdCard: string;
    HealthInsurance: string;
    StartingDate: string;
    StartingDateOfficial: string;
    LeavingDate: string;
    StartDateMaternityLeave: string;
    Note: string;
    AcademicLevel: string;
    Qualification: string;
    BusinessPhone: string;
    HomePhone: string;
    PersonalEmail: string;
    BankName: string;
    BankBranchNumber: string;
    BankBranchName: string;
    BankAccountNumber: string;
    BankAccountName: string;
    Street: string;
    FlatNumber: string;
    City: string;
    Province: string;
    PostalCode: string;
    Country: string;
  };
  setInfoAPI: React.Dispatch<React.SetStateAction<API>>;
}

export interface FamilyProps {
    isEditing: boolean;
    infoAPI: {
      MartialStatus: string;
      ContactName: string;
      Relationship: string;
      PhoneR: string;
      StreetR: string;
      FlatNumberR: string;
      CityR: string;
      ProvinceR: string;
      PostalCodeR: string;
      CountryR: string;
    };
    setInfoAPI: React.Dispatch<React.SetStateAction<API>>;
  }