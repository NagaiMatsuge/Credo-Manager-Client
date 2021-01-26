import vuex from 'vuex'
export default function (event, {commit}) {
    if (event.target.files[0].size >= 1500000){
        commit('setNotification', 'file-size-PostTooLargeException')
        return
    }
    let fileRender = new FileReader()
    fileRender.readAsDataURL(e.target.files[0])
    fileRender.onload = (e) =>{
        this.domain = ''
        this.photo = e.target.result
    }
}