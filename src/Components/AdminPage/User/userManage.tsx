// src/UserManage.tsx
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Tag, Typography, message, Pagination, Spin, Alert } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import UserForm from './userForm';
import { User, UserRoles, DepartmentMembers, Department, Role } from '../Utils/interfaces';
import { resetUser } from '../Utils';
import * as util from '../Utils'
import axios from 'axios';
import { jwt_admin } from '../Utils/constants'
import { RcFile } from 'antd/es/upload';
import "./userManage.scss";
import request from '../../../Utils/request';

const UserManage: React.FC = () => {
  let config = {
    headers: {
      'Authorization': `Bearer ${jwt_admin}`
    }
  }
  message.config(util.messageConfig)

  const [users, setUsers] = useState<User[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>(resetUser);
  const [action, setAction] = useState<string>('');
  const [form] = Form.useForm<User>();
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(5);
  const [dpt, setDpt] = useState<Department[]>([])
  const [rol, setRol] = useState<Role[]>([])

  const columns = [
    {
      title: 'Id',
      dataIndex: 'Id',
      key: 'Id',
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      key: 'Email',
    },
    {
      title: 'Roles',
      dataIndex: 'UserRoles',
      key: 'UserRoles',
      render: (roles: UserRoles[]) => (
        <>
          {roles.map((role) => (
            <Tag key={role.RoleId}>{rol.find(i => i.Id == role.RoleId)?.Title}</Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Belong to Departments',
      dataIndex: 'DepartmentMembers',
      key: 'DepartmentMembers',
      render: (departments: DepartmentMembers[]) => (
        <>
          {departments.map((department) => (
            <Tag key={department.DepartmentId}>{dpt.find(i => i.Id == department.DepartmentId)?.Name}</Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: User) => (
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
  const getUsers = async () => {
    let res = await axios.get(`http://localhost:63642/api/user/all?page=${currentPage}&limit=${limit}`, config)
    console.log('>>check res user:', res)
    if (res.data.Success) {
      setTotal(res.data.Data.TotalPage);
      setSelectedUser(resetUser)
      let usersData: User[] = res.data.Data.ListData
      usersData.forEach(user => {
        user.AvatarPath = `http://localhost:63642/${user.AvatarPath}`
        axios.get(`http://localhost:63642/api/userRole/roles-list/${user.Id}`)
          .then(data => user.Roles = data.data.Data)
        axios.get(`http://localhost:63642/api/departmentMember/departments-uid/${user.Id}`)
          .then(data => user.Departments = data.data.Data)
      })
      console.log('>>update usersData:', usersData);

      // let roles: string[] = []
      // usersData.Roles = roles


      setUsers(usersData)
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)

    } else {
      setUsers([])
    }
  }

  /* const deleteFilesTemp = async () => {
    return await axios.get('http://localhost:63642/api/file/delete-files-temp')
  } */

  useEffect(() => {
    request.get('/department/all?page=1&limit=100').then(res => {
      setDpt(res.data.Data.ListData)
    }).catch(e => {
      console.log(e);

    })
    request.get('/role/all?page=1&limit=100').then(res => {
      setRol(res.data.Data.ListData)
    }).catch(e => {
      console.log(e);
    })
  }, [])

  useEffect(() => {
    getUsers()
  }, [currentPage])

  const handleAdd = () => {
    setAction(util.ACTION_HANDLE.ADD)
    setSelectedUser(resetUser)
    setIsModalVisible(true);
  };

  const handleEdit = (user: User) => {
    setAction(util.ACTION_HANDLE.EDIT)
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    let res = await axios.delete(`http://localhost:63642/api/user/delete/${id}`)
    if (res.data.Success) {
      message.success(res.data.Message)
      setIsModalVisible(false)
      getUsers()
    } else {
      message.error(res.data.Message)
    }
  };

  const handleSave = async (user: User, file: RcFile) => {
    console.log('>>check user data from form:', user);
    // console.log('>>selected user:', selectedUser);

    if (action === util.ACTION_HANDLE.ADD) {
      let res = await axios.post(`http://localhost:63642/api/user/add`, user, config)
      if (res.data.Success) {
        message.success('Add success !')
        setIsModalVisible(false)
        setSelectedUser(resetUser)
        await getUsers()
      } else {
        message.error(res.data.Message)
      }
    } else if (action === util.ACTION_HANDLE.EDIT) {
      if (file) {
        const formData = new FormData();
        formData.append('fileName', file.name);
        formData.append('userId', user.Id);
        let resUpload = await axios.post('http://localhost:63642/api/file/upload-finish', formData, config)
        console.log('resUpload:', resUpload);
        if (!resUpload.data.Success) {
          return message.error(resUpload.data.Message)
        }
        user.AvatarPath = resUpload.data.Data
      }

      let res = await axios.put(`http://localhost:63642/api/user/edit/${user.Id}`, user, config)
      console.log('check res edit of admin:', res);

      if (res.data.Success) {
        message.success('Edit success !')
        setIsModalVisible(false)
        setSelectedUser(resetUser)
        await getUsers()
      } else {
        message.error(res.data.Message)
      }
    }
  }

  const handleCancel = async () => {
    setIsModalVisible(false)
    setSelectedUser(resetUser)
    /* var data = await deleteFilesTemp()
    console.log('data del temp files:', data) */
  }

  const handlePageChange = (page: number, pageSize: number) => {
    if (pageSize !== limit) {
      setLimit(pageSize);
      setCurrentPage(1);
    } else
      setCurrentPage(page);
  };

  console.log('>>selectedUser:', selectedUser);
  console.log('roles get:', rol);
  console.log('departments get:', dpt);


  return (
    <>
      {isLoading ?
        <Spin style={{ height: '100vh' }} tip="Loading..." size="large">
          <Alert
            style={{ width: '100%', textAlign: 'center', backgroundColor: 'transparent', border: 'none' }}
          />
        </Spin>
        :
        <div className='manage-user-content'>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            Add User
          </Button>

          <Table dataSource={users} columns={columns} rowKey="id" pagination={false} />
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
            title={action === util.ACTION_HANDLE.EDIT ? <Typography.Title level={2}>Edit User</Typography.Title> : <Typography.Title level={2}>Add User</Typography.Title>}
            open={isModalVisible}
            closable={true}
            onCancel={handleCancel}
            maskClosable={false}
            footer={null}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <UserForm selectedUser={selectedUser} setSelectedUser={setSelectedUser} onSave={handleSave} form={form} action={action} />
          </Modal>
        </div>}
    </>
  );
};

export default UserManage;
