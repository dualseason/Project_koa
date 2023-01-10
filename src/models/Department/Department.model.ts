import {
    AutoIncrement,
    BelongsTo,
    Column,
    DataType,
    ForeignKey, HasMany,
    HasOne,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import CompanyModel from "../Company/Company.model";
import CompanyUserModel from "../CompanyUser/CompanyUser.model";

@Table({
    tableName: "department",
    timestamps: true,
})
export default class DepartmentModel extends Model<DepartmentModel> {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.BIGINT,
        comment: "部门ID"
    })
    departmentId !: bigint;

    @Column({
        type: DataType.STRING,
        comment: "部门名称"
    })
    departmentName !: string;

    /**
     * 一对多: 一个部门对应一个公司, 一个公司对应多个部门
     */
    @ForeignKey(()=> CompanyModel)
    @Column({
        type: DataType.BIGINT,
        comment: "公司ID"
    })
    departmentCompanyId !: bigint;

    @BelongsTo(() => CompanyModel)
    departmentCompany: CompanyModel;

    @HasMany(() => CompanyUserModel, "companyUserDepartmentId")
    departmentContactUsers : CompanyUserModel[];

    @HasMany(() => CompanyUserModel, "companyUserDepartmentId")
    departmentSuperiorUsers: CompanyUserModel[];
}
