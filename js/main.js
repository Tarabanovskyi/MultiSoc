// // Dynamic Adapt v.1 Использовать в стартовый шаблон

(function () {
   let originalPositions = [];
   let daElements = document.querySelectorAll('[data-da]');
   let daElementsArray = [];
   let daMatchMedia = [];
   //Заполняем массивы
   if (daElements.length > 0) {
      let number = 0;
      for (let index = 0; index < daElements.length; index++) {
         const daElement = daElements[index];
         const daMove = daElement.getAttribute('data-da');
         if (daMove != '') {
            const daArray = daMove.split(',');
            const daPlace = daArray[1] ? daArray[1].trim() : 'last';
            const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
            const daDestination = document.querySelector('.' + daArray[0].trim())
            if (daArray.length > 0 && daDestination) {
               daElement.setAttribute('data-da-index', number);
               //Заполняем массив первоначальных позиций
               originalPositions[number] = {
                  "parent": daElement.parentNode,
                  "index": indexInParent(daElement)
               };
               //Заполняем массив элементов 
               daElementsArray[number] = {
                  "element": daElement,
                  "destination": document.querySelector('.' + daArray[0].trim()),
                  "place": daPlace,
                  "breakpoint": daBreakpoint
               }
               number++;
            }
         }
      }
      dynamicAdaptSort(daElementsArray);

      //Создаем события в точке брейкпоинта
      for (let index = 0; index < daElementsArray.length; index++) {
         const el = daElementsArray[index];
         const daBreakpoint = el.breakpoint;
         const daType = "max"; //Для MobileFirst поменять на min

         daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
         daMatchMedia[index].addListener(dynamicAdapt);
      }
   }
   //Основная функция
   function dynamicAdapt(e) {
      for (let index = 0; index < daElementsArray.length; index++) {
         const el = daElementsArray[index];
         const daElement = el.element;
         const daDestination = el.destination;
         const daPlace = el.place;
         const daBreakpoint = el.breakpoint;
         const daClassname = "_dynamic_adapt_" + daBreakpoint;

         if (daMatchMedia[index].matches) {
            //Перебрасываем элементы
            if (!daElement.classList.contains(daClassname)) {
               let actualIndex = indexOfElements(daDestination)[daPlace];
               if (daPlace === 'first') {
                  actualIndex = indexOfElements(daDestination)[0];
               } else if (daPlace === 'last') {
                  actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
               }
               daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
               daElement.classList.add(daClassname);
            }
         } else {
            //Возвращаем на место
            if (daElement.classList.contains(daClassname)) {
               dynamicAdaptBack(daElement);
               daElement.classList.remove(daClassname);
            }
         }
      }
      customAdapt();
   }

   //Вызов основной функции
   dynamicAdapt();

   //Функция возврата на место
   function dynamicAdaptBack(el) {
      const daIndex = el.getAttribute('data-da-index');
      const originalPlace = originalPositions[daIndex];
      const parentPlace = originalPlace['parent'];
      const indexPlace = originalPlace['index'];
      const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
      parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
   }
   //Функция получения индекса внутри родителя
   function indexInParent(el) {
      var children = Array.prototype.slice.call(el.parentNode.children);
      return children.indexOf(el);
   }
   //Функция получения массива индексов элементов внутри родителя 
   function indexOfElements(parent, back) {
      const children = parent.children;
      const childrenArray = [];
      for (let i = 0; i < children.length; i++) {
         const childrenElement = children[i];
         if (back) {
            childrenArray.push(i);
         } else {
            //Исключая перенесенный элемент
            if (childrenElement.getAttribute('data-da') == null) {
               childrenArray.push(i);
            }
         }
      }
      return childrenArray;
   }
   //Сортировка объекта
   function dynamicAdaptSort(arr) {
      arr.sort(function (a, b) {
         if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 } //Для MobileFirst поменять
      });
      arr.sort(function (a, b) {
         if (a.place > b.place) { return 1 } else { return -1 }
      });
   }
   //Дополнительные сценарии адаптации
   function customAdapt() {
      const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
   }
}());
;

// =================================================================================

function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

  if (support == true) {
    document.querySelector('body').classList.add('webp');
  } else {
    document.querySelector('body').classList.add('no-webp');
  }
});

// ===============MENU MAIN====================================================

const menuBtn = $('.burger-header__btn'),
  menu = $('.menu-header__column'),
  menuLines = $('.btn__burger-lines');

menuBtn.on('click', function (e) {
  e.stopPropagation();
  $('.btn__burger-lines').toggleClass('_active');
  setTimeout("$('.submenu-page__baner').show('drop');", 2000);
  if ($(this).hasClass('_active')) {
    $(this).removeClass('_active');
    menu.slideUp();
    setTimeout("$('.submenu-page__baner').hide('drop');", 2000);

  } else {
    $(this).addClass('_active');
    menu.slideDown();
  }
});

$(document).click(function (e) {
  if (!menuBtn.is(e.target) && !menu.is(e.target) && menu.has(e.target).length === 0) {
    menu.slideUp();
    menuLines.removeClass('_active');
    menuBtn.removeClass('_active');
  };
});
// ===================================================================

// ===================BURGER MOBILE=====================================

const mobileBtn = $('.mobile-menu__burger'),
  mobileMenu = $('.menu-header__column'),
  mobileLines = $('.burger-mobile-lines');

mobileBtn.on('click', function (e) {
  e.stopPropagation();
  $('.burger-mobile-lines').toggleClass('_active');
  if ($(this).hasClass('_active')) {
    $(this).removeClass('_active');
    mobileMenu.slideUp();

  } else {
    $(this).addClass('_active');
    mobileMenu.slideDown();
  }
});

$(document).click(function (e) {
  if (!mobileBtn.is(e.target) && !mobileMenu.is(e.target) && mobileMenu.has(e.target).length === 0) {
    mobileMenu.slideUp();
    mobileLines.removeClass('_active');
    mobileBtn.removeClass('_active');
  };
});
// ==================================================================================================

// ====================MOBILE MENU==============================================

if ($(window).width() < 992) {
  const mobileSubBtn = $('.page-menu__list  li'),
    mobileSubmenu = $('.submenu-page__item'),
    pageLink = $('.page-menu__link');
  $('.page-menu__list  li').on('click', function (e) {
    e.stopPropagation();
    $(this).find('.page-menu__link').toggleClass('_active');
    e.preventDefault();

    if ($(this).find('.submenu-page__item').slideToggle()) {
    } else {
      $(this).find('.submenu-page__item').slideToggle();
      mobileSubmenu.slideDown();
    }
    $('.submenu-page__item ul > li > a').on("click", function (e) {
      e.stopPropagation();
    });

  });
  $(document).click(function (e) {

    if (!$('.page-menu__list  li').is(e.target) && !mobileSubmenu.is(e.target) && mobileSubmenu.has(e.target).length === 0) {
      mobileSubmenu.slideUp();
      $('.page-menu__link').removeClass('_active');
    };
  });
}
// ==============================================================================

// =======================MENU SERVICES==========================
const servSubBtn = $('.menu-services__list li'),
  servSubmenu = $('.submenu-services__item');

$('.menu-services__list li').on('click', function (e) {
  e.stopPropagation();
  $(this).find('.menu-services__link').toggleClass('_active');
  e.preventDefault();
  if ($(this).find('.submenu-services__item').slideToggle()) {
    e.preventDefault();
  } else {
    $(this).find('.submenu-services__item').slideToggle();
    servSubmenu.slideDown();
  }
  $('.submenu-services__item ul > li > a').on("click", function (e) {
    e.stopPropagation();
  });

  $(document).click(function (e) {

    if (!$('.menu-services__list  li').is(e.target) && !servSubmenu.is(e.target) && servSubmenu.has(e.target).length === 0) {
      servSubmenu.slideUp();
      $('.menu-services__link').removeClass('_active');
    };

  });
});

// ==============================================================





// <Выпадающие меню при наведении> 

let mediaQuery = window.matchMedia('(min-width: 992px)');

if (mediaQuery.matches) {
  let menuParents = document.querySelectorAll('.page-menu__list>li');


  for (let index = 0; index < menuParents.length; index++) {
    const menuParent = menuParents[index];
    menuParent.addEventListener("mouseenter", function (e) {

      menuParent.classList.add('_active');
    });
    menuParent.addEventListener("mouseleave", function (e) {
      menuParent.classList.remove('_active');
    });
  }

}

let menuParents = document.querySelectorAll('.nav__list>li');

for (let index = 0; index < menuParents.length; index++) {
  const menuParent = menuParents[index];
  menuParent.addEventListener("mouseenter", function (e) {
    menuParent.classList.add('_active');
  });
  menuParent.addEventListener("mouseleave", function (e) {
    menuParent.classList.remove('_active');
  });
}
// </Выпадающие меню при наведении>

// =======================Slider================================================
$(document).ready(function () {
  $('.slider').slick();

});

$('.slider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  dots: true,
  arrows: true,

  autoplaySpeed: 5000,
})

$(document).ready(function () {
  $('.slider-card').slick();

});

$('.slider-card').slick({
  infinite: false,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: false,
  dots: false,
  arrows: true,

  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 530,
      settings: {
        slidesToShow: 1
      }
    }
  ]
})
// ==========================Выпадающее окно при скролле==================================

$(document).ready(function () {
  var $element = $('.catalog__page-rate');
  let counter = 0;
  if ($('.catalog__page-rate').length > 0) {
    $(window).scroll(function () {
      var scroll = $(window).scrollTop() + $(window).height();

      //Если скролл до конца елемента
      var offset = $element.offset().top + $element.height();

      //Если скролл до начала елемента
      // var offset = $element.offset().top

      if (scroll > offset && counter == 0) {
        $('.pop-up__catalog').fadeIn(500);
        counter = 1;
      }
    });
  }
  $('.but,.content-popup__button').click(function () {
    $('.pop-up__catalog ').slideUp();
  });
});

// Выбе­рем кнопку и форму
const $button = document.querySelector('.content-popup__button');
const $catalog = document.querySelector('.page-catalog__cards');

// При клике на кнопку
$button.addEventListener('click', e => {
  // Про­кру­тим стра­ницу к форме 
  $catalog.scrollIntoView({
    block: 'start', // к бли­жай­шей гра­нице экрана
    behavior: 'smooth', // и плавно 
  });
});

$(document).ready(function () {
  var $element = $('.popular-product__items');
  let counter = 0;
  if ($('.popular-product__items').length > 0) {
    $(window).scroll(function () {
      var scroll = $(window).scrollTop() + $(window).height();

      //Если скролл до конца елемента
      var offset = $element.offset().top + $element.height();

      //Если скролл до начала елемента
      // var offset = $element.offset().top

      if (scroll > offset && counter == 0) {
        $('.pop-up__page-product').fadeIn(500);
        counter = 1;
      }
    });
  }
  $('.but,.content-popup__button').click(function () {
    $('.pop-up__page-product').slideUp();
  });
});

// ==================Navigations_users_account==================================================

jQuery(document).ready(function ($) {

  var tabItems = $('.fake-for-navigations a'),
    tabContentWrapper = $('.data-users__content');

  tabItems.on('click', function (event) {
    event.preventDefault();
    var selectedItem = $(this);
    if (!selectedItem.hasClass('_active')) {
      var selectedTab = selectedItem.data('content'),
        selectedContent = tabContentWrapper.find('li[data-content="' + selectedTab + '"]'),
        slectedContentHeight = selectedContent.innerHeight();

      tabItems.removeClass('_active');
      selectedItem.addClass('_active');
      selectedContent.addClass('_active').siblings('li').removeClass('_active');
      tabContentWrapper.animate({
        'min-height': slectedContentHeight
      }, 200);
    }
  });

  var tabItems2 = $('.data-users__nav-list li'),
    tabContentWrapper2 = $('.data-users__content');

  tabItems2.on('click', function (event) {
    event.preventDefault();
    var selectedItem2 = $(this);
    if (!selectedItem2.hasClass('_active')) {
      var selectedTab2 = selectedItem2.data('content'),
        selectedContent2 = tabContentWrapper2.find('li[data-content="' + selectedTab2 + '"]'),
        slectedContentHeight2 = selectedContent2.innerHeight();

      tabItems2.removeClass('_active');
      selectedItem2.addClass('_active');
      selectedContent2.addClass('_active').siblings('li').removeClass('_active');
      tabContentWrapper2.animate({
        'min-height': slectedContentHeight
      }, 200);
    }
  });


  //hide the .cd-tabs::after element when tabbed navigation has scrolled to the end (mobile version)
  // checkScrolling($('.cd-tabs nav'));
  // $(window).on('resize', function () {
  //   checkScrolling($('.cd-tabs nav'));
  //   tabContentWrapper.css('height', 'auto');
  // });
  // $('.cd-tabs nav').on('scroll', function () {
  //   checkScrolling($(this));
  // });

  // function checkScrolling(tabs) {
  //   var totalTabWidth = parseInt(tabs.children('.cd-tabs-navigation').width()),
  //     tabsViewport = parseInt(tabs.width());
  //   if (tabs.scrollLeft() >= totalTabWidth - tabsViewport) {
  //     tabs.parent('.cd-tabs').addClass('is-ended');
  //   } else {
  //     tabs.parent('.cd-tabs').removeClass('is-ended');
  //   }
  // }
});

// ===========================================================================================================


// ========================Load More======================================================================
$(document).ready(function () {
  $(".orders-user__info").slice(0, 5).addClass('_active');
  $(".orders-user__button a").on("click", function (e) {
    e.preventDefault();
    $(".orders-user__info:hidden").slice(0, 5).addClass('_active');
    if ($(".orders-user__info:hidden").length == 0) {
      $(".orders-user__button ").hide();
    }
  });

})
$(document).ready(function () {
  $(".payment-info").slice(0, 5).addClass('_active');
  $(".payment-info__button a").on("click", function (e) {
    e.preventDefault();
    $(".payment-info:hidden").slice(0, 5).addClass('_active');
    if ($(".payment-info:hidden").length == 0) {
      $(".payment-info__button ").hide();
    }
  });

})
$(document).ready(function () {
  $(".blog-page__post").slice(0, 7).addClass('_active');
  $(".blog-content__button a").on("click", function (e) {
    e.preventDefault();
    $(".blog-page__post:hidden").slice(0, 7).addClass('_active');
    if ($(".blog-page__post:hidden").length == 0) {
      $(".blog-content__button ").hide();
    }
  });
})
// ===========================================================================================================

if ($(window).width() > 992) {

  $('.actions-header').mouseover(function () {
    $(this).addClass('_active');
  });
  $('.actions-header').mouseleave(function () {
    $(this).removeClass('_active');
  });
}

// ===============================================================================================================================================================

$(document).ready(function () {
  $('.quantity-prepend').click(function () {
    var $input = $(this).parent().find('#quantity');
    var count = parseInt($input.val()) - 100;
    count = count < 100 ? 100 : count;
    $input.val(count);
    $input.change();
    return false;
  });
  $('.quantity-append').click(function () {
    var $input = $(this).parent().find('#quantity');
    $input.val(parseInt($input.val()) + 100);
    $input.change();
    return false;
  });
});

// ===============SELECT=======================================================================================================================================

$(".default-option").click(function () {
  $(".selected-list,.label-sorting").addClass("_active");
})

$('.selected-list li').click(function () {
  $('.selected-list li').removeClass('_active');
  $(this).addClass('_active');
});


$(".selected-list li").click(function () {
  var currentele = $(this).html();
  $(".default-option li").html(currentele);
  $(".selected-list, .label-sorting").removeClass("_active");
});

$(document).on('click', function (e) {
  var select = $('.label-sorting');
  var selectList = $('.selected-list')
  if (select !== e.target && !select.has(e.target).length) {
    select.removeClass('_active');
    selectList.removeClass('_active');
  }
});

// =========================================================================================================================================================================
$('.footer-comment__like').click(function () {
  $(this).toggleClass('_active');
});