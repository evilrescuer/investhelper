/**
 * 公共js
 */

(function () {
  window.APP = {
    config: { //JuHe
      interfacePrefix: "http://"
    },

    //读取存储（json格式）
    getLocalStorageToJSON: function (itemKey) {
      return JSON.parse(window.localStorage.getItem(itemKey));
    },

    //设置存储（json格式）
    setLocalStorageInJSON: function (key, json) {
      window.localStorage.setItem(key, JSON.stringify(json));
    },

    //寻找存储（逗号隔开的）
    findInLocalStorage: function (itemKey, itemValueItem) {
      var findFlag = false;

      var itemValue = window.localStorage.getItem(itemKey);
      if (itemValue) {
        var ItemArr = itemValue.split(',');
        for (var i=0; i<ItemArr.length; i++) {
          if (ItemArr[i] == itemValueItem) {
            findFlag = true;
            break;
          }
        }
      }

      return findFlag;
    },

    //增加存储（逗号隔开的）
    AddInLocalStorage: function (itemKey, itemValueItem) {
      var itemValue = window.localStorage.getItem(itemKey);
      if (!itemValue) {
        itemValue = itemValueItem;
      }
      else {
        if (!APP.findInLocalStorage(itemKey, itemValueItem)) {
          itemValue += ',' + itemValueItem;
        }

      }
      window.localStorage.setItem(itemKey, itemValue);
    },

    //删除存储（逗号隔开的）
    RemoveFromLocalStorage: function (itemKey, itemValueItem) {
      if (APP.findInLocalStorage(itemKey, itemValueItem)) {
        var itemValue = window.localStorage.getItem(itemKey);
        var ItemArr = itemValue.split(',');
        var findFlag = false;
        for (var i=0; i<ItemArr.length; i++) {
          if (ItemArr[i] == itemValueItem) {
            findFlag = true;
            index = i;
            break;
          }
        }
        ItemArr.splice(i, 1);
        window.localStorage.setItem(itemKey, ItemArr.join(','));
      }
    }



  };

  //屏蔽控制台显示信息
  // console.error = function () {};
  // console.log = function () {};
  // console.dir = function () {};

})();

window.addEventListener('resize', function () {
  initStyle();
}, false);

document.addEventListener('onload', function () {
  initStyle();
}, false);

/** 初始化样式 **/
function initStyle () {
  var responsiveHeight = $(window).height() - $("#app-header").height() - $("#app-tabbar").height();
  $("#app-content").height(responsiveHeight + "px");
};

initStyle();
