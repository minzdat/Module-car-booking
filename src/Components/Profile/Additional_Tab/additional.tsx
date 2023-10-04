import React from "react";
//  
import dayjs, { Dayjs } from "dayjs";
import { Input, DatePicker, Table } from "antd";
// import { PlusCircleFilled } from "@ant-design/icons";
import { AdditionalProps } from "../interface";
import { useTranslation } from "react-i18next";

// const { Title } = Typography;

const Additional: React.FC<AdditionalProps> = ({
  infoAPI,
  isEditing,
  setInfoAPI,
}) => {
  const {t} = useTranslation();
  // const [edit_contract, setEdit_Contract] = useState(false);

  const handlestart_date_maternity_leave = (
    date: Dayjs | null,
    dateString: string
  ) => {
    setInfoAPI((prevInfo) => ({
      ...prevInfo,
      StartDateMaternityLeave: dateString,
    }));
  };
  const handleleaving_date = (date: Dayjs | null, dateString: string) => {
    setInfoAPI((prevInfo) => ({
      ...prevInfo,
      LeavingDate: dateString,
    }));
  };
  const handleDate_Id_card = (date: Dayjs | null, dateString: string) => {
    setInfoAPI((prevInfo) => ({
      ...prevInfo,
      DateOfIdCard: dateString,
    }));
  };

  const handleDate_start_date = (date: Dayjs | null, dateString: string) => {
    setInfoAPI((prevInfo) => ({
      ...prevInfo,
      StartingDate: dateString,
    }));
  };

  const handleDate_start_date_official = (
    date: Dayjs | null,
    dateString: string
  ) => {
    setInfoAPI((prevInfo) => ({
      ...prevInfo,
      StartingDateOfficial: dateString,
    }));
  };
  // tab additional
  const columns_additional = [
    {
      dataIndex: "additional_title",
    },
    {
      dataIndex: "info",
      width: "70%",
    },
  ];

  // const columns_contract = [
  //   {
  //     title: t('Contract type'),
  //     dataIndex: "Contract_type",
  //   },
  //   {
  //     title: t('from'),
  //     dataIndex: "From",
  //   },
  //   {
  //     title: t('to'),
  //     dataIndex: "To",
  //   },
  //   {
  //     title: t('Signing date'),
  //     dataIndex: "Signing_date",
  //   },
  //   {
  //     title: t('Subject'),
  //     dataIndex: "Subject",
  //   },
  //   {
  //     title: t('department'),
  //     dataIndex: "Department",
  //   },
  //   {
  //     title: t('Note'),
  //     dataIndex: "Note",
  //   },
  //   {
  //     title: isEditing ? (
  //       <PlusCircleFilled
  //         onClick={() => {
  //           setEdit_Contract(true);
  //         }}
  //       />
  //     ) : null,
  //     dataIndex: "action",
  //   },
  // ];

  let dataSource_additional = [
    {
      additional_title: t('Nation'),
      info: isEditing ? (
        <Input
          placeholder={t('Nation')}
          value={infoAPI.Nation}
          name="nation"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                Nation: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.Nation}</strong>
      ),
    },
    {
      additional_title: t('Phone'),
      info: isEditing ? (
        <Input
          placeholder={t('Phone')}
          value={infoAPI.Phone}
          name="phone"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                Phone: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.Phone}</strong>
      ),
    },
    {
      additional_title: t('Id card number'),
      info: isEditing ? (
        <Input
          placeholder={t('Id card number')}
          value={infoAPI.IdCardNumber}
          name="id_card_number"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                IdCardNumber: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.IdCardNumber}</strong>
      ),
    },
    {
      additional_title: t('Date of ID card'),
      info: isEditing ? (
        infoAPI.DateOfIdCard ? (
          <DatePicker
            value={dayjs(infoAPI.DateOfIdCard)}
            style={{ width: "100%" }}
            onChange={handleDate_Id_card}
            placeholder={t('Date of ID card')}
            format="YYYY-MM-DD"
          />
        ) : (
          <DatePicker
            // value={infoAPI.Birthday === null ? null : dayjs(infoAPI.Birthday)}
            value={null}
            style={{ width: "100%" }}
            onChange={handleDate_Id_card}
            placeholder={t('Date of ID card')}
            format="YYYY-MM-DD"
          />
        )
      ) : (
        <strong>
          {infoAPI.DateOfIdCard ? infoAPI.DateOfIdCard.substring(0, 10) : ""}
        </strong>
      ),
    },
    {
      additional_title: t('Health insurance'),
      info: isEditing ? (
        <Input
          placeholder={t('Health insurance')}
          value={infoAPI.HealthInsurance}
          name="health insurance"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                HealthInsurance: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.HealthInsurance}</strong>
      ),
    },
    {
      additional_title: t('Starting date'),
      info: isEditing ? (
        infoAPI.StartingDate ? (
          <DatePicker
            value={dayjs(infoAPI.StartingDate)}
            style={{ width: "100%" }}
            onChange={handleDate_start_date}
            placeholder={t('Starting date')}
            format="YYYY-MM-DD"
          />
        ) : (
          <DatePicker
            value={null}
            style={{ width: "100%" }}
            onChange={handleDate_start_date}
            placeholder={t('Starting date')}
            format="YYYY-MM-DD"
          />
        )
      ) : (
        <strong>
          {infoAPI.StartingDate ? infoAPI.StartingDate.substring(0, 10) : ""}
        </strong>
      ),
    },
    {
      additional_title: t('Starting date offical'),
      info: isEditing ? (
        infoAPI.StartingDateOfficial ? (
          <DatePicker
            value={dayjs(infoAPI.StartingDateOfficial)}
            disabled
            style={{ width: "100%" }}
            onChange={handleDate_start_date_official}
            placeholder={t('Starting date offical')}
            format="YYYY-MM-DD"
          />
        ) : (
          <DatePicker
            value={null}
            disabled
            style={{ width: "100%" }}
            onChange={handleDate_start_date_official}
            placeholder={t('Starting date offical')}
            format="YYYY-MM-DD"
          />
        )
      ) : (
        <strong>
          {infoAPI.StartingDateOfficial
            ? infoAPI.StartingDateOfficial.substring(0, 10)
            : ""}
        </strong>
      ),
    },
    {
      additional_title: t('Leaving date'),
      info: isEditing ? (
        infoAPI.LeavingDate ? (
          <DatePicker
            value={dayjs(infoAPI.LeavingDate)}
            disabled
            style={{ width: "100%" }}
            onChange={handleleaving_date}
            placeholder={t('Leaving date')}
            format="YYYY-MM-DD"
          />
        ) : (
          <DatePicker
            value={null}
            disabled
            style={{ width: "100%" }}
            onChange={handleleaving_date}
            placeholder={t('Leaving date')}
            format="YYYY-MM-DD"
          />
        )
      ) : (
        <strong>
          {infoAPI.LeavingDate ? infoAPI.LeavingDate.substring(0, 10) : ""}
        </strong>
      ),
    },
    {
      additional_title: t('Start Date Maternity Leave'),
      info: isEditing ? (
        infoAPI.StartDateMaternityLeave ? (
          <DatePicker
            value={dayjs(infoAPI.StartDateMaternityLeave)}
            disabled
            style={{ width: "100%" }}
            onChange={handlestart_date_maternity_leave}
            placeholder={t('Start Date Maternity Leave')}
            format="YYYY-MM-DD"
          />
        ) : (
          <DatePicker
            value={null}
            disabled
            style={{ width: "100%" }}
            onChange={handlestart_date_maternity_leave}
            placeholder={t('Start Date Maternity Leave')}
            format="YYYY-MM-DD"
          />
        )
      ) : (
        <strong>
          {infoAPI.StartDateMaternityLeave
            ? infoAPI.StartDateMaternityLeave.substring(0, 10)
            : ""}
        </strong>
      ),
    },
    {
      additional_title: t('Note'),
      info: isEditing ? (
        <Input
          placeholder={t('Note')}
          value={infoAPI.Note}
          name="Note"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                Note: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.Note}</strong>
      ),
    },
    {
      additional_title: (
        <strong>
          <br />
          <br />
          {t('Literacy')}
        </strong>
      ),
    },
    {
      additional_title: t('Academic level'),
      info: isEditing ? (
        <Input
          placeholder={t('Academic level')}
          value={infoAPI.AcademicLevel}
          name="Academic_level"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                AcademicLevel: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.AcademicLevel}</strong>
      ),
    },
    {
      additional_title: t('Specialized qualification'),
      info: isEditing ? (
        <Input
          placeholder={t('Specialized qualification')}
          value={infoAPI.Qualification}
          name="Specialized qualification"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                Qualification: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.Qualification}</strong>
      ),
    },
    {
      additional_title: (
        <strong>
          <br />
          <br />
          {t('Contact Info')}
        </strong>
      ),
    },
    {
      additional_title: t('Business phone'),
      info: isEditing ? (
        <Input
          placeholder={t('Business phone')}
          value={infoAPI.BusinessPhone}
          name="Business_phone"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                BusinessPhone: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.BusinessPhone}</strong>
      ),
    },
    {
      additional_title: t('Home phone'),
      info: isEditing ? (
        <Input
          placeholder={t('Home phone')}
          value={infoAPI.HomePhone}
          name="home_phone"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                HomePhone: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.HomePhone}</strong>
      ),
    },
    {
      additional_title: t('Personal email'),
      info: isEditing ? (
        <Input
          placeholder={t('Personal email')}
          value={infoAPI.PersonalEmail}
          name="personal_email"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                PersonalEmail: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.PersonalEmail}</strong>
      ),
    },
    {
      additional_title: (
        <strong>
          <br />
          <br />
          {t('Bank account')}
        </strong>
      ),
    },
    {
      additional_title: t('Bank Name'),
      info: isEditing ? (
        <Input
          placeholder={t('Bank Name')}
          value={infoAPI.BankName}
          name="Bank_Name"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                BankName: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.BankName}</strong>
      ),
    },
    {
      additional_title: t('Branch number'),
      info: isEditing ? (
        <Input
          placeholder={t('Branch number')}
          value={infoAPI.BankBranchNumber}
          name="branch_number"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                BankBranchNumber: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.BankBranchNumber}</strong>
      ),
    },
    {
      additional_title: t('Bank brach name'),
      info: isEditing ? (
        <Input
          placeholder={t('Bank brach name')}
          value={infoAPI.BankBranchName}
          name="Bank brach name"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                BankBranchName: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.BankBranchName}</strong>
      ),
    },
    {
      additional_title: t('Bank account number'),
      info: isEditing ? (
        <Input
          placeholder={t('Bank account number')}
          value={infoAPI.BankAccountNumber}
          name="Bank account number"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                BankAccountNumber: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.BankAccountNumber}</strong>
      ),
    },
    {
      additional_title: t('NoteBank Account Name'),
      info: isEditing ? (
        <Input
          placeholder={t('NoteBank Account Name')}
          value={infoAPI.BankAccountName}
          name="NoteBank_Account_Name"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                BankAccountName: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.BankAccountName}</strong>
      ),
    },
    {
      additional_title: (
        <strong>
          <br />
          <br />
          {t('Address')}
        </strong>
      ),
    },
    {
      additional_title: t('Street'),
      info: isEditing ? (
        <Input
          placeholder={t('Street')}
          value={infoAPI.Street}
          name="street"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                Street: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.Street}</strong>
      ),
    },
    {
      additional_title: t('Building / flatnumber'),
      info: isEditing ? (
        <Input
          placeholder={t('Building / flatnumber')}
          value={infoAPI.FlatNumber}
          name="Building_flatnumber"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                FlatNumber: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.FlatNumber}</strong>
      ),
    },
    {
      additional_title: t('Province / State'),
      info: isEditing ? (
        <Input
          placeholder={t('Province / State')}
          value={infoAPI.Province}
          name="Province / state"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                Province: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.Province}</strong>
      ),
    },
    {
      additional_title: t('Postal code'),
      info: isEditing ? (
        <Input
          placeholder={t('Postal code')}
          value={infoAPI.PostalCode}
          name="Postal_code"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                PostalCode: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.PostalCode}</strong>
      ),
    },
    {
      additional_title: t('Country'),
      info: isEditing ? (
        <Input
          placeholder={t('Country')}
          value={infoAPI.Country}
          name="country"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                Country: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.Country}</strong>
      ),
    },
  ];

  // let dataSource_contract = [
  //   {
  //     Contract_type: isEditing ? edit_contract ? <Input /> : null : null,
  //     From: isEditing ? edit_contract ? <DatePicker /> : null : null,
  //     To: isEditing ? edit_contract ? <DatePicker /> : null : null,
  //     Signing_date: isEditing ? edit_contract ? <DatePicker /> : null : null,
  //     Subject: isEditing ? edit_contract ? <Input /> : null : null,
  //     Department: isEditing ? edit_contract ? <Input /> : null : null,
  //     Note: isEditing ? edit_contract ? <Input /> : null : null,
  //     action: isEditing ? (
  //       edit_contract ? (
  //         <DeleteFilled onClick={() => {}} />
  //       ) : null
  //     ) : null,
  //   },
  // ];
  return (
    <div>
      <Table
        pagination={false}
        dataSource={dataSource_additional}
        columns={columns_additional}
      ></Table>
      <br />
      <br />
      {/* <Title>{t('Contract')}</Title> */}
      {/* <Table
        pagination={false}
        dataSource={dataSource_contract}
        columns={columns_contract}
      ></Table> */}
    </div>
  );
};

export default Additional;
