// 自行加入的JS請寫在這裡
$(function () {
  // 首頁輪播
  if ($('.mpSlider').length > 0) {
    $('.mpSlider').slick({
      mobileFirst: true,
      dots: true,
      arrows: true,
      infinite: true,
      speed: 500,
      autoplay: true,
      fade: true,
      lazyLoaded: true,
      lazyLoad: 'ondemand',
      ease: 'ease',
      pauseOnHover: false,
      pauseOnFocus: false,
      customPaging: function (slider, i) {
        var title = $(slider.$slides[i]).find('img').attr('alt').trim();
        return $('<button type="button" aria-label="' + title + '"/>').text(title);
      },
    });
    let checkState = true;
    $('.mpSliderBox .slickControlBox button').on('click', function () {
      if (checkState) {
        checkState = false;
        $(this).addClass('stop');
        $('.mpSlider').slick('slickPause');
      } else {
        checkState = true;
        $(this).removeClass('stop');
        $('.mpSlider').slick('slickPlay');
      }
    });
  }
  // 廣告輪播
  if ($('.adSlider').length > 0) {
    $('.adSlider').slick({
      mobileFirst: true,
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 2,
      slidesToScroll: 1,
      // autoplay: true,
      arrow: true,
      lazyLoaded: true,
      lazyLoad: 'ondemand',
      ease: 'ease',
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1,
            arrows: true,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: true,
          },
        },
        {
          breakpoint: 575,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: true,
          },
        },
      ],
    });
  }
  //燈箱slick+lightBox組合
  if ($('.cp_slider').length > 0) {
    $('.cp_slider').slick({
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 1500,
      pauseOnHover: true,
      pauseOnFocus: true,
      focusOnSelect: true,
      accessibility: true,
      lazyLoad: 'ondemand',
      ease: 'ease',
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 545,
          settings: {
            arrows: true,
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            arrows: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
          },
        },
      ],
    });
  }
  //

  if ($('.cppic_slider').length > 0) {
    $('.cppic_slider').slick({
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 1500,
      // pauseOnHover: true,
      // pauseOnFocus: true,
      // focusOnSelect: true,
      // accessibility: true,
      // lazyLoad: 'ondemand',
      // ease: 'ease',
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 545,
          settings: {
            arrows: true,
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            arrows: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
          },
        },
      ],
    });
  }
  // cp_photo
  $('.Slider-for').on('init reInit afterChange', function (event, slick, currentSlide) {
    var i = (currentSlide ? currentSlide : 0) + 1;
    $('.controls').html(i + '/' + slick.slideCount);
  });
  if ($('.Slider-for').length > 0) {
    $('.Slider-for').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      swipe: false,
      swipeToSlide: false,
      lazyLoad: 'ondemand',
      asNavFor: '.Slider-nav',
      infinite: true,
    });
  }
  if ($('.Slider-nav').length > 0) {
    $('.Slider-nav').slick({
      slidesToShow: 2,
      slidesToScroll: 1,
      asNavFor: '.Slider-for',
      dots: true,
      arrows: true,
      lazyLoad: 'ondemand',
      focusOnSelect: true,
      infinite: true,
    });
  }
  // password_toggle
  var passShow = false;
  $('.password_toggle').each(function (index, el) {
    $(this)
      .find('.btn-icon')
      .off()
      .click(function (e) {
        if (!passShow) {
          $(this).children('i').removeClass().addClass('i_show');
          $(this).parents('.password_toggle').find('input[type="password"]').attr('type', 'text');
          passShow = true;
          // console.log(passShow);
        } else {
          $(this).children('i').removeClass().addClass('i_hide');
          $(this).parents('.password_toggle').find('input[type="text"]').attr('type', 'password');
          passShow = false;
          // console.log(passShow);
        }
        e.preventDefault();
      });
  });
  //sticky sidebar
  // if ($('.stickySidebar').length > 0) {
  //   var stickySidebar = new StickySidebar('.stickySidebar', {
  //     containerSelector: '.main',
  //     topSpacing: 93,
  //     bottomSpacing: 0,
  //     minWidth: 768,
  //     resizeSensor: true,
  //   });
  // }
});

// tab功能
tabFunction({ target: '.target1', modeSwitch: true });
