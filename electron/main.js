const {app,BrowserWindow,ipcMain} = require("electron");
const path = require("path");
const NODE_ENV = process.env.NODE_ENV;
let mainWindow;
let loginWindow;
/**业务变量 */
let musicInfo = null; // 音乐的URL的信息,类型为object
/**窗口实例封装 */
class AppWindow extends BrowserWindow{
  constructor(config,fileLocation){
    const basicConfig = {
      width:1080,
      height:800,
      minWidth:1080,
      webPreferences:{
        nodeIntegration:true,
        contextIsolation: false,
        webSecurity:false, // 允许跨域
      }
    }
    const finalConfig = {...basicConfig,...config}
    super(finalConfig)
    this.loadURL(
      NODE_ENV === "development"?
      fileLocation.dev:
      `file://${path.join(__dirname,fileLocation.pro)}`
    )
    // 打开开发控制台
    if(NODE_ENV === "development"){
      this.webContents.openDevTools();
    }
    this.once("ready-to-show",()=>{
      this.show()
    })
  }
}
app.on("ready",()=>{
  mainWindow = new AppWindow({
    width:1020,
    height:600,
    autoHideMenuBar : true,
    titleBarStyle:"hidden",
  },{
    dev:"http://localhost:3000",
    pro:"../dist/index.html"
  })
})

/**主线程通信监听窗口隐藏操作*/
ipcMain.on("hideWindow",(event,arg)=>{
  mainWindow.minimize()
})
/**主线程通信监听窗口最大化操作*/
ipcMain.on("maxWindow",(event,arg)=>{
  mainWindow.maximize();
  /**当触发最大化后通知渲染线程更新按钮状态 */
  event.sender.send("isMaxWindow",true)
})
/**主线程通信监听窗口还原 */
ipcMain.on("restoreWindow",(event,arg)=>{
  mainWindow.unmaximize();
  /**当触发窗口还原后通知渲染线程更新按钮状态 */
  event.sender.send("isMaxWindow",false)
})
/**主线程通信监听窗口关闭 */
ipcMain.on("closeWindow",(event,arg)=>{
  app.quit()
})

/*主线程通信开启登录新窗口 */
ipcMain.on("LoginBUS",(event,arg)=>{
  loginWindow = new AppWindow({
    width:352,
    height:533,
    minWidth:352,
    autoHideMenuBar : true,
    titleBarStyle:"hidden",
    parent:mainWindow
  },{
    dev:"http://localhost:3000/#login",
    pro:"../dist/index.html#login"
  })
})
// 登录窗口关闭线程通信
ipcMain.on("LoginClose",(event,arg)=>{
  loginWindow.close()
})
// 登录窗口信息传递(渲染进程之间通信)
ipcMain.on("userInfo",(event,arg)=>{ 
  mainWindow.webContents.send("mainUserInfo",arg)
})
