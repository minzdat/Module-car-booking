import { User, Department, Role } from './interfaces'
/* export const userSampleData: User[] = [
    {
        Id: 1,
        Email: 'user1@example.com',
        roles: ['Admin', 'Editor'],
        departments: ['HR', 'Finance'],
    },
    {
        id: 2,
        email: 'user2@example.com',
        roles: ['Viewer'],
        departments: ['IT'],
    },
]; */

/* export const departmentSampleData: Department[] = [
    {
        Id: '1',
        Name: 'Human Resource',
        ContactInfo: 'HR',
        Code: 'D01',
        UnderDepartment: 'Opus Solution',
        Description: '<p>Chức năng</p><p>a) Tham mưu và giúp Giám đốc Sở thực hiện quản lý nhà nước về công nghệ thông tin-điện tử (CNTT-ĐT).</p><p>b) Tạo môi trường pháp lý, thể chế, chính sách, điều hành phối hợp, đào tạo, hợp tác quốc tế, thúc đẩy và hỗ trợ cho CNTT-ĐT phát triển.</p><p>c) Hỗ trợ doanh nghiệp, đặc biệt là các doanh nghiệp vừa và nhỏ, tham gia đầu tư, cung cấp sản phẩm, dịch vụ, phát triển thị trường và cùng tham gia với Chính quyền thành phố trong các hoạt động xây dựng và thực hiện các chính sách phát triển CNT</p>'
    },
    {
        Id: '2',
        Name: 'Infomation Technology',
        ContactInfo: 'IT',
        Code: 'D02',
        UnderDepartment: 'Opus Solution',
        Description: '<p>Chức năng</p><p>a) Tham mưu và giúp Giám đốc Sở thực hiện quản lý nhà nước về công nghệ thông tin-điện tử (CNTT-ĐT).</p><p>b) Tạo môi trường pháp lý, thể chế, chính sách, điều hành phối hợp, đào tạo, hợp tác quốc tế, thúc đẩy và hỗ trợ cho CNTT-ĐT phát triển.</p><p>c) Hỗ trợ doanh nghiệp, đặc biệt là các doanh nghiệp vừa và nhỏ, tham gia đầu tư, cung cấp sản phẩm, dịch vụ, phát triển thị trường và cùng tham gia với Chính quyền thành phố trong các hoạt động xây dựng và thực hiện các chính sách phát triển CNT</p>'
    }
]; */

export const roleSampleData: Role[] = [
    {
        Id: '1',
        Title: 'Admin'
    },
    {
        Id: '2',
        Title: 'Employee'
    }
]