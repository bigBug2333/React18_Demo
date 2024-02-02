import './lawLibrary.scss'
import { Carousel, Input, Radio, Tabs, Tooltip, Col, Row, Modal } from 'antd';
const { Search } = Input;
import { UserOutlined, SearchOutlined, DownOutlined } from '@ant-design/icons';
import { ChangeEvent, useEffect, useState } from "react"
import {
  queryHomeFixedNew,
  queryCommon,
  queryArticleCount,
  queryHomeData,
  queryRepArticleContent
} from '../../request/index';
import { queryHomeColumnListType, zhListChildrenType } from './interface';
import MBTitle from '@/components/MBTitle';
import { size } from 'lodash';
// import TabPane from 'antd/lib/tabs/TabPane';
import queryHomeFixedNewData from '../../mock/lawLibrary/queryHomeFixedNew.json';
import queryCommonData from '../../mock/lawLibrary/queryCommon.json';
import _ from 'lodash';
import TinyMCEViewer from '../../components/TinymceInline';
import tinymce from 'tinymce'

const View = () => {
  const { TabPane } = Tabs;
  // 批量定义多个状态变量
  const [state, setState] = useState<queryHomeColumnListType>({
    queryHomeColumnList: {
      fCommonNew: [],
      fcolumn: [],
      fspecialColumn: [],
    },
    queryCommonParams: {
      linkType: 0,
      toolType: 0,
    },
    queryCommonList: {
      fcommonLink: [],
      fcommonTool: [],
    },
    queryHomeDataList: {
      rows: [],
      total: 0,
    },//列表数据
    zhList: [],
    fcolumnid: "", //当前tab页的id
    pageNumber: 1,
    pageSize: 20,
    detailModal: true,
    detailContent: "",
  });
  const [content, setContent] = useState<string>('123'); // 设置要展示的内容
  useEffect(() => {
    initList()
  }, []);

  const initList = async () => {
    // await queryHomeFixedNew().then(res => {
    //   if (res.status == 200) {
    // console.log(queryHomeFixedNewData.data.fcolumn[0])
    setState((prevState) => ({
      ...prevState,
      // queryHomeColumnList: res.data.data,
      queryHomeColumnList: queryHomeFixedNewData.data,//采用假数据
      fcolumnid: queryHomeFixedNewData.data.fcolumn[0].fCode
    }))
    // await queryArticleCountList(queryHomeFixedNewData.data.fcolumn[0].fCode)
    await contentClick(queryHomeFixedNewData.data.fcolumn[0].fCode, null, true)
    //   } else {

    //     setState({
    //       ...state,
    //       queryHomeColumnList: queryHomeFixedNewData.data,
    //     })
    //   }
    // }).catch(err => {
    //   setState({
    //     ...state,
    //     queryHomeColumnList: queryHomeFixedNewData.data,
    //   })

    // })
    await changeLink()
    // await queryArticleCountList()
  }
  const changeLink = async () => {
    let { linkType, toolType } = state.queryCommonParams
    await queryCommon({
      linkType,
      toolType,
    }).then((res) => {
      if (res && res.status == 200) {
        // console.log(123)
        setState((prevState) => ({
          ...prevState,
          queryCommonList: res.data.data,
        }))
      } else {

        setState((prevState) => ({
          ...prevState,
          queryCommonList: queryCommonData.data,
        }))
      }
      // this.queryHomeColumnList = Object.assign(_.cloneDeep(this.queryHomeColumnList), res)
      // this.$Message.success("删除成功");
      // this.$refs.table.getTableData();
    }).catch((_err) => {
      // console.log(1234567, queryCommonData.data)
      setState((prevState) => ({
        ...prevState,
        queryCommonList: queryCommonData.data,
      }))
    });
  }
  // 处理路径的方法
  const handleUrl = (value: string) => {
    let urls = null;
    if (value.toLowerCase().startsWith('http')) {
      urls = value
    } else {
      urls = "http://" + value
    }
    return urls
  }
  // 法规库左侧内容配置集合
  const zhList = [
    //过滤条件list
    {
      name: '税费种类',
      code: 'tax',
      flag: false,
      show: true,
      list: [],
    },
    {
      name: '地域范围',
      code: 'area',
      flag: false,
      show: true,
      list: [],
    },
    {
      name: '发文机关',
      code: 'org',
      flag: true,
      show: true,
      list: [],
    },
    {
      name: '适用板块',
      code: 'plate',
      flag: true,
      show: true,
      list: [],
    },
    {
      name: '法规录入方式',
      code: 'way',
      flag: true,
      show: true,
      list: [],
    },
    {
      name: '优惠政策分类',
      code: 'policy',
      flag: false,
      show: true,
      list: [],
    },
    {
      name: '发布日期',
      code: 'time',
      flag: true,
      show: true,
      list: [],
    },
  ]
  // 过滤左侧内容展示
  const queryArticleCountList = async (fcolumnid: string) => {
    await queryArticleCount(fcolumnid).then(res => {
      // console.log(888, res.data.data)
      // 使用 _.filter 和 _.some 进行过滤
      const filteredArray = _.map(res.data.data, (value: any, key: any) => {

        let matchingObject: any = _.find(zhList, { code: key });
        matchingObject.list = value
        matchingObject.flag = true
        // console.log(matchingObject, value)
        return matchingObject
      });

      // console.log(444, filteredArray);
      setState((prevState) => ({
        ...prevState,
        zhList: filteredArray,
      }))
    })
  }
  // 点击切换法规库左侧节点
  const contentClick = (fCode: string, items: zhListChildrenType | null, _init: true) => {
    // console.log(fCode, items, state)

    let param = {
      fcolumnid: fCode,
      fsearch: [""],
      flabel: items && items.fname || "",
      forgname: "",
      ftag: "",
      ftime: "",
      ftype: 1,
      fOrder: 2,                //决定升序1降序2
      pageNumber: state.pageNumber,
      pageSize: state.pageSize,
    }
    queryHomeData(param).then(res => {
      // console.log(777, res)
      setState((prevState) => ({
        ...prevState,
        queryHomeDataList: res.data.data,
      }))

    })
  }
  // 切换Tab页选项
  const changeTabPanes = (value: string) => {
    console.log(value)
    setState((prevState) => ({
      ...prevState,
      fcolumnid: value,
    }))

    if (value == "ed2b7c03d217450bbc9d8d05f43f6cbd" || value == "6caf12a6d1c043e298709421a513dd70") {
      queryArticleCountList(value)
    }
    contentClick(value, null, true)

  }

  // 关键字红字突出
  const handleSearch = (text: string) => {
    let keyword = ""
    const regex = new RegExp(`(${keyword})`, 'gi');
    return text.replace(regex, '<span style="color: red;">$1</span>');
  }
  const { fCommonNew, fspecialColumn, fcolumn } = state.queryHomeColumnList
  const { fcommonTool, fcommonLink } = state.queryCommonList
  // 点击法规详情
  const showDetailModal = async (row: any) => {
    await queryRepArticleContent({ fcode: row.fcode, ftype: 0 }).then((res) => {
      // console.log(row, res.data.data.fContent)
      // // editorRef ? editorRef.setContent(res.data.data.fContent) : null
      // setState((prevState) => ({
      //   ...prevState,
      //   detailContent: res.data.data.fContent,
      //   detailModal: true,
      // }))
      // handleContentChange(res.data.data.fContent)
    })

  };
  // 关闭法规详情
  const handleCancel = () => {
    setState((prevState) => ({
      ...prevState,
      detailModal: false,
    }))
  };
  const handleContentChange = (newContent: string) => {
    setState((prevState) => ({
      ...prevState,
      detailModal: true,
      detailContent: newContent,
    }))
  };
  // const setContent = (newContent: string) => {
  //   setState((prevState) => ({
  //     ...prevState,
  //     detailContent: newContent,
  //   }))
  // };


  // console.log(222, state, queryCommonData, queryHomeFixedNewData)
  return (
    <div className='home tax-full'>
      <div className='search-word'>
        {/* 搜索框 */}
        <Search
          className=" sear-input headerSearchInt"
          placeholder="请输入关键字"
          enterButton="搜索"
          size="large"
          prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          onSearch={value => console.log(value)}
        />
        {/* 常用搜索 */}
        <div className="search-words">
          <strong className="egText">常用搜索：</strong>
          {fCommonNew && fCommonNew.length > 0 ? fCommonNew.map((content) => (
            <span className="commonSearchText" key={content.fcode} title={content.ftitle}>{content.fShowTitle}</span>
          )) : null
          }
        </div>
      </div>
      {/* content   */}
      <div className="law-content tax-flex">
        {/* 左半部分 */}
        <div className="tax-layout-item law-content-left" >
          {/* 上方title+轮播图 */}
          <div className="law-top">
            <div className="top-part">
              {/* <span>专栏</span> */}
              <div className="tax-title tax-flex-vertical">
                <div className="split"></div>
                <span className="title">专栏</span>
              </div>
              <span className='rightText'>
                往期专栏
                <DownOutlined />
                {/* <Icon: type="modalTypeChange == 0 ? 'ios-arrow-forward' : 'ios-arrow-down'" className="backIcon" /> */}
              </span>
            </div>
            {/* 轮播图 */}
            <div className="law-carious">
              <Carousel autoplay>
                {
                  fspecialColumn && fspecialColumn.length > 0 ? fspecialColumn.map((item) => (
                    <div className="demo-carousel" key={item.fcode}>
                      <div className="carous-img">
                        <img src={item.fcover} alt="" />
                        <h1 className="law-carious-text">{item.ftitle}</h1>
                      </div>
                    </div>
                  )) : null
                }
              </Carousel>
            </div>
          </div>
          {/* 常用工具 */}
          <div className="law-top">
            <div className="top-part">
              {/* <span>专栏</span> */}
              <div className="tax-title tax-flex-vertical">
                <div className="split"></div>
                <span className="title">常用工具</span>
              </div>
              <span className='rightText'>
                {/* <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}> */}
                <Radio.Group value={state.queryCommonParams.toolType}>
                  <Radio.Button value={0}>通用</Radio.Button>
                  <Radio.Button value={1}>自定义</Radio.Button>
                </Radio.Group>
              </span>
            </div>
            <div className="law-tools">
              <div className="law-tools-top">
                {
                  fcommonTool && fcommonTool.length > 0 ? fcommonTool.map((item) => (
                    <div className="law-tools-top-left widthtools" key={item.fupdatetime + item.fusername}>
                      {
                        state.queryCommonParams.toolType == 0 ?
                          <a href={handleUrl(item.furl)} target="_blank" >
                            <img src={item.flogo} className="imgs" alt="" />
                          </a> :
                          <a href={handleUrl(item.furl)} target="_blank" >
                            <img src={item.flogo} className="imgs" alt="" />
                          </a>
                      }
                    </div>
                  )) : null
                }
              </div>
            </div>
          </div>
          {/* 常用链接 */}
          <div className="law-top">
            <div className="top-part">
              {/* <span>专栏</span> */}
              <div className="tax-title tax-flex-vertical">
                <div className="split"></div>
                <span className="title">常用链接</span>
              </div>
              <span className='rightText'>
                {/* <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}> */}
                <Radio.Group value={state.queryCommonParams.linkType}>
                  <Radio.Button value={0}>通用</Radio.Button>
                  <Radio.Button value={1}>自定义</Radio.Button>
                </Radio.Group>
              </span>
            </div>
            <div className="law-tools">
              <div className="law-tools-top">
                {
                  fcommonLink && fcommonLink.length > 0 ? (fcommonLink.map((item, index) => (
                    <div className="law-tools-top-left" key={item.fupdatetime + item.fusername}>
                      {
                        state.queryCommonParams.linkType == 0 ?
                          <a href={handleUrl(item.furl)} target="_blank" className='linBoxs'>
                            <img src={item.flogo} className={index < 6 ? "imgsLong" : 'imgsShort'} alt="" />
                          </a>
                          :
                          <a href={handleUrl(item.furl)} target="_blank" className='linBoxs'>
                            <img src={item.flogo} className="imgs" alt="" />
                          </a>
                      }
                    </div>
                  ))) : null
                }
              </div>
            </div>
          </div>
        </div>

        {/* 右半部分 */}
        <div className="tax-layout-item law-content-right tax-flex tax-flex-column">
          <Tabs
            // defaultActiveKey="1"
            onChange={changeTabPanes}
          >
            {
              // fcolumn && fcolumn.length > 0 ?
              queryHomeFixedNewData.data.fcolumn.map((items) => (
                <TabPane tab={items.fName} key={items.fCode}>
                  <div className="tab-content tax-full tax-flex tax-flex-item overyH" >
                    {/* 左侧过滤树 */}
                    {
                      items.fCode == 'ed2b7c03d217450bbc9d8d05f43f6cbd' || items.fCode == '6caf12a6d1c043e298709421a513dd70' ?
                        <div className="tab-content-left" >
                          {/* 过滤条件 */}
                          <div className="tab-search">
                            <h1>过滤条件</h1>
                            {/* <div className='img'>
                              <img src="../../assets/law/19.png" alt="" />
                            </div> */}
                          </div>
                          {/* 循环渲染树 */}
                          {
                            state.zhList && state.zhList.length > 0 ? (state.zhList.map((item, _index) => (
                              <div className="search-select-collepse" key={item.code}>
                                {/* 名称展示 */}
                                <div className="search-colleps-title"
                                // onClick={item.flag = !item.flag}
                                >
                                  <h1>{item.name}</h1>
                                  {item.flag ?
                                    <img src="../../assets/law/down.png" alt="" />
                                    : <img src="../../assets/law/top.png" alt="" />
                                  }
                                </div>

                                {/* 内容展示 */}
                                <div className='search-colleps-content'>
                                  {
                                    item.list && item.list.length > 0 ? (item.list.map((items, indexs) => (
                                      <div className="content-item" key={items.fcode + indexs} onClick={() => contentClick(item.code, items, true)}>
                                        <p>{items.fname}</p>
                                        <p>{"（" + items.count + "）"}</p>
                                      </div>
                                    ))) : null
                                  }
                                </div>
                              </div>
                            ))) : null
                          }
                        </div>
                        : null
                    }
                    <div className="tab-content-right tax-flex-item">
                      <div className="main-content" style={{
                        paddingLeft: state.fcolumnid == 'ed2b7c03d217450bbc9d8d05f43f6cbd' || state.fcolumnid == '6caf12a6d1c043e298709421a513dd70' ? "12px" : "0"
                      }}>
                        {
                          state.queryHomeDataList.rows && state.queryHomeDataList.rows.length > 0 ?
                            (state.queryHomeDataList.rows.map((item, index) => (
                              <div className="readContent" onClick={() => showDetailModal(item)} key={item.fcode}>
                                <Row>
                                  <Col span="18">
                                    <div className="title">
                                      <span className="num">{(state.pageNumber - 1) * state.pageSize + (index + 1)}</span>
                                      <p>
                                        <span dangerouslySetInnerHTML={{ __html: handleSearch(item.ftitle) }} ></span>
                                        {
                                          item && item.fnew == '0' ?
                                            <span className="iconNew" >NEW</span>
                                            : null
                                        }
                                      </p>
                                    </div>
                                  </Col>
                                  <Col span="6">
                                    <div className="text lineHeight42" >
                                      {item.fpublishDate} 发布
                                    </div>
                                  </Col>
                                </Row>
                              </div>
                            ))) : null
                        }
                      </div>
                    </div>
                  </div>


                </TabPane>
              ))
              // : null
            }



          </Tabs>
        </div>

      </div>
      <Modal
        open={state.detailModal}
        title="税收法规库详情"
        width={1000}
        onCancel={handleCancel}
        footer={null}
      >
        {/* <div className="tinymceLine-container editor-container">
          <textarea className="tinymce-textarea" id="tinymceId" key="tinymceId"></textarea>
        </div> */}
        <TinyMCEViewer content={content} tinymceId="myTinyMCE" />
        <button onClick={() => setContent('<div class="dpu8C _2kCxD " style="max-width: 100%; overflow-x: visible; font-size: 18px; line-height: 30px; color: #222222; font-family: arial; background-color: #ffffff;" data-mce-style="max-width: 100%; overflow-x: visible; font-size: 18px; line-height: 30px; color: #222222; font-family: arial; background-color: #ffffff;"><p style="overflow-y: auto; max-width: 100%; line-height: 30px; text-align: justify; visibility: visible; padding: 0px !important; margin: 0px !important 16px 0px 16px;" data-mce-style="overflow-y: auto; max-width: 100%; line-height: 30px; text-align: justify; visibility: visible; padding: 0px !important; margin: 0px !important 16px 0px 16px;"><span style="max-width: 100%; letter-spacing: 0.034em; visibility: visible;" data-mce-style="max-width: 100%; letter-spacing: 0.034em; visibility: visible;">9月11日上午，人民币出现猛拉行情。</span><br style="display: block; max-width: 100%;" data-mce-style="display: block; max-width: 100%;"></p></div><div class="dpu8C _2kCxD " style="max-width: 100%; overflow-x: visible; font-size: 18px; line-height: 30px; color: #222222; margin-top: 24px; font-family: arial; background-color: #ffffff;" data-mce-style="max-width: 100%; overflow-x: visible; font-size: 18px; line-height: 30px; color: #222222; margin-top: 24px; font-family: arial; background-color: #ffffff;"><p style="overflow-y: auto; max-width: 100%; line-height: 30px; text-align: justify; visibility: visible; padding: 0px !important; margin: 0px !important 16px 0px 16px;" data-mce-style="overflow-y: auto; max-width: 100%; line-height: 30px; text-align: justify; visibility: visible; padding: 0px !important; margin: 0px !important 16px 0px 16px;"><span style="max-width: 100%; visibility: visible;" data-mce-style="max-width: 100%; visibility: visible;">在岸、离岸人民币兑美元双双反弹超过650点，接连收复多个关口，发生了什么？</span></p></div><div class="dpu8C _2kCxD " style="max-width: 100%; overflow-x: visible; font-size: 18px; line-height: 30px; color: #222222; margin-top: 24px; font-family: arial; background-color: #ffffff;" data-mce-style="max-width: 100%; overflow-x: visible; font-size: 18px; line-height: 30px; color: #222222; margin-top: 24px; font-family: arial; background-color: #ffffff;"><section style="overflow-y: auto; max-width: 100%; text-align: justify; margin-left: 16px; margin-right: 16px; margin-bottom: 0px; visibility: visible;" data-mce-style="overflow-y: auto; max-width: 100%; text-align: justify; margin-left: 16px; margin-right: 16px; margin-bottom: 0px; visibility: visible;"><span style="max-width: 100%; visibility: visible;" data-mce-style="max-width: 100%; visibility: visible;">分析普通认为，一方面，8月经济数据即将发布，机构预计相关数据超预期，且叠加国内经济政策引发的预期向好导致。另一方面，<strong style="max-width: 100%; letter-spacing: 0.578px; visibility: visible;" data-mce-style="max-width: 100%; letter-spacing: 0.578px; visibility: visible;">由于日元升值引发美元指数杀跌所致。</strong></span></section></div><div class="dpu8C _2kCxD " style="max-width: 100%; overflow-x: visible; font-size: 18px; line-height: 30px; color: #222222; margin-top: 24px; font-family: arial; background-color: #ffffff;" data-mce-style="max-width: 100%; overflow-x: visible; font-size: 18px; line-height: 30px; color: #222222; margin-top: 24px; font-family: arial; background-color: #ffffff;"><p style="overflow-y: auto; max-width: 100%; line-height: 30px; text-align: justify; visibility: visible; padding: 0px !important; margin: 0px !important 16px 0px 16px;" data-mce-style="overflow-y: auto; max-width: 100%; line-height: 30px; text-align: justify; visibility: visible; padding: 0px !important; margin: 0px !important 16px 0px 16px;"><span style="max-width: 100%; visibility: visible;" data-mce-style="max-width: 100%; visibility: visible;"><span style="max-width: 100%; letter-spacing: 0.578px; visibility: visible;" data-mce-style="max-width: 100%; letter-spacing: 0.578px; visibility: visible;">值得一提的是，9月11日，全国外汇市场自律机制专题会议在北京召开。</span><span style="max-width: 100%; letter-spacing: 0.578px; visibility: visible;" data-mce-style="max-width: 100%; letter-spacing: 0.578px; visibility: visible;">会议强调，</span><strong style="max-width: 100%; letter-spacing: 0.578px; visibility: visible;" data-mce-style="max-width: 100%; letter-spacing: 0.578px; visibility: visible;">金融管理部门有能力、有信心、有条件保持<span style="background-color: rgb(231, 76, 60);" data-mce-style="background-color: #e74c3c;">人民币汇率</span>基本稳定，该出手时就出手，坚决对单边、顺周期行为予以纠偏，坚决对扰乱市场秩序行为进行处置，坚决防范汇率超调风险。</strong></span></p></div><div class="dpu8C _2kCxD " style="max-width: 100%; overflow-x: visible; font-size: 18px; line-height: 30px; color: #222222; margin-top: 24px; font-family: arial; background-color: #ffffff;" data-mce-style="max-width: 100%; overflow-x: visible; font-size: 18px; line-height: 30px; color: #222222; margin-top: 24px; font-family: arial; background-color: #ffffff;"><p style="overflow-y: auto; max-width: 100%; line-height: 30px; text-align: justify; visibility: visible; padding: 0px !important; margin: 0px !important 16px 0px 16px;" data-mce-style="overflow-y: auto; max-width: 100%; line-height: 30px; text-align: justify; visibility: visible; padding: 0px !important; margin: 0px !important 16px 0px 16px;"><span style="max-width: 100%; visibility: visible;" data-mce-style="max-width: 100%; visibility: visible;"><strong style="max-width: 100%; letter-spacing: 0.578px; visibility: visible;" data-mce-style="max-width: 100%; letter-spacing: 0.578px; visibility: visible;">此外，11日午间，央行发布的数据显示，8月人民币贷款增加1.36万亿元，同比多增868亿元；8月末，广义货币（M2）余额286.93万亿元，同比增长10.6%；8月社会融资规模增量为3.12万亿元，比上年同期多6316亿元。</strong></span></p></div>')}>Load Content</button>
      </Modal>
    </div >
  )
}

export default View