import {
    AllowNull,
    AutoIncrement,
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import CompanyModel from "../Company/Company.model";

@Table({
    tableName: "arch_user",
    timestamps: true,
})
export default class ArchUserModel extends Model<ArchUserModel>{
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.BIGINT,
        comment: "用户自增ID"
    })
    infoId !: bigint;

    @Column({
        type: DataType.STRING,
        comment: "密码",
    })
    password !: string;

    @Column({
        type: DataType.STRING,
        comment: "性别"
    })
    gender !: string;

    @Column({
        type: DataType.STRING,
        comment: "手机号码"
    })
    phone : string;

    @Column({
        type: DataType.STRING,
        comment: "电子邮箱"
    })
    emails : string;

    @Column({
        type: DataType.DATE,
        comment: "出生日期"
    })
    birthday : Date;

    /**
     * 一对多：一个实际用户有一个默认公司, 一个默认公司有多个员工身份
     */
    @ForeignKey(()=> CompanyModel)
    @AllowNull
    @Column({
        type: DataType.BIGINT,
        comment: "默认公司Id"
    })
    archDefaultCompanyId : bigint;

    @BelongsTo(() => CompanyModel)
    defaultCompany: CompanyModel;
}
