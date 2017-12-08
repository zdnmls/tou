$(function () {
    //发送前加载显示
    $(document).ajaxSend(function () {
        $(".zhao").show()
    })
    //成功后加载隐藏
    $(document).ajaxSuccess(function () {
        $(".zhao").hide()
    })
    //点击返回历史记录
    $(".back").click(function () {
        history.back();
    })
    //声明两个变量用来接收存储 搜索页存在本地数据的值
    let values=localStorage.val;
    let indexs=localStorage.index;
    $.ajax({
        url:"https://api.jisuapi.com/news/get?channel="+values+"&start="+indexs+"&num=1&appkey=3732400a5ce14b54",
        dataType:"jsonp",
        success:function (res) {
            let str="";
            let str1='';
            let nav = res.result.list[0].content
            let src=res.result.list[0].src
            str1=`<span>${src}</span>`
            $('#xiangqing').html(nav)
            $('.headspan').html(str1)
        }
    })
})
