$(window).on('load', function () {

    var notificationCheckbox = $('.notification input');
    var notificationBoxes = $('.notification-types-selection .notification-type-box');



    var slideIndex = 1;
    showSlides(slideIndex);

    // Next/previous controls
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    $('.btn-next').on('click', function (event) {
        event.preventDefault();
        plusSlides(1);
    });

    $('.btn-prev').on('click', function (event) {
        event.preventDefault();
        if (slideIndex < 2) {
            return false;
        }
        plusSlides(-1);
    });

    $('.btn-submit').on('click', function (event) {
        event.preventDefault();
        $('.success-notification').css('display', 'flex');
        setTimeout(function () {
            $('.success-notification').css('display', 'none');
        }, 3000);
    });


    function showSlides(n) {
        var i;
        var slides = $('.mySlides');
        if (n > slides.length) {
            return false;
        }


        console.log(n);

        if (n < 1) {
            n = 0;
            // return false;
            // slideIndex = slides.length;
        }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }


        slides[slideIndex - 1].style.display = "block";
    }
    console.log(notificationCheckbox);
    $('#select-behaviour').on('change', function () {
        if ($(this).val() == 'delay') {
            $('#number-sec').css('display', 'block');
            $('#percentage-scrolling').css('display', 'none');
        } else if ($(this).val() == 'scroll-percentage') {
            $('#number-sec').css('display', 'none');
            $('#percentage-scrolling').css('display', 'block');
        } else {
            $('#number-sec').css('display', 'none');
            $('#percentage-scrolling').css('display', 'none');
        }
    });



    notificationCheckbox.each(function () {
        $(this).on('change', function () {
            console.log($(this).is(":checked"));
            if ($(this).is(":checked")) {
                if ($(this).parent().parent().parent().hasClass('inactive')) {
                    $(this).parent().parent().parent().removeClass('inactive');
                }
                $(this).parent().parent().parent().addClass('active')
            } else {
                if ($(this).parent().parent().parent().hasClass('active')) {
                    $(this).parent().parent().parent().removeClass('active');
                }

                $(this).parent().parent().parent().addClass('inactive');
            }
        });
    });
    choosePopup();
    notificationBoxes.each(function () {
        $(this).on('click', function () {
            notificationBoxes.each(function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                }
            });
            $(this).addClass('selected');
            resetPopup();
            choosePopup($(this).attr('data-value'));
            console.log($(this).attr('data-value'));
        });
    });
    // createContactPopup();
    // createRateEmojiPopup();

    // createDemoPopup();
    // createCountDownPopup();







    $('#trigger-all').on('change', function () {

        if ($(this).is(':checked')) {
            $('.btn-add-trigger').css('display', 'none');
            $('.trigger-input').each(function () {
                $(this).prop('disabled', true);
            });
        } else {
            $('.btn-add-trigger').css('display', 'inline-block');
            $('.trigger-input').each(function () {
                $(this).prop('disabled', false);
            });
        }

        console.log()
    });

    $('.btn-add-trigger').on('click', function () {
        var str = '<div class="d-flex align-items-center mb-2">' +
            '<select class="form-control select-trigger trigger-input"' +
            'name="">' +
            '<option value="exact-match">Exact match</option>' +
            '<option value="contains">Contains</option>' +
            '<option value="start-with">Starts With</option>' +
            '<option value="ends-with">Ends With</option>' +
            '<option value="page-contains">Page Contains</option>' +
            '</select>' +
            '<input type="text" name="icon-url"' +
            'class="form-control notification-icon-input trigger-input"' +
            'placeholder="Full URL (ex: https://domain.com/destination )">' +
            '<span class="flaticon-error icons delete-trigger"></span>'
        '</div>';

        var elem = $.parseHTML(str);
        $('.trigger-wrap').append(elem);
        deleteTrigger();
    });


    deleteTrigger();
    $('.copy-html-icon').on('click', function () {
        $('.copy-notification').css('display', 'flex');
        $('.user-link-textarea').select();
        document.execCommand('copy');
        setTimeout(function () {
            $('.copy-notification').css('display', 'none');
        }, 2000);
    });

    $('#title-message').on('keyup', function () {
        if ($('.title')) {
            $('.title').text($(this).val());
            console.log($(this).val());
        }
    });

    $('#title-color').on('change', function () {
        if ($('.title')) {
            $('.title').css('color', $(this).val());
            console.log($(this).val());
        }
    });




    $('#description-message').on('keyup', function () {
        if ($('.description')) {
            $('.description').text($(this).val());
            console.log($(this).val());
        }
    });

    $('#description-color').on('change', function () {
        if ($('.description')) {
            $('.description').css('color', $(this).val());
            console.log($(this).val());
        }
    });

    $('#background-color').on('change', function () {
        if ($('.pop-up-inner')) {
            $('.pop-up-inner').css('backgroundColor', $(this).val());
            console.log($(this).val());
        }
    });

    $('#border-radius').on('change', function () {
        if ($('.pop-up-inner')) {
            $('.pop-up-inner').css('borderRadius', $(this).val() + 'px');
            console.log($(this).val());
        }
    });

    $('#display-close-check').on('change', function () {
        if (!$(this).is(':checked')) {
            $('.close-pop').css('display', 'none');
        } else {
            $('.close-pop').css('display', 'inline');
        }
        console.log($(this).is(':checked'));
    });

    $('#notification-icon').on('change', function () {
        if ($('.icon img')) {
            $('.icon img').attr('src', $(this).val());
            console.log($(this).val());
        }
    });






});


function choosePopup(type) {
    switch (type) {
        case 'notify':
            createSalePopup();
            break;
        case 'coupon':
            createDiscountPopup();
            break;
        case 'live-visitor':
            createActivePopup();
            break;
        case 'recent-conversation':
            createSignedupPopup();
            break;
        case 'conversion-counter':
            createBoughtPopup();
            break;
        case 'video-pop':
            createDemoPopup();
            break;
        case 'viral-share':
            createSharePopup();
            break;
        case 'testimonials':
            createRatedPopup();
            break;
        case 'emoji-review':
            createRateEmojiPopup();
            break;
        case 'cookie-alert':
            createCookiesPopup();
            break;
        case 'quick-review':
            createRateNumberPopup();
            break;
        case 'contact-request':
            createContactPopup();
            break;
        case 'fomo-signup':
            createCountDownPopup();
            break;
        case 'email-optin':
            createNewsletterPopup();
            break;
        default:
            createSalePopup();
    }
}

function resetPopup() {
    $('.pop-up-wrap').remove();
}

function deleteTrigger() {
    $('.delete-trigger').each(function () {
        $(this).on('click', function () {
            $(this).parent().remove();
        });
    });
}

function createSalePopup() {
    var str = '<div class="pop-up-wrap">' +
        '<div class="pop-up-inner" style="display: flex; align-items: center; position: relative; border: 1px solid #6b60cb; padding: 2rem; width: auto; background-color: #ffffff;">' +
        ' <span data-close="pop-up-wrap" class="icon-close-tool  close-pop" style="position: absolute; right: 0; top: 0; font-size: 1.3rem; color: #6b60cb;"></span>' +
        '<div class="icon" style="width: 5rem; margin-right: 1rem"> ' +
        '<img src="../assets/icons/commerce-and-shopping-purple.png" class="img-fluid" alt="icon">' +
        '</div>' +
        '<div style="display: flex; flex-direction: column">' +
        '<div class="title" style="font-size: 1.2rem;font-weight: 700;">Flash Sale 🔥</div>' +
        '<div class="description" style="font-size: 1rem;font-weight: 600;">Limited sale until tonight, right now!</div>' +
        ' <div class="verification-text" style="font-size: 0.8rem;font-weight: 500;"><img src="../assets/logo.png" style="width: 0.7rem;height: 0.7rem; margin-right: 0.4rem;"> Verified by EngageProof</div>' +
        '</div>' +
        ' </div> ' +
        ' </div>';
    var popup = $.parseHTML(str);
    $('#popup-preview').append(popup);
}

function createDiscountPopup() {
    var str = '<div class="pop-up-wrap">' +
        '<div class="pop-up-inner" style="display: flex; align-items: center; position: relative; border: 1px solid #6b60cb; padding: 2rem;width: auto; background-color: #ffffff;">' +
        ' <span data-close="pop-up-wrap" class="icon-close-tool  close-pop" style="position: absolute; right: 0; top: 0; font-size: 1.3rem; color: #6b60cb;"></span>' +
        '<div class="icon" style="width: 6rem; margin-right: 2rem"> ' +
        '<img src="../assets/icons/commerce-and-shopping-purple.png" class="img-fluid" alt="icon">' +
        '</div>' +
        '<div style="display: flex; flex-direction: column">' +
        '<div class="title" style="font-size: 1.2rem;font-weight: 700;">35% off 🔥!</div>' +
        '<div class="description" style="font-size: 1rem;font-weight: 600;">Limited sales coupon code.</div>' +
        '<div class="coupon-code" style="text-align: center;padding: 0.5rem 1rem;border: 2px dashed #000000;border-radius: 1rem;font-weight: 800;font-size: 1.1rem;margin-top: 1rem">COUPON20</div>' +
        '<a name="" class="btn btn-pop-up" href="#" role="button" style="color: #ffffff; background: linear-gradient(to right, #6c6ade, #884993); font-size: 1rem; margin-top: 1rem; font-weight: 800; ">CHECK ACTIVITY</a>' +
        ' <div class="verification-text" style="font-size: 0.8rem;font-weight: 500; margin-top: 0.4rem"><img src="../assets/logo.png" style="width: 0.7rem;height: 0.7rem; margin-right: 0.4rem;"> Verified by EngageProof</div>' +
        '</div>' +
        ' </div> ' +
        ' </div>';
    var popup = $.parseHTML(str);
    $('#popup-preview').append(popup);
}

function createCookiesPopup() {
    var str = '<div class="pop-up-wrap">' +
        '<div class="pop-up-inner" style="display: flex; align-items: center; position: relative; border: 1px solid #6b60cb; padding: 2rem; width: auto; background-color: #ffffff;">' +
        ' <span data-close="pop-up-wrap" class="icon-close-tool  close-pop" style="position: absolute; right: 0; top: 0; font-size: 1.3rem; color: #6b60cb;"></span>' +
        '<div class="icon" style="width: 6rem; margin-right: 1.3rem"> ' +
        '<img src="../assets/icons/cookie.png" class="img-fluid" alt="icon">' +
        '</div>' +
        '<div style="display: flex; flex-direction: column">' +
        '<div class="description" style="font-size: 1rem;font-weight: 600;">This website uses cookies to ensure you get the best experience.' +
        ' <a href="#" target="_blank" style="color: #000000">Learn more</a>' +
        '</div>' +
        '<div style="display: flex; align-items: center; margin-top: 0.5rem">' +
        '<button type="button" class="btn btn-pop-up" data-close="pop-up-wrap" style="padding: 0.35rem 1.5rem; background: linear-gradient(to right, #6c6ade, #884993); color: #ffffff;margin-right: 0.5rem">OK, COOL</button>' +
        ' <div class="verification-text" style="font-size: 0.8rem;font-weight: 500;"><img src="../assets/logo.png" style="width: 0.7rem;height: 0.7rem; margin-right: 0.4rem;"> Verified by EngageProof</div>' +
        '</div>' +
        '</div>' +
        ' </div> ' +
        ' </div>';
    var popup = $.parseHTML(str);
    $('#popup-preview').append(popup);
}

function createActivePopup() {
    var str = '<div class="pop-up-wrap">' +
        '<div class="pop-up-inner" style="display: flex; align-items: center; position: relative; border: 1px solid #6b60cb; padding: 2rem; width: auto; background-color: #ffffff">' +
        ' <span data-close="pop-up-wrap" class="icon-close-tool  close-pop" style="position: absolute; right: 0; top: 0; font-size: 1.3rem; color: #6b60cb;"></span>' +
        '<div class="icon" style="width: 5rem; margin-right: 1rem"> ' +
        '<img src="../assets/icons/avatar.svg" class="img-fluid" alt="icon">' +
        '</div>' +
        '<div style="display: flex; flex-direction: column">' +
        '<div>' +
        '<div class="active-users" style="background-color: #9e65cd;display: inline-flex;border-radius: 1rem;padding: 0.2rem 0.6rem;align-items: center;">' +
        '<div class="active-icon" style="width: 1.2rem; height: 1.2rem;background-color: #55b75b; border: 2px solid #ffffff;border-radius: 50%;margin-right: 1rem;"></div>' +
        '<span class="value" style="color: #ffffff;font-weight: 800;font-size: 1.2rem;">20</span>' +
        '</div>' +
        '</div>' +
        '<div class="title" style="font-size: 1.2rem;font-weight: 700;">Active Visitor Now.</div>' +
        ' <div class="verification-text" style="font-size: 0.8rem;font-weight: 500;"><img src="../assets/logo.png" style="width: 0.7rem;height: 0.7rem; margin-right: 0.4rem;"> Verified by EngageProof</div>' +
        '</div>' +
        ' </div> ' +
        ' </div>';
    var popup = $.parseHTML(str);
    $('#popup-preview').append(popup);
}

function createSignedupPopup() {
    var str = '<div class="pop-up-wrap">' +
        '<div class="pop-up-inner" style="display: flex; align-items: center; position: relative; border: 1px solid #6b60cb; padding: 2rem; width: auto; background-color: #ffffff;">' +
        ' <span data-close="pop-up-wrap" class="icon-close-tool  close-pop" style="position: absolute; right: 0; top: 0; font-size: 1.3rem; color: #6b60cb;"></span>' +
        '<div class="icon" style="width: 5rem; margin-right: 1rem; position: relative;"> ' +
        '<img src="../assets/icons/avatar.svg" class="img-fluid" alt="icon">' +
        '<div class="checked-icon" style="width: 1.5rem;height: 1.5rem; background-image: url(\'../../assets/icons/checked.svg\'); border: 3px solid #ffffff;border-radius: 50%;margin-right: 1rem;position: absolute;right: -15px;bottom: 0;"></div>' +
        '</div>' +
        '<div style="display: flex; flex-direction: column">' +
        '<div class="title" style="font-size: 1.2rem;font-weight: 700;">A cool person.</div>' +
        '<div class="description" style="font-size: 1rem;font-weight: 600;">Signed up for the newsletter.</div>' +
        '<div class="time" style="font-size: 0.8rem;font-weight: 600; color: #857878;">10 mins ago</div>' +
        ' <div class="verification-text" style="font-size: 0.8rem;font-weight: 500; margin-top: 1rem"><img src="../assets/logo.png" style="width: 0.7rem;height: 0.7rem; margin-right: 0.4rem;"> Verified by EngageProof</div>' +
        '</div>' +
        ' </div> ' +
        ' </div>';
    var popup = $.parseHTML(str);
    $('#popup-preview').append(popup);
}

function createRatedPopup() {
    var str = '<div class="pop-up-wrap">' +
        '<div class="pop-up-inner" style="display: flex; align-items: center; position: relative; border: 1px solid #6b60cb; padding: 2rem; width: auto; background-color: #ffffff;">' +
        '<span data-close="pop-up-wrap" class="icon-close-tool  close-pop" style="position: absolute; right: 0; top: 0; font-size: 1.3rem; color: #6b60cb;"></span>' +
        '<div class="icon" style="width: 5rem; margin-right: 1.5rem; position: relative;"> ' +
        '<img src="../assets/icons/avatar.svg" class="img-fluid" alt="icon">' +
        '<span class="flaticon-star icons star-icon" style="color: #e3a429;background-color: #ffffff; padding: 0.1rem 0.3rem;border-radius: 50%;margin-right: 1rem;position: absolute;right: -15px;bottom: 0;"></span>' +
        '</div>' +
        '<div style="display: flex; flex-direction: column">' +
        '<div class="rating-stars" style="align-self: flex-end">' +
        '<div style="display: flex; position: relative">' +
        '<span class="flaticon-star icons star1" style="color: #ccc"></span>' +
        '<span class="flaticon-star icons star2" style="color: #ccc"></span>' +
        '<span class="flaticon-star icons star3" style="color: #ccc"></span>' +
        '<span class="flaticon-star icons star4" style="color: #ccc"></span>' +
        '<span class="flaticon-star icons star5" style="color: #ccc"></span>' +
        '<div style="display: flex; position: absolute; top: 0; bottom: 0; left: 0; right: 0; width: 50%; overflow: hidden;">' +
        '<span class="flaticon-star icons star1" style="color: #e3a429"></span>' +
        '<span class="flaticon-star icons star2" style="color: #e3a429"></span>' +
        '<span class="flaticon-star icons star3" style="color: #e3a429"></span>' +
        '<span class="flaticon-star icons star4" style="color: #e3a429"></span>' +
        '<span class="flaticon-star icons star5" style="color: #e3a429"></span>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="title" style="font-size: 1.2rem;font-weight: 700;">A cool person.</div>' +
        '<div class="description" style="font-size: 1rem;font-weight: 600;font-style: italic;">"Social proof is a 5 star product."</div>' +
        ' <div class="verification-text" style="font-size: 0.8rem;font-weight: 500; margin-top: 1rem"><img src="../assets/logo.png" style="width: 0.7rem;height: 0.7rem; margin-right: 0.4rem;"> Verified by EngageProof</div>' +
        '</div>' +
        ' </div> ' +
        ' </div>';
    var popup = $.parseHTML(str);
    $('#popup-preview').append(popup);
}

function createRateEmojiPopup() {
    var str = '<div class="pop-up-wrap">' +
        '<div class="pop-up-inner" style="display: flex; flex-direction: column; align-items: center; position: relative; border: 1px solid #6b60cb; padding: 2rem; width: auto; background-color: #ffffff;">' +
        '<span data-close="pop-up-wrap" class="icon-close-tool  close-pop" style="position: absolute; right: 0; top: 0; font-size: 1.3rem; color: #6b60cb;"></span>' +

        '<div class="title" style="font-size: 1.2rem;font-weight: 700;">Do you like our website?</div>' +
        '<div style="display: flex; margin-top: 1rem;">' +
        '<div class="emoji-wrap" data-value="angry">' +
        '<img class="img-fluid" src="../assets/icons/angry-emoji.png" alt="angry">' +
        '</div>' +
        '<div class="emoji-wrap" data-value="sad">' +
        '<img class="img-fluid" src="../assets/icons/sad.png" alt="sad">' +
        '</div>' +
        '<div class="emoji-wrap" data-value="confuse">' +
        '<img class="img-fluid" src="../assets/icons/confused-emoji.png" alt="confused">' +
        '</div>' +
        '<div class="emoji-wrap" data-value="happy">' +
        '<img class="img-fluid" src="../assets/icons/happy-emoji.png" alt=happy>' +
        '</div>' +
        '<div class="emoji-wrap" data-value="love">' +
        '<img class="img-fluid" src="../assets/icons/in-love-emoji.png" alt="in love emooji">' +
        '</div>' +
        '</div>' +
        ' <div class="verification-text" style="font-size: 0.8rem;font-weight: 500; margin-top: 1rem"><img src="../assets/logo.png" style="width: 0.7rem;height: 0.7rem; margin-right: 0.4rem;"> Verified by EngageProof</div>' +
        ' </div> ' +
        ' </div>';
    var popup = $.parseHTML(str);
    $('#popup-preview').append(popup);

    $('.emoji-wrap').each(function () {
        $(this).on('click', function () {
            $('.emoji-wrap').each(function () {
                if ($(this).hasClass('emoji-selected')) {
                    $(this).removeClass('emoji-selected');
                }
            });
            $(this).addClass('emoji-selected');
            console.log($(this).attr('data-value'));
        });
    });
}

function createBoughtPopup() {
    var str = '<div class="pop-up-wrap">' +
        '<div class="pop-up-inner" style="display: flex; align-items: center; position: relative; border: 1px solid #6b60cb; padding: 2rem; width: auto; background-color: #ffffff">' +
        ' <span data-close="pop-up-wrap" class="icon-close-tool  close-pop" style="position: absolute; right: 0; top: 0; font-size: 1.3rem; color: #6b60cb;"></span>' +
        '<div class="icon" style="width: 4rem; margin-right: 2.5rem; position: relative;"> ' +
        '<img src="../assets/icons/avatar.svg" class="img-fluid" alt="icon">' +
        '<div style="position: absolute; bottom: -20px; right: -26px;">' +
        '<div class="active-users" style="background-color: #9e65cd;display: inline-flex;border-radius: 1rem;padding: 0.2rem 0.6rem;align-items: center;">' +
        '<div class="cart-icon" style="width: 1.4rem; height: 1.4rem; background-color: #ffffff;border-radius: 50%;margin-right: 1rem;padding: 0.2rem">' +
        '<img src="../../assets/icons/supermarket.svg" alt="cart-icon" class="img-fluid">' +
        '</div>' +
        '<span class="value" style="color: #ffffff;font-weight: 800;font-size: 1.2rem;">20</span>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div style="display: flex; flex-direction: column">' +
        '<div class="title" style="font-size: 1.2rem;font-weight: 700;">People bought the product.</div>' +
        '<div class="time" style="font-size: 0.8rem;font-weight: 600; color: #857878;">in the last 2 hours</div>' +
        ' <div class="verification-text" style="font-size: 0.8rem;font-weight: 500; margin-top: 1rem"><img src="../assets/logo.png" style="width: 0.7rem;height: 0.7rem; margin-right: 0.4rem;"> Verified by EngageProof</div>' +
        '</div>' +
        ' </div> ' +
        ' </div>';
    var popup = $.parseHTML(str);
    $('#popup-preview').append(popup);
}

function createRateNumberPopup() {
    var str = '<div class="pop-up-wrap">' +
        '<div class="pop-up-inner" style="display: flex; align-items: center; position: relative; border: 1px solid #6b60cb; padding: 2rem; width: auto; background-color: #ffffff;">' +
        ' <span data-close="pop-up-wrap" class="icon-close-tool  close-pop" style="position: absolute; right: 0; top: 0; font-size: 1.3rem; color: #6b60cb;"></span>' +
        '<div class="icon" style="width: 4rem; margin-right: 1rem; position: relative;"> ' +
        '<img src="../assets/icons/emoticons.svg" class="img-fluid" alt="icon">' +
        '</div>' +
        '<div style="display: flex; flex-direction: column">' +
        '<div class="title" style="font-size: 1.2rem;font-weight: 700;">How\'d you like our website?</div>' +
        '<div class="description" style="font-size: 1rem;font-weight: 600;">Rate from 1 to 5.5 being excellent.</div>' +
        '<div class="rate-numbers" style="display: flex; margin-top: 0.5rem;">' +
        '<div data-value="1" class="rate-value">1</div>' +
        '<div data-value="2" class="rate-value">2</div>' +
        '<div data-value="3" class="rate-value">3</div>' +
        '<div data-value="4" class="rate-value">4</div>' +
        '<div data-value="5" class="rate-value">5</div>' +
        '</div>' +
        ' <div class="verification-text" style="font-size: 0.8rem;font-weight: 500; margin-top: 1rem"><img src="../assets/logo.png" style="width: 0.7rem;height: 0.7rem; margin-right: 0.4rem;"> Verified by EngageProof</div>' +
        '</div>' +
        ' </div> ' +
        ' </div>';
    var popup = $.parseHTML(str);
    $('#popup-preview').append(popup);

    $('.rate-value').each(function () {
        $(this).on('click', function () {
            $('.rate-value').each(function () {
                if ($(this).hasClass('rate-value-selected')) {
                    $(this).removeClass('rate-value-selected');
                }
            });
            $(this).addClass('rate-value-selected');
            console.log($(this).attr('data-value'));
        });
    });
}

function createSharePopup() {
    var str = '<div class="pop-up-wrap">' +
        '<div class="pop-up-inner" style="display: flex; align-items: center; position: relative; border: 1px solid #6b60cb; padding: 2rem; width: auto; background-color: #ffffff;">' +
        ' <span data-close="pop-up-wrap" class="icon-close-tool  close-pop" style="position: absolute; right: 0; top: 0; font-size: 1.3rem; color: #6b60cb;"></span>' +
        '<div class="icon" style="width: 5rem; margin-right: 1rem"> ' +
        '<img src="../assets/icons/smileys.svg" class="img-fluid" alt="icon">' +
        '</div>' +
        '<div style="display: flex; flex-direction: column">' +
        '<div class="title" style="font-size: 1.2rem;font-weight: 700;">Tell your friends</div>' +
        '<div class="rate-numbers" style="display: flex; margin-top: 0.5rem;margin-bottom: 0.5rem">' +
        '<a href="#" class="social-name facebook">Facebook</a>' +
        '<a href="#" class="social-name twitter">Twitter</a>' +
        '<a href="#" class="social-name linkedin">Linkedin</a>' +
        '</div>' +
        '<div class="description" style="font-size: 1rem;font-weight: 600;">We appreciate all the shares to support us,Thank you.</div>' +
        ' <div class="verification-text" style="font-size: 0.8rem;font-weight: 500;"><img src="../assets/logo.png" style="width: 0.7rem;height: 0.7rem; margin-right: 0.4rem;"> Verified by EngageProof</div>' +
        '</div>' +
        ' </div> ' +
        ' </div>';
    var popup = $.parseHTML(str);
    $('#popup-preview').append(popup);
}

function createNewsletterPopup() {
    var str = '<div class="pop-up-wrap">' +
        '<div class="pop-up-inner" style="display: flex; align-items: center; position: relative; border: 1px solid #6b60cb; padding: 2rem; width: auto; background-color: #ffffff;">' +
        ' <span data-close="pop-up-wrap" class="icon-close-tool  close-pop" style="position: absolute; right: 0; top: 0; font-size: 1.3rem; color: #6b60cb;"></span>' +
        '<div class="icon" style="width: 5rem; margin-right: 1rem; position:relative;"> ' +
        '<img src="../assets/icons/avatar.svg" class="img-fluid" alt="icon">' +
        '<span class="flaticon-add icons star-icon" style="color: #e3a429;background-color: #ffffff; padding: 0.1rem 0.3rem;border-radius: 50%;margin-right: 1rem;position: absolute;right: -22px;bottom: -8px;"></span>' +
        '</div>' +
        '<div style="display: flex; flex-direction: column">' +
        '<div class="title" style="font-size: 1.3rem;font-weight: 700;">Sign up</div>' +
        '<div class="description" style="font-size: 1rem;font-weight: 600;margin-top: 1rem;">We will not send any spam email and you can unsubscribe anytime.</div>' +
        '<div class="popup-form-wrap">' +
        '<input type="email" class="form-control popup-input" placeholder="Enter your primary email address">' +
        '<button class="btn btn-popup-signup">Sign up</button>' +
        '</div>' +
        ' <div class="verification-text" style="font-size: 0.8rem;font-weight: 500;"><img src="../assets/logo.png" style="width: 0.7rem;height: 0.7rem; margin-right: 0.4rem;"> Verified by EngageProof</div>' +
        '</div>' +
        ' </div> ' +
        ' </div>';
    var popup = $.parseHTML(str);
    $('#popup-preview').append(popup);
}

function createContactPopup() {
    var str = '<div class="pop-up-wrap">' +
        '<div class="pop-up-inner" style="display: flex; align-items: center; position: relative; border: 1px solid #6b60cb; padding: 2rem; width: auto; background-color: #ffffff;">' +
        ' <span data-close="pop-up-wrap" class="icon-close-tool  close-pop" style="position: absolute; right: 0; top: 0; font-size: 1.3rem; color: #6b60cb;"></span>' +
        '<div class="icon" style="width: 5rem; margin-right: 3rem; position: relative;"> ' +
        '<img src="../assets/icons/avatar.svg" class="img-fluid" alt="icon">' +
        '<div style="display: flex; flex-direction: column; background-color: #e4dfdf; position: absolute; bottom: -25px; right: -30px; border-radius: 0.5rem; padding: 0.4rem 0.6rem; ">' +
        '<div style="font-size: 0.5rem; color: #ecb612">SUPPORT TEAM</div>' +
        '<div class="support-name" style="font-size: 0.8rem; margin-top: -5px;">Austin Ejem</div>' +
        '</div>' +
        '</div>' +
        '<div style="display: flex; flex-direction: column">' +
        '<div class="title" style="font-size: 1.3rem;font-weight: 700;">Any questions?</div>' +
        '<div class="description" style="font-size: 1rem;font-weight: 600;margin-top: 1rem;">Let us know and we\'ll get back to you.</div>' +
        '<div class="popup-form-wrap">' +
        '<input type="email" class="form-control popup-input" >' +
        '<button class="btn btn-popup-call">Call me back</button>' +
        '</div>' +
        ' <div class="verification-text" style="font-size: 0.8rem;font-weight: 500;"><img src="../assets/logo.png" style="width: 0.7rem;height: 0.7rem; margin-right: 0.4rem;"> Verified by EngageProof</div>' +
        '</div>' +
        ' </div> ' +
        ' </div>';
    var popup = $.parseHTML(str);
    $('#popup-preview').append(popup);
}

function createDemoPopup() {
    var str = '<div class="pop-up-wrap">' +
        '<div class="pop-up-inner" style="display: flex; align-items: center; position: relative; border: 1px solid #6b60cb; padding: 2rem; width: auto; background-color: #ffffff; background-color: #ffffff;">' +
        ' <span data-close="pop-up-wrap" class="icon-close-tool  close-pop" style="position: absolute; right: 0; top: 0; font-size: 1.3rem; color: #6b60cb;"></span>' +
        '<div class="icon" style="width: 22rem; margin-right: 1rem"> ' +
        '<iframe class="demo-video" width="100%" height="auto" src="https://www.youtube.com/embed/cBphblC759M" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' +
        '</div>' +
        '<div style="display: flex; flex-direction: column">' +
        '<div class="title" style="font-size: 1.3rem;font-weight: 700;">Demo of the product.</div>' +
        '<div class="description" style="font-size: 1rem;font-weight: 600;margin-top: 1rem;">We do not send any spam email and you can unsubscribe anytime.</div>' +
        '<div class="popup-form-wrap">' +
        '<input type="email" class="form-control popup-input" >' +
        '<button class="btn btn-popup-signup">Sign up</button>' +
        '</div>' +
        ' <div class="verification-text" style="font-size: 0.8rem;font-weight: 500;"><img src="../assets/logo.png" style="width: 0.7rem;height: 0.7rem; margin-right: 0.4rem;"> Verified by EngageProof</div>' +
        '</div>' +
        ' </div> ' +
        ' </div>';
    var popup = $.parseHTML(str);
    $('#popup-preview').append(popup);
}

function createCountDownPopup(time) {
    var str = '<div class="pop-up-wrap">' +
        '<div class="pop-up-inner" style="display: flex; align-items: center; position: relative; border: 1px solid #6b60cb; padding: 2rem; width: auto; background-color: #ffffff; background-color: #ffffff;">' +
        ' <span data-close="pop-up-wrap" class="icon-close-tool  close-pop" style="position: absolute; right: 0; top: 0; font-size: 1.3rem; color: #6b60cb;"></span>' +
        '<div class="d-flex flex-column" style="width: 8rem">' +
        '<div class="icon" style="width: 6rem; margin-right: 1rem"> ' +
        '<img src="../assets/icons/timer.svg" class="img-fluid" alt="icon">' +
        '</div>' +
        ' <div class="verification-text" style="font-size: 0.8rem;font-weight: 500;margin-top: 1rem;"><img src="../assets/logo.png" style="width: 0.7rem;height: 0.7rem; margin-right: 0.4rem;"> Verified by EngageProof</div>' +
        '</div>' +
        '<div style="display: flex; flex-direction: column">' +
        '<div class="title" style="font-size: 1.3rem;font-weight: 700;">Building a website.</div>' +
        '<small class="text-dark">free webinar by us</small>' +
        '<div class="description" style="font-size: 1rem;font-weight: 600;margin-top: 0.5rem; text-decoration: underline;">Hurry up registeration is closing soon.</div>' +
        '<div class="timer" style="display: flex; margin-top: 0.5rem;">' +
        '<div class="time-wrap">' +
        '<div class="day-value">0</div>' +
        '<div class="time-desc">Day</div>' +
        '</div>' +
        '<div class="time-wrap">' +
        '<div class="hour-value">0</div>' +
        '<div class="time-desc">Hour</div>' +
        '</div>' +
        '<div class="time-wrap">' +
        '<div class="minute-value">0</div>' +
        '<div class="time-desc">Minutes</div>' +
        '</div>' +
        '<div class="time-wrap">' +
        '<div class="second-value">0</div>' +
        '<div class="time-desc">Seconds</div>' +
        '</div>' +
        '</div>' +
        '<div class="popup-form-wrap">' +
        '<input type="email" class="form-control popup-input" >' +
        '<button class="btn btn-popup-signup">Sign up</button>' +
        '</div>' +
        '</div>' +
        ' </div> ' +
        ' </div>';
    var popup = $.parseHTML(str);
    startTimer("May 29, 2020 22:51:25");
    $('#popup-preview').append(popup);
}

function startTimer(date) {

    // Set the date we're counting down to
    var countDownDate = new Date(date).getTime();


    // Update the count down every 1 second
    var x = setInterval(function () {

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;
        if (distance < 0) {
            clearInterval(x);
            $('.timer').html('EXPIRED');
        };

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        // document.getElementById("demo").innerHTML = days + "d " + hours + "h " +
        //     minutes + "m " + seconds + "s ";
        $('.day-value').text(days);
        $('.hour-value').text(hours);
        $('.minute-value').text(minutes);
        $('.second-value').text(seconds);


        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            $('.timer').html('CLOSED');
            $('.timer').css({
                'alignSelf': 'center',
                'color': 'red',
                'fontSize': '1.4rem',
                'fontWeight': '700',
                'animation': 'flash 1s infinite alternate'
            });
        }
    }, 1000);
}