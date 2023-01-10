import {AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import CompanyModel from "../Company/Company.model";
import DepartmentModel from "../Department/Department.model";

@Table({
    tableName: "company_user",
    timestamps: true,
})
export default class CompanyUserModel extends Model<CompanyUserModel> {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.BIGINT,
        comment: "身份ID",
    })
    contactId !: bigint;

    @Column({
        type: DataType.BIGINT,
        comment: "用户自增ID"
    })
    infoId !: bigint;

    @Column({
        type: DataType.BIGINT,
        comment: "员工岗位"
    })
    positionId !: bigint;

    /**
     * 一对多：一个身份对应一个公司, 一个公司对应多个员工身份
     */
    @ForeignKey(()=> CompanyModel)
    @Column({
        type: DataType.BIGINT,
        comment: "公司ID",
    })
    companyUserCompanyId !: bigint;

    @BelongsTo(() => CompanyModel)
    companyUserCompany: CompanyModel;

    /**
     * 一对多: 一个身份对应一个部门, 一个部门对应多个员工身份
     */
    @ForeignKey(()=> DepartmentModel)
    @Column({
        type: DataType.BIGINT,
        comment: "部门ID"
    })
    companyUserDepartmentId !: bigint;

    @BelongsTo(() => DepartmentModel)
    companyUserDepartment: DepartmentModel;

    /**
     * 一对多: 一个身份对应一个上级部门, 一个上级部门对应多个员工身份
     */
    @ForeignKey(() => DepartmentModel)
    @Column({
        type: DataType.BIGINT,
        comment: "上级部门ID"
    })
    companyUserSuperiorDepartmentId !: bigint;

    @BelongsTo(() => DepartmentModel)
    companyUserSuperiorDepartment: DepartmentModel;
}
