(function($) {
  return window.a11yToolbar = function(settings) {
    var DEFAULTS, conf, construcToolbar, createCookie, eraseCookie, readCookie;
    DEFAULTS = {
      assets: "/wp-content/themes/ui2011/a11y/",
      containerClasses: ["a11y-toolbar"],
      btnClasses: []
    };
    conf = $.extend({}, DEFAULTS, settings);
    createCookie = function(name, value, days) {
      var date, expires;
      if (days) {
        date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
      } else {
        expires = "";
      }
      document.cookie = name + "=" + value + expires + "; path=/";
    };
    readCookie = function(name) {
      var c, ca, i, nameEQ;
      nameEQ = name + "=";
      ca = document.cookie.split(";");
      i = 0;
      while (i < ca.length) {
        c = ca[i];
        while (c.charAt(0) === " ") {
          c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
          return c.substring(nameEQ.length, c.length);
        }
        i++;
      }
      return null;
    };
    eraseCookie = function(name) {
      createCookie(name, "");
    };
    construcToolbar = function(conf) {
      var btnClasses, insert_a11y_toolbar;
      btnClasses = conf.btnClasses.join(' ');
      insert_a11y_toolbar = "<!-- a11y toolbar -->";
      insert_a11y_toolbar += "<menu type=\"toolbar\" role=\"menu\" class=\"" + (conf.containerClasses.join(' ')) + "\">";
      insert_a11y_toolbar += "<button type=\"button\" class=\"a11y-toggle-contrast toggle-contrast " + btnClasses + "\" id=\"is_normal_contrast\" accesskey=\"C\" title=\"Toggle High Contrast\"><span class=\"offscreen\">Toggle High Contrast</span><i class=\"icon icon-adjust\"></i></button>";
      insert_a11y_toolbar += "<button type=\"button\" class=\"a11y-toggle-grayscale toggle-grayscale " + btnClasses + " \" id=\"is_normal_color\" accesskey=\"S\" title=\"Toggle Grayscale\"><span class=\"offscreen\">Toggle Grayscale</span><i class=\"icon icon-tint\"></i></button>";
      insert_a11y_toolbar += "<button type=\"button\" class=\"a11y-toggle-fontsize toggle-fontsize " + btnClasses + "\" id=\"is_normal_fontsize\" accesskey=\"F\" title=\"Toggle Font Size\"><span class=\"offscreen\">Toggle Font Size</span><i class=\"icon icon-font\"></i></button>";
      insert_a11y_toolbar += "</menu>";
      insert_a11y_toolbar += "</div>";
      insert_a11y_toolbar += "<!-- // a11y toolbar -->";
      return insert_a11y_toolbar;
    };
    $(document).find("body").prepend(construcToolbar(conf));
    if (readCookie("a11y-desaturated")) {
      $("head").append($("<link rel=\"stylesheet\" href=\"" + conf.assets + "css/a11y-desaturate.css\" type=\"text/css\" id=\"desaturatedStylesheet\" />"));
      $("#is_normal_color").attr("id", "is_grayscale").addClass("active");
    }
    $(".toggle-grayscale").on("click", function() {
      if ($(this).attr("id") === "is_normal_color") {
        $("head").append($("<link rel=\"stylesheet\" href=\"" + conf.assets + "css/a11y-desaturate.css\" type=\"text/css\" id=\"desaturatedStylesheet\" />"));
        $(this).attr("id", "is_grayscale").addClass("active");
        createCookie("a11y-desaturated", "1");
        return false;
      } else {
        $("#desaturatedStylesheet").remove();
        $(this).attr("id", "is_normal_color").removeClass("active");
        eraseCookie("a11y-desaturated");
        return false;
      }
    });
    if (readCookie("a11y-high-contrast")) {
      $("head").append($("<link rel=\"stylesheet\" href=\"" + conf.assets + "css/a11y-contrast.css\" type=\"text/css\" id=\"highContrastStylesheet\" />"));
      $("#is_normal_contrast").attr("id", "is_high_contrast").addClass("active");
      $(".a11y-toolbar ul li a i").addClass("icon-white");
    }
    $(".toggle-contrast").on("click", function() {
      if ($(this).attr("id") === "is_normal_contrast") {
        $("head").append($("<link rel=\"stylesheet\" href=\"" + conf.assets + "css/a11y-contrast.css\" type=\"text/css\" id=\"highContrastStylesheet\" />"));
        $(this).attr("id", "is_high_contrast").addClass("active");
        $(this).parent().parent().find("i").addClass("icon-white");
        createCookie("a11y-high-contrast", "1");
        return false;
      } else {
        $("#highContrastStylesheet").remove();
        $(this).attr("id", "is_normal_contrast").removeClass("active");
        $(this).parent().parent().find("i").removeClass("icon-white");
        eraseCookie("a11y-high-contrast");
        return false;
      }
    });
    if (readCookie("a11y-larger-fontsize")) {
      $("head").append($("<link rel=\"stylesheet\" href=\"" + conf.assets + "css/a11y-fontsize.css\" type=\"text/css\" id=\"largerFontsizeStylesheet\" />"));
      $("#is_normal_fontsize").attr("id", "is_large_fontsize").addClass("active");
    }
    return $(".toggle-fontsize").on("click", function() {
      if ($(this).attr("id") === "is_normal_fontsize") {
        $("head").append($("<link rel=\"stylesheet\" href=\"" + conf.assets + "css/a11y-fontsize.css\" type=\"text/css\" id=\"largerFontsizeStylesheet\" />"));
        $(this).attr("id", "is_large_fontsize").addClass("active");
        createCookie("a11y-larger-fontsize", "1");
        return false;
      } else {
        $("#largerFontsizeStylesheet").remove();
        $(this).attr("id", "is_normal_fontsize").removeClass("active");
        eraseCookie("a11y-larger-fontsize");
        return false;
      }
    });
  };
})(jQuery);
