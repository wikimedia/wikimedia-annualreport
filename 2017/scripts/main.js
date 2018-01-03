'use strict';

(function ($, window, document) {
  /**
   * This is a description for Wikimedia object.
   *
   * @namespace Wikimedia
   * @author Mangrove Web Development
   */

  var Wikimedia = {

    /**
     * Initialize object
     * @function init
     * @memberof Wikimedia
     */

    init: function init() {
      this.cache();
      this.events();
      this.initHeadroom();
      this.initWaypoints();
      this.scrollToHash();
    },


    /**
     * Cache reusable data
     * @function cache
     * @memberof Wikimedia
     */

    cache: function cache() {
      this.$win = $(window);
      this.$doc = $(document);
      this.$html = $('html');
      this.$body = $('body');
      this.$mainWrap = $('main');
      this.$header = $('.js-header');
      this.$mobileNav = $('.js-mobile-nav');
      this.$hamburger = $('.js-hamburger');
    },


    /**
     * Attach event listeners
     * @function events
     * @memberof Wikimedia
     */

    events: function events() {
      var _this = this;

      this.$doc.on('click', '.js-hamburger', function (event) {
        return _this.showMobileNav(event);
      });

      this.$doc.on('mouseover', '.js-imagine', function (event) {
        return _this.imagineBg(event);
      });

      this.$doc.on('mouseleave', '.js-imagine-header', function (event) {
        return _this.imagineBgLeave(event);
      });

      this.$doc.on('mouseleave', '.js-pie-chart', function (event) {
        return _this.hideTooltip(event);
      });

      this.$doc.on('click', '.js-close-tooltip', function (event) {
        return _this.hideTooltip(event);
      });

      this.$doc.on('click', '[data-scroll-to]', function (event) {
        return _this.scrollToSection(event);
      });

      this.$doc.on('click', '.js-read-more', function (event) {
        return _this.readMore(event);
      });

      this.$doc.on('click', '.js-share', function (event) {
        return _this.openShareWindow(event);
      });

      if ($('.hero').length) {
        this.$win.on('scroll', function (event) {
          return _this.heroScroll(event);
        });
      }

      if ($('.js-heading-fade').length) {
        this.$win.on('scroll', function (event) {
          return _this.headingScroll(event);
        });
      }

      //if (Modernizr.touchevents) {
      this.$doc.on('click', '.js-nav-parent', function (event) {
        return _this.displaySubnav(event);
      });
      //}
    },
    displaySubnav: function displaySubnav(e) {
      e.preventDefault();
      $('.nav--sub').toggleClass('is-active');
      return false;
    },
    headingScroll: function headingScroll(e) {
      var opacity = 1 - (this.$win.scrollTop() - $('.js-heading-fade').offset().top + 200) / 150;
      $('.js-heading-fade').css('opacity', opacity);
    },
    heroScroll: function heroScroll(e) {
      var opacity = 1 - this.$win.scrollTop() / 250;
      $('.hero__base').css('opacity', opacity);
      $('.hero__scroll').css('opacity', opacity);
      $('.js-heading-fade').css('opacity', opacity);
    },
    openShareWindow: function openShareWindow(e) {
      var link = $(e.currentTarget).attr('href');
      if (link.substr(0, 6) != 'mailto') {
        e.preventDefault();
        var openWindow = window.open(link, '', 'width=600, height=400');
        openWindow.opener = null;
      }
    },
    readMore: function readMore(e) {
      e.preventDefault();
      var el = $(e.currentTarget);
      el.text(function (i, text) {
        return text === 'Read more' ? 'Read less' : 'Read more';
      });
      el.closest('div.stories__text').toggleClass('is-active');
    },
    scrollToSection: function scrollToSection(e) {
      var el = $(e.currentTarget);
      var section = el.data('scroll-to');

      if (section) {
        $('html, body').animate({
          scrollTop: $('#' + section).offset().top
        }, 2000);

        this.$mobileNav.removeClass('is-active');
        this.$hamburger.removeClass('is-active');
        this.$body.removeClass('has-nav');
      }
    },
    scrollToHash: function scrollToHash() {
      var param = document.location.hash;
      if (param) {
        $('html, body').animate({
          scrollTop: $(param).offset().top
        }, 2000);

        this.$mobileNav.removeClass('is-active');
        this.$hamburger.removeClass('is-active');
        this.$body.removeClass('has-nav');
      }
      return false;
    },
    hideTooltip: function hideTooltip() {
      $('.js-tooltip').hide().removeClass('is-active');
      this.$body.removeClass('has-tooltip');
    },
    displayTooltip: function displayTooltip(e, showTooltip) {
      e.preventDefault();
      var el = $(e.target);
      var tooltip = document.querySelector('.js-tooltip-' + el.data('tooltip'));

      if (showTooltip) {
        $('.js-tooltip').hide();
        $(tooltip).show();
        var x = e.clientX;
        var y = e.clientY;
        tooltip.style.top = y + 20 + 'px';
        tooltip.style.left = e.pageX + tooltip.clientWidth < document.body.clientWidth ? x + 20 + 'px' : document.body.clientWidth - tooltip.clientWidth + 'px';
      } else {
        $('.js-tooltip').hide();
        this.$body.addClass('has-tooltip');
        $(tooltip).show().addClass('is-active');
      }
      return false;
    },
    imagineBgLeave: function imagineBgLeave() {
      $('.js-imagine, .imagine__bg, .imagine__content').removeClass('is-active is-hidden');
    },
    imagineBg: function imagineBg(event) {
      var el = $(event.currentTarget);
      $('.js-imagine').removeClass('is-active').addClass('is-hidden');
      el.removeClass('is-hidden').addClass('is-active');
      var bg_img = el.data('image');
      $('.imagine__bg').removeClass('is-active');
      $('.imagine__content').addClass('is-active');
      $(bg_img).addClass('is-active');
    },
    initHeadroom: function initHeadroom() {
      var headroom = new Headroom(document.querySelector('.js-header'), {
        'offset': 0,
        'tolerance': 10
      });
      headroom.init();
    },
    showMobileNav: function showMobileNav(event) {
      event.preventDefault();
      this.$mobileNav.toggleClass('is-active');
      this.$hamburger.toggleClass('is-active');
      this.$body.toggleClass('has-nav');
    },
    initWaypoints: function initWaypoints() {

      if ($('.js-hero-home').length) {

        var heroText = new Waypoint({
          element: document.querySelector('.js-hero-home'),
          handler: function handler() {
            anime({
              targets: ['#text-mask tspan'],
              opacity: [0, 1],
              x: document.body.clientWidth < 700 ? ['-15%', '7%'] : ['-15%', '10%'],
              offset: 500,
              easing: 'easeOutExpo',
              duration: 2000,
              delay: function delay(element, index) {
                return index * 400;
              }
            });
            this.destroy();
          },

          offset: '60%'
        });

        var heroAllOfUs = new Waypoint({
          element: document.querySelector('.js-hero-home'),
          handler: function handler() {
            anime({
              targets: ['.hero__svg tspan'],
              opacity: [0, 1],
              offset: 500,
              easing: 'easeOutExpo',
              duration: 2000,
              delay: function delay(element, index) {
                return 200;
              }
            });
            this.destroy();
          },

          offset: '60%'
        });
      }

      if ($('.bricks__text--desktop').length && document.body.clientWidth > 700) {
        var bubbles = new Waypoint({
          element: document.querySelector('.bricks-svg'),
          handler: function handler() {
            var bricksTimeline = anime.timeline();
            bricksTimeline.add({
              targets: ['.billions-letter-group'],
              opacity: [0, 1],
              translateX: [-100, 0],
              duration: 700,
              offset: 400,
              easing: 'easeOutBack',
              delay: function delay(element, index) {
                return index * 400;
              }
            }).add({
              targets: ['.billions-letter-group-last'],
              opacity: [0, 1],
              translateX: [100, 0],
              duration: 700,
              easing: 'easeOutBack',
              offset: 3500
            }).add({
              targets: ['.bricks-mask'],
              duration: 5000,
              offset: 100,
              opacity: {
                value: [0, 1],
                duration: 500
              },
              easing: 'easeOutQuint',
              translateY: ['-250%', 0],
              translateX: ['-250%', 0]
            });
            this.destroy();
          },

          offset: "90%"
        });
      }
      if ($('.bricks__text--mobile').length && document.body.clientWidth < 700) {
        var _bubbles = new Waypoint({
          element: document.querySelector('.bricks__text--mobile'),
          handler: function handler() {
            var bricksTimeline = anime.timeline();
            bricksTimeline.add({
              targets: ['.billions-letter-group'],
              opacity: [0, 1],
              translateX: [-100, 0],
              duration: 700,
              offset: 400,
              easing: 'easeOutBack',
              delay: function delay(element, index) {
                return index * 400;
              }
            }).add({
              targets: ['.billions-letter-group-last'],
              opacity: [0, 1],
              translateX: [100, 0],
              duration: 700,
              easing: 'easeOutBack'
            }).add({
              targets: ['.bricks-mask-mobile'],
              duration: 7000,
              offset: 100,
              opacity: {
                value: [0, 1],
                duration: 500
              },
              easing: 'easeOutQuint',
              translateY: ['-250%', 0],
              translateX: ['-250%', 0]
            });

            this.destroy();
          },

          offset: '89%'
        });
      }

      if ($('.we-are').length) {
        var _bubbles2 = new Waypoint({
          element: document.querySelector('.we-are'),
          handler: function handler() {
            var bubblesTimeline = anime.timeline();

            bubblesTimeline.add({
              targets: ['#we-are-arrow'],
              points: {
                value: '906.486 168.81 -1 168.81 -1 447.61 67.68 447.61 67.68 237.49 906.486 237.49 906.486 328.31 1031.606 203.15 906.486 77.99'
              },
              duration: 1000,
              easing: 'easeOutExpo'
            }).add({
              targets: ['.js-bubbles .circle'],
              scale: [0.8, 1],
              duration: 500,
              offset: 200,
              easing: 'easeOutExpo',
              delay: function delay(element, index) {
                return index * 150;
              }
            }).add({
              targets: ['.js-bubbles .bubbles-arrow'],
              rotateZ: '7deg',
              translateY: [-30, 20],
              opacity: [0, 1],
              duration: 2000,
              offset: 500
            }).add({
              targets: ['#bubbles-lines path', '#bubbles-lines-mobile path'],
              strokeDashoffset: [1400, 2800],
              easing: 'linear',
              duration: 500,
              offset: 500,
              delay: function delay(el, i) {
                return i * 150;
              }
            }).add({
              targets: ['#bubbles-lines-2 path', '#bubbles-lines-mobile-2 path'],
              strokeDashoffset: [anime.setDashoffset, 0],
              easing: 'easeOutQuint',
              duration: 500,
              offset: 1000,
              delay: function delay(el, i) {
                return i * 150;
              }
            });

            this.destroy();
          },

          offset: '90%'
        });
      }

      if ($('.js-heading').length) {
        var internalHeadings = document.getElementsByClassName('js-heading');

        for (var i = 0; i < internalHeadings.length; i++) {
          new Waypoint({
            element: internalHeadings[i],
            handler: function handler() {
              anime({
                targets: this.element,
                translateX: [-20, 0],
                opacity: [0, 1],
                duration: 500,
                easing: 'easeOutSine'
              });
              this.destroy();
            },
            continuous: true,
            offset: '50%'
          });
        }
      }

      if ($('.visits').length) {

        var visits = new Waypoint({
          element: document.querySelector('.visits'),
          handler: function handler() {
            var visitsTimeline = anime.timeline();
            var burstPaths = $('.js-burst path:nth-child(even)');

            visitsTimeline.add({
              targets: ['.js-visits-number .zeros'],
              opacity: [0, 1],
              translateY: [100, 0],
              easing: 'easeOutQuint',
              duration: 1000,
              delay: function delay(element, index) {
                return index * 500;
              }
            }).add({
              targets: ['.js-visits-desc span'],
              opacity: [0, 1],
              scale: [.9, 1],
              easing: 'easeOutQuint',
              duration: 750,
              offset: 1700,
              delay: function delay(el, i) {
                return i * 250;
              }
            }).add({
              targets: ['.js-burst'],
              opacity: .75,
              easing: 'linear',
              offset: 400
            }).add({
              targets: ['.js-burst .burst'],
              easing: 'easeOutQuint',
              duration: 90000,
              offset: 500,
              strokeDashoffset: [anime.setDashoffset, 0]
            });
            this.destroy();
          },

          offset: '60%'
        });
      }

      if ($('.js-visits-circle').length) {

        var burstCircles = new Waypoint({
          element: document.querySelector('.js-visits-circle'),
          handler: function handler() {
            anime({
              targets: ['.js-visits-circle div'],
              scale: [.7, 1],
              easing: 'easeInOutBack',
              duration: 1000
            });
            this.destroy();
          },

          offset: '60%'
        });
      }

      if ($('.new-articles').length) {

        var articles = new Waypoint({
          element: document.querySelector('.new-articles'),
          handler: function handler() {
            var articlesTimeline = anime.timeline();
            var articlesObject = {
              articlesTotal: 1
            };

            articlesTimeline.add({
              targets: ['.js-articles span'],
              opacity: [0, 1],
              translateY: [100, 0],
              easing: 'easeOutQuint',
              duration: 750,
              delay: function delay(el, i) {
                return i * 250;
              },
              offset: 200
            }).add({
              targets: articlesObject,
              articlesTotal: 5,
              round: 1,
              duration: 1000,
              easing: 'linear',
              offset: 200,
              update: function update() {
                var el = document.querySelector('.js-new-articles');
                el.innerHTML = articlesObject.articlesTotal;
              }
            }).add({
              targets: ['.js-arrow-big'],
              easing: 'easeOutQuint',
              translateY: [500, 0],
              opacity: [0, 1],
              offset: 200,
              duration: 1000
            }).add({
              targets: ['.js-new-articles-desc'],
              easing: 'easeOutQuint',
              translateX: [100, 0],
              opacity: [0, 1],
              offset: 200,
              duration: 1000
            });

            this.destroy();
          },

          offset: '25%'
        });
      }

      if ($('.countries').length) {

        var countries = new Waypoint({
          element: document.querySelector('.countries'),
          handler: function handler() {
            var countriesTimeline = anime.timeline();
            var dots = document.querySelectorAll('.js-dots path');
            var dotsArray = Array.prototype.slice.call(dots, 0);
            var shuffled = dotsArray.sort(function () {
              return 0.5 - Math.random();
            });
            var selected = shuffled.slice(0, 200);
            $(selected).css('opacity', 0);

            countriesTimeline.add({
              targets: selected,
              opacity: {
                value: [0, 1],
                duration: 500
              },
              easing: 'easeOutQuint',
              duration: 150,
              delay: function delay(el, i) {
                return i * 50;
              }
            }).add({
              targets: ['.countries .grid__column'],
              opacity: [0, 1],
              scale: [.9, 1],
              easing: 'easeOutQuint',
              duration: 1000,
              offset: 0,
              delay: function delay(el, i) {
                return i * 500;
              }
            });
            this.destroy();
          },

          offset: '85%'
        });
      }

      if ($('.seconds').length) {

        var seconds = new Waypoint({
          element: document.querySelector('.seconds'),
          handler: function handler() {
            var secondsTimeline = anime.timeline();

            secondsTimeline.add({
              targets: ['.js-seconds span'],
              opacity: [0, 1],
              translateY: [100, 0],
              easing: 'easeOutQuint',
              duration: 1000,
              offset: 200,
              delay: function delay(el, i) {
                return i * 250;
              }
            }).add({
              targets: ['.js-slash path'],
              translateX: [-100, 0],
              opacity: [0, 1],
              easing: 'easeOutQuart',
              duration: 750,
              offset: 700
            });
            this.destroy();
          },

          offset: '50%'
        });
      }

      if ($('.js-imagine-header').length) {

        var imagine = new Waypoint({
          element: document.querySelector('.imagine'),
          handler: function handler() {
            var imagineTimeline = anime.timeline();
            imagineTimeline.add({
              targets: ['.js-imagine-header'],
              translateY: [100, 1],
              easing: 'easeOutQuart',
              duration: 2000
            }).add({
              targets: ['.imagine__content .button--nav'],
              translateX: [-20, 0],
              opacity: [0, 1],
              duration: 500,
              offset: 200,
              easing: 'easeOutSine'
            });
            this.destroy();
          },

          offset: '75%'
        });
      }

      if ($('.js-financials-dots').length) {

        var blueDots = new Waypoint({
          element: document.querySelector('.js-financials-dots'),
          handler: function handler() {

            anime({
              targets: ['.js-financials-dots .blue-dots path'],
              fill: ['#231F20', '#009EE2'],
              easing: 'easeOutBack',
              duration: 500,
              scale: [1.3, 1],
              delay: function delay(el, i) {
                return i * 250;
              }
            });

            this.destroy();
          },

          offset: '55%'
        });
      }

      if ($('.stories__article').length) {

        var storiesArticles = document.getElementsByClassName('stories__article');

        var _loop = function _loop(_i) {
          var el = storiesArticles[_i].getElementsByClassName('grid__column');

          new Waypoint({
            element: storiesArticles[_i],
            handler: function handler() {
              anime({
                targets: el,
                translateY: [50, 0],
                opacity: {
                  value: [0, 1],
                  duration: 500
                },
                duration: 2000,
                easing: 'easeOutSine',
                delay: function delay(el, i) {
                  return i * 500;
                }
              });
              this.destroy();
            },
            continuous: true,
            offset: '50%'
          });
        };

        for (var _i = 0; _i < storiesArticles.length; _i++) {
          _loop(_i);
        }
      }

      if ($('.js-main-content').length) {

        var mainContent = document.getElementsByClassName('js-main-content');

        for (var _i2 = 0; _i2 < mainContent.length; _i2++) {

          new Waypoint({
            element: mainContent[_i2],
            handler: function handler() {
              anime({
                targets: this.element,
                translateY: [50, 0],
                opacity: {
                  value: [0, 1],
                  duration: 500
                },
                duration: 2000,
                easing: 'easeOutSine'
              });
              this.destroy();
            },
            continuous: true,
            offset: '75%'
          });
        }
      }

      if ($('.grid--donors').length) {

        var _storiesArticles = document.getElementsByClassName('grid--donors');

        var _loop2 = function _loop2(_i3) {
          var el = _storiesArticles[_i3].getElementsByClassName('grid__column');

          new Waypoint({
            element: _storiesArticles[_i3],
            handler: function handler() {
              anime({
                targets: el,
                translateY: [50, 0],
                opacity: {
                  value: [0, 1],
                  duration: 500
                },
                duration: 2000,
                easing: 'easeOutSine',
                delay: function delay(el, i) {
                  return i * 500;
                }
              });
              this.destroy();
            },
            continuous: true,
            offset: '100%'
          });
        };

        for (var _i3 = 0; _i3 < _storiesArticles.length; _i3++) {
          _loop2(_i3);
        }
      }

      if ($('.stats').length) {

        var statItems = document.getElementsByClassName('js-stats-item');

        for (var _i4 = 0; _i4 < statItems.length; _i4++) {

          new Waypoint({
            element: statItems[_i4],
            handler: function handler() {
              anime({
                targets: this.element,
                translateY: [50, 0],
                opacity: {
                  value: [0, 1],
                  duration: 500
                },
                duration: 1000,
                easing: 'easeOutSine'
              });
              this.destroy();
            },
            continuous: true,
            offset: '75%'
          });
        }
      }

      if ($('.blockquote--stories').length) {

        var quoteItems = document.getElementsByClassName('blockquote--stories');

        for (var _i5 = 0; _i5 < quoteItems.length; _i5++) {

          new Waypoint({
            element: quoteItems[_i5],
            handler: function handler() {
              anime({
                targets: this.element,
                translateY: [50, 0],
                opacity: {
                  value: [0, 1],
                  duration: 500
                },
                duration: 1000,
                easing: 'easeOutSine'
              });
              this.destroy();
            },
            continuous: true,
            offset: '25%'
          });
        }
      }

      if ($('.balance-sheet').length) {

        var _blueDots = new Waypoint({
          element: document.querySelector('.js-balance-sheet'),
          handler: function handler() {
            anime({
              targets: this.element,
              translateY: [50, 0],
              opacity: {
                value: [0, 1],
                duration: 500
              },
              duration: 2000,
              easing: 'easeOutSine'
            });

            this.destroy();
          },

          offset: '50%'
        });
      }

      if ($('.js-content-header').length) {

        var contentHeader = new Waypoint({
          element: document.querySelector('.js-content-header'),
          handler: function handler() {
            var contentHeaderTimeline = anime.timeline();
            contentHeaderTimeline.add({
              targets: ['.js-content-header .heading--main'],
              translateY: [30, 0],
              opacity: {
                value: [0, 1],
                duration: 500
              },
              duration: 2000,
              easing: 'easeOutSine'
            }).add({
              targets: ['.js-content-header .blockquote'],
              translateY: [30, 0],
              opacity: {
                value: [0, 1],
                duration: 500
              },
              duration: 2000,
              offset: 200,
              easing: 'easeOutSine'
            }).add({
              targets: ['.js-content-header .js-thanks', '.js-content-header .donors__thanks'],
              opacity: [0, 1],
              duration: 2000,
              translateY: [30, 0],
              offset: 100,
              easing: 'easeOutSine',
              delay: function delay(el, i) {
                return i * 500;
              }
            });

            anime({
              targets: ['.donors__thankyous img'],
              opacity: [0, 1, 0],
              duration: 3000,
              loop: true,
              easing: 'easeOutSine',
              delay: function delay(el, i) {
                return i * 2000;
              }
            });

            this.destroy();
          },

          offset: '100%'
        });
      }

      if ($('.js-nav-internal').length) {

        var _blueDots2 = new Waypoint({
          element: document.querySelector('.js-nav-internal'),
          handler: function handler() {
            anime({
              targets: ['.js-nav-internal li'],
              translateX: [-20, 0],
              opacity: {
                value: [0, 1],
                duration: 500
              },
              duration: 2000,
              easing: 'easeOutSine',
              delay: function delay(el, i) {
                return i * 500;
              }
            });

            this.destroy();
          },

          offset: '50%'
        });
      }

      if ($('.js-blockquote').length) {

        var _quoteItems = document.getElementsByClassName('js-blockquote');

        for (var _i6 = 0; _i6 < _quoteItems.length; _i6++) {

          new Waypoint({
            element: _quoteItems[_i6],
            handler: function handler() {
              anime({
                targets: this.element,
                translateY: [50, 0],
                opacity: {
                  value: [0, 1],
                  duration: 500
                },
                duration: 1000,
                easing: 'easeOutSine'
              });
              this.destroy();
            },
            continuous: true,
            offset: '75%'
          });
        }
      }

      if ($('.charity').length) {

        var charity = new Waypoint({
          element: document.querySelector('.charity'),
          handler: function handler() {
            var charityTimeline = anime.timeline();
            charityTimeline.add({
              targets: ['.charity__stars svg'],
              translateX: [-50, 0],
              opacity: {
                value: [0, 1],
                duration: 500
              },
              duration: 300,
              easing: 'easeOutSine',
              delay: function delay(el, i) {
                return i * 300;
              }
            }).add({
              targets: ['.charity p'],
              translateX: [-50, 0],
              opacity: {
                value: [0, 1],
                duration: 500
              },
              duration: 300,
              easing: 'easeOutSine'
            });
            this.destroy();
          },

          offset: '75%'
        });
      }

      if ($('.pie-chart-small').length) {

        var pieChart = new Waypoint({
          element: document.querySelector('.pie-chart-small'),
          handler: function handler() {
            var pieChartTimeline = anime.timeline();
            pieChartTimeline.add({
              targets: ['.pie-chart-small-item'],
              rotateZ: ['15deg', '0deg'],
              scale: [.8, 1],
              opacity: {
                value: [0, 1],
                duration: 200
              },
              duration: 1000,
              easing: 'easeOutSine'
            });

            this.destroy();
          },

          offset: '90%'
        });
      }

      if ($('.financials__header').length) {

        var _pieChart = new Waypoint({
          element: document.querySelector('.financials__header'),
          handler: function handler() {
            var pieChartTimeline = anime.timeline();
            pieChartTimeline.add({
              targets: ['.financials__header svg path'],
              opacity: [0, 1],
              scale: [.9, 1],
              duration: 200,
              easing: 'easeOutExpo',
              delay: function delay(el, i) {
                return i * 150;
              }
            }).add({
              targets: ['.financials__header .heading--main'],
              translateY: [20, 0],
              opacity: [0, 1],
              duration: 500,
              easing: 'easeOutSine'
            });

            this.destroy();
          },

          offset: '50%'
        });
      }
    }
  };

  Wikimedia.init();
})(jQuery, window, document);