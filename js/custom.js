$(function() {
	
	$('.category__filter-open-btn').click(function(){
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$('.category__filter .filter').hide();
		}
		else {
			$(this).addClass('active');
			$('.category__filter .filter').show();
		}
    });
	
	$("[data-fancybox]").fancybox({
		closeClickOutside : true
	});
	
	$('.filter__hidden_open').click(function(event) {
		$('.filter__select.filter-field.hidden').show();
		$('.filter__hidden_close').show();
		$('.filter__hidden_open').hide();
	});
	
	$('.filter__hidden_close').click(function(event) {
		$('.filter__select.filter-field.hidden').hide();
		$('.filter__hidden_open').show();
		$('.filter__hidden_close').hide();
	});
	
	
	
	$('.schema-question').css('display', 'none');
	
	$('.que').click(function(event) {
		event.stopPropagation();
		$(this).find('.que-content').toggleClass('active');
	});
	$('body').click( () => {
		$('.que-content').removeClass('active');
	});
	
	$('.mi-quest').click(function(event) {
		event.stopPropagation();
		$(this).find('.mi-hidden').toggleClass('active');
	});
	$('body').click( () => {
		$('.mi-hidden').removeClass('active');
	});

	$('.search__result').hide();
	$('form#search-form').submit(function(e) {
		var $form = $(this);
		$.ajax({
			type: $form.attr('method'),
			url: "/ajax/searchform.php",
			data: $form.serialize(),
			success: function(data){
				$('.search__result').show();
				$('#search-result').html(data);
			}
		});
		//отмена действия по умолчанию для кнопки submit
		e.preventDefault();
	});
	
	$('form#mobile-search-form').submit(function(e) {
		var $form = $(this);
		$.ajax({
			type: $form.attr('method'),
			url: "/ajax/searchform-mobile.php",
			data: $form.serialize(),
			success: function(data){
				$('.search__result').show();
				$('#mobile-search-result').html(data);
			}
		});
		//отмена действия по умолчанию для кнопки submit
		e.preventDefault();
	});
	
	setInterval(function() {
		$('div.disabled').parent().hide();
		if($('.modal--sm input[type=checkbox]').hasClass("error")) {
			$('.error-form').show();
		}
		else {
			$('.error-form').hide();
		}
		if($('.feedback-form__checkbox input[type=checkbox]').hasClass("error")) {
			$('.error-form-page').show();
		}
		else {
			$('.error-form-page').hide();
		}
	},250);
	
	// $(document).mouseup(function (e){
	// 	$('.form-select__list').hide();
	// 	$('.form-select__input').removeClass("open")
	// });	
	
	$('a[href="#js-modal-popup"]').on('click', function() {
		var title = $('a[href="#js-modal-popup"] span').text();
		$('#js-modal-popup .modal__title').html(title);
		$('#js-modal-popup input[name=FORM_NAME]').val(title);
	});
	
	$('.category__btns_hidden').on('click', function() {
		$('#subcategory-filter').show();
		$('.category__btns_hidden').hide();
	});
	
	$('.category__btns_hidden_10').on('click', function() {
		$('.stock.subcategory .stock__item').show();
		$('.category__btns_hidden_10').hide();
	});
	
	/* $('.manuf__link.country').click(function() {
		var tab = $(this).data('tab');
		alert(tab);
	}); */
});

function setdetailpage(page) {
	$('#form-click input[name="PAGE"]').val(page);
}

function addbasketpop(id) {
	$('#modalcard-content').html('<div class="loading"><img src="/img/loading.gif"></div>');
	
	$.ajax({
	url: "/ajax/addbasket.php",
	type: "GET",
	dataType: "html",
	data: "ID="+id+"&MODE=popup",
	success: function(data){
			$('#modalcard-content').html(data);
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
				$('#voucher-status').html(''+data+'');
			}
		}
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
			alert(data);
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

function FilterOnSelectionChange(select) {
	/* var selectedOption = select.options[select.selectedIndex];
	var url = $('#filter_url').val();
	var string = $('#filter_string').val();
	
	$.ajax({
	url: url,
	type: "GET",
	dataType: "html",
	data: "ajax=y&"+selectedOption.value+"=Y"+string,
	success: function(data){
			var array = JSON.parse(data);
			alert (array);
			console.log(array);
		}
	}); */
}