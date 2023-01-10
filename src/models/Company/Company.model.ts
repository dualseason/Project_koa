import {AutoIncrement, Column, DataType, HasMany, HasOne, Model, PrimaryKey, Table} from "sequelize-typescript";
import ArchUserModel from "../ArchUser/ArchUser.model";
import CompanyUserModel from "../CompanyUser/CompanyUser.model";
import DepartmentModel from "../Department/Department.model";
import PositionModel from "../Position/Position.model";

@Table({
    tableName: "company",
    timestamps: true,
})
export default class CompanyModel extends Model<CompanyModel>{
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.BIGINT,
        comment: "公司ID自增"
    })
    companyId !: bigint;

    @Column({
        type: DataType.STRING,
        comment: "公司名称"
    })
    companyName !: string;

    @HasMany(() => ArchUserModel, "archDefaultCompanyId")
    archUsers : ArchUserModel[];

    @HasMany(() => CompanyUserModel, "companyUserSuperiorDepartmentId")
    companyContactUsers: CompanyUserModel[];

    @HasMany(() => DepartmentModel, "departmentCompanyId")
    departments: DepartmentModel[];

    @HasMany(() => PositionModel, "positionCompanyId")
    positions: PositionModel[];
}
