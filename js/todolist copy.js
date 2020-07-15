$(function () {
    local();
    //注册事件 输入框 键盘按下 
    $("#title").on("keydown", function (e) {
        if (e.keyCode === 13) {
            if ($(this).val().trim() == "") {
                $(this).val("");
                alert('请输入内容');
            } else {
                //按下回车键 先取出数据
                var arr = getDate();
                //添加数据  在拿到到数据后面添加
                arr.push({ title: $(this).val(), done: false });
                //保存数据到本地储存
                getLocal(arr);
                //把数据渲染到页面
                local();
                //清空文本框
                $(this).val("");
            }
        }
    })
    //注册 删除按钮a的点击事件 因为a是动态生成的 所以用on注册 事件委托
    $("ol,ul").on("click", "a", function () {
        // console.log(1);
        //获取数据
        var arr = getDate();
        //修改数据
        var index = $(this).prop('id');
        arr.splice(index, 1);//删除数据
        //保存数据
        getLocal(arr);
        //数据渲染到页面
        local();
    })
    //注册复选框点击事件  用事件委托给动态添加的元素注册事件 
    $("ol,ul").on("click", "input", function () {
        // console.log(111);
        var arr = getDate();
        //修改数据
        //获取索引号 获取a 的索引
        var index = $(this).siblings("a").prop("id");
        //修改done的值
        arr[index].done = $(this).prop("checked");
        //先保存一下点击的对象
        var data = arr[index];
        //在本地保存的数组里面删除当前点击的这个对象
        arr.splice(index, 1);
        //保存到数组的最后面
        arr.push(data);
        //保存到数据
        getLocal(arr);
        //渲染页面 
        local();
    })

    //取出数据的函数
    function getDate() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            return JSON.parse(data); //返回一个数组
        } else {
            return [];  //返回空数组
        }
    };
    //保存到本地存储
    function getLocal(arr) {
        localStorage.setItem("todolist", JSON.stringify(arr))// 把数组转成json格式的字符串
    };
    //渲染数据的函数
    function local() {
        //拿到最新的数据
        var arr = getDate();
        //清空ol,ul内容
        $("ul,ol").empty();
        //遍历数据
        $.each(arr, function (i, item) {
            //给ol添加内容  //给a加一个自定义属性
            //判断是不是被选中 如果被选中 就渲染到ul 
            if (item.done) {
                $("ul").prepend(`<li>
                                   <input type="checkbox" checked>
                                    <p>${item.title}</p>
                                    <a href="javascript:;" id="${i}"></a>
                               </li>`)
            } else {
                $("ol").prepend(`<li>
                                     <input type="checkbox">
                                     <p>${item.title}</p>
                                       <a href="javascript:;" id="${i}"></a>
                                </li>`)
            }
        })
        //未完成 ol
        $("#todocount").text($("ol li").length);
        //已完成  ul
        $("#donecount").text($("ul li").length);
    };
})