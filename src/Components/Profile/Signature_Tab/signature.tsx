import React, { useState, useEffect } from "react";
import { Input, Select, Tabs, Upload, Image, Col, Row, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { QRCodeCanvas } from "qrcode.react";
import type { TabsProps } from "antd";
import "./signature.css";
import request from "../../../Utils/request";

import { SignatureProps } from "../interface"
import { useTranslation } from "react-i18next";

const jwt_admin = localStorage.getItem("Token");
const uploadConfig = {
  action: "http://localhost:63642/api/file/signature-temp",
  headers: {
    Authorization: `Bearer ${jwt_admin}`,
  },
};
const config = {
  headers: {
    Authorization: `Bearer ${jwt_admin}`,
  },
};

const { Dragger } = Upload;

const Signature: React.FC<SignatureProps> = ({
  isEditing,
  infoAPI,
  setInfoAPI,
}) => {
  const {t} = useTranslation();
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [styleSignature, setStyleSignature] = useState<string>("");
  const [fonts] = useState<string[]>([
    "Great Vibes",
    "Dancing Script",
    "Pacifico",
    "Caveat",
  ]);
  const [selectedFont, setSelectedFont] = useState<string>("");
  const [img_preview, setImg_Preview] = useState<string | undefined>();

  const beforeUpload = (file: File) => {
    const isImage = file.type.includes('image/');
    if (!isImage) {
      message.error(t('You can only upload image files!'));
    }
    const filesize = file.size / 1024 / 1024 < 5;
    if(!filesize){
      message.error(t('Image must smaller than 5MB '));
    }
    return isImage && filesize;
  };

  const handleChangeSelect = (value: string) => {
    setInfoAPI((prev) => {
      const ps = prev.SignatureTemp;
      // console.log(ps.replace(ps.substring(ps.indexOf('font-family'), ps.indexOf(';"')), `font-family: ${value}`));
      return {
        ...prev,
        SignatureTemp: ps.replace(
          ps.substring(ps.indexOf("font-family"), ps.indexOf(';"')),
          `font-family: ${value}`
        ),
      };
    });

    setSelectedFont(value);
  };

  const handleFileChange = async (file: any) => {
    if (file.status === "done") {
      var userId = localStorage.getItem("Id");
      const objectUrl = URL.createObjectURL(file.originFileObj);
      setImg_Preview(objectUrl);
      // console.log("file.originFileObj:",file.originFileObj)
      const formData = new FormData();
      formData.append("fileName", file.originFileObj ? file.name : "");
      formData.append("userId", userId ? userId : "");
      await request
        .postForm("/file/signature-finish", formData, config)
        .then((res) => {
          setInfoAPI((prevInfo) => ({
            ...prevInfo,
            SignatureTemp: res.data.Data,
          }));
        })
        .catch((e) => {
          message.error(t('Upload failed ! '));
        });
    }
  };

  useEffect(() => {
    setInfoAPI((prevInfo) => ({
      ...prevInfo,
      SignatureTemp: prevInfo.Signature,
    }));
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const signature_tab: TabsProps["items"] = [
    {
      key: "1",
      label: t('Type signature'),
      children: (
        <>
          <Row>
            <Col span={12}>
              <strong>{t('Confirm your Name')}</strong>
              <div>
                <Input
                  aria-required
                  showCount
                  placeholder={t('Confirm your Name')}
                  onChange={(e) => {
                    // console.log(infoAPI.SignatureTemp);
                    setStyleSignature(e.target.value)
                    if (e.target.value && e.target.value.length > 0) {
                      setInfoAPI((prev) => {
                        return {
                          ...prev,
                          SignatureTemp: `<h1 style="font-size: 30px; font-family: ${selectedFont};">${e.target.value}</h1>`,
                        };
                      });
                    } else {
                      setInfoAPI((prev) => {
                        return {
                          ...prev,
                          SignatureTemp: '',
                        };
                      });
                    }
                    setImg_Preview("");
                  }}
                  style={{ width: "95%" }}
                  maxLength={50}
                />
              </div>
            </Col>
            <Col span={12}>
              <strong>{t('Signature Style')}</strong>
              <div>
                <Select
                  showSearch
                  placeholder={t('Choose your signature')}
                  style={{ width: "95%" }}
                  onChange={handleChangeSelect}
                  options={fonts.map((value) => ({
                    label: value,
                    value: value,
                  }))}
                />
              </div>
            </Col>
          </Row>
          <Row>
            {/* HERE */}
            <div className="QR_signature">
              <QRCodeCanvas
                style={{ height: "200px", width: "200px" }}
                value="https://tasken.io/setting/system/employee?userId=87fa2638-eefe-42da-baec-70fbb6a5fd23"
              />
              <p>{infoAPI.Email}</p>
              <p>{currentTime.toLocaleString()}</p>
              {infoAPI.SignatureTemp && infoAPI.SignatureTemp.length !== 0
                ?
                (infoAPI.SignatureTemp && infoAPI.SignatureTemp.length > 0 && infoAPI.SignatureTemp.includes("<h1") ?
                  <div dangerouslySetInnerHTML={{ __html: infoAPI.SignatureTemp }} /> :
                  <img width={250} height={150} src={`http://localhost:63642/${infoAPI.SignatureTemp}`} alt="signature upload"></img>)
                :
                (infoAPI.Signature ?
                  (infoAPI.Signature.includes("<h1") ? <div dangerouslySetInnerHTML={{ __html: infoAPI.Signature }} /> : <img width={250} height={150} src={`http://localhost:63642/${infoAPI.Signature}`} alt="signature upload"></img>)
                  : null)
              }
            </div>
          </Row>
        </>
      ),
    },
    {
      key: "2",
      label: t('Upload your own'),
      children: (
        <>
          <Dragger
            {...uploadConfig}
            beforeUpload={beforeUpload}
            accept="image/*"
            listType="picture-card"
            showUploadList={false}
            onChange={({ file }) => handleFileChange(file)}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              {t('Click or drag file to this area to upload')}
            </p>
          </Dragger>
          <div className="QR_signature">
            <QRCodeCanvas
              style={{ height: "200px", width: "200px" }}
              value="https://tasken.io/setting/system/employee?userId=87fa2638-eefe-42da-baec-70fbb6a5fd23"
            />
            <p>{infoAPI.Email}</p>
            <p>{currentTime.toLocaleString()}</p>

            {/* HERE */}
            {!img_preview ?
              (infoAPI.Signature && !styleSignature
                ?
                (infoAPI.Signature && infoAPI.Signature.includes("<h1") ? <div dangerouslySetInnerHTML={{ __html: infoAPI.Signature }} /> :
                  infoAPI.Signature ? <img width={250} height={150} src={`http://localhost:63642/${infoAPI.Signature}`} alt="signature upload"></img> : <div></div>)
                :
                (infoAPI.SignatureTemp && infoAPI.SignatureTemp.length > 0 ? <div dangerouslySetInnerHTML={{ __html: infoAPI.SignatureTemp }} /> :
                  infoAPI.SignatureTemp && infoAPI.SignatureTemp.includes("<h1") ? <div dangerouslySetInnerHTML={{ __html: infoAPI.SignatureTemp }} /> :
                    infoAPI.SignatureTemp ? <img width={250} height={150} src={`http://localhost:63642/${infoAPI.SignatureTemp}`} alt="signature upload"></img> : <div></div>))
              :
              <Image
                src={img_preview}
                alt="upload image"
                style={{
                  minWidth: "200px",
                  maxWidth: "500px",
                  minHeight: "50px",
                  maxHeight: "150px",
                }}
              />
            }
          </div>
        </>
      ),
    },
  ];

  return isEditing ? (
    <Tabs type="card" items={signature_tab} />
  ) : (
    <div className="QR_signature">
      <QRCodeCanvas
        style={{ height: "200px", width: "200px" }}
        value="https://tasken.io/setting/system/employee?userId=87fa2638-eefe-42da-baec-70fbb6a5fd23"
      />
      <p>{infoAPI.Email}</p>
      <p>{currentTime.toLocaleString()}</p>


      {/* HERE */}
      {infoAPI.Signature && !infoAPI.Signature.includes("<h1") ? (
        <img
          src={"http://localhost:63642/" + infoAPI.Signature}
          width={250}
          height={150}
          alt="signature upload"
        ></img>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: infoAPI.Signature }} />
      )}
    </div>
  );
};

export default Signature;
