const store = {
  state:{
    // 放数据
    menuList:[]
  },
  actions: {
    // 放同步方法
    setRoutes(newState: { menuList: any }, action: { type: string,payload:any }) {
      // console.log(2234, newState, action)
      newState.menuList = action.payload

    },
  },
  asyncActions:{
    // 放异步方法

  },
  actionNames:{}
}
let actionNames = {}
for(let key in store.actions){
  actionNames[key] = key
}
store.actionNames=actionNames;

export default store