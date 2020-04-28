(function () {
    'use strict';

    
    // $(window).on('load', function () {
    //     $('.loading').fadeOut();
    // });
    
 
    $('.move-section').on('click', function (e) {
        e.preventDefault();
        var anchorLink = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchorLink.attr('href')).offset().top + 1
        }, 1000);
    });
    
    // :: Add Class Active To Navbar
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > ($('.nav-bar').height())) {
            $('.nav-bar').addClass('active');
            $('.nav-bar').addClass('fixed-top');
        } else {
            $('.nav-bar').removeClass('active');
            $('.nav-bar').removeClass('fixed-top');
        }
    });
    
    // :: Add Class Active To Navbar Toggle
    $('.nav-bar .nav-bar-toggler').on('click', function (e) {
        $('.nav-bar .nav-menu-links').toggleClass('active');
    });
    
    // :: Open Menu (.sub-menu)
    $('.nav-bar .item.has-menu').on('click', function () {
        $(this).find('.sub-menu').slideToggle().parent().siblings().find('.sub-menu').slideUp();
    });
    
    // :: Add Function slideUp() To .sub-menu
    $(document).mouseup(function (e) {
        var nav_item = $('.nav-bar .item.has-menu');
        if (!nav_item.is(e.target) && nav_item.has(e.target).length === 0) {
            $('.sub-menu').slideUp();
        }
    });
    
    // :: Animation Header
    $('.header-hero').on('translate.owl.carousel', function () {
        $('.header-hero .head-info').removeClass('animated fadeOut').css('opacity', '0');
        $('.header-hero .head-info .top-handline').removeClass('animated fadeInUp').css('opacity', '0');
        $('.header-hero .head-info .handline').removeClass('animated fadeInUp').css('opacity', '0');
        $('.header-hero .head-info p').removeClass('animated fadeInDown').css('opacity', '0');
        $('.header-hero .head-info .buttons').removeClass('animated fadeInDown').css('opacity', '0');
    });
    $('.header-hero').on('translated.owl.carousel', function () {
        $('.header-hero .head-info').removeClass('animated fadeIn').css('opacity', '1');
        $('.header-hero .head-info .top-handline').addClass('animated fadeInUp').css('opacity', '1');
        $('.header-hero .head-info .handline').addClass('animated fadeInUp').css('opacity', '1');
        $('.header-hero .head-info p').addClass('animated fadeInDown').css('opacity', '1');
        $('.header-hero .head-info .buttons').addClass('animated fadeInDown').css('opacity', '1');
    });

    // :: Add Class Active On Go To Header
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 400) {
            $('.scroll-up').addClass('active');
        } else {
            $('.scroll-up').removeClass('active');
        }
    });

    

    
 
    

}());