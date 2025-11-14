
/* 主页面(四象限)......................................................................... */
App.controller('home', function (page) {
    $(page).find('.my-img').on('click', function () {
        // 移除临时存的开始时间和结束时间 
        localStorage.removeItem('temporaryStarTime');
        localStorage.removeItem('temporaryFinishTime');
        App.load('second')
    });
    // 初始化页面读取存储的内容显示到页面上
    function fetch() {
        if (window.localStorage.getItem('allContent')) {
            var allContentObj = JSON.parse(window.localStorage.getItem('allContent'));
            var tempoary = '';
            var st = '';
            var ssd = '';
            for (var i = 0; i < allContentObj.length; i++) {
                st = allContentObj[i].startDate;
                ssd = allContentObj[i].finishDate;
                //把所有的localStrage的值显示出来
                tempoary += "<div class='cdiv'>" + "<div class='chaKanContent'>" + "<p class='ctitle' style='width:100%;word-wrap:break-word'>" + allContentObj[i].title + "</p>" +
                    "<p class='cTime'>" + "项目开始：" + st + "</p>" +
                    "<p class='cTime'>" + "项目结束：" + ssd + "</p>" + "</div>" +
                    "<input type='button' value='修改' class='modifyButton'>" +
                    "&ensp;&ensp;<input type='button' value='删除' class='deleteButton'>" +
                    "</div>"
            }
            $(page).find('#impUrg').html(tempoary)
        } else { return false }
    } fetch();
    //分类，分为未开始、进行中、已结束
    function feiLei() {
        //获取当前的时间戳
        var flNowTime = (new Date()).getTime();
        var panDuanTime = 0;
        var panDuanTime1 = 0;
        var allContentObj = JSON.parse(localStorage.getItem('allContent'));
        var flTitle = $(page).find('.ctitle');

        for (var i = 0; i < flTitle.length; i++) {
            //把localStrage中的每一个值都与当前时间进行比较
            for (var j = 0; j < allContentObj.length; j++) {
                if (flTitle[i].innerHTML == allContentObj[j].title) {
                    panDuanTime = flNowTime * 1 - allContentObj[j].startChangeDate * 1;
                    panDuanTime1 = flNowTime * 1 - allContentObj[j].finishChangeDate * 1;
                    break;
                };
            }
            if (panDuanTime < 0 && panDuanTime1 < 0) {
                flTitle[i].style.color = 'green';//未开始任务，标题显示绿色
            } else if (panDuanTime > 0 && panDuanTime1 < 0) {
                flTitle[i].style.color = 'red';//进行中任务，标题显示红色
            } else if (panDuanTime1 > 0 && panDuanTime1 > 0) {
                flTitle[i].style.color = 'blue';//已完成任务，标题显示蓝色
            }
        }
    } feiLei();
    function showDate() {
        var dd = new Date();
        var year = dd.getFullYear();
        var month = dd.getMonth();
        var dat = dd.getDate();
        return year + "年" + (month + 1) + "月" + dat + "日"
    }
    //home页面上显示当前时间
    $(page).find('.my-data').html(showDate());
    //向右滑动翻页
    $(page).find('#home').on('swipeRight', function () {
        App.load('second');
    });
    //添加任务按钮
    $(page).find('.my-add').on('click', function () {
        App.load('addTask');
    });
    //全部清除按钮
    $(page).find('#allClear').on('click', function () {
        $(page).find('#impUrg').html('');
        localStorage.removeItem('allContent');
    });
    $(page).find('.deleteButton').on('click', function () {
        var modifyTitle = $(this).parents().find('.ctitle').html();
        var allContentObj = JSON.parse(window.localStorage.getItem('allContent'));
        var index = 0;
        for (var i = 0; i < allContentObj.length; i++) {
            //找到要删除的下标
            if (allContentObj[i].title == modifyTitle) {
                index = i;
                break;
            }
        }
        //找到要删除的下标，用splice()方法删除
        allContentObj.splice(index, 1)
        var allContentStr = JSON.stringify(allContentObj);
        //删完之后重新存入localStrage中
        window.localStorage.setItem('allContent', allContentStr);
        //删除页面上显示的内容
        $(this).parent().remove();
    });
    //修改键
    $(page).find('.modifyButton').on('click', function () {
        var modifyTitle = $(this).parents().find('.ctitle').html();
        var allContentObj = JSON.parse(window.localStorage.getItem('allContent'));
        //点击修改按钮，临时存入一个JSON数据
        var modifyAll = {
            'modtitleBuBian': '',
            'modtitle': '',
            'modcontent': '',
            'modstartime': '',
            'modfinishtime': '',
            'modStartChangeTime': '',
            'modFinishChangeTime': '',
            'modType': 0
        };
        //把要修改的要修改的localStrage中的值存入临时的JSON数据中，传入下一个页面显示
        for (var i = 0; i < allContentObj.length; i++) {
            if (allContentObj[i].title == modifyTitle) {
                modifyAll.modtitleBuBian = allContentObj[i].title;
                modifyAll.modtitle = allContentObj[i].title;
                modifyAll.modcontent = allContentObj[i].content;
                modifyAll.modstartime = allContentObj[i].startDate;
                modifyAll.modfinishtime = allContentObj[i].finishDate;
                modifyAll.modStartChangeTime = allContentObj[i].startChangeDate;
                modifyAll.modFinishChangeTime = allContentObj[i].finishChangeDate;
                break;
            }
        }
        localStorage.setItem('modifyAll', JSON.stringify(modifyAll));
        App.load('modify');
    });
    //点击查看内容.............
    $(page).find('.chaKanContent').on('click', function () {
        var findTitle = $(this).find('.ctitle').html();
        var allContentObj = JSON.parse(localStorage.getItem('allContent'));
        //点击查看按钮，临时存入一个JSON数据
        var chaKanAll = {
            'title': '',
            'content': '',
            'startTime': '',
            'finishTime': '',
            'chaKanType': 0
        }
        //把要查看的localStrage中的值存入临时的JSON数据中，传入下一个页面显示
        for (var i = 0; i < allContentObj.length; i++) {
            if (allContentObj[i].title == findTitle) {
                chaKanAll.title = allContentObj[i].title;
                chaKanAll.content = allContentObj[i].content;
                chaKanAll.startTime = allContentObj[i].startDate;
                chaKanAll.finishTime = allContentObj[i].finishDate;
                break;
            }
        }
        localStorage.setItem('chaKanAll', JSON.stringify(chaKanAll));
        App.load('chanKan');
    })
});
/* 查看页面....................................... */
App.controller('chanKan', function (page) {
    //点击头像时删除传过来的chaKanAll的localstrage值
    $(page).find('.topimg').on('click', function () {
        localStorage.removeItem('chaKanAll');
        App.load('second');
    });
    $(page).find('.chanKanBack').on('click', function () {
        var chaKanAllObj = JSON.parse(localStorage.getItem('chaKanAll'));
        if (chaKanAllObj.chaKanType == 0) {
            App.load('home');
        } else if (chaKanAllObj.chaKanType == 1) {
            App.load('nostart');
        } else if (chaKanAllObj.chaKanType == 2) {
            App.load('ongoing');
        } else if (chaKanAllObj.chaKanType == 3) {
            App.load('accomplish');
        }
        localStorage.removeItem('chaKanAll');
    })
    var chaKanAll = JSON.parse(localStorage.getItem('chaKanAll'));
    $(page).find('.chaKanTitle').html(chaKanAll.title);
    $(page).find('.chaKanContent').html(chaKanAll.content);
    $(page).find('.chaKanStartTime').html(chaKanAll.startTime);
    $(page).find('.chaKanFinishTime').html(chaKanAll.finishTime);
})
/* 我的私事列表页面.................................................................. */
App.controller('second', function (page) {
    $(page).find('.topimg').on('click', function () {
        localStorage.removeItem('temporaryStarTime');
        localStorage.removeItem('temporaryFinishTime');
    });
    $(page).find('#secondC').on('swipeRight', function () {
        App.load('home');
    });
    $(page).find('#fourQuadrant').on('click', function () {
        App.load('home');
    });
    $(page).find('#nostart').on('click', function () {
        App.load('nostart');
    });
    $(page).find('#ongoing').on('click', function () {
        App.load('ongoing');
    });
    $(page).find('#accomplish').on('click', function () {
        App.load('accomplish');
    })
})
/* 我的私事列表页面.................................................................. */
/* 未开始展示页面......................................................................... */
App.controller('nostart', function (page) {
    var nowTime = (new Date()).getTime();
    var ctitle = '';
    if (window.localStorage.getItem('allContent')) {
        var allContentObj = JSON.parse(window.localStorage.getItem('allContent'));
        var tempoary = '';
        var st = '';
        var ssd = '';
        var compareTime = 0;
        for (var i = 0; i < allContentObj.length; i++) {
            compareTime = nowTime * 1 - allContentObj[i].startChangeDate * 1;
            if (compareTime < 0) {
                st = allContentObj[i].startDate;
                ssd = allContentObj[i].finishDate;
                tempoary += "<div class='cdiv'>" + "<div class='chaKanContent'>" + "<p class='ctitle' style='width:100%;word-wrap:break-word'>" + allContentObj[i].title + "</p>" +
                    "<p class='cTime'>" + "项目开始：" + st + "</p>" +
                    "<p class='cTime'>" + "项目结束：" + ssd + "</p>" + "</div>" +
                    "&ensp;&ensp;<input type='button' value='删除' class='deleteButton'>" +
                    "</div>"
            }
        }
        $(page).find('.insertContent').html(tempoary);
    };
    ctitle = $(page).find('.ctitle');
    for (var i = 0; i < ctitle.length; i++) {
        ctitle[i].style.color = 'green';
    }
    //删除键
    $(page).find('.deleteButton').on('click', function () {
        var modifyTitle = $(this).parents().find('.ctitle').html();
        var allContentObj = JSON.parse(window.localStorage.getItem('allContent'));
        var index = 0;
        for (var i = 0; i < allContentObj.length; i++) {
            if (allContentObj[i].title == modifyTitle) {
                index = i;
                break;
            }
        }
        allContentObj.splice(index, 1)
        window.localStorage.setItem('allContent', JSON.stringify(allContentObj));
        $(this).parent().remove();
    });
    //未开始任务查看
    $(page).find('.chaKanContent').on('click', function () {
        var findTitle = $(this).find('.ctitle').html();
        var allContentObj = JSON.parse(localStorage.getItem('allContent'));
        var chaKanAll = {
            'title': '',
            'content': '',
            'startTime': '',
            'finishTime': '',
            'chaKanType': 1
        }
        for (var i = 0; i < allContentObj.length; i++) {
            if (allContentObj[i].title == findTitle) {
                chaKanAll.title = allContentObj[i].title;
                chaKanAll.content = allContentObj[i].content;
                chaKanAll.startTime = allContentObj[i].startDate;
                chaKanAll.finishTime = allContentObj[i].finishDate;
                break;
            }
        }
        localStorage.setItem('chaKanAll', JSON.stringify(chaKanAll));
        App.load('chanKan');
    })
    //点击头像返回第二页面
    $(page).find('.topimg').on('click', function () {
        App.load('second')
    });
})
/* 正在进行中展示页面......................................................................... */
App.controller('ongoing', function (page) {
    var nowTime = (new Date()).getTime();
    var ctitle = '';
    if (window.localStorage.getItem('allContent')) {
        var allContentObj = JSON.parse(window.localStorage.getItem('allContent'));
        var tempoary = '';
        var st = '';
        var ssd = '';
        var compareTime1 = 0;
        var compareTime2 = 0;
        for (var i = 0; i < allContentObj.length; i++) {
            compareTime1 = nowTime - allContentObj[i].startChangeDate;
            compareTime2 = nowTime - allContentObj[i].finishChangeDate;
            if (compareTime1 > 0 && compareTime2 < 0) {
                st = allContentObj[i].startDate;
                ssd = allContentObj[i].finishDate;
                tempoary += "<div class='cdiv'>" + "<div class='chaKanContent'>" + "<p class='ctitle' style='width:100%;word-wrap:break-word'>" + allContentObj[i].title + "</p>" +
                    "<p class='cTime'>" + "项目开始：" + st + "</p>" +
                    "<p class='cTime'>" + "项目结束：" + ssd + "</p>" + "</div>" +
                    "&ensp;&ensp;<input type='button' value='删除' class='deleteButton'>" +
                    "</div>"
            }
        }
        $(page).find('.insertContent').html(tempoary)
    };
    //分类颜色
    ctitle = $(page).find('.ctitle');
    for (var i = 0; i < ctitle.length; i++) {
        ctitle[i].style.color = 'red';
    }
    //删除键
    $(page).find('.deleteButton').on('click', function () {
        var modifyTitle = $(this).parents().find('.ctitle').html();
        var allContentObj = JSON.parse(window.localStorage.getItem('allContent'));
        var index = 0;
        for (var i = 0; i < allContentObj.length; i++) {
            if (allContentObj[i].title == modifyTitle) {
                index = i;
                break;
            }
        }
        allContentObj.splice(index, 1)
        window.localStorage.setItem('allContent', JSON.stringify(allContentObj));
        $(this).parent().remove();
    });
    //进行中任务查看
    $(page).find('.chaKanContent').on('click', function () {
        var findTitle = $(this).find('.ctitle').html();
        var allContentObj = JSON.parse(localStorage.getItem('allContent'));
        var chaKanAll = {
            'title': '',
            'content': '',
            'startTime': '',
            'finishTime': '',
            'chaKanType': 2
        }
        for (var i = 0; i < allContentObj.length; i++) {
            if (allContentObj[i].title == findTitle) {
                chaKanAll.title = allContentObj[i].title;
                chaKanAll.content = allContentObj[i].content;
                chaKanAll.startTime = allContentObj[i].startDate;
                chaKanAll.finishTime = allContentObj[i].finishDate;
                break;
            }
        }
        localStorage.setItem('chaKanAll', JSON.stringify(chaKanAll));
        App.load('chanKan');
    })
    //点击头像返回第二页面
    $(page).find('.topimg').on('click', function () {
        App.load('second')
    });
})
/* 已完成展示页面.............................................................................. */
App.controller('accomplish', function (page) {
    var nowTime = (new Date()).getTime();
    var ctitle = '';
    if (window.localStorage.getItem('allContent')) {
        var allContentObj = JSON.parse(window.localStorage.getItem('allContent'));
        var tempoary = '';
        var st = '';
        var ssd = '';
        var compareTime = 0;
        for (var i = 0; i < allContentObj.length; i++) {
            compareTime = nowTime * 1 - allContentObj[i].finishChangeDate * 1;
            if (compareTime > 0) {
                st = allContentObj[i].startDate;
                ssd = allContentObj[i].finishDate;
                tempoary += "<div class='cdiv'>" + "<div class='chaKanContent'>" + "<p class='ctitle' style='width:100%;word-wrap:break-word'>" + allContentObj[i].title + "</p>" +
                    "<p class='cTime'>" + "项目开始：" + st + "</p>" +
                    "<p class='cTime'>" + "项目结束：" + ssd + "</p>" + "</div>" +
                    "&ensp;&ensp;<input type='button' value='删除' class='deleteButton'>" +
                    "</div>"
            }
        }
        $(page).find('.insertContent').html(tempoary)
    };
    ctitle = $(page).find('.ctitle');
    for (var i = 0; i < ctitle.length; i++) {
        ctitle[i].style.color = 'blue';
    }
    //删除键
    $(page).find('.deleteButton').on('click', function () {
        var modifyTitle = $(this).parents().find('.ctitle').html();
        var allContentObj = JSON.parse(window.localStorage.getItem('allContent'));
        var index = 0;
        for (var i = 0; i < allContentObj.length; i++) {
            if (allContentObj[i].title == modifyTitle) {
                index = i;
                break;
            }
        }
        allContentObj.splice(index, 1)
        window.localStorage.setItem('allContent', JSON.stringify(allContentObj));
        $(this).parent().remove();
    });
    //已完成任务查看
    $(page).find('.chaKanContent').on('click', function () {
        var findTitle = $(this).find('.ctitle').html();
        var allContentObj = JSON.parse(localStorage.getItem('allContent'));
        var chaKanAll = {
            'title': '',
            'content': '',
            'startTime': '',
            'finishTime': '',
            'chaKanType': 3
        }
        for (var i = 0; i < allContentObj.length; i++) {
            if (allContentObj[i].title == findTitle) {
                chaKanAll.title = allContentObj[i].title;
                chaKanAll.content = allContentObj[i].content;
                chaKanAll.startTime = allContentObj[i].startDate;
                chaKanAll.finishTime = allContentObj[i].finishDate;
                break;
            }
        }
        localStorage.setItem('chaKanAll', JSON.stringify(chaKanAll));
        App.load('chanKan');
    })
    //点击头像返回第二页面
    $(page).find('.topimg').on('click', function () {
        App.load('second')
    });
})
/* 增加任务页面控制器........................................................................... */
App.controller('addTask', function (page) {
    $(page).find('.topimg').on('click', function () {
        localStorage.removeItem('temporaryStarTime');
        localStorage.removeItem('temporaryFinishTime');
        App.load('second');
    });
    //判断结束时间是否小于开始时间
    var judgeTime = 0;
    //如果值为1，选择任务开始时间，为零选择结束时间
    var timeType = -1;
    var hasTemporaryStarTime = false;
    var hasTemporaryFinishTime = false;
    for (index in localStorage) {
        if (index == 'temporaryStarTime') {
            hasTemporaryStarTime = true;
            break;
        }
    };
    for (index in localStorage) {
        if (index == 'temporaryFinishTime') {
            hasTemporaryFinishTime = true;
            break;
        }
    }
    if (hasTemporaryStarTime == true) {
        var temporaryStarTime = JSON.parse(localStorage.getItem('temporaryStarTime'));
        $(page).find('.taskTitle').val(temporaryStarTime.temTitle);
        $(page).find('.taskContent').val(temporaryStarTime.temContent);
        $(page).find('.startTimeShow').html(temporaryStarTime.temStarTime)
    };
    if (hasTemporaryFinishTime == true) {
        var temporaryFinishTime = JSON.parse(localStorage.getItem('temporaryFinishTime'));
        $(page).find('.finishTimeShow').html(temporaryFinishTime.temFinishTime);
        //判断任务开始时间是否大于结束时间
        if ((temporaryStarTime.temChangeStarTime * 1 - temporaryFinishTime.temChangeFinishTime * 1) >= 0) {
            judgeTime = 1;
        }
    }
    //添加任务开始时间按钮
    $(page).find('.taskTimeStr').on('click', function () {
        if ($(page).find('.taskTitle').val() != '') {
            timeType = 1;
            var temporaryStarTime = {
                'temTitle': $(page).find('.taskTitle').val(),
                'temContent': $(page).find('.taskContent').val(),
                'temStarTime': '',
                'temChangeStarTime': '',
                'timeType': 1
            };
            var temporaryStarTimeStr = JSON.stringify(temporaryStarTime);
            localStorage.setItem('temporaryStarTime', temporaryStarTimeStr)
            App.load('calender', {
                "timeType": timeType
            });
        } else { return false }
    })
    //添加任务结束时间按钮
    $(page).find('.taskTimeFin').on('click', function () {
        timeType = 0;
        var hasTemporaryStarTime = false;
        for (index in localStorage) {
            if (index == 'temporaryStarTime') {
                hasTemporaryStarTime = true;
                break;
            }
        }
        if (hasTemporaryStarTime == true) {
            var temporaryFinishTime = {
                'temFinishTime': '',
                'temChangeFinishTime': '',
                'timeType': 0
            };
            var temporaryFinishTimeStr = JSON.stringify(temporaryFinishTime);
            localStorage.setItem('temporaryFinishTime', temporaryFinishTimeStr)
            App.load('calender', {
                "timeType": timeType
            });
        }
    })
    //数据存储完成后回到主页面按钮，如果用户没有选择时间，默认当前时间开始，30分钟之后任务结束
    function yearMonthDay() {//创建时间函数
        var hh = new Date();
        var year = hh.getFullYear();
        var months = hh.getMonth() + 1;
        var day = hh.getDate()
        return year + "年" + months + "月" + day + "日";
    }
    function hoursMinutes1() {
        var hh = new Date();
        var hours = hh.getHours();
        var minutes = hh.getMinutes();
        return hours + "时" + minutes + "分";
    }
    function hoursMinutes2() {
        var hh = new Date();
        var hours = hh.getHours();
        var minutes = hh.getMinutes() + 30;
        if (minutes > 60) {
            hours = hours + 1;
            minutes = minutes - 60;
        }
        return hours + "时" + minutes + "分";
    }
    $(page).find('.DefaultStartTime').html(yearMonthDay() + hoursMinutes1());
    $(page).find('.DefaultFinishTime').html(yearMonthDay() + hoursMinutes2())
    $(page).find('.duiLogo').on('click', function () {
        var ss1 = hoursMinutes1();
        var ss2 = hoursMinutes2();
        var ssd = yearMonthDay();
        var changeTime1 = (new Date()).getTime();
        var changeTime2 = (new Date()).getTime() + 1800000;
        var hasTemporaryStarTime = false;
        var hasAllContent = false;
        var temporaryStarTime = JSON.parse(localStorage.getItem('temporaryStarTime'));
        var temporaryFinishTime = JSON.parse(localStorage.getItem('temporaryFinishTime'));
        for (index in localStorage) {//判断是否有开始时间存入
            if (index == 'temporaryStarTime') {
                hasTemporaryStarTime = true;
                break;
            }
        }
        for (indexContent in localStorage) {//判断是否有结束时间存入
            if (indexContent == 'allContent') {
                hasAllContent = true;
                break;
            }
        }
        if (judgeTime == 1) {//判断结束时间不能小于开始时间
            alert("结束时间不能小于或等于开始时间")
            return false;
        }
        if ($(page).find('.taskTitle').val() != "") {//关键的步骤，存数据
            if (hasTemporaryStarTime == true) {
                if (hasAllContent == true) {
                    var allContentObj = JSON.parse(localStorage.getItem('allContent'))
                    var cc = {
                        'title': $(page).find('.taskTitle').val(),
                        'content': $(page).find('.taskContent').val(),
                        'startDate': temporaryStarTime.temStarTime,
                        'startChangeDate': temporaryStarTime.temChangeStarTime,
                        'finishDate': temporaryFinishTime.temFinishTime,
                        'finishChangeDate': temporaryFinishTime.temChangeFinishTime,
                    }
                    allContentObj.push(cc);
                    var allContentStr = JSON.stringify(allContentObj);
                    localStorage['allContent'] = allContentStr;
                } else {
                    var cc = [{
                        'title': $(page).find('.taskTitle').val(),
                        'content': $(page).find('.taskContent').val(),
                        'startDate': temporaryStarTime.temStarTime,
                        'startChangeDate': temporaryStarTime.temChangeStarTime,
                        'finishDate': temporaryFinishTime.temFinishTime,
                        'finishChangeDate': temporaryFinishTime.temChangeFinishTime,
                    }]
                    var allContentStr = JSON.stringify(cc);
                    localStorage['allContent'] = allContentStr;
                }
            } else {
                if (hasAllContent == true) {
                    var allContentObj = JSON.parse(localStorage.getItem('allContent'))
                    var cc = {
                        'title': $(page).find('.taskTitle').val(),
                        'content': $(page).find('.taskContent').val(),
                        'startDate': (ssd + ss1),
                        'startChangeDate': changeTime1,
                        'finishDate': (ssd + ss2),
                        'finishChangeDate': changeTime2,
                    }
                    allContentObj.push(cc);
                    var allContentStr = JSON.stringify(allContentObj);
                    localStorage['allContent'] = allContentStr;
                } else {
                    var cc = [{
                        'title': $(page).find('.taskTitle').val(),
                        'content': $(page).find('.taskContent').val(),
                        'startDate': (ssd + ss1),
                        'startChangeDate': changeTime1,
                        'finishDate': (ssd + ss2),
                        'finishChangeDate': changeTime2,
                    }]
                    var allContentStr = JSON.stringify(cc);
                    localStorage['allContent'] = allContentStr;
                }
            };
            localStorage.removeItem('temporaryStarTime');
            localStorage.removeItem('temporaryFinishTime');
            App.load('home')
            console.log(localStorage['allContent'])
        } else { return false }
    })
})
/* ............................增加任务页面控制器......................................................................... */
/* ...........................选择日期页面控制器......................................................................... */
App.controller('calender', function (page, data) {
    var xx = data.timeType;
    if (xx == 1) { $(page).find('.checkCalenderTitle').html('请选择任务开始时间') }
    if (xx == 0) { $(page).find('.checkCalenderTitle').html('请选择任务结束时间'); }
    $(page).find('.topimg').on('click', function () {
        localStorage.removeItem('temporaryStarTime');
        localStorage.removeItem('temporaryFinishTime');
        App.load('second');
    });
    var day = new Date();//日历显示
    var year = day.getFullYear();
    var month = day.getMonth();
    var data = day.getDate();
    var hours = day.getHours();
    var minutes = day.getMinutes();
    var dayd = data;
    function showDate() {
        $(page).find('.center').html(year + '年' + (month + 1) + '月');
        var days = (new Date(year, month * 1 + 1, 0)).getDate();
        var weekDay = (new Date(year, month, 1)).getDay();
        var str = '';
        for (var i = 0; i < weekDay; i++) {
            str += "<div></div>"
        }
        for (var i = 1; i <= days; i++) {
            str += '<div class="app-button day">' + i + '</div>'
        }
        $(page).find('.curr').html(str);
        var dayr = $(page).find('.day');
        for (var i = 0; i < dayr.length; i++) {
            if (dayr[i].innerHTML == data) {
                dayr[i].style.color = "red";
                dayr[i].style.backgroundColor = "grey";
            }
        }
        $(page).find('.day').on('click', function () {
            $(this).css("backgroundColor", "grey").siblings().css("backgroundColor", "");
            dayd = $(this).html();
        })
    } showDate();
    function Timehour() {
        if (hours < 10) {
            hours = ("0" + hours) * 1;
        }
        $(page).find('.timecenterh').html(hours + '时');
    } Timehour();
    function Timeminutes() {
        if (minutes < 10) {
            minutes = ("0" + minutes) * 1;
        }
        $(page).find('.timecenterm').html(minutes + '分');
    } Timeminutes();
    $(page).find('.btn-left').on('click', function () {
        if (--month < 0) {
            year--;
            month = 11;
        }
        showDate();
    });
    $(page).find('.btn-right').on('click', function () {
        if (++month > 11) {
            year++;
            month = 0;
        }
        showDate();
    })
    $(page).find('.day').on('click', function () {
        $(this).css("backgroundColor", "grey").siblings().css("backgroundColor", "")
        dayd = $(this).html();
    })
    $(page).find('.btn-htimeleft').on('click', function () {
        if (--hours < 0) {
            hours = 0;
        }
        Timehour();
    });
    $(page).find('.btn-htimeright').on('click', function () {
        if (++hours > 23) {
            hours = 0;
        }
        Timehour();
    });
    $(page).find('.btn-mtimeleft').on('click', function () {
        if (--minutes < 0) {
            minutes = 59;
        }
        Timeminutes();
    });
    $(page).find('.btn-mtimeright').on('click', function () {
        if (++minutes > 59) {
            minutes = 0;
        }
        Timeminutes();
    });//日历显示
    $(page).find('.finishLogo').on('click', function () {
        // console.log(xx)
        // console.log("选择日期完成按钮被按下")
        if (xx == 1) {//xx等于1，是要设置开始任务时间
            //把时间转化成毫秒数
            console.log("结束时间" + (year * 1), ((month + 1) * 1), dayd * 1, hours * 1, minutes * 1)
            var changeGetTime = new Date((year * 1) + "-" + ((month + 1) * 1) + "-" + (dayd * 1) + " " + (hours * 1) + ":" + (minutes * 1)).getTime();
            console.log("开始时间转换" + changeGetTime);
            var temporaryStarTime = JSON.parse(localStorage.getItem('temporaryStarTime'));
            temporaryStarTime.temStarTime = ($(page).find('.center').html() + dayd + "日" + hours + "时" + minutes + "分");
            temporaryStarTime.temChangeStarTime = changeGetTime;
            var temporaryStarTimeStr = JSON.stringify(temporaryStarTime)
            localStorage.setItem('temporaryStarTime', temporaryStarTimeStr);
            App.load('addTask');
        }
        if (xx == 0) {//xx等于0，是要设置结束任务时间
            //把时间转化成毫秒数
            console.log("结束时间" + year * 1, ((month + 1) * 1), dayd * 1, hours * 1, minutes * 1)
            var changeGetTime = new Date((year * 1) + "-" + ((month + 1) * 1) + "-" + (dayd * 1) + " " + (hours * 1) + ":" + (minutes * 1)).getTime();
            console.log("结束时间转换" + changeGetTime);
            var temporaryFinishTime = JSON.parse(localStorage.getItem('temporaryFinishTime'));
            temporaryFinishTime.temFinishTime = ($(page).find('.center').html() + dayd + "日" + hours + "时" + minutes + "分");
            temporaryFinishTime.temChangeFinishTime = changeGetTime;
            var temporaryFinishTimeStr = JSON.stringify(temporaryFinishTime)
            localStorage.setItem('temporaryFinishTime', temporaryFinishTimeStr);
            App.load('addTask');
        };
    })
})
/* ...........................选择日期页面......................................................................... */
/* 修改页面............................................................... */
App.controller('modify', function (page) {
    var panDuanStarFin = 0;
    function asd() {
        var modifyAll = '';
        var allContentObj = '';
        var hasTemporaryStarTime = 0;
        var hasTemporaryFinishTime = 0;
        var hasModifyAll = 0;
        for (index in localStorage) {
            if (index == 'temporaryStarTime') {
                temporaryStarTime = JSON.parse(localStorage.getItem('temporaryStarTime'));
                hasTemporaryStarTime = 1;
            };
            if (index == 'temporaryFinishTime') {
                temporaryFinishTime = JSON.parse(localStorage.getItem('temporaryFinishTime'));
                hasTemporaryFinishTime = 1;
            };
            if (index == 'modifyAll') {
                modifyAll = JSON.parse(localStorage.getItem('modifyAll'));
                hasModifyAll = 1;
            };
        };
        if (hasModifyAll == 1) {
            $(page).find('.modifyTitle').val(modifyAll.modtitle);
            $(page).find('.modifyContent').val(modifyAll.modcontent);
            if (hasTemporaryStarTime == 0 && hasTemporaryFinishTime == 0) {
                $(page).find('.modifyStart').html(modifyAll.modstartime);
                $(page).find('.modifyFinish').html(modifyAll.modfinishtime);
                if ((modifyAll.modStartChangeTime * 1 - modifyAll.modFinishChangeTime * 1) > 0) {
                    panDuanStarFin = 1;
                }
            } else if (hasTemporaryStarTime == 1 && hasTemporaryFinishTime == 0) {
                $(page).find('.modifyStart').html(temporaryStarTime.temStarTime);
                $(page).find('.modifyFinish').html(modifyAll.modfinishtime);
                if ((temporaryStarTime.temChangeStarTime * 1 - modifyAll.modFinishChangeTime * 1) > 0) {
                    panDuanStarFin = 1;
                }
            } else if (hasTemporaryStarTime == 0 && hasTemporaryFinishTime == 1) {
                $(page).find('.modifyStart').html(modifyAll.modstartime);
                $(page).find('.modifyFinish').html(temporaryFinishTime.temFinishTime);
                if ((modifyAll.modStartChangeTime * 1 - temporaryFinishTime.temChangeFinishTime * 1) > 0) {
                    panDuanStarFin = 1;
                }
            } else if (hasTemporaryStarTime == 1 && hasTemporaryFinishTime == 1) {
                $(page).find('.modifyStart').html(temporaryStarTime.temStarTime);
                $(page).find('.modifyFinish').html(temporaryFinishTime.temFinishTime);
                if ((temporaryStarTime.temChangeStarTime * 1 - temporaryFinishTime.temChangeFinishTime * 1) > 0) {
                    panDuanStarFin = 1;
                }
            }
        };
    } asd();
    $(page).find('.topimg').on('click', function () {
        localStorage.removeItem('modifyAll');
        localStorage.removeItem('temporaryStarTime');
        localStorage.removeItem('temporaryFinishTime');
        App.load('second');
    });
    $(page).find('#modify-back').on('click', function () {
        var modifyAllObj = JSON.parse(localStorage.getItem('modifyAll'));
        if (modifyAllObj.modType == 0) {
            App.load('home');
        } else if (modifyAllObj.modType == 2) {
            App.load('ongoing')
        }
        localStorage.removeItem('modifyAll');
        localStorage.removeItem('temporaryStarTime');
        localStorage.removeItem('temporaryFinishTime');
    });
    $(page).find('.modifyTimeStr').on('click', function () {
        var modifyAll = JSON.parse(localStorage.getItem('modifyAll'));
        var temporaryStarTime = {
            'temStarTime': '',
            'temChangeStarTime': ''
        };
        modifyAll.modtitle = $(page).find('.modifyTitle').val();
        modifyAll.modcontent = $(page).find('.modifyContent').val();
        localStorage.setItem('temporaryStarTime', JSON.stringify(temporaryStarTime));
        localStorage.setItem('modifyAll', JSON.stringify(modifyAll));
        App.load('modifyCalender', {
            'modiftTimeType': 1
        });
    });
    $(page).find('.modifyTimeFin').on('click', function () {
        var modifyAll = JSON.parse(localStorage.getItem('modifyAll'));
        var temporaryFinishTime = {
            'temFinishTime': '',
            'temChangeFinishTime': '',
        };
        modifyAll.modtitle = $(page).find('.modifyTitle').val();
        modifyAll.modcontent = $(page).find('.modifyContent').val();
        localStorage.setItem('temporaryFinishTime', JSON.stringify(temporaryFinishTime));
        localStorage.setItem('modifyAll', JSON.stringify(modifyAll));
        App.load('modifyCalender', {
            'modiftTimeType': 0
        });
    })
    $(page).find('.modify-finish').on('click', function () {
        if (panDuanStarFin == 1) {
            alert("结束时间不能小于开始时间");
            return false;
        } else {
            var modifyAll = '';
            var hasTemporaryStarTime = 0;
            var hasTemporaryFinishTime = 0;
            var temporaryStarTime = '';
            var temporaryFinishTime = '';
            var allContentObj = JSON.parse(localStorage.getItem('allContent'));
            for (index in localStorage) {
                if (index == 'temporaryStarTime') {
                    temporaryStarTime = JSON.parse(localStorage.getItem('temporaryStarTime'));
                    hasTemporaryStarTime = 1;
                };
                if (index == 'temporaryFinishTime') {
                    temporaryFinishTime = JSON.parse(localStorage.getItem('temporaryFinishTime'));
                    hasTemporaryFinishTime = 1;
                };
                if (index == 'modifyAll') {
                    modifyAll = JSON.parse(localStorage.getItem('modifyAll'));
                };
            };
            if (hasTemporaryStarTime == 1 && hasTemporaryFinishTime == 1) {
                allContentObj = JSON.parse(localStorage.getItem('allContent'));
                console.log($(page).find('.modifyTitle').val(), $(page).find('.modifyContent').val())
                for (var i = 0; i < allContentObj.length; i++) {
                    if (allContentObj[i].title == modifyAll.modtitleBuBian) {
                        allContentObj[i].title = $(page).find('.modifyTitle').val();
                        allContentObj[i].content = $(page).find('.modifyContent').val();
                        allContentObj[i].startDate = temporaryStarTime.temStarTime;
                        allContentObj[i].finishDate = temporaryFinishTime.temFinishTime;
                        allContentObj[i].startChangeDate = temporaryStarTime.temChangeStarTime;
                        allContentObj[i].finishChangeDate = temporaryFinishTime.temChangeFinishTime;
                        break;
                    }
                }
            } else if (hasTemporaryStarTime == 1 && hasTemporaryFinishTime == 0) {
                allContentObj = JSON.parse(localStorage.getItem('allContent'));
                for (var i = 0; i < allContentObj.length; i++) {
                    if (allContentObj[i].title == modifyAll.modtitleBuBian) {
                        allContentObj[i].title = $(page).find('.modifyTitle').val();
                        allContentObj[i].content = $(page).find('.modifyContent').val();
                        allContentObj[i].startDate = temporaryStarTime.temStarTime;
                        allContentObj[i].startChangeDate = temporaryStarTime.temChangeStarTime;
                        break;
                    }
                }
            } else if (hasTemporaryStarTime == 0 && hasTemporaryFinishTime == 1) {
                allContentObj = JSON.parse(localStorage.getItem('allContent'));
                for (var i = 0; i < allContentObj.length; i++) {
                    if (allContentObj[i].title == modifyAll.modtitleBuBian) {
                        allContentObj[i].title = $(page).find('.modifyTitle').val();
                        allContentObj[i].content = $(page).find('.modifyContent').val();
                        allContentObj[i].finishDate = temporaryFinishTime.temFinishTime;
                        allContentObj[i].finishChangeDate = temporaryFinishTime.temChangeFinishTime;
                        break;
                    }
                }
            } else if (hasTemporaryStarTime == 0 && hasTemporaryFinishTime == 0) {
                allContentObj = JSON.parse(localStorage.getItem('allContent'));
                for (var i = 0; i < allContentObj.length; i++) {
                    if (allContentObj[i].title == modifyAll.modtitleBuBian) {
                        allContentObj[i].title = $(page).find('.modifyTitle').val();
                        allContentObj[i].content = $(page).find('.modifyContent').val();
                        break;
                    }
                }
            }
            localStorage.setItem('allContent', JSON.stringify(allContentObj));
            localStorage.removeItem('modifyAll');
            localStorage.removeItem('temporaryStarTime');
            localStorage.removeItem('temporaryFinishTime');
            App.load('home');
        }

    })
})
/* 修改日期页面.............................................................. */
App.controller('modifyCalender', function (page, data) {
    var xx = data.modiftTimeType;
    if (xx == 1) { $(page).find('.checkCalenderTitle').html('请修改任务开始时间') }
    if (xx == 0) { $(page).find('.checkCalenderTitle').html('请修改任务结束时间'); }
    $(page).find('.topimg').on('click', function () {
        App.load('second');
    });
    var day = new Date();//日历显示
    var year = day.getFullYear();
    var month = day.getMonth();
    var data = day.getDate();
    var hours = day.getHours();
    var minutes = day.getMinutes();
    var dayd = data;
    function showDate() {
        $(page).find('.center').html(year + '年' + (month + 1) + '月');
        var days = (new Date(year, month + 1, 0)).getDate();
        var weekDay = (new Date(year, month, 1)).getDay();
        var str = '';
        for (var i = 0; i < weekDay; i++) {
            str += "<div></div>"
        }
        for (var i = 1; i <= days; i++) {
            str += '<div class="app-button day">' + i + '</div>'
        }
        $(page).find('.curr').html(str);
        var dayr = $(page).find('.day');
        for (var i = 0; i < dayr.length; i++) {
            if (dayr[i].innerHTML == data) {
                dayr[i].style.color = "red";
                dayr[i].style.backgroundColor = "grey";
            }
        }
        $(page).find('.day').on('click', function () {
            $(this).css("backgroundColor", "grey").siblings().css("backgroundColor", "");
            dayd = $(this).html();
        })
    } showDate();
    function Timehour() {
        if (hours < 10) {
            hours = ("0" + hours) * 1;
        }
        $(page).find('.timecenterh').html(hours + '时');
    } Timehour();
    function Timeminutes() {
        if (minutes < 10) {
            minutes = ("0" + minutes) * 1;
        }
        $(page).find('.timecenterm').html(minutes + '分');
    } Timeminutes();
    $(page).find('.btn-left').on('click', function () {
        if (--month < 0) {
            year--;
            month = 11;
        }
        showDate();
    });
    $(page).find('.btn-right').on('click', function () {
        if (++month > 11) {
            year++;
            month = 0;
        }
        showDate();
    })
    $(page).find('.day').on('click', function () {
        $(this).css("backgroundColor", "grey").siblings().css("backgroundColor", "")
        dayd = $(this).html();
    })
    $(page).find('.btn-htimeleft').on('click', function () {
        if (--hours < 0) {
            hours = 0;
        }
        Timehour();
    });
    $(page).find('.btn-htimeright').on('click', function () {
        if (++hours > 23) {
            hours = 0;
        }
        Timehour();
    });
    $(page).find('.btn-mtimeleft').on('click', function () {
        if (--minutes < 0) {
            minutes = 59;
        }
        Timeminutes();
    });
    $(page).find('.btn-mtimeright').on('click', function () {
        if (++minutes > 59) {
            minutes = 0;
        }
        Timeminutes();
    });//日历显示
    $(page).find('.finishLogo').on('click', function () {
        // console.log(xx)
        // console.log("选择日期完成按钮被按下")
        if (xx == 1) {//xx等于1，是要设置开始任务时间
            //把时间转化成毫秒数
            var changeGetTime = new Date((year * 1) + "-" + ((month + 1) * 1) + "-" + (dayd * 1) + " " + (hours * 1) + ":" + (minutes * 1)).getTime();
            var temporaryStarTime = JSON.parse(localStorage.getItem('temporaryStarTime'));
            temporaryStarTime.temStarTime = ($(page).find('.center').html() + dayd + "日" + hours + "时" + minutes + "分");
            temporaryStarTime.temChangeStarTime = changeGetTime;
            var temporaryStarTimeStr = JSON.stringify(temporaryStarTime)
            localStorage.setItem('temporaryStarTime', temporaryStarTimeStr);
            App.load('modify');
        }
        if (xx == 0) {//xx等于0，是要设置结束任务时间
            //把时间转化成毫秒数
            var changeGetTime = new Date((year * 1) + "-" + ((month + 1) * 1) + "-" + (dayd * 1) + " " + (hours * 1) + ":" + (minutes * 1)).getTime();
            var temporaryFinishTime = JSON.parse(localStorage.getItem('temporaryFinishTime'));
            temporaryFinishTime.temFinishTime = ($(page).find('.center').html() + dayd + "日" + hours + "时" + minutes + "分");
            temporaryFinishTime.temChangeFinishTime = changeGetTime;
            var temporaryFinishTimeStr = JSON.stringify(temporaryFinishTime)
            localStorage.setItem('temporaryFinishTime', temporaryFinishTimeStr);
            App.load('modify');
        };
    })

})


try {
    App.restore();
} catch (err) {
    App.load('home');
}
