/**
 * Search suggesttion
 *
 * @author Ngoc Linh Pham <pnlinh1207@gmail.com>
 * @since 2019
 * @licence FPT Long Chau
 */

const SEARCH_TIME_OUT = 500;
const PRODUCTS = [0, 3, 5, 6, 7];
const POSTS = [1];
const DISEASES = [2];

// Define for search history
const SEARCH_HISTORY_LOCAL_STORAGE_KEY = 'keywords-history';
const MAX_SIZE_SEARCH_HISTORY = 10;

// Define min length for search suggesttion
const MIN_LENGTH_SEARCH = 2;
const MAX_LENGTH_SEARCH = 250;

// Define max lenghth for search history
const MAX_LENGTH_INPUT_ON_MOBILE = 45;
const MAX_LENGTH_INPUT_ON_DESKTOP = 80;

// Detect Mobile Browser
function isMobile() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

function formatPrice(str) {
    if (str == null) {
        return '0';
    }

    str = typeof str != 'string' ? str.toString() : parseFloat(str).toString();

    return str.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}

function trimSpace(string) {
    return string.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g, "").replace(/\s+/g, " ");
}

function trimSpecialCharacter(string) {
    return string.replace(/[!@$%^*()+=<>?\/,.:' "&#\[]/g, ' ');
}

function highlight(match, keyword) {
    keyword = trimSpace(keyword);
    keyword = keyword.split(' ').join('|');
    var matcher = new RegExp('(' + keyword + ')', 'gi');
    return match.replace(matcher, "<em class='highlight'>$1</em>");
}

function showImage(image) {
    var regex = new RegExp('(thuoc.png)', 'g');
    if (regex.exec(image)) {
        return '';
    }

    return image;
}

function bindEventClickLiElement() {
    $('.lch-suggest-text, .lch-suggest-his, .lch-suggest-cate').find('li').on('click', function (e) {
        var aEl = $(this).find('a');
        
        window.location.href = aEl.attr('href');
    })
}

function getDataFromES(term, type) {
    term = $.trim(trimSpecialCharacter(term));

    if (term.length >= MIN_LENGTH_SEARCH && term.length <= MAX_LENGTH_SEARCH) {
        $.ajax({
            url: window.location.origin + '/api/suggestion',
            type: 'GET',
            data: {
                term: term,
                type: type
            },
            success: function (response) {
                try {
                    var html = '';
                    if (response.keywords && response.keywords.length > 0) {
                        html += showKeywords();
                    }

                    if (response.categories && response.categories.length > 0) {
                        html += showCategories();
                    }

                    if (response.posts && response.posts.length > 0) {
                        html += showPosts();
                    }

                    if (response.products && response.products.length > 0) {
                        html += showProducts();
                    }

                    if ('' === html) {
                        $('.lch-search-suggestion').hide();
                        $('#result').hide();
                    }

                    if ('' !== html) {
                        // Show keywords, categories
                        $('.lch-search-suggestion-inner').html(html);
                        $('.lch-search-suggestion').show();
                        // Hide search history
                        $('.lch-search-suggestion-history').hide();
                        $('#result').show();
                    }

                    function showPrice(product) {
                        // console.log(product);

                        if( product.is_show_price == true ){
                            return `${formatPrice(product.price)}đ`;
                        }else {
                            return '';
                        }

                        // if (3 == product.cate_id || -1 == product.price || 1 == product.is_price_off || product.cate_id == null) {
                        //     return '';
                        // }

                        // return `${formatPrice(product.price)}đ`;
                    }

                    function showProducts() {
                        var stringProducts = response.products.map(function (product) {
                            var activeClass = ('' === showImage(product.image)) ? 'no-img' : 'has-img';
                            var price = showPrice(product);

                            return `
                                <li>
                                    <a href="${product.url}">
                                        <div class="suggest-product-item ${activeClass}">
                                            <p class="product-img">
                                                <img src="${showImage(product.image)}" alt="${product.name}">
                                            </p>
                                            
                                            <div class="product-text">
                                                <h3>
                                                    ${highlight(product.name, term)}
                                                    <div class="price price-desk">${price}</div>
                                                </h3>
                                                <p>
                                                    <span class="cate">${product.cate_name}</span>
                                                    <span class="qc">${product.specification}</span>
                                                </p>
                                                
                                                <div class="info-mobile clearfix">
                                                    <div class="price">${price}</div>
                                                    <span class="qc">${product.specification}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </li>`;
                        }).join('');

                        return `
                            <div class="lch-suggest-section lch-suggest-product">
                                <div class="suggest-title">Sản phẩm được tìm nhiều</div>
                                    <ul>${stringProducts}</ul>
                            </div>`;
                    }

                    function showPosts() {
                        var stringPosts = response.posts.map(function (post) {
                            var image = ``;
                            if (POSTS.indexOf(post.type) >= 0) {
                                image = `<p class="post-img"><img src="${showImage(post.image)}" alt="${post.title}"></p>`;
                            } else {
                                image = ``;
                            }

                            return `
                                <li>
                                    <a href="${post.url}">
                                        <div class="suggest-post-item has-img">
                                            ${image}
                                            
                                            <div class="post-text">
                                                <h3>${highlight(post.title, term)}</h3>
                                                <p>${post.short_description}</p>
                                            </div>
                                        </div>
                                    </a>
                                </li>`;
                        }).join('');

                        return `
                        <div class="lch-suggest-section lch-suggest-post">
                            <div class="suggest-title">Bài viết được tìm nhiều</div>
                            <ul>${stringPosts}</ul>
                        </div>`;
                    }

                    function showKeywords() {
                        var stringKeywords = response.keywords.map(function (keyword) {
                            return `<li><a href="${keyword.url}">${highlight(keyword.name, term)}</a></li>`;
                        }).join('');

                        return `
                        <div class="lch-suggest-section lch-suggest-text">
                            <ul>${stringKeywords}</ul>
                        </div>`;
                    }

                    function showCategories() {
                        var stringCategories = response.categories.map(function (category) {
                            return `
                            <li>
                                <a href="${category.url}">
                                    <span class="sub-cate hightText">${category.name}</span> trong 
                                    <span class="cate hightText">${category.cate_name}</span>
                                </a>
                            </li>`;
                        }).join('');

                        return `
                        <div class="lch-suggest-section lch-suggest-cate">
                            <ul>${stringCategories}</ul>
                        </div>`;
                    }
                } catch (err) {
                    console.log(err);
                }

                bindEventClickLiElement();
            },
            error: function (err) {
                console.log('Cannot xhr request');
                console.log(err);
            },
            statusCode: {
                404: function() {
                    console.log('Route not found');
                },
                500: function () {
                    console.log('500 Internal server error');
                }
            }
        });
    }
}

const Search = function () {
    var $inputFormSearch = $('#input-main');
    var $btnSubmitFormSearch = $('.lch-search-btn');
    var $optionType = $('input[name="loai"]');
    var $searchSuggesttionResult = $('.lch-search-suggestion');
    var $formSearch = $('#form-search');
    var $result = $('#result');
    var $closeSearchIcon = $('#close-icon');
    var timeOut = null;

    function searchSuggest() {
        $inputFormSearch.on('keyup', function (e) {
            if (e.which === 38 || e.which === 40 || e.which === 37 || e.which === 39) {
                return false;
            }

            clearTimeout(timeOut);

            e.preventDefault();
            var term = $(this).val();
            var type = $optionType.val();

            if (term === '') {
                $searchSuggesttionResult.hide();
                $closeSearchIcon.hide();
            } else {
                $closeSearchIcon.show();

                $closeSearchIcon.on('click', function () {
                    $(this).hide();
                    $searchSuggesttionResult.hide();
                    $inputFormSearch.val('').focus();
                });
            }

            timeOut = setTimeout(function () {
                getDataFromES(term, type);
            }, SEARCH_TIME_OUT);
        });
    }

    function handleValidateInputFormSearch() {
        $btnSubmitFormSearch.on('click', function () {
            if (0 === $inputFormSearch.val().length) {
                alert('Bạn chưa nhập từ khóa tìm kiếm !');
                $inputFormSearch.focus();

                return false;
            }
        });
    }

    function handleHideResultWhenClickOutSideSearchBox() {
        $(document).on('click', function (e) {
            if ($(e.target).attr('id') !== 'result') {
                $result.hide();
            }

            if ($(e.target).attr('id') === 'input-main') {
                $result.show();
            }
        });
    }

    function handleChangeTypeValue() {
        $('.c-dropdown__item').on('click', function () {
            var before = $(this).attr('data-dropdown-value');
            var after = $('.c-dropdown__item.active').attr('data-dropdown-value');

            console.log(before, after);

            $optionType.val(before);

            if (before !== undefined) {
                if ($inputFormSearch.val().length > 0) {
                    getDataFromES($inputFormSearch.val(), before);
                }
            }
        });
    }

    function showHistoryKeywords() {
        $inputFormSearch.on('click keyup', function () {
            if (0 === $inputFormSearch.val().length) {
                var keywords = JSON.parse(window.localStorage.getItem(SEARCH_HISTORY_LOCAL_STORAGE_KEY)) || [];

                if (keywords.length > 0) {
                    var keywordsString = keywords.map(function (keyword) {
                        return `<li><a href="${keyword.url}">${keyword.title}</a></li>`;
                    }).join('');

                    var html = `
                        <div class="lch-suggest-section lch-suggest-his">
                            <div class="suggest-title">Lịch sử tìm kiếm
                                <span id="clear-search-history">Xóa</span>
                            </div>
                            
                            <ul>${keywordsString}</ul>
                        </div>`;

                    $('.lch-search-suggestion-history').html(html).show();
                    $('.lch-search-suggestion').hide();

                    bindEventClickLiElement();
                }
            }
        })
    }

    function saveKeywordToLocalStorage()
    {
        $formSearch.on('submit', function (e) {
            var title = $inputFormSearch.val();
            var type = $optionType.val();
            var url = `/tim-kiem?s=${title}&loai=${type}`;

            if (0 === title.trim().length) {
                return;
            }

            if (isMobile() && title.length >= MAX_LENGTH_INPUT_ON_MOBILE) {
                title = title.formatSearchInput(MAX_LENGTH_INPUT_ON_MOBILE);
            }

            if (!isMobile() && title.length >= MAX_LENGTH_INPUT_ON_DESKTOP) {
                title = title.formatSearchInput(MAX_LENGTH_INPUT_ON_DESKTOP);
            }

            var data = {
                title,
                url
            };

            // Parse the serialized data back into an aray of objects
            var keywords = JSON.parse(window.localStorage.getItem(SEARCH_HISTORY_LOCAL_STORAGE_KEY)) || [];
            // Push the new data, very important
            keywords.unshift(data);

            // Check max size
            if (keywords.length > MAX_SIZE_SEARCH_HISTORY) {
                keywords.splice(MAX_SIZE_SEARCH_HISTORY);
            }

            // Re-serialize the array back into a string and store it in localStorage
            window.localStorage.setItem(SEARCH_HISTORY_LOCAL_STORAGE_KEY, JSON.stringify(keywords));
        });
    }

    function clearSearchHistory() {
        $(document).on('click', '#clear-search-history', function () {
            window.localStorage.removeItem(SEARCH_HISTORY_LOCAL_STORAGE_KEY);
            $('.lch-suggest-his').empty().html('');
            $('.lch-search-suggestion-history').hide();

            console.log('Clear search history OK');
        });
    }

    // Inject custom method to String class
    String.prototype.formatSearchInput = function (end) {
        return this.slice(0, end) + '...';
    };

    return {
        init() {
            // Handle search input
            handleValidateInputFormSearch();
            handleHideResultWhenClickOutSideSearchBox();
            handleChangeTypeValue();
            // Search history
            saveKeywordToLocalStorage();
            showHistoryKeywords();
            clearSearchHistory();
            // Search
            searchSuggest();

            console.log('App Search is loaded');
        }
    }
}();

Search.init();
