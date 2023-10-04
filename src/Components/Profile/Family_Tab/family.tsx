import React from "react";
// import { useState } from "react";
import { Input, Table } from "antd";
// import { PlusCircleFilled } from "@ant-design/icons";
import { FamilyProps } from "../interface"
import { useTranslation } from "react-i18next";

// const { Title } = Typography;

const Family: React.FC<FamilyProps> = ({ isEditing, setInfoAPI, infoAPI }) => {
  //tab_family
  const {t} = useTranslation();
  // const [edit_family, setEditFamily] = useState(false);
  const columns_family = [
    {
      dataIndex: "Family_title",
    },
    {
      dataIndex: "info",
      width: "70%",
    },
  ];

  // const columns_relationship = [
  //   {
  //     title: t('Contact name'),
  //     dataIndex: "Contact_name",
  //   },
  //   {
  //     title: t('Birthday'),
  //     dataIndex: "Birth_day",
  //   },
  //   {
  //     title: t('Relationship'),
  //     dataIndex: "Relationship",
  //   },
  //   {
  //     title: t('Note'),
  //     dataIndex: "Note",
  //   },
  //   {
  //     title: isEditing ? <PlusCircleFilled onClick={() => {setEditFamily(true)}} /> : null,
  //     dataIndex: "action",
  //   },
  // ];

  let dataSource_family = [
    {
      Family_title: t('Martial status'),
      info: isEditing ? (
        <Input
          placeholder={t('Martial status')}
          value={infoAPI.MartialStatus}
          name="Martial_status"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                MartialStatus: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.MartialStatus}</strong>
      ),
    },
    {
      Family_title: (
        <strong>
          <br />
          <br />
          {t('Emergency contact')}
        </strong>
      ),
    },
    {
      Family_title: t('Contact name'),
      info: isEditing ? (
        <Input
          placeholder={t('Contact name')}
          value={infoAPI.ContactName}
          name="Contact_name"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                ContactName: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.ContactName}</strong>
      ),
    },
    {
      Family_title: t('Relationship'),
      info: isEditing ? (
        <Input
          placeholder={t('Relationship')}
          value={infoAPI.Relationship}
          name="Relationship"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                Relationship: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.Relationship}</strong>
      ),
    },
    {
      Family_title: t('Phone'),
      info: isEditing ? (
        <Input
          placeholder={t('Phone')}
          value={infoAPI.PhoneR}
          name="Phone"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                PhoneR: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.PhoneR}</strong>
      ),
    },
    {
      Family_title: (
        <strong>
          <br />
          <br />
          {t('Permanent Address')}
        </strong>
      ),
    },
    {
      Family_title: t('Street'),
      info: isEditing ? (
        <Input
          placeholder={t('Street')}
          value={infoAPI.StreetR}
          name="Street"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                StreetR: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.StreetR}</strong>
      ),
    },
    {
      Family_title: t('Building / flatnumber'),
      info: isEditing ? (
        <Input
          placeholder={t('Building / flatnumber')}
          value={infoAPI.FlatNumberR}
          name="Building / flatnumber"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                FlatNumberR: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.FlatNumberR}</strong>
      ),
    },
    {
      Family_title: t('City'),
      info: isEditing ? (
        <Input
          placeholder={t('City')}
          value={infoAPI.CityR}
          name="City"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                CityR: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.CityR}</strong>
      ),
    },
    {
      Family_title: t('Province / State'),
      info: isEditing ? (
        <Input
          placeholder={t('Province / State')}
          value={infoAPI.ProvinceR}
          name="Province_state"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                ProvinceR: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.ProvinceR}</strong>
      ),
    },
    {
      Family_title: t('Postal code'),
      info: isEditing ? (
        <Input
          placeholder={t('Postal code')}
          value={infoAPI.PostalCodeR}
          name="Postal code"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                PostalCodeR: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.PostalCodeR}</strong>
      ),
    },
    {
      Family_title: t('Country'),
      info: isEditing ? (
        <Input
          placeholder={t('Country')}
          value={infoAPI.CountryR}
          name="Country"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                CountryR: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.CountryR}</strong>
      ),
    },
  ];

  // let dataSource_relationship = [
  //   {
  //     Contact_name:isEditing ?(edit_family ? <Input /> : null ): (null),
  //     Birth_day: isEditing ?(edit_family ? <DatePicker /> : null): (null),
  //     Relationship:isEditing ?(edit_family ?  <Input /> : null): (null),
  //     Note:isEditing ?(edit_family ?  <Input /> : null): (null),
  //     action:isEditing ?(edit_family ? <DeleteFilled /> : null): (null) ,
  //   },
  // ]; 
  return (
    <div>
      <Table
        pagination={false}
        dataSource={dataSource_family}
        columns={columns_family}
      ></Table>
      <br />
      <br />
      {/* <Title>{t('Relationship')}</Title>
      <Table
        pagination={false}
        dataSource={dataSource_relationship}
        columns={columns_relationship}
      ></Table> */}
    </div>
  );
};

export default Family;
