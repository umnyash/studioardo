const debounce=(e,t=500)=>{let o=null;return(...s)=>{clearTimeout(o),o=setTimeout((()=>e.apply(this,s)),t)}},popups=document.querySelectorAll(".popup"),changeEvent=new Event("change",{bubbles:!0}),Key=Object.freeze({ESCAPE:"Escape",ESC:"Esc",UP:"ArrowUp",RIGHT:"ArrowRight",DOWN:"ArrowDown",LEFT:"ArrowLeft",SPACE:"Space",ENTER:"Enter"});let isPopupCalculationMaterialWasOpened=!1;if(popups){const e=e=>e.key===Key.ESCAPE||e.key===Key.ESC;let t,o=document.body.clientWidth;const s=e=>{o=document.body.clientWidth,e.classList.add("popup--open"),t=e,document.body.classList.add("no-scroll"),document.addEventListener("keydown",l),document.body.clientWidth>o&&(document.body.style.paddingRight=document.body.clientWidth-o+"px")},r=(e,s)=>{o=document.body.clientWidth;const r=document.querySelector(".popup--calculation-material");r.querySelector("form").reset();const n=r.querySelector(".calculation-form .form__result"),i=r.querySelector('.calculation-form select[name="type"]'),a=r.querySelector('.calculation-form select[name="material"]'),c=r.querySelector('.calculation-form select[name="difficulty"]');n.classList.add("form__result--hidden"),i.value=e||"",i.dispatchEvent(changeEvent),a.value=s||"",c&&(c.value="",c.dispatchEvent(changeEvent)),r.classList.add("popup--open"),t=r,document.body.classList.add("no-scroll"),document.addEventListener("keydown",l),document.body.clientWidth>o&&(document.body.style.paddingRight=document.body.clientWidth-o+"px"),a.dispatchEvent(changeEvent),isPopupCalculationMaterialWasOpened||setTimeout((()=>{a.dispatchEvent(changeEvent)}),50),isPopupCalculationMaterialWasOpened=!0},n=e=>{e.classList.remove("popup--open");const o=e?.closest('[id^="js-modal-"]');o&&(o.style.display=""),t=null,document.body.classList.remove("no-scroll"),document.body.classList.remove("opened-modal");const s=document.querySelector("#js-overlay");s&&s.remove(),document.removeEventListener("keydown",l),document.body.style.paddingRight="0"},l=o=>{e(o)&&(o.preventDefault(),n(t))},i=document.querySelector(".button--popup--request"),a=document.querySelector(".popup--request");i&&a&&i.addEventListener("click",(e=>{e.preventDefault(),s(a)}));const c=document.querySelector(".button--popup--report-competitor"),d=document.querySelector(".popup--report-competitor");c&&d&&c.addEventListener("click",(e=>{e.preventDefault(),s(d)}));const u=document.querySelector(".button--popup--order--visualization"),p=document.querySelector(".popup--order--visualization");u&&p&&u.addEventListener("click",(e=>{e.preventDefault(),s(p)}));const m=document.querySelector(".button--popup--order-sample"),_=document.querySelector(".popup--order-sample");m&&_&&m.addEventListener("click",(e=>{e.preventDefault(),s(_)}));const w=document.querySelector(".button--popup--quick-order"),g=document.querySelector(".popup--quick-order");w&&g&&w.addEventListener("click",(e=>{e.preventDefault(),s(g)}));const f=document.querySelector(".materials"),v=document.querySelector(".popup--calculation-material"),h=document.querySelectorAll('[data-modal-opener="calculation-material"]');f&&v&&f.addEventListener("click",(e=>{e.preventDefault();const t=e.target.closest(".material__link");t&&r(t.dataset.type,t.dataset.material)})),v&&h.forEach((e=>{e.addEventListener("click",(t=>{t.preventDefault(),r(e.dataset.type,e.dataset.material)}))}));const y=document.querySelector(".popup--good");y&&s(y),popups.forEach((e=>{e.querySelector(".popup__close").addEventListener("click",n.bind(null,e)),e.addEventListener("click",(t=>{t.target.closest(".popup__content")||n(e)}))}))}const likeButtons=document.querySelectorAll(".like");likeButtons&&likeButtons.forEach((e=>{e.addEventListener("click",(()=>{e.classList.toggle("like--active")}))}));const clipboxes=document.querySelectorAll(".clipbox");if(clipboxes){let e=window.innerWidth;const t=e=>{const t=e.querySelector(".clipbox__content");e.classList.contains("clipbox--expanded")?t.offsetHeight<=parseInt(getComputedStyle(e).getPropertyValue("--max-height"),10)&&e.classList.remove("clipbox--expanded"):e.classList.contains("clipbox--reduced")?(e.classList.remove("clipbox--reduced"),t.offsetHeight>parseInt(getComputedStyle(e).getPropertyValue("--max-height"),10)&&e.classList.add("clipbox--reduced")):t.offsetHeight>parseInt(getComputedStyle(e).getPropertyValue("--max-height"),10)&&e.classList.add("clipbox--reduced")};clipboxes.forEach((e=>{e.querySelector(".clipbox__toggler").addEventListener("click",(()=>{e.classList.toggle("clipbox--reduced"),e.classList.toggle("clipbox--expanded")})),t(e)})),window.addEventListener("resize",(()=>{e!==window.innerWidth&&(e=window.innerWidth,clipboxes.forEach((e=>{t(e)})))}))}const worksGallerySlider=document.querySelector(".works-gallery__slider");if(worksGallerySlider){new Swiper(".works-gallery__slider",{slidesPerView:"auto",spaceBetween:5,freeMode:!0,navigation:{nextEl:".works-gallery__slider .swiper-button-next",prevEl:".works-gallery__slider .swiper-button-prev"},breakpoints:{768:{spaceBetween:19},1510:{spaceBetween:10}}})}const goodInfoTaber=document.querySelector(".good-info__taber");if(goodInfoTaber){new Swiper(".good-info__tab-buttons-wrapper",{slidesPerView:"auto",freeMode:!0,watchSlidesProgress:!0});const e=goodInfoTaber.querySelectorAll(".good-info__tab-buttons-link"),t=goodInfoTaber.querySelectorAll(".good-info__tabs-item");let o=e[0],s=t[0];for(let r=0;r<e.length;r++)e[r].addEventListener("click",(n=>{n.preventDefault(),s.classList.remove("good-info__tabs-item--current"),s=t[r],s.classList.add("good-info__tabs-item--current"),o.parentNode.classList.remove("good-info__tab-buttons-item--current"),o=e[r],o.parentNode.classList.add("good-info__tab-buttons-item--current")}))}const goodReviews=document.querySelector(".good-reviews");if(goodReviews){const e=goodReviews.querySelector(".good-reviews__form"),t=goodReviews.querySelector(".good-reviews__button-wrapper"),o=goodReviews.querySelector(".good-reviews__button"),s=goodReviews.querySelector(".good-reviews__cancel");t&&o&&o.addEventListener("click",(o=>{o.preventDefault(),e.classList.remove("good-reviews__form--hidden"),t.classList.add("good-reviews__button-wrapper--hidden")})),e&&s&&s.addEventListener("click",(()=>{e.classList.add("good-reviews__form--hidden"),t.classList.remove("good-reviews__button-wrapper--hidden")}))}const radioselects=document.querySelectorAll(".select-2");radioselects&&radioselects.forEach((e=>{const t=e.querySelector(".select-2__button"),o=e.querySelector(".select-2__radiobutton"),s=e=>{e.target.closest(".select-2")||r()},r=()=>{e.classList.remove("select-2--open"),window.removeEventListener("click",s)};t.addEventListener("click",(()=>{e.classList.contains("select-2--open")?r():(e.classList.add("select-2--open"),o.focus(),window.addEventListener("click",s))}));const n=e.querySelector(".select-2__options"),l=t.querySelector(".select-2__button-value");n.addEventListener("click",(e=>{"select-2__radiobutton-label"===e.target.className&&r()}));e.querySelectorAll(".select-2__radiobutton").forEach((e=>{e.addEventListener("change",(()=>{l.textContent=e.parentNode.querySelector(".select-2__radiobutton-label").textContent}))}))}));const goodQuantityAlterNodes=document.querySelectorAll(".goods-quantity--alter, .goods-quantity--alter-2");goodQuantityAlterNodes&&goodQuantityAlterNodes.forEach((e=>{const t=e.querySelector(".goods-quantity__select-button"),o=e.querySelector(".goods-quantity__radiobuttons"),s=o.querySelector(".radiobutton__control"),r=e=>{e.target.closest(".goods-quantity__radiobuttons")||n()},n=()=>{o.classList.remove("goods-quantity__radiobuttons--open"),window.removeEventListener("click",r)};t.addEventListener("click",(()=>{o.classList.contains("goods-quantity__radiobuttons--open")?n():(o.classList.add("goods-quantity__radiobuttons--open"),s.focus(),window.addEventListener("click",r))})),o.addEventListener("click",(e=>{"radiobutton__label"===e.target.className&&n()}));o.querySelectorAll(".radiobutton__control").forEach((e=>{e.addEventListener("change",(()=>{t.textContent=e.parentNode.querySelector(".radiobutton__label").textContent.slice(0,2)}))}))}));const coverCardWrappers=document.querySelectorAll(".s-popular .container");coverCardWrappers&&coverCardWrappers.forEach((e=>{e.querySelectorAll(".card").forEach((t=>{t.addEventListener("mouseover",(()=>{e.style.zIndex=200})),t.addEventListener("mouseout",(()=>{e.style.zIndex="auto"}))}))}));const goodsFilter=document.querySelector(".c-filter");if(goodsFilter){const e=50,t=e=>e.getBoundingClientRect().right-goodsFilter.getBoundingClientRect().right>0,o=e=>{e.style.left="auto"},s=e=>{e.style.left=0};goodsFilter.querySelectorAll(".form-select").forEach((r=>{const n=r.querySelector(".form-select__input"),l=r.querySelector(".form-select__list");n.addEventListener("click",(()=>{n.classList.contains("open")?s(l):setTimeout((()=>{t(l)&&o(l)}),e)}))}))}const smallCustomForms=document.querySelectorAll(".custom-form--compact");smallCustomForms&&smallCustomForms.forEach((e=>{const t=e.querySelector(".form__button--submit");t.style.display="none";const o=e.querySelector(".form__textfield-control");o.addEventListener("input",(()=>{o.value?t.style.display="grid":t.style.display="none"}))})),document.addEventListener("DOMContentLoaded",(()=>{"#js-modal-message"===window.location.hash&&($("#js-modal-message").fadeIn(500),$("body").append('<div class="overlay" id="js-overlay"></div>'),$("body").addClass("opened-modal"))}));const customForm2Elements=document.querySelectorAll(".custom-form-2");if(customForm2Elements){const e=e=>{const t=e.target.closest(".form__section-heading-button");if(!t)return;t.closest(".form__section").classList.toggle("form__section--open")};customForm2Elements.forEach((t=>{t.addEventListener("click",e)}))}const promocodeElement=document.querySelector(".custom-form-2--order .form__promocode");if(promocodeElement){const e=promocodeElement.querySelector(".promocode__cancel-button"),t=promocodeElement.querySelector(".form__textfield-control"),o=document.querySelector(".custom-form-2--order .form__footer-promo-button"),s=document.querySelector(".custom-form-2--order .form__promocode-button");promocodeElement&&o&&s&&o.addEventListener("click",(e=>{e.preventDefault(),o.classList.add("form__footer-promo-button--hidden"),s.classList.add("form__promocode-button--hidden"),promocodeElement.classList.add("form__promocode--show"),t.focus()})),promocodeElement&&o&&s&&s.addEventListener("click",(e=>{e.preventDefault(),o.classList.add("form__footer-promo-button--hidden"),s.classList.add("form__promocode-button--hidden"),promocodeElement.classList.add("form__promocode--show"),t.focus()})),promocodeElement&&e&&o&&s&&e.addEventListener("click",(()=>{o.classList.remove("form__footer-promo-button--hidden"),s.classList.remove("form__promocode-button--hidden"),promocodeElement.classList.remove("form__promocode--show")}))}const inspirationGallery=document.querySelector(".inspiration");if(inspirationGallery){new Swiper(".artgallery-swiper",{slidesPerView:"auto",spaceBetween:5,watchSlidesProgress:!0,loop:!0,navigation:{nextEl:".inspiration__button-next",prevEl:".inspiration__button-prev"}})}const productsSection=document.querySelector(".products");productsSection&&function(){const e=window.matchMedia("(min-width: 1280px)"),t=document.querySelector(".products__slider"),o=document.querySelector(".products__list"),s=document.querySelectorAll(".products__item-group");let r;const n=()=>{if(!0!==e.matches)return!1===e.matches&&void 0===r?l():void 0;void 0!==r&&(r.destroy(!0,!0),r=void 0,t.classList.remove("swiper"),o.classList.remove("swiper-wrapper"),s.forEach((e=>{e.classList.remove("swiper-slide")})))},l=()=>{t.classList.add("swiper"),o.classList.add("swiper-wrapper"),s.forEach((e=>{e.classList.add("swiper-slide")})),r=new Swiper(".products__slider",{slidesPerView:1,loop:!0,spaceBetween:8,watchSlidesProgress:!0,navigation:{nextEl:".products__button-next",prevEl:".products__button-prev"},breakpoints:{420:{slidesPerView:"auto"},1280:{slidesPerView:4,spaceBetween:5},1510:{spaceBetween:10}}})};window.addEventListener("resize",n),n()}();const projectsGallery=document.querySelector(".projects");if(projectsGallery){new Swiper(".projects-swiper",{slidesPerView:"auto",spaceBetween:5,watchSlidesProgress:!0,loop:!0,navigation:{nextEl:".projects__button-next",prevEl:".projects__button-prev"}})}const serviceSwiper=document.querySelector(".n-service");if(serviceSwiper){new Swiper(".n-service-swiper",{slidesPerView:"auto",watchOverflow:!0,spaceBetween:5,breakpoints:{768:{slidesPerView:3,spaceBetween:7},1510:{spaceBetween:20}}})}const tileSwiper=document.querySelector(".tile-range");if(tileSwiper){new Swiper(".tile-range-swiper",{slidesPerView:"auto",spaceBetween:8,loop:!0,navigation:{nextEl:".tile-range__button-next",prevEl:".tile-range__button-prev"},watchSlidesProgress:!0,breakpoints:{768:{spaceBetween:10},1280:{slidesPerView:4,spaceBetween:8},1510:{spaceBetween:10}}})}const linksElements=document.querySelectorAll(".links");linksElements&&linksElements.forEach((e=>{e.addEventListener("click",(t=>{t.target.closest(".links__toggle")&&e.classList.toggle("links--open")}))}));const orderForm=document.querySelector(".custom-form-2--order");if(orderForm){const e=orderForm.querySelector(".form__section-body--address");e&&orderForm.addEventListener("change",(t=>{const o=t.target.closest(".form__checkbox-control");o&&e.classList.toggle("form__section-body--address--stock",o.checked)}))}const anchor=document.querySelector(".n-banner__video-link"),elementClickHandler=e=>{const t=e.target.closest("a");if(!t)return;e.preventDefault();const o=t.getAttribute("href");if(o&&"#"!==o&&"#!"!==o){const e=document.querySelector(o);e&&e.scrollIntoView({behavior:"smooth",block:"start"})}};anchor&&anchor.addEventListener("click",elementClickHandler);const nProductsItemSlider=document.querySelector(".n-products__item-slider");if(nProductsItemSlider)var swiper=new Swiper(".n-products__item-slider",{cssMode:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},watchSlidesProgress:!0,loop:!0,pagination:{el:".swiper-pagination",clickable:!0}});const materialsSwiper=document.querySelector(".materials__slider.swiper");if(materialsSwiper)swiper=new Swiper(".materials__slider",{slidesPerView:"auto",spaceBetween:10,cssMode:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},watchSlidesProgress:!0,breakpoints:{768:{spaceBetween:15},1280:{slidesPerView:4,spaceBetween:25}}});const materialsSwiperAlter=document.querySelector(".materials__slider--alter.swiper");if(materialsSwiperAlter)swiper=new Swiper(".materials__slider--alter",{slidesPerView:"auto",spaceBetween:11,cssMode:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},breakpoints:{1280:{slidesPerView:6},1510:{slidesPerView:7}}});const showroomSlider=document.querySelector(".showroom__slider");if(showroomSlider){new Splide(".showroom__slider",{type:"loop",drag:"free",pagination:!1,focus:"center",autoWidth:!0,autoScroll:{speed:.5,pauseOnFocus:!1}}).mount(window.splide.Extensions)}const newsSection=document.querySelector(".n-news");if(newsSection){new Swiper(".news-swiper",{slidesPerView:"auto",spaceBetween:5,watchSlidesProgress:!0,loop:!0,navigation:{nextEl:".n-news__button-next",prevEl:".n-news__button-prev"},breakpoints:{1510:{spaceBetween:10}}})}const initOffersSection=e=>{const t=e.querySelector(".tabs__slider"),o=e.querySelector(".offers__slider"),s=t.querySelectorAll(".tabs__item").length;let r=!1;const n=e.querySelector(".offers__button-prev-2"),l=e.querySelector(".offers__button-next-2"),i=new Swiper(t,{loop:!0,allowTouchMove:!1,watchSlidesProgress:!0,threshold:10,pagination:{el:".offers__tabs-pagination",clickable:!0},breakpoints:{768:{slidesPerView:Math.min(3,s)},1280:{slidesPerView:Math.min(6,s)}}}),a=new Swiper(o,{loop:!0,watchSlidesProgress:!0,navigation:{nextEl:".offers__button-next",prevEl:".offers__button-prev"},effect:"fade",fadeEffect:{crossFade:!0},autoplay:{delay:6e3,disableOnInteraction:!1,pauseOnMouseEnter:!0,waitForTransition:!0}});a.on("slideChangeTransitionStart",(()=>a.allowTouchMove=!1)),a.on("slideChangeTransitionEnd",(()=>a.allowTouchMove=!0)),i.on("slideNextTransitionEnd",(()=>{r&&i.params.slidesPerView>=4&&(i.slideNext(i.params.speed/2),r=!1)})),i.on("slidePrevTransitionEnd",(()=>{r&&i.params.slidesPerView>=5&&(i.slidePrev(i.params.speed/2),r=!1)}));const c=e=>{if(i.slides.forEach((e=>e.classList.remove("tabs__item--current"))),i.params.slidesPerView<2)return;t.querySelectorAll(`.tabs__item[data-swiper-slide-index="${e}"]`).forEach((e=>e.classList.add("tabs__item--current")))};c(a.realIndex);const d=e=>{if(3===i.params.slidesPerView)switch(e){case i.realIndex:i.slidePrev();break;case(i.realIndex+i.params.slidesPerView-1)%s:i.slideNext()}else if(4===i.params.slidesPerView)switch(e){case i.realIndex:i.slidePrev();break;case(i.realIndex+i.params.slidesPerView-2)%s:i.slideNext();break;case(i.realIndex+i.params.slidesPerView-1)%s:r=!0,i.slideNext(i.params.speed/2)}else if(i.params.slidesPerView>=5)switch(e){case i.realIndex:r=!0,i.slidePrev(i.params.speed/2);break;case(i.realIndex+1)%s:i.slidePrev(i.params.speed);break;case(i.realIndex+i.params.slidesPerView-2)%s:i.slideNext();break;case(i.realIndex+i.params.slidesPerView-1)%s:r=!0,i.slideNext(i.params.speed/2)}};d(a.realIndex),t.addEventListener("click",(e=>{const t=e.target.closest(".tabs__item");t&&(tabsItemIndex=+t.dataset.swiperSlideIndex,a.slideToLoop(tabsItemIndex))})),n.addEventListener("click",(()=>a.slidePrev())),l.addEventListener("click",(()=>a.slideNext())),a.on("slideNextTransitionStart",(()=>{i.params.slidesPerView<3&&i.slideNext()})),a.on("slidePrevTransitionStart",(()=>{i.params.slidesPerView<3&&i.slidePrev()})),a.on("slideChange",(()=>{c(a.realIndex),i.params.slidesPerView>=3&&d(a.realIndex)})),a.on("resize",(()=>a.slideToLoop(i.realIndex)))};document.querySelectorAll(".offers").forEach(initOffersSection);const goodsSlider1=document.querySelector(".goods--swiper--1 .goods__slider");if(goodsSlider1){new Swiper(".goods--swiper--1 .goods__slider",{slidesPerView:1,spaceBetween:9,navigation:{nextEl:".goods--swiper--1 .goods__slider-button-next",prevEl:".goods--swiper--1 .goods__slider-button-prev"},breakpoints:{420:{slidesPerView:"auto"},1280:{slidesPerView:4}},watchSlidesProgress:!0})}const goodsSlider2=document.querySelector(".goods--swiper--2 .goods__slider");if(goodsSlider1){new Swiper(".goods--swiper--2 .goods__slider",{slidesPerView:1,spaceBetween:9,navigation:{nextEl:".goods--swiper--2 .goods__slider-button-next",prevEl:".goods--swiper--2 .goods__slider-button-prev"},breakpoints:{420:{slidesPerView:"auto"},1280:{slidesPerView:4}},watchSlidesProgress:!0})}const popularGoodsSection=document.querySelector(".goods--popular");popularGoodsSection&&function(){const e=window.matchMedia("(min-width: 1280px)"),t=document.querySelector(".goods--popular .goods__slider"),o=document.querySelector(".goods--popular .goods__list"),s=document.querySelectorAll(".goods--popular .good-list__item");let r;const n=()=>{if(!0!==e.matches)return!1===e.matches&&void 0===r?l():void 0;void 0!==r&&(r.destroy(!0,!0),r=void 0,popularGoodsSection.classList.remove("goods--swiper"),t.classList.remove("swiper"),o.classList.remove("swiper-wrapper"),s.forEach((e=>{e.classList.remove("swiper-slide")})))},l=()=>{popularGoodsSection.classList.add("goods--swiper"),t.classList.add("swiper"),o.classList.add("swiper-wrapper"),s.forEach((e=>{e.classList.add("swiper-slide")})),r=new Swiper(".goods--popular .goods__slider",{slidesPerView:1,spaceBetween:9,allowTouchMove:!0,navigation:{nextEl:".goods--popular .goods__slider-button-next",prevEl:".goods--popular .goods__slider-button-prev"},breakpoints:{420:{slidesPerView:"auto"},1280:{allowTouchMove:!1,slidesPerView:4}},watchSlidesProgress:!0})};window.addEventListener("resize",n),n()}();const initSelect=e=>{const t=e.querySelector(".n-select__control"),o=e.querySelector(".n-select__select"),s=o.querySelector(".n-select__header"),r=o.querySelector(".n-select__list"),n=r.querySelectorAll(".n-select__option");t.value="";const l=()=>{r.style.maxHeight=r.children[0].offsetHeight*r.dataset.maxHeight+"px"};o.addEventListener("keydown",l),o.addEventListener("click",l);let i=0;const a=e=>{t.value!==t.children[e].value&&(t.children[e].selected=!0,t.dispatchEvent(changeEvent))};o.addEventListener("keydown",(e=>{switch(e.code){case Key.RIGHT:case Key.DOWN:e.preventDefault(),a((i+1)%t.children.length);break;case Key.UP:case Key.LEFT:e.preventDefault(),a(i-1<0?t.children.length-1:i-1);break;case Key.SPACE:case Key.ENTER:e.preventDefault(),o.classList.toggle("n-select__select--open")}})),o.addEventListener("click",(({target:e})=>{const t=e.closest(".n-select__option");t&&a(t.dataset.index),o.classList.toggle("n-select__select--open")})),o.addEventListener("blur",(()=>{o.classList.remove("n-select__select--open")})),t.addEventListener("change",(()=>{i=t.value?+t.querySelector(`option[value="${t.value}"]`).dataset.index:0,(()=>{if(n.forEach((e=>{e.classList.remove("n-select__option--selected")})),""===t.value)return s.textContent=s.dataset.text,s.classList.remove("n-select__header--selected"),void(r.scrollTop=0);s.classList.add("n-select__header--selected"),r.children[i].classList.add("n-select__option--selected"),s.textContent=t.children[i].textContent,r.children[i].offsetTop+r.children[i].offsetHeight>r.offsetHeight+r.scrollTop?r.scrollTop=r.children[i].offsetTop+r.children[i].offsetHeight-r.offsetHeight:r.scrollTop>r.children[i].offsetTop&&(r.scrollTop=r.children[i].offsetTop)})()}))};document.querySelectorAll(".n-select").forEach(initSelect);const materialsSlider=new Swiper(".materials-slider",{slidesPerView:1,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},spaceBetween:14,watchSlidesProgress:!0,breakpoints:{768:{spaceBetween:30},960:{spaceBetween:50},1280:{spaceBetween:60},1510:{spaceBetween:90}}}),initCalculationMaterialSection=e=>{const t=e.querySelector(".materials-slider");if(t){const o=t.dataset.connectedSelect,s=e.querySelector(`select[name="${o}"]`);if(!s)return;s.addEventListener("change",(()=>{let e;s.value&&(e=s.querySelector(`[value="${s.value}"]`).dataset.index),materialsSlider.slideTo(e,materialsSlider.params.speed,!1)})),materialsSlider.on("transitionEnd",(()=>{const e=s.querySelector(`option[data-index="${materialsSlider.realIndex}"]`).value;s.value!==e&&(s.value=e,s.dispatchEvent(changeEvent))}))}};document.querySelectorAll(".calculation-material").forEach(initCalculationMaterialSection);const initBannerParallaxImg=e=>{const t=e.parentNode;document.addEventListener("scroll",(()=>{const o=e.offsetHeight-t.offsetHeight;if(o<=0)return;const s=o/(t.getBoundingClientRect().bottom+window.pageYOffset);let r=window.pageYOffset*s;r<=0?r=0:r>=o&&(r=o),e.style.transform=`translate(-50%, -${r}px)`}))};document.querySelectorAll(".n-banner--parallax-bg .n-banner__img").forEach(initBannerParallaxImg);const goodListNodes=document.querySelectorAll(".good-list");if(goodListNodes.length>0){const e=289,t=e=>{let t=0;e.forEach((e=>{e.style.minHeight="auto",e.offsetHeight>t&&(t=e.offsetHeight)})),e.forEach((e=>{e.style.minHeight=`${t}px`}))},o=()=>{goodListNodes.forEach((o=>{const s=Array.from(o.querySelectorAll(".good__heading"));if(o.classList.contains("swiper-wrapper"))t(s);else{const r=parseInt(getComputedStyle(o).columnGap,10),n=Math.floor((o.clientWidth+r)/(e+r));for(let e=0;e<s.length;e+=n){const o=s.slice(e,e+n);t(o)}}}))};window.addEventListener("load",o,{once:!0}),window.addEventListener("resize",o)}goodListNodes.forEach((e=>{e.addEventListener("touchstart",(e=>{const t=e.target.closest(".good__add-cart");t&&(t.classList.add("good__add-cart--expanded"),setTimeout((()=>{t.classList.remove("good__add-cart--expanded")}),500))}))}));const collectionListNodes=document.querySelectorAll(".n-collection-list");if(collectionListNodes.length>0){const e=289,t=e=>{let t=0;e.forEach((e=>{e.style.minHeight="auto",e.offsetHeight>t&&(t=e.offsetHeight)})),e.forEach((e=>{e.style.minHeight=`${t}px`}))},o=()=>{collectionListNodes.forEach((o=>{const s=Array.from(o.querySelectorAll(".n-collection__heading"));if(o.classList.contains("swiper-wrapper"))t(s);else{const r=parseInt(getComputedStyle(o).columnGap,10),n=Math.floor((o.clientWidth+r)/(e+r));for(let e=0;e<s.length;e+=n){const o=s.slice(e,e+n);t(o)}}}))};window.addEventListener("load",o,{once:!0}),window.addEventListener("resize",o)}collectionListNodes.forEach((e=>{e.addEventListener("touchstart",(e=>{const t=e.target.closest(".n-collection__button");t&&(t.classList.add("n-collection__button--expanded"),setTimeout((()=>{t.classList.remove("n-collection__button--expanded")}),500))}))}));const initShowroomTooltip=e=>{e.querySelector(".showroom__tooltip-close").addEventListener("click",(()=>{e.remove()}))};document.querySelectorAll(".showroom__tooltip").forEach(initShowroomTooltip);const goodCards=document.querySelectorAll(".good-list__item"),collectionCards=document.querySelectorAll(".n-collection-list__item");window.addEventListener("load",(()=>{goodCards.forEach((e=>{e.style.height="auto",setTimeout((()=>{e.style.height=`${e.offsetHeight}px`}),0)})),collectionCards.forEach((e=>{e.style.height="auto",setTimeout((()=>{e.style.height=`${e.offsetHeight}px`}),0)}))})),window.addEventListener("resize",(()=>{goodCards.forEach((e=>{e.style.height="auto",setTimeout((()=>{e.style.height=`${e.offsetHeight}px`}),0)})),collectionCards.forEach((e=>{e.style.height="auto",setTimeout((()=>{e.style.height=`${e.offsetHeight}px`}),0)}))}));const setNumberFieldControlWidth=e=>{e.style.width=`${e.value.length+1}ch`},initGoodsQuantity=e=>{const t=e.querySelector(".number-field__control"),o=()=>{setTimeout((()=>{setNumberFieldControlWidth(t)}),5)};t.addEventListener("input",(e=>setNumberFieldControlWidth(e.target))),t.addEventListener("change",(e=>{setTimeout((()=>setNumberFieldControlWidth(e.target)),5)})),e.querySelectorAll(".number-field__button").forEach((e=>{e.addEventListener("click",o)})),e.querySelectorAll(".radiobutton__control").forEach((e=>{e.addEventListener("click",o)})),setNumberFieldControlWidth(t)};document.querySelectorAll(".goods-quantity").forEach(initGoodsQuantity),document.querySelectorAll(".good").forEach(initGoodsQuantity);const initModalsButton=e=>{e.addEventListener("click",(()=>{setTimeout((()=>{const e=document.querySelector("#js-modal-click");e&&e.querySelectorAll(".goods-quantity").forEach(initGoodsQuantity)}),1e3)}))};document.querySelectorAll('.js-modal-show[href="#js-modal-click"').forEach(initModalsButton);const initYouTubeVideoStarter=(e,t)=>{t.addEventListener("click",(()=>{e.playVideo()}))};let youTubePlayer;const onYouTubeIframeAPIReady=()=>{youTubePlayer=new YT.Player("manufacture-video");const e=document.querySelector(".n-banner__video-link");var t;youTubePlayer&&e&&(t=youTubePlayer,e.addEventListener("click",(()=>{t.playVideo()})))},initAdvantagesSection=e=>{const t=e.querySelectorAll(".n-advantages__name"),o=e.querySelectorAll(".n-advantages__info"),s=e=>{e.target.closest(".n-advantages__name")||(t.forEach((e=>e.classList.remove("n-advantages__name--hover"))),document.removeEventListener("click",s))};e.addEventListener("click",(e=>{if(!window.matchMedia("(pointer: coarse)").matches)return;const o=e.target.closest(".n-advantages__name");o&&(o.classList.contains("n-advantages__name--hover")?t.forEach((e=>e.classList.remove("n-advantages__name--hover"))):(t.forEach((e=>e.classList.remove("n-advantages__name--hover"))),o.classList.add("n-advantages__name--hover"),document.addEventListener("click",s)))}));const r=()=>{o.forEach((e=>{e.style.transform="";const t=getComputedStyle(e).transform.split(","),o=parseFloat(t[t.length-2]),s=parseFloat(t[t.length-1]);e.style.transform=`translate(${Math.round(o)}px, ${Math.round(s)}px)`}))};window.addEventListener("resize",debounce(r)),r()};document.querySelectorAll(".n-advantages").forEach(initAdvantagesSection);const setGoodsCountProperty=e=>{count=e.querySelectorAll(".good-list__item").length,e.style.setProperty("--goods-count",count)};document.querySelectorAll(".goods__inner").forEach(setGoodsCountProperty);const addNewFileField=(e,t)=>e.insertAdjacentHTML("beforeend",`\n  <span class="form__file-field-item">\n    <label class="form__file-field">\n      <span class="form__file-field-button">Загрузить файл</span>\n      <input class="form__file-field-control" name="files_${t}" type="file" accept="image/png, image/jpg, image/jpeg, image/webp, image/gif">\n    </label>\n  </span>\n`),initFileFieldWrapper=e=>{e.closest("form").addEventListener("change",(t=>{const o=t.target;if(!o.classList.contains("form__file-field-control"))return;if(o.classList.toggle("form__file-field-control--shown",o.value),!e.dataset.maxCount)return;const s=e.querySelectorAll(".form__file-field-control");let r=0;for(let e=0;e<s.length;e++)s[e].name=`files_${e+1}`,s[e].value||r++;o.value?s.length<e.dataset.maxCount&&0===r&&addNewFileField(e,s.length+1):r>1&&o.closest(".form__file-field-item").remove()}))};document.querySelectorAll(".custom-form-2 .form__file-field-wrapper").forEach(initFileFieldWrapper);const productCategoriesSlider=new Swiper(".product-categories__slider",{spaceBetween:14,watchSlidesProgress:!0,loop:!0,breakpoints:{364:{slidesPerView:"auto"},1280:{slidesPerView:4,spaceBetween:20,loop:!1}}});