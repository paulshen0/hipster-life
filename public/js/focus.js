$(function() {
  var PhotoView = Backbone.View.extend({
    tagName: 'img',
    className: 'unit photo',

    render: function() {
      this.$el.attr('src', this.model.get('src'));
      if (this.model.get('orientation') === 'vertical') {
        this.$el.addClass('vertical');
      }
      var dimensions = this.model.get('dimensions');
      if (dimensions) {
        this.$el.addClass(dimensions);
      }
    }
  });


  var container = $('#main');
  var window_height = $(window).height();

  var date_filter = window.date_filter;


  Photos.getForDate(date_filter).forEach(function(photo) {
    var photo_view = new PhotoView({model: photo});
    photo_view.render();
    container.append(photo_view.el);
  });

//  function _updateSize() {
//    var window_height = $(window).height();
//    photos.forEach(function(photo) {
//      if (photo.orientation === 'vertical') {
//        photo.element.css('height', (window_height - 40) + 'px');
//      }
//    });
//  }
//  $(window).on('resize', _updateSize);
});
