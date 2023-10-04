import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Typography, Input, message, Pagination } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Role, RoleFormProps } from '../Utils/interfaces'
import * as util from '../Utils'
import axios from 'axios';
import { resetRole } from '../Utils';
import "./roleManage.scss";

const RoleManage: React.FC = () => {

  message.config(util.messageConfig)
  const columns = [
    {
      title: 'Id',
      dataIndex: 'Id',
      key: 'Id',
    },
    {
      title: 'Title',
      dataIndex: 'Title',
      key: 'Title',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: Role) => (
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

  const [roles, setRoles] = useState<Role[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>(resetRole);
  const [action, setAction] = useState<string>('');
  const [form] = Form.useForm<Role>();
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(5);
  const [isLoading, setIsLoading] = useState(true)

  const getRoles = async () => {
    let res = await axios.get(`http://localhost:63642/api/role/all?page=${currentPage}&limit=${limit}`)
    console.log('>>check res role:', res)

    res && res.data && res.data.Success ? setRoles(res.data.Data.ListData) : setRoles([])
    setTotal(res.data.Data.TotalPage);
    setIsLoading(false)
  }

  useEffect(() => {
    getRoles()
  }, [currentPage])

  const handleAdd = () => {
    setAction(util.ACTION_HANDLE.ADD)
    setSelectedRole(resetRole);
    setIsModalVisible(true);
  };

  const handleEdit = (d: Role) => {
    setAction(util.ACTION_HANDLE.EDIT)
    setSelectedRole(d);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    let res = await axios.delete(`http://localhost:63642/api/role/delete/${id}`)
    if (res.data.Success) {
      message.success('Delete success !')
      setIsModalVisible(false)
      getRoles()
    } else {
      message.error(res.data.Message)
    }
  };

  const handleSave = async (role: Role) => {
    console.log('>>check role data from form:', role);
    console.log('>>selected role:', selectedRole);

    if (action === util.ACTION_HANDLE.ADD) {
      if (!role.Title) return message.error('Missing title !')
      let res = await axios.post('http://localhost:63642/api/role/add', { Title: role.Title })
      if (res.data.Success) {
        message.success('Add success !')
        setSelectedRole(resetRole)
        setIsModalVisible(false)
        getRoles()
      } else {
        message.error(res.data.Message)
      }
    } else if (action === util.ACTION_HANDLE.EDIT) {
      if (!role.Title) return message.error('Missing title !')
      console.log(role.Id);

      let res = await axios.put(`http://localhost:63642/api/role/edit/${role.Id}`, { Title: role.Title })
      if (res.data.Success) {
        message.success('Edit success !')
        setSelectedRole(resetRole)
        setIsModalVisible(false)
        getRoles()
      } else {
        message.error(res.data.Message)
      }
    }
  }

  const handlePageChange = (page: number, pageSize: number) => {
    if (pageSize !== limit) {
      setLimit(pageSize);
      setCurrentPage(1);
    } else
      setCurrentPage(page);
  };

  return (
    <div className='manage-role-content'>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
        Add Role
      </Button>

      <Table loading={isLoading} dataSource={roles} columns={columns} rowKey="Id" pagination={false} />
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
        title={action === util.ACTION_HANDLE.EDIT ? <Typography.Title level={2}>Edit Role</Typography.Title> : <Typography.Title level={2}>Add Role</Typography.Title>}
        open={isModalVisible}
        onCancel={() => {
          setSelectedRole(resetRole)
          setIsModalVisible(false);
        }}
        closable={true}
        maskClosable={false}
        footer={null}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <RoleForm selectedRole={selectedRole} setSelectedRole={setSelectedRole} onSave={handleSave} form={form} />
      </Modal>
    </div>
  );
};

const RoleForm: React.FC<RoleFormProps> = ({ selectedRole, setSelectedRole, onSave, form }) => {
  const handleSubmit = () => {
    form.validateFields().then((values) => {
      setSelectedRole(values)
      onSave(values as Role);
    }).catch(e => {
      console.log('role data submit error:', e);
    });
  };

  useEffect(() => {
    console.log('useEffect run');
    form.resetFields()
  }, [selectedRole])

  const handleFormReset = () => {
    form.resetFields()
    console.log('Form resetted');
  }

  return (
    <Form form={form} initialValues={selectedRole} layout="horizontal" style={{ minWidth: '400px', marginTop: '24px' }}>
      <Form.Item label="Id" name="Id" hidden>
        <Input />
      </Form.Item>
      <Form.Item label="Title" name="Title" rules={[{ required: true, message: "Please enter role's title !" }]}>
        <Input />
      </Form.Item>
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

export default RoleManage;