import {AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import CompanyModel from "../Company/Company.model";

@Table({
    tableName: "position",
    timestamps: true,
})
export default class PositionModel extends Model<PositionModel> {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.BIGINT,
        comment: "职位ID"
    })
    positionId !: bigint;

    @Column({
        type: DataType.STRING,
        comment: "职位名称"
    })
    positionName !: string;

    /**
     * 一对多: 一个职位对应一个公司, 一个公司有多个职位
     */
    @ForeignKey(()=> CompanyModel)
    @Column({
        type: DataType.BIGINT,
        comment: "公司ID"
    })
    positionCompanyId !: bigint;

    @BelongsTo(() => CompanyModel)
    positionCompany: CompanyModel;
}
