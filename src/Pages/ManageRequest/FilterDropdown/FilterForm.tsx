import { Button, DatePicker, FormInstance, Input, Select } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import { Form } from "antd";
import request from '../../../Utils/request';
import { useTranslation } from 'react-i18next';

interface FilterFormProps {
    setLoading: (value: boolean) => void;
    handleClear: () => void;
    onApply: () => void;
    setFilter: React.Dispatch<React.SetStateAction<{
        requestCode: string;
        createdFrom: string;
        createdTo: string;
        senderId: string;
        filterStatus: string;
    }>>;
    form: FormInstance<any>;
    setStatus: any;
}

interface User {
    Id: string;
    FirstName: string;
    LastName: string;
}

const FilterForm: React.FC<FilterFormProps> = ({
    setFilter,
    setLoading,
    handleClear,
    form,
    setStatus,
    onApply,
}) => {


    // const [loading, setLoading] = useState<boolean>(true);
    const createdFrom = () => {
        const date = dayjs().subtract(1, 'year');
        return date.format('MM/DD/YYYY');
    };
    const createdTo = () => {
        const date = dayjs();
        return date.format('MM/DD/YYYY');
    };
    const [dataUser, setDataUser] = useState<User[]>([]);
    const [FormcreatedFrom, FormsetCreatedFrom] = useState("");
    const [FormcreatedTo, formSetCreatedTo] = useState("");
    const {t} = useTranslation();

    const handleSetFormFilter = (values: any) => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            requestCode: values.requestCode === undefined ? "" : values.requestCode,
            createdFrom: FormcreatedFrom,
            createdTo: FormcreatedTo,
            senderId: values.createdBy === "All" ? "" : values.createdBy,
            filterStatus: values.status === "All requests" ? "" : values.status
        }))
        setStatus(values.status === "All requests" ? "" : values.status);
    }

    useEffect(() => {
        const getAllUser = async () => {
            const endpoint = "user/all?page=1&limit=100";
            await request.get(endpoint).then((res) => {
                setDataUser(res.data.Data.ListData);
                setLoading(false);
            }).catch(() => {
                setLoading(true);
            });
        }
        getAllUser();
    }, [setLoading])

    return (
        <Form
            form={form}
            onFinish={(values) => handleSetFormFilter(values)}
            className="filter-form"
            initialValues={{ createdBy: "All", status: t('allrequests') }}
        >
            <p style={{ fontWeight: "bold", fontFamily: "Segoe UI" }}>{t('filter')}</p>
            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    onClick={onApply}
                    style={{
                        color: "white",
                        backgroundColor: "#5cb85c",
                        fontFamily: "Segoe UI",
                    }}
                >
                    Apply
                </Button>
                <Button
                    htmlType="button"
                    style={{
                        color: "#5cb85c",
                        border: "none",
                        marginLeft: "20px",
                        fontFamily: "Segoe UI",
                    }}
                    onClick={handleClear}
                >
                    Clear
                </Button>
                <hr style={{ border: "1px solid gray" }} />
            </Form.Item>
            <Form.Item name="requestCode" label={t('requestcode')} style={{ fontWeight: 'bold', fontFamily: 'Segoe UI' }}>
                <Input placeholder={t('keywords')}
                // onChange={e => setFilter((prevFilter) => ({
                //     ...prevFilter,
                //     requestCode: e.target.value
                // }))} 
                />
            </Form.Item>
            <Form.Item name="created" label={t('createdate')} style={{ fontWeight: 'bold', fontFamily: 'Segoe UI' }}>
                <DatePicker.RangePicker
                    defaultValue={[dayjs(createdFrom()), dayjs(createdTo())]}
                    onChange={(_, dateString) => {
                        FormsetCreatedFrom(dateString[0]);
                        formSetCreatedTo(dateString[1]);
                    }}
                />
            </Form.Item>
            <Form.Item name="createdBy" label={t('createby')} initialValue={dataUser.length > 0 ? dataUser[0].FirstName : undefined} style={{ fontWeight: 'bold', fontFamily: 'Segoe UI' }}>
                <Select
                    // onChange={value => onSenderIdChange(value)}
                    showSearch
                    optionFilterProp="children"
                    filterOption={(inputValue, option) =>
                        option?.props.children?.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
                    }
                >
                    <Select.Option value="">All</Select.Option>
                    {dataUser.map((items) => (
                        <Select.Option key={items.Id} value={items.Id} >
                            {`${items.FirstName} ${items.LastName}`}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item name="status" label={t('status')} style={{ fontWeight: 'bold', fontFamily: 'Segoe UI' }}>
                <Select
                    // onChange={value => onStatusChange(value)}
                    showSearch
                    optionFilterProp="children"
                    filterOption={(inputValue, option) =>
                        option?.props.children?.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
                    }
                >
                    <Select.Option value="">{t('allrequests')}</Select.Option>
                    <Select.Option value="Draft">{t('draft')}</Select.Option>
                    <Select.Option value="Waiting for approval">{t('waitingforapproval')}</Select.Option>
                    <Select.Option value="Approved">{t('approved')}</Select.Option>
                    <Select.Option value="Rejected">{t('rejected')}</Select.Option>
                    <Select.Option value="Canceled">{t('canceled')}</Select.Option>
                    <Select.Option value="Done">{t('done')}</Select.Option>
                </Select>
            </Form.Item>
        </Form>
    );
};

export default FilterForm