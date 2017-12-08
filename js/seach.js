$(function () {
    //点击返回历史记录
    $('.back').click(function () {
        history.back();
    })
    //声明一个变量用来接收字符窜数据   本地存储
    let search="";
    //声明一个数组用来接收数据
    let arr=[];
    //历史记录   判断 有用search接收    没加
    if(localStorage.history){
        search=localStorage.history;
        //search字符窜转换为数组
        arr=search.split(',') ;
        arr.shift();
        arr=arr.slice(-5);
        let str="";
        arr.forEach(val=>{
            str+=`<span>${val}</span>`;
        })
        $('.span').html(str);
    };
    //事件委派点击span,获取历史记录信息，ajax搜索
    $('.record').on('click','span',function () {
        let tex=$(this).text();
        console.log(tex);
        $.ajax({
            url:"https://api.jisuapi.com/news/search?keyword=" +tex+ "&appkey=3732400a5ce14b54",
            dataType:"jsonp",
            beforeSend:function () {
                //发送前 loading  加载
                $(".zhao").show();
                $(".record").hide();
            },
            success:function (res) {
                // 发送后  隐藏
                $(".zhao").hide();
                $(".record").show();
                let arr=res.result.list;
                let str="";
                arr.forEach(val=>{
                    if(val.pic ==""){
                        str += `<li class="list nopic" >
                                    <a href="${val.url}">
                                        ${val.title}
                                        <i>${val.time}</i>
                                        <i>${val.src}</i>
                                    </a>
                                </li>`;
                    }
                    else{
                        str += `<li class="list">
                                    <a href="${val.url}">
                                        <div class="left">
                                            <img src="${val.pic}" alt="">
                                        </div>
                                        <div class="con">${val.title}
                                            <i>${val.time}</i>
                                            <i>${val.src}</i>
                                        </div>
                                    </a>
                                </li>`;
                    }
                })
                $('#aa').html(str);
                $('.content').on('click','.list',function () {
                    let indexs=$('.list').index(this);
                    localStorage.val = tex;
                    localStorage.indexs = indexs;
                    location.href = 'xiangqing.html'
                })
            }
        })
    });
    $('.search input').blur(function () {
        let vals=$(this).val();
    //    存储内容到search
        if(vals==""){
            return
        }
        else{
            if(!arr.includes($(this).val())){
                search+="," + vals;
                localStorage.history=search;
                let arr
                arr = localStorage.history.split(",");
            }

        arr.shift();
        arr=arr.slice(-5);
        let str="";
            arr.forEach(val => {

                str+=`<span>${val}</span>`
            }),
            $('.span').html(str)
        }
        $.ajax({
            url: "https://api.jisuapi.com/news/search?keyword=" + vals + "&appkey=3732400a5ce14b54",
            dataType: 'jsonp',
            beforeSend:function () {
                $(".zhao").show();
                $(".record").hide();
            },
            success:function (res) {
                let arr1=res.result.list;
                $(".zhao").hide();
                $(".record").hide();
                let arr=res.result.list;
                let str="";
                arr.forEach((val,index) => {
                    if(val.pic ==""){
                        str += `<li class="list nopic" >
                                    <a href="${val.url}">
                                        ${val.title}
                                        <i>${val.time}</i>
                                        <i>${val.src}</i>
                                    </a>
                                </li>`;
                    }
                    else{
                        str += `<li class="list">
                                    <a href="${val.url}">
                                        <div class="left">
                                            <img src="${val.pic}" alt="">
                                        </div>
                                        <div class="con">${val.title}
                                            <i>${val.time}</i>
                                            <i>${val.src}</i>
                                        </div>
                                    </a>
                                </li>`;
                    }
                })
                $("#aa").html(str);
                $('.content').on('click','.list',function () {
                    let indexs=$('.list').index(this);
                    localStorage.val = tex;
                    localStorage.indexs = indexs;
                    location.href = 'xiangqing.html'
                })
            }
        })
    })
//sousuo
    $(".sou").click(function () {
       $('.listBox').remove();
       let vals=$('input').val();
       $.ajax({
           url: "https://api.jisuapi.com/news/search?keyword=" + vals + "&appkey=3732400a5ce14b54",
           dataType: 'jsonp',
           beforeSend:function () {
               $(".zhao").show();
               $(".record").hide();
           },
           success:function (res) {
               $(".zhao").hide();
               $(".record").hide();
               let arr=res.result.list;
               let str="";
               arr.forEach((val,index) => {
                   if(val.pic ==""){
                       str += `<li class="list nopic" >
                                    <a href="${val.url}">
                                        ${val.title}
                                        <i>${val.time}</i>
                                        <i>${val.src}</i>
                                    </a>
                                </li>`;
                   }
                   else{
                       str += `<li class="list">
                                    <a href="${val.url}">
                                        <div class="left">
                                            <img src="${val.pic}" alt="">
                                        </div>
                                        <div class="con">${val.title}
                                            <i>${val.time}</i>
                                            <i>${val.src}</i>
                                        </div>
                                    </a>
                                </li>`;
                   }
               })
               $("#aa").html(str);
               //事件委派
               $('.content').on('click','.list',function () {
                   let indexs=$('.list').index(this);
                   localStorage.val = tex;
                   localStorage.indexs = indexs;
                   location.href = 'xiangqing.html'
               })
       }
    })
})



})


















