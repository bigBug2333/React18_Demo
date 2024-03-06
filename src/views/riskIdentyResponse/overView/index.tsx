import './index.scss'
import { Tree, Form, Input, Select, Row, Col, Button, Space, Table, Pagination } from 'antd';
import {
    SearchOutlined,
    ClearOutlined,
} from '@ant-design/icons';
import type { DataNode, TreeProps } from 'antd/es/tree';
import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from 'react';
import { queryRiskHBData, queryRiskTaxList, queryRiskOlive } from '../../../request/index';
import TaxRisks from './components/taxRisks'
import SectorRisks from './components/sectorRisks'; // 导入 LineChart 组件
import SectorPatment from './components/sectorPatment'; // 导入 LineChart 组件


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

    const [pieChartDate, setPieChartDate] = useState<any>({
        data: [
            {
                "value": "1",
                "name": "增值税"
            },
            {
                "value": "0",
                "name": "企业所得税"
            },
            {
                "value": "0",
                "name": "房产税"
            },
            {
                "value": "0",
                "name": "城镇土地使用税"
            },
            {
                "value": "1",
                "name": "印花税"
            },
            {
                "value": "0",
                "name": "环境保护税"
            }
        ],
        total: 0
    }); // 饼图数据

    const [barChartOption, setBarChartOption] = useState<any>({
        "xAxis": [
            "交通",
            "高新",
            "矿业",
            "生物",
            "健康",
            "检测",
            "智能",
            "中成",
            "电子院",
            "创益"
        ],
        "seriesData": {
            "xtsb": [
                "1",
                "1",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0"
            ],
            "sjts": [
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0",
                "0"
            ],
            "bkfxzb": [
                "0.00",
                "0.00",
                "0.00",
                "0.00",
                "0.00",
                "0.00",
                "0.00",
                "0.00",
                "0.00",
                "0.00"
            ]
        }
    }); // 柱状图数据
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
        // 获取上方的风险信息
        queryRiskHBData({
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
        })

        // 获取饼图
        queryRiskTaxList({
            identId: localStorage.getItem("uuid"),
            fTime: "2024-03",
            queryType: "0"
        }).then((res) => {
            let total = 0

            let data = res.data.data.map((item: any) => {
                total += Number(item.fxtsbcount)
                return { value: item.fxtsbcount, name: item.fname }
            })
            setPieChartDate({
                data,
                total
            })
            console.log(data, total)
        })
        // 获取柱状图
        queryRiskOlive({
            identId: localStorage.getItem("uuid"),
            fTime: "2024-03",
            queryType: "0"
        }).then((res) => {

            let needData = res.data.data.filter((item: any, t: number) => t < 10 && item.fPlateName != "合计")
            setBarChartOption({
                xAxis: needData.map((item: any) => item.fPlateName),
                seriesData: {
                    xtsb: needData.map((item: any) => item.fxtsbcount),
                    sjts: needData.map((item: any) => item.fsjts),
                    bkfxzb: needData.map((item: any) => item.bkfxzb),
                },
            })
        })
    }
    const data = [
        { date: '2024-01-01', value: 100 },
        { date: '2024-01-02', value: 150 },
        { date: '2024-01-03', value: 200 },
        // 其他数据项
    ];
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
                    <TaxRisks pieChartDate={pieChartDate}></TaxRisks>
                    <div className="tax-flex-center-all pieChartTips">
                        <div>
                            <div className="itemTop">
                                <span>{pieChartDate.total}</span>
                                <span>个</span>
                            </div>
                            <div className="itemBottom" style={{ color: 'rgba(0, 0, 0, 0.55)' }}>风险总数</div>
                        </div>
                    </div>
                </div>
                <div className='chartBox bgcBasic'>
                    <div className="tax-layout-item tree-container  " >
                        <div className="tax-title tax-flex-vertical pd12 ">
                            <div className="split"></div>
                            <span className="title">板块整体风险情况</span>
                        </div>
                    </div>
                    <SectorRisks barChartOption={barChartOption} ></SectorRisks>

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
                    <SectorPatment data={data} ></SectorPatment>
                </div>
                <div className='chartBox bgcBasic'>
                    <div className="tax-layout-item tree-container  " >
                        <div className="tax-title tax-flex-vertical pd12 ">
                            <div className="split"></div>
                            <span className="title">板块已补缴税金</span>
                        </div>
                    </div>
                    <SectorPatment data={data} ></SectorPatment>
                </div>
            </div>

        </div >
    )
}

export default View