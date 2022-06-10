const {app,BrowserWindow,ipcMain} = require("electron");
const path = require("path");
const NODE_ENV = process.env.NODE_ENV;
let mainWindow;
/**窗口实例封装 */
class AppWindow extends BrowserWindow{
  constructor(config,fileLocation){
    const basicConfig = {
      width:1025,
      height:800,
      webPreferences:{
        nodeIntegration:true,
        contextIsolation: false,
        // webSecurity:false, // 允许跨域
      }
    }
    const finalConfig = {...basicConfig,...config}
    super(finalConfig)
    this.loadURL(
      NODE_ENV === "development"?
      "http://localhost:3000":
      `file://${path.join(__dirname,"../dist/index.html")}`
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
    width:800,
    height:600,
    autoHideMenuBar : true,
    titleBarStyle:"hidden",
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