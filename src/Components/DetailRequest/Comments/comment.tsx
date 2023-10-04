import { CommentOutlined, UserOutlined, UploadOutlined } from '@ant-design/icons';
import { Input, Button, Avatar, Row, Col, Upload, Spin, Alert, message, } from 'antd';
import './comment.css'
import { useEffect, useState } from 'react';
import request from "../../../Utils/request";
import { useParams } from 'react-router';
import { RcFile } from 'antd/es/upload';
import type { UploadFile } from 'antd/lib/upload';
import { FileTextOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import { RootState } from '../../../Reducers/rootReducer';

interface CommentItem {
    Account: {
        FullName: string | null,
        AvatarPath: string | null,
    },
    Content: string | null,
    Created: string,
    Id: string,

    RequestCommentAttachment: [{
        Id: string,
        Path: string,
    }],
}

interface NewComment {
    comment: string,
    files: RcFile[]
}



function Comment(props: any): JSX.Element {

    // const [detailData, setDetailData] = useState<any>({});
    const avatarDefault = require('../../../public/images/avatarDefault.png');
    const { t } = useTranslation();
    const { userInfo } = props;
    const { requestId } = useParams();
    const [showUpload, setShowUpload] = useState(false);
    // const [fileList, setFileList] = useState<RcFile[]>([]);
    const [newComment, setNewComment] = useState<NewComment>({
        comment: "",
        files: []
    });

    // const [newReply, setNewReply] = useState('');

    // const [showReplyForm, setShowReplyForm] = useState(false);

    // const [replyToCommentId, setReplyToCommentId] = useState<string | null>(null);

    const [comments, setComments] = useState<CommentItem[]>([
        {
            Account: {
                FullName: "",
                AvatarPath: "",
            },
            Content: "",
            Created: "",
            Id: "",
            RequestCommentAttachment: [{
                Id: "",
                Path: ""
            }]
        },
    ]);

    const handleBeforeUpload = (file: RcFile) => {

        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        const acceptedFileExtensions = ['png', 'jpg', 'jpeg', 'pdf', 'csv', 'doc', 'docx', 'pptx', 'ppt', 'txt', 'xls', 'xlsx'];
        if (fileExtension && !acceptedFileExtensions.includes(fileExtension)) {
            message.error(`File type not supported: ${fileExtension}`);
            return false;
        } else {
            setNewComment((prevComments) => ({
                ...prevComments,
                files: [...prevComments.files, file]
            }));
            return false;
        }
    };

    // const handleUploadFile = {
    //     name: 'file',
    //     multiple: true,
    //     action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',

    //     onChange(info: any) {
    //         setShowUpload(true);
    //         const { status } = info.file;
    //         if (status !== 'uploading') {
    //             console.log(info.file, info.fileList);
    //         }
    //         if (status === 'done') {
    //             message.success(`${info.file.name} file uploaded successfully.`);
    //             setNewComment((prevComments) => ({
    //                 ...prevComments,
    //                 files: [...prevComments.files, info.file]
    //             }))
    //             setShowUpload(false);
    //         } else if (status === 'error') {
    //             message.error(`${info.file.name} file upload failed.`);
    //             setShowUpload(false);
    //         }
    //     }
    // }
    const handleRemoveFile = (file: UploadFile<any>) => {
        const updatedFileList = newComment.files.filter((item) => item.uid !== file.uid);
        // setFileList(updatedFileList);
        setNewComment((prevComments) => ({
            ...prevComments,
            files: updatedFileList
        }))
    };

    const [loading, setLoading] = useState(true);



    // useEffect(() => {
    //     const getDetailRequest = async () => {
    //         const endpoint = "/request/Id=" + requestId;
    //         await request.get(endpoint).then((res) => {
    //             setDetailData(res.data.Data);
    //         }
    //         );
    //     }
    //     getDetailRequest();
    // }, [requestId])

    useEffect(() => {
        const getAllCommentsByRequest = async () => {
            const endpoint = "/request/comment/requestId=" + requestId;
            await request.get(endpoint)
                .then((res) => {
                    setComments(res.data.Data);
                    setLoading(false);
                })
                .catch((e) => {
                    console.log(e);
                })
        }

        getAllCommentsByRequest();
    }, [loading, requestId])

    const handlePostComment = () => {
        request.postForm("/request/comment/requestId=" + requestId, newComment).then((res) => {
            setLoading(true);
            // setFileList([]);
            setNewComment({
                comment: "",
                files: []
            });
            // setComments((prevComments) => ({
            //     ...prevComments,
            //     Account: {
            //         FullName: res.data.Data.Account.FullName
            //     },
            //     Content: res.data.Data.Content,
            //     Created: res.data.Data.Created,
            //     Id: res.data.Data.Id
            // }))
        }).catch((e) => { console.log(e); });
    }

    const handleDownloadFile = (attachmentPath: string) => {
        window.open(`http://localhost:63642/${attachmentPath}`);
    }

    // const handleSaveComment = () => {
    //     if (newComment) {
    //         const comment: CommentItem = {
    //             Account: {
    //                 FullName: 
    //             }
    //             content: newComment,
    //             datetime: new Date().toLocaleString(),
    //             id: new Date().toLocaleString(),
    //         };
    //         setShowReplyForm(false);
    //         setComments([...comments, comment]);
    //         setNewComment('');
    //         // setReplyToCommentId(null);
    //         // console.log(comments);
    //     }
    // };

    // const handleSaveReply = () => {
    //     if (newReply) {
    //         const replyComment: CommentItem = {
    //             author: 'Bang Minh Nguyen',
    //             content: newReply,
    //             datetime: new Date().toLocaleString(),
    //             id: new Date().toLocaleString(),
    //         };
    //         setShowReplyForm(false);
    //         setReplyComments([...replyComments, replyComment]);
    //         setNewReply('');
    //         setReplyToCommentId(null);
    //     }
    // }

    // const handleCancelComment = () => {
    //     setShowReplyForm(false);
    // }

    // const handleReplyClick = (commentId: string) => {
    //     setShowReplyForm(true);
    //     setReplyToCommentId(commentId);
    // };

    return (
        <div className='comments-detail-request'>
            {loading ? (<Spin style={{ height: '100vh' }} tip="Loading..." size="large">
                <Alert
                    style={{ width: '100%', textAlign: 'center' }}
                    message="Loading..."
                    description={t('There are some issues happening, please wait a moment or you can try reloading the page')}
                    type="info"
                />
            </Spin>)
                : <>
                    <div className='title-comment'>
                        <CommentOutlined className='icon-comment' />
                        <span> {t('Comments')}</span>
                    </div>
                    <div>
                        <Row gutter={5} className='row-comment-box' align="middle">
                            <Col xs={6} sm={2} lg={1} xl={1}>
                                {userInfo.AvatarPath
                                    ? <Avatar size={37} className='avatar-comment'
                                        src={`http://localhost:63642/${userInfo.AvatarPath}`}
                                        alt="avatar" />
                                    : <Avatar size={37} className='avatar-comment'
                                        src={String(avatarDefault)}
                                        alt="avatar" />
                                }
                                {/* <Avatar size={37} className='avatar-comment' /> */}
                            </Col>
                            <Col xs={18} sm={14} lg={10} xl={8}>
                                <Input.TextArea
                                    rows={3}
                                    className='input-comment'
                                    placeholder={t('Write a comment...')}
                                    value={newComment.comment}
                                    onChange={(e) =>
                                        setNewComment((comment) => ({
                                            ...comment,
                                            comment: e.target.value
                                        }))}
                                />
                            </Col>
                            <Col xs={24} sm={2} lg={2} xl={2}>
                                <Button className='btn-comment' type="primary"
                                    onClick={handlePostComment}
                                    disabled={newComment.comment === ""}
                                >{t('Save')}</Button>
                            </Col>
                        </Row>
                        <Upload className='upload-comment'
                            beforeUpload={handleBeforeUpload}
                            multiple={true}
                            fileList={newComment.files}
                            accept=".png, .jpg, .jpeg, .pdf, .csv, .doc, .docx, .pptx, .ppt, .txt, .xls, .xlsx"
                            onRemove={handleRemoveFile}
                        >
                            <Button className='btn-attachment-comment' icon={<UploadOutlined />}>{t('Add attachments')}</Button>
                            <span className='attention-upload-attachment'> {t('(Maximum 20MB per file)')}</span>
                        </Upload>
                    </div>
                    <div className='comments-detail-request'>
                        {comments.map((comment) => (
                            <Row align="middle" className='list-comment' key={comment.Id}>
                                <Col xs={4} sm={2} className="comment-avatar">
                                    {comment.Account.AvatarPath
                                        ? <Avatar size={37} className='avatar-comment'
                                            src={`http://localhost:63642/${comment.Account.AvatarPath}`}
                                            alt="avatar" />
                                        : <Avatar size={37} className='avatar-comment'
                                            src={String(avatarDefault)}
                                            alt="avatar" />
                                    }
                                </Col>
                                <Col xs={18} sm={20}>
                                    <span className="comment-author">{comment.Account ? comment.Account.FullName : t('No Name')}</span>
                                    <span className="comment-date">{comment.Created
                                        ? dayjs(comment.Created).format('YYYY-MM-DD HH:mm:ss')
                                        : t('No Data')}
                                    </span>
                                </Col>
                                <Col xs={24} sm={24}>
                                    <div className="comment-content">
                                        <span>{comment.Content?.includes("</br>") ? comment.Content?.substring(0, comment.Content.indexOf("</br>")) : comment.Content}</span>
                                        <br></br>
                                        <span>{comment.Content?.includes("</br>") ? comment.Content?.substring(comment.Content.indexOf("</br>") + "</br>".length) : null}</span>
                                    </div>
                                    <span>{comment.RequestCommentAttachment
                                        ? comment.RequestCommentAttachment.map((requestCommentAttachment) => (
                                            <div key={requestCommentAttachment.Id} style={{ cursor: 'pointer', color: 'blue' }}>
                                                <span><FileTextOutlined /> </span>
                                                <span onClick={() => { handleDownloadFile(requestCommentAttachment.Path) }}>{requestCommentAttachment.Path.split("/").pop()}</span>
                                            </div>

                                        ))
                                        : null
                                    }</span>
                                </Col>
                                {/* {!showReplyForm && (
                                    <Col span={2} className='comment-reply'>
                                        <Button icon={<SelectOutlined />}
                                        // onClick={() => handleReplyClick(comment.Id)}
                                        ></Button>
                                    </Col>
                                )} */}
                                {/* {showReplyForm && replyToCommentId === comment.id && (
                            <div className='reply-comment'>
                                <div className='reply-row'>
                                    <span className="comment-avatar">
                                        <Avatar size={40} icon={<UserOutlined />} />
                                    </span>
                                    <span>
                                        <Input.TextArea
                                            className='input-comment'
                                            placeholder='Write a reply...'
                                            value={newReply}
                                            onChange={(e) => setNewReply(e.target.value)}
                                        />
                                    </span>
                                    <span>
                                        <Button className='btn-comment btn-save' type="primary" onClick={handleSaveReply}>Save</Button>
                                    </span>
                                    <span>
                                        <Button className='btn-comment btn-cancel' type="primary" onClick={handleCancelComment}>Cancel</Button>
                                    </span>
                                </div>
                                <div className='reply-upload-comment'>
                                    <Upload className='upload-comment'>
                                        <Button icon={<UploadOutlined />} style={{ backgroundColor: 'rgb(47,133,239)', color: 'white' }}>Add attachments</Button>
                                        <span> (Maximum 20MB per file)</span>
                                    </Upload>
                                </div>
                            </div>
                        )} */}
                                {/* <div>
                            {replyComments.map((replyComment, index) => (
                                <Row className='reply-comment-row' key={replyComment.id}>
                                    <Col span={2} className="comment-avatar">
                                        <Avatar size={40} icon={<UserOutlined />} />
                                    </Col>
                                    <Col span={15} style={{ width: '555px' }}>
                                        <span className="comment-author">{replyComment.author}</span>
                                        <span className="comment-date">{replyComment.datetime}</span>
                                        <div className="comment-content">{replyComment.content}</div>
                                    </Col>
                                </Row>
                            ))}
                        </div> */}
                            </Row>
                        ))}
                    </div>
                </>
            }

        </div >
    );
}
const mapStateToProps = (state: RootState) => ({
    userInfo: state.request.userInfo
});

export default connect(mapStateToProps, null)(Comment);