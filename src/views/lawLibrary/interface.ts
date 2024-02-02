
interface fCommonNewType {
    fBusinessCode?: string | null,
    fOrder?: number | null,
    fSearchNum: number,
    fShowTitle: string,
    fcode: string,
    ftitle: string,
}

interface fspecialColumnType {
    fcode: string,
    fcover: string,
    fsketch: string,
    ftag: number,
    ftitle: string,
    fupdatetime: string,
    furl: string,
}
interface queryCommonType {
    addftype: number,
    fcode: string,
    flogo: string,
    ftitle: string,
    ftype: number,
    ftypename: string,
    fupdatetime: string,
    furl: string,
    fusercode?: string | null,
    fusername: string,
}
interface fcolumnType {
    fTag: number,
    fCode: string,
    fName: string,
    fUpdateTime: string,
}
export interface zhListChildrenType {
    count: number,
    fcode: string,
    fname: string,
    children?: fcolumnType[] | null,
    nodeKey?: number
}

interface zhListType {
    code: string,
    flag: boolean,
    list?: zhListChildrenType[],
    name: string,
    show?: boolean,
}
interface queryHomeDataListRows {
    fcode: string,
    fcolumnname: string,
    fnew: string,
    forgname: string,
    fpublishDate: string,
    ftag: number,
    ftitle: string,
    fupdatetime: string,
    furl: string,
}

export interface queryHomeColumnListType {
    queryHomeColumnList: {
        fCommonNew: fCommonNewType[],
        fcolumn: fcolumnType[],
        fspecialColumn: fspecialColumnType[],
    },
    queryCommonParams: {
        linkType: number,
        toolType: number
    },
    queryCommonList: {
        fcommonLink: queryCommonType[],
        fcommonTool: queryCommonType[],
    },
    zhList: zhListType[],
    fcolumnid: string,
    pageNumber: number,
    pageSize: number,
    queryHomeDataList: {
        rows: queryHomeDataListRows[],
        total: number
    },
    detailModal: boolean,
    detailContent: string
}