$(function() {
  var COL_WIDTH = 380;

  var PhotoView = Backbone.View.extend({
    tagName: 'div',
    className: 'unit photo',
    events: {
      'click': 'navigate'
    },

    render: function() {
      var img = $('<img src="' + this.model.get('src') + '" class="img" />');
      this.$el.append(img);
      if (this.model.get('orientation') === 'vertical') {
        this.$el.addClass('vertical');
      } else {
        var rando = Math.random();
        if (rando > 0.7) {
          this.$el.addClass('fidget');
        }
      }
      var dimensions = this.model.get('dimensions');
      if (dimensions) {
        this.$el.addClass(dimensions);
      }
    },

    setSpan: function(cols) {
      this.$el.removeClass('span' + this.model.get('span'));
      this.model.set('span', cols);
      this.$el.addClass('span' + cols);
    },

    shouldExpand: function(other_view) {
      return this.model.get('orientation') !== 'vertical' &&
             other_view.model.get('orientation') !== 'vertical' &&
             // Check photos are next to each other
             this.model.get('top') === other_view.model.get('top') &&
             this.model.get('left') === other_view.model.get('left') + COL_WIDTH;
    },

    navigate: function() {
      document.location.href = '/focus/' + this.model.get('date');
    },

    updateOffset: function() {
      this.model.set('left', this.$el.offset().left);
      this.model.set('top', this.$el.offset().top);
    }
  });

  var AppView = Backbone.View.extend({
    el: $('#main'),

    initialize: function() {
      this._photoViews = [];
      this._twoCols = -1;
    },

    render: function() {
      Photos.forEach(function(photo) {
        var photo_view = new PhotoView({model: photo});
        photo_view.render();
        this.$el.append(photo_view.el);
        this._photoViews.push(photo_view);
      }.bind(this));
    },

    resize: function() {
      var should_be_two_col = $(window).width() < 1340;
      if (should_be_two_col !== this._twoCols) {
        this._twoCols = should_be_two_col;
        if (this._twoCols) {
          $('body').addClass('twocol');
        } else {
          $('body').removeClass('twocol');
        }

        this._photoViews.forEach(function(photo_view) {
          photo_view.setSpan(1);
        });

        this.$el.masonry({
          itemSelector: '.unit',
          columnWidth: COL_WIDTH
        });

        this._coolExpand();

        this._photoViews.forEach(function(photo_view) {
          photo_view.updateOffset();
        });
      }
    },

    _coolExpand: function() {
      var prev_photo;
      var ii = 0;
      while (ii < this._photoViews.length) {
        this._photoViews.forEach(function(photo_view) {
          photo_view.updateOffset();
        });

        prev_photo = this._photoViews[ii];
        for (ii++; ii < this._photoViews.length; ii++) {
          if (this._photoViews[ii].shouldExpand(prev_photo)) {
            prev_photo.setSpan(2);
            break;
          }
          prev_photo = this._photoViews[ii];
        }

        this.$el.masonry({
          itemSelector: '.unit',
          columnWidth: COL_WIDTH
        });

        ii += 5;
      }
    }
  });

  var App = new AppView();
  App.render();

  $(window).on('resize', App.resize.bind(App));
  App.resize();

  function _onScroll() {
    var scroll_top = $(window).scrollTop();
    var top_photo = Photos.reduceRight(function(top_photo, photo) {
      if (photo.get('top') > scroll_top) {
        return photo;
      }
      return top_photo;
    }, Photos.first());

    var evt = events[top_photo.get('date')];
    $('#sidebar').html(evt.name);
  }
  $(window).on('scroll', _onScroll);
  _onScroll();
});
