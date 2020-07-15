//入口函数
$(function () {
    get();  //渲染数据
    //创建事件 文本框的键盘输入事件 输入回车就保存到本地储存
    $("#title").on("keydown", function (e) {
        if (e.keyCode == 13) {
            if ($(this).val().trim() == "") {
                $(this).val("");
                alert("骚年你还没有输入内容")
            } else {
                //获取数据 封装一个函数
                var arr = getData();
                //修改数据 在数组后面添加 
                arr.push({ title: $(this).val(), done: false });
                //保存到本地储存 封装一个函数
                data(arr);
                //渲染数据  声明一个函数
                get();
                //清空文本框
                $(this).val("");
            }
        }
    });
    //点击 注册事件委托 点击a删除本地数据的内容
    $("ol,ul").on("click", "a", function () {
        //获取数据
        var arr = getData();
        //修改数据
        //获取当前的索引
        var index = $(this).prop("id")
        arr.splice(index, 1);
        //保存数据
        data(arr);
        //渲染页面
        get();
    })
    //给input注册事件 事件委托给ol,ul
    $("ol,ul").on("click", "input", function () {
        //获取数据
        var arr = getData();
        //修改数据 修改对象里面的done
        var index = $(this).siblings("a").prop("id");
        //更改里面的 done属性的值
        arr[index].done = $(this).prop("checked");
        //让每次添加的都在最前面 点击的时候先删除这个数据 然后再数据最后面添加上
        var arr1 = arr[index];  //  1保存
        //       2 删除数据
        arr.splice(index, 1);
        //       3 添加数据
        arr.push(arr1);

        //保存数据
        data(arr);
        //渲染页面
        get();
    })

    //声明一个函数 获取数据
    function getData() {
        var arr = localStorage.getItem("todolist"); //拿到数据
        if (arr !== null) {
            return JSON.parse(arr);  //如果不为空就返回这个数组
        } else {
            return [];   //如果为空就返回一个空数组
        }
    }

    //保存数据
    function data(arr) {
        localStorage.setItem("todolist", JSON.stringify(arr))
    };
    //渲染数据函数
    function get() {
        //清空ol//清空ul
        $("ol,ul").empty();
        //获取数据
        var arr = getData();
        //遍历本地数据
        $.each(arr, function (i, n) {
            //判断done是不是ture  被选中就添加在ul 没选中就添加在ol
            if (n.done) {//已完成
                $("ul").prepend(`<li>
                                    <input type="checkbox" checked>
                                    <p>${n.title}</p>
                                    <a href="javascript:;" id="${i}"></a>
                                </li>`);
            } else {  //未完成
                //在ol里面最前面添加li 在a标签里面添加自定义属性
                $("ol").prepend(`<li>
                                    <input type="checkbox">
                                    <p>${n.title}</p>
                                    <a href="javascript:;" id="${i}"></a>
                                 </li>`);
            }
        })
        //添加数量 计数
        // 已完成
        $("#donecount").text($("ul li").length);
        // 未完成
        $("#todocount").text($("ol li").length);
    }
})