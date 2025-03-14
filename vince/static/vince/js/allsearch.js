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

function nextPage(page) {
    var url = $("#searchall").attr("action");
    $("#searchresults").load(url+"?page=" + page);
}

function nextResults(page) {
    var url = $("#searchall").attr("action");
    $("#id_page").val(page);
    $.ajax({
        url: url,
        type: "GET",
        data: $('#searchall').serialize(),
        success: function(data) {
            $("#searchresults").html(data);
        }
    });

}

function searchAll(e) {
    if (e) {
        e.preventDefault();
    }
    $("#id_page").val("1");

    var url = $("#searchall").attr("action");
    var facet = $(".search-menu .menu li .menu-active").text();
    var q = $("#id_searchbar").val();
    if (history.pushState) {
	var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?q=' + $("#id_searchbar").val() + "&facet=" + facet;
	window.history.pushState({path:newurl},'',newurl);
    }
    
    var data = $('#searchall').serialize() + "&facet=" + facet;
    lockunlock(true,'div.mainbody,div.vtmainbody','#searchresults');
    window.txhr = $.ajax({
        url: url,
        type: "GET",
        data: data,
	success: function(data) {
	    lockunlock(false);
 	    $("#searchresults").html(data);
	},
	error: function() {
	    lockunlock(false,'div.mainbody,div.vtmainbody','#searchresults');
	    console.log(arguments);
	    alert("Search failed or canceled! See console log for details.");
	},
	complete: function() {
	    /* Just safety net */
	    lockunlock(false,'div.mainbody,div.vtmainbody','#searchresults');
	    window.txhr = null;
 	}
     });
}

$(document).ready(function() {

    $(document).on("click", '.search_page', function(event) {
        var page = $(this).attr('next');
        nextPage(page);
    });

    $(document).on("click", '.search_notes', function(event) {
        var page = $(this).attr('next');
        nextResults(page);
    });

    searchAll();
    
    $(".search-menu .menu li").on("click", "a", function(event) {
	$( ".search-menu .menu li" ).each(function( index ) {
	    $(this).children().removeClass("menu-active");
	});
	$(this).toggleClass("menu-active");
	searchAll(event);

    });
/*    var search = document.getElementById("id_searchbar");
    if (search) {
        search.addEventListener("keyup", function(event) {
            searchAll(event);
        });
        searchAll();
    }*/

    var form = document.getElementById('searchall');
    if (form) {
        if (form.attachEvent) {
            form.attachEvent("submit", searchAll);
        } else {
            form.addEventListener("submit", searchAll);
        }
    }



});
