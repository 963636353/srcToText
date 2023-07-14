/* 
  说明，输入srt格式的字幕文件，通过正则表达式去掉里序列号和时间轴信息，保留字幕内容
*/


// 导入fs模块
const fs = require('fs')
const ws = fs.createWriteStream('./文档.txt')


// 输入要处理的文件的路径
const filePath = 'C:\\Users\\Admin\\Desktop\\新建文本文档.txt' 



// 读取字幕文件
let data

try {
    data = fs.readFileSync(filePath, 'utf-8')

  } catch (err) {

    if (err.code === 'ENOENT') {
      console.error('文件不存在，请检查文件路径和文件名是否正确')
    } else {
      console.error('读取文件时出错：', err.message)
    }

  }

// 去掉了序列号
let a = data.replaceAll(/^\d{1,}$/gm, '')

// 去掉时间轴
let b = a.replaceAll(/\d{2}:\d{2}:\d{2}[,|.]\d{3} --> \d{2}:\d{2}:\d{2}[,|.]\d{3}/gm, '')

// 去掉空行
let c = b.split(/^\s*[\r\n]/gm)

// 流式写入
for(let i = 0; i < c.length; i++){
    ws.write(c[i])
    // ws.write('\r\n')
}