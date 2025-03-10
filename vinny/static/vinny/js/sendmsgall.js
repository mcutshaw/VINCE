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
            // Does this cookie string begin with the name we want?                     
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

if (Dropzone) {
    Dropzone.autoDiscover = false;
}

function autoTaggle(data, taggle) {
    var container = taggle.getContainer();
    var input = taggle.getInput();
    $(input).autocomplete({
        source: data,
        appendTo:container,
        position: { at: "left bottom", of: container },
        select: function(event, data) {
            event.preventDefault();
            if (event.which === 1) {
                taggle.add(data.item.value);
		if (container.id == "id_to_group") {
		    add_tag(taggle, data.item.label);
		}
            }
        }
    });
}


$(document).ready(function() {

    var url = $("#sendmsgform").attr("action");


    var simplemde = new EasyMDE({element: $("#id_content")[0],
                                   renderingConfig: {
                                       singleLineBreaks: false,
                                   },
				 status: false,
				 autoDownloadFontAwesome: false,
				  });


    function submitFormWithoutFiles() {
	$('#sendbutton').prop('disabled', true);
        $("#sendbutton").html("Sending");
        $.ajax({
            url: $("#sendmsgform").attr("action"),
            type: "POST",
            data: $('#sendmsgform').serialize(),
            success: function(data) {
                var url_mask = $("#sendmsgform").attr("success");
                window.location = url_mask;
            }
        });
    }
    
    $(document).on("submit", "#sendmsgform", function(e) {
        e.preventDefault();
	submitFormWithoutFiles();
    });


});
