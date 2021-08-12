var Raven = require('raven-js');
var $ = require('jquery');
var dt = require('datatables.net');

(function (Raven) {
  'use strict';
  Raven.config('https://caa5edd9fc344ff69a3e0bd4c05a5a91@sentry.eff.org/20').install();
})(Raven);

(function() {
  [].forEach.call(document.querySelectorAll('.js-only'), function (el) {
    el.style.visibility = 'visible';
  });

  [].forEach.call(document.querySelectorAll('.no-js-only'), function (el) {
    el.style.visibility = 'hidden';
  });

  var hamburger = document.getElementById('hamburger');
  var close = document.getElementById('close');

  hamburger.addEventListener('click',toggleMenu,false);
  close.addEventListener('click',toggleMenu,false);

  function toggleMenu() {
    document.body.classList.toggle('active');
  }
})();

$(document).ready(function() {
  $('.glossary-term.no-js').remove();
  $('.glossary-term.js-only').removeClass('disabled');
  // Tooltips
  $('.glossary-link').click(function() {
    $('.tooltip').removeClass('open');
    var glossDiv = $(this).parents('.glossary-term');
    $(glossDiv).children('.tooltip').addClass('open');
  });
  $(document).on('click', function(e) {
    if (!$(e.target).closest('.glossary-term').length)
      $('.tooltip').removeClass('open');
  });
  $(document).on('keydown', function(e) {
    if (e.which == 27) {
      $('.tooltip').removeClass('open');
    }
  });
  $('.close-button').on('click', function(e) {
    $('.tooltip').removeClass('open');
  });
  var hosting_table = $('#hosting-providers').DataTable({
    "paging": false,
    "info": false,
    "scrollX": true,
    "responsive": true,
    "language": {
      "search": "Search for your hosting provider"
    }
  });
  hosting_table.column('.category').visible(false);
  $('#all-bounce').on('click', function() {
    $('#all-https').click();
  });
  $('#full-bounce').on('click', function() {
    $('#full-https').click();
  });
  $('#partial-bounce').on('click', function() {
    $('#partial-https').click();
  });
  $('#no-bounce').on('click', function() {
    $('#no-https').click();
  });
  $('#all-https').on('click', function() {
    hosting_table.columns().search('').column('.category').draw();
    $('.tab-header-wrapper').removeClass('visible');
    $('#all-header').addClass('visible');
    $('.hosting-tab').removeClass('active');
    $(this).addClass('active');
  });
  $('#full-https').on('click', function() {
    hosting_table.columns().search('').column('.category').search('full').draw();
    $('.tab-header-wrapper').removeClass('visible');
    $('#full-header').addClass('visible');
    $('.hosting-tab').removeClass('active');
    $(this).addClass('active');

  });
  $('#partial-https').on('click', function() {
    hosting_table.columns().search('').column('.category').search('partial').draw();
    $('.tab-header-wrapper').removeClass('visible');
    $('#partial-header').addClass('visible');
    $('.hosting-tab').removeClass('active');
    $(this).addClass('active');
  });
  $('#no-https').on('click', function() {
    hosting_table.columns().search('').column('.category').search('no').draw();
    $('.tab-header-wrapper').removeClass('visible');
    $('#no-header').addClass('visible');
    $('.hosting-tab').removeClass('active');
    $(this).addClass('active');
  });
  $('#all-https').click();
});