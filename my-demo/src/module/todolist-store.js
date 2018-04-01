const STORAGE_KEY = 'todolist-vue'
export default{
    fetch () {
        return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '[]')
    },
    save (lists) {
        window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(lists))
    }
}
/*
永久储存
localStorage.setItem("key","value");//以“key”为名称存储一个值“value”
localStorage.getItem("key");//获取名称为“key”的值
周期储存（浏览器关闭之前）
sessionStorage.setItem('','')
sessionStorage.getItem('')
*/
