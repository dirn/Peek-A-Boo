// Peek-A-Boo jQuery Plugin
// Version 1.1.0
//
// Copyright (c) 2012, Andy Dirnberger
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without modification,
// are permitted provided that the following conditions are met:
//
//     1. Redistributions of source code must retain the above copyright notice,
//        this list of conditions and the following disclaimer.
//
//     2. Redistributions in binary form must reproduce the above copyright
//        notice, this list of conditions and the following disclaimer in the
//        documentation and/or other materials provided with the distribution.
//
//     3. Neither the name of Peek-A-Boo nor the names of its contributors may be used
//        to endorse or promote products derived from this software without
//        specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
// ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
// WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
// DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
// ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
// (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
// ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
// SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
(function() {
  var $, root;

  root = this;

  $ = jQuery;

  $.fn.extend({
    peekaboo: function(options) {
      var $overlay, $this, active_item, hide_function, hover_active, settings, width;
      $this = $(this);
      active_item = null;
      hover_active = false;
      if (typeof options === 'string') {
        options = {
          caption: options
        };
      }
      settings = $.extend({
        caption: '.peekaboo',
        delay: 500,
        opacity: 0.4,
        padding: 0,
        speedOut: 'normal',
        speedOver: 'fast',
        wrapperClass: 'peekaboo-wrapper'
      }, options);
      $overlay = $('<div/>').addClass(settings.wrapperClass).css({
        background: '#000',
        opacity: settings.opacity,
        padding: settings.padding,
        position: 'absolute',
        top: $this.height(),
        zIndex: 100
      }).insertBefore($this.find(settings.caption));
      width = $this.width();
      if ($overlay.css('padding-left')) {
        width -= parseInt($overlay.css('padding-left'));
      }
      if ($overlay.css('padding-right')) {
        width -= parseInt($overlay.css('padding-right'));
      }
      $overlay.css({
        width: width
      });
      $this.css({
        position: 'relative'
      });
      $this.find(settings.caption).css({
        padding: settings.padding,
        position: 'absolute',
        top: $this.height(),
        width: width,
        zIndex: 200
      });
      hide_function = function() {
        var $active_item, top;
        if (hover_active) {
          return;
        }
        $active_item = $(active_item);
        top = $active_item.height();
        $active_item.find(settings.caption).animate({
          top: top
        }, settings.speedOut);
        return $active_item.find('.' + settings.wrapperClass).animate({
          top: top
        }, settings.speedOut);
      };
      return $this.hover(function() {
        var $caption, height, top;
        $this = $(this);
        hover_active = true;
        active_item = this;
        if ($this.data('top') && $this.data('height')) {
          top = $this.data('top');
          height = $this.data('height');
        } else {
          $caption = $this.find(settings.caption);
          height = $caption.innerHeight();
          top = $this.height() - height;
          $this.data('top', top);
          $this.data('height', height);
        }
        $this.find('.' + settings.wrapperClass).height(height).animate({
          top: top
        }, settings.speedOver);
        return $this.find(settings.caption).animate({
          top: top
        }, settings.speedOver);
      }, function() {
        hover_active = false;
        return window.setTimeout(hide_function, settings.delay);
      });
    }
  });

}).call(this);
