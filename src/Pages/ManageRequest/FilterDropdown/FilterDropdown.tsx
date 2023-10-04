import { CaretDownOutlined, FilterOutlined } from "@ant-design/icons";
import { Button, Dropdown, FormInstance, } from "antd";
import "./index.css";
import { RootState } from "../../../Reducers/rootReducer";
import { setStatus } from "../../../Actions/requestAction";
import { connect } from "react-redux";
import FilterForm from "./FilterForm";
import { useTranslation } from "react-i18next";

interface FilterDropdownProps {
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

const FilterDropdown: React.FC<FilterDropdownProps> = ({
    setFilter,
    setLoading,
    handleClear,
    setStatus,
    form,
    onApply,
}) => {
    const {t} = useTranslation();
    
    return (
        <Dropdown
            overlay={
                <FilterForm
                    setStatus={setStatus}
                    setFilter={setFilter}
                    form={form}
                    handleClear={handleClear}
                    setLoading={setLoading}
                    onApply={onApply}
                />
            }
            trigger={["click"]}
        >
            <Button style={{ marginRight: 5, marginLeft: 3, color: '#8894a1', fontFamily: 'Segoe UI', fontWeight: 600 }}>
                <FilterOutlined style={{color: 'green'}}/>
                    <span className='text-filter'>{t('filter')}</span>
                <CaretDownOutlined />
            </Button>
        </Dropdown>
    );
};

const mapStateToProps = (state: RootState) => ({
    status: state.request.status
})

const mapDispatchToProps = { setStatus }

export default connect(mapStateToProps, mapDispatchToProps)(FilterDropdown)
