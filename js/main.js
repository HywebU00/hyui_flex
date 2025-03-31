// 亂數數字
function randomFloor(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// 亂數英文字
function randomLetter(max) {
  let text = '';
  let letter = 'abcdefghijklmnopqrstuvwxyz';

  for (let i = 0; i < max; i++) text += letter.charAt(Math.floor(Math.random() * letter.length));
  return text;
}

// 改變標籤

function changeTag(oldTag, newTagName) {
  // 創建新的標籤
  const newTag = $(`<${newTagName}>`).html(oldTag.html());

  // 複製所有屬性
  $.each(oldTag[0].attributes, function (_, attr) {
    newTag.attr(attr.name, attr.value);
  });

  // 替換舊標籤
  oldTag.replaceWith(newTag);
}

let _window = $(window),
  ww = _window.outerWidth(),
  wh = _window.height(),
  _body = $('body'),
  wwNormal = 1400,
  wwMedium = 992,
  wwSmall = 768,
  wwxs = 576;
//
$(function () {
  document.createElement('picture');
  /*-----------------------------------*/
  ///////////////// 變數 ////////////////
  /*-----------------------------------*/
  /*-----------------------------------*/
  //////////// nojs 先移除////////////////
  /*-----------------------------------*/
  $('html').removeClass('no-js');
  /*-----------------------------------*/
  /////// header選單 判斷是否有下一層////////
  /*-----------------------------------*/
  let _menu = $('.mainMenu');
  // let _megamenu = $('.megamenu');

  _menu.find('li').has('ul').addClass('hasChild');
  _menu
    .find('li')
    .has('ul')
    .children('a')
    .each(function () {
      const id = `menu_${randomLetter(3)}${randomFloor(0, 999)}`;
      $(this).attr({
        id: id,
        'aria-controls': `${id}_ul`,
        'aria-haspopup': 'true',
        'aria-expanded': 'false',
      });
      $(this)
        .siblings('ul')
        .attr({
          id: `${id}_ul`,
          'aria-labelledby': id,
          // 'aria-hidden': 'true',
        });
      $(this).attr('role', 'button');
    });

  // _menu.find('li').has('ul').children('a').attr('aria-expanded', 'false');
  // _megamenu.find('li').has('ul').addClass('hasChild');

  let liHasChild = _menu.find('li.hasChild');
  // let liHasChild2 = _megamenu.children('ul').children('li.hasChild');
  /*-----------------------------------*/
  ////////////// 行動版選單切換////////////
  /*-----------------------------------*/
  $('a.goCenter').after('<nav class="sidebar"><div class="m_area"><button type="button" class="sidebarClose">關閉</button></div><div class="menu_overlay"></div></nav>');

  $('header .container h1').before('<button type="button" class="sidebarCtrl">側欄選單</button>');
  $('header .container h1').after('<button type="button" class="searchCtrl">查詢</button>');

  let menu_status = false;
  let _sidebar = $('.sidebar');
  let _search = $('.search');
  let _nav = $('.navigation');
  let _sidebarClose = $('.sidebarClose');
  let _sidebarCtrl = $('.sidebarCtrl');
  let _overlay = $('.menu_overlay');
  let _mArea = $('.m_area');
  _sidebarCtrl.attr({
    'aria-controls': 'mobileArea',
    'aria-haspopup': 'true',
    'aria-expanded': 'false',
  });
  _sidebarCtrl.append('<span></span><span></span><span></span>');

  _sidebar.attr({
    id: 'mobileArea',
    // 'aria-hidden': 'true',
  });
  // -------------------------------------------- 打開選單 function
  function showSidebar() {
    _sidebarCtrl.attr('aria-expanded', 'true');
    _sidebar.show();
    // _sidebar.removeAttr('aria-hidden');
    _mArea.show().addClass('open');
    _mArea.animate({ 'margin-left': 0 }, 400, 'easeOutQuint');
    _body.addClass('noscroll');
    _overlay.fadeIn();
    $('.m_search').hide();
    search_mode = false;
    setTimeout(() => {
      _sidebarClose.focus();
    });
  }
  // -------------------------------------------- 縮合選單 function
  function hideSidebar() {
    _sidebarCtrl.attr('aria-expanded', 'false');
    _mArea.animate({ 'margin-left': _mArea.width() * -1 + 'px' }, 500, 'easeOutQuint', function () {
      _sidebar.fadeOut(200);
      _mArea.removeClass('open');
      _mArea.hide();
    });
    // _sidebar.attr('aria-hidden', 'true');
    _body.removeClass('noscroll');
    _overlay.fadeOut(200);
    liHasChild.children('ul').hide();
    _sidebarCtrl.focus();
  }
  // -------------------------------------------- 打開選單動作
  _sidebarCtrl.off().on('click', function (e) {
    e.preventDefault();
    showSidebar();
  });
  // -------------------------------------------- overlay關閉選單
  _overlay.off().on('click', function () {
    hideSidebar();
  });
  _sidebarClose.off().on('click', function () {
    hideSidebar();
  });
  _sidebarClose.on('keydown', function (e) {
    if (e.code == 'Tab' && e.shiftKey && $('.language ul').is(':hidden')) {
      e.preventDefault();
      $('.language > button').focus();
    } else if (e.code == 'Tab' && e.shiftKey && !$('.language ul').is(':hidden')) {
      e.preventDefault();
      $('.sidebar a,.sidebar button,.sidebar input').last().focus();
    }
  });

  // -------------------------------------------- 無障礙tab設定
  // -------------------------------------------- menu
  liHasChild.children('a').keyup(function (e) {
    if (e.which === 9 && !e.shiftKey) {
      $(this).attr('aria-expanded', 'true');
      // $(this).siblings('ul').removeAttr('aria-hidden');

      $(this).siblings('ul').fadeIn(200);
      // let hasChildLi = $(this).parents('.hasChild');
      let hasChildLi = $(this).parents('.hasChild').last();
      let allUl = $(this).parent('li').find('ul').last().parents('ul');
      let checkUlWidth = allUl.eq(allUl.length - 2).width() * $(this).parent('li').find('ul').last().parents('ul').length;
      if (_window.width() < allUl.eq(allUl.length - 2).offset().left + checkUlWidth) {
        hasChildLi?.last().addClass('leftSlider');
      } else {
        hasChildLi?.last().removeClass('leftSlider');
      }
    }
  });

  liHasChild.each(function (i, s) {
    $(this)
      .find('a')
      .last()
      .keydown(function (e) {
        if (e.which === 9 && !e.shiftKey) {
          $(s).children('ul').hide().removeAttr('style');
          $(s).children('a').attr('aria-expanded', 'false');
          // $(s).children('ul').attr('aria-hidden', 'true');
        }
      });
    $(this)
      .children('ul')
      .find('a')
      .focus(function () {
        if (!isObjectFullyVisible(this)) {
          let ele = parseFloat($(this).parents('ul').eq(0).css('top')) || 0;
          $(this)
            .parents('ul')
            .eq(0)
            .css('top', `${ele - 40}px`);
        }
      });
  });

  liHasChild.each(function (i, s) {
    $(this)
      .children('ul')
      .find('a')
      .eq(0)
      .keydown(function (e) {
        if (e.which === 9 && e.shiftKey) {
          $(s).children('ul').removeAttr('style').hide();
        }
      });
  });
  // _menu.find('ul li:fist>a').focusout(function () {
  // console.log('a');
  // if (e.which === 9 && e.shiftKey) {
  //   _menu.find('li ul').hide();
  // }
  // });

  // megamenu
  // liHasChild2.children('a').keyup(function () {
  //   $(this).siblings('ul').fadeIn(200);
  //   $(this).siblings('ul').find('ul').fadeIn(200);
  //   $(this)
  //     .parent('li')
  //     .siblings()
  //     .focus(function () {
  //       $(this).hide();
  //     });
  // });
  // _megamenu
  //   .children('ul')
  //   .children('li')
  //   .keyup(function () {
  //     $(this).siblings().children('ul').hide();
  //   });
  // _megamenu.find('li:last>a').focusout(function () {
  //   _menu.find('li ul').hide();
  // });

  // 先複製過去
  _menu.clone().removeClass('menu megamenu mainMenu').addClass('sideMainMenu').appendTo(_mArea);

  changeTag($('.sideMainMenu'), 'div');

  // _megamenu.clone().appendTo(_mArea);
  _nav.clone().appendTo(_mArea);
  changeTag($('.sidebar .navigation'), 'div');

  _search.clone().appendTo(_body).removeClass('search').addClass('m_search');
  // $('.m_search').attr('aria-hidden', 'true');
  _sidebar.find('.font_size').remove();

  // 切換PC/Mobile 選單
  function checkMenuMode() {
    if ($(window).outerWidth() < wwSmall) {
      /*-----------------------------------*/
      /////////////// 手機版設定 /////////////
      /*-----------------------------------*/
      menu_status = false;
      _sidebar.hide();
      _overlay.hide();
      _mArea.css({
        'margin-left': _mArea.width() * -1 + 'px',
      });
    } else {
      hideSidebar();
      _body.removeClass('noscroll');
      $('.m_search').hide();
      // $('.m_search').attr('aria-hidden', 'true');
      search_mode = false;
      $('.language').find('ul').hide();
    }
  }
  function mobileMenu() {
    //手機版第第一層點了不會進入內頁，拿掉第一層的連結無作用
    $('.sidebar .sideMainMenu li a')
      .off()
      .on('click', function (e) {
        if ($(this).parent().hasClass('hasChild')) {
          e.preventDefault();
        }
        $(this).siblings('ul').slideToggle('fast');
        $(this).parent().siblings('li').find('ul').slideUp('fast');
      });

    liHasChild.off().on({
      mouseenter: function (e) {
        if ($(window).outerWidth() > wwSmall) {
          let _this = $(this);
          let ulHeight = $(this).children('ul').height();
          let ulWidth = $(this).children('ul').width();

          $(this).children('a').attr('aria-expanded', 'true');
          // $(this).children('ul').removeAttr('aria-hidden');

          $(this).children('ul').stop(true, false).fadeIn(200);
          $(this).addClass('active');
          let hasChildLi = $(this).parents('.hasChild').last();
          let allUl = $(this).find('ul').last().parents('ul');
          let checkUlWidth = allUl.eq(allUl.length - 2).width() * $(this).find('ul').last().parents('ul').length;
          if (_window.width() < allUl.eq(allUl.length - 2).offset().left + checkUlWidth) {
            hasChildLi?.last().addClass('leftSlider');
          } else {
            hasChildLi?.last().removeClass('leftSlider');
          }

          //增加上下箭頭，會影響到無障礙
          // setTimeout(function () {
          //   let objectRect = _this.find('ul')[0].getBoundingClientRect();
          //   if (ulHeight + objectRect.top > _window.height() && !isObjectFullyVisible(_this.children('ul'))) {
          //     _this.append(`<button class="menuArrowDown" style="left:${objectRect.left + ulWidth - 50}px"></button>`);
          //     _this.append(`<button class="menuArrowUp" style="left:${objectRect.left + ulWidth - 75}px;opacity:0"></button>`);
          //     let sliderHeight = 40;

          //     $('.menuArrowDown')
          //       .off()
          //       .on('click', function () {
          //         const siblingsUl = $(this).siblings('ul');
          //         let UlRect = siblingsUl.offset();
          //         const topValue = parseInt(siblingsUl.css('top'));
          //         const number = topValue || 0;
          //         const lastItem = siblingsUl.children('li').last();
          //         $(this).siblings('.menuArrowUp').css('opacity', '1');
          //         if ($(this).parent().parent().parent().is('.menu')) {
          //           let firstHasChildHeight = $(this).parents('.hasChild').offset().top + $(this).parents('.hasChild').height();
          //           if (!isObjectVisibleT(lastItem)[0]) {
          //             siblingsUl.css('top', `${number - sliderHeight}px`);
          //           } else {
          //             siblingsUl.css('top', `${$(this).parent('li').height() - (siblingsUl.height() - (_window.height() - firstHasChildHeight))}px`);
          //           }
          //         } else {
          //           if (!isObjectVisibleT(lastItem)[0] && isObjectVisibleB(lastItem)[0]) {
          //             siblingsUl.css('top', `${number - sliderHeight}px`);
          //           } else {
          //             siblingsUl.css('top', `${parseInt(siblingsUl.css('top')) + isObjectVisibleB(lastItem)[1]}px`);
          //           }
          //         }
          //         // siblingsUl.css('top', `${Math.max(leftHeight, number - sliderHeight)}px`);
          //       });

          //     // $('.menuArrowUp')
          //     //   .off()
          //     //   .on('click', function () {
          //     //     const siblingsUl = $(this).siblings('ul');
          //     //     const topValue = parseInt(siblingsUl.css('top'));
          //     //     const maxHeight = $('.header .menu > ul').height();
          //     //     if ($(this).parent().parent().parent().is('.menu')) {
          //     //       if (topValue <= -maxHeight) {
          //     //         siblingsUl.css('top', `${topValue + sliderHeight}px`);
          //     //       } else {
          //     //         siblingsUl.css('top', `${maxHeight}px`);
          //     //         upCheck = false;
          //     //       }
          //     //     } else {
          //     //       if (topValue > siblingsUl.height()) {
          //     //         siblingsUl.css('top', `${topValue + sliderHeight}px`);
          //     //       } else {
          //     //         siblingsUl.css('top', '0px');
          //     //         upCheck = false;
          //     //       }
          //     //     }
          //     //   });
          //   }
          // }, 200);
        }
      },
      mouseleave: function (e) {
        if ($(window).outerWidth() > wwSmall) {
          let _this = $(this);
          $(this).children('a').attr('aria-expanded', 'false');
          // $(this).find('ul').attr('aria-hidden', 'true');
          setTimeout(function () {
            // _this.find('.menuArrowDown').remove();
            // _this.find('.menuArrowUp').remove();
            // _this.children('ul').removeAttr('style');
            _this.removeClass('active');
            _this.find('li').removeClass('active');
            _this.parent().siblings('ul').hide();
            _this.find('ul').stop(true, false).fadeOut(200);
            _this.children('ul').css('top', '');
          }, 200);
        }
      },
    });
    // $(window).on('scroll', function () {
    //   if (ww > wwSmall) {
    //     $('.header .menu .hasChild.active')
    //       .find('ul')
    //       .each(function (i, s) {
    //         if (isObjectFullyVisible(s)) {
    //           $(s).siblings('.menuArrowDown').remove();
    //           $(s).siblings('.menuArrowUp').remove();
    //         }
    //       });
    //   }
    // });

    // megamenu
    // if (_megamenu.length > 0) {
    //   $('.megamenu > ul > li > ul').hide();
    //   liHasChild2.off().on({
    //     mouseenter: function () {
    //       if (ww > wwSmall) {
    //         $(this).children('ul').stop(true, false).fadeIn(200);
    //       }
    //     },
    //     mouseleave: function () {
    //       if (ww > wwSmall) {
    //         $(this).parent().siblings('ul').hide();
    //         $(this).children('ul').stop(true, false).fadeOut(200);
    //       }
    //     },
    //   });
    // }
    // 如果點在外面
    // $(document).on('touchend click', function(e) {
    //     var target = e.target;
    //     if (!$(target).is('.menu li a')) {
    //         $('.menu').find('li ul').hide();
    //     }
    // });
    // 文字大小
    $('.fontsize_btn').on('click', function () {
      if ($(window).outerWidth() > wwSmall) {
        if ($('.font_size').is(':visible')) {
          $('.font_size').stop().slideUp();
        } else {
          $('.font_size').stop().slideDown();
        }
      }
    });

    // 會員登入
    $('.memberblock .membername a').on('click', function () {
      if ($(window).outerWidth() > wwSmall) {
        if ($('.memberlink').is(':visible')) {
          $('.memberlink').stop().slideUp();
        } else {
          $('.memberlink').stop().slideDown();
        }
      }
    });

    $(document).on('touchend click', function (e) {
      if ($(window).outerWidth() > wwSmall) {
        var container = $('.memberblock .membername, .memberblock .memberlink'); //點這些以外的區塊
        if (!container.is(e.target) && container.has(e.target).length === 0) {
          $('.header .memberblock .memberlink').slideUp(); //要被收起來的區塊
        }
        // search
        var container2 = $('.searchblock .search, .searchblock .searchbtn'); //點這些以外的區塊
        if (!container2.is(e.target) && container2.has(e.target).length === 0) {
          $('.searchblock .search').slideUp(); //要被收起來的區塊
        }
        // 文字大小
        var container3 = $('.header .fontsize_btn, .header .font_size'); //點這些以外的區塊
        if (!container3.is(e.target) && container3.has(e.target).length === 0) {
          $('.header .navlist .font_size').slideUp(); //要被收起來的區塊
        }
      }
    });

    $('.searchblock .searchbtn').on('click', function () {
      // $('.searchblock .search').stop().slideToggle();
      if ($(window).outerWidth() > wwSmall) {
        if ($('.search').is(':visible')) {
          $('.search').stop().slideUp();
        } else {
          $('.search').stop().slideDown();
        }
      }
    });
  }
  //行動版/電腦版切換
  var resizeTimer;
  _window.on('resize', function (event) {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      // search_mode = true;
      $('.m_search').hide();
      // $('.m_search').attr('aria-hidden', 'true');
      checkMenuMode();
    }, 50);
  });
  checkMenuMode();
  mobileMenu();
  function isObjectFullyVisible(object) {
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    let objectRect = $(object)[0]?.getBoundingClientRect();
    let objectLeft = objectRect?.left;
    let objectRight = objectRect?.right;
    let objectTop = objectRect?.top;
    let objectBottom = objectRect?.bottom;
    let isFullyVisible = objectLeft >= 0 && objectRight <= windowWidth && objectTop >= 0 && objectBottom <= windowHeight;
    return isFullyVisible;
  }
  function isObjectVisibleT(object) {
    let windowHeight = window.innerHeight;
    let objectPosition = $(object)[0]?.getBoundingClientRect();
    let objectTop = objectPosition?.top;
    let isFullyVisible = objectTop < windowHeight;
    return [isFullyVisible, objectTop];
  }
  function isObjectVisibleB(object) {
    let windowHeight = window.innerHeight;
    let objectPosition = $(object)[0]?.getBoundingClientRect();
    let objectTop = objectPosition?.top;
    let thisHeight = objectPosition?.height;
    let isFullyVisible = objectTop + thisHeight >= windowHeight;

    return [isFullyVisible, windowHeight - objectTop - thisHeight];
  }

  // search設定
  var search_mode = false;
  var _searchCtrl = $('.searchCtrl');
  $('.m_search').hide();
  _searchCtrl.attr('aria-expanded', 'false');
  function searchToggle() {
    if (!search_mode) {
      _searchCtrl.attr('aria-expanded', 'true');
      $('.m_search').stop(true, false).slideDown('400', 'easeOutQuint');
      // $('.m_search').removeAttr('aria-hidden');
      search_mode = true;
      // prevent Android sofr Keyboard
      var isAndroid = /android/i.test(navigator.userAgent.toLowerCase());
      if (isAndroid) {
        _window.off('resize');
      }
    } else {
      _searchCtrl.attr('aria-expanded', 'false');
      $('.m_search').slideUp('400', 'easeOutQuint');
      // $('.m_search').attr('aria-hidden', 'true');
      search_mode = false;
    }
  }
  _searchCtrl.off().on('click', function (e) {
    const checkHidden = _searchCtrl.attr('aria-expanded') === 'true';
    searchToggle();
    _searchCtrl.attr('aria-expanded', !checkHidden);
  });
  _searchCtrl.on('keydown', function (e) {
    if (e.code == 'Enter' && $('.m_search').is(':hidden')) {
      e.preventDefault();
      searchToggle();
      $('.m_search a,.m_search button,.m_search input').first().focus();
    } else if (e.code == 'Tab' && !e.shiftKey && !$('.m_search').is(':hidden')) {
      e.preventDefault();
      $('.m_search a,.m_search button,.m_search input').first().focus();
    } else if (e.code == 'Tab' && e.shiftKey && !$('.m_search').is(':hidden')) {
      e.preventDefault();
      $('.m_search a,.m_search button,.m_search input').last().focus();
    }
  });

  $('.m_search a,.m_search button,.m_search input')
    .first()
    .on('keydown', function (e) {
      if (e.code == 'Tab' && e.shiftKey) {
        e.preventDefault();
        _searchCtrl.focus();
      }
    });
  $('.m_search a,.m_search button,.m_search input')
    .last()
    .on('keydown', function (e) {
      if (e.code == 'Tab' && !e.shiftKey) {
        e.preventDefault();
        _searchCtrl.focus();
      }
    });
  // 如果點在外面
  $(document.body).on('click', function (e) {
    if (search_mode) {
      searchToggle();
      search_mode = false;
    }
  });
  $('.m_search ,.searchCtrl').on('click', function (e) {
    e.stopPropagation();
  });
  // fixed navbar
  var resizeNavTimer;
  if ($('header .mainMenu').length > 0) {
    var stickyMenuTop = Math.floor($('header .mainMenu').offset().top),
      menuH = Math.floor(_menu.outerHeight());

    function stickynavBar() {
      if ($(window).outerWidth() >= wwSmall && $(this).scrollTop() > stickyMenuTop) {
        $('header .mainMenu').addClass('sticky');
        $('.main').css('padding-top', menuH);
      } else {
        $('header .mainMenu').removeClass('sticky');
        $('.main').removeAttr('style');
      }
    }
    _window.on('scroll', function (event) {
      stickynavBar();
    });
    _window.on('resize', function (event) {
      clearTimeout(resizeNavTimer);
      resizeNavTimer = setTimeout(function () {
        stickyMenuTop = Math.floor($('header .menu').offset().top);
        $('.main').removeAttr('style');
        stickynavBar();
      }, 200);
    });
    stickynavBar();
  }

  /*-----------------------------------*/
  //////////// notice訊息區塊 ////////////
  /*-----------------------------------*/
  $('[class^="formNotice"] .close').on('click', function (e) {
    $(this).parent('[class^="formNotice"]').hide();
    e.preventDefault();
  });
  /*-----------------------------------*/
  //////////// Accordion設定 ////////////
  /*-----------------------------------*/
  $('.accordion').each(function () {
    $(this).find('.accordion-content').hide();
    var _accordionItem = $(this).children('ul').children('li').children('a');
    _accordionItem.each(function () {
      function accordion(e) {
        $(this).parent('li').siblings().children('a').removeClass('active');
        $(this).toggleClass('active');
        $(this).parent('li').siblings().children('.accordion-content').slideUp();
        $(this).next('.accordion-content').slideToggle();
        e.preventDefault();
      }
      $(this).click(accordion);
      $(this).keyup(accordion);
    });
  });
  /*-----------------------------------*/
  /////////////fatfooter開關/////////////
  /*-----------------------------------*/
  $('.btn-fatfooter').on('click', function (e) {
    $(this)
      .parent('.container')
      .find('nav>ul>li>ul')
      .stop(true, true)
      .slideToggle(function () {
        if ($(this).is(':visible')) {
          $('.btn-fatfooter').attr('aria-expanded', 'true');
          // $(this).removeAttr('aria-hidden');
          // $('.btn-fatfooter').html('收合/CLOSE');
          // $('.btn-fatfooter').attr('name', '收合選單/CLOSE');
        } else {
          $('.btn-fatfooter').attr('aria-expanded', 'false');
          // $(this).attr('aria-hidden', 'true');
          // $('.btn-fatfooter').html('展開/OPEN');
          // $('.btn-fatfooter').attr('name', '展開選單/OPEN');
        }
      });
    $(this).stop(true, true).toggleClass('close');
  });

  let footerItem = [];
  let checkHidden = $('.btn-fatfooter').attr('aria-expanded');
  $('.fatfooter nav>ul>li>ul').each(function (index) {
    footerItem.push(`fatfooter${index}`);
    $(this).attr('id', `fatfooter${index}`);
    // !checkHidden ? $(this).attr('aria-hidden', 'true') : $(this).removeAttr('aria-hidden');
  });
  $('.btn-fatfooter').attr('aria-controls', footerItem.join(' '));
  /*-----------------------------------*/
  ////////////////多組Tab////////////////
  /*-----------------------------------*/
  // var tab_headerHeight = Math.floor($('.header').outerHeight(true));
  // var resizeTimer1;
  // _window.resize(function () {
  //   clearTimeout(resizeTimer1);
  //   resizeTimer1 = setTimeout(function () {
  //     ww = _window.outerWidth();
  //     tabSet();
  //   }, 50);
  // });

  // function tabSet() {
  //   $('.tabs').each(function () {
  //     var _tab = $(this),
  //       _tabItem = _tab.find('.tabItem'),
  //       _tabContent = _tab.find('.tabContent'),
  //       tabwidth = _tab.width(),
  //       tabItemHeight = _tabItem.outerHeight(),
  //       tabContentHeight = _tab.find('.active').next().innerHeight(),
  //       tabGutter = parseInt('4px'), // 可設定 Gutter 寬度
  //       tabItemLength = _tabItem.length,
  //       tabItemWidth,
  //       marginLeft;
  //     _tab.find('.active').next('.tabContent').show();
  //     if (ww >= wwSmall) {
  //       _tabContent.css('top', tabItemHeight);
  //       _tab.height(tabContentHeight + tabItemHeight);

  //       tabItemWidth = tabwidth / tabItemLength - tabGutter;
  //       marginLeft = (tabwidth - tabItemWidth * tabItemLength) / (tabItemLength - 1);

  //       _tabItem.outerWidth(tabItemWidth).css('margin-left', marginLeft);
  //       _tabItem.first().css('margin-left', 0);
  //       _tabItem.last().css({ position: 'absolute', top: 0, right: 0 }).outerWidth(tabItemWidth);
  //     } else {
  //       _tab.css('height', 'auto');
  //       _tabItem.width(tabwidth);
  //       _tabItem.css('margin-left', 0).last().css('position', 'relative');
  //     }
  //     _tabItem.focus(tabs); //改button後，前面改_tabItem
  //     _tabItem.click(tabs); //改button後，前面改_tabItem
  //     function tabs(e) {
  //       var _tabItemNow = $(this), //改button後，原來$(this).parent(),改$(this)
  //         tvp = _tab.offset().top,
  //         tabIndex = _tabItemNow.index() / 2,
  //         scollDistance = tvp + tabItemHeight * tabIndex - tab_headerHeight;
  //       _tabItem.removeClass('active');
  //       _tabItemNow.addClass('active');
  //       if (ww <= wwSmall) {
  //         _tabItem.not('.active').next().slideUp();
  //         _tabItemNow.next().slideDown();
  //         $('html,body').stop(true, false).animate({ scrollTop: scollDistance });
  //       } else {
  //         _tabItem.not('.active').next().hide();
  //         _tabItemNow.next().show();
  //         tabContentHeight = _tabItemNow.next().innerHeight();
  //         _tab.height(tabContentHeight + tabItemHeight);
  //       }
  //       e.preventDefault();
  //     }
  //   });
  // }
  // $('.tabs>.tabItem:first-child>a').trigger('click');
  // tabSet();

  /*-----------------------------------*/
  ///////////////置頂go to top////////////
  /*-----------------------------------*/
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 200) {
      $('.scrollToTop').fadeIn(200);
    } else {
      $('.scrollToTop').fadeOut(200);
    }
  });
  /*-----------------------------------*/
  /////click event to scroll to top//////
  /*-----------------------------------*/
  $('.scrollToTop')
    .off()
    .on('click', function (e) {
      $('html, body').stop().animate({ scrollTop: 0 }, 400, 'linear');
      $('a.goCenter').focus(); //加入這行
      e.preventDefault();
    });
  $('.scrollToTop').keydown(function (e) {
    if (e.code == 'Enter' && !e.shiftKey) {
      e.preventDefault();
      _body.find('a.goCenter').focus();
      $('html, body').stop().animate({ scrollTop: 0 }, 400, 'linear');
    }
  });
  /*--------------------------------------------------------*/
  /////設定img 在IE9+ SAFARI FIREFOX CHROME 可以object-fit/////
  /*--------------------------------------------------------*/
  var userAgent, ieReg, ie;
  userAgent = window.navigator.userAgent;
  ieReg = /msie|Trident.*rv[ :]*11\./gi;
  ie = ieReg.test(userAgent);
  if (ie) {
    $('.img-container').each(function () {
      var imgUrl = $(this).find('img').attr('data-src');
      var $container = $(this);
      $container.has('.none').addClass('ie-object-none');
      $container.has('.none').css('backgroundImage', 'url(' + imgUrl + ')');
      $container.has('.cover').addClass('ie-object-cover');
      $container.has('.cover').css('backgroundImage', 'url(' + imgUrl + ')');
      $container.has('.fill').addClass('ie-object-fill');
      $container.has('.fill').css('backgroundImage', 'url(' + imgUrl + ')');
      $container.has('.contain').addClass('ie-object-contain');
      $container.has('.contain').css('backgroundImage', 'url(' + imgUrl + ')');
    });
  }
  /*-----------------------------*/
  /////form表單 placeholder隱藏/////
  /*-----------------------------*/
  // $('input,textarea').focus(function() {
  //     $(this).removeAttr('placeholder');
  // });
  $('input[type="checkbox"]')
    .off()
    .on('click', function (e) {
      $(this).blur();
    });
  /*------------------------------------*/
  /////form表單 單個檔案上傳+多個檔案上傳/////
  /*------------------------------------*/
  $(document).on('change', '.check_file', function () {
    var names = [];
    var length = $(this).get(0).files.length;
    for (var i = 0; i < $(this).get(0).files.length; ++i) {
      names.push($(this).get(0).files[i].name);
    }
    // $('input[name=file]').val(names);
    if (length > 2) {
      var fileName = names.join(', ');
      $(this)
        .closest('.upload_grp')
        .find('.upload_file')
        .attr('value', length + ' files selected');
    } else {
      $(this).closest('.upload_grp').find('.upload_file').attr('value', names);
    }
  });
  /*------------------------------------*/
  //////////分享按鈕 share dropdwon////////
  /*------------------------------------*/
  $('.function_panel .share').children('ul').hide();
  // $('.function_panel .share').children('ul').attr('aria-hidden', 'true');
  var _shareButton = $('.shareButton');
  _shareButton.on('click', function (e) {
    e.preventDefault();
    _shareButton.attr('aria-expanded', function (i, attr) {
      return attr === 'false' ? 'true' : 'false';
    });
    $(this).siblings('ul').stop(true, true).slideToggle();
    // _shareButton.attr('aria-expanded') === 'false' ? $('.function_panel .share').children('ul').attr('aria-hidden', 'true') : $('.function_panel .share').children('ul').removeAttr('aria-hidden');
  });
  $('.function_panel .share').on('keydown', function (e) {
    let _this = $(this);
    if (e.code === 'Tab' && e.shiftKey && _this.children('ul').is(':visible') && $(e.target).hasClass('shareButton')) {
      e.preventDefault();
      _this.find('a').last().focus();
    }

    if (e.code === 'Tab' && !e.shiftKey && _this.children('ul').is(':visible') && $(e.target).is(_this.find('a').last())) {
      e.preventDefault();
      _shareButton.focus();
    }
  });
  // 點外面關閉share
  $(document).on('touchend click', function (e) {
    var container = $('.function_panel .share');
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      $('.function_panel .share ul').hide();
    }
  });
  /*------------------------------------*/
  /////////////字型大小 font-size//////////
  /*------------------------------------*/
  function fontSize() {
    const $el = $('.font_size'); // 控制的對象
    const $list = $el.find('ul button');
    const $body = $('body');
    // 初始化 字體大小設定
    let cookie = readCookie('FontSize');

    $list.each(function () {
      $(this).on('click', function (e) {
        createCookie('FontSize', $(e.target).attr('class'), 356);
        toggleBodyClass($(e.target).attr('class'));
        $(e.target).parent().addClass('active');
        $(e.target).attr('aria-pressed', 'true');
      });
    });

    // 移除 active 的 class 名稱
    function toggleBodyClass(targetClassName) {
      $list.each(function () {
        if ($(this).attr('class') === targetClassName) {
          $(this).attr('aria-pressed', 'true');
          $(this).parent().addClass('active');
        } else {
          $(this).attr('aria-pressed', 'false');
          $(this).parent().removeClass('active');
        }
      });

      switch (targetClassName) {
        case 'smallSize':
          $body.removeClass('largeSize mediumSize').addClass('smallSize');
          break;
        case 'mediumSize':
          $body.removeClass('smallSize largeSize').addClass('mediumSize');
          break;
        case 'largeSize':
          $body.removeClass('smallSize mediumSize').addClass('largeSize');
          break;
      }
    }

    // 創造新的 字體大小設定
    function createCookie(name, value, days) {
      let _expires;
      const _date = new Date();
      if (days) {
        _date.setTime(_date.getTime() + days * 24 * 60 * 60 * 1000);
        _expires = '; expires=' + _date.toGMTString();
      } else {
        _expires = '';
      }
      document.cookie = name + '=' + value + _expires + '; path=/';
    }

    // 讀取瀏覽器上 字體大小設定
    function readCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    }

    // 如果沒有 cookie 則預設值為 'medium'
    if (!cookie) {
      createCookie('FontSize', 'mediumSize', 356);
      toggleBodyClass('mediumSize');
    } else {
      toggleBodyClass(cookie);
    }
  }
  fontSize();
  /*-----------------------------------*/
  /////////// category active  //////////
  /*-----------------------------------*/
  $('.category')
    .find('a')
    .off()
    .on('click', function (event) {
      $(this).parent('li').siblings().find('a').removeClass('active');
      $(this).addClass('active').blur();
    });
  /*-----------------------------------*/
  /////////// 無障礙快捷鍵盤組合  //////////
  /*-----------------------------------*/
  $(document).on('keydown', function (e) {
    // alt+S 查詢
    if (e.altKey && e.keyCode == 83) {
      $('html, body').animate({ scrollTop: 0 }, 200, 'easeOutExpo');
      $('.search').find('input[type="text"]').focus();
    }
    // alt+U header
    if (e.altKey && e.keyCode == 85) {
      $('html, body').animate({ scrollTop: 0 }, 200, 'easeOutExpo');
      $('header').find('.accesskeyItem').focus();
    }
    // alt+C 主要內容區
    if (e.altKey && e.keyCode == 67) {
      $('html, body')
        .stop(true, true)
        .animate({ scrollTop: $('.main').find('.accesskeyItem').offset().top - 70 }, 800, 'easeOutExpo');
      $('.main').find('.accesskeyItem').focus();
    }
    // alt+Z footer
    if (e.altKey && e.keyCode == 90) {
      $('html, body')
        .stop(true, true)
        .animate({ scrollTop: $('footer').find('.accesskeyItem').offset().top }, 800, 'easeOutExpo');
      $('footer').find('.accesskeyItem').focus();
    }

    if (e.key == 'Escape') {
      if ($('.language ul').is(':visible')) {
        $('.language ul').slideUp();
        // $('.language ul').attr('aria-hidden', 'true');
        $('.language button').attr('aria-expanded', 'false');
        $('.language button').focus();
      }
      if ($('.m_search').is(':visible')) {
        $('.m_search').slideUp();
        // $('.m_search').attr('aria-hidden', 'true');
        $('.searchCtrl').attr('aria-expanded', 'false');
        $('.searchCtrl').focus();
      }
      if ($('.sidebar').is(':visible')) {
        hideSidebar();
      }
      if ($('.function_panel .share ul').is(':visible')) {
        $('.function_panel .share ul').slideUp();
        // $('.function_panel .share ul').attr('aria-hidden', 'true');
        $('.function_panel .share .shareButton').attr('aria-expanded', 'false');
        $('.function_panel .share .shareButton').focus();
      }
    }
  });

  //無障礙切換slick箭頭語系
  if ($('html')[0].hasAttribute('lang')) {
    var weblang = $('html').attr('lang');
    if (weblang.substring(0, 2) == 'zh') {
      $('.slick-prev').attr('title', '上一筆');
      $('.slick-next').attr('title', '下一筆');
    } else if (weblang.substring(0, 2) !== 'zh') {
      $('.slick-prev').attr('title', 'previous');
      $('.slick-next').attr('title', 'next');
    }
  }
  // 無障礙錨點切換語系，更改accesskey的title名稱
  var weblang = $('html').attr('lang');
  if (weblang.substring(0, 2) == 'zh') {
    $('header').find('.accesskeyItem').attr('title', '上方功能區塊');
    $('.main').find('.accesskeyItem').attr('title', '中央內容區塊');
    $('footer').find('.accesskeyItem').attr('title', '下方功能區塊');
    $('.search').find('.accesskeyItem').attr('title', '關鍵字搜尋：文章關鍵字搜尋');
  } else if (weblang.substring(0, 2) !== 'zh') {
    $('header').find('.accesskeyItem').attr('title', 'header');
    $('.main').find('.accesskeyItem').attr('title', 'content');
    $('footer').find('.accesskeyItem').attr('title', 'footer');
    $('.search').find('.accesskeyItem').attr('title', 'search');
  }
  /*------------------------------------*/
  /////gotoCenter on focus跳到 content/////
  /*------------------------------------*/
  $('a.goCenter').keydown(function (e) {
    if (e.which == 13) {
      $('#aC').focus();
      $('html, body')
        .stop(true, true)
        .animate({ scrollTop: $('.main').find('.accesskeyItem').offset().top }, 800, 'easeOutExpo');
    }
  });
  /*-----------------------------------*/
  //////// 語言模組 無障礙遊走設定  ////////
  /*-----------------------------------*/
  $('.language').find('ul').hide();
  $('.language').each(function () {
    $(this).children('ul').attr({
      // 'aria-hidden': 'true',
    });
    let _this = $(this);
    var openLang = _this.children('a,button');
    openLang.off().on('click', function (e) {
      e.preventDefault();
      $($(e.target)).next('ul').stop(true, true).slideToggle();
      // $($(e.target)).attr('aria-expanded') === 'false' ? $($(e.target)).next('ul').attr('aria-hidden', 'true') : $($(e.target)).next('ul').removeAttr('aria-hidden');
    });

    _this.on('keydown', function (e) {
      if (e.target === openLang[0]) {
        if (e.code == 'Tab' && e.shiftKey && !$(e.target).next('ul').is(':hidden')) {
          e.preventDefault();
          _this.find('ul li:last>a').focus();
        } else if (e.code == 'Tab' && !e.shiftKey && $(e.target).next('ul').is(':hidden') && !$('.m_area').is(':hidden')) {
          e.preventDefault();
          _sidebarClose.focus();
        }
      } else if (e.target === _this.find('ul li:last>a')[0]) {
        if (e.code == 'Tab' && !e.shiftKey) {
          e.preventDefault();
          openLang[0].focus();
        }
      }
    });
  });
  $(document).on('touchend click', function (e) {
    var target = e.target;
    if (!$(target).is('.language a, .language button')) {
      $('.language').find('ul').hide();
    }
  });
  // /*------------------------------------*/
  // ///////table 加上響應式 scroltable-wrapper/////
  // /*------------------------------------*/
  $('table').each(function (index, el) {
    //判斷沒有table_list
    if ($(this).parents('.table_list').length == 0 && $(this).parents('.fix_th_table').length == 0 && $(this).parent('form').length == 0) {
      $(this).scroltable();
    }
  });
  // tablearrow arrow，為了設定箭頭
  $('.scroltable-nav-left').append('<div class="tablearrow_left" style="display:none;"></div>');
  $('.scroltable-nav-right').append('<div class="tablearrow_right"  style="display:none;"></div>');
  // 固定版頭
  function table_Arrow() {
    if ($('table').parents('.table_list').length == 0 && $('table').parents('.fix_th_table').length == 0 && $(this).parent('form').length == 0) {
      if ($('.scroltable-wrapper').length > 0) {
        var stickyArrowTop = Math.floor($('.scroltable-wrapper').offset().top),
          thisScroll = Math.floor($(this).scrollTop());
        if (thisScroll > stickyArrowTop - 230) {
          $('.scroltable-wrapper .tablearrow_left').css('display', 'block');
          $('.scroltable-wrapper .tablearrow_left').css({ top: thisScroll - stickyArrowTop + 220 }, 100, 'easeOutQuint');
          $('.scroltable-wrapper .tablearrow_right').css('display', 'block');
          $('.scroltable-wrapper .tablearrow_right').css({ top: thisScroll - stickyArrowTop + 220 }, 100, 'easeOutQuint');
        } else {
          $('.scroltable-wrapper .tablearrow_left').css({
            top: '10px',
            display: 'none',
          });
          $('.scroltable-wrapper .tablearrow_right').css({
            top: '10px',
            display: 'none',
          });
        }
      }
    }
  }
  $(window).scroll(function (event) {
    table_Arrow();
  });
  var scrollTimer;
  _window.scroll(function () {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(function () {
      table_Arrow();
    }, 50);
  });
  // /*------------------------------------*/
  // //////////table 加上 data-title//////////
  // /*------------------------------------*/
  function rwdTable() {
    $('.table_list')
      .find('table')
      .each(function () {
        var $row = $(this).find('tr');
        rowCount = $row.length;
        for (var n = 1; n <= rowCount; n++) {
          $(this)
            .find('th')
            .each(function (index) {
              var thText = $(this).text();
              $row.eq(n).find('td').eq(index).attr('data-title', thText);
            });
        }
      });
  }
  rwdTable();
  /*-----------------------------------*/
  ////////////// lazy load //////////////
  /*-----------------------------------*/
  var lazyLoadInstance = new LazyLoad({
    elements_selector: 'img.lazy',
    placeholder: '/images/basic/placeholder.gif',
    effect: 'fadeIn',
    fadeTime: 600,
    threshold: 0,
  });
});

function tabFunction(obj) {
  ('use strict');
  const { target, autoClose = true, openContent = false, modeSwitch = false, windowWidth = wwSmall, openIndex = 0, openSwitch = true } = obj;
  const tabSet = target === undefined ? $(obj) : $(target);

  if (tabSet === null) return;
  const tabItem = $('.tabItems');
  const tabBtns = tabSet.find('.tabItems .tabBtn');
  const tabContent = tabSet.find('.tabContent');
  const tabContentIn = tabSet.find('.tabContent .tabContentIn');

  //初始設定
  function tabInit(targetIndex) {
    tabItem.attr('role', 'tablist');

    tabBtns.each(function (i) {
      const id = `tab_${randomLetter(3)}${randomFloor(0, 999)}`;
      const controls = `${id}_con`;
      $(this).attr({
        id: id,
        'aria-controls': controls,
        'aria-selected': 'false',
        'aria-expanded': 'false',
        tabindex: '-1',
      });
      setAttribute(tabContent.eq(i), 'tabpanel', controls, id);

      //模式切換-新增按鈕
      if (modeSwitch) {
        const mobileTabBtn = createMobileTabBtn(id, controls, $(this).text());
        tabContent.eq(i).prepend(mobileTabBtn);
      }
    });

    checkTarget(targetIndex);
    tabSet.data('nowIndex', targetIndex);
  }

  // 創建移動版選項按鈕
  function createMobileTabBtn(id, controls, textContent) {
    return $('<button>', {
      class: 'mobileTabBtn',
      id: id,
      'aria-controls': controls,
      type: 'button',
      'aria-expanded': 'false',
    }).text(textContent);
  }

  //執行
  tabInit(openIndex);

  //切換動作
  function checkTarget(targetIndex) {
    tabSet.data('nowIndex', targetIndex);

    //點選的按鈕增加active
    tabBtns.eq(targetIndex).addClass('active');
    tabBtns.eq(targetIndex).attr({
      'aria-selected': 'true',
      'aria-expanded': 'true',
      tabindex: '0',
    });

    //移除其他按鈕的active
    const siblingsBtn = tabBtns.eq(targetIndex).siblings();
    siblingsBtn.each(function (e) {
      $(this).removeClass('active');
      $(this).attr({
        'aria-selected': 'false',
        'aria-expanded': 'false',
        tabindex: '-1',
      });
    });

    tabContent.eq(targetIndex).removeClass('hidden');
    // tabContent.eq(targetIndex).removeAttr('aria-hidden');

    //移除其他內容的active
    const siblingsPanel = tabContent.eq(targetIndex).siblings();
    siblingsPanel.each(function (e) {
      $(this).addClass('hidden');
      // $(this).attr('aria-hidden', 'true');
    });
  }

  // 是否可開合/切換
  if (openSwitch) {
    //tab動作
    tabSet.on('click', function (e) {
      if (!$(e.target).hasClass('tabBtn')) return;
      let index = $(e.target).index() % tabBtns.length;
      checkTarget(index);
    });

    tabSet.on('keydown', function (e) {
      if (!$(e.target).hasClass('tabBtn')) return;
      let index;
      //左右操作tab
      if (e.code === 'ArrowRight') {
        index = ($(e.target).index() + 1) % tabBtns.length;
        tabBtns.eq(index).focus();
        checkTarget(index);
      } else if (e.code === 'ArrowLeft') {
        index = ($(e.target).index() - 1 + tabBtns.length) % tabBtns.length;
        tabBtns.eq(index).focus();
        checkTarget(index);
      }
    });

    //模式切換-手風琴動作
    if (modeSwitch) {
      const mobileTabBtn = tabSet.find('.mobileTabBtn');

      tabSet.on('click', function (e) {
        if (!$(e.target).hasClass('mobileTabBtn')) return;
        let index = mobileTabBtn.index(e.target) % mobileTabBtn.length;
        mobileTabFn(mobileTabBtn.eq(index), index, mobileTabBtn);
      });
    }
  }

  function mobileTabFn(btn, i, mobileTabBtn) {
    tabContentIn.eq(i).slideToggle();
    tabSet.data('nowIndex', i);

    let check = btn.attr('aria-expanded') === 'true' ? false : true;
    btn.attr('aria-expanded', check);
    // tabContentIn.eq(i).attr('aria-hidden', !check);

    // !check ? tabContentIn.eq(i).attr('aria-hidden', 'true') : tabContentIn.eq(i).removeAttr('aria-hidden');

    btn.toggleClass('active');

    if (!autoClose) return;
    const siblingsMobileTabBtn = mobileTabBtn.eq(i).parent().siblings().children('.mobileTabBtn');
    siblingsMobileTabBtn.each(function (e) {
      $(this).removeClass('active');
      $(this).attr('aria-expanded', 'false');
    });
    const siblingsPanel = tabContentIn.eq(i).parent().siblings().children('.tabContentIn');

    siblingsPanel.each(function (e) {
      $(this).slideUp();
      // $(this).attr('aria-hidden', 'true');
    });
  }

  function removeAttribute(item) {
    // item.removeAttr('aria-hidden');
    item.removeAttr('role');
    item.removeAttr('aria-labelledby');
    item.removeAttr('id');
  }
  function setAttribute(item, role, id, labelledby) {
    item.attr({
      role: role,
      id: id,
      'aria-labelledby': labelledby,
    });
    // .removeAttr('aria-hidden');
  }
  //模式切換-RWD
  function checkRWD() {
    const tabpanelBtn = tabSet.find('.tabContent .mobileTabBtn');
    const nowOpen = tabSet.data('nowIndex');

    // 電腦版
    tabBtns.eq(nowOpen).addClass('active');
    tabBtns.eq(nowOpen).attr({
      'aria-selected': 'true',
      'aria-expanded': 'true',
      tabindex: '0',
    });
    const tabListSiblingsPanelBtn = tabBtns.eq(nowOpen).siblings();
    tabListSiblingsPanelBtn.each(function (e) {
      $(this).removeClass('active');
      $(this).attr({
        'aria-expanded': 'false',
        'aria-selected': 'false',
        tabindex: '-1',
      });
    });

    // 手機版
    tabpanelBtn.eq(nowOpen)?.addClass('active');
    tabpanelBtn.eq(nowOpen)?.attr('aria-expanded', 'true');
    const tabSiblingsPanelBtn = tabpanelBtn.eq(nowOpen).siblings();
    tabSiblingsPanelBtn.each(function (e) {
      $(this).removeClass('active');
      $(this).attr('aria-expanded', 'false');
    });

    if (window.innerWidth < windowWidth && modeSwitch) {
      //隱藏上方選單
      tabItem.addClass('hidden');
      // tabItem.attr('aria-hidden', 'true');

      tabBtns.each(function (i) {
        const id = tabpanelBtn.eq(i).attr('id');
        const controls = tabpanelBtn.eq(i).attr('aria-controls');

        //顯示所有tab內容標籤
        tabContent.eq(i).removeClass('hidden');
        //移除tab內容標籤
        removeAttribute(tabContent.eq(i));

        //顯示手風琴標籤按鈕
        tabpanelBtn.eq(i).removeClass('hidden');
        // tabpanelBtn.eq(i).removeAttr('aria-hidden');
        //新增手風琴內容標籤
        setAttribute(tabContentIn.eq(i), 'region', controls, id);
      });

      if (openContent) {
        tabContentIn.each(function (i) {
          $(this).css('display', 'block');
          // $(this).removeAttr('aria-hidden');
          tabpanelBtn.eq(i).addClass('active');
        });
      } else {
        //隱藏其他手風琴內容
        const siblingsPanel = tabContentIn.eq(nowOpen).parent().siblings().children('.tabContentIn');
        console.log(siblingsPanel);

        siblingsPanel.each(function (i) {
          $(this).css('display', 'none');
          // $(this).attr('aria-hidden', 'true');
        });
      }

      //展開目前手風琴內容
      tabpanelBtn.eq(nowOpen).attr('aria-expanded', 'true');
      tabpanelBtn.eq(nowOpen).focus();
    } else if (window.innerWidth >= windowWidth && modeSwitch) {
      //增加上方選單
      tabItem.removeClass('hidden');
      // tabItem.removeAttr('aria-hidden');
      tabItem.attr('role', 'tablist');

      tabBtns.each(function (i) {
        const id = tabpanelBtn.eq(i).attr('id');
        const controls = tabpanelBtn.eq(i).attr('aria-controls');

        //顯示所有Tab內容
        tabContentIn.eq(i).removeClass('hidden');
        //移除Tab內容標籤
        removeAttribute(tabContentIn.eq(i));
        tabContentIn.eq(i).removeAttr('style');

        //隱藏Tab標籤按鈕
        tabpanelBtn.eq(i).addClass('hidden');
        // tabpanelBtn.eq(i).attr('aria-hidden', 'true');
        //新增Tab內容標籤
        setAttribute(tabContent.eq(i), 'tabpanel', controls, id);
      });

      //展開目前Tab內容
      tabContent.eq(nowOpen).removeClass('hidden');
      tabBtns.eq(nowOpen).focus();

      //隱藏其他Tab內容
      const siblingsPanel = tabContent.eq(nowOpen).siblings();
      siblingsPanel.each(function () {
        $(this).addClass('hidden');
        // $(this).attr('aria-hidden', 'true');
      });
    }
  }
  checkRWD();
  $(window).on('resize', checkRWD);
}

// tabFunction({
//   target: '.tabSet',
//   openFirst: false, // 預設先展開所有內容，鍵盤的自動開合功能無效
//   openSwitch: true, // 是否可開合/切換
//   autoClose: true, // 自動關閉其他開啟內容
//   modeSwitch: true, // 預設模式自動切換，尺寸以上tab功能，尺寸以下手風琴功能
//   width: 767, // 尺寸以上tab功能，尺寸以下手風琴功能
//   index: 0, // 預設開啟第幾個
// });

// -----   fancyBox新增需要綁定才有效果
if ($('[data-fancybox="gallery"]').length > 0) {
  Fancybox.bind('[data-fancybox="gallery"]', {
    l10n: Fancybox.l10n.zh_TW,
  });
}
function formEye(obj) {
  const webLang = $('html').attr('lang');
  // form password eyes
  $('.passwordEye').each(function () {
    const item = $(this);
    const passwordInput = item.parent().find('[type="password"]');
    item.on('click', function (e) {
      const target = $(e.target);
      if (target.hasClass('hide')) {
        //換class / type
        target.removeClass('hide').addClass('show');
        if (webLang) {
          obj.password.data.forEach(function (s) {
            if (webLang.slice(0, 2) == s.lang) {
              target.text(s.hide);
            }
          });
        }
        passwordInput.attr('type', 'text');
      } else {
        passwordInput.attr('type', 'password');
        target.removeClass('show').addClass('hide');
        target.text(obj.password.default.show);
        if (webLang) {
          obj.password.data.forEach(function (s) {
            if (webLang.slice(0, 2) == s.lang) {
              target.text(s.show);
            }
          });
        }
      }
    });
  });
}

formEye({
  password: {
    data: [
      {
        lang: 'zh',
        show: '顯示密碼',
        hide: '隱藏密碼',
      },
      //...由此新增其他語系
    ],
    //預設語系
    default: {
      show: 'show',
      hide: 'hide',
    },
  },
});
