import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, Row, Col, Typography, Radio, DatePicker, FormInstance } from 'antd';


interface User {
    id: number;
    email: string;
    roles: string[];
    departments: string[];
  }

interface UserFormProps {
    initialValues: User;
    onSave: (values: User) => void;
    form: FormInstance<any>;
  }

const UserForm: React.FC<UserFormProps> = ({ initialValues, onSave, form }) => {
    const handleSubmit = () => {
      form.validateFields().then((values) => {
        onSave(values as User);
      });
    };

    useEffect(() => {
        form.resetFields()
    }, [initialValues])
  
    const handleFormReset = () => {
      form.resetFields()
    }

    const handleForSubmit = (values: User) => {
        console.log(values);
    }
  
    return (
      <Form onFinish={handleForSubmit} form={form} initialValues={initialValues} layout="horizontal" style={{ minWidth: '600px' }}>
        <Form.Item>
          <Button onClick={handleFormReset} style={{ marginLeft: 8 }}>
            Reset
          </Button>
        </Form.Item>
        <Form.Item label="Roles" name="roles" rules={[{ required: true, message: 'Please select roles' }]}>
          <Select mode="multiple">
            <Select.Option value="Admin">Admin</Select.Option>
            <Select.Option value="Editor">Editor</Select.Option>
            <Select.Option value="Viewer">Viewer</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Departments" name="departments" rules={[{ required: true, message: 'Please select departments' }]}>
          <Select mode="multiple">
            <Select.Option value="HR">HR</Select.Option>
            <Select.Option value="Finance">Finance</Select.Option>
            <Select.Option value="IT">IT</Select.Option>
          </Select>
        </Form.Item>
  
        {/* 1 */}
        <Typography.Title level={4}>Overview</Typography.Title>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Username" name="Username" rules={[{ required: true, message: 'Please enter the email' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter the email' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="First name" name="FirstName" rules={[{ required: true, message: 'Please enter the email' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Last name" name="LastName" rules={[{ required: true, message: 'Please enter the email' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Employee number" name="EmployeeNumber" rules={[{ required: true, message: 'Please enter the email' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Job title" name="JobTitle" rules={[{ required: true, message: 'Please enter the email' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Birthday" name="Birthday" rules={[{ required: true, message: 'Please enter the email' }]}>
              <DatePicker style={{float: 'right'}} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Gender" name="Sex" rules={[{ required: true, message: 'Please enter the email' }]}>
              <Radio.Group style={{float: 'right'}}>
                <Radio value="true">Male</Radio>
                <Radio value="false">Female</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Company" name="Company" rules={[{ required: true, message: 'Please enter the email' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Office location" name="OfficeLocation" rules={[{ required: true, message: 'Please enter the email' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Line manager" name="LineManager" rules={[{ required: true, message: 'Please enter the email' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Cost center" name="CostCenter" rules={[{ required: true, message: 'Please enter the email' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={24}>
            <Form.Item label="Belong to departments" name="BelongToDepartments" rules={[{ required: true, message: 'Please enter the email' }]}>
              <Select mode="multiple">
                <Select.Option value="Admin">Admin</Select.Option>
                <Select.Option value="Editor">Editor</Select.Option>
                <Select.Option value="Viewer">Viewer</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Groups" name="Groups" rules={[{ required: true, message: 'Please enter the email' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Sections/Teams" name="SectionsOrTeam" rules={[{ required: true, message: 'Please enter the email' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Unit" name="Unit" rules={[{ required: true, message: 'Please enter the email' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Function" name="Function" rules={[{ required: true, message: 'Please enter the email' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
  
        {/* 2 */}
        <Typography.Title level={4}>Additional</Typography.Title>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Nation" name="Nation" rules={[{ required: true, message: 'Please enter the email' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Id card number" name="IdCardNumber" rules={[{ required: true, message: 'Please enter the email' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Date of ID card" name="DateOfIdCard" rules={[{ required: true, message: 'Please enter the email' }]}>
              <DatePicker style={{float: 'right'}} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Place of ID card" name="PlaceOfIdCard" rules={[{ required: true, message: 'Please enter the email' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Health insurance" name="HealthInsurance" rules={[{ required: true, message: 'Please enter the email' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Phone" name="Phone" rules={[{ required: true, message: 'Please enter the email' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Starting date" name="StartingDate" rules={[{ required: true, message: 'Please enter the email' }]}>
              <DatePicker style={{float: 'right'}} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Starting date offical" name="StartingDateOfficial" rules={[{ required: true, message: 'Please enter the email' }]}>
              <DatePicker style={{float: 'right'}} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Leaving date" name="LeavingDate" rules={[{ required: true, message: 'Please enter the email' }]}>
              <DatePicker style={{float: 'right'}} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={24}>
            <Form.Item label="Start date maternity leave (for just female)" name="StartingDateOfficial" rules={[{ required: true, message: 'Please enter the email' }]}>
              <DatePicker style={{float: 'right'}} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
        <Col span={12}>
            <Form.Item label="Note" name="Note" rules={[{ required: true, message: 'Please enter the email' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
  
        <Typography.Title level={5}>Literacy</Typography.Title>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Academic level" name="AcademicLevel" rules={[{ required: true, message: 'Please enter the email' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Specialized qualification" name="Qualification" rules={[{ required: true, message: 'Please enter the email' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
  
        <Typography.Title level={5}>Contact Info</Typography.Title>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Business phone" name="BusinessPhone" rules={[{ required: true, message: 'Please enter the email' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Home phone" name="HomePhone" rules={[{ required: true, message: 'Please enter the email' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Personal email" name="Personal email" rules={[{ required: true, message: 'Please enter the email' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
  
        <Typography.Title level={5}>Contact Info</Typography.Title>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Bank Name" name="BankName" rules={[{ required: true, message: 'Please enter the email' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Branch number" name="BankBranchNumber" rules={[{ required: true, message: 'Please enter the email' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Bank brach name" name="BankBranchName" rules={[{ required: true, message: 'Please enter the email' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Bank account number" name="BankAccountNumber" rules={[{ required: true, message: 'Please enter the email' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Bank account name" name="BankAccountName" rules={[{ required: true, message: 'Please enter the email' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Typography.Title level={5}>Address</Typography.Title>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Street" name="Street" rules={[{ required: true, message: 'Please enter the email' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Building / Flat number" name="FlatNumber" rules={[{ required: true, message: 'Please enter the email' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="City" name="City" rules={[{ required: true, message: 'Please enter the email' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Province / State" name="Province" rules={[{ required: true, message: 'Please enter the email' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Postal code" name="PostalCode" rules={[{ required: true, message: 'Please enter the email' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Country" name="Country" rules={[{ required: true, message: 'Please enter the email' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
  
        {/* 3 */}
        <Typography.Title level={4}>Family</Typography.Title>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Martial status" name="MartialStatus" rules={[{ required: true, message: 'Please enter the email' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Typography.Title level={5}>Emergency contact</Typography.Title>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Contact name" name="ContactName" rules={[{ required: true, message: 'Please enter the email' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Relationship" name="Relationship" rules={[{ required: true, message: 'Please enter the email' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Phone" name="PhoneR" rules={[{ required: true, message: 'Please enter the email' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
  
        <Typography.Title level={5}>Permanent Address</Typography.Title>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Street" name="StreetR" rules={[{ required: true, message: 'Please enter the email' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Building / Flat number" name="FlatNumberR" rules={[{ required: true, message: 'Please enter the email' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="City" name="CityR" rules={[{ required: true, message: 'Please enter the email' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Province / State" name="FlatNumberR" rules={[{ required: true, message: 'Please enter the email' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Postal code" name="CityR" rules={[{ required: true, message: 'Please enter the email' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Country" name="CountryR" rules={[{ required: true, message: 'Please enter the email' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Signature" name="Signature" rules={[{ required: true, message: 'Please enter the email' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
  
  
        {/* save */}
        <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
          <Button size='large' type="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Form.Item>
      </Form>
    );
};

export default UserForm;