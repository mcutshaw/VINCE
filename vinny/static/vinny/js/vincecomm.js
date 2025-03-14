/*#########################################################################
  # VINCE
  #
  # Copyright 2022 Carnegie Mellon University.
  #
  # NO WARRANTY. THIS CARNEGIE MELLON UNIVERSITY AND SOFTWARE ENGINEERING
  # INSTITUTE MATERIAL IS FURNISHED ON AN "AS-IS" BASIS. CARNEGIE MELLON
  # UNIVERSITY MAKES NO WARRANTIES OF ANY KIND, EITHER EXPRESSED OR IMPLIED,
  # AS TO ANY MATTER INCLUDING, BUT NOT LIMITED TO, WARRANTY OF FITNESS FOR
  # PURPOSE OR MERCHANTABILITY, EXCLUSIVITY, OR RESULTS OBTAINED FROM USE OF THE
  # MATERIAL. CARNEGIE MELLON UNIVERSITY DOES NOT MAKE ANY WARRANTY OF ANY KIND
  # WITH RESPECT TO FREEDOM FROM PATENT, TRADEMARK, OR COPYRIGHT INFRINGEMENT.
  #
  # Released under a MIT (SEI)-style license, please see license.txt or contact
  # permission@sei.cmu.edu for full terms.
  #
  # [DISTRIBUTION STATEMENT A] This material has been approved for public
  # release and unlimited distribution.  Please see Copyright notice for non-US
  # Government use and distribution.
  #
  # Carnegie Mellon®, CERT® and CERT Coordination Center® are registered in the
  # U.S. Patent and Trademark Office by Carnegie Mellon University.
  #
  # This Software includes and/or makes use of Third-Party Software each subject
  # to its own license.
  #
  # DM21-1126
  ########################################################################
*/
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?                                                                \
            
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function lockunlock(f,divmain,divhtml) {
    if(f) {
	/* Show search is in progress */
        $(divmain).css({opacity:0.5});
        if($(divhtml + ' > .loading').length < 1)
            $(divhtml).prepend($('#hiddenloading').html());
    } else {
	/* Back to normal */
	$(divmain).css({opacity:1});
	$(divhtml + ' > .loading').remove();
    }
}
function delaySearch(callfun,wait) {
    var timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(
            function () {
                callfun.apply(this, args);
            }, wait);
    };
}
$(function () {

    $('span[title]').qtip({
        style: {classes: 'qtip-youtube'}
    });

    $('i[title]').qtip({
        style: {classes: 'qtip-youtube'}
    });
    
    var prev = 0;
    var $window = $(window);
    var nav = $('ul.vincesidemenu');

    $window.on('scroll', function(){
        var scrollTop = $window.scrollTop();
        nav.toggleClass('less_padding', scrollTop > prev);
        prev = scrollTop;
    });

    $(document).keyup(function(e) {
        if (e.key === "Escape") {
            if(window.txhr && 'abort' in window.txhr) {
		console.log("Aborting search because user hit Escape");
		window.txhr.abort();
		window.txhr = null;
            }
        }
    });
});
