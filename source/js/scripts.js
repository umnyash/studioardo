function nav_scroll_event() {
	$(window).scrollTop() > 114 ? $(".header").addClass("scroll fixed") : $(".header").removeClass("scroll fixed")
}

var lastScrollTop = 0;
$(window).scroll(function(event){
	var st = $(this).scrollTop();
	if (st < lastScrollTop && $(window).scrollTop() > 150){
		$(".go-top").addClass("active")
	} else {
		$(".go-top").removeClass("active")
	}
	lastScrollTop = st;
	if($(window).scrollTop() + $(window).height() >= $(document).height() - 10) {
		$(".go-top").addClass("active")
	}
});

$(document).ready(function () {
	$('.mobile-filter-open').click(function(){
		$("html, body").animate({ scrollTop: "0" });
	});

	$('.go-top').click(function() {
		$("html, body").animate({ scrollTop: "0" });
	})

	$('.search__form form input').on('focus', function() {
		$(this).closest('.search__form').addClass('focus')
	})

	$('.search__form form input').on('blur', function() {
		$(this).closest('.search__form').removeClass('focus')
	})

	$('#cheaper-screenshot_1').on('change', function(e) {
		$('#cheaper-screenshot_1').prev().text(e.currentTarget.files[0].name);
	});

	$('#cheaper-screenshot_2').on('change', function(e) {
		$('#cheaper-screenshot_2').prev().text(e.currentTarget.files[0].name);
	});

	$('#cheaper-screenshot_3').on('change', function(e) {
		$('#cheaper-screenshot_3').prev().text(e.currentTarget.files[0].name);
	});

	$('.form-input-options-show').on('click', function(e) {
		$('.form-input-options').toggleClass('active');
	});

	$('.form-input-option').each(function() {
		$(this).on('click', function(evt) {
			$('.form-input-options-show').html(evt.currentTarget.textContent);
			$('.form-input-options').toggleClass('active');
		})
	})

	//var MoscowText = ['Москва', '<span class="call_phone_495_3">8 (495) 023 7775</span>', '84996889385', 'calltouch_phone_495_1'];
	//var SaintPetersburgText = ['Санкт-Петербург', '<span class="call_phone_812_3">8 (812) 445 84 37</span>', '88124458437', 'calltouch_phone_812_1'];

	$('.locations .btn-location').on('click', function(e){
		e.preventDefault();
		let city = $(this).data('type');
		$('.locations .btn-location').removeClass('btn-location--selected');
		$(this).addClass('btn-location--selected');
		$.cookie('SELECT_SITY', city, { expires: 365, path: '/' });

		$('.city-all').hide();
		$('.city-'+city).show();

		/* if (city == "SaintPetersburg"){
			$('.cityText span').html(SaintPetersburgText[0]);
			$('.phoneText span').html(SaintPetersburgText[1]);
			$('.phoneText').attr("href", "tel:"+SaintPetersburgText[2]);
			$('#calltouch_phone').removeClass();
			$('#calltouch_phone').addClass(SaintPetersburgText[3]);
		} else{
			$('.cityText span').html(MoscowText[0]);
			$('.phoneText span').html(MoscowText[1]);
			$('.phoneText').attr("href", "tel:"+MoscowText[2]);
			$('#calltouch_phone').removeClass();
			$('#calltouch_phone').addClass(MoscowText[3]);
		} */
		CloseWindow();
	});

	$("#c-filter__price-fake").click(function (e) {
		$('#c-filter__price-fake').hide();
		$('#c-filter__price').show();
		$("#c-filter__price input").prop('disabled', false);
	});
});

function addbasketpop(id) {
	$('#modalcard-content').html('<div class="loading"><img src="/img/loading.gif"></div>');

	$.ajax({
		url: "/ajax/addbasket.php",
		type: "GET",
		dataType: "html",
		data: "ID="+id+"&MODE=popup",
		success: function(data){
			$('#modalcard-content').html(data);
			sendAnaliticsAddCart(id);
		}
	});
}

function viewnotif(id) {
	$.ajax({
		url: "/ajax/viewnotif.php",
		type: "GET",
		dataType: "html",
		data: "ID="+id+"&MODE=popup",
		success: function(data){}
	});
}

function addtobasket(id) {
	var count = $('#count_'+id).val();

	$.ajax({
		url: "/ajax/addbasket.php",
		type: "GET",
		dataType: "html",
		data: "ID="+id+"&MODE=add&COUNT="+count,
		success: function(data){
			$('#modalcard-content').html(data);
			sendAnaliticsAddCart(id);
		}
	});
}

function addbasketdetail(id) {

  $('#modalcard-contentdetail').html('<div class="loading"><img src="/img/loading.gif"></div>');
  var count = $('#count_'+id).val();
  $.ajax({
    url: "/ajax/addbasket.php",
    type: "GET",
    dataType: "html",
    data: "ID="+id+"&MODE=add&COUNT="+count,
    success: function(data){
      $('#modalcard-contentdetail').html(data);
      sendAnaliticsAddCart(id);
    }
  });
}

function sendAnaliticsAddCart(id){
  var count = $('#count_'+id).val();
  $.ajax({
    url: "/ajax/addbasket.php",
    type: "GET",
    dataType: "json",
    data: "ID="+id+"&MODE=sendAnalitic&COUNT="+count,
    success: function(data){
      window.dataLayer.push({ ecommerce: null });
      window.dataLayer.push({
        'event': 'ecommerceAdd',
        'ecommerce': {
          'currencyCode': 'RUB',
          'add': {
            'products': [{
              'name': data.name,
              'id': data.id,
              'price': data.price,
              'brand': data.brand,
              'category': data.category,
              'quantity': data.quantity
            }]
          }
        }
      });
      const eventParams = {
        'products' : [{'id':data.id, 'price':data.price}],
        'total_price' : data.price*data.quantity
      };
      VK.Retargeting.ProductEvent(256385, 'add_to_cart', eventParams);
      console.log(eventParams);
    }
  });
}
function sendAnaliticsCheckoutOrder(){
  $.ajax({
    url: "/ajax/addbasket.php",
    type: "GET",
    dataType: "json",
    data: "MODE=loadCart",
    success: function(data){
      var products = [];
      $.each(data.product,function(index,value) {
        products.push(value);
      });
      var action = {
        'event': 'ecommerceCheckout',
        'ecommerce': {
          'checkout' : {
            'actionField' : {
              'step' : 1 // НОМЕР ШАГА
            },
            'products': products
          }
        }
      }
      window.dataLayer.push({ ecommerce: null });
      window.dataLayer.push(action);

      var productListVK = [];
      $.each(data.productListVK,function(index,value) {
        productListVK.push(value);
      });
      const eventParams = {
        'products' : productListVK,
      };
      VK.Retargeting.ProductEvent(256385, 'init_checkout', eventParams);
      console.log(eventParams);
    }
  });
}
function sendAnaliticsNewOrderVK(id){
  $.ajax({
    url: "/ajax/addbasket.php",
    type: "GET",
    dataType: "json",
    data: "ORDER_ID="+id+"&MODE=loadOrder",
    success: function(data){
      var productListVK = [];
      $.each(data.productListVK,function(index,value) {
        productListVK.push(value);
      });
      const eventParams = {
        'products' : productListVK,
      };
      VK.Retargeting.ProductEvent(256385, 'purchase', eventParams);
      console.log(eventParams);
    }
  });
}
function sendAnaliticsNewOrder(id){
  $.ajax({
    url: "/ajax/addbasket.php",
    type: "GET",
    dataType: "json",
    data: "ORDER_ID="+id+"&MODE=loadOrder",
    success: function(data){
      var products = [];
      var productList = [];
      $.each(data.product,function(index,value) {
        products.push(value);
      });
      $.each(data.productList,function(index,value) {
        productList.push(value);
      });
      var action = {
        'event': 'ecommercePurchase',
        'ecommerce': {
          'purchase':{
            'actionField' : {
              'id' : data.actionField.id, // Идентификатор транзакции обязательное
              'revenue' : data.actionField.revenue, // сумма заказа
              'shipping' : data.actionField.shipping, //доставка
              'affiliation' : data.actionField.affiliation, // название магазина
            },
            'products': products
          }
        }
      }
      window.dataLayer.push({ ecommerce: null });
      window.dataLayer.push(action);
      var actions = {
        'event': 'purchase',
        'transactionId': data.actionField.id,
        'transactionAffiliation': data.actionField.affiliation,
        'transactionTotal': data.actionField.revenue,
        'transactionShipping': data.actionField.shipping,
        'transactionProducts': productList
      }
      window.dataLayer.push(actions);
      console.log(actions);
    }
  });
}

function setvoucher() {
  var voucher = $('#voucher').val();

  $.ajax({
    url: "/ajax/voucher.php",
    type: "GET",
    dataType: "html",
    data: "STATUS=ADD&VOUCHER="+voucher,
    success: function(data){
      if (data == 1) {
        window.location.replace('/cart/');
      }
      else {
        $('#voucher-status').html(data);
      }
    }
  });
}

function setQuantityBasket(id, сnt, type, vector) {

  var count = $('#QUANTITY_INPUT_'+id).val();
  if (type != 'zero') {
    if (type == 'up') {
      count++;
    }
    else {
      count--;
    }

    if (count == 0) count = 1;
    $('#QUANTITY_INPUT_'+id).val(count);
  }

  var price = $("#hid_priceitem_"+id).val();
  //var price = $("#priceitem_"+id).text();
  var summprice = $("#summprice").text();

  $.ajax({
    url: "/ajax/addbasket.php",
    type: "GET",
    dataType: "html",
    data: "ID="+id+"&COUNT="+count+"&MODE=change&PRICE="+price+"&SUMM="+summprice,
    success: function(data){
      $('#sum_'+id).html(data);
      $.ajax({
        url: "/ajax/addbasket.php",
        type: "GET",
        dataType: "html",
        data: "MODE=summ",
        success: function(data){
          $('#summprice').html(data);
        }
      });
    }
  });
}

function CloseWindow() {
  $('.js-modal').fadeOut(100);
  $('#js-overlay').remove();
  $("body").removeClass("opened-modal")
}

function FilterOnSelectionChange(e) {}
jQuery.event.special.touchstart = {
  setup: function (e, t, s) {
    this.addEventListener("touchstart", s, {
      passive: !t.includes("noPreventDefault")
    })
  }
}, jQuery.event.special.touchmove = {
  setup: function (e, t, s) {
    this.addEventListener("touchmove", s, {
      passive: !t.includes("noPreventDefault")
    })
  }
}, jQuery.event.special.wheel = {
  setup: function (e, t, s) {
    this.addEventListener("wheel", s, {
      passive: !0
    })
  }
}, jQuery.event.special.mousewheel = {
  setup: function (e, t, s) {
    this.addEventListener("mousewheel", s, {
      passive: !0
    })
  }
}, $(document).ready(function () {
  if ($(".header__fs .menu > li").mouseleave(function () {
    document.body.clientWidth < 992 || ($(this).removeClass("current"), $(this).find(".brands-menu").stop().slideUp(200))
  }), $(".header__fs .menu > li").mouseenter(function () {
    document.body.clientWidth < 992 || ($(this).addClass("current"), $(this).find(".brands-menu").stop().slideDown(350))
  }), nav_scroll_event(), $(window).scroll(function () {
    nav_scroll_event()
  }), $(".raty").length && $(".raty").raty(), $(".top-basket").mouseenter(function () {
    document.body.clientWidth < 992 || $(".cart").stop().fadeIn(150)
  }), $(".top-basket").mouseleave(function () {
    $(".cart").stop().fadeOut(150)
  }), $(".cart__del").click(function () {
    $(this).parents(".cart__item").remove()
  }), $("[data-fancybox]").length && $("[data-fancybox]").fancybox({
    closeClickOutside: !0
  }), $(".menu").length && $(".open-mobile-nav").click(function (e) {
    $(this).parents("li").find(".brands-menu").stop().slideToggle(150), $(this).parents("li").toggleClass("sl-showed-list"), e.preventDefault()
  }), $(".search__btn").click(function (e) {
    e.preventDefault(), $(".search__modal").fadeIn(), setTimeout(function() {$("#mobile-search-form input").focus()}, 10)
  }), $(".search__close").click(function (e) {
    e.preventDefault(), $(".search__modal").fadeOut()
  }), $(".search__nav a").click(function (e) {
    e.preventDefault();
    let t = $(this).attr("href");
    $(this).addClass("active").parent("li").siblings("li").find("a").removeClass("active"), "#all" === t ? $(".search__section").fadeIn() : $(t).fadeIn().siblings(".search__section").hide()
  }), $(".s-popular .swiper-container").length) {
    new Swiper(".s-popular .swiper-container", {
      slidesPerView: "auto",
      spaceBetween: 0,
      watchOverflow: true,
      threshould: 3,
      navigation: {
        nextEl: ".s-popular .swiper-button-next",
        prevEl: ".s-popular .swiper-button-prev"
      }
    })
  }
  if ($(".s-seen .swiper-container").length) {
    new Swiper(".s-seen .swiper-container", {
      slidesPerView: "auto",
      spaceBetween: 0,
      watchOverflow: true,
      threshould: 3,
      navigation: {
        nextEl: ".s-popular .swiper-button-next",
        prevEl: ".s-popular .swiper-button-prev"
      }
    })
  }
  if ($(".employers-list .swiper-container").length) {
    new Swiper(".employers-list .swiper-container", {
      slidesPerView: "auto",
      spaceBetween: 10,
      watchOverflow: true,
      threshould: 3,
      navigation: {
        nextEl: ".employers-list .swiper-button-next",
        prevEl: ".employers-list .swiper-button-prev"
      }
    })
  }

  function closeMenu(e) {
    if (!e.target.closest('.header__fs2.active') && !e.target.closest('.header__openbtn')) {
      $(".header__openbtn").removeClass("active");
      $(".header__fs2").removeClass("active");
      $("body").removeClass("menu-opened");
      document.body.removeEventListener('click', closeMenu);
    }
  }

  $(".header__openbtn").length && $(".header__openbtn").on('click',function (e) {
    e.preventDefault();
    if($(".header__fs2").hasClass('loadBurger')){
      $(".header__fs2.loadBurger").load( "/include/burger-menu.php", function( response, status, xhr ) {
        openBurger();
        $(".header__fs2").removeClass('loadBurger');
        $(".phone").length && $(".phone").mask("+7 (999) 999-99-99");
        $(".js-modal-show").on("click", function () {
          var e = $(this).attr("href");
          $(e).fadeIn(500), $("body").append('<div class="overlay" id="js-overlay"></div>');
          $("body").addClass("opened-modal");
        });
        $(".js-modal-close").on("click", function (e) {
          e.preventDefault();
          console.log('1');
          $(".js-modal").fadeOut(100);
          $("#js-overlay").remove();
          $("body").removeClass("opened-modal");
        });
        $("body").on("click", "#js-overlay", function () {
          $(".js-modal").fadeOut(100);
          $("#js-overlay").remove();
          $("body").removeClass("opened-modal");
        });
      });

    }else{
      openBurger();
    }
  });
  function openBurger(){
    if ($(".header__fs2").hasClass('active')) {
      $(".header__openbtn").removeClass("active");
      $(".header__fs2").removeClass("active");
      $("body").removeClass("menu-opened");
      document.body.removeEventListener('click', closeMenu);
    } else {
      $(".header__openbtn").addClass("active");
      $(".header__fs2").addClass("active");
      $("body").addClass("menu-opened");
      document.body.addEventListener('click', closeMenu, {capture:true});
    }
  }
  $(".form-select__input").click(function (e) {
      if ($(this).hasClass("open")) {
        $(this).removeClass("open");
        $(this).siblings(".form-select__list").slideUp();
      } else {
        $(".form-select__input").each(function() {
            $(this).removeClass("open");
            $(this).siblings(".form-select__list").slideUp();
        })
        $(this).addClass("open");
        $(this).siblings(".form-select__list").slideDown();
      }

      s($(".c-filter"));


  }), $(".brand-gallery__carousel").length && $(".brand-gallery__carousel").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: !1,
    prevArrow: '<button class="prev" type="button"><svg><use href="/img/icons/sprite.svg#arr-prev"></svg></button>',
    nextArrow: '<button class="next" type="button"><svg><use href="/img/icons/sprite.svg#arr-next"></svg></button>',
    responsive: [{
      breakpoint: 1400,
      settings: {
        slidesToShow: 2
      }
    }, {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        prevArrow: !1,
        nextArrow: !1
      }
    }, {
      breakpoint: 768,
      settings: {
        slidesToShow: 1
      }
    }]
  }), $(".quick-links__carousel").length && $(".quick-links__carousel").slick({
    infinite: !0,
    slidesToShow: 4,
    slidesToScroll: 1,
    rows: 2,
    dots: !1,
    prevArrow: '<button class="prev" type="button"><svg><use href="img/icons/sprite.svg#arr-prev"></svg></button>',
    nextArrow: '<button class="next" type="button"><svg><use href="img/icons/sprite.svg#arr-next"></svg></button>',
    responsive: [{
      breakpoint: 992,
      settings: {
        slidesToShow: 3
      }
    }, {
      breakpoint: 668,
      settings: {
        slidesToShow: 2
      }
    }, {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        rows: 1
      }
    }]
  });

  $(".top__open-menu-btn").length && $(".top__open-menu-btn").click(function (e) {
    $(this).toggleClass("active"), $(".header__fs2").toggleClass("active"), $("body").toggleClass("menu-opened"), e.preventDefault()
  })

  $(".m-news2__row").length && $(".m-news2__row").slick({
    infinite: !0,
    slidesToShow: 2,
    slidesToScroll: 1,
    rows: 1,
    arrows: false,
    dots: !1,
    responsive: [{
      breakpoint: 576,
      settings: {
        slidesToShow: 1
      }
    }]
  });

  $(".m-news__row").length && $(".m-news__row").slick({
    infinite: !0,
    slidesToShow: 2,
    slidesToScroll: 1,
    rows: 1,
    arrows: false,
    dots: !1,
    responsive: [{
      breakpoint: 576,
      settings: {
        slidesToShow: 1
      }
    }]
  });


  $(".mobile-gallery__row").length && $(".mobile-gallery__row").slick({
    infinite: !0,
    slidesToShow: 2,
    slidesToScroll: 1,
    rows: 1,
    arrows: false,
    dots: !1,
    responsive: [{
      breakpoint: 576,
      settings: {
        slidesToShow: 1
      }
    }]
  });

  initSliders();
  var sliderIsLive;
  function initSliders() {
    if (window.innerWidth >= 668) {
      $('.m-news2__row').slick('unslick');
      $('.m-news__row').slick('unslick');
      $('.mobile-gallery__row').slick('unslick');
      sliderIsLive = false;
    }
    else {
      if (sliderIsLive) {
        $('.m-news2__row').slick();
        $('.m-news__row').slick();
        $('.mobile-gallery__row').slick();
        sliderIsLive = true;
      }
    }
  }

  window.addEventListener("resize", initSliders);

  $(".payment__title").click(function (e) {
    if (window.innerWidth <= 667) {
      $('.payment__images').slideToggle(400);
    }
  });

  $(".c-filter__collapse").click(function () {
    $('.c-filter__collapse').toggleClass("active");
    $('.c-filter__fieldset--sec').toggleClass("active");
  });

  $(".reviews-open").click(function (e) {
    if (window.innerWidth <= 667) {
      $('.reviews').slideDown(400);
      $('.reviews-open').slideUp(400);
    }
  });

  $(".search__close").click(function (e) {
    $(this).closest('.search__result').slideUp();
  });

  $(".collapse-btn").click(function (e) {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active')
      $(this).text('Развернуть ');
      $(this).prev('.collapsed-text').slideUp();
      $(this).prev('.product__text').css('max-height', '68px');
      $(this).prev('.collection__text').css('max-height', '68px');
    } else {
      $(this).addClass('active')
      $(this).text('Свернуть ');
      $(this).prev('.collapsed-text').slideDown(300);
      $(this).prev('.product__text').css('max-height', '800px');
      $(this).prev('.collection__text').css('max-height', '800px');
    }
  });

  $(".info-coll__btn").click(function (e) {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active')
      $(this).text('Развернуть ');
      $(this).parent().find('.info-coll__item').each(function(i) {
        if (i > 2) {
          $(this).slideUp();
        }
      });
      $(this).parent().find('.info__item').each(function(i) {
        if (i > 2) {
          $(this).slideUp();
        }
      });
    } else {
      $(this).addClass('active')
      $(this).text('Свернуть ');
      $(this).parent().find('.info-coll__item').each(function(i) {
        if (i > 2) {
          $(this).slideDown();
        }
      });
      $(this).parent().find('.info__item').each(function(i) {
        if (i > 2) {
          $(this).slideDown();
        }
      });
    }
  });

  var e = "",
      t = !1;

  function s(t) {
	t.find('[data-open-id="' + e + '"').removeClass("open"), t.find('[data-open-id="' + e + '"').parents(".filter__select").find(".form-select__list").hide(), e = ""
  }
  $("body").on("click", ".c-filter, .form-select__list", function () {
	if (t) t = !1;
	else {
		if ("form-select__list" !== $(this).attr("class")) return void 0 !== $(this).find(".open") && (0 === e.length ? (e = (new Date).getTime(), $(this).find(".open").attr("data-open-id", e), !1) : void s($(this)));
		t = !0
	}
  });

	$(".form-select__list li input").change(function (e) {
		let t = $(this).parents("li").attr("data-target"),
		s = $(this).parents(".form-select");
		if ($(this).prop("checked")) {
			let e = s.find(".form-select__input").attr("data-items"),
			i = [];
			e && (i = e.split(",")), i.push(t), s.find(".form-select__input").attr("data-items", i.join(","));
			let n = [];
			i.slice(0, 1).forEach(function (e) {
				let t = s.find('.form-select__list li[data-target="' + e + '"]');
				n.push(t.find(".form-checkbox label").text())
			});
			let a = n.join(", ");
			i.length > 1 && (a += " + " + (i.length - 1)), s.find(".form-select__input").children(".selected-items").remove(), s.find(".form-select__input").append('<span class="selected-items">' + a + '</span>');
			let l = s.find(".form-select__input").find(".select__title");
			": " !== l.text().substring(l.text().length - 2) && l.text(l.text() + ": ");
			s.find(".form-select__input span.select__title").width() + s.find(".form-select__input span.selected-items").width() >= 10 && s.find(".form-select__input .selected-items").html("+ " + i.length)
		} else {
			let e = s.find(".form-select__input").attr("data-items"),
			i = [];
			e && (i = e.split(",")), i = i.filter(e => e !== t), s.find(".form-select__input").attr("data-items", i.join(","));
			let n = [];
			i.slice(0, 1).forEach(function (e) {
				let t = s.find('.form-select__list li[data-target="' + e + '"]');
				n.push(t.find(".form-checkbox label").text())
			});
			let a = n.join(", ");
			if (i.length > 1 && (a += " + " + (i.length - 1)), s.find(".form-select__input").children(".selected-items").remove(), s.find(".form-select__input").append('<span class="selected-items">' + a + "</span>"), 0 === i.length) {
				let e = s.find(".form-select__input").find(".select__title");
				let res = e.text().substr(-2, 2);
				if (res == ": ") {
					e.text(e.text().substring(0, e.text().length - 2));
				}
			}
			s.find(".form-select__input span.select__title").width() + s.find(".form-select__input span.selected-items").width() >= 10 && s.find(".form-select__input .selected-items").html("+ " + i.length)
		}
	});

	$(".form-select__input").on("click", "a.del", function (e) {
		e.preventDefault();
		let t = $(this).parents(".form-select__input"),
			s = $(this).parents(".select-item").attr("data-target");
		$(this).parents(".select-item").remove(), $("#" + s).click(), !$(t).children(".select-item").length > 0 && $(t).find(".select__title").removeClass("hidden"), e.stopPropagation()
	});

  $(".banner__carousel").slick({
    dots: !0,
    customPaging: function (e, t) {
      return '<a class="banner__toggle"><p class="banner__num">' + (t + 1) + '</p><p class="banner__name">' + $(e.$slides[t]).attr("title") + "</p></a>"
    },
    infinite: !0,
    speed: 600,
    autoplaySpeed: 6000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: !0,
    autoplay: !0,
    prevArrow: '<button class="prev" type="button"><svg><use href="/img/icons/sprite.svg#arr-prev"></svg></button>',
    nextArrow: '<button class="next" type="button"><svg><use href="/img/icons/sprite.svg#arr-next"></svg></button>',
    responsive: [{
      breakpoint: 992,
      settings: {
        customPaging: function (e, t) {
          return "<button></button>"
        }}
    }, {
      breakpoint: 667,
      settings: {
        dots: false
      }
    }
    ]
  }), $(".manuf__link").click(function (e) {
    if(!$(this).hasClass("noTab")){
      e.preventDefault();
      let t = $(this).attr("href");
      $(this).addClass("active").siblings(".manuf__link").removeClass("active");
      $(t).fadeIn().addClass("active").siblings(".manuf__tab").hide().removeClass("active");
    }
  }), $(".sort__select-show").click(function () {
    $(this).toggleClass("open"), $(this).siblings(".sort__select-list").slideToggle()
  }), $(".news-archive__year").click(function (e) {
    e.preventDefault(), $(this).toggleClass("open").siblings(".news-archive__list").slideToggle()
  }), $(".sort__period a").click(function (e) {
    e.preventDefault(), $(".news-archive").slideToggle()
  }), $(".location__nav a").click(function (e) {
    e.preventDefault();
    let t = $(this).attr("href");
    $(this).parents("li").addClass("active").siblings("li").removeClass("active"), $(t).fadeIn().addClass("active").siblings(".location__tab").hide().removeClass("active")
  }), $(".location-coop__nav a").click(function (e) {
    e.preventDefault();
    let t = $(this).attr("href");
    $(this).parents("li").addClass("active").siblings("li").removeClass("active"), $(t).fadeIn().addClass("active").siblings(".location-coop__tab").hide().removeClass("active")
  }), $(".phone").length && $(".phone").mask("+7 (999) 999-99-99"), $(".kpp").length && $(".kpp").mask("999999999"), $(".bik").length && $(".bik").mask("999999999"), $(".okpo").length && $(".okpo").mask("999999999"), $(".innfiz").length && $(".innfiz").mask("999999999999"), $(".innyur").length && $(".innyur").mask("9999999999"), $(".rz").length && $(".rz").mask("99999999999999999999"), $(".js-modal-show").on("click", function () {
    var e = $(this).attr("href");
    $(e).fadeIn(500), $("body").append('<div class="overlay" id="js-overlay"></div>'), $("body").addClass("opened-modal")
  }), $(".js-modal-close").on("click", function (e) {
    e.preventDefault(), console.log('1'), $(".js-modal").fadeOut(100), $("#js-overlay").remove(), $("body").removeClass("opened-modal")
  }), $("body").on("click", "#js-overlay", function () {
    $(".js-modal").fadeOut(100), $("#js-overlay").remove(), $("body").removeClass("opened-modal")
  }), $(".minus").click(function () {
    let e = $(this).parent().find("input"),
        t = parseInt(e.val());
    return t = --t < 1 ? 1 : t, e.val(t), e.change(), !1
  }), $(".plus").click(function () {
    let e = $(this).parent().find("input"),
        t = parseInt(e.val());
    return t++, e.val(t), e.change(), !1
  }), $(".mobile-filter-open").click(function (e) {
    e.preventDefault(), $(".c-filter").addClass("open")
  }), $(document).click(function (e) {
    $(e.target).closest(".c-filter").length || $(e.target).closest(".mobile-filter-open").length || $(".c-filter").removeClass("open")
  }), $(".c-filter__close").click(function (e) {
    e.preventDefault(), $(".c-filter").removeClass("open")
  }), $(".modal-btns__sort").click(function (e) {
    e.preventDefault(), $(this).toggleClass("open"), $(".sort--catalog").slideToggle()
  }), $(".product-img__carousel").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: !1,
    arrows: !1,
    asNavFor: ".product-img__thumbs"
  }), $(".product-img__thumbs").slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    dots: !1,
    arrows: !1,
    focusOnSelect: !0,
    asNavFor: ".product-img__carousel",
    responsive: [{
      breakpoint: 576,
      settings: {
        slidesToShow: 4
      }
    }]
  }), $(".collection-img__carousel").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: !1,
    arrows: !1,
    asNavFor: ".collection-img__thumbs"
  }), $(".collection-img__thumbs").slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    dots: !1,
    arrows: !1,
    focusOnSelect: !0,
    asNavFor: ".collection-img__carousel"
  }), $(".basket__del").click(function (e) {
    e.preventDefault();
    let t = $(this).parent(".basket__item");
    t.slideUp(), setTimeout(function () {
      t.remove()
    }, 1e3)
  }), $(".notif__close").click(function (e) {
    e.preventDefault(), $(this).parents(".notif").fadeOut()
  }), $(".card__color").click(function (e) {
    e.preventDefault();
    let t = ".card__img img:nth-child(" + $(this).attr("data-target") + ")",
        s = $(this).parents(".card").find(t);
    $(this).addClass("active").siblings(".card__color").removeClass("active"), $(s).fadeIn().addClass("active").siblings("img").hide().removeClass("active")
  }), $(".card-collection__color").click(function (e) {
    e.preventDefault();
    let t = ".card-collection__img img:nth-child(" + $(this).attr("data-target") + ")",
        s = $(this).parents(".card-collection").find(t);
    $(this).addClass("active").siblings(".card-collection__color").removeClass("active"), $(s).fadeIn().addClass("active").siblings("img").hide().removeClass("active")
  }), $(".order__header").click(function () {
    $(this).toggleClass("open").siblings(".order__body").slideToggle()
  }), $("form").each(function () {
    $(this).validate()
  }), $(".radio-type").change(function () {
    let e = $(this).attr("data-target");
    $(e).fadeIn().addClass("active").siblings(".checkout__inputs--info").hide().removeClass("active")
  }), $(".filter__hidden_open").click(function (e) {
    $(".filter__select.filter-field.hidden").show(), $(".filter__hidden_close").show(), $(".filter__hidden_open").hide()
  }), $(".filter__hidden_close").click(function (e) {
    $(".filter__select.filter-field.hidden").hide(), $(".filter__hidden_open").show(), $(".filter__hidden_close").hide()
  }), $(".schema-question").css("display", "none"), $(".que").click(function (e) {
    e.stopPropagation(), $(this).find(".que-content").toggleClass("active")
  }), $("body").click(() => {
    $(".que-content").removeClass("active")
  }), $(".mi-quest").click(function (e) {
    e.stopPropagation(), $(".mi-hidden").removeClass("active"), $(this).find(".mi-hidden").toggleClass("active")

  }), $("body").click(() => {
    $(".mi-hidden").removeClass("active")
  }), $("form#search-form").submit(function (e) {
    var t = $(this);
    $.ajax({
      type: t.attr("method"),
      url: "/ajax/searchform.php",
      data: t.serialize(),
      success: function (e) {
        $("#search-result").html(e), $(".search__result").show()
      }
    }), e.preventDefault()
  }), $("form#mobile-search-form").submit(function (e) {
    var t = $(this);
    $.ajax({
      type: t.attr("method"),
      url: "/ajax/searchform-mobile.php",
      data: t.serialize(),
      success: function (e) {
        $("#mobile-search-result").html(e), $(".search__result").show()
      }
    }), e.preventDefault()
  }), setInterval(function () {
    $("div.disabled").parent().hide(), $(".modal--sm input[type=checkbox]").hasClass("error") ? $(".error-form").show() : $(".error-form").hide(), $(".feedback-form__checkbox input[type=checkbox]").hasClass("error") ? $(".error-form-page").show() : $(".error-form-page").hide()
  }, 250), $('a[href="#js-modal-popup"]').on("click", function () {
    var e = $('a[href="#js-modal-popup"] span').text();
    $("#js-modal-popup .modal__title").html(e), $("#js-modal-popup input[name=FORM_NAME]").val(e)
  })
});

const rangeInput = document.querySelectorAll(".range-input input"),
priceInput = document.querySelectorAll(".price-input input"),
range = document.querySelector(".slider .progress");
let priceGap = 1000;
priceInput.forEach(input =>{
    input.addEventListener("input", e =>{
        let minPrice = parseInt(priceInput[0].value),
        maxPrice = parseInt(priceInput[1].value);

        if((maxPrice - minPrice >= priceGap) && maxPrice <= rangeInput[1].max){
            if(e.target.className === "input-min"){
                rangeInput[0].value = minPrice;
                range.style.left = ((minPrice / rangeInput[0].max) * 100) + "%";
            }else{
                rangeInput[1].value = maxPrice;
                range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
            }
        }
    });
});
rangeInput.forEach(input =>{
    input.addEventListener("input", e =>{
        let minVal = parseInt(rangeInput[0].value),
        maxVal = parseInt(rangeInput[1].value);
        if((maxVal - minVal) < priceGap){
            if(e.target.className === "range-min"){
                rangeInput[0].value = maxVal - priceGap
            }else{
                rangeInput[1].value = minVal + priceGap;
            }
        }else{
            priceInput[0].value = minVal;
            priceInput[1].value = maxVal;
            range.style.left = ((minVal / rangeInput[0].max) * 100) + "%";
            range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
        }

		if(e.target.className === "range-min"){
			$('#arrFilter_P1_MIN').each(function() {
				smartFilter.keyup(this);
			});
		}
		else {
			$('#arrFilter_P1_MAX').each(function() {
				smartFilter.keyup(this);
			});
		}
    });
});

letVh()
window.addEventListener('resize', () => {
  // We execute the same script as before
  letVh()
});
function letVh(){
  // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

const catalog = document.querySelector('.catalog');
if (catalog) {
  const topbarWrapper = catalog.querySelector('.catalog__topbar');
  const wrap = document.querySelector('.wrap-hidden');

  window.addEventListener('scroll', () => {
    if (catalog.getBoundingClientRect().y <= 0) {
      topbarWrapper.classList.add('catalog__topbar--visible');
      wrap.classList.add('wrap--visible');
    } else {
      topbarWrapper.classList.remove('catalog__topbar--visible');
      wrap.classList.remove('wrap--visible');
    }
  });
}

const topbar = document.querySelector('.topbar');
if (topbar) {
    const topbarColumns = topbar.querySelectorAll('.topbar__column');
    let currentColumn = topbarColumns[0];
    const topbarButton = topbar.querySelector('.topbar__button');

    /* for (let column of topbarColumns) {
      column.querySelector('.topbar__column-heading').addEventListener('click', (evt) => {
        evt.preventDefault();

        if (column == currentColumn) {
          return;
        }

        currentColumn.classList.remove('topbar__column--current');
        column.classList.add('topbar__column--current');
        currentColumn = column;
      });
    } */

    topbarButton.addEventListener('click', () => {
        topbar.classList.toggle('topbar--open');
    });
}
