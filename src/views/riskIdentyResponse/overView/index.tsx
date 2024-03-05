import './index.scss'
import { Tree, Form, Input, Select, Row, Col, Button, Space, Table, Pagination } from 'antd';
import {
    SearchOutlined,
    ClearOutlined,
} from '@ant-design/icons';
import type { DataNode, TreeProps } from 'antd/es/tree';
import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from 'react';
import { queryRiskHBData } from '../../../request/index';
import TaxRisks from './components/taxRisks'

const View = () => {
    const [cateList, setCateList] = useState<any>([
        {
            name: '风险数量',
            suffix: '个',
            align: "right",
        },
        {
            name: '应补缴金额',
            suffix: '万元',
            align: "right"
        },
        {
            name: '已补缴金额',
            suffix: '万元',
            align: "right"
        },
        {
            name: '整改率',
            suffix: '%',
            align: "right"
        },
    ]); // 设置要展示的内容

    // 获取金额
    const getNum = (val: string) => {
        return val.replace(/[\u4E00-\u9FA5\\s]+/, '')
    }
    // 获取单位
    const getUnit = (val: string) => {
        let retUnit = val.replace(/[0-9]*/g, '').replace(/\./, '')
        if (retUnit.indexOf(',') !== -1) {
            retUnit = retUnit.replace(',', '')
        }
        return retUnit
    }
    useEffect(() => {
        initList()
    }, []);
    const initList = async () => {
        await queryRiskHBData({
            identId: localStorage.getItem("uuid"),
            fTime: "2024-03",
            queryType: "0"
        }).then((res) => {
            let data = res ? res.data.data[0] : {}
            setCateList([
                {
                    name: '风险数量',
                    suffix: '个',
                    num: data.ffxzs,
                    hb: data.ffxzshb,  //环比
                    sjts: data.fsjts,
                    xtsb: data.fxtsbcount,
                    type: 0
                },
                {
                    name: '应补缴金额',
                    suffix: getUnit(data.fpayment),
                    num: getNum(data.fpayment),
                    hb: data.fpaymenthb,  //环比
                    sjts: data.fpaymentsjts,
                    xtsb: data.fpaymentxtsb,
                    type: 1
                },
                {
                    name: '已补缴金额',
                    suffix: getUnit(data.fpayment),
                    num: getNum(data.ftaxes),
                    hb: data.ftaxeshb,  //环比
                    sjts: data.ftaxessjts,
                    xtsb: data.ftaxesxtsb,
                    type: 1
                },
                {
                    name: '整改率',
                    suffix: '%',
                    num: data.zgl,
                    hb: data.fyydfxslhb, //环比
                    sjts: data.fsjtszgl,
                    xtsb: data.fxtsbzgl,
                    type: 0
                },
            ])
            console.log(111, cateList)

        })
    }

    return (
        <div className='header tax-full tax-flex tax-flex-column'>
            {/* 上方数字显示栏 */}
            <div className='cateWrap'>
                {cateList.map((item: {
                    hb: string;
                    num: string; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; suffix: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined;
                }, index: Key | null | undefined) => (
                    <div className="cate taxShadow" key={index}>
                        <div className="cateLeft">
                            <span>{item.name}</span>
                        </div>
                        <div className="cateRight">
                            <div className="itemLeft">
                                <div className="itemTop">
                                    <span>{item.num}</span>
                                    <span>{item.suffix}</span>
                                </div>
                                <div className="itemBottom"
                                    style={{
                                        color: +item.hb > 0 ? '#e52d29' : '#78b94d'
                                    }}
                                >
                                    <span className="radiusCate">
                                        {/* 本期：环比；累计：同比 */}
                                        <div> 环比</div>
                                        <div style={{
                                            borderBottom: +item.hb > 0 ? '6px solid #e52d29' : 'none',
                                            borderTop: +item.hb <= 0 ? '6px solid #78b94d' : 'none',
                                            top: +item.hb > 0 ? '-10px' : '10px'
                                        }}></div>
                                        <div>{item.hb == '9999.99' ? '-' : item.hb}%</div>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                ))
                }
            </div >
            {/* 下方图表 */}
            {/* 第一排左侧图表 */}
            <div className='chartList'>
                <div className='chartBox bgcBasic'>
                    <div className="tax-layout-item tree-container  " >
                        <div className="tax-title tax-flex-vertical pd12 ">
                            <div className="split"></div>
                            <span className="title">常用工具</span>
                        </div>
                    </div>
                    <TaxRisks></TaxRisks>
                </div>
                <div className='chartBox bgcBasic'>
                    <div className="tax-layout-item tree-container  " >
                        <div className="tax-title tax-flex-vertical pd12 ">
                            <div className="split"></div>
                            <span className="title">板块整体风险情况</span>
                        </div>
                    </div>
                    <TaxRisks></TaxRisks>
                </div>
            </div>
            <div className='chartList'>
                <div className='chartBox bgcBasic'>
                    <div className="tax-layout-item tree-container  " >
                        <div className="tax-title tax-flex-vertical pd12 ">
                            <div className="split"></div>
                            <span className="title">板块应补缴税金</span>
                        </div>
                    </div>
                    <TaxRisks></TaxRisks>
                </div>
                <div className='chartBox bgcBasic'>
                    <div className="tax-layout-item tree-container  " >
                        <div className="tax-title tax-flex-vertical pd12 ">
                            <div className="split"></div>
                            <span className="title">板块已补缴税金</span>
                        </div>
                    </div>
                    <TaxRisks></TaxRisks>
                </div>
            </div>

        </div >
    )
}

export default View