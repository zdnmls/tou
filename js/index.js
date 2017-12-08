$(function () {
    myScroll = new IScroll('#wrapper', { scrollX: true, scrollY: false});

//封装新闻
function render(type,repaint=true,start=0){
    $.ajax({
        url:"https://api.jisuapi.com/news/get?channel="+type+"&start="+start+"&num=14&appkey=6b54d90d60aab77d",
        dataType:'jsonp',
        beforeSend:function () {
            $('.zhao').show();
        },
        success:function (res) {
            console.log(res)
            $('.zhao').hide();
            let arr=res.result.list;
            let str="";
            arr.forEach(val=>{
                if(val.pic ==""){
                    str+=`<li class="list nopic">
                                <a href="${val.url}">
                                    ${val.title}
                                    <i>${val.time}</i>
                                    <i>${val.src}</i>
                                </a>
                            </li>`;
                }
                else{
                    str+=`<li class="list">
                                <a href="${val.url}">
                                    <div class="left">
                                        <img src="${val.pic}" alt="">
                                    </div>
                                    <div class="right">${val.title}
                                        <i>${val.time}</i>
                                        <i>${val.src}</i>
                                    </div>
                                </a>
                            </li>`;
                }
            })
            if(repaint) {
                $('.listBox').html(str);
            }else {
                $('.listBox').html($('.listBox').html()+str);
            }
        }
    })
}

$.ajax({
    url:'https://api.jisuapi.com/news/channel?appkey=6b54d90d60aab77d',
    dataType:'jsonp',
    success:function (res) {
        let arr=res.result;
        console.log(arr);
        let str="";
        arr.forEach((val,index)=>{
            if(index==0){
                str+=`<li class="active">${val}</li>`;
            }
            else{
                str += `<li>${val}</li>`
            }
        })
        $('#scroller ul').html(str);
        render($('#scroller li.active').text());
        //  切换新闻
        $("#scroller").on('click','li',function () {
            if($(this).hasClass('active')){
                return;
            }
            $(this).siblings().removeClass('active').end().addClass('active');
            let text=$(this).html();
            render(text);
        });
//加载新闻
        $('#add').click(function () {
            render($('#scroller li.active').html(),false,$('.listBox').children('li').length)
        });
    }
});

    $('.search input').click(function () {
        location.href='seach.html'
    })

})





















