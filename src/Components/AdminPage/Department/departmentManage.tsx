import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Typography, Input, message, Select, Pagination, Checkbox, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Department, DepartmentFormProps, ByIdDepartment } from '../Utils/interfaces';
import * as util from '../Utils'
import axios from 'axios';
import './departmentManage.scss'
import { ACTION_HANDLE, resetDepartment } from '../Utils';
import request from '../../../Utils/request';

const DepartmentManage: React.FC = () => {

  message.config(util.messageConfig)
  const columns = [
    {
      title: 'Id',
      dataIndex: 'Id',
      key: 'Id',
    },
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
    },
    {
      title: 'Contact Info',
      dataIndex: 'ContactInfo',
      key: 'ContactInfo',
    },
    {
      title: 'Code',
      dataIndex: 'Code',
      key: 'Code',
    },
    {
      title: 'Under Department',
      dataIndex: 'UnderDepartment',
      key: 'UnderDepartment',
    },
    {
      title: 'Description',
      dataIndex: 'Description',
      key: 'Description',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: Department) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="link" onClick={() => handleDelete(record.Id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  const [departments, setDepartments] = useState<Department[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department>(resetDepartment);
  const [action, setAction] = useState<string>('');
  const [form] = Form.useForm<any>();
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(5);
  const [isLoading, setIsLoading] = useState(true)

  const getDepartments = async () => {
    let res = await axios.get(`http://localhost:63642/api/department/all?page=${currentPage}&limit=${limit}`)
    console.log('>>check res department:', res)
    if (res.data.Success) {
      setTotal(res.data.Data.TotalPage);
      let data: Department[] = res.data.Data.ListData
      data.forEach(d => {
        d.ManEm = false
        d.SupEm = false
        request.get(`/departmentMember/manager/${d.Id}`).then(res => {
          d.Manager = res.data.Data
        })
        request.get(`/departmentMember/supervisors/${d.Id}`).then(res => {
          d.Supervisors = res.data.Data ? res.data.Data : []
        })
      });
      setDepartments(data)
      setIsLoading(false)
    } else {
      setDepartments([])
    }
  }

  useEffect(() => {
    getDepartments()
  }, [currentPage])

  const handleAdd = () => {
    setAction(util.ACTION_HANDLE.ADD)
    setSelectedDepartment(resetDepartment);
    setIsModalVisible(true);
  };

  const handleEdit = (d: Department) => {
    setAction(util.ACTION_HANDLE.EDIT)
    setSelectedDepartment(d);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    let res = await axios.delete(`http://localhost:63642/api/department/delete/${id}`)
    if (res.data.Success) {
      message.success('Delete success !')
      setIsModalVisible(false)
      getDepartments()
    } else {
      message.error(res.data.Message)
    }
  };

  const handlePageChange = (page: number, pageSize: number) => {
    if (pageSize !== limit) {
      setLimit(pageSize);
      setCurrentPage(1);
    } else
      setCurrentPage(page);
  };

  const handleSave = async (department: Department) => {
    console.log('>>check department data from form:', department);
    console.log('>>selected department:', selectedDepartment);

    if (action === util.ACTION_HANDLE.ADD) {
      if (!department.Name || !department.Code || !department.ContactInfo || !department.Description) return message.error('Missing title !')
      let res = await axios.post('http://localhost:63642/api/department/add', department)
      if (res.data.Success) {
        message.success('Add success !')
        setSelectedDepartment(resetDepartment)
        setIsModalVisible(false)
        getDepartments()
      } else {
        message.error(res.data.Message)
      }
    } else if (action === util.ACTION_HANDLE.EDIT) {
      if (!department.Name || !department.Code || !department.ContactInfo || !department.Description) return message.error('Missing title !')

      let res = await axios.put(`http://localhost:63642/api/department/edit/${department.Id}`, department)
      if (res.data.Success) {
        message.success('Edit success !')
        setSelectedDepartment(resetDepartment)
        setIsModalVisible(false)
        getDepartments()
      } else {
        message.error(res.data.Message)
      }
    }
  }


  return (
    <div className='manage-department-content'>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
        Add Department
      </Button>

      <Table loading={isLoading} dataSource={departments} columns={columns} rowKey="Id" pagination={false} />
      <Pagination
        showSizeChanger
        current={currentPage}
        pageSize={limit}
        total={total * limit}
        onChange={handlePageChange}
        itemRender={(page, type, originalElement) => {
          if (type === 'prev') {
            return <a style={{ color: currentPage === 1 ? 'gray' : '#337ab7', border: '1px solid #777777', padding: '5px' }}>Previous</a>;
          }
          if (type === 'next') {
            return <a style={{ color: currentPage === total ? 'gray' : '#337ab7', border: '1px solid #777777', padding: '5px' }}>Next</a>;
          }
          return originalElement;
        }}
      />

      <Modal
        title={action === ACTION_HANDLE.EDIT ? <Typography.Title level={2}>Edit Department</Typography.Title> : <Typography.Title level={2}>Add Department</Typography.Title>}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
        }}
        closable={true}
        maskClosable={false}
        footer={null}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <DepartmentForm selectedDepartment={selectedDepartment} setDepartment={setSelectedDepartment} onSave={handleSave} form={form} action={action} />
      </Modal>
    </div>
  );
};

const DepartmentForm: React.FC<DepartmentFormProps> = ({ selectedDepartment, setDepartment, onSave, form, action }) => {
  const { Option } = Select;
  const [departmentForDropDown, setDepartmentForDropDown] = useState<Department[]>([]);
  const [memberDpt, setMemberDpt] = useState<ByIdDepartment[]>([]);

  const getDepartmentForDropDown = async () => {
    let res = await axios.get('http://localhost:63642/api/department/all?page=1&limit=200')
    console.log('>>check res department props:', res)
    console.log('selecselectedDepartment:', selectedDepartment);
    var listForDropDown = res.data.Data.ListData.filter((d: Department) => d.Id !== selectedDepartment.Id)
    console.log('>>check listForDropDown props:', listForDropDown)

    res.data.Success ? setDepartmentForDropDown(listForDropDown) : setDepartmentForDropDown([])
  }

  useEffect(() => {
    console.log('useEffect reset fields run');
    getDepartmentForDropDown()
    form.resetFields()
    if (selectedDepartment.Id && selectedDepartment.Id.length > 0) {
      request.get(`/departmentMember/position?departmentId=${selectedDepartment.Id}`).then(res => {
        console.log('>>now:', res.data);
        let data: ByIdDepartment[] = res.data.Data
        setMemberDpt(data)
      }).catch(e => {
        console.log(e);
      })
    }
  }, [selectedDepartment])

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      setDepartment(values)

      onSave(values as Department);
    }).catch(e => {
      console.log('department data submit error:', e);
    });;
  };

  const handleFormReset = () => {
    form.resetFields()
    console.log('Form resetted');
  }


  console.log('memberDpt check:', memberDpt);

  return (
    <Form form={form} initialValues={selectedDepartment} layout="horizontal" style={{ minWidth: '450px', marginTop: '24px' }}>
      <Form.Item label="Id" name="Id" hidden>
        <Input />
      </Form.Item>
      <Form.Item label="Name" name="Name" rules={[{ required: true, message: "Please enter department's name !" }]}>
        <Input className="right-80" />
      </Form.Item>
      <Form.Item label="ContactInfo" name="ContactInfo" rules={[{ required: true, message: "Please enter department's contact information !" }]}>
        <Input className="right-80" />
      </Form.Item>
      <Form.Item label="Code" name="Code" rules={[{ required: true, message: "Please enter department's code !" }]}>
        <Input className="right-80" />
      </Form.Item>
      <Form.Item label="UnderDepartment" name="UnderDepartment">
        <Select className="right-80">
          <Option value={''}>
            None
          </Option>
          {departmentForDropDown.map((d) => (
            <Option key={d.Id}>
              {d.Name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Description" name="Description" rules={[{ required: true, message: "Please enter department's description !" }]}>
        <Input className="right-80" />
      </Form.Item>
      {action === ACTION_HANDLE.EDIT &&
        <>
          <Form.Item label="Manager" name="Manager">
            <Select className="right-80">
              {/* <Option value={''}>
              None
            </Option> */}
              {memberDpt.map((d) => (
                <Option key={d.User.Id}>
                  {d.User.FullName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Supervisor" name="Supervisors">
            <Select className="right-80" mode='multiple' maxTagCount={3}>
              {memberDpt.map((d) => (
                <Option key={d.User.Id}>
                  {d.User.FullName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item label="Manager & Employee" valuePropName="checked" name="ManEm">
                <Checkbox value={true} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Supervisor & Employee" valuePropName="checked" name="SupEm">
                <Checkbox value={true} />
              </Form.Item>
            </Col>
          </Row>
        </>
      }

      {/* save */}
      <Form.Item style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '20px' }}>
        <Button onClick={handleFormReset} style={{ marginRight: '12px' }}>
          Reset
        </Button>
        <Button type="primary" onClick={handleSubmit} style={{ marginLeft: '12px' }}>
          Save
        </Button>
      </Form.Item>
    </Form>
  )
}

export default DepartmentManage;