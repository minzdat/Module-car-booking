import { useState, useEffect } from 'react'
import "./index.css";
import { Button, Input, Space, Table, Tooltip, message } from 'antd';
import { FileExcelOutlined, PlusOutlined } from '@ant-design/icons';
import RequestLayout from '../../Components/RequestLayout';
import request from "../../Utils/request";
import FilterDropdown from './FilterDropdown/FilterDropdown';
import { changeFormatDate } from '../../Utils/formatDate';
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import { setTab, setStatus } from '../../Actions/requestAction';
import { RootState } from '../../Reducers/rootReducer';
import { Pagination, Form } from 'antd';
import CommonUtils from '../../Utils/CommonUtils';
import { useTranslation } from 'react-i18next';
import { checkUserRoles } from '../../Utils/checkUserRoles';

interface RequestType {
  Id: string;
  requestCode: string;
  department: object;
  createdBy: object;
  senderId: string;
  createdDate: string;
  from: string;
  to: string;
  Status: string;
}

const { Search } = Input;

const ManageRequest = (props: any) => {

  const { tab, status, setStatus, userInfo } = props
  const [requestData, setRequestData] = useState<RequestType[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [form] = Form.useForm();
  const [limit, setLimit] = useState(20);
  const { t } = useTranslation();
  const [filter, setFilter] = useState({
    requestCode: "",
    createdFrom: "",
    createdTo: "",
    senderId: "",
    filterStatus: ""
  })

  const handleGetAllRequest = () => {
    setLoading(true);
    const url = `/request/${tab}?requestCode=${filter.requestCode}&createdFrom=${filter.createdFrom}&createdTo=${filter.createdTo}&senderId=${filter.senderId}&status=${status}&page=${currentPage}&limit=${limit}&search=${searchQuery}`;
    request.get(url)
      .then((res) => {
        setRequestData(res.data.Data.ListData);
        setTotal(res.data.Data.TotalPage);
        setLoading(false);
      }).catch((e) => {
        console.log(e);
      })
  };

  const handlePageChange = (page: number, pageSize: number) => {
    if (pageSize !== limit) {
      setLimit(pageSize);
      setCurrentPage(1);
    } else
      setCurrentPage(page);

    // setRequestCode(requestCode);
    // setCreatedFrom(createdFrom);
    // setCreatedTo(createdTo);
    // setSenderId(senderId);
    // setStatus(status);
    // setSearchQuery(searchQuery);
  };

  const onApply = () => {
    setLoading(false);
    setStatus(filter.filterStatus);
  }

  const handleClear = () => {
    setLoading(true);
    // Reset filter mà k cần load lại trang
    form.setFieldsValue({
      requestCode: undefined,
      created: undefined,
      createdBy: "All",
      status: "All requests",
    });
    setFilter({
      requestCode: "",
      createdFrom: "",
      createdTo: "",
      senderId: "",
      filterStatus: ""
    })
    setStatus("");
  };

  const handleOnClickExport = () => {
    if (requestData.length !== 0) {
      if (status !== "") {
        CommonUtils.exportExcel(requestData, `List of ${status} request`, `${status}-request`)
      } else {
        CommonUtils.exportExcel(requestData, `List of ${tab} request`, `${tab}-request`)
      }
    } else {
      message.error("No data to export excel!!!");
    }
  }

  const checkRequestShared = (record: any) => {
    if (record.SenderUser.Id !== userInfo.Id && record.ReceiveUser.Id !== userInfo.Id && !record.RequestWorkflows.includes(userInfo.Id)
    ) {
      return 'request-shared';
    }
    else return '';
  }

  useEffect(() => {
    setLoading(true);
    handleGetAllRequest();
  }, [tab, filter, status, currentPage, limit]);


  const profile = false;

  return (
    <RequestLayout profile={profile}>
      {() => (
        <div style={{ overflowX: 'hidden' }} className='request'>
          <div className='manage-request-navbar'>
            <div className='manage-request-title'>{t('carbooking')}</div>
            <Space.Compact size="large">
              <Search
                className='search-bar'
                placeholder={t('search')}
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value) }}
                onSearch={() => handleGetAllRequest()}
              />
            </Space.Compact>
            <div className='manage-request-button-navbar'>
              <Button style={{ marginRight: 8, color: '#8894a1', fontFamily: 'Segoe UI', fontWeight: 600 }} onClick={handleOnClickExport}><FileExcelOutlined style={{ color: 'green' }} /><span className='text-export-excel'>{t('exportexcel')}</span></Button>
              <FilterDropdown
                handleClear={handleClear}
                form={form}
                setFilter={setFilter}
                setLoading={setLoading}
                onApply={onApply}
              />
              <Button style={{ marginRight: 5, marginLeft: 5, backgroundColor: '#5cb85c', color: 'white', fontFamily: 'Segoe UI', fontWeight: 600 }} onClick={() => navigate('/request/addrequest')}><PlusOutlined /><span className='text-create-new'>{t('createnew')}</span></Button>
            </div>
          </div>
          <div className='manage-request-content'>
            <Table
              rowKey={(record) => record.Id}
              loading={loading}
              onRow={(record) => ({
                onDoubleClick: () => {
                  if ((record.senderId === userInfo.Id || checkUserRoles([1, 2], userInfo)) && (record.Status === 'Rejected' || record.Status === 'Draft')) {
                    navigate(`/request/carbooking/edit/${record.Id}`);
                  }
                  else {
                    navigate(`/request/carbooking/detail/${record.Id}`);
                  }
                },
              })}
              rowClassName={(record) => checkRequestShared(record)}
              columns={[
                {
                  title: t('requestcode'),
                  dataIndex: 'RequestCode',
                },
                {
                  title: t('department'),
                  dataIndex: 'Department',
                  render: (department) => `${department.Name}`,
                },
                {
                  title: t('createby'),
                  dataIndex: 'SenderUser',
                  render: (senderUser) => `${senderUser.FullName}`,
                },
                {
                  title: t('user'),
                  dataIndex: 'ReceiveUser',
                  render: (receiveUser) => `${receiveUser.FullName}`,
                },
                {
                  title: t('createdate'),
                  dataIndex: 'Created',
                  render: (text: string, record: RequestType) => {
                    let className = '';
                    switch (record.Status) {
                      case 'Rejected':
                        className = 'manage-request-rejected-status-theme';
                        break;
                      case 'Approved':
                        className = 'manage-request-approved-status-theme';
                        break;
                      case 'Waiting for approval':
                        className = 'manage-request-waiting-approval-status-theme';
                        break;
                      case 'Done':
                        className = 'manage-request-done-status-theme';
                        break;
                      case 'Canceled':
                        className = 'manage-request-canceled-status-theme';
                        break;
                      case 'Draft':
                        className = 'manage-request-draft-status-theme';
                        break;
                      default:
                        className = '';
                    }
                    return (
                      <Tooltip title={record.Status} className="small-tooltip" color="black">
                        <div className={className}>{changeFormatDate(text)}</div>
                      </Tooltip>
                    );
                  },
                },
                {
                  title: t('from'),
                  dataIndex: 'UsageFrom',
                  render: (record: string) => changeFormatDate(record),
                },
                {
                  title: t('to'),
                  dataIndex: 'UsageTo',
                  render: (record: string) => changeFormatDate(record),
                },
              ]}
              dataSource={requestData}
              pagination={false}
            />
            <Pagination
              showSizeChanger
              current={currentPage}
              pageSize={limit}
              total={total * limit}
              onChange={handlePageChange}
              itemRender={(page, type, originalElement) => {
                if (type === 'prev') {
                  return <a style={{ color: currentPage === 1 ? 'gray' : '#337ab7', border: '1px solid #777777', padding: '5px', fontFamily: "Segoe UI" }}>Previous</a>;
                }
                if (type === 'next') {
                  return <a style={{ color: currentPage === total ? 'gray' : '#337ab7', border: '1px solid #777777', padding: '5px', fontFamily: "Segoe UI" }}>Next</a>;
                }
                return originalElement;
              }}
            />
          </div>
        </div>
      )}
    </RequestLayout>
  )
}

const mapStateToProps = (state: RootState) => ({
  tab: state.request.tab,
  status: state.request.status,
  userInfo: state.request.userInfo
})

const mapDispatchToProps = { setTab, setStatus }

export default connect(mapStateToProps, mapDispatchToProps)(ManageRequest)
